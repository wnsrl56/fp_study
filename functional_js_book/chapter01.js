const filter = (iter, f) => {
  const res = [];
  for (const a of iter) {
    if (f(a)) {
      res.push(a);
    }
  }
  return res;
};

const filter_imperative = (users, age) => {
  let res = [];
  for (let i = 0; i < users.length; i++) {
    let user = users[i];

    if (user.age < age) {
      res.push(users[i]);
    }
  }
  return res;
};

const map = (iter, f) => {
  const res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
};

const map_imperative = items => {
  const res = [];

  for (let i = 0; i < items.length; i++) {
    res.push(items[i] * 2);
  }

  return res;
};

const not = v => {
  return !v;
};

const beq = a => b => a === b;

const identity = v => v;

const run1 = () => {
  console.log(map([1, 2, 3], v => v * 2));
};

const run = () => {
  const addMaker = function addMaker(a) {
    return b => a + b;
  };

  const add10 = addMaker(10);
  console.log(add10(20));
};

const main = () => {
  // run();
  run1();
};

main();

module.exports = [filter, map, filter_imperative, map_imperative];
