import { useState } from "react"
import useInterval from "../../hooks/useInterval"
import { getSimulationsQueueOnline } from "./api"

let globalOnlineStatus: boolean = false

const updateOnline = () => {
  getSimulationsQueueOnline().then((online) => (globalOnlineStatus = online))
}

updateOnline()
setInterval(() => updateOnline(), 3000)

export default (): boolean => {
  const [online, setOnline] = useState<boolean>(false)
  useInterval(
    () => {
      setOnline(globalOnlineStatus)
    },
    2000,
    true,
  )

  return online
}
