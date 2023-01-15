(function main() {
  console.log("main function started!");

  const addAndSquareOld = composeTwoFunction(square, addOne);
  const addAndSquare = compose(square, addOne);
  const addAndSquarePipe = pipe(addOne, square);

  const addAndSquareAndSubtract = pipe(addOne, square, subtractByTen);

  console.log({
    addAndSquareOld: addAndSquareOld(5),
    addAndSquare: addAndSquare(5),
    addAndSquarePipe: addAndSquarePipe(5),
    addAndSquareAndSubtract: addAndSquareAndSubtract(5),
  });
})();

// run functions from left to right
function pipe(...functions: Array<(x: any) => any>) {
  return (x: any) => functions.reduce((y, fn) => fn(y), x);
}

// run functions from right to left
function compose(...functions: Array<(x: any) => any>) {
  return (x: any) => functions.reduceRight((y, fn) => fn(y), x);
}

// run functions from right to left
function composeTwoFunction(f: (x: any) => any, g: (x: any) => any) {
  return (x: any) => f(g(x));
}

function addOne(x: number): number {
  return x + 1;
}

function square(x: number) {
  return x * x;
}

function subtractByTen(x: number): number {
  return x - 10;
}
