#STEP1
FROM tiangolo/node-frontend:10 AS build
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build

#STEP2
FROM nginx:1.15
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]