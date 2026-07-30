<p align="center">
  <img width="280" src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3651486274,43013053&fm=26&gp=0.jpg" alt="logo">
</p>


## Start
``` bash
# 克隆项目
https://github.com/Baobao-Li/Blog.git
```

``` bash
# 安装依赖
npm i
```

``` bash
# 配置评论服务凭据（可选，不配置则评论功能关闭）
cp .env.example .env   # 填入自己的 VALINE_APP_ID / VALINE_APP_KEY
set -a && source .env && set +a
```

``` bash
# 启动服务
npm run dev
```

``` bash
# 构建静态目录
npm run build
```

``` bash
# 提交代码到仓库
git push origin master
```

``` bash
# 开启github pages
设置source: master > docs > save
```

``` bash
# 查看网站
在浏览器里输入 https://[your account name].github.io/[store name]/
```

## Development

> Please make sure your version of Node.js is greater than 8.


```bash
# 我的项目地址
https://baobao-li.github.io/Blog/
```