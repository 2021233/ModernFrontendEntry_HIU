import type { Route } from "./+types/home"
import CounterPage from "../pages/counter/Counter"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "useState sample" },
    { name: "description", content: "Introduct to React Hook." },
  ]
}

export default function Counter() {
  return <CounterPage />
}

