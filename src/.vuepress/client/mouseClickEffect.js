import { isDesktop } from '../utils/device'
import { randomColor, randomItem } from '../utils/random'

const WORDS = [
  'css', 'scss', 'node-sass', 'sass-loader', 'moment', 'TypeScript', 'HTML',
  'uni-app', 'Ant Design Mobile', 'js', 'Vue', 'vuepress', 'React', 'jquery',
  'Swiper', 'Vant', 'Element-ui', 'react-router-dom', 'redux', 'axios',
  'mockjs', 'react-redux', 'Vuex'
]

const RISE_DISTANCE = 160
const DURATION = 1500

function createWord (event) {
  const node = document.createElement('span')
  node.textContent = randomItem(WORDS)
  Object.assign(node.style, {
    position: 'absolute',
    zIndex: String(Date.now()),
    top: `${event.pageY - 20}px`,
    left: `${event.pageX}px`,
    fontWeight: 'bold',
    color: randomColor(),
    userSelect: 'none',
    cursor: 'default',
    whiteSpace: 'nowrap',
    transition: `top ${DURATION}ms linear, opacity ${DURATION}ms linear`
  })
  document.body.appendChild(node)

  // 下一帧再改属性，保证过渡生效
  requestAnimationFrame(() => {
    node.style.top = `${event.pageY - 20 - RISE_DISTANCE}px`
    node.style.opacity = '0'
  })
  setTimeout(() => node.remove(), DURATION)
}

// 点击页面时冒出随机技术栈关键字，仅桌面端生效
export default function setupMouseClickEffect () {
  if (typeof document === 'undefined' || !isDesktop()) return
  document.body.addEventListener('click', createWord)
}
