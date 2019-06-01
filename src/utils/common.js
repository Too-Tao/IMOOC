/**
 * 验证数据的类型
 * @param obj 任何数据
 */
export const typeOf = (obj) => {
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
    '[object Symbol]': 'symbol'
  }
  return map[Object.prototype.toString.call(obj)]
}

/**
 * 简单判断一个对象是都为空对象（忽略不可枚举属性）
 * @param obj 对象
 */
export const isEmptyObject = (obj) => {
  return obj && Object.keys(obj).length === 0
}