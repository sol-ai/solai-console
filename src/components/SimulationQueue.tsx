import React from "react"
import styled from "styled-components"
import useSimulationQueue from "../services/simulation_queue/useSimulationQueue"
import SolSimulationData from "./SolSimulationData"
import SolSimulationResult from "./SolSimulationResult"

type Props = {
  className?: string
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 64px 1fr;
  grid-template-areas:
    "queue-header queue-header"
    "simQueue resQueue";
`

const Header = styled.div`
  grid-area: queue-header;
`

const QueueWrapper = styled.div<{ queueType: "simQueue" | "resQueue" }>`
  grid-area: ${(props) => props.queueType};
`

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
      <Header>
        {simulationQueueConnected ? "Connected!" : "Disconnected :("}
        <br />
        <button onClick={deleteAllSimulations}>Delete all simulations</button>
        <br />
        <button onClick={deleteAllSimulationResults}>Delete all results</button>
        <br />
        <button onClick={pushExampleSimulation}>Push example simulation</button>
      </Header>

      <QueueWrapper key={"simulationQueue"} queueType={"simQueue"}>
        <h3>Simulations</h3>
        {simulationsQueue.map((simulationData) => (
          <SolSimulationData key={simulationData.simulationId} simulationData={simulationData} />
        ))}
      </QueueWrapper>

      <QueueWrapper key={"resultsQueue"} queueType={"resQueue"}>
        <h3>Results</h3>
        {simulationsResultsQueue.map((simulationResult) => (
          <SolSimulationResult
            key={simulationResult.simulationId}
            simulationResult={simulationResult}
          />
        ))}
      </QueueWrapper>
    </Wrapper>
  )
}

export default SimulationQueue
