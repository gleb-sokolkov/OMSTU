/* eslint-disable no-plusplus */
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const fs = require('fs').promises;
const path = require('path');

const n = 50;
const lambda = 1.0;
const a = 2;
const sigma = 3;

async function drawCanvas(datasets, filename) {
  const width = 500;
  const height = 500;
  const config = {
    type: 'line',
    data: {
      labels: datasets[0].data.map((t, i) => i),
      datasets,
    },
    plugins: [{
      id: 'background-colour',
      beforeDraw: (chart) => {
        const { ctx } = chart;
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      },
    }],
  };

  const chart = new ChartJSNodeCanvas({ width, height });
  const buffer = await chart.renderToBuffer(config);
  await fs.writeFile(path.join(__dirname, `./example/${filename}.png`), buffer, 'base64');
}

function getU() {
  return new Array(n).fill('').map(Math.random);
}
function getP(U) {
  return U.map((u) => -lambda * Math.log(u));
}
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

// равномерное распределение
const U = {
  label: 'Равномерное распределение',
  backgroundColor: 'rgb(255, 255, 255)',
  borderColor: '#E98A15',
  borderWidth: 4,
  data: getU(),
};
// показательное распределение
const P = {
  label: 'Показательное распределение',
  backgroundColor: 'rgb(255, 255, 255)',
  borderColor: '#003B36',
  borderWidth: 4,
  data: getP(U.data),
};
// нормальное распределение
const N = {
  label: 'Нормальное распределение',
  backgroundColor: 'rgb(255, 255, 255)',
  borderColor: '#6290C3',
  borderWidth: 4,
  data: getN(),
};

// console.group('\x1b[1m', 'Распределения случайных величин');
// console.log(`Равномерное: ${U.data}\n`);
// console.log(`Показательное: ${P.data}\n`);
// console.log(`Нормальное: ${N.data}\n`);
// console.log('\x1b[0m');

drawCanvas([U, P, N], 'dist');
