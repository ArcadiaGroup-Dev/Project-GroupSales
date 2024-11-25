# 1. Usar una imagen base para Node.js para construir el proyecto
FROM node:18 AS builder

# 2. Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# 3. Copiar los archivos necesarios para la instalación de dependencias
COPY package*.json ./

# 4. Instalar las dependencias
RUN npm install

# 5. Copiar el resto de los archivos del proyecto
COPY . .

# 6. Construir la aplicación (output estará en la carpeta /app/out o /app/build)
RUN npm run build


# 9. Exponer el puerto en el contenedor
EXPOSE 3001

# 10. Iniciar nginx (ya lo hace por defecto en esta imagen)
CMD ["npm", "run", "dev"]
