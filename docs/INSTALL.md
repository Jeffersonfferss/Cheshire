# Guía de Instalación - Cheshire

Este documento describe los pasos necesarios para instalar y ejecutar la aplicación Cheshire en un entorno local.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** versión 18.x o superior
- **npm** versión 9.x o superior  
- **MongoDB** versión 6.x o superior (opcional si usas Docker)
- **Docker Desktop** (opcional, recomendado para usuarios novatos)

Para verificar las versiones instaladas, ejecuta:

```bash
node --version    # Debe mostrar v18.x.x o superior
npm --version     # Debe mostrar 9.x.x o superior
docker --version # Opcional
```

---

## Método 1: Instalación con Docker (Recomendado)

Esta es la forma más sencilla de poner en marcha el proyecto, ya que MongoDB se configura automáticamente.

### Paso 1: Verificar Docker

Asegúrate de que Docker Desktop esté ejecutándose:

```bash
docker --version
docker-compose --version
```

### Paso 2: Clonar o Descargar el Proyecto

```bash
# Si tienes el código fuente
cd ruta/del/proyecto/Cheshire
```

### Paso 3: Iniciar los Contenedores

```bash
# Construir y ejecutar los servicios
docker-compose up -d
```

Este comando creará ystartará dos contenedores:
- `cheshire-app`: La aplicación Node.js en el puerto 3000
- `cheshire-mongo`: La base de datos MongoDB en el puerto 27017

### Paso 4: Verificar el Estado

```bash
# Ver contenedores en ejecución
docker ps

# Ver logs de la aplicación
docker logs cheshire-app
```

Deberías ver un mensaje similar a:

```
✓ Conectado a MongoDB: mongo
✓ Base de datos conectada
✓ Servidor de Golf listo en http://localhost:3000
```

### Paso 5: Acceder a la Aplicación

Abre tu navegador y visita: **http://localhost:3000**

---

## Método 2: Instalación Local (Sin Docker)

Si prefieres ejecutar la aplicación directamente en tu máquina, sigue estos pasos.

### Paso 1: Instalar Node.js

Descarga e instala Node.js desde: https://nodejs.org/

### Paso 2: Instalar MongoDB

**Windows:**
1. Descarga MongoDB Community Server desde https://www.mongodb.com/try/download/community
2. Ejecuta el instalador siguiendo los pasos del asistente
3. Crea la carpeta `C:\data\db` (directorio por defecto de MongoDB)

**macOS:**
```bash
# Con Homebrew
brew tap mongodb/brew
brew install mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo apt update
sudo apt install mongodb
```

### Paso 3: Iniciar MongoDB

```bash
# En una terminal separada
mongod
```

### Paso 4: Configurar el Proyecto

```bash
# Navega al directorio del proyecto
cd Cheshire

# Instala las dependencias
npm install
```

### Paso 5: Configurar Variables de Entorno

Copia el archivo de ejemplo y configúralo:

```bash
# Copiar archivo de ejemplo
cp .env.example .env
```

Edita el archivo `.env` y asegúrate de que contenga:

```env
PORT=3000
MONGODB_URI=mongodb://admin:golfpassword123@localhost:27017/cheshire?authSource=admin
JWT_SECRET=cheshire_jwt_secret_key_2026
NODE_ENV=development
```

### Paso 6: Ejecutar la Aplicación

```bash
# Modo desarrollo (con reinicio automático)
npm run dev

# O modo producción
npm start
```

Deberías ver:

```
✓ Conectado a MongoDB: localhost
✓ Base de datos conectada
✓ Servidor de Golf listo en http://localhost:3000
```

---

## Verificación de la Instalación

### 1. Probar la Página Principal

Abre http://localhost:3000 en tu navegador. Deberías ver la página de login.

### 2. Probar el Login

Usa las credenciales de prueba:

- **Email:** admin@cheshire.com
- **Contraseña:** admin123

### 3. Verificar la API

```bash
# Test de login
curl -X POST http://localhost:3000/api/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@cheshire.com","password":"admin123"}'
```

Deberías recibir una respuesta con un token JWT.

---

## Comandos Útiles

### Docker

```bash
# Iniciar servicios
docker-compose up -d

# Detener servicios
docker-compose down

# Reiniciar servicios
docker-compose restart

# Ver logs
docker logs -f cheshire-app

# Eliminar datos (reset completo)
docker-compose down -v
```

### npm

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Ejecutar en producción
npm start

# Ver dependencias instaladas
npm list
```

---

## Solución de Problemas

### "Connection refused" al conectar a MongoDB

Asegúrate de que MongoDB esté ejecutándose:

```bash
# En otra terminal
mongod
```

### Puerto 3000 en uso

Cambia el puerto en el archivo `.env`:

```env
PORT=3001
```

### Error de autenticación en MongoDB

Verifica que las credenciales en `MONGODB_URI` sean correctas:

```
mongodb://admin:golfpassword123@localhost:27017/cheshire?authSource=admin
```

---

## Estructura de la Base de Datos

La aplicación crea automáticamente las siguientes colecciones en MongoDB:

- **usuarios**: Jugadores y administradores registrados
- **campos**: Campos de golf disponibles
- **reservas**: Reservas de tee times
- **resultados**: Puntuaciones de partidas

---

## Documentación Adicional

- [README.md](../README.md) - Descripción general del proyecto
- [API Endpoints](./API.md) - Documentación completa de la API REST

---

**¿Necesitas ayuda?** Si tienes problemas, verifica que todos los requisitos estén instalados y que los servicios estén ejecutándose correctamente.
