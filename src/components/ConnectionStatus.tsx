import React, { ReactNode } from "react"
import styled from "styled-components"

type Props = {
  connected: boolean
}

const Wrapper = styled.span<{ connected: boolean }>`
  background-color: ${(props) => (props.connected ? "#d5ffd7" : "#c13b2e")};
  border-radius: 4px;
  border: 2px solid ${(props) => (props.connected ? "#29cd18" : "none")};
`

export default ({ connected }: Props) => {
  return <Wrapper connected={connected}>{connected ? "Online :)" : "Offline :("}</Wrapper>
}
