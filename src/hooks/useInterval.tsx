import { useEffect, useRef } from "react"

type Callback = (...args: any[]) => void

export default (callback: Callback, delay: number, callAtStart: boolean = false) => {
  const savedCallback = useRef<Callback | undefined>(undefined)

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
    if (callAtStart) {
      savedCallback.current()
    }
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
