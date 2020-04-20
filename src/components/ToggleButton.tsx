import React from "react"
import IconButton from "./IconButton"

type Props = {
  value: boolean
  onChange: (value: boolean) => void
  textBefore?: string
  textAfter?: string
}

export default ({ value, onChange, textBefore, textAfter }: Props) => {
  return (
    <IconButton
      iconType={value ? "check-light" : "cross-light"}
      onClick={() => onChange(!value)}
      textBefore={textBefore}
      textAfter={textAfter}
    />
  )
}
