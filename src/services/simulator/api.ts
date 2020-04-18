import { SimulationResult } from "../simulation_queue/types"

const simulationServerURL = "http://localhost:8080"

export const isOnline = (): Promise<boolean> =>
  fetch(simulationServerURL + "/hello")
    .then((res) => true)
    .catch((err) => false)

export const runningSimulations = (): Promise<string[]> =>
  fetch(simulationServerURL + "/runningSimulations")
    .then((res) => res.json())
    .then((json) => json as string[])

export const existingMetrics = (): Promise<string[]> =>
  fetch(simulationServerURL + "/existingMetrics")
    .then((res) => res.json())
    .then((res) => res as string[])

export const intermediateSimulationResult = (
  simulationId: string,
): Promise<SimulationResult | null> =>
  fetch(simulationServerURL + "/intermediateResult/" + simulationId)
    .then((res) => res.json())
    .then((res) => res || null)
    .then((res) => res as SimulationResult | null)
