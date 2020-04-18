import React from "react"
import useSimulationQueue from "../../services/simulation_queue/useSimulationQueue"
import { Header, QueueWrapper, Wrapper } from "./elements"
import SimulationDataQueue from "./SimulationDataQueue"
import SimulationResultQueue from "./SimulationResultQueue"

type Props = {
  className?: string
}

const SimulationQueue: React.FC<Props> = ({ className }) => {
  const [
    simulationQueueConnected,
    simulationsQueue,
    simulationsResultsQueue,
    deleteAllSimulations,
    deleteAllSimulationResults,
    pushExampleSimulation,
  ] = useSimulationQueue()

  return (
    <Wrapper className={className} key={"simulationQueue"}>
      <Header>{simulationQueueConnected ? "Connected!" : "Disconnected :("}</Header>

      <QueueWrapper queueType={"simQueue"}>
        <SimulationDataQueue
          simulationsData={simulationsQueue}
          deleteAllSimulationsData={deleteAllSimulations}
          pushSimulationData={pushExampleSimulation}
        />
      </QueueWrapper>

      <QueueWrapper key={"resultsQueue"} queueType={"resQueue"}>
        <SimulationResultQueue
          simulationsResult={simulationsResultsQueue}
          deleteAll={deleteAllSimulationResults}
        />
      </QueueWrapper>
    </Wrapper>
  )
}

export default SimulationQueue
