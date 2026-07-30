// 移动端 UA 匹配，桌面端专属特效统一使用这里的判断
const MOBILE_UA_RE = /(phone|pod|iPhone|iPad|iPod|ios|Android|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i

// 是否为移动端，服务端渲染时统一返回 false
export function isMobile () {
  return typeof navigator !== 'undefined' && MOBILE_UA_RE.test(navigator.userAgent)
}

// 是否为桌面端（浏览器环境且非移动端）
export function isDesktop () {
  return typeof navigator !== 'undefined' && !isMobile()
}
