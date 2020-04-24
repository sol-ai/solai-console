import { useEffect, useRef } from "react"

type Callback = (...args: any[]) => void

export default (callback: Callback, delay: number, callAtStart: boolean = false) => {
  const savedCallback = useRef<Callback>(callback)

  useEffect(() => {
    if (callAtStart && savedCallback.current) {
      savedCallback.current()
    }
  }, [])

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
