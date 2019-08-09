#!/usr/bin/env bash

set -e

if [ $CIRCLE_BRANCH == $SOURCE_BRANCH ]; then
  mkdir -p ~/.ssh
  ssh-keyscan github.com >> ~/.ssh/known_hosts

  yes | git clone $CIRCLE_REPOSITORY_URL gh-pages

  pushd gh-pages

  git config user.name "CircleCI auto deploy"
  git config user.email "circleci@lotwcs.com"

  git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH
  git rm -rf .
  popd ..

  cp -a build/. gh-pages/.

  mkdir -p gh-pages/.circleci && cp -a .circleci/. gh-pages/.circleci/.
  pushd gh-pages

  git add -A
  git commit -m "Automated deployment to GitHub Pages: ${CIRCLE_SHA1}" --allow-empty

  git push origin $TARGET_BRANCH
fi
