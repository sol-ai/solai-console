import { SimulationData, SimulationResult } from "../../services/simulation_queue/types"
import React, { useState } from "react"
import { fetchExampleSimulationData } from "../../services/example_data/exampleData"
import SolSimulationData from "../../components/SolSimulationData"
import SingleQueue from "./SingleQueue"
import SolSimulationResult from "../../components/SolSimulationResult"

type Props = {
  simulationsResult: SimulationResult[]
  deleteAll: () => void
}

const SimulationResultQueue: React.FC<Props> = ({ simulationsResult, deleteAll }) => {
  const simulationsResultElems = simulationsResult.map((simulationResult) => (
    <SolSimulationResult simulationResult={simulationResult} />
  ))

  return <SingleQueue onDeleteAll={deleteAll} queueItemsElement={simulationsResultElems} />
}

export default SimulationResultQueue
