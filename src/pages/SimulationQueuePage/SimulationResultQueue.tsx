import { SimulationResult } from "../../services/simulation_queue/types"
import React, { useState } from "react"
import SingleQueue from "./SingleQueue"
import SolSimulationResult from "../../components/SolSimulationResult"

type Props = {
  simulationsResult: SimulationResult[]
  deleteAll: () => void
}

const SimulationResultQueue: React.FC<Props> = ({ simulationsResult, deleteAll }) => {
  const [simulationsResultExpanded, setSimulationsResultExpanded] = useState<Set<string>>(new Set())

  const handleResultCliked = (simulationId: string) => {
    setSimulationsResultExpanded((prevSet) => {
      if (prevSet.has(simulationId)) {
        prevSet.delete(simulationId)
        return new Set(prevSet)
      } else {
        return new Set(prevSet.add(simulationId))
      }
    })
  }

  const simulationsResultElems = simulationsResult.map((simulationResult) => (
    <SolSimulationResult
      key={simulationResult.simulationId}
      simulationId={simulationResult.simulationId}
      simulationResult={
        simulationsResultExpanded.has(simulationResult.simulationId) ? simulationResult : undefined
      }
      onClick={handleResultCliked}
    />
  ))

  return (
    <SingleQueue
      name={"Results"}
      onDeleteAll={deleteAll}
      queueItemsElement={simulationsResultElems}
    />
  )
}

export default SimulationResultQueue
