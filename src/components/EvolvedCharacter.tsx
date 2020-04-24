import React from "react"
import {
  CharacterConfig,
  EvolvedCharacter as EvolvedCharacterType,
} from "../services/simulation_queue/types"
import UnitWrapper from "./UnitWrapper"
import { shortenId } from "../utils"
import Character from "./Character"

type Props = {
  evolvedCharacter: EvolvedCharacterType
  onHeaderClick?: (characterId: string, evolvedCharacter: EvolvedCharacterType) => void
  onCharacterHeaderClick?: (
    characterId: string,
    characterConfig: CharacterConfig,
    evolvedCharacter: EvolvedCharacterType,
  ) => void
}

const COLOR = "#7c52ff"

export default ({ evolvedCharacter, onHeaderClick, onCharacterHeaderClick }: Props) => {
  const characterId = shortenId(evolvedCharacter.characterConfig.characterId)
  return (
    <UnitWrapper
      color={COLOR}
      headerText={`${shortenId(characterId)} fitness: ${evolvedCharacter.fitness}`}
      onHeaderClick={() => onHeaderClick && onHeaderClick(characterId, evolvedCharacter)}
    >
      <span>Fitness: {evolvedCharacter.fitness}</span>
      <Character
        characterId={characterId}
        characterConfig={evolvedCharacter.characterConfig}
        onHeaderClick={
          onCharacterHeaderClick &&
          ((characterId) =>
            onCharacterHeaderClick(characterId, evolvedCharacter.characterConfig, evolvedCharacter))
        }
      />
    </UnitWrapper>
  )
}
