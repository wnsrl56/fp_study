const run = () => {
  const f = () => {
    const a = 10;
    return () => {
      // a 를 평가하는 코드가 내부에 없으면, closure로 생성되지 않는다.
    };
  };
  const f2 = () => {
    const a = 10;
    return () => {
      // 해당 실행 context로 들어오게 되면 closure를 생성해서 메모리에 담고 있는 걸 확인 할 수 있다.
      console.log(a);
    };
  };

  f()();
  f2()();
};

const outer = 10;
const outer2 = 20;

function outerFunc() {
  // 해당 함수는 브라우저 환경에서는 closure가 아니다.
  // 전역에 변수를 선언해놓고 참조 하고 있기 때문
  // 하지만, 파일 단위 런타임인 Node 에서는 전역 환경이 없기 때문에, 클로저로 생성된다.
  return outer + outer2;
}

const run2 = () => {
  // 하단의 함수들은 클로져가 있을 것 같지만 클로져인 함수가 하나도 없다.
  // a, b 는 호출 되는 부분이 없어서 사실 상 가비지 컬렉팅 대상이고, 그외에는 상식적으로 없다.
  const f = () => {
    const a = 10;
    const b = 20;
    const f2 = (c, d) => {
      return c + d;
    };
    return f2;
  };

  const f3 = f();

  console.log(f3(10, 25));
};

const run3 = () => {
  // 하단의 함수는 클로져 였었다.
  // f2를 선언 할 때는 클로져로 생성되지만, return에서 실행 후 값을 평가 한 다음에는 참조 하는 곳이 없기 때문에 메모리가 전부 해제된다.
  const f = () => {
    const a = 25;
    const b = 35;
    function f2() {
      return a + b;
    }
    return f2();
  };
  f();
};

const run4 = () => {
  // 이 함수는 정통 클로져 이다.
  // f가 실행되면서 f2를 선언하는데 그 당시 a의 변수를 기억하고 클로징 시켜서 f2 함수를 만든다.
  // 따라서 변수 add10을 실행 시키면, 이미 f의 실행 컨텍스트가 사라져서 a를 참조하지 못 할 것 같지만,
  // 잘 기억하고 있는걸 볼 수 있다.
  const f = () => {
    const a = 10;
    function f2(b) {
      return a + b;
    }
    return f2;
  };
  const add10 = f();
  console.log(add10(20));
};

const run5 = () => {
  // 시점과 hoisting을 설명해야되서, 선언 키워드 var를 사용한다.
  // 함수를 변수에 할당하는 것과, 선언하는 것은 그 시점이 다른데,
  // 클로져는 런타임 때 메모리를 확인하기 때문에,
  // 렉시컬 파싱 때 호이스팅으로 값이 없는 b를 미리 선언 하더래도
  // 런타임 시, 값 20을 할당 받은 후, f2에서 참조하기 때문에 에러가 발생하지 않는다.
  const f = () => {
    const a = 10;
    // 하단 함수는 값으로 전달해도 마찬가지 이다.
    // var f2 = (c) => a + b + c;
    function f2(c) {
      return a + b + c;
    }
    const b = 20;
    return f2;
  };
  const add30 = f();
  console.log(add30(30));
};

const main = () => {
  // run();
  // console.log(outerFunc());
  // run2();
  // run3();
  // run4();
  run5();
};

main();
