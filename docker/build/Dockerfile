FROM phusion/baseimage:0.9.18

# apt
RUN \
    apt-add-repository ppa:brightbox/ruby-ng \
    && curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -

# utility
RUN apt-get install -yqq curl tar git expect

# ruby
RUN \
    apt-get install -yqq ruby2.3 ruby2.3-dev \
    && gem install --pre sass-css-importer \
    && gem install sass
    
# node & phantomjs dep
RUN \
    apt-get install -yqq nodejs libfontconfig \
    && npm install -g npm@3 \
    && npm cache clear \
    && npm install -g phantomjs-prebuilt \
    && npm config set registry "http://registry.npmjs.org/" \
    && ssh-keyscan -H github.com > /etc/ssh/ssh_known_hosts \
    && apt-get autoremove \
    && apt-get autoclean 
    
ENV DEBIAN_FRONTEND=noninteractive
COPY docker/build/sbin /sbin
RUN chmod +x /sbin/entrypoint.sh /sbin/ssh-add-pass.sh
ENTRYPOINT ["/sbin/entrypoint.sh"]