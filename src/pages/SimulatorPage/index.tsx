import React, { ReactNode, useEffect, useState } from "react"
import useSimulator from "../../services/simulator/useSimulator"
import ConnectionStatus from "../../components/ConnectionStatus"
import { SimulationResult } from "../../services/simulation_queue/types"
import useInterval from "../../hooks/useInterval"
import SolSimulationResult from "../../components/SolSimulationResult"
import { HeaderWrapper, Wrapper } from "./elements"
import SimulationSettings from "./SimulationSettings"

type Props = {
  pageTitleElem: ReactNode
}

type RunningSimulationsWithResult = Record<
  string,
  { intermediateResult?: SimulationResult; updateIntermediateResult: boolean }
>

const SimulatorPage: React.FC<Props> = ({ pageTitleElem }) => {
  const {
    online,
    existingMetrics,
    runningSimulationsIds,
    fetchIntermediateResults,
    headlessSimulations,
    setHeadlessSimulations,
    simulationUpdateDelay,
    setSimulationUpdateDelay,
  } = useSimulator()

  const [runningSimulationsWithResults, setRunningSimulationsWithResults] = useState<
    RunningSimulationsWithResult
  >({})

  useEffect(() => {
    setRunningSimulationsWithResults((prevState) => {
      const newRunningSimulationsWithResults: RunningSimulationsWithResult = {}
      runningSimulationsIds.forEach((simulationId) =>
        prevState.hasOwnProperty(simulationId)
          ? (newRunningSimulationsWithResults[simulationId] = prevState[simulationId])
          : (newRunningSimulationsWithResults[simulationId] = { updateIntermediateResult: false }),
      )
      return newRunningSimulationsWithResults
    })
  }, [runningSimulationsIds])

  const updateIntermediateResult = (simulationId: string, interMediateResult: SimulationResult) => {
    setRunningSimulationsWithResults((prevState) => {
      if (prevState.hasOwnProperty(simulationId)) {
        const newState: RunningSimulationsWithResult = {
          ...prevState,
          [simulationId]: {
            ...prevState[simulationId],
            intermediateResult: interMediateResult,
          },
        }
        return newState
      } else {
        return prevState
      }
    })
  }

  useInterval(() => {
    Object.entries(runningSimulationsWithResults)
      .filter(([simulationId, resultData]) => resultData.updateIntermediateResult)
      .forEach(([simulationId, resultData]) =>
        fetchIntermediateResults(simulationId)
          .then(
            (interMediateResult) =>
              interMediateResult && updateIntermediateResult(simulationId, interMediateResult),
          )
          .catch((res) => {}),
      )
  }, 500)

  const handleResultClick = (simulationId: string) => {
    setRunningSimulationsWithResults((prevState) => {
      if (prevState.hasOwnProperty(simulationId)) {
        const simulationResultData = prevState[simulationId]
        const newSimulationResultData = simulationResultData.updateIntermediateResult
          ? { intermediateResult: undefined, updateIntermediateResult: false }
          : { ...simulationResultData, updateIntermediateResult: true }
        return { ...prevState, [simulationId]: newSimulationResultData }
      } else {
        return prevState
      }
    })
  }

  return (
    <Wrapper>
      <HeaderWrapper>
        {pageTitleElem}
        <ConnectionStatus connected={online} />
      </HeaderWrapper>
      <SimulationSettings
        existingMetrics={existingMetrics}
        showGraphics={!headlessSimulations}
        onShowGraphicsChange={(value) => setHeadlessSimulations(!value)}
        updateDelayMillis={simulationUpdateDelay}
        onSetUpdateDelayMillis={setSimulationUpdateDelay}
      />
      {Object.entries(runningSimulationsWithResults).map(([simulationId, resultData]) => (
        <SolSimulationResult
          key={simulationId}
          simulationId={simulationId}
          simulationResult={resultData.intermediateResult}
          onClick={handleResultClick}
        />
      ))}
    </Wrapper>
  )
}

export default SimulatorPage
