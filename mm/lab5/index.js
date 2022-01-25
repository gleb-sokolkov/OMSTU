const SgetN = require('../lab2/lib');

/* eslint-disable no-param-reassign */
function basic(t, func) {
  const n = t.length;
  const d = new Array(n).fill(0);
  const f = new Array(n).fill(0).map(() => new Array(n).fill(0));
  f.forEach((t1, i1) => t1.forEach((t2, i2) => {
    if (i1 === i2) t1[i2] = 1;
  }));
  for (let i = 0; i < n; i++) {
    let s1 = 0;
    for (let j = 0; j < i; j++) {
      s1 += f[j][i] * f[j][i] * d[j];
    }
    d[i] = func(t[i], t[i]) - s1;

    for (let j = i + 1; j < n; j++) {
      let s2 = 0.0;
      for (let k = 0; k < i; k++) {
        s2 += f[k][i] * f[k][j] * d[k];
      }
      f[i][j] = (func(t[i], t[j]) - s2) / d[i];
    }
  }

  return { d, f };
}

function discret(b, t, r, m) {
  const n = t.length;
  const ksi = new Array(n);
  const x = new Array(r).fill(0).map(() => new Array(n).fill(0));

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < n; j++) {
      ksi[j] = SgetN(0, Math.sqrt(b.d[j]));
      let s = m;
      for (let k = 0; k < j + i; k++) {
        s += ksi[k] * b.f[k][i];
      }
      x[i][j] = s;
    }
  }
  return { ksi, x };
}

const corr = (t1, t2) => 2 * Math.exp(-2 * Math.sqrt(Math.abs(t1 - t2)));

const t = [0, 1, 2, 3, 4, 5];
const b = basic(t, corr);
const runs = 1;
const m = 1.0;

const d = discret(b, t, runs, m);

console.log(b);
console.log(d);
