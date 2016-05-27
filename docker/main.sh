#!/bin/bash
set -euox pipefail

PROJECT=${PROJECT:-"iq-customer-tool-frontend"}
ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )"/.. && pwd )"
IQ_GIT_SSH_KEY=${IQ_GIT_SSH_KEY:-"${HOME}/.ssh/id_rsa"};
IQ_GIT_SSH_PASS=${IQ_GIT_SSH_PASS:-""};
JENKINS=${JENKINS:-""};

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
    -v $ROOT:/opt/$PROJECT \
    -v $IQ_GIT_SSH_KEY:/root/.ssh/id_rsa:ro \
    -e IQ_GIT_SSH_PASS=$IQ_GIT_SSH_PASS \
    -e PROJECT=$PROJECT \
    web/$PROJECT-build:$TAG

tar cf project.tgz public

# build the distribution container
docker build -t web/$PROJECT:$TAG -f $ROOT/docker/dist/Dockerfile $ROOT

# remove archive
rm project.tgz

cd $PWD

