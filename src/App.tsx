import React, { useState } from "react"
import useInterval from "./hooks/useInterval"
import RunningGame from "./components/RunningGame"
import styled from "styled-components"
import SimulationQueue from "./pages/SimulationQueuePage"
import SimulatorPage from "./pages/SimulatorPage"

enum Section {
  evolver = "evolver",
  queue = "queue",
  simulator = "simulator",
}

const Wrapper = styled.div<{ expandSection?: Section }>`
  height: 100vh;
  display: grid;
  grid-template-columns: ${(props) =>
    Object.values(Section)
      .map((section) => (section === props.expandSection ? "2fr" : "1fr"))
      .join(" ")};
  transition: grid-template-columns 0.2s;

  grid-template-rows: 64px 1fr;
  grid-template-areas:
    "header header header"
    "evolver simulationQueue simulator";
`

const Header = styled.div`
  grid-area: header;
  display: flex;
  justify-content: space-between;
`

const EvolverSection = styled.div`
  background-color: #f3f9f2;
  grid-area: evolver;
`

const SimulationQueueSection = styled.div`
  grid-area: simulationQueue;
`

const SimulatorSection = styled.div`
  background-color: #f3f7f8;
  grid-area: simulator;
`

function App() {
  const [expandSection, setExpandedSection] = useState<Section | undefined>(undefined)
  const [letSectionsExpand, setLetSectionsExpand] = useState<boolean>(true)

  return (
    <Wrapper key={"App-wrapper"} expandSection={letSectionsExpand ? expandSection : undefined}>
      <Header>
        <h1>Sol AI</h1>
        <span>
          <input
            type={"checkbox"}
            checked={letSectionsExpand}
            onChange={(e) => setLetSectionsExpand(e.target.checked)}
          />
          <label>let sections expand</label>
        </span>
      </Header>
      <EvolverSection onClick={() => setExpandedSection(Section.evolver)}>Evolver</EvolverSection>
      <SimulationQueueSection onClick={() => setExpandedSection(Section.queue)}>
        <SimulationQueue />
      </SimulationQueueSection>
      <SimulatorSection onClick={() => setExpandedSection(Section.simulator)}>
        <SimulatorPage />
      </SimulatorSection>
    </Wrapper>
  )
}

export default App
