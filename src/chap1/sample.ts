import Register from "./function"

const cart_A = [
  { name: "牛乳", price: 280, quantity: 2 },
  { name: "ケーキ", price: 320, quantity: 4 },
  { name: "コーラ", price: 180, quantity: 1 },
  { name: "紙コップ", price: 110, quantity: 1 },
]

const cart_B = [
  { name: "お茶", price: 180, quantity: 1 },
  { name: "オニオンスープ", price: 220, quantity: 1 },
  { name: "おにぎり", price: 140, quantity: 3 },
  { name: "たこ焼き", price: 300, quantity: 1 },
  { name: "コーンフレーク", price: 170, quantity: 1 },
]

const cart_C = [
  { name: "ハイチュウ", price: 150, quantity: 1 },
  { name: "ぷっちょ", price: 150, quantity: 1 },
  { name: "うまい棒", price: 10, quantity: 10 },
  { name: "わたパチ", price: 60, quantity: 2 },
  { name: "ヤンヤンつけボー", price: 200, quantity: 1 },
  { name: "たのしいケーキ屋さん", price: 320, quantity: 2 },
]

Register(cart_A)
Register(cart_B)
Register(cart_C)
