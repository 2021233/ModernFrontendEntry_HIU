// 「yyyy/mm/dd hh:mm」形式の実行した年月日時分
//   「商品名 - 税込金額(税)」形式のリスト
//   「合計金額(税)」

type Items = {
    name: string
    price: number
    quantity: number
}

function outputOrder(products: Items[]): void {
    const tax = 0.1;

    const now: Date = new Date();
    const yyyy: number = now.getFullYear();
    const mm: string = String(now.getMonth() + 1).padStart(2, "0");
    const dd: string = String(now.getDate()).padStart(2, "0");
    const hh: string = String(now.getHours()).padStart(2, "0");
    const min: string = String(now.getMinutes()).padStart(2, "0");

    console.log(`${yyyy}/${mm}/${dd} ${hh}:${min}`);


    let total: number = 0;

    products.forEach((product: Items) => {
        const taxIncluded: number =
            Math.round(product.price * product.quantity * (1 + tax) * 10) / 10;
        total += taxIncluded;

        console.log(`${product.name} - ${taxIncluded}円`);
    });

    total = Math.round(total * 10) / 10;
    console.log(`合計金額(税)：${total}円`);
}

const items: Items[] = [
    { name: "りんご", price: 120, quantity: 2 },
    { name: "バナナ", price: 80, quantity: 3 },
    { name: "みかん", price: 100, quantity: 1 }
  ];
  
  outputOrder(items);
