# Imagen base oficial de Node.js para la etapa de construcción
FROM node:18 AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación Next.js
RUN npm run build

# Imagen ligera de Node.js para servir en producción
FROM node:18

# Establecer el directorio de trabajo para la imagen final
WORKDIR /app

# Copiar solo los artefactos necesarios desde la etapa anterior
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# Exponer el puerto que usa Next.js
EXPOSE 3000

# Comando para correr la aplicación en producción
CMD ["npm", "run", "dev"]
