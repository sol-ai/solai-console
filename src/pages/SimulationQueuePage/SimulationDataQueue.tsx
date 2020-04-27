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

  const simulationsDataElems = simulationsData.map((simulationData) => (
    <SolSimulationData key={simulationData.simulationId} simulationData={simulationData} />
  ))

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
    >
      {simulationsDataElems}
    </SingleQueue>
  )
}

export default SimulationDataQueue
