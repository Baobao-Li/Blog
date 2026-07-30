// [min, max] 区间内的随机整数
export function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// 数组内的随机元素
export function randomItem (list) {
  return list[randomInt(0, list.length - 1)]
}

// 随机 rgb 颜色
export function randomColor () {
  return `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`
}
