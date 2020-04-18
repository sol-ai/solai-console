import React, { useState } from "react"
import useInterval from "../../hooks/useInterval"
import { SimulationData, SimulationResult } from "./types"
import { v4 as uuid } from "uuid"

const backendAddress = "http://localhost:3001"
const apiAddress = backendAddress + "/api"

export default (): [
  boolean,
  SimulationData[],
  SimulationResult[],
  () => void,
  () => void,
  (simulationData: SimulationData) => void,
] => {
  const [simulationsQueueConnected, setSimulationsQueueConnected] = useState<boolean>(false)
  const [simulationsQueue, setSimulationsQueue] = useState<SimulationData[]>([])
  const [simulationsResultsQueue, setSimulationsResultsQueue] = useState<SimulationResult[]>([])
  useInterval(() => {
    fetch(apiAddress + "/simulationQueueConnected")
      .then((res) => res.json())
      .then(setSimulationsQueueConnected)
      .catch((err) => null)
  }, 1000)

  useInterval(() => {
    fetch(apiAddress + "/simulationsQueue")
      .then((res) => res.json())
      .then((simDataQueue) => {
        console.log(simDataQueue)
        if (!simDataQueue) {
          Promise.reject("simulation data invalid")
        }
        return simDataQueue as SimulationData[]
      })
      .then(setSimulationsQueue)
      .catch((err) => null)
  }, 1000)

  useInterval(() => {
    fetch(apiAddress + "/simulationsResultsQueue")
      .then((res) => res.json())
      .then(setSimulationsResultsQueue)
      .catch((err) => null)
  }, 1000)

  const deleteAllSimulations = () => {
    fetch(apiAddress + "/deleteAllSimulations", {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((queue) => setSimulationsQueue(queue))
  }

  const deleteAllSimulationResults = () => {
    fetch(apiAddress + "/deleteAllSimulationResults", {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((queue) => setSimulationsResultsQueue(queue))
  }

  const pushExampleSimulation = (simulationData: SimulationData) => {
    fetch(apiAddress + "/pushSimulation", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(simulationData),
    })
  }

  return [
    simulationsQueueConnected,
    simulationsQueue,
    simulationsResultsQueue,
    deleteAllSimulations,
    deleteAllSimulationResults,
    pushExampleSimulation,
  ]
}
