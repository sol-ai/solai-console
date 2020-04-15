import React, { useState } from "react"
import { SimulationResult } from "../services/simulation_queue/types"
import styled from "styled-components"
import ReactJson from "react-json-view-ts"

type Props = {
  simulationResult: SimulationResult
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

const SolSimulationResult: React.FC<Props> = ({ simulationResult }) => {
  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <Wrapper>
      <Header onClick={() => setExpanded(!expanded)}>
        {simulationResult.simulationId.slice(0, Math.min(8, simulationResult.simulationId.length))}
      </Header>
      {expanded && (
        <ReactJson
          src={simulationResult}
          name={"simulationData"}
          theme={"harmonic"}
          enableClipboard={false}
          displayDataTypes={false}
          displayObjectSize={false}
          collapsed={2}
        />
      )}
    </Wrapper>
  )
}

export default SolSimulationResult
