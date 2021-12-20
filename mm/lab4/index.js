const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const fs = require('fs').promises;
const path = require('path');

const d = {
  mx: 0, my: 0, sx: 1, sy: 1, r: [0.1, 0.5, 0.9], n: 1000,
};
const getS = () => new Array(6).fill('').reduce((a) => a + Math.random(), 0);
const getSigmaYX = (r) => d.sy * Math.sqrt(1 - r * r);
const getX = () => Math.SQRT2 * d.sx * (getS() - 3) + d.mx;
const getMYX = (x, r) => d.my + r * (d.sy / d.sx) * (x - d.mx);
const getY = (myx, r) => Math.SQRT2 * getSigmaYX(r) * (getS() - 3) + myx;
const getArrXY = (r) => new Array(d.n).fill('').map(getX).map((x) => ({ x, y: getY(getMYX(x, r), r) }));

async function drawCanvas(data, filename) {
  const width = 500;
  const height = 500;
  const config = {
    type: 'scatter',
    plugins: [{
      beforeDraw: (chart) => {
        const ctx = chart.canvas.getContext('2d');
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
        const xAxis = chart.scales.x;
        const yAxis = chart.scales.y;
        const { scales } = chart.config.options;
        scales.x.ticks.padding = yAxis.top - yAxis.getPixelForValue(0) + 6;
        scales.y.ticks.padding = xAxis.getPixelForValue(0) - xAxis.right + 6;
      },
    }],
    data: {
      datasets: [{
        label: 'Двумерная случайная величина (x, y)',
        data,
        borderColor: 'red',
      }],
    },
    options: {
      scales: {
        xAxes: [{
          ticks: {
            min: -6,
            max: 6,
            stepSize: 1,
            callback: (v) => (v == 0 ? '' : v),
          },
          gridLines: {
            drawTicks: false,
          },
        }],
        yAxes: [{
          ticks: {
            min: -6,
            max: 6,
            stepSize: 1,
            callback: (v) => (v == 0 ? '' : v),
          },
          gridLines: {
            drawTicks: false,
          },
        }],
      },
    },
  };

  const chart = new ChartJSNodeCanvas({ width, height });
  const buffer = await chart.renderToBuffer(config);
  await fs.writeFile(path.join(__dirname, `./example/${filename}.png`), buffer, 'base64');
}

drawCanvas(getArrXY(d.r[0]), 'r01');
drawCanvas(getArrXY(d.r[1]), 'r05');
drawCanvas(getArrXY(d.r[2]), 'r09');
