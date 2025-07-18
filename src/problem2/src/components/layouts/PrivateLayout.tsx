import { Box, Grid } from "@chakra-ui/react"
import { AppHeader } from "components/app"
import { Navigate, Route, Routes } from "react-router"
import { privateRoute } from "routes"

const PrivateLayout = () => {
  return (
    <Grid as="main" gridTemplateRows="64px 1fr" h="100vh" templateAreas={`"header" "main"`}>
      <AppHeader />
      <Box gridArea="main" px={{ md: 6 }} py={6}>
        <Routes>
          {Object.values(privateRoute).map(({ component: Element, path }) => (
            <Route element={<Element />} key={path} path={path} />
          ))}
          <Route element={<Navigate to={privateRoute.home.path} />} path="*" />
        </Routes>
      </Box>
    </Grid>
  )
}

export default PrivateLayout
