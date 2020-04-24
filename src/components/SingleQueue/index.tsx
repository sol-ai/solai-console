import IconButton from "../IconButton"
import React, { ReactNode } from "react"
import {
  Column,
  ColumnLeft,
  PushExampleButton,
  QueueHeader,
  QueueHeaderTitle,
  Wrapper,
} from "./elements"
import { SimulationData, SimulationResult } from "../../services/simulation_queue/types"

type Props<T> = {
  name: string
  onDeleteAll?: () => void
  headerElems?: ReactNode | ReactNode[]
  subHeaderElems?: ReactNode | ReactNode[]
  children?: ReactNode[]
}

const SingleQueue = <T extends SimulationData | SimulationResult>({
  name,
  onDeleteAll,
  headerElems,
  subHeaderElems,
  children,
}: Props<T>) => {
  return (
    <Wrapper>
      <QueueHeader>
        <Column>
          <QueueHeaderTitle>{name}</QueueHeaderTitle>
          {onDeleteAll && (
            <IconButton iconType={"cross"} onClick={onDeleteAll} textAfter={" all"} />
          )}
        </Column>
        {headerElems}
        {subHeaderElems}
      </QueueHeader>
      <div>( {children ? children.length : 0} items )</div>
      {children}
    </Wrapper>
  )
}

export default SingleQueue
