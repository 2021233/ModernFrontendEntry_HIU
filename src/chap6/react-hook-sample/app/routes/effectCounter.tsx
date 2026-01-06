import type { Route } from "./+types/home"
import EffectCounterPage from "../pages/effectCounter/EffectCounter"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "useState sample" },
    { name: "description", content: "Introduct to React Hook." },
  ]
}

export default function EffectCounter() {
  return <EffectCounterPage />
}

