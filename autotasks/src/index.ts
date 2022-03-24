import { JsonRpcProvider } from '@ethersproject/providers';
import {
  DefenderRelayProvider,
  DefenderRelaySigner,
} from 'defender-relay-client/lib/ethers';
import { Contract, utils } from 'ethers';

import Forwarder from './abis/EssentialForwarder.json';

async function preflight(forwarder: Contract, request: any, signature: string) {
  // Validate request on the forwarder contract

  try {
    await forwarder.preflight(request, signature, {
      gasLimit: 10_000_000,
    });

    console.warn(`Preflight did not revert`);
  } catch (e) {
    if (e.code === utils.Logger.errors.CALL_EXCEPTION) {
      if (e.errorName === 'OffchainLookup') {
        const { sender, urls, callData, callbackFunction, extraData } =
          e.errorArgs;

        console.warn({ sender, urls, callData, callbackFunction, extraData });

        return { sender, urls, callData, callbackFunction, extraData };
      }
    }

    console.warn(e);
  }
}

async function retrieveProof({ url, callData }): Promise<string> {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'durin_call',
      // use sender - can check later against signer of req
      params: { callData, to: Forwarder.address, abi: Forwarder.abi },
    }),
  });

  const body = await response.json();
  console.warn(body);
  return body?.result;
}

// Entrypoint for the Autotask
export async function handler(event: any) {
  // Parse webhook payload
  if (!event.request || !event.request.body) throw new Error(`Missing payload`);
  const { request, signature } = event.request.body;

  // Initialize Relayer provider, signer and forwarder contract
  const credentials = { ...event };
  const { maticRpcUrl } = event.secrets;
  const provider = new DefenderRelayProvider(credentials);
  const signer = new DefenderRelaySigner(credentials, provider, {
    speed: 'fastest',
  });
  const jsonProvider = new JsonRpcProvider(maticRpcUrl);
  const _forwarder = new Contract(
    Forwarder.address,
    Forwarder.abi,
    jsonProvider,
  );

  const forwarder = Object.assign(_forwarder, {
    name: '0xEssential PlaySession',
  });

  // Preflight transaction
  const { sender, urls, callData, callbackFunction, extraData } =
    await preflight(forwarder, request, signature);
  console.warn(sender);
  // Fetch proof from error params
  const proof = await retrieveProof({ url: urls[0], callData });

  if (!proof) throw Error('No proof');

  const abi = new utils.AbiCoder();

  const tx = await signer.sendTransaction({
    to: forwarder.address,
    data: utils.hexConcat([
      callbackFunction,
      abi.encode(['bytes', 'bytes'], [proof, extraData]),
    ]),
    gasLimit: 350_000,
  });

  console.log(`Sent meta-tx: ${tx.hash}`);
  return { txHash: tx.hash };
}

// Sample typescript type definitions
type EnvInfo = {
  API_KEY: string;
  API_SECRET: string;
};

// To run locally (this code will not be executed in Autotasks)
if (require.main === module) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config();
  const { API_KEY: apiKey, API_SECRET: apiSecret } =
    process.env as unknown as EnvInfo;
  handler({ apiKey, apiSecret })
    .then(() => process.exit(0))
    .catch((error: Error) => {
      console.error(error);
      process.exit(1);
    });
}
