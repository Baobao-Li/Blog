#!/usr/bin/env bash
# 现已通过GitHub Actions自动部署，提交只需 'git push' 即可
# 若不想使用自动部署，可以直接运行命令 'npm run deploy' 本地自动提交部署

# 确保脚本抛出遇到的错误：管道中任意命令失败、使用未定义变量都会中断
set -euo pipefail

trap 'echo "部署失败：第 $LINENO 行命令 \"$BASH_COMMAND\" 返回非 0" >&2' ERR

REPO_URL="git@github.com:Baobao-Li/Blog.git"
DIST_DIR="docs/.vuepress/dist"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd "$ROOT_DIR"

# 生成静态文件
npm run build

# 独立的 gh-pages 产物仓库（可选），目录不存在时跳过而不是让 cd 静默失败
if [ -d "$DIST_DIR" ]; then
  (
    cd "$DIST_DIR"

    # 如果是发布到自定义域名
    # echo 'www.example.com' > CNAME

    git init
    git add -A
    git commit -m 'deploy'
    git remote add origin "$REPO_URL"
    git checkout -b gh-pages

    # 如果发布到 https://<USERNAME>.github.io
    #git push -f git@github.com:zpj80231/zpj80231.github.io.git gh-pages
    #git push origin :gh-pages
    git push -u origin gh-pages -f
  )
else
  echo "未发现 $DIST_DIR，跳过 gh-pages 发布"
fi

git add -A src docs
# 没有改动时 git commit 会返回非 0，此处属于正常情况
if ! git diff --cached --quiet; then
  git commit -m 'update docs'
  git push origin master
else
  echo "文档无改动，跳过提交"
fi

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
