import React, { useState } from "react"
import { SimulationData } from "../services/simulation_queue/types"
import styled from "styled-components"
import ReactJson from "react-json-view-ts"

type Props = {
  simulationData: SimulationData
  onSimulationDataChange?: (simulationData: SimulationData) => void
}

const Wrapper = styled.div`
  border: 3px solid black;
  border-radius: 10px;
  background-color: rgb(205, 168, 105);
  padding: 3px;
`

const Header = styled.div`
  cursor: pointer;
`

const SolSimulationData: React.FC<Props> = ({ simulationData, onSimulationDataChange }) => {
  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <Wrapper>
      <Header onClick={() => setExpanded(!expanded)}>
        {simulationData.simulationId.slice(0, Math.min(8, simulationData.simulationId.length))}
      </Header>
      {expanded && (
        <ReactJson
          src={simulationData}
          name={"simulationData"}
          theme={"harmonic"}
          enableClipboard={false}
          displayDataTypes={false}
          displayObjectSize={false}
          collapsed={2}
          onEdit={
            onSimulationDataChange &&
            ((edit) => onSimulationDataChange(edit.updated_src as SimulationData))
          }
          onDelete={
            onSimulationDataChange &&
            ((edit) => onSimulationDataChange(edit.updated_src as SimulationData))
          }
          onAdd={
            onSimulationDataChange &&
            ((edit) => onSimulationDataChange(edit.updated_src as SimulationData))
          }
        />
      )}
    </Wrapper>
  )
}

export default SolSimulationData
