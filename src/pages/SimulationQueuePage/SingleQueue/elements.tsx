import styled from "styled-components"

export const Wrapper = styled.div``

export const QueueHeader = styled.div`
  padding: 10px 0;
  margin-bottom: 20px;
  border-bottom: 2px solid #a7a7a7;
`

export const Column = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const ColumnLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
`

export const QueueHeaderTitle = styled.h3`
  margin: 0;
  padding-bottom: 10px;
`

export const PushExampleButton = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  color: #284148;
  &:hover {
    color: #000000;
  }
`
