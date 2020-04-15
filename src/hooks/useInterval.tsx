import {useEffect, useRef} from "react";

type Callback = (...args: any[]) => void

export default (callback: Callback, delay: number) => {
  const savedCallback = useRef<Callback | undefined>(undefined)

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
