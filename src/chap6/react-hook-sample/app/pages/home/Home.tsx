import { Link } from "react-router"

export default function HomePage() {
  return (
    <div>
      <h1>
        Hello!
        <br />
        This is React-Hook sample application.
      </h1>
      <ul>
        <li>
          <Link to="/counter">useState sample</Link>
        </li>
        <li>
          <Link to="/effect-counter">useEffect sample</Link>
        </li>
        <li>
          <Link to="/unrouted-page">unrouted page</Link>
        </li>
      </ul>
    </div>
  )
}
