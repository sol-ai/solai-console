import React, { ReactNode, useState } from "react"
import { SimulationData } from "../../services/simulation_queue/types"
import SingleQueue from "./SingleQueue"
import SolSimulationData from "../../components/SolSimulationData"
import { fetchExampleSimulationData } from "../../services/example_data/exampleData"

type Props = {
  simulationsData: SimulationData[]
  deleteAllSimulationsData: () => void
  pushSimulationData: (simulationData: SimulationData) => void
}

const SimulationDataQueue: React.FC<Props> = ({
  simulationsData,
  deleteAllSimulationsData,
  pushSimulationData,
}) => {
  const [editingDataToPush, setEditingDataToPush] = useState<SimulationData | undefined>(undefined)

  const handleAddSimulationData = () => {
    if (!editingDataToPush) {
      fetchExampleSimulationData().then(setEditingDataToPush)
    }
  }

  const handleAcceptExampleSimulation = () => {
    if (editingDataToPush) {
      pushSimulationData(editingDataToPush)
      setEditingDataToPush(undefined)
    }
  }

  const handleRejectExampleSimulation = () => {
    setEditingDataToPush(undefined)
  }

  const simulationsDataElems = simulationsData.map((simulationData) => (
    <SolSimulationData simulationData={simulationData} />
  ))

  return (
    <SingleQueue
      onDeleteAll={deleteAllSimulationsData}
      queueItemsElement={simulationsDataElems}
      exampleData={{
        onAddExampleData: handleAddSimulationData,
        onExampleDataAccepted: handleAcceptExampleSimulation,
        onExampleDataRejected: handleRejectExampleSimulation,
        editingElement: editingDataToPush && (
          <SolSimulationData
            simulationData={editingDataToPush}
            onSimulationDataChange={setEditingDataToPush}
          />
        ),
      }}
    />
  )
}

export default SimulationDataQueue
