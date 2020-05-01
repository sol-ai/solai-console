import useInterval from "../../hooks/useInterval"
import {
  CharacterConfig,
  EvolvedCharacter,
  EvolvedPopulation,
  SimulationData,
  SimulationResult,
} from "./types"

const backendAddress = "http://localhost:3001"
const apiAddress = backendAddress + "/api"

export const getSimulationsQueueOnline = (): Promise<boolean> =>
  fetch(apiAddress + "/simulationQueueConnected")
    .then((res) => res.json())
    .catch((err) => false)

export const getSimulationDataQueue = (): Promise<SimulationData[]> =>
  fetch(apiAddress + "/simulationsQueue")
    .then((res) => res.json())
    .then((simDataQueue) => {
      if (!simDataQueue) {
        return Promise.reject("simulation data invalid")
      }
      return simDataQueue as SimulationData[]
    })

export const getSimulationResultQueue = (): Promise<SimulationResult[]> =>
  fetch(apiAddress + "/simulationsResultsQueue")
    .then((res) => res.json())
    .then((res) => res as SimulationResult[])

export const deleteSimulationDataQueue = (): Promise<SimulationData[]> =>
  fetch(apiAddress + "/deleteAllSimulations", {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((queue) => queue as SimulationData[])

export const deleteSimulationResultQueue = (): Promise<SimulationResult[]> =>
  fetch(apiAddress + "/deleteAllSimulationResults", {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((queue) => queue as SimulationResult[])

export const postSimulationData = (simulationData: SimulationData) =>
  fetch(apiAddress + "/pushSimulation", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(simulationData),
  })

type RawEvolvedCharacter = [number, CharacterConfig]
type RawEvolvedPopulation = RawEvolvedCharacter[]
const convertFromRawPopulations = (rawPopulations: RawEvolvedPopulation[]): EvolvedPopulation[] => {
  const populations: EvolvedPopulation[] = rawPopulations.map((rawPopulationCharacters) => {
    const evolvedCharacters: EvolvedCharacter[] = rawPopulationCharacters.map((rawCharacter) => {
      const characterConfig: EvolvedCharacter = {
        fitness: rawCharacter[0],
        characterConfig: rawCharacter[1],
      }
      return characterConfig
    })

    const population: EvolvedPopulation = {
      populationId: "pop-id-123",
      epoch: 0,
      isFinalEpoch: true,
      evolvedCharacters,
    }

    return population
  })
  return populations
}

export const getPopulationQueue = () =>
  fetch(apiAddress + "/populations")
    .then((res) => res.json())
    .then((res) => res || Promise.reject())
    .then((res) => res as RawEvolvedPopulation[])
    .then((rawPopulations) => convertFromRawPopulations(rawPopulations))

export const deletePopulationQueue = () =>
  fetch(apiAddress + "/deleteAllPopulations", {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => res as RawEvolvedPopulation[])
    .then((rawPopulation) => convertFromRawPopulations(rawPopulation))
