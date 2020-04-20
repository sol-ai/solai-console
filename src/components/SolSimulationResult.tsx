import React, { useState } from "react"
import { SimulationResult } from "../services/simulation_queue/types"
import styled from "styled-components"
import ReactJson from "react-json-view-ts"

type Props = {
  simulationId: string
  simulationResult?: SimulationResult
  onClick?: (simulationId: string) => void
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

const SolSimulationResult: React.FC<Props> = ({ simulationId, simulationResult, onClick }) => {
  return (
    <Wrapper>
      <Header onClick={() => onClick && onClick(simulationId)}>
        {simulationId.slice(0, Math.min(8, simulationId.length))}
      </Header>
      {simulationResult && (
        <ReactJson
          src={simulationResult}
          name={"simulationResult"}
          theme={"harmonic"}
          enableClipboard={false}
          displayDataTypes={false}
          displayObjectSize={false}
          collapsed={3}
          shouldCollapse={({ name, src, type }) =>
            name ? ["simulationData", "simulationId"].includes(name) : false
          }
        />
      )}
    </Wrapper>
  )
}

export default SolSimulationResult
