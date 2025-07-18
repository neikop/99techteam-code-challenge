import { Input, InputProps } from "@chakra-ui/react"
import { NumericFormat, NumericFormatProps } from "react-number-format"

type Props = InputProps & NumericFormatProps

const NumericInput = (props: Props) => {
  return <NumericFormat {...props} customInput={Input} />
}

export default NumericInput
