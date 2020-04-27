import React, { PropsWithChildren, useEffect, useState } from "react"
import { ColumnLeft, PushExampleButton } from "../../components/SingleQueue/elements"
import IconButton from "../../components/IconButton"
import { CharacterConfig, SimulationData } from "../../services/simulation_queue/types"
import Character from "../../components/Character"
import { randomId } from "../../services/example_data/exampleData"
import NumberInput from "../../components/NumberInput"
import SolSimulationData from "../../components/SolSimulationData"

type Props = {
  exampleCharacterConfigs: CharacterConfig[]
  onPushSimulationData: (simulationData: SimulationData) => void
}

export default ({ exampleCharacterConfigs, onPushSimulationData }: Props) => {
  const [chosenCharactersId, setChosenCharactersId] = useState<string[]>([])
  const [simulationData, setSimulationData] = useState<SimulationData | undefined>(undefined)
  const [expanded, setExpanded] = useState<boolean>(false)
  const [editingDataToPushCount, setEditingDataToPushCount] = useState<number>(1)

  const createSimulationData = () => {
    const notEmpty = <TValue extends {}>(value: TValue | null | undefined): value is TValue =>
      value !== null && value !== undefined

    const charactersConfig: CharacterConfig[] = chosenCharactersId
      .map((id) => exampleCharacterConfigs.find((charConfig) => charConfig.characterId === id))
      .filter(notEmpty)

    if (charactersConfig.length === 2) {
      const simulationData: SimulationData = {
        simulationId: randomId(),
        charactersConfigs: charactersConfig,
        metrics: ["gameLength", "characterWon", "nearDeathFrames"],
      }
      setSimulationData(simulationData)
    }
  }

  const handlePushSimulation = () => {
    if (simulationData) {
      onPushSimulationData(simulationData)
      if (editingDataToPushCount > 1) {
        Array.from(Array(editingDataToPushCount - 1).keys()).forEach(() => {
          const newData: SimulationData = {
            ...simulationData,
            simulationId: randomId(),
          }
          onPushSimulationData(newData)
        })
      }

      setExpanded((prevExpanded) => !prevExpanded)
    }
  }

  const handleAddChosenCharacter = (characterId: string) => {
    if (chosenCharactersId.length < 2) {
      setChosenCharactersId([...chosenCharactersId, characterId])
    }
  }

  const handleRemoveChosenCharacter = (index: number) => {
    setChosenCharactersId((prevState) => [
      ...prevState.slice(0, index),
      ...prevState.slice(index + 1),
    ])
  }

  // remove chosen characters if their configs are no longer existing
  useEffect(() => {
    const exsistingChosenCharacterIds = chosenCharactersId.filter((id) =>
      exampleCharacterConfigs.find((charConfig) => charConfig.characterId === id),
    )
    setChosenCharactersId(exsistingChosenCharacterIds)
  }, [exampleCharacterConfigs])

  // show simulationData if two characters are chosen
  useEffect(() => {
    if (chosenCharactersId.length === 2) {
      if (!simulationData) {
        createSimulationData()
      }
    } else {
      setSimulationData(undefined)
    }
  }, [simulationData, chosenCharactersId])

  const goButton = chosenCharactersId.length === 2 && (
    <IconButton
      iconType={"check-light"}
      textAfter={" GO"}
      style={{ marginRight: "5px" }}
      onClick={handlePushSimulation}
    />
  )

  const header = expanded && (
    <div style={{ backgroundColor: "rgba(0,0,0,0.07)", borderRadius: "6px" }}>
      <ColumnLeft style={{ marginBottom: "10px" }}>
        {goButton}
        <IconButton
          iconType={"cross-light"}
          textAfter={" close"}
          onClick={() => setExpanded(false)}
        />
      </ColumnLeft>
      <NumberInput
        name={"Copies"}
        value={editingDataToPushCount}
        onChange={(value) => setEditingDataToPushCount(parseInt(value))}
      />
    </div>
  )

  const chosenCharactersElem = (
    <div>
      Chosen characters:
      {chosenCharactersId.map((charId, index) => (
        <Character
          key={index}
          characterId={charId}
          characterConfig={exampleCharacterConfigs.find(
            (charConfig) => charConfig.characterId === charId,
          )}
          collapsed={true}
          onHeaderClick={() => handleRemoveChosenCharacter(index)}
        />
      ))}
    </div>
  )

  const dataElem = simulationData ? (
    <SolSimulationData simulationData={simulationData} onSimulationDataChange={setSimulationData} />
  ) : (
    exampleCharacterConfigs.map((charConfig) => (
      <Character
        key={charConfig.characterId}
        characterId={charConfig.characterId}
        characterConfig={charConfig}
        onHeaderClick={handleAddChosenCharacter}
      />
    ))
  )

  return (
    <div>
      {expanded ? (
        <>
          {header}
          {chosenCharactersElem}
          <br />
          {dataElem}
        </>
      ) : (
        <PushExampleButton onClick={() => setExpanded(true)}>Push example</PushExampleButton>
      )}
    </div>
  )
}
