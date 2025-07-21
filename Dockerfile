

# Etapa 1: Compilación Angular
FROM node:22.12.0 AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build --prod


# Etapa 2: Producción con Nginx
FROM nginx:stable-alpine

# Borra configuración default
RUN rm -rf /usr/share/nginx/html/*

# Copia la app compilada al folder de nginx
COPY --from=builder /app/dist/StrongfitPlus /usr/share/nginx/html


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]