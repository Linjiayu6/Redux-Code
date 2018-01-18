
const add = (x, y, z) => x + y + z;
add(1, 2, 3);

// 把一个多参数的函数，转化为单参数函数   *每次只接受单参
// curry: 高阶函数, 匿名函数, 闭包
const addCurry = x => y => z => x + y + z;
addCurry(1)(2)(3);
