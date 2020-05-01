import React, { ReactNode, useState } from "react"
import SingleQueue from "../../components/SingleQueue"
import ReactJson from "react-json-view-ts"
import styled from "styled-components"
import useEvolutionPopulation from "../../services/simulation_queue/useEvolutionPopulation"
import Character from "../../components/Character"
import {
  CharacterConfig,
  EvolvedPopulation,
  SimulationData,
} from "../../services/simulation_queue/types"
import IconButton from "../../components/IconButton"
import useSimulationQueue from "../../services/simulation_queue/useSimulationQueue"
import { randomId } from "../../services/example_data/exampleData"
import Population from "../../components/Population"

type Props = {
  titleElement: ReactNode
}

const Wrapper = styled.div``

const EvolverPage: React.FC<Props> = ({ titleElement }) => {
  const { populations, deleteAllPopulations } = useEvolutionPopulation()
  const { pushSimulationData } = useSimulationQueue()

  const [playStage, setPlayStage] = useState<CharacterConfig[]>([])

  const handlePlay = () => {
    if (playStage.length === 2) {
      const charactersConfigs = playStage

      const simulation: SimulationData = {
        simulationId: randomId(),
        charactersConfigs: charactersConfigs,
        metrics: ["gameLength"],
      }

      pushSimulationData(simulation)
    }
  }

  return (
    <Wrapper>
      {titleElement}
      {playStage.length === 2 && (
        <IconButton iconType={"check-light"} textAfter={"PLAY"} onClick={handlePlay} />
      )}
      {playStage.map((characterConfig, index) => (
        <Character
          key={characterConfig.characterId}
          characterId={characterConfig.characterId}
          onHeaderClick={(charId) =>
            setPlayStage([...playStage.slice(0, index), ...playStage.slice(index + 1)])
          }
        />
      ))}
      <SingleQueue name={"Populations"} onDeleteAll={deleteAllPopulations}>
        {populations.map((population) => (
          <Population
            key={population.populationId}
            population={population}
            onCharacterHeaderClick={(characterId, characterConfig) =>
              playStage.length < 2 && setPlayStage([...playStage, characterConfig])
            }
          />
        ))}
      </SingleQueue>
    </Wrapper>
  )
}

export default EvolverPage
