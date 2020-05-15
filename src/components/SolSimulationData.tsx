import React, { useState } from "react"
import { SimulationData } from "../services/simulation_queue/types"
import styled from "styled-components"
import ReactJson from "react-json-view-ts"

type Props = {
  simulationData?: SimulationData
  simulationId?: string
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

const SolSimulationData: React.FC<Props> = ({
  simulationData,
  simulationId,
  onSimulationDataChange,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false)
  const useSimulationId = simulationData
    ? simulationData.simulationId
    : simulationId
    ? simulationId
    : "(no id)"
  return (
    <Wrapper>
      <Header onClick={() => setExpanded(!expanded)}>
        {useSimulationId.slice(0, Math.min(8, useSimulationId.length))}
      </Header>
      {simulationData && expanded && (
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
