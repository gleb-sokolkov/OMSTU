module.exports = function SgetN(_sigma, _a) {
  const getX = (v, s) => v * Math.sqrt((-2 * Math.log(s)) / s);
  let v1 = 0;
  let v2 = 0;
  let S = 2;
  while (S >= 1) {
    v1 = Math.random() * 2 - 1;
    v2 = Math.random() * 2 - 1;
    S = v1 * v1 + v2 * v2;
  }
  const X1 = getX(v1, S);
  return _sigma * X1 + _a;
};
