import { Link } from "react-router"
import { useState } from "react"

export default function CounterPage() {
  const [count, setCount] = useState<number>(0)
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
