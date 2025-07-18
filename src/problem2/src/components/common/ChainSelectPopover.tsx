import { Button, ButtonProps, Image, Popover, Portal, Stack, useDisclosure } from "@chakra-ui/react"
import { Chain } from "@rainbow-me/rainbowkit"
import { onematrix, onematrixTestnet } from "config/walletConnect"
import { useState } from "react"
import { MdExpandMore } from "react-icons/md"
import { arbitrum, arbitrumSepolia } from "viem/chains"
import { useSwitchChain } from "wagmi"

const bridgeChains: Chain[] = [
  { ...arbitrum, iconUrl: "https://sepolia.arbiscan.io/assets/generic/html/favicon.ico" },
  onematrix,
  onematrixTestnet,
  { ...arbitrumSepolia, iconUrl: "https://sepolia.arbiscan.io/assets/generic/html/favicon.ico" },
]

type Props = {
  buttonProps?: ButtonProps
  isDevnet?: boolean
  onChange?: (chain: Chain | null) => void
  shouldSync?: boolean
  value?: Chain | null
}

const ChainSelectPopover = ({ buttonProps, isDevnet, onChange, shouldSync, value }: Props) => {
  const { switchChain } = useSwitchChain()

  const { onClose, open, setOpen } = useDisclosure()

  const [currentChain, setCurrentChain] = useState<Chain | null>(null)

  const availableChains = bridgeChains.filter((chain) => {
    if (isDevnet) {
      return chain.id === onematrix.id || chain.id === onematrixTestnet.id
    }
    return true
  })

  const selectedChain = value !== undefined ? value : currentChain

  return (
    <Popover.Root onOpenChange={({ open }) => setOpen(open)} open={open} positioning={{ placement: "bottom-end" }}>
      <Popover.Trigger asChild>
        <Button
          colorPalette="purple"
          px={selectedChain ? 1 : undefined}
          rounded="full"
          size="xs"
          variant="surface"
          {...buttonProps}
        >
          {selectedChain ? (
            <>
              <Image h={6} rounded="full" src={selectedChain.iconUrl as string} />
              {selectedChain.name}
            </>
          ) : (
            "Select Chain"
          )}
          {!buttonProps?.disabled && <MdExpandMore />}
        </Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Body p={4}>
              <Stack gap={1}>
                {availableChains.map((chain) => {
                  const isSelected = chain.id === selectedChain?.id
                  return (
                    <Button
                      colorPalette={isSelected ? "purple" : "gray"}
                      justifyContent="flex-start"
                      key={chain.id}
                      onClick={() => {
                        setCurrentChain(chain)
                        onChange?.(chain)
                        onClose()
                        if (shouldSync) {
                          switchChain({ chainId: chain.id })
                        }
                      }}
                      px={2}
                      rounded="full"
                      variant={isSelected ? "subtle" : "ghost"}
                    >
                      <Image h={6} rounded="full" src={chain.iconUrl as string} />
                      {chain.name}
                    </Button>
                  )
                })}
              </Stack>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}

export default ChainSelectPopover
