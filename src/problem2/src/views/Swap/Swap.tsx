import { Button, Center, Container, Flex, Stack, Text } from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query"
import { useDebounce } from "@uidotdev/usehooks"
import { BalanceDisplay, NumericInput, TokenSelectDialog } from "components/common"
import { toaster } from "components/ui/toaster"
import { queryClient } from "config/queryClient"
import { useEffect, useMemo, useState } from "react"
import { MdSwapVert } from "react-icons/md"
import { devnetService } from "services"
import { useSwapStore } from "store/swapStore"
import { formatAmount, formatPrice } from "utils/common"

enum SwapMode {
  EXACT_IN = "EXACT_IN",
  EXACT_OUT = "EXACT_OUT",
}

const Swap = () => {
  const { inputToken, outputToken, setInputToken, setOutputToken, swapTokens } = useSwapStore()

  const [inputAmount, setInputAmount] = useState("")
  const [outputAmount, setOutputAmount] = useState("")

  const handleSwap = async () => {
    await devnetService.swap({
      inputAmount,
      inputToken,
      outputAmount,
      outputToken,
      swapMode,
    })
  }

  const swapMutation = useMutation({
    mutationFn: handleSwap,
    onError: (error) => {
      toaster.create({
        description: error.message || "There was an error sending your transaction",
        title: error.name || "Failed",
        type: "error",
      })
    },
    onSuccess: () => {
      toaster.create({
        description: "Your transaction was successfully sent",
        title: "Success",
        type: "success",
      })
      setInputAmount("")
      setOutputAmount("")
      queryClient.invalidateQueries({ queryKey: ["fetchBalance"] })
    },
  })

  const [swapMode, setSwapMode] = useState<SwapMode>(SwapMode.EXACT_IN)
  const debouncedInputAmount = useDebounce(inputAmount, 300)
  const debouncedOutputAmount = useDebounce(outputAmount, 300)

  useEffect(() => {
    if (swapMode === SwapMode.EXACT_IN && outputToken) {
      if (!Number(debouncedInputAmount) || !inputToken) {
        setOutputAmount("")
      } else {
        setOutputAmount(formatAmount((+debouncedInputAmount * inputToken.price) / outputToken.price))
      }
    }
  }, [swapMode, debouncedInputAmount, inputToken, outputToken])

  useEffect(() => {
    if (swapMode === SwapMode.EXACT_OUT && inputToken) {
      if (!Number(debouncedOutputAmount) || !outputToken) {
        setInputAmount("")
      } else {
        setInputAmount(formatAmount((+debouncedOutputAmount * outputToken.price) / inputToken.price))
      }
    }
  }, [swapMode, debouncedOutputAmount, inputToken, outputToken])

  const errorMessage = useMemo(() => {
    if (!inputToken || !outputToken) {
      return "Select a token"
    }
    if (!inputAmount || !outputAmount) {
      return "Enter an amount"
    }
    return null
  }, [inputAmount, outputAmount, inputToken, outputToken])

  return (
    <Container>
      <Stack alignItems="center" py={{ md: 16 }}>
        <Stack gap={6}>
          <Stack borderRadius={16} borderWidth={1} gap={4} maxW={420} p={4}>
            <Flex justifyContent="center">
              <Text fontSize="xl" fontWeight="bold">
                Swap
              </Text>
            </Flex>

            <Stack gap={4} position="relative">
              <Stack backgroundColor="bg.muted" borderRadius={16} gap={4} p={4}>
                <Flex justifyContent="space-between">
                  <Text fontSize="sm" fontWeight="semibold">
                    You Pay
                  </Text>
                  <BalanceDisplay onMax={(balance) => setInputAmount(balance)} token={inputToken} />
                </Flex>
                <Flex gap={2} justifyContent="space-between">
                  <Stack>
                    <NumericInput
                      border="none"
                      fontSize="2xl"
                      fontWeight="semibold"
                      h={8}
                      onChange={(event) => {
                        setInputAmount(event.target.value)
                        setSwapMode(SwapMode.EXACT_IN)
                      }}
                      p={0}
                      placeholder="0.0"
                      value={inputAmount}
                    />
                    <Text color="textSecondary" fontSize="xs">
                      {inputAmount && inputToken ? formatPrice(+inputAmount * inputToken.price) : "-"}
                    </Text>
                  </Stack>

                  <Stack alignItems="flex-end" minW="fit-content">
                    <TokenSelectDialog
                      onChange={(token) => {
                        if (token?.address === outputToken?.address) {
                          swapTokens()
                        } else {
                          setInputToken(token)
                        }
                      }}
                      value={inputToken}
                    />
                    <Text color="textSecondary" fontSize="xs">
                      {inputToken ? formatPrice(inputToken.price) : "-"}
                    </Text>
                  </Stack>
                </Flex>
              </Stack>

              <Flex justifyContent="center" position="absolute" top="50%" transform="translateY(-50%)" w="full">
                <Center backgroundColor="bg.panel" borderRadius={6} p={1}>
                  <Button
                    colorPalette="gray"
                    onClick={() => {
                      swapTokens()
                    }}
                    size="xs"
                    variant="subtle"
                  >
                    <MdSwapVert />
                  </Button>
                </Center>
              </Flex>

              <Stack backgroundColor="bg.muted" borderRadius={16} gap={4} p={4}>
                <Flex justifyContent="space-between">
                  <Text fontSize="sm" fontWeight="semibold">
                    Your Receive
                  </Text>
                </Flex>
                <Flex gap={2} justifyContent="space-between">
                  <Stack>
                    <NumericInput
                      border="none"
                      fontSize="2xl"
                      fontWeight="semibold"
                      h={8}
                      onChange={(event) => {
                        setOutputAmount(event.target.value)
                        setSwapMode(SwapMode.EXACT_OUT)
                      }}
                      p={0}
                      placeholder="0.0"
                      value={outputAmount}
                    />
                    <Text color="textSecondary" fontSize="xs">
                      {outputAmount && outputToken ? formatPrice(+outputAmount * outputToken.price) : "-"}
                    </Text>
                  </Stack>

                  <Stack alignItems="flex-end" minW="fit-content">
                    <TokenSelectDialog
                      onChange={(token) => {
                        if (token?.address === inputToken?.address) {
                          swapTokens()
                        } else {
                          setOutputToken(token)
                        }
                      }}
                      value={outputToken}
                    />
                    <Text color="textSecondary" fontSize="xs">
                      {outputToken ? formatPrice(outputToken.price) : "-"}
                    </Text>
                  </Stack>
                </Flex>
              </Stack>
            </Stack>

            <Stack pt={8}>
              <Button
                borderRadius={16}
                colorPalette="purple"
                disabled={!!errorMessage}
                loading={swapMutation.isPending}
                onClick={() => swapMutation.mutateAsync()}
                size="xl"
                variant="subtle"
              >
                {errorMessage ?? "Swap"}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}

export default Swap
