const functional = () => {
  function f1() {}
  var a = typeof f1 == 'function' ? f1 : function() {};

  function f2() {
    return function() {};
  }
  (function(a, b) {
    return a + b;
  })(10, 20);
};

function main() {}
main();
