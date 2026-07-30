const plugins = require('./config/plugins/')

// 评论服务（Valine / LeanCloud）凭据从环境变量读取，不要写进仓库
const valineAppId = process.env.VALINE_APP_ID
const valineAppKey = process.env.VALINE_APP_KEY

if (!valineAppId || !valineAppKey) {
  console.warn('[vuepress] 未检测到 VALINE_APP_ID / VALINE_APP_KEY，评论功能已关闭。参考 .env.example')
}

module.exports = {
  dest: './docs/',
  base: '/Blog/',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '前端知识点总结',
      description: '任何不能够给你快乐的编程都是耍流氓'
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/img/logo.jpg' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    ["script", {
      "src": "https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js",
      "integrity": "sha384-1H217gwSVyLSIfaLxHbE7dRb3v4mYCKbpQvzx0cegeju1MVsGrX5xXxAvs/HgeFs",
      "crossorigin": "anonymous",
      "referrerpolicy": "no-referrer"
    }],
    ["script", { "language": "javascript", "type": "text/javascript", "src": "/js/MouseClickEffect.js" }]
  ],
  // 主题
  theme: 'reco',
  themeConfig: {
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // 导航栏 Logo
    logo: '/img/logo.jpg',
    // 开启侧边栏
    // sidebar: 'auto',
    // sidebarDepth: 1,
    locales: {
      '/': {
        label: '简体中文',
        repo: 'baobao-li/Blog',
        selectText: '选择语言',
        editLinkText: '帮助我们改进内容',
        lastUpdated: '上次更新',
        // 导航
        nav: [
          { text: '首页', link: '/', icon: 'reco-home' },
          { text: '快速搭建开发环境', link: '/exploit/', icon: 'reco-tag' },
          {
            text: 'Web知识点', icon: 'reco-category',
            items: [
              { text: '思维导图', link: '/web/Mind/' },
              { text: 'Vue', link: '/web/Vue/' },
              { text: 'React', link: '/web/React/' },
              { text: 'React Hooks', link: '/web/ReactHooks/' },
              { text: '小程序', link: '/web/VX/' },
              { text: 'Webpack', link: '/web/Webpack/' },
              { text: 'TypeScript', link: '/web/Ts/' },
              { text: 'Git', link: '/web/Git/' },
            ]
          },
          { text: '关于我', link: '/about/', icon: 'reco-message' },
          { text: 'GitHub', link: 'https://github.com/Baobao-Li/Blog', icon: 'reco-github' },
        ],
        // 侧边栏
        sidebar: {
          // 快速搭建开发环境
          '/exploit/': SidebarConfig('快速搭建开发环境', ['']),
          // Web
          '/web/Mind/': SidebarConfig('思维导图版知识点总结', ['']),
          '/web/Vue/': SidebarConfig('Vue知识点', ['', 'Es6', 'Es6方法扩展', 'Webpack', 'Babel', 'Promise', 'Vue 各种方法之间的区别', 'Vue组件', 'Vue路由', 'Vue动画', 'vue钩子函数', 'vuex']),
          '/web/React/': SidebarConfig('React知识点', ['', 'JSX', 'MVVM', 'Props', 'React生命周期', 'React组件', 'React路由', 'redux', 'redux中间件', '组件通信', '高阶组件']),
          '/web/ReactHooks/': SidebarConfig('React Hooks', ['']),
          '/web/VX/': SidebarConfig('小程序知识点', ['', 'WXS', 'wepy组件通信', '小程序事件', '小程序路由', '小程序组件', '小程序组件化']),
          '/web/Webpack/': SidebarConfig('Webpack', ['']),
          '/web/Ts/': SidebarConfig('TypeScript', ['', 'TypeScript高级用法']),
          '/web/Git/': SidebarConfig('Git操作', ['']),
          // 关于我
          '/about/': SidebarConfig('关于我', ['']),
        },
      }
    },



    // 最后更新时间
    lastUpdated: true,
    lastUpdated: '上次更新', // string | boolean
    // 作者
    author: 'Baobao-Li',
    // 项目开始时间
    startYear: '2020',
    // 如果你的文档不在仓库的根部
    docsDir: 'docs',
    markdown: {
      // 是否在每个代码块的左侧显示行号。
      lineNumbers: true
    },
    // 评论
    ...(valineAppId && valineAppKey
      ? {
        valineConfig: {
          appId: valineAppId,
          appKey: valineAppKey,
          placeholder: '填写邮箱可以收到回复哦!',
          notify: true, // 邮件提醒
          verify: true, // 验证码
          recordIP: true
        }
      }
      : {}),
    // https://vuepress-theme-reco.recoluan.com/
  },
  plugins
}

function SidebarConfig(title, children) {
  return [
    {
      title,
      children
    }
  ]
}