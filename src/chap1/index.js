"use strict";
// 「yyyy/mm/dd hh:mm」形式の実行した年月日時分
//   「商品名 - 税込金額(税)」形式のリスト
//   「合計金額(税)」
function outputOrder(products) {
    const tax = 0.1;
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const hh = String(now.getHours()).padStart(2, "0");
    const min = String(now.getMinutes()).padStart(2, "0");
    console.log(`${yyyy}/${mm}/${dd} ${hh}:${min}`);
    let total = 0;
    products.forEach((product) => {
        const taxIncluded = Math.round(product.price * product.quantity * (1 + tax) * 10) / 10;
        total += taxIncluded;
        console.log(`${product.name} - ${taxIncluded}円`);
    });
    total = Math.round(total * 10) / 10;
    console.log(`合計金額(税)：${total}円`);
}
const items = [
    { name: "りんご", price: 120, quantity: 2 },
    { name: "バナナ", price: 80, quantity: 3 },
    { name: "みかん", price: 100, quantity: 1 }
];
outputOrder(items);
