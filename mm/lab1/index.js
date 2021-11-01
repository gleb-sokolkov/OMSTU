/* eslint-disable no-plusplus */

const N = 100000;
const c = 1327;
const a = 41;
const i = N + 1;
let x = 1;
let count = 0;
const num = new Set();

console.log(N);

for (let k = 0; k < i; k++) {
  x = (a * x + c) % N;
  if (num.has(x)) {
    console.log(`x0 = x${count}`);
    console.log(`T = ${count}`);
    console.log(`${count + 1} : ${x}`);
    break;
  }
  count++;
  num.add(x);
  console.log(`${count} : ${x}`);
}
