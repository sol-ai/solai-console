import { useEffect, useState } from "react"
import useInterval from "../../hooks/useInterval"
import {
  isOnline,
  runningSimulations,
  existingMetrics as fetchExistingMetrics,
  intermediateSimulationResult,
} from "./api"
import { SimulationResult } from "../simulation_queue/types"

type UseSimulator = {
  online: boolean
  existingMetrics: string[]
  runningSimulationsIds: string[]
  fetchIntermediateResults: (simulationId: string) => Promise<SimulationResult | null>
}

export default (): UseSimulator => {
  const [online, setOnline] = useState<boolean>(false)
  const [runningSimulationsIds, setRunningSimulationsIds] = useState<string[]>([])
  const [existingMetrics, setExistingMetrics] = useState<string[]>([])

  useInterval(
    () => {
      isOnline().then(setOnline)
    },
    5000,
    true,
  )

  useInterval(() => {
    if (online) {
      runningSimulations().then(setRunningSimulationsIds)
    }
  }, 500)

  useEffect(() => {
    if (online) {
      fetchExistingMetrics().then(setExistingMetrics)
    }
  }, [online])

  const fetchIntermediateResults = intermediateSimulationResult

  return { online, existingMetrics, runningSimulationsIds, fetchIntermediateResults }
}
