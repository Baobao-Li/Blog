// 循环列表的下一个下标
export function nextIndex (current, length) {
  if (!length) return 0
  return (current + 1) % length
}

// 循环列表的上一个下标（到头即停留在 0）
export function prevIndex (current) {
  return current > 0 ? current - 1 : 0
}
