const _ = {};

let users = [
  { name: 'TN', age: 76, id: 1 },
  { name: 'KG', age: 34, id: 2 },
  { name: 'DK', age: 54, id: 3 },
  { name: 'FD', age: 64, id: 4 },
  { name: 'GF', age: 42, id: 5 },
  { name: 'FE', age: 45, id: 6 },
  { name: 'TK', age: 35, id: 7 }
];

users = users.map(v => {
  v.getName = () => {
    return v.name;
  };
  return v;
});

const run = () => {
  // 하단의 의미없이 들어오는 인자에 따라서 함수가 생성되고 있다 해당 문제를 간결하게 변경하려고 한다.
  const findById = (list, id) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id == id) {
        return list[i];
      }
    }
    return null;
  };
  const findByName = (list, name) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].name == name) {
        return list[i];
      }
    }
    return null;
  };
  const findByAge = (list, age) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].age == age) {
        return list[i];
      }
    }
    return null;
  };
};
const run2 = () => {
  // run의 1차 refactoring
  const findBy = (list, key, value) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i][key] === value) {
        return list[i];
      }
    }
    return null;
  };

  // console.log(findBy(users, 'id', 1));
  // console.log(findBy(users, 'name', 'FD'));
  // console.log(findBy(users, 'age', 45));

  // 위 함수는 몇가지 상황을 해결하지 못한다.
  // 1. key 가 아닌 method를 통해서 값을 구하고 싶을 때
  // 2. === 표현을 쓰지 않고 다른 비교로 값을 찾고 싶을 때
  // 3. 조건을 여러 가지를 쓰고 싶을 때
  // > 함수로 변경해서 해결을 해본다
  const find = (iter, f) => {
    for (const item of iter) {
      if (f(item)) return item;
    }
    return null;
  };

  console.log(find(users, v => v.name === 'FD').getName());
  console.log(find(users, v => v.name.indexOf('F') != -1));
  console.log(find(users, v => v.age === 54 && v.id === 3));
  console.log(find(users, v => v.age < 45).getName());

  // 비교 파트를 함수로 더 분해한다.
  const bmatch1 = (key, value) => {
    return obj => {
      return obj[key] === value;
    };
  };

  console.log(find(users, bmatch1('name', 'FD')).getName());
  console.log(find(users, v => v.age === 54 && v.id === 3));

  //한 개가 아닌 2개의 key를 비교하는 함수로 업그레이드
  const createObject = (key, value) => {
    let obj = {};
    obj[key] = value;
    return obje;
  };
  const match = (a, b) => {
    for (const key in b) {
      if (a[key] !== b[key]) return false;
    }
    return true;
  };
  const bmatch = (obj2, ...rest) => {
    if (rest.length === 1) {
      obj2 = createObject(obj2, [rest]);
    }
    return obj => {
      return match(obj, obj2);
    };
  };
  console.log(
    match(find(users, v => v.name === 'FD'), find(users, v => v.age === 64))
  );

  const findByIndex = (iter, f) => {
    let i = -1;
    while (++i < iter.length) {
      const item = iter[i];
      if (f(item)) return i;
    }
    return -1;
  };

  console.log(findByIndex(users, v => v.name === 'FD'));
  console.log(findByIndex(users, v => v.name === 'FD'));
  console.log(findByIndex(users, v => v.name === 'KK'));
};

const run3 = () => {
  // 고계 함수를 만들어 본다.
  _.map = (iter, f) => {
    let res = [];
    let i = -1;
    while (++i < iter.length) {
      const item = iter[i];
      res.push(f(item, i, iter));
    }
    return res;
  };

  _.filter = (iter, f) => {
    let res = [];
    let i = -1;
    while (++i < iter.length) {
      const item = iter[i];
      if (f(item, i, iter)) res.push(item);
    }
    return res;
  };

  _.find = (iter, f) => {
    let i = -1;
    while (++i < iter.length) {
      const item = iter[i];
      if (f(item, i, iter)) return item;
    }
    return null;
  };

  _.findIndex = (iter, f) => {
    let i = -1;
    while (++i < iter.length) {
      const item = iter[i];
      if (f(item, i, iter)) return i;
    }
    return -1;
  };

  console.log(_.filter([1, 2, 3, 4], (v, i) => i > 1));
  console.log(_.filter([1, 2, 3, 4], (v, i) => i % 2 == 0));

  // identity는 filter와 조합 하게 되먄, falsy value 를 걸러준다.
  _.identity = v => v;

  const a = 10;

  console.log(_.identity(a));
  console.log(_.filter([true, 0, '', 'a', false, null], _.identity));
  //Boolean 평가 시에, falsy value를 반환하는 전체 집합 , 그 외는 전부 truthy value
  console.log(_.filter([false, undefined, null, 0, NaN, ''], _.identity));

  // 값의 Boolean 평가는 항상 중요하다.
  _.truthy = v => !!v;
  _.falsy = v => !v;

  // 위 조합을 통해서, some, every 함수를 만들 수 있다.
  // some은 iter 내부에 하나 이상의 truthy 값이 존재 할 때 true 반환
  // every는 iter 내부에 모든 값이 truthy 값이 존재 할 때 true 반환

  _.some = iter => !!_.find(iter, _.identity);
  _.every = iter => _.filter(iter, _.identity).length === iter.length;

  console.log(_.some([true, 0, '', 'a', false, null]));
  console.log(_.some([false, undefined, null, 0, NaN, '']));
  console.log(_.every([true, 1]));
  console.log(_.every([false, undefined, null, 0, NaN, '']));

  _.not = v => !v;
  _.beq = a => b => a === b;

  // 로직 개선 positive / negative 함수를 만들 수 있다.
  const positive = iter => _.find(iter, _.identity);
  const negativeIndex = iter => _.findIndex(iter, _.not);
  // 다음과 같이 리펙토링이 가능하다
  _.some = iter => _.not(_.not(positive(iter)));
  _.every = iter => _.beq(-1)(negativeIndex(iter));

  console.log(_.every([1]));

  // compose 함수를 통해서 함수를 우측에서 좌측으로 합성해 갈 수 있다.
  // 하단 코드는 화살표 함수로 작성된 함수의 this, apply, call 을 반영 할 수 없어서 사용하기가 힘들다. es5 under 에서 가능
  // _.compose = (...args) => {
  //   const start = args.length - 1;
  //   return function() {
  //     console.log(args);
  //     let i = start;
  //     let res = args[start].apply(this, args);
  //     while (i--) res = args[i].call(this, res);
  //     return res;
  //   };
  // };
};

function main() {
  // run();
  // run2();
  run3();
}
main();
