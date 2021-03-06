const random = sid => Math.ceil((Math.random() * sid * Date.now()) % sid);

const notContain = (iter, v) => {
  for (const item of iter) {
    if (item == v) return false;
  }
  return true;
};

const uniq = (iter, sid) => {
  let v = random(sid);
  return notContain(iter, v) ? v : uniq(iter, sid);
};

const range = (l, sid) => {
  const res = [];
  let i = -1;
  while (++i < l) {
    res.push(sid ? uniq(res, sid) : i);
  }
  return res;
};

function run() {
  console.log(range(6, 45).sort((a, b) => (a > b ? 1 : -1)));
};
run();