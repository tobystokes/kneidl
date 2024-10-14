#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# add readme
cp gh-pages.md dist/readme.md
# cp CNAME dist/CNAME

# adds a .nojekyll file to e.g. stop github pages ignore underscored files
touch dist/.nojekyll

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init --initial-branch=main
git checkout -b main
git add -A
git commit -m 'deploy'

git push -f git@github.com:tobystokes/kneidl.git main:gh-pages

cd -
