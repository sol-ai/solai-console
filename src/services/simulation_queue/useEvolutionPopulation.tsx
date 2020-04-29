import { useState } from "react"
import { CharacterConfig, EvolvedCharacter, EvolvedPopulation } from "./types"
import useInterval from "../../hooks/useInterval"
import { randomId } from "../example_data/exampleData"

const backendAddress = "http://localhost:3001"
const apiAddress = backendAddress + "/api"

type RawEvolvedCharacter = { fitness: number; characterConfig: CharacterConfig }
type RawEvolvedPopulation = RawEvolvedCharacter[]

type UseEvolutionPopulation = {
  populations: EvolvedPopulation[]
  deleteAllPopulations: () => void
}

const convertFromRawPopulations = (rawPopulations: RawEvolvedPopulation[]): EvolvedPopulation[] => {
  const populations: EvolvedPopulation[] = rawPopulations.map((rawPopulationCharacters) => {
    const evolvedCharacters: EvolvedCharacter[] = Object.values(rawPopulationCharacters).map(
      (rawCharacter) => {
        const characterConfig: EvolvedCharacter = {
          fitness: rawCharacter.fitness,
          characterConfig: rawCharacter.characterConfig,
        }
        return characterConfig
      },
    )

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

export default (): UseEvolutionPopulation => {
  const [populations, setPopulations] = useState<EvolvedPopulation[]>([])

  useInterval(
    () => {
      fetch(apiAddress + "/populations")
        .then((res) => res.json())
        .then((res) => res || Promise.reject())
        .then((res) => res as RawEvolvedPopulation[])
        .then((rawPopulations) => convertFromRawPopulations(rawPopulations))
        .then((populations) => setPopulations(populations))
    },
    3000,
    true,
  )

  const deleteAllPopulations = () => {
    fetch(apiAddress + "/deleteAllPopulations", {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => res as RawEvolvedPopulation[])
      .then((rawPopulation) => convertFromRawPopulations(rawPopulation))
      .then(setPopulations)
  }

  return {
    populations,
    deleteAllPopulations,
  }
}
