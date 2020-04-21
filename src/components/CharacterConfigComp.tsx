import React from "react"
import { CharacterConfig, SimulationResult } from "../services/simulation_queue/types"
import styled from "styled-components"
import ReactJson from "react-json-view-ts"

type Props = {
  characterId: string
  characterConfig?: CharacterConfig
  onClick?: (characterId: string) => void
}

const Wrapper = styled.div`
  border: 3px solid black;
  border-radius: 10px;
  background-color: rgb(106, 154, 205);
  padding: 3px;
`

const Header = styled.div`
  cursor: pointer;
`

const CharacterConfigComp: React.FC<Props> = ({ characterId, characterConfig, onClick }) => {
  return (
    <Wrapper>
      <Header onClick={() => onClick && onClick(characterId)}>
        {characterId.slice(0, Math.min(8, characterId.length))}
      </Header>
      {characterConfig && (
        <ReactJson
          src={characterConfig}
          name={"character config"}
          theme={"harmonic"}
          enableClipboard={false}
          displayDataTypes={false}
          displayObjectSize={false}
          collapsed={0}
        />
      )}
    </Wrapper>
  )
}

export default CharacterConfigComp
