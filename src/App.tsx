import React, { useState } from "react"
import useInterval from "./hooks/useInterval"
import { simulationServerURL } from "./addresses"
import RunningGame from "./components/RunningGame"
import styled from "styled-components"
import SimulationQueue from "./components/SimulationQueue"

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 64px 1fr;
  grid-template-areas:
    "header header header"
    "evolver simulationQueue simulator";
`

const Header = styled.div`
  grid-area: header;
`

const EvolverSection = styled.div`
  grid-area: evolver;
`

const StyledSimulationQueue = styled(SimulationQueue)`
  grid-area: simulationQueue;
`

const SimulatorSection = styled.div`
  grid-area: simulator;
`

function App() {
  const [gameSimulatorOnline, setGameSimulatorOnline] = useState<boolean>(false)
  const [runningSimulationsIds, setRunningSimulationsIds] = useState<string[]>([])

  useInterval(() => {
    fetch(simulationServerURL + "/hello")
      .then((res) => (!res.ok ? Promise.reject() : res))
      .then((res) => setGameSimulatorOnline(true))
      .catch((err) => setGameSimulatorOnline(false))
  }, 5000)

  useInterval(() => {
    if (gameSimulatorOnline) {
      fetch(simulationServerURL + "/runningSimulations")
        .then((res) => (!res.ok ? Promise.reject() : res))
        .then((res) => res.json())
        .then((json) => json as string[])
        .then(setRunningSimulationsIds)
        .catch((err) => null)
    }
  }, 500)

  return (
    <Wrapper>
      <Header>
        <h1>Sol AI</h1>
      </Header>
      <EvolverSection>Evolver</EvolverSection>
      <StyledSimulationQueue />
      <SimulatorSection>
        {gameSimulatorOnline ? (
          <span>Game simulator online!</span>
        ) : (
          <span>Game simulator offline :(</span>
        )}
        {/*<button onClick={() => handleCreateGame()}>Create game</button>*/}
        {runningSimulationsIds.map((id) => (
          <RunningGame
            key={id}
            gameId={id}
            // onTerminateClick={handleTerminateGame}
            // onPlayersDataClick={handleGetGameData}
          />
        ))}
      </SimulatorSection>
    </Wrapper>
  )
}

export default App
