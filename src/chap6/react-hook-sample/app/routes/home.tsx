import type { Route } from "./+types/home"
import HomePage from "../pages/home/Home"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "React Hook Sample" },
    { name: "description", content: "Introduct to React Hook." },
  ]
}

export default function Home() {
  return <HomePage />
}
