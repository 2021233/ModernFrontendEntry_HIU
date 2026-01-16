type product = {
    name: string;
    price: number;
    quantity: number;
}

function info(products: product[]) {
    products.forEach(product => {
        if (
            typeof product.name !== "string" ||
            typeof product.price !== "number" ||
            product.price < 0 ||
            typeof product.quantity !== "number" ||
            product.quantity < 1
        ) {
            throw new Error("商品情報が不正です");
        }
    });

    const now: string = new Date().toLocaleString();
    console.log(now);

    let total = 0;

    products.forEach(product => {
        const priceIncludingTax = Math.round(product.price * 1.1);
        console.log(`${product.name} - ${priceIncludingTax}`);
        total += product.price * 1.1 * product.quantity;
    });

    console.log(`${Math.round(total)}`);
}

export default info;