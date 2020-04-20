import React, { useState } from "react"
import { SimulationData } from "../../services/simulation_queue/types"
import SingleQueue from "./SingleQueue"
import SolSimulationData from "../../components/SolSimulationData"
import { fetchExampleSimulationData, randomId } from "../../services/example_data/exampleData"
import NumberInput from "../../components/NumberInput"

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
  const [editingDataToPushCount, setEditingDataToPushCount] = useState<number>(1)

  const handleAddSimulationData = () => {
    if (!editingDataToPush) {
      fetchExampleSimulationData().then(setEditingDataToPush)
    }
  }

  const handleAcceptExampleSimulation = () => {
    if (editingDataToPush) {
      pushSimulationData(editingDataToPush)
      if (editingDataToPushCount > 1) {
        Array.from(Array(editingDataToPushCount - 1).keys()).forEach(() => {
          const newData: SimulationData = {
            ...editingDataToPush,
            simulationId: randomId(),
          }
          pushSimulationData(newData)
        })
      }
      setEditingDataToPush(undefined)
    }
  }

  const handleRejectExampleSimulation = () => {
    setEditingDataToPush(undefined)
  }

  const simulationsDataElems = simulationsData.map((simulationData) => (
    <SolSimulationData key={simulationData.simulationId} simulationData={simulationData} />
  ))

  return (
    <SingleQueue
      name={"Simulations"}
      onDeleteAll={deleteAllSimulationsData}
      queueItemsElement={simulationsDataElems}
      exampleData={{
        onAddExampleData: handleAddSimulationData,
        onExampleDataAccepted: handleAcceptExampleSimulation,
        onExampleDataRejected: handleRejectExampleSimulation,
        editingElement: editingDataToPush && (
          <>
            <NumberInput
              name={"Copies"}
              value={editingDataToPushCount}
              onChange={(value) => setEditingDataToPushCount(parseInt(value))}
            />
            <SolSimulationData
              simulationData={editingDataToPush}
              onSimulationDataChange={setEditingDataToPush}
            />
          </>
        ),
      }}
    />
  )
}

export default SimulationDataQueue
