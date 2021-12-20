const n = 500;
const lambda = 1.0;
const a = 2;
const sigma = 3;

const getU = () => new Array(n).fill('').map(Math.random);
const getP = () => getU().map((u) => -lambda * Math.log(u));

function getN() {
  const getX = (v, s) => v * Math.sqrt((-2 * Math.log(s)) / s);
  const Y = [];

  for (let i = 0; i < n; i++) {
    let v1 = 0;
    let v2 = 0;
    let S = 2;
    while (S >= 1) {
      v1 = Math.random() * 2 - 1;
      v2 = Math.random() * 2 - 1;
      S = v1 * v1 + v2 * v2;
    }
    const X1 = getX(v1, S);
    Y.push(sigma * X1 + a);
  }
  return Y;
}

Array.prototype.ToExcel = function () {
  return this.join('\n').replace(/\./g, ',');
}

const U = getU();
const P = getP();
const N = getN();

console.log('Равномерное распределение:');
console.log(U.ToExcel(), '\n');
console.log('Показательное распределение:');
console.log(P.ToExcel(), '\n');
console.log('Нормальное распределение:');
console.log(N.ToExcel(), '\n');
