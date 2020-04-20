import React, { useEffect, useState } from "react"
import styled from "styled-components"

type Props = {
  className?: string
  name: string
  value: number
  onSubmit?: (value: number) => void
  onChange?: (value: string) => void
}

const Wrapper = styled.div`
  cursor: pointer;
  &:hover {
    border-bottom: 1px solid gray;
  }
`

const StyledInput = styled.input<{ invalid?: boolean }>`
  background: none;
  background-color: ${(props) => (props.invalid ? "rgba(255,82,77,0.6)" : "none")};
  //border: none;
  outline: none;
  width: 50px;
`

const isValidNumber = (value: string): boolean => !isNaN(Number(value))

export default ({ className, name, value, onSubmit, onChange }: Props) => {
  const [strValue, setStrValue] = useState<string>(value.toString())
  const [validNumber, setValidNumber] = useState<boolean>(isValidNumber(strValue))

  useEffect(() => {
    setStrValue(value.toString())
  }, [value])

  const handleChange = (value: string) => {
    setValidNumber(isValidNumber(value))
    setStrValue(value)
    onChange && onChange(value)
  }

  const handleSubmit = () => {
    if (validNumber) {
      onSubmit && onSubmit(Number(strValue))
    }
  }

  return (
    <Wrapper className={className}>
      <span>{name + " "}</span>
      <StyledInput
        invalid={!validNumber}
        type={"number"}
        value={strValue}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleSubmit}
        onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
      />
    </Wrapper>
  )
}
