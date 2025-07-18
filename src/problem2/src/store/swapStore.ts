import { create } from "zustand"

type SwapStorage = {
  clear: () => void
  inputToken: null | Token
  outputToken: null | Token
  setInputToken: (token: null | Token) => void
  setOutputToken: (token: null | Token) => void
  swapTokens: () => { inputToken?: null | Token; outputToken?: null | Token }
}

export const useSwapStore = create<SwapStorage>()((set, get) => ({
  clear: () => set({ inputToken: null, outputToken: null }),
  inputToken: null,
  outputToken: null,
  setInputToken: (token) => set({ inputToken: token }),
  setOutputToken: (token) => set({ outputToken: token }),
  swapTokens: () => {
    const { inputToken, outputToken } = get()
    set({ inputToken: outputToken, outputToken: inputToken })
    return { inputToken: outputToken, outputToken: inputToken }
  },
}))
