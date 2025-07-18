import { Box } from "@chakra-ui/react"

const authRoute = {
  login: {
    component: Box,
    path: "/login",
    url: "/auth/login",
  },
  register: {
    component: Box,
    path: "/register",
    url: "/auth/register",
  },
}

export default authRoute
