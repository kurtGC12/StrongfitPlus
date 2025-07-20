

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
FROM node:22.12.0 AS production

WORKDIR /app

COPY --from=builder /app/dist/StrongfitPlus /app/dist/StrongfitPlus-angular
COPY --from=builder /app/dist /app/node_modules

EXPOSE 8080

CMD ["node", "-g","dist/StrongfitPlus/serve/serve.mjs","daemon off;"]