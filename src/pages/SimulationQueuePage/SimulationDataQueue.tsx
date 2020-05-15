import React, { useEffect, useState } from "react"
import { CharacterConfig, SimulationData } from "../../services/simulation_queue/types"
import SingleQueue from "../../components/SingleQueue"
import SolSimulationData from "../../components/SolSimulationData"
import PushSimulationData from "./ComposeCharacterSimulationData"
import { fetchExampleCharactersConfig } from "../../services/example_data/exampleData"

type Props = {
  simulationsData: SimulationData[]
  deleteAllSimulationsData: () => void
  pushSimulationData: (simulationData: SimulationData) => void
}

const SimulationDataQueue: React.FC<Props> = ({
  simulationsData,
  deleteAllSimulationsData,
  pushSimulationData,
}) => {
  const [exampleCharacterConfigs, setExampleCharacterConfigs] = useState<CharacterConfig[]>([])

  useEffect(() => {
    fetchExampleCharactersConfig().then((charConfigs) => setExampleCharacterConfigs(charConfigs))
  }, [])

  const maxItemsShow = 20

  const simulationDataLimited = simulationsData.slice(0, maxItemsShow)
  const simulationDataLimitedIds = simulationDataLimited.map((simData) => simData.simulationId)
  const simulationsDataElemsLimited = simulationDataLimited.map((simulationData, i) => {
    const simulationIdOccurances = simulationDataLimitedIds
      .slice(0, i)
      .filter((simId) => simId === simulationData.simulationId).length
    const useSimulationId =
      simulationIdOccurances === 0
        ? simulationData.simulationId
        : `(${simulationIdOccurances})${simulationData.simulationId}`
    return simulationIdOccurances > 0 ? (
      <SolSimulationData key={useSimulationId} simulationId={useSimulationId} />
    ) : (
      <SolSimulationData key={useSimulationId} simulationData={simulationData} />
    )
  })

  const pushSimDataElems = (
    <PushSimulationData
      exampleCharacterConfigs={exampleCharacterConfigs}
      onPushSimulationData={pushSimulationData}
    />
  )

  return (
    <SingleQueue
      name={"Simulations"}
      onDeleteAll={deleteAllSimulationsData}
      subHeaderElems={pushSimDataElems}
      overrideItemsCount={simulationsData.length}
    >
      {simulationsDataElemsLimited}
    </SingleQueue>
  )
}

export default SimulationDataQueue
