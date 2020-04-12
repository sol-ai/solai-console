import React, {useEffect, useRef, useState} from 'react'
import useInterval from "./useInterval";


const backendAddress = "http://localhost:3001"
const apiAddress = backendAddress + "/api"

export default (): [
  boolean,
  any[],
  any[]
] => {
  const [simulationsQueueConnected, setSimulationsQueueConnected] = useState<boolean>(false)
  const [simulationsQueue, setSimulationsQueue] = useState<any[]>([])
  const [simulationsResultsQueue, setSimulationsResultsQueue] = useState<any[]>([])
  useInterval(() => {
    fetch(apiAddress + "/simulationQueueConnected")
      .then(res => res.json())
      .then(setSimulationsQueueConnected)
      .catch(err => null)
  }, 1000)


  useInterval(() => {
    fetch(apiAddress + "/simulationsQueue")
      .then(res => res.json())
      .then(setSimulationsQueue)
      .catch(err => null)
  }, 1000)

  useInterval(() => {
    fetch(apiAddress + "/simulationsResultsQueue")
      .then(res => res.json())
      .then(setSimulationsResultsQueue)
      .catch(err => null)
  }, 1000)

  return [simulationsQueueConnected, simulationsQueue, simulationsResultsQueue]
}