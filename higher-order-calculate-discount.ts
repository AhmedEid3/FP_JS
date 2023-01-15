/**
 * Calculate discount for list of orders
 * Each order has one product
 * the are serval rules to calculate discount
 * An order should qualify to criteria in order for its associated rule to apply.
 * Serval rules may qualify to the same order
 * The discount is the average of lowest of three discounts
 * The system should allow adding other rules and qualifying criteria in the future without much difficulty
 *
 */

import { average } from "./helpers/average";
import Order from "./model/Order";
import { orderByASC } from "./helpers/orderByASC";

function main() {
  console.log("main executing");
  const orders = getOrders();
  const ordersWithDiscount = orders.map((order) =>
    getOrderWithDiscount(order, getDiscountRules)
  );

  console.log({ orders, ordersWithDiscount });
}

main();

function getOrders() {
  return [
    new Order(100, 1238, 3, 10.58),
    new Order(102, 349857, 5, 90.0),
    new Order(105, 23480, 2, 12.44),
    new Order(106, 2348, 6, 56.6),
    new Order(108, 9874, 4, 42.0),
    new Order(109, 34802, 5, 7.98),
    new Order(130, 423947, 2, 8.0),
  ];
}

function getOrderWithDiscount(
  order: Order,
  discountRules: Array<{
    qualify: (order: Order) => boolean;
    rule: (order: Order) => number;
  }>
): Order {
  const discounts = discountRules
    .filter((discountRules) => discountRules.qualify(order))
    .map((discountRules) => discountRules.rule(order))
    .sort(orderByASC)
    .slice(0, 2);

  const discount = average(discounts);

  return { ...order, Discount: discount };
}

var getDiscountRules: Array<{
  qualify: (order: Order) => boolean;
  rule: (order: Order) => number;
}> = [
  { qualify: isQualifyForExpiryOffer, rule: discountForExpiryOffer },
  {
    qualify: isQualifyAboveSpecifiedAmount,
    rule: discountAboveSpecifiedAmount,
  },
  { qualify: isQualifyForMonday, rule: discountForMonday },
];

function isQualifyForExpiryOffer(order: Order) {
  const expiryOfferData = "2023-01-17T11:43:57.786Z";
  return order.createdAt < expiryOfferData;
}
function discountForExpiryOffer(order: Order) {
  return order.Quantity * order.UnitPrice * 0.1;
}

function isQualifyAboveSpecifiedAmount(order: Order) {
  const specifiedAmount = 350;
  return order.Quantity * order.UnitPrice >= specifiedAmount;
}
function discountAboveSpecifiedAmount(order: Order) {
  return order.Quantity * order.UnitPrice * 0.15;
}

function isQualifyForMonday(order: Order) {
  const monday = 1; // 0 => sunday, 1 => monday, ...etc

  const createdAtOrder = new Date(order.createdAt);
  const dayOrderCreated = createdAtOrder.getDay();

  return dayOrderCreated === monday;
}
function discountForMonday(order: Order) {
  return order.Quantity * order.UnitPrice * 0.25;
}
