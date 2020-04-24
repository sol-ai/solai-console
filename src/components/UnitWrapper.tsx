import React, { ReactNode, useState } from "react"
import styled from "styled-components"

type Props = {
  className?: string
  color: string
  headerText: string
  onHeaderClick?: (expanded: boolean) => void
  children?: any
}

const Wrapper = styled.div<{ color: string }>`
  border: 3px solid black;
  border-radius: 10px;
  background-color: ${(props) => props.color};
  padding: 3px;
`

const Header = styled.div`
  cursor: pointer;
`

export default ({ className, color, headerText, onHeaderClick, children }: Props) => {
  const [expanded, setExpanded] = useState<boolean>(false)

  const handleHeaderClick = () => {
    const newExpanded = !expanded
    setExpanded(newExpanded)
    onHeaderClick && onHeaderClick(newExpanded)
  }

  return (
    <Wrapper color={color} className={className}>
      <Header onClick={handleHeaderClick}>{headerText}</Header>
      {expanded && children}
    </Wrapper>
  )
}
