import { CharacterConfig, SimulationData } from "../simulation_queue/types"
import { v4 as uuid } from "uuid"

export const fetchExampleCharacterConfig = (): Promise<CharacterConfig> =>
  fetch("exampleFrankConfig.json")
    .then((res) => res.json())
    .then((res) => res as CharacterConfig)

export const fetchExampleSimulationData = (): Promise<SimulationData> =>
  fetchExampleCharacterConfig().then((charConfig) => ({
    simulationId: uuid(),
    charactersConfigs: [charConfig, charConfig],
    metrics: ["gameLength", "nearDeathFrames"],
  }))
