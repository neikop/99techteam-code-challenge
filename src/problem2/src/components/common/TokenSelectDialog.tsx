import {
  Box,
  Button,
  ButtonProps,
  Center,
  CloseButton,
  Dialog,
  Flex,
  Image,
  Input,
  Portal,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
  useDialog,
} from "@chakra-ui/react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useDebounce } from "@uidotdev/usehooks"
import { InfiniteScroller } from "components/common"
import { useMemo, useState } from "react"
import { MdExpandMore } from "react-icons/md"
import { devnetService } from "services"
import { formatPrice } from "utils/common"

type Props = {
  buttonProps?: ButtonProps
  onChange?: (token: null | Token) => void
  value?: null | Token
}

const TokenSelectDialog = ({ buttonProps, onChange, value }: Props) => {
  const [searchText, setSearchText] = useState("")
  const [currentToken, setCurrentToken] = useState<null | Token>(null)

  const dialog = useDialog()
  const debouncedSearchText = useDebounce(searchText, 300)

  const selectedToken = value !== undefined ? value : currentToken

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    getNextPageParam: (lastPage: TokensPagination, allPages) => {
      const maxPage = Math.ceil(lastPage.pagination.totalItems / 20)
      const nextPage = allPages.length + 1
      if (nextPage > maxPage) return undefined
      return nextPage
    },
    initialPageParam: 1,
    queryFn: ({ pageParam: page }) => {
      return devnetService.fetchTokens({
        page,
        pageSize: 20,
        query: debouncedSearchText,
      })
    },
    queryKey: ["devnetService.fetchTokens", { query: debouncedSearchText }],
  })

  const availableTokens = useMemo(() => {
    return data?.pages.flatMap((page) => page.tokens) ?? []
  }, [data])

  return (
    <Dialog.RootProvider placement="top" scrollBehavior="inside" size="sm" value={dialog}>
      <Dialog.Trigger asChild>
        <Button
          colorPalette="purple"
          px={selectedToken ? 1 : undefined}
          rounded="full"
          size="xs"
          variant="surface"
          {...buttonProps}
        >
          {selectedToken ? (
            <>
              <Image h={6} rounded="full" src={selectedToken.logoURI} w={6} />
              {selectedToken.symbol}
            </>
          ) : (
            "Select Token"
          )}
          <MdExpandMore />
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content mt="142px">
            <Dialog.Header>
              <Dialog.Title>Select a Token</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body maxH={600} overflowY="scroll" pr={4} pt={0}>
              <InfiniteScroller
                hasMore={!!hasNextPage}
                loadMore={() => {
                  if (!isFetching) fetchNextPage()
                }}
                useWindow={false}
              >
                <Box backgroundColor="bg.panel" pb={2} position="sticky" top={0} zIndex={1}>
                  <Input
                    colorPalette="purple"
                    onChange={(event) => setSearchText(event.target.value)}
                    placeholder="Search by token name, symbol or address"
                    rounded="full"
                    size="xl"
                    value={searchText}
                  />
                </Box>
                <Stack gap={2} minH={240}>
                  {availableTokens.map((token) => {
                    const isSelected = token.address === selectedToken?.address
                    return (
                      <Button
                        borderRadius={8}
                        colorPalette={isSelected ? "purple" : "gray"}
                        justifyContent="flex-start"
                        key={`${token.chainId}/${token.address}`}
                        minH={12}
                        onClick={async () => {
                          setCurrentToken(token)
                          onChange?.(token)
                          dialog.setOpen(false)
                        }}
                        overflow="hidden"
                        px={2}
                        variant={isSelected ? "subtle" : "ghost"}
                      >
                        <Image h={6} rounded="full" src={token.logoURI} w={6} />
                        <Box flex={1} overflow="hidden" textAlign="left">
                          <Text>{token.symbol}</Text>
                          <Flex flex={1} gap={4} justifyContent="space-between">
                            <Text color="textSecondary" fontSize="xs" fontWeight="normal" truncate={true}>
                              {token.name}
                            </Text>
                            <Text color="textSecondary" fontSize="xs" fontWeight="normal">
                              {formatPrice(token.price)}
                            </Text>
                          </Flex>
                        </Box>
                      </Button>
                    )
                  })}

                  {isFetching && (
                    <Flex alignItems="center" gap={2} h={12} px={1}>
                      <SkeletonCircle size={8} />
                      <SkeletonText noOfLines={2} />
                    </Flex>
                  )}

                  {data?.pages[0]?.pagination.totalItems === 0 && (
                    <Center h={12}>
                      <Text color="textSecondary">No results found.</Text>
                    </Center>
                  )}
                </Stack>
              </InfiniteScroller>
            </Dialog.Body>

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.RootProvider>
  )
}

export default TokenSelectDialog
