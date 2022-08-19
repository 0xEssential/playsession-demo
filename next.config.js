/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CHAIN_ID: process.env.CHAIN_ID,
    ETHERSCAN_ROOT: process.env.ETHERSCAN_ROOT,
    INFURA_KEY: process.env.INFURA_KEY,
    RPC_URL: process.env.RPC_URL,
    URL: process.env.URL,
    AUTOTASK_URI: process.env.AUTOTASK_URI,
    GOOGLE_API_CREDS: process.env.GOOGLE_API_CREDS,
    RELAYER_URI: process.env.RELAYER_URI,
    API_KEY: process.env.API_KEY,
  },
};

module.exports = nextConfig;
