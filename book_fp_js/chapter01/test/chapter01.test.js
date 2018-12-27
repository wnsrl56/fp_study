const [filter, map, filter_imperative, map_imperative] = require('../book_examples');

const users = [
  { name: 'TN', age: 76 },
  { name: 'KG', age: 34 },
  { name: 'DK', age: 54 },
  { name: 'FD', age: 64 },
  { name: 'GF', age: 42 },
  { name: 'FE', age: 45 },
  { name: 'FD', age: 35 }
];

test("filter function's result is Equal to filter_imperative.", () => {
  expect(filter(users, v => v.age < 35)).toEqual(filter_imperative(users, 35));
});

test("map's result is Equal to map_impreative.", () => {
  expect(map([1, 2, 3], v => v * 2)).toEqual(map_imperative([1, 2, 3]));
});
