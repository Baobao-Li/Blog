const WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

// 补零，1 -> '01'
export function pad2 (value) {
  return value >= 10 ? String(value) : '0' + value
}

// 时钟展示所需的各时间片段
export function clockParts (time = new Date()) {
  return {
    year: String(time.getFullYear()),
    month: pad2(time.getMonth() + 1),
    date: pad2(time.getDate()),
    hour: pad2(time.getHours()),
    minute: pad2(time.getMinutes()),
    second: pad2(time.getSeconds()),
    day: WEEK[time.getDay()]
  }
}
