/* ------------------------------ TASK 8 --------------------------------------------
Sukurkite konstruktoriaus funkciją "Calculator" (naudokite ES5), kuri gebės sukurti objektus su 4 metodais:
sum(a, b) - priima du skaičius ir grąžina jų sumą.
subtraction(a, b) - priima du skaičius ir grąžina jų skirtumą.
multiplication(a, b) - priima du skaičius ir grąžina jų daugybos rezultatą;
division(a, b) - priima du skaičius ir grąžina jų dalybos rezultatą;
------------------------------------------------------------------------------------ */

function Calculator(a, b) {
  this.a = a;
  this.b = b;
  this.sum = function () {
    return this.a + this.b;
  };
  this.subtraction = function () {
    return this.a - this.b;
  };
  this.multiplication = function () {
    return this.a * this.b;
  };
  this.division = function () {
    return this.a / this.b;
  };
}

const calculate = new Calculator(5, 6);

console.log(
  `This is a sum of ${calculate.a} and ${calculate.b}: ${calculate.sum()}`
);
console.log(
  `This is a subtraction of ${calculate.a} and ${
    calculate.b
  }: ${calculate.subtraction()}`
);
console.log(
  `This is a multiplication of ${calculate.a} and ${
    calculate.b
  }: ${calculate.multiplication()}`
);
console.log(
  `This is a division of ${calculate.a} and ${
    calculate.b
  }: ${calculate.division()}`
);
