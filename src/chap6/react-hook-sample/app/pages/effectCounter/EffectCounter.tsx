import { Link } from "react-router"
import { useState, useEffect } from "react"

export default function EffectCounterPage() {
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    console.log("no dependencies effect")
    return () => console.log("no dependencies clean up")
  })

  useEffect(() => {
    window.addEventListener("resize", resizeLog)
    console.log("add resize event")
    return () => {
      window.removeEventListener("resize", resizeLog)
      console.log("remove resize event")
    }
  }, [])

  useEffect(() => {
    console.log("change count", count)
    return () => console.log("change count cleanup")
  }, [count])

  return (
    <>
      <div id="counter-container">
        <button onClick={() => setCount(count - 1)}>-</button>
        <span>{count}</span>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <Link to="/">back to home</Link>
    </>
  )
}

function resizeLog() {
  console.log("resize")
}
