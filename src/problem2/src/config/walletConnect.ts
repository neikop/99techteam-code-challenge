import { Chain, getDefaultConfig } from "@rainbow-me/rainbowkit"
import { WALLET_CONNECT_PROJECT_ID } from "config/env"
import { defineChain } from "viem"
import { arbitrum, arbitrumSepolia, berachain, mainnet } from "wagmi/chains"

Object.assign(arbitrum, { iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/11841.png" })
Object.assign(mainnet, { iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png" })
Object.assign(berachain, { iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/24647.png" })

export const onematrix: Chain = defineChain({
  blockExplorers: {
    default: { name: "OneMatrix Explorer", url: "https://devnet-explorer.vinid.info" },
  },
  iconUrl: "https://eth.blockscout.com/assets/favicon/favicon.ico",
  id: 84004,
  name: "OneMatrix",
  nativeCurrency: { decimals: 18, name: "MTX", symbol: "MTX" },
  rpcUrls: {
    default: {
      http: ["https://devnet2-el-1.vinid.info"],
    },
  },
  testnet: true,
})

export const onematrixTestnet: Chain = defineChain({
  blockExplorers: {
    default: { name: "1Matrix Public Testnet", url: "https://explorer.vietcha.in" },
  },
  iconUrl: "https://explorer.vietcha.in/assets/favicon/favicon.ico",
  id: 84009,
  name: "1Matrix Public Testnet",
  nativeCurrency: { decimals: 18, name: "PAVEN", symbol: "PAVEN" },
  rpcUrls: {
    default: {
      http: ["https://rpc.vietcha.in"],
    },
  },
  testnet: true,
})

export const onematrixL2: Chain = defineChain({
  blockExplorers: {
    default: { name: "OneMatrix Explorer", url: "https://devnet-l2-explorer.hiee.us" },
  },
  iconUrl: "https://zksync.blockscout.com/assets/favicon/favicon.ico",
  id: 8400201,
  name: "OneMatrix L2",
  nativeCurrency: { decimals: 18, name: "1MTX", symbol: "1MTX" },
  rpcUrls: {
    default: {
      http: ["https://devnet-l2.hiee.us"],
    },
  },
  testnet: true,
})

export const wagmiConfig = getDefaultConfig({
  appName: "Kite Template",
  chains: [arbitrum, onematrix, onematrixTestnet, arbitrumSepolia],
  projectId: WALLET_CONNECT_PROJECT_ID,
  ssr: false,
})
