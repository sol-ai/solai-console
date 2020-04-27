import { CharacterConfig, SimulationData } from "../simulation_queue/types"
import { v4 as uuid } from "uuid"

const fetchAsCharacterConfig = (filename: string) =>
  fetch(filename)
    .then((res) => res.json())
    .then((res) => res as CharacterConfig)
    .then((charConfig) => ({ ...charConfig, characterId: randomId() }))

export const fetchExampleCharactersConfig = async (): Promise<CharacterConfig[]> => {
  const shrankConfig = await fetchAsCharacterConfig("shrankConfig.json")
  const schmathiasConfig = await fetchAsCharacterConfig("schmathiasConfig.json")
  const brailConfig = await fetchAsCharacterConfig("brailConfig.json")
  const magnetConfig = await fetchAsCharacterConfig("magnetConfig.json")
  return [shrankConfig, schmathiasConfig, brailConfig, magnetConfig]
}

export const fetchExampleSimulationData = (): Promise<SimulationData> =>
  fetchExampleCharactersConfig().then((charConfigs) => ({
    simulationId: randomId(),
    charactersConfigs: [charConfigs[0], charConfigs[1]],
    metrics: ["gameLength", "nearDeathFrames", "characterWon"],
  }))

export const randomId = (): string => uuid()
