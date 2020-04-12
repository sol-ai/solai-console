import React, {useState} from 'react';
import useInterval from "./hooks/useInterval";
import {simulationServerURL} from "./addresses";
import RunningGame from "./components/RunningGame";
import useSimulationQueue from "./hooks/useSimulationQueue";
import styled from "styled-components";


const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 64px 1fr;
  grid-template-areas:
    "header header header"
    "evolver simulationQueue simulator"
`

const Header = styled.div`
  grid-area: header;
`

const EvolverSection = styled.div`
  grid-area: evolver;
`

const SimulationQueueSection = styled.div`
  grid-area: simulationQueue;
`

const SimulatorSection = styled.div`
  grid-area: simulator;
`


function App() {

  const [gameSimulatorOnline, setGameSimulatorOnline] = useState<boolean>(false)
  const [runningGamesIds, setRunningGamesIds] = useState<string[]>([])
  const [gameData, setGameData] = useState<any[]>([])

  const [simulationQueueConnected, simulationsQueue, simulationsResultsQueue] = useSimulationQueue()

  useInterval(() => {
    fetch(simulationServerURL + "/hello")
      .then(res => setGameSimulatorOnline(true))
      .catch(err => setGameSimulatorOnline(false))
  }, 1000)

  useInterval(() => {
    fetch(simulationServerURL + "/runningGames")
      .then(res => res.json())
      .then(newRunningGameIds => setRunningGamesIds(newRunningGameIds))
      .catch(err => null)
  }, 1000)

  const handleCreateGame = () => {
    fetch(simulationServerURL + "/createGame", {
      method: "POST"
    })
  }

  const handleTerminateGame = (gameId: string) => {
    fetch(simulationServerURL + "/terminateGame/" + gameId, {
      method: "DELETE",
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
  }

  const handleGetGameData = (gameId: string) => {
    fetch(simulationServerURL + "/playersData/" + gameId)
      .then(res => res.json())
      .then(data => setGameData(data))
  }

  const handlePushExampleSimulation = () => {
    fetch(simulationServerURL +"/pushExampleSimulation", {
      method: "POST"
    })
  }

  return (
    <Wrapper>
      <Header>
        <h1>Sol AI</h1>
      </Header>
      <EvolverSection>
        Evolver
      </EvolverSection>
      <SimulationQueueSection>
        {simulationQueueConnected ? "Connected!" : "Disconnected :("}
        <br/>
        <button onClick={handlePushExampleSimulation}>Push example simulation</button>
        <br/>
        {JSON.stringify(simulationsQueue)}
      </SimulationQueueSection>
      <SimulatorSection>
        {gameSimulatorOnline ? <span>Game simulator online!</span> : <span>Game simulator offline :(</span>}
        <button onClick={() => handleCreateGame()}>Create game</button>
        <p>
          {JSON.stringify(gameData)}
        </p>
        {runningGamesIds.map(id => <RunningGame gameId={id} onTerminateClick={handleTerminateGame} onPlayersDataClick={handleGetGameData}/>)}
      </SimulatorSection>
    </Wrapper>
  );
}

export default App;
