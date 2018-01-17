
const add = (x, y, z) => x + y + z;
add(1, 2, 3);

const addCurry = x => y => z => x + y + z;
addCurry(1)(2)(3);
