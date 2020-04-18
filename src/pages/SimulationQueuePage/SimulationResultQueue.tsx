import { SimulationResult } from "../../services/simulation_queue/types"
import React from "react"
import SingleQueue from "./SingleQueue"
import SolSimulationResult from "../../components/SolSimulationResult"

type Props = {
  simulationsResult: SimulationResult[]
  deleteAll: () => void
}

const SimulationResultQueue: React.FC<Props> = ({ simulationsResult, deleteAll }) => {
  const simulationsResultElems = simulationsResult.map((simulationResult) => (
    <SolSimulationResult key={simulationResult.simulationId} simulationResult={simulationResult} />
  ))

  return <SingleQueue onDeleteAll={deleteAll} queueItemsElement={simulationsResultElems} />
}

export default SimulationResultQueue
