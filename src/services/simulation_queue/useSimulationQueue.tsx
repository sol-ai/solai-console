import React, { useCallback, useState } from "react"
import useInterval from "../../hooks/useInterval"
import { SimulationData, SimulationResult } from "./types"
import useSimulationQueueOnline from "./useSimulationQueueOnline"
import * as api from "./api"

export type UseSimulationQueue = {
  simulationDataQueue: SimulationData[]
  simulationResultQueue: SimulationResult[]
  deleteSimulationDataQueue: () => void
  deleteSimulationResultQueue: () => void
  pushSimulationData: (simulationData: SimulationData) => void
}

export default (): UseSimulationQueue => {
  const simulationQueueOnline = useSimulationQueueOnline()
  const [simulationDataQueue, setSimulationDataQueue] = useState<SimulationData[]>([])
  const [simulationResultQueue, setSimulationResultQueue] = useState<SimulationResult[]>([])

  useInterval(
    useCallback(() => {
      if (simulationQueueOnline) {
        api
          .getSimulationDataQueue()
          .then(setSimulationDataQueue)
          .catch((err) => null)
      }
    }, [simulationQueueOnline]),
    3000,
    true,
  )

  useInterval(
    useCallback(() => {
      if (simulationQueueOnline) {
        api
          .getSimulationResultQueue()
          .then(setSimulationResultQueue)
          .catch((err) => null)
      }
    }, [simulationQueueOnline]),
    3000,
    true,
  )

  const deleteSimulationDataQueue = () => {
    api.deleteSimulationDataQueue().then((queue) => setSimulationDataQueue(queue))
  }

  const deleteSimulationResultQueue = () => {
    api.deleteSimulationResultQueue().then((queue) => setSimulationResultQueue(queue))
  }

  const pushSimulationData = (simulationData: SimulationData) => {
    api.postSimulationData(simulationData)
  }

  return {
    simulationDataQueue,
    simulationResultQueue,
    deleteSimulationDataQueue,
    deleteSimulationResultQueue,
    pushSimulationData,
  }
}
