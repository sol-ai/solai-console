import styled from "styled-components"

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 64px 1fr;
  grid-template-areas:
    "queue-header queue-header"
    "simQueue resQueue";
`

export const Header = styled.div`
  grid-area: queue-header;
`

export const QueueWrapper = styled.div<{ queueType: "simQueue" | "resQueue" }>`
  grid-area: ${(props) => props.queueType};
  margin: 10px;
`
