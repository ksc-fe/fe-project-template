#!/bin/bash

echo "build environment：$1";

timeStr=$(date "+%Y%m%d%H%M%S")
testCommitMsg="build file into dist directory for test"
onlineCommitMsg="build file into dist directory for online"
tagVersion="fe-project-template-1.0.0-"+$timeStr

if [[ $1 == "test" ]]; then
	npm run dist
    echo "git autopush start..."
    git add .
    git commit -m "${testCommitMsg}"
    # git checkout dev
    git push origin dev
    echo "git autopush end..."
elif [[ $1 == "online" ]]
then
    npm run build && npm run upload:static
    echo "git autopush start..."
    git add .
    git commit -m "${onlineCommitMsg}"
    # git checkout master
    git push origin master
    git tag $tagVersion
    git push --tags
    echo "git autopush end..."
else
    echo "environment is invalid"
fi

echo "end build ==============="