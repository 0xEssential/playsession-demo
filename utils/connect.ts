import Notify from 'bnc-notify';
import Onboard from 'bnc-onboard';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const networkId = parseInt(process.env.CHAIN_ID!, 10);
const rpcUrl = process.env.RPC_URL;
const appUrl = process.env.URL;
const dappId = '5c501569-1ad1-490d-a7d0-d8a0aba75dad';
const appName = '0xEssential Playsession';

export function initOnboard(subscriptions: any) {
  return Onboard({
    dappId,
    hideBranding: true,
    networkId,
    darkMode: true,
    subscriptions,
    walletSelect: {
      wallets: [
        { walletName: 'metamask' },
        {
          walletName: 'trezor',
          appUrl,
          rpcUrl,
        },
        {
          walletName: 'ledger',
          rpcUrl,
        },
        {
          walletName: 'walletConnect',
          rpc: {
            [networkId]: rpcUrl,
          }, // [Optional]
        },
        { walletName: 'cobovault', appName, rpcUrl },
        {
          walletName: 'lattice',
          appName: 'Onboard Demo',
          rpcUrl,
        },
        { walletName: 'coinbase' },
        { walletName: 'status' },
        { walletName: 'walletLink', rpcUrl },
        { walletName: 'torus' },
        { walletName: 'trust', rpcUrl },
        { walletName: 'opera' },
        { walletName: 'operaTouch' },
        { walletName: 'imToken', rpcUrl },
        { walletName: 'meetone' },
        { walletName: 'mykey', rpcUrl },
        { walletName: 'wallet.io', rpcUrl },
        { walletName: 'huobiwallet', rpcUrl },
        { walletName: 'hyperpay' },
        { walletName: 'atoken' },
        { walletName: 'liquality' },
        { walletName: 'frame' },
        { walletName: 'tokenpocket', rpcUrl },
        { walletName: 'authereum', disableNotifications: true },
        { walletName: 'ownbit' },
      ],
    },
    walletCheck: [
      { checkName: 'derivationPath' },
      { checkName: 'connect' },
      { checkName: 'accounts' },
    ],
  });
}

export function initNotify() {
  return Notify({
    dappId,
    networkId,
  });
}
