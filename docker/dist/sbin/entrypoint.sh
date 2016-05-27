#!/bin/bash
set -ex

WWW_USER=${WWW_USER:-33};
CONTAINER=$(cat /proc/self/cgroup | grep -o  -e "docker-.*.scope" | head -n 1 | sed "s/docker-\(.*\).scope/\\1/");
CONTAINER=${CONTAINER:-`cat /proc/self/cgroup | grep 'docker' | sed 's/^.*\///' | tail -n1`};
WEBROOT='/var/www/hosts';
NAME=iq-customer-tool-frontend;
DEPLOY=$WEBROOT/$NAME.$CONTAINER;
VHOST=$NAME.$CONTAINER;
CACHE=iq-cache

if [ -z "$DNS" ]; then
    echo "Missing env variables: \$DNS";
    exit 1;
fi

if [ ! -d "$WEBROOT" ]; then
    echo "Not hooked to webroot. Please provide an accessible volume.";
    exit 1;
fi

if [[ -d "$WEBROOT/$NAME" ]]; then
    echo "Detected source project already exists in webroot.";
    # volume injected, i.e. developer machine
    DEPLOY=$WEBROOT/$NAME;
fi

# nginx config update
sed -i -e s@'${DNS}'@"$DNS"@g $NAME.conf
sed -i -e s@'${CONTAINER}'@"$CONTAINER"@g $NAME.conf
sed -i -e s@'${DEPLOY}'@"$DEPLOY"@g $NAME.conf
sed -i -e s@'${CACHE}'@"$CACHE"@g $NAME.conf

# hook into nginx
# replace any matching dns in existing nginx vhosts to some bullshit so the webserver stops 
# routing to it upon a reload
find /etc/nginx/sites-enabled -type f -readable -writable -exec sed -i "s/$DNS/PIPE_TO_HELL/g" {} \ || true;
cp $NAME.conf /etc/nginx/sites-enabled/$VHOST.conf;
chmod 0711 /etc/nginx/sites-enabled/$VHOST.conf;

DEPLOYED=0
if [ ! -d "$DEPLOY" ]; then
    echo "Deploy '$DEPLOY' directory not found.'";
    echo "Untarring project to '$DEPLOY'";
    mkdir -p $DEPLOY $CACHE;
    tar xf $NAME.tgz -C $DEPLOY --strip-components=1;
    DEPLOYED=1;
    chown -R $WWW_USER:$WWW_USER $DEPLOY/build;
    chmod 0711 $DEPLOY/build;
fi

# handle container stop
sigterm() {
    rm /etc/nginx/sites-enabled/$VHOST.conf || true;
    # clean up if untared previously
    if [ "$DEPLOYED" == 1 ]; then
        rm -Rf $DEPLOY $CACHE;
    fi
    exit 15;
}

echo "Please run health check and reload nginx";

# setup handlers
# on callback, kill the last background process, which is `tail -f /dev/null` and execute the specified handler
trap 'kill ${!} || true; sigterm' SIGTERM SIGHUP SIGQUIT SIGKILL EXIT

# wait indefinitely
while true
do
  tail -f /dev/null & wait ${!}
done