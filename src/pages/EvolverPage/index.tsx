import React, { ReactNode, useState } from "react"
import SingleQueue from "../SimulationQueuePage/SingleQueue"
import ReactJson from "react-json-view-ts"
import styled from "styled-components"
import useEvolutionPopulation from "../../services/simulation_queue/useEvolutionPopulation"
import CharacterConfigComp from "../../components/CharacterConfigComp"
import {
  CharacterConfig,
  EvolvedPopulation,
  SimulationData,
} from "../../services/simulation_queue/types"
import IconButton from "../../components/IconButton"
import useSimulationQueue from "../../services/simulation_queue/useSimulationQueue"
import { randomId } from "../../services/example_data/exampleData"

type Props = {
  titleElement: ReactNode
}

const Wrapper = styled.div``

const EvolverPage: React.FC<Props> = ({ titleElement }) => {
  const population: EvolvedPopulation | undefined = useEvolutionPopulation()
  const [
    simulationsQueueConnected,
    simulationsQueue,
    simulationsResultsQueue,
    deleteAllSimulations,
    deleteAllSimulationResults,
    pushExampleSimulation,
  ] = useSimulationQueue()

  const [playStage, setPlayStage] = useState<string[]>([])

  const items = population
    ? population.map((evolvedChar) => (
        <div>
          <span>{evolvedChar[0]}</span>
          <CharacterConfigComp
            onClick={(charId) => playStage.length < 2 && setPlayStage([...playStage, charId])}
            characterId={evolvedChar[1].characterId}
            characterConfig={evolvedChar[1]}
          />
        </div>
      ))
    : []

  const handlePlay = () => {
    if (population && playStage.length === 2) {
      const charactersConfigs: CharacterConfig[] = playStage
        .map((charId) =>
          population
            .map(([fitness, charConfig]) => charConfig)
            .find((charConfig) => charConfig.characterId === charId),
        )
        .filter((charConfig) => charConfig !== undefined) as CharacterConfig[]
      if (charactersConfigs.length === 2) {
        const simulation: SimulationData = {
          simulationId: randomId(),
          charactersConfigs: charactersConfigs,
          metrics: ["gameLength"],
        }

        pushExampleSimulation(simulation)
      }
    }
  }

  return (
    <Wrapper>
      {titleElement}
      {playStage.length === 2 && (
        <IconButton iconType={"check-light"} textAfter={"PLAY"} onClick={handlePlay} />
      )}
      {playStage.map((charId, index) => (
        <CharacterConfigComp
          characterId={charId}
          onClick={(charId) =>
            setPlayStage([...playStage.slice(0, index), ...playStage.slice(index + 1)])
          }
        />
      ))}

      {/*{population}*/}
      <SingleQueue name={"Evolved"} onDeleteAll={() => {}} queueItemsElement={items} />
    </Wrapper>
  )
}

export default EvolverPage
