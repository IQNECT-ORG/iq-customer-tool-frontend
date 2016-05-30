#!/bin/bash
set -euo pipefail

eval $(ssh-agent)

# if password is provided, key has to be unlocked, use expect for it
# otherwise simply add the ssh key

if [[ $IQ_GIT_SSH_PASS ]]; then
    /sbin/ssh-add-pass.sh /root/.ssh/id_rsa $IQ_GIT_SSH_PASS
else
    ssh-add
fi

cd /opt/$PROJECT
npm install
npm run build-prd

# if test is set, run tests
if [[ $TEST ]]; then
    echo "Test test test ..."
    # npm test
fi