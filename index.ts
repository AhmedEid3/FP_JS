import { orderByASC } from "./helpers/orderByASC";

const listNumbers = [7, 4, 5, 6, 3, 8, 10];

console.log("Declarative Programming by JS");
listNumbers
  .map(addOne)
  .map(square)
  .filter((x) => x < 70)
  .sort(orderByASC)
  .slice(0, 2)
  .map(subtractByTen)
  .forEach(logValue);

function addOne(x: number): number {
  return x + 1;
}

function square(x: number) {
  return x * x;
}

function subtractByTen(x: number): number {
  return x - 10;
}

function logValue(x: number): void {
  console.log("x: ", x);
}
