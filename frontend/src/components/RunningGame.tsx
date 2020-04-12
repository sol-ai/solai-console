import React from "react";
import styled from "styled-components";

type Props = {
  gameId: string
  onTerminateClick?: (gameId: string) => void
  onPlayersDataClick?: (gameId: string) => void
}

const Wrapper = styled.div`
  background-color: #bcffea;
`

const TerminateButton = styled.button`
  background-color: unset;
  border: unset;
  transition: opacity 0.15s;
  cursor: pointer;
  &:hover {
    //background-color: #ff4f52;
    //border-color: black;
    opacity: 60%;
  }
`

const RunningGame: React.FC<Props> = ({gameId, onTerminateClick, onPlayersDataClick}) => {

  return (
    <Wrapper>
      {gameId}
      <button type={"button"} onClick={() => onPlayersDataClick && onPlayersDataClick(gameId)}>Get data</button>
      <TerminateButton type={"button"} onClick={() => onTerminateClick && onTerminateClick(gameId)}>&#x274C;</TerminateButton>
    </Wrapper>
  )
}

export default RunningGame