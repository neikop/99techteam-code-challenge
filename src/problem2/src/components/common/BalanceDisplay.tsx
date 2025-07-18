import { Button, Flex, Text } from "@chakra-ui/react"
import { Chain } from "@rainbow-me/rainbowkit"
import { useQuery } from "@tanstack/react-query"
import { createPublicClient, erc20Abi, formatEther, http } from "viem"
import { useAccount } from "wagmi"

type Props = {
  address?: Address
  chain?: Chain | null
  onMax?: (balance: string) => void
  token?: null | Token
}

const BalanceDisplay = ({ address: addressFromProps, chain, onMax, token }: Props) => {
  const { address: addressFromAccount } = useAccount()
  const address = addressFromProps ?? addressFromAccount

  const fetchBalance = async (): Promise<bigint> => {
    if (!address || !chain || !token) return 0n
    const publicClient = createPublicClient({
      chain: chain,
      transport: http(),
    })
    const balance = await publicClient.readContract({
      abi: erc20Abi,
      address: token.address,
      args: [address],
      functionName: "balanceOf",
    })
    return balance as bigint
  }

  const { data: balance } = useQuery({
    queryFn: () => fetchBalance(),
    queryKey: ["fetchBalance", { address, chain, token }],
  })

  const formattedBalance = formatEther(balance || 0n)

  return (
    <Flex flex={1} gap={2} justifyContent="flex-end" maxW={{ base: 180, sm: 240 }}>
      <Text fontSize="sm" truncate={true}>
        Balance: {formattedBalance}
      </Text>
      <Button
        colorPalette="purple"
        onClick={() => {
          onMax?.(formattedBalance)
        }}
        variant="text"
      >
        Max
      </Button>
    </Flex>
  )
}

export default BalanceDisplay
