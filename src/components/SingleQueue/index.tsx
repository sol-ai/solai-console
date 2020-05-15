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
  overrideItemsCount?: number
}

const SingleQueue = <T extends SimulationData | SimulationResult>({
  name,
  onDeleteAll,
  headerElems,
  subHeaderElems,
  children,
  overrideItemsCount,
}: Props<T>) => {
  const itemsCount = overrideItemsCount || (children ? children.length : 0)
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
      <div>( {itemsCount} items )</div>
      {children}
    </Wrapper>
  )
}

export default SingleQueue
