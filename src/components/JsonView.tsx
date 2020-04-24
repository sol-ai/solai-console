import React from "react"
import ReactJson from "react-json-view-ts"

type Props<T extends object> = {
  json: T
  name: string | false
  collapsed?: boolean | number
  collapseKeys?: string[]
  onChange?: (newJson: T) => void
}

export default <T extends {}>({
  json,
  name,
  collapsed = false,
  collapseKeys = [],
  onChange,
}: Props<T>) => {
  return (
    <ReactJson
      src={json}
      name={name}
      theme={"harmonic"}
      enableClipboard={false}
      displayDataTypes={false}
      displayObjectSize={false}
      collapsed={collapsed}
      shouldCollapse={({ name, src, type }) => (name ? collapseKeys.includes(name) : false)}
      onEdit={onChange && ((edit) => onChange(edit.updated_src as T))}
      onDelete={onChange && ((edit) => onChange(edit.updated_src as T))}
      onAdd={onChange && ((edit) => onChange(edit.updated_src as T))}
    />
  )
}
