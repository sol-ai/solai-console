import React from "react"
import { SimulationData } from "../services/simulation_queue/types"
import styled from "styled-components"

type Props = {
  simulationData: SimulationData
  expanded: boolean
}

const Wrapper = styled.div``

const Property: React.FC<{ name: string; value: number | string }> = ({ name, value }) => {
  return (
    <div>
      <span>{name}</span>
      {typeof value === "string" ? (
        <input type={"text"} value={value} />
      ) : (
        <input type={"number"} value={value} />
      )}
    </div>
  )
}

const SolSimulationData: React.FC<Props> = ({ simulationData }) => {
  const characterProperties = simulationData.charactersConfigs.map((charConfig) => (
    <Property name={"characterId"} value={charConfig.characterId} />
  ))
  return <Wrapper>{characterProperties}</Wrapper>
}

export default SolSimulationData
