type Address = `0x${string}`

type Token = {
  address: Address
  chainId?: number
  decimals?: number
  logoURI: string
  name: string
  price: number
  symbol: string
}
