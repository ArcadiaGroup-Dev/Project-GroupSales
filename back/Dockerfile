# 1. Usar una imagen base de Node.js
FROM node:18

# 2. Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# 3. Copiar los archivos necesarios para la instalación de dependencias
COPY package*.json ./

# 4. Instalar dependencias, excluyendo las de desarrollo
RUN npm install 

# 5. Copiar el resto de los archivos del proyecto
COPY . .

# 6. Construir el proyecto
RUN npm run build

# 7. Exponer el puerto que utiliza la aplicación
EXPOSE 3000

# 8. Comando para iniciar la aplicación
CMD ["npm", "start"]
