import { SimulationResult } from "../../services/simulation_queue/types"
import React, { useEffect, useState } from "react"
import SingleQueue from "../../components/SingleQueue"
import SolSimulationResult from "../../components/SolSimulationResult"

type Props = {
  simulationsResult: SimulationResult[]
  deleteAll: () => void
}

const SimulationResultQueue: React.FC<Props> = ({ simulationsResult, deleteAll }) => {
  const [simulationsResultExpanded, setSimulationsResultExpanded] = useState<string[]>([])

  // remove expanded simulationResults if the corresponding simulation is not present
  useEffect(() => {
    const simResExpPresent = simulationsResultExpanded.filter((simResExpId) =>
      simulationsResult.find((simRes) => simRes.simulationId === simResExpId),
    )
    if (simResExpPresent.length !== simulationsResultExpanded.length) {
      setSimulationsResultExpanded(simResExpPresent)
    }
  }, [simulationsResult, simulationsResultExpanded])

  const handleResultClicked = (simulationId: string) => {
    const indexOfSimulationId = simulationsResultExpanded.indexOf(simulationId)
    if (indexOfSimulationId === -1) {
      setSimulationsResultExpanded([...simulationsResultExpanded, simulationId])
    } else {
      setSimulationsResultExpanded([
        ...simulationsResultExpanded.slice(0, indexOfSimulationId),
        ...simulationsResultExpanded.slice(indexOfSimulationId + 1),
      ])
    }
  }

  const simulationsResultElems = simulationsResult.map((simulationResult) => (
    <SolSimulationResult
      key={simulationResult.simulationId}
      simulationId={simulationResult.simulationId}
      simulationResult={
        simulationsResultExpanded.includes(simulationResult.simulationId)
          ? simulationResult
          : undefined
      }
      onClick={handleResultClicked}
    />
  ))

  return (
    <SingleQueue name={"Results"} onDeleteAll={deleteAll}>
      {simulationsResultElems}
    </SingleQueue>
  )
}

export default SimulationResultQueue
