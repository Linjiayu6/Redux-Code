
function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  // funcs: [func_5, func_4,.... ]
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

/**
 * 1. reduce简单使用
 */
const add = () => [1, 2, 3, 4].reduce((prev, next) => prev + next);
console.log('第一个例子', add());
console.log('==================================');
/**
 * 第一次: 1, 2 => 3
 * 第二次: 3, 3 => 6
 * 第三次: 6, 4 => 10
 * 第四次: 10
 */

// 2例子: 顺序执行func_1,func_2, ....
const func_1 = () => console.log(1);
const func_2 = () => console.log(2);
const func_3 = () => console.log(3);

console.log('第二个例子');
// 深度括号
func_3(func_2(func_1()));
console.log('==================================');

console.log('第三个例子');
const func = compose(func_3, func_2, func_1);
// func = () => func_3(func_2(func_1()))
func();
console.log('==================================');