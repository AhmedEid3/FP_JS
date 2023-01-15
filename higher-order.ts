import Order from "./model/Order";
import { ProductType } from "./model/ProductType";

function main() {
  const order = new Order(105, 234797, 7, 19.98);

  const product = ProductType.Food;

  const productParametersType =
    product === ProductType.Food
      ? productParametersFood
      : product === ProductType.Beverage
      ? ProductParametersBeverage
      : ProductParametersRawMaterial;

  console.log(order);

  const discountValue = calculateDiscount(productParametersType, order);

  console.log({ discountValue });
}

function calculateDiscount(
  ProductParameterCalc: (x: number) => { x1: number; x2: number },
  Order: Order
) {
  const parameters: { x1: number; x2: number } = ProductParameterCalc(
    Order.ProductIndex
  );
  return parameters.x1 * Order.Quantity + parameters.x2 * Order.UnitPrice;
}

function productParametersFood(ProductIndex: number): {
  x1: number;
  x2: number;
} {
  return {
    x1: ProductIndex / (ProductIndex + 100),
    x2: ProductIndex / (ProductIndex + 300),
  };
}

function ProductParametersBeverage(ProductIndex: number): {
  x1: number;
  x2: number;
} {
  return {
    x1: ProductIndex / (ProductIndex + 300),
    x2: ProductIndex / (ProductIndex + 400),
  };
}

function ProductParametersRawMaterial(ProductIndex: number): {
  x1: number;
  x2: number;
} {
  return {
    x1: ProductIndex / (ProductIndex + 400),
    x2: ProductIndex / (ProductIndex + 700),
  };
}

main();
