const run = () => {
  // 일급 특징

  // 1. 변수에 담을 수 있다.
  // 2. 값으로 활용 할 수 있다. (리턴 값, 인자로 전달)

  // JS에서의 일급 함수의 추가 특징
  // 3. 때에 상관없이 선언이 가능하다(런타임 시점에 상관없음)
  // 4. 익명으로 선언이 가능하다.
  // 5. 익명으로 선언한 함수도 값으로 활용 할 수 있다. (리턴 값, 인자로 전달)

  // 하단의 예제는 위의 특성을 전부 만족함을 보여준다
  function f1() {}
  var a = typeof f1 == 'function' ? f1 : function() {};

  function f2() {
    return function() {};
  }
  (function(a, b) {
    return a + b;
  })(10, 20);

  function callAndAdd(a, b) {
    return a() + b();
  }
  console.log(callAndAdd(_ => 10, _ => 20));
};

function main() {
  run();
}
main();
