FROM nginx
COPY dist/ /usr/share/nginx/html/
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

#ADD nginx/default.conf /etc/nginx/conf.d/default.conf

#FROM registry.docker-cn.com/library/node:11.11.0
#
#WORKDIR /app
#COPY package.json /app/
#RUN npm install
#
#COPY . /app
#RUN npm run build
#
#
#FROM registry.docker-cn.com/library/nginx
#COPY --from=0 /app/dist /app
#COPY --from=0 /app/nginx.conf /etc/nginx/nginx.conf
