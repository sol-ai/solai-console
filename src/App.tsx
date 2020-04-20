import React, { useState } from "react"
import useInterval from "./hooks/useInterval"
import RunningGame from "./components/RunningGame"
import styled from "styled-components"
import SimulationQueue from "./pages/SimulationQueuePage"
import SimulatorPage from "./pages/SimulatorPage"
import IconButton from "./components/IconButton"

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

const PageTitle = styled.h2`
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: gray;
  }
`

function App() {
  const [expandSection, setExpandedSection] = useState<Section | undefined>(undefined)

  const handleExpandSectionClick = (section: Section) => {
    setExpandedSection((prevState) => (prevState === section ? undefined : section))
  }

  return (
    <Wrapper key={"App-wrapper"} expandSection={expandSection}>
      <Header>
        <h1>Sol AI</h1>
      </Header>
      <EvolverSection>Evolver</EvolverSection>
      <SimulationQueueSection>
        <SimulationQueue
          pageTitleElem={
            <PageTitle onClick={() => handleExpandSectionClick(Section.queue)}>Queue</PageTitle>
          }
        />
      </SimulationQueueSection>
      <SimulatorSection>
        <SimulatorPage
          pageTitleElem={
            <PageTitle onClick={() => handleExpandSectionClick(Section.simulator)}>
              Simulator
            </PageTitle>
          }
        />
      </SimulatorSection>
    </Wrapper>
  )
}

export default App
