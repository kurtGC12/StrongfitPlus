

# Etapa 1: Compilación Angular
# Utiliza una imagen de Node.js para compilar la aplicación Angular
FROM node:22.12.0 AS builder

WORKDIR /app

COPY package.json ./

RUN npm install


COPY . .

RUN npm run build 


# Etapa 2: Producción con Nginx 
# Utiliza una imagen de Nginx para servir la aplicación compilada
FROM nginx:alpine

COPY --from=builder /app/dist/StrongfitPlus /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]