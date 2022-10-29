import { composition } from "./modules/math/composition.js";
import { division } from "./modules/math/division.js";
import { subtraction } from "./modules/math/subtraction.js";
import { multiplication } from "./modules/math/multiplication.js";
import { one, two, three, four, five } from "./modules/numbers/numbers.js";

/* ------------------------------ TASK 10 ---------------------------------------------------
Sutvarkykite užduoties "Task 10" esančius failus taip, kad veiktų žemiau pateiktos funkcijos.
-------------------------------------------------------------------------------------------- */

let a = composition(one, four);
let b = division(four, two);
let c = subtraction(three, two);
let d = multiplication(five, two);

console.log(a);
console.log(b);
console.log(c);
console.log(d);
