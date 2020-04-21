import { useState } from "react"
import { EvolvedPopulation } from "./types"
import useSimulationQueue from "./useSimulationQueue"
import useInterval from "../../hooks/useInterval"

const backendAddress = "http://localhost:3001"
const apiAddress = backendAddress + "/api"

export default (): EvolvedPopulation | undefined => {
  const [population, setPopulation] = useState<EvolvedPopulation | undefined>(undefined)

  useInterval(
    () => {
      fetch(apiAddress + "/populations")
        .then((res) => res.json())
        .then((res) => res as EvolvedPopulation[])
        .then((queue) => queue && queue.length >= 1 && setPopulation(queue[0]))
    },
    3000,
    false,
  )

  return population
}
