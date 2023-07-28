FROM nginx:1.25.1-alpine3.17

# Copy the nginx default configuration file
RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80