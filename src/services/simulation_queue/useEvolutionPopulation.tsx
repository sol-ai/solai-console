import { useCallback, useState } from "react"
import { EvolvedPopulation } from "./types"
import useInterval from "../../hooks/useInterval"
import * as api from "./api"
import useSimulationQueueOnline from "./useSimulationQueueOnline"

type UseEvolutionPopulation = {
  populations: EvolvedPopulation[]
  deleteAllPopulations: () => void
}

export default (): UseEvolutionPopulation => {
  const simulationQueueOnline = useSimulationQueueOnline()
  const [populations, setPopulations] = useState<EvolvedPopulation[]>([])

  useInterval(
    useCallback(() => {
      if (simulationQueueOnline) {
        api.getPopulationQueue().then((populations) => setPopulations(populations))
      }
    }, [simulationQueueOnline]),
    3000,
    true,
  )

  const deleteAllPopulations = useCallback(() => {
    if (simulationQueueOnline) {
      api.deletePopulationQueue().then(setPopulations)
    }
  }, [simulationQueueOnline])

  return {
    populations,
    deleteAllPopulations,
  }
}
