FROM node:14 as build
WORKDIR /app
COPY package*.json ./
ENV REACT_APP_ENVIRONMENT=production
RUN npm install
RUN npm install react-scripts -g
COPY . .
RUN npm run build


FROM nginx:1.21.5-alpine
WORKDIR /usr/share/nginx/html
#COPY  nginx.conf /etc/nginx/templates/
COPY  nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

