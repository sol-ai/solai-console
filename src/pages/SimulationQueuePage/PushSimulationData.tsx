import React, { ReactNode } from "react"
import { ColumnLeft, PushExampleButton } from "../../components/SingleQueue/elements"
import IconButton from "../../components/IconButton"

type Props = {
  exampleData?: {
    onAddExampleData: () => void
    onExampleDataAccepted: () => void
    onExampleDataRejected: () => void
    editingElement?: ReactNode
  }
}

export default ({ exampleData }: Props) => {
  const editingSimulationDataElems = exampleData && exampleData.editingElement && (
    <div style={{ backgroundColor: "rgba(0,0,0,0.07)", borderRadius: "6px" }}>
      <ColumnLeft style={{ marginBottom: "10px" }}>
        <IconButton
          iconType={"check-light"}
          textAfter={" GO"}
          style={{ marginRight: "5px" }}
          onClick={exampleData.onExampleDataAccepted}
        />
        <IconButton
          iconType={"cross-light"}
          textAfter={" close"}
          onClick={exampleData.onExampleDataRejected}
        />
      </ColumnLeft>
      {exampleData.editingElement}
    </div>
  )

  return (
    <div>
      {exampleData && !exampleData.editingElement ? (
        <PushExampleButton onClick={exampleData.onAddExampleData}>Push example</PushExampleButton>
      ) : (
        editingSimulationDataElems
      )}
    </div>
  )
}
