FROM phusion/baseimage:0.9.18

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /opt

COPY docker/dist/nginx/iq-customer-tool-frontend.conf iq-customer-tool-frontend.conf
COPY project.tgz project.tgz
COPY docker/dist/sbin /sbin
RUN chmod +x /sbin/entrypoint.sh

ENTRYPOINT ["/sbin/entrypoint.sh"]