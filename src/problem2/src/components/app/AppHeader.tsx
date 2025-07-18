import { Center, Flex, Image } from "@chakra-ui/react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { AppSidebar } from "components/app"
import { Link } from "react-router"
import { privateRoute } from "routes"

const AppHeader = () => {
  return (
    <Flex alignItems="stretch" gap={4} gridArea="header" justifyContent="space-between" px={6} shadow="sm">
      <Flex alignItems="center" gap={10} mdDown={{ flex: 1, justifyContent: "space-between" }}>
        <Center borderRadius={4} borderWidth={1} p={2}>
          <Link to={privateRoute.home.path}>
            <Image src="/vite.svg" />
          </Link>
        </Center>
        <AppSidebar />
      </Flex>

      <Center smDown={{ bottom: 0, h: 16, left: 0, position: "fixed", right: 0, shadow: "sm" }}>
        <ConnectButton />
      </Center>
    </Flex>
  )
}

export default AppHeader
