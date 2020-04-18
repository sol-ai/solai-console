import React, { CSSProperties } from "react"
import styled from "styled-components"

type Props = {
  className?: string
  style?: CSSProperties
  iconType: "cross" | "check" | "check-light" | "cross-light"
  onClick?: () => void
  textBefore?: string
  textAfter?: string
}

const ICONS_BY_NAME: Record<string, string> = {
  cross: "&#x274C;",
  check: "&#x2705;",
  "check-light": "&#x2713;",
  "cross-light": "&#x2716;",
}

const StyledButton = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid gray;
  }
`

const IconButton: React.FC<Props> = ({
  className,
  style,
  iconType,
  onClick,
  textBefore,
  textAfter,
}) => {
  return (
    <StyledButton
      style={style}
      className={className}
      onClick={onClick && onClick}
      dangerouslySetInnerHTML={{
        __html: `${textBefore ? textBefore : ""}${ICONS_BY_NAME[iconType]}${
          textAfter ? textAfter : ""
        }`,
      }}
    />
  )
}

export default IconButton
