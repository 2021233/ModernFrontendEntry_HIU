type Item = {
  name: string
  price: number
  quantity: number
}

type ConvertedItem = {
  name: string
  price: number
  tax: number
}

type Receipt = {
  date: Date
  items: Array<ConvertedItem>
  total: { price: number; tax: number }
}

export default function Register(items: Array<Item>): void {
  const converted_items = items.map((item) => convertItemFormat(item))
  let total_price = 0
  let total_price_tax = 0
  converted_items.map((item) => {
    total_price += item.price
    total_price_tax += item.tax
  })
  printReceipt({
    date: new Date(),
    items: converted_items,
    total: { price: Math.round(total_price), tax: Math.round(total_price_tax) },
  })
}

function convertItemFormat(item: Item): ConvertedItem {
  const total_price = Math.round(item.price * item.quantity)
  const tax = Math.round(total_price * 0.08)
  return {
    name: item.name,
    price: total_price + tax,
    tax,
  }
}

function printReceipt(receipt: Receipt): void {
  console.log(receipt.date.toLocaleString("ja-JP"))
  receipt.items.map((item) => {
    console.log(`${item.name} - ${item.price}円(税 ${item.tax}円)`)
  })
  console.log(`合計金額： ${receipt.total.price}(${receipt.total.tax})\n\n`)
}
