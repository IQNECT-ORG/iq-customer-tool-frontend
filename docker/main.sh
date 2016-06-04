#!/bin/bash
set -euox pipefail

PROJECT=${PROJECT:-"iq-customer-tool-frontend"}
ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )"/.. && pwd )"
IQ_GIT_SSH_KEY=${IQ_GIT_SSH_KEY:-"${HOME}/.ssh/id_rsa"};
IQ_GIT_SSH_PASS=${IQ_GIT_SSH_PASS:-""};
TEST=${TEST:-0}
JENKINS=${JENKINS:-""};
NPM_RUN=${NPM_RUN:-"build-prd"}

# test related
BROWSERSTACK_USERNAME=${BROWSERSTACK_USERNAME:-""}
BROWSERSTACK_ACCESSKEY=${BROWSERSTACK_ACCESSKEY:-""}
E2E_USER_EMAIL=${E2E_USER_EMAIL:-""}
E2E_USER_PASSWORD=${E2E_USER_PASSWORD:-""}
PHANTOMJS_BIN=${PHANTOMJS_BIN:-""}

# set directory
DIR=$ROOT;
if [[ "$JENKINS" ]]; then DIR=$IQ_HOST_ROOT/$PROJECT/workspace; fi

PWD=`pwd`
cd $ROOT
TAG=${TAG:-"latest"};

# build the build container
docker build -t web/$PROJECT-build:$TAG -f $ROOT/docker/build/Dockerfile $ROOT

# execute the build container to generate the app
ti="-ti";
if [[ "$JENKINS" ]]; then ti=""; fi

docker run \
    $ti \
    --rm \
    -v $DIR:/opt/$PROJECT \
    -v $IQ_GIT_SSH_KEY:/root/.ssh/id_rsa:ro \
    -e IQ_GIT_SSH_PASS=$IQ_GIT_SSH_PASS \
    -e PROJECT=$PROJECT \
    -e TEST=$TEST \
    -e BROWSERSTACK_USERNAME=$BROWSERSTACK_USERNAME \
    -e BROWSERSTACK_ACCESSKEY=$BROWSERSTACK_ACCESSKEY \
    -e E2E_USER_EMAIL=$E2E_USER_EMAIL \
    -e PHANTOMJS_BIN=$PHANTOMJS_BIN \
    -e NPM_RUN=$NPM_RUN \
    web/$PROJECT-build:$TAG

if [[ `uname` == "Darwin" ]]; then
    tar --exclude=project.tgz \
        --exclude=cookbooks \
        --exclude=docker \
        --exclude=node_modules \
        --exclude=src \
        --exclude=test \
        --exclude=tools \
        --exclude '.*' \
        --exclude 'project.tgz' \
        -c -z -f project.tgz ./*
else
    tar -c -z --exclude=project.tgz \
        --exclude=cookbooks \
        --exclude=docker \
        --exclude=node_modules \
        --exclude=src \
        --exclude=test \
        --exclude=tools \
        --exclude='.[^/]*' \
	-f project.tgz ./*
fi

# build the distribution container
docker build -t web/$PROJECT:$TAG -f $ROOT/docker/dist/Dockerfile $ROOT

# remove archive
rm project.tgz

cd $PWD

