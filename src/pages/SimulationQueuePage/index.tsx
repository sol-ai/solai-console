import React, { ReactNode } from "react"
import useSimulationQueue from "../../services/simulation_queue/useSimulationQueue"
import { Header, QueueWrapper, Wrapper } from "./elements"
import SimulationDataQueue from "./SimulationDataQueue"
import SimulationResultQueue from "./SimulationResultQueue"
import ConnectionStatus from "../../components/ConnectionStatus"
import useSimulationQueueOnline from "../../services/simulation_queue/useSimulationQueueOnline"

type Props = {
  className?: string
  pageTitleElem: ReactNode
}

const SimulationQueuePage: React.FC<Props> = ({ className, pageTitleElem }) => {
  const simulationQueueOnline = useSimulationQueueOnline()
  const {
    simulationDataQueue,
    simulationResultQueue,
    deleteSimulationDataQueue,
    deleteSimulationResultQueue,
    pushSimulationData,
  } = useSimulationQueue()

  return (
    <Wrapper className={className} key={"simulationQueue"}>
      <Header>
        {pageTitleElem}
        <ConnectionStatus connected={simulationQueueOnline} />
      </Header>

      <QueueWrapper queueType={"simQueue"}>
        <SimulationDataQueue
          simulationsData={simulationDataQueue}
          deleteAllSimulationsData={deleteSimulationDataQueue}
          pushSimulationData={pushSimulationData}
        />
      </QueueWrapper>

      <QueueWrapper key={"resultsQueue"} queueType={"resQueue"}>
        <SimulationResultQueue
          simulationsResult={simulationResultQueue}
          deleteAll={deleteSimulationResultQueue}
        />
      </QueueWrapper>
    </Wrapper>
  )
}

export default SimulationQueuePage
