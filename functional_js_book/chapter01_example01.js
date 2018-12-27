// 특정 범위에서 중복없이 일정 갯수의 값을 뽑는 함수
const random = sid => Math.ceil((Math.random() * sid) % sid);

// used generator
const notContain = function*(iter, v) {
  for (const item of iter) {
    if (item == v) yield false;
  }
  yield true;
};

// used sync
const notContain2 = (iter, v) => {
  for (const item of iter) {
    if (item == v) return false;
  }
  return true;
};

const uniq = (iter, sid) => {
  let v = random(sid);
  return notContain(iter, v) ? v : uniq(iter, sid);
};

const uniq2 = (iter, sid) => {
  let v = random(sid);
  return notContain2(iter, v) ? v : uniq(iter, sid);
};

const range = (l, sid) => {
  const res = [];
  let i = -1;
  while (++i < l) {
    res.push(sid ? uniq(res, sid) : i);
  }
  return res;
};

const range2 = (l, sid) => {
  const res = [];
  let i = -1;
  while (++i < l) {
    res.push(sid ? uniq2(res, sid) : i);
  }
  return res;
};

(function run() {
  console.log(range(6, 45).sort((a, b) => (a > b ? 1 : -1)));
  console.time();
  range(10000000, 10000000);
  console.timeEnd();
  console.time();
  range2(50000, 50000);
  console.timeEnd();
})();
