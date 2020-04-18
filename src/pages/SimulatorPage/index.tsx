import RunningGame from "../../components/RunningGame"
import React, { useEffect, useState } from "react"
import useSimulator from "../../services/simulator/useSimulator"
import styled from "styled-components"
import ConnectionStatus from "../../components/ConnectionStatus"
import { SimulationResult } from "../../services/simulation_queue/types"
import useInterval from "../../hooks/useInterval"
import SolSimulationResult from "../../components/SolSimulationResult"

type Props = {}

const Wrapper = styled.div``

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

const SimulatorPage: React.FC<Props> = () => {
  const {
    online,
    existingMetrics,
    runningSimulationsIds,
    fetchIntermediateResults,
  } = useSimulator()

  const [intermediateResult, setIntermediateResult] = useState<SimulationResult | undefined>(
    undefined,
  )

  useInterval(() => {
    if (runningSimulationsIds.length >= 1) {
      fetchIntermediateResults(runningSimulationsIds[0])
        .then((res) => res && setIntermediateResult(res))
        .catch((res) => {})
    }
  }, 500)

  return (
    <Wrapper>
      <Header>
        Simulator
        <ConnectionStatus connected={online} />
      </Header>
      {existingMetrics.length !== 0 && (
        <>
          <span>Available metrics: </span>
          {existingMetrics.map((metric) => (
            <span style={{ margin: "3px", padding: "3px" }}>{metric}</span>
          ))}
        </>
      )}
      {intermediateResult && <SolSimulationResult simulationResult={intermediateResult} />}
      {runningSimulationsIds.map((id) => (
        <RunningGame
          key={id}
          gameId={id}
          // onTerminateClick={handleTerminateGame}
          // onPlayersDataClick={handleGetGameData}
        />
      ))}
    </Wrapper>
  )
}

export default SimulatorPage
