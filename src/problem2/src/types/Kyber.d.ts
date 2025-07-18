type Feature = "bridge" | "transfer"

type TokensPagination = {
  pagination: {
    totalItems: number
  }
  tokens: Token[]
}

type TokensParams = {
  chainId?: number | string
  page?: number
  pageSize?: number
  query?: string
}
