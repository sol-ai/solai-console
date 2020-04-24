import React from "react"
import {
  CharacterConfig,
  EvolvedCharacter as EvolvedCharacterType,
  EvolvedPopulation as EvolvedPopulationType,
} from "../services/simulation_queue/types"
import UnitWrapper from "./UnitWrapper"
import EvolvedCharacter from "./EvolvedCharacter"
import SingleQueue from "./SingleQueue"
import { shortenId } from "../utils"
import JsonView from "./JsonView"

type Props = {
  population: EvolvedPopulationType
  onHeaderClick?: (populationId: string, population: EvolvedPopulationType) => void
  onEvolvedCharacterHeaderClick?: (
    characterId: string,
    evolvedCharacter: EvolvedCharacterType,
  ) => void
  onCharacterHeaderClick?: (
    characterId: string,
    characterConfig: CharacterConfig,
    evolvedCharacter: EvolvedCharacterType,
  ) => void
}

const COLOR = "#7e8cff"

export default ({
  population,
  onHeaderClick,
  onEvolvedCharacterHeaderClick,
  onCharacterHeaderClick,
}: Props) => {
  const populationId = population.populationId

  const { evolvedCharacters: _, ...populationMeta } = population
  const headerElem = <JsonView json={populationMeta} name={false} />

  const evolvedCharacters = population.evolvedCharacters.map((evolvedChar) => (
    <EvolvedCharacter
      key={evolvedChar.characterConfig.characterId}
      onHeaderClick={(charId) =>
        onEvolvedCharacterHeaderClick && onEvolvedCharacterHeaderClick(charId, evolvedChar)
      }
      onCharacterHeaderClick={(characterId, characterConfig, evolvedCharacter) =>
        onCharacterHeaderClick &&
        onCharacterHeaderClick(characterId, characterConfig, evolvedCharacter)
      }
      evolvedCharacter={evolvedChar}
    />
  ))

  return (
    <UnitWrapper
      headerText={shortenId(populationId)}
      color={COLOR}
      onHeaderClick={() => onHeaderClick && onHeaderClick(populationId, population)}
    >
      <SingleQueue name={`Population: ${populationId}`} headerElems={headerElem}>
        {evolvedCharacters}
      </SingleQueue>
    </UnitWrapper>
  )
}
