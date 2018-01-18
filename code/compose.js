
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
 * 1. Array.prototype.reduce()简单介绍
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


/**
 * 2. 深度括号模式 实现函数执行
 */
const func_1 = () => console.log(1);
const func_2 = () => console.log(2);
const func_3 = () => console.log(3);

console.log('第二个例子');
// 深度括号
// func_3(func_2(func_1()));
console.log('==================================');


/**
 * 3. 去掉深度括号模式 compose实现
 */
console.log('第三个例子');
const func = compose(func_3, func_2, func_1);
// compose方式同 func = () => func_3(func_2(func_1()))
func();
console.log('==================================');
