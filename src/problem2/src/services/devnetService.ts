import { uniqBy } from "lodash"

import tokenPrices from "./data/prices.json"

const filterData = (items: Token[], params?: TokensParams) => {
  let filteredItems = items
  if (params?.chainId) {
    filteredItems = filteredItems.filter((token) => token.chainId === params.chainId)
  }
  if (params?.query) {
    filteredItems = filteredItems.filter((token) => token.symbol.toLowerCase().includes(params.query!.toLowerCase()))
  }
  return filteredItems
}

const fetchTokens = async (params?: TokensParams): Promise<TokensPagination> => {
  const data: Token[] = uniqBy(tokenPrices, "currency").map((token, index) => ({
    ...token,
    address: `0x${token.currency}-${index}`,
    logoURI: `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${token.currency}.svg`,
    name: token.currency,
    symbol: token.currency,
  }))

  const { page = 1, pageSize = 10 } = params ?? {}

  const filteredTokens = filterData(data, params)

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        pagination: {
          totalItems: filteredTokens.length,
        },
        tokens: filteredTokens.slice((page - 1) * pageSize, page * pageSize),
      })
    }, 300)
  })
}

const swap = async (data: any): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 300)
  })
}

export default {
  fetchTokens,
  swap,
}
