"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function info(products) {
    products.forEach(function (product) {
        if (typeof product.name !== "string" ||
            typeof product.price !== "number" ||
            product.price < 0 ||
            typeof product.quantity !== "number" ||
            product.quantity < 1) {
            throw new Error("商品情報が不正です");
        }
    });
    var now = new Date().toLocaleString();
    console.log(now);
    var total = 0;
    products.forEach(function (product) {
        var priceIncludingTax = Math.round(product.price * 1.1);
        console.log("".concat(product.name, " - ").concat(priceIncludingTax));
        total += product.price * 1.1 * product.quantity;
    });
    console.log("".concat(Math.round(total)));
}
exports.default = info;
