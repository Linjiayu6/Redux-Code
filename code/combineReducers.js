/**
 * combineReducers: 对拆分管理的reducer函数进行合并，最终合成一个reducer函数
 * 
 * 
 * 3. dishReducer和drinkReducer分别处理数据, 是如何合并在一起实现数据共享？
 * 4. 如果合并成一个reducer处理, action.type是怎么匹配，并改变值?
 */
export default function combineReducers(reducers) {
  // .....省略对传入reducers的类型校验
  /**
   * 例子:
   * const rootReducer = combineReducers({
      dishMaterial: dishReducer,
      drinkMaterial: drinkReducer,
    });
   * finalReducers: { dishMaterial, drinkMaterial }
   * finalReducerKeys = [dishMaterial, drinkMaterial];
   */
  const finalReducers = reducers;
  const finalReducerKeys = Object.keys(finalReducers);

  return function combination(state = {}, action) {
    // state是否变化的标记
    let hasChanged = false;
    const nextState = {};
    // 根据传入的action值，遍历每一个reducer函数，来改变state内容
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i];
      const reducer = finalReducers[key];
      const previousStateForKey = state[key];
      /**
       * action = { type: ON_ORDER_DRINK, payload: { name: 'coffee' } }
       */
      // *划重点
      const nextStateForKey = reducer(previousStateForKey, action);

      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}

/**
 * combination是新合成的reducer, 合成方法为: 如果有action的传入, 循环遍历每个reducer
 * (1) 初始化执行后
 *  combination返回的state为:

    const state = {
      dishMaterial: {
        chicken: 10,
        vegatable: 20,
        potato: 60,
      },
      drinkMaterial: {
        coffee: 10,
        beer: 5,
      },
    };
 *
 * (2) 当action = { type: ON_ORDER_DRINK, payload: { name: 'coffee' } }
 *  循环遍历到drinkMaterial(reducer), 返回新的内容为
 *  * const nextStateForKey = reducer(previousStateForKey, action);
 *  nextStateForKey = {
      coffee: 9, // 变化的值
      beer: 5,
    }

    * nextState[key] = nextStateForKey;
    const state = {
      dishMaterial: {
        chicken: 10,
        vegatable: 20,
        potato: 60,
      },
      drinkMaterial: {
        coffee: 9,
        beer: 5,
      },
    };
 */

