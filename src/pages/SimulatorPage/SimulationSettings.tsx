import styled from "styled-components"
import React from "react"
import IconButton from "../../components/IconButton"
import ToggleButton from "../../components/ToggleButton"
import NumberInput from "../../components/NumberInput"

type Props = {
  className?: string
  existingMetrics: string[]
  showGraphics: boolean
  onShowGraphicsChange: (value: boolean) => void
  updateDelayMillis: number
  onSetUpdateDelayMillis: (value: number) => void
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  margin-bottom: 20px;
  border-bottom: 2px solid #a7a7a7;
`

const MetricsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const SimulationSettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export default ({
  className,
  existingMetrics,
  showGraphics,
  onShowGraphicsChange,
  updateDelayMillis,
  onSetUpdateDelayMillis,
}: Props) => {
  return (
    <Wrapper className={className}>
      <MetricsWrapper>
        <span>Available metrics:</span>
        {existingMetrics.map((metric) => (
          <IconButton iconType={"check-light"} textAfter={metric} />
        ))}
      </MetricsWrapper>
      <SimulationSettingsWrapper>
        <span>Settings:</span>
        <br />
        <ToggleButton
          value={showGraphics}
          onChange={(value) => onShowGraphicsChange(value)}
          textBefore={"show graphics"}
        />
        <NumberInput
          name={"update delay millis"}
          value={updateDelayMillis}
          onSubmit={(value) => onSetUpdateDelayMillis(value)}
        />
      </SimulationSettingsWrapper>
    </Wrapper>
  )
}
