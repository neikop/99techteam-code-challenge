import { Guide } from "views/Component"
import { Swap } from "views/Swap"

const privateRoute = {
  guide: {
    component: Guide,
    name: "Component",
    path: "/component",
  },
  home: {
    component: Swap,
    name: "Swap",
    path: "/swap",
  },
  swap: {
    component: Swap,
    name: "Swap",
    path: "/swap",
  },
}

export default privateRoute
