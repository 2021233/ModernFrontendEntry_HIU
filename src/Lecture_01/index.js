"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var productCalculator_1 = require("./productCalculator");
var products = [
    {
        name: 'Apple',
        price: 100,
        quantity: 2
    },
    {
        name: 'Banana',
        price: 150,
        quantity: 1
    },
    {
        name: 'Orange',
        price: 120,
        quantity: 3
    }
];
(0, productCalculator_1.default)(products);
