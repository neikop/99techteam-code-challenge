import { Button, Center, Container, HStack, Link, SimpleGrid, Stack, Text } from "@chakra-ui/react"

const Guide = () => {
  const colors = ["gray", "purple"]
  const types = ["ghost", "subtle", "outline", "surface", "text"]

  return (
    <Container>
      <Stack gap={6}>
        <Stack>
          <Text fontWeight="semibold">Button</Text>
          <SimpleGrid columns={types.length + 1} gap={2} w={600}>
            {colors.map((color) => (
              <>
                <Button colorPalette={color} textTransform="capitalize" variant="plain">
                  {color}
                </Button>
                {types.map((type) => (
                  <>
                    <Button
                      colorPalette={color}
                      key={`${color}/${type}`}
                      textTransform="capitalize"
                      variant={type as "solid"}
                    >
                      {type}
                    </Button>
                  </>
                ))}
              </>
            ))}
          </SimpleGrid>
        </Stack>

        <Stack alignItems="flex-start">
          <Text fontWeight="semibold">Link</Text>
          <Link href="https://google.com" target="_blank">
            https://google.com (blue)
          </Link>
          <Link colorPalette="purple" href="https://google.com" target="_blank">
            https://google.com (purple)
          </Link>
        </Stack>

        <Stack>
          <Text fontWeight="semibold">Color</Text>
          <SimpleGrid columns={2} gap={2} w="fit-content">
            <Text color="textSecondary" w={200}>
              textSecondary
            </Text>
            <Text color="primary.main">primary.main</Text>
            <Text color="black">black</Text>
            <Text color="primary.dark">primary.dark</Text>
          </SimpleGrid>
        </Stack>

        <Stack>
          <Text fontWeight="semibold">Background</Text>
          <HStack>
            <Center backgroundColor="bg.primary" p={2} w={200}>
              <Text>bg.primary</Text>
            </Center>
            <Center backgroundColor="bg.muted" p={2} w={200}>
              <Text>bg.muted</Text>
            </Center>
          </HStack>
        </Stack>
      </Stack>
    </Container>
  )
}

export default Guide
