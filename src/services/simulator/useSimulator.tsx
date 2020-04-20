import { useEffect, useState } from "react"
import useInterval from "../../hooks/useInterval"
import * as api from "./api"
import { SimulationResult } from "../simulation_queue/types"

type UseSimulator = {
  online: boolean
  existingMetrics: string[]
  runningSimulationsIds: string[]
  fetchIntermediateResults: (simulationId: string) => Promise<SimulationResult | null>
  headlessSimulations: boolean
  setHeadlessSimulations: (headless: boolean) => void
  simulationUpdateDelay: number
  setSimulationUpdateDelay: (value: number) => void
}

export default (): UseSimulator => {
  const [online, setOnline] = useState<boolean>(false)
  const [runningSimulationsIds, setRunningSimulationsIds] = useState<string[]>([])
  const [existingMetrics, setExistingMetrics] = useState<string[]>([])
  const [headlessSimulations, setHeadlessSimulations] = useState<boolean>(true)
  const [simulationUpdateDelay, setSimulationUpdateDelay] = useState<number>(0)

  useInterval(
    () => {
      api.isOnline().then(setOnline)
    },
    5000,
    true,
  )

  useInterval(() => {
    if (online) {
      api.runningSimulations().then(setRunningSimulationsIds)
    }
  }, 500)

  useEffect(() => {
    if (online) {
      api.existingMetrics().then(setExistingMetrics)
    }
  }, [online])

  useEffect(() => {
    if (online) {
      api
        .setHeadlessSimulations(headlessSimulations)
        .then((headless) => setHeadlessSimulations(headless))
    }
  }, [online])

  const changeHeadlessSimulations = (value: boolean) =>
    api.setHeadlessSimulations(value).then(setHeadlessSimulations)

  const fetchIntermediateResults = api.intermediateSimulationResult

  const apiSetSimulationUpdateDelay = (value: number) => {
    api.setSimulationUpdateDelay(value).then(setSimulationUpdateDelay)
  }

  useEffect(() => {
    apiSetSimulationUpdateDelay(0)
  }, [])

  return {
    online,
    existingMetrics,
    runningSimulationsIds,
    fetchIntermediateResults,
    headlessSimulations,
    setHeadlessSimulations: changeHeadlessSimulations,
    simulationUpdateDelay,
    setSimulationUpdateDelay: apiSetSimulationUpdateDelay,
  }
}
