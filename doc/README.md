#  Cheshire - Club de Golf

API Backend para gestión integral de Club de Golf.

> *"Donde el tiempo te pertenece"*

---

## Tabla de Contenidos

1. [Descripción](#descripción)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Requisitos Previos](#requisitos-previos)
4. [Instalación](#instalación)
5. [Configuración](#configuración)
6. [Ejecución](#ejecución)
7. [Docker](#docker)
8. [Modelos de Datos](#modelos-de-datos)
9. [API Endpoints](#api-endpoints)
10. [Ejemplos de Uso](#ejemplos-de-uso)
11. [Códigos de Error](#códigos-de-error)
12. [Autenticación](#autenticación)
13. [Capturas de Pantalla](#capturas-de-pantalla)
14. [Tecnologías](#tecnologías)

---

##  Descripción

Cheshire es una aplicación web para gestiona un club de golf, permitiendo:

- ✅ Registro e inicio de sesión de usuarios
- ✅ Gestión de campos de golf
- ✅ Reservas de partidas
- ✅ Seguimiento de resultados y handicap
- ✅ Panel de administración

---

##  Estructura del Proyecto

```
Cheshire/
├── src/
│   ├── app.js                    # Punto de entrada
│   ├── Controllers/             # Controladores
│   │   ├── usuarioController.js
│   │   ├── campoController.js
│   │   ├── reservaController.js
│   │   └── resultadoController.js
│   ├── Models/                 # Modelos Mongoose
│   │   ├── Usuario.js
│   │   ├── Campo.js
│   │   ├── Reserva.js
│   │   └── Resultado.js
│   ├── Routes/                 # Rutas API
│   │   ├── rutas.js
│   │   ├── usuarioRoutes.js
│   │   ├── campoRoutes.js
│   │   ├── reservaRoutes.js
│   │   └── resultadoRoutes.js
│   ├── Middleware/
│   │   └── auth.js             # JWT Auth
│   ├── Services/               # Lógica de negocio
│   │   ├── UsuarioServices.js
│   │   ├── CampoServices.js
│   │   └── ReservasServices.js
│   └── db/
│       └── database.js         # Conexión MongoDB
├── public/                    # Archivos estáticos
│   ├── js/app.js             # Frontend JS
│   └── css/styles.css         # Estilos
├── views/                    # Vistas HTML
│   ├── index.html           # Login/Registro
│   └── dashboard.html       # Dashboard
├── docker-compose.yml        # Orquestación Docker
├── Dockerfile              # Imagen Docker
├── .env                  # Variables de entorno
├── package.json          # Dependencias npm
└── seed.js              # Datos iniciales
```

---

##  Requisitos Previos

| Requisito | Versión Mínima |
|-----------|----------------|
| Node.js   | 18.x           |
| MongoDB  | 6.0            |
| Docker   | Latest (opcional)|
| npm      | 9.x            |

---

##  Instalación

### Opción 1: Local (sin Docker)

```bash
# 1. Entrar al directorio
cd Cheshire

# 2. Instalar dependencias
npm install

# 3. Verificar instalación
npm list --depth=0
```

### Opción 2: Docker (Recomendado)

```bash
# 1. Construir imagenes
docker compose build

# 2. Iniciar servicios
docker compose up -d

# 3. Verificar estado
docker ps

# 4. Ver logs
docker logs -f cheshire-app
```

---

##  Configuración

### Variables de Entorno (.env)

```env
# SERVIDOR
PORT=3000

# MONGODB (Docker)
MONGODB_URI=mongodb://admin:golfpassword123@mongo:27017/cheshire?authSource=admin

# MONGODB (Local)
# MONGODB_URI=mongodb://localhost:27017/cheshire


# AUTENTICACIÓN JWT
JWT_SECRET=cheshire_jwt_secret_key_2026


# ENTORNO
NODE_ENV=development
```

### MongoDB con Docker

| Variable      | Valor por Defecto |
|---------------|-------------------|
| Usuario root  | admin             |
| Contraseña    | golfpassword123   |
| Base de datos | cheshire          |
| Puerto        | 27017             |
| Host interno  | mongo             |

---

##  Ejecución

### Desarrollo

```bash
# Con nodemon (reinicio automático en cambios)
npm run dev
```

Salida esperada:
```
> cheshire@1.0.0 dev
> nodemon src/app.js

[nodemon] 3.1.14
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*, *.js, *.mjs, *.cjs, *.json
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node src/app.js`
 Intentando conectar a MongoDB...
 ✓ Conectado a MongoDB: mongo
 ✓ Base de datos conectada
 ✓ Servidor de Golf listo en http://localhost:3000
```

### Producción

```bash
npm start
```

---

##  Docker

### Servicios

| Contenedor      | Imagen          | Puerto | Descripción           |
|-----------------|-----------------|--------|-----------------------|
| cheshire-app    | cheshire:latest | 3000   | API Backend           |
| cheshire-mongo  | mongo:latest    | 27017  | Base de datos MongoDB |

### Comandos Útiles

```bash
# Iniciar servicios (background)
docker compose up -d

# Iniciar con rebuild
docker compose up -d --build

# Ver logs en tiempo real
docker logs -f cheshire-app    # App
docker logs -f cheshire-mongo  # MongoDB

# Detener servicios
docker compose down

# Eliminar volúmenes (reset completo)
docker compose down -v

# Reiniciar contenedores
docker compose restart

# Ver estado de contenedores
docker compose ps

# Acceder a contenedor app
docker exec -it cheshire-app sh

# Acceder a MongoDB
docker exec -it cheshire-mongo mongosh -u admin -p golfpassword123 --authenticationDatabase admin
```

###Puertos Expuestos

```
┌───────────────────┬──────────────────┐
│   Servicio        │     Puerto       │
├───────────────────┼──────────────────┤
│  cheshire-app     │  localhost:3000  │
│  cheshire-mongo   │  localhost:27017 │
└───────────────────┴──────────────────┘
```

---

##  Modelos de Datos

### Usuario (`Usuario.js`)

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true,
        trim: true
    },
    password: { 
        type: String, 
        required: true 
    },
    rol: { 
        type: String, 
        enum: ['admin', 'jugador'], 
        default: 'jugador' 
    },
    handicap: { 
        type: Number, 
        default: 36.0,
        min: 0,
        max: 54
    }
}, { 
    timestamps: true 
});

// Hash automático de contraseña
UsuarioSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

// Método para comparar contraseñas
UsuarioSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Usuario', UsuarioSchema);
```

**Ejemplo de documento:**
```json
{
    "_id": "69f89d2355ed716ddc7a5369",
    "nombre": "Juan Pérez",
    "email": "juan@test.com",
    "password": "$2a$10$BFaGkndzmQpf8Lc/q9yAhut099v1SwHctSJs53/62iTHhqO47YztW",
    "rol": "jugador",
    "handicap": 18,
    "createdAt": "2026-05-04T13:20:35.068Z",
    "updatedAt": "2026-05-04T13:20:35.068Z",
    "__v": 0
}
```

---

### Campo (`Campo.js`)

```javascript
const mongoose = require('mongoose');

const CampoSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: true 
    },
    ubicacion: { 
        type: String,
        required: true 
    },
    hoyos: { 
        type: Number, 
        enum: [9, 18], 
        default: 18 
    },
    pares: [{ 
        type: Number 
    }],
    dificultad: { 
        type: Number, 
        min: 1, 
        max: 5, 
        default: 3 
    },
    imagen: String,
    descripcion: String
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Campo', CampoSchema);
```

---

### Reserva (`Reserva.js`)

```javascript
const mongoose = require('mongoose');

const ReservaSchema = new mongoose.Schema({
    usuario: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: true 
    },
    campo: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Campo', 
        required: true 
    },
    fecha: { 
        type: Date, 
        required: true 
    },
    hora: { 
        type: String, 
        required: true 
    },
    hoyos: { 
        type: Number, 
        enum: [9, 18], 
        default: 18 
    },
    estado: { 
        type: String, 
        enum: ['confirmada', 'cancelada', 'completada'], 
        default: 'confirmada' 
    },
    precio: Number
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Reserva', ReservaSchema);
```

---

### Resultado (`Resultado.js`)

```javascript
const mongoose = require('mongoose');

const ResultadoSchema = new mongoose.Schema({
    usuario: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: true 
    },
    campo: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Campo', 
        required: true 
    },
    fecha: { 
        type: Date, 
        required: true 
    },
    puntuacion: { 
        type: Number, 
        required: true 
    },
    pares: [{ 
        type: Number 
    }],
    diferencial: Number,
    nuevoHandicap: Number
}, { 
    timestamps: true 
});

// Método para calcular handicap
ResultadoSchema.methods.calculaHandicap = function() {
    // Fórmula de cálculo de handicap
    const HandicapActual = this.usuario?.handicap || 36;
    const diferencial = (this.puntuacion - this.campo.par) * 113 / this.campo.dificultad;
    this.diferencial = diferencial;
    this.nuevoHandicap = HandicapActual - (diferencial - 0.5) * 0.1;
    return this.nuevoHandicap;
};

module.exports = mongoose.model('Resultado', ResultadoSchema);
```

---

##  API Endpoints

### Autenticación (Públicos - Sin Token)

#### 1. Registrar Usuario

```http
POST /api/usuarios/registro
Content-Type: application/json
```

**Request Body:**
```json
{
    "nombre": "Juan Pérez",
    "email": "juan@test.com",
    "password": "123456",
    "handicap": 18
}
```

**Campos obligatorios:** `nombre`, `email`, `password`  
**Campos opcionales:** `handicap` (default: 36)

**Respuesta exitosa (201):**
```json
{
    "mensaje": "Usuario creado con éxito",
    "usuario": {
        "_id": "69f89d2355ed716ddc7a5369",
        "nombre": "Juan Pérez",
        "email": "juan@test.com",
        "password": "$2a$10$BFaGkndzmQpf8Lc/q9yAhut099v1SwHctSJs53/62iTHhqO47YztW",
        "rol": "jugador",
        "handicap": 18,
        "createdAt": "2026-05-04T13:20:35.068Z",
        "updatedAt": "2026-05-04T13:20:35.068Z",
        "__v": 0
    }
}
```

**Errores posibles:**
- 400: "El correo ya está registrado"
- 500: "Error al registrar usuario"

---

#### 2. Iniciar Sesión (Login)

```http
POST /api/usuarios/login
Content-Type: application/json
```

**Request Body:**
```json
{
    "email": "juan@test.com",
    "password": "123456"
}
```

**Respuesta exitosa (200):**
```json
{
    "mensaje": "Login exitoso",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5Zjg5ZDIzNTVlZDcxNmRkYzdhNTM2OSIsInJvbCI6Imp1Z2Fkb3IiLCJpYXQiOjE3Nzc5MDA4MzgsImV4cCI6MTc3ODUwNTYzOH0._HaZ7bhovESMMJKGw3o2ZbkSow0BugVFwro0MrKfUBI",
    "usuario": {
        "_id": "69f89d2355ed716ddc7a5369",
        "nombre": "Juan Pérez",
        "email": "juan@test.com",
        "rol": "jugador",
        "handicap": 18
    }
}
```

**Errores posibles:**
- 400: "Email y contraseña son requeridos"
- 401: "Credenciales inválidas"

**Nota:** El `token` debe guardarse en `localStorage` y enviarse en el header de requests posteriores.

---

### Usuarios (Requiere Token)

#### 3. Obtener Perfil

```http
GET /api/usuarios/perfil/:id
Authorization: Bearer <token>
```

**Respuesta (200):**
```json
{
    "_id": "69f89d2355ed716ddc7a5369",
    "nombre": "Juan Pérez",
    "email": "juan@test.com",
    "rol": "jugador",
    "handicap": 18,
    "createdAt": "2026-05-04T13:20:35.068Z",
    "updatedAt": "2026-05-04T13:20:35.068Z"
}
```

---

#### 4. Listar Usuarios

```http
GET /api/usuarios
Authorization: Bearer <token>
```

**Respuesta (200):**
```json
[
    {
        "_id": "69f89d2355ed716ddc7a5369",
        "nombre": "Juan Pérez",
        "email": "juan@test.com",
        "rol": "admin",
        "handicap": 12,
        "createdAt": "2026-05-04T13:20:35.068Z"
    },
    {
        "_id": "69f89d2355ed716ddc7a5370",
        "nombre": "María García",
        "email": "maria@test.com",
        "rol": "jugador",
        "handicap": 24,
        "createdAt": "2026-05-04T13:25:00.000Z"
    }
]
```

---

#### 5. Eliminar Usuario (Solo Admin)

```http
DELETE /api/usuarios/:id
Authorization: Bearer <token>
```

**Respuesta (200):**
```json
{
    "mensaje": "Usuario eliminado"
}
```

---

### Campos (Requiere Token)

#### 6. Listar Campos

```http
GET /api/campos/lista?ordenar=desc
Authorization: Bearer <token>
```

**Parámetros query:**
- `ordenar` (opcional): `asc` | `default: desc`

**Respuesta (200):**
```json
[
    {
        "_id": "69f89d2355ed716ddc7a5371",
        "nombre": "Club de Golf Madrid",
        "ubicacion": "Madrid, España",
        "hoyos": 18,
        "pares": [4, 5, 4, 4, 3, 5, 4, 3, 4, 4, 5, 4, 3, 5, 4, 3, 4, 5],
        "dificultad": 4,
        "imagen": "/images/campos/madrid.jpg",
        "descripcion": "Campo de 18 hoyos en el centro de Madrid",
        "createdAt": "2026-05-01T10:00:00.000Z"
    }
]
```

---

#### 7. Crear Campo (Solo Admin)

```http
POST /api/campos/nuevo
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
    "nombre": "Club de Golf Valencia",
    "ubicacion": "Valencia, España",
    "hoyos": 18,
    "pares": [4, 5, 4, 3, 4, 5, 4, 3, 4, 4, 5, 4, 3, 5, 4, 3, 4, 5],
    "dificultad": 3,
    "descripcion": "campo杆"
}
```

---

### Reservas (Requiere Token)

#### 8. Crear Reserva

```http
POST /api/reservas
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
    "usuario": "69f89d2355ed716ddc7a5369",
    "campo": "69f89d2355ed716ddc7a5371",
    "fecha": "2026-06-15T10:00:00.000Z",
    "hora": "10:00",
    "hoyos": 18
}
```

---

#### 9. Mis Reservas

```http
GET /api/reservas/usuario/:usuarioId?ordenar=desc
Authorization: Bearer <token>
```

---

#### 10. Cancelar Reserva

```http
DELETE /api/reservas/:id
Authorization: Bearer <token>
```

---

### Resultados (Requiere Token)

#### 11. Guardar Tarjeta de Resultados

```http
POST /api/resultados
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
    "usuario": "69f89d2355ed716ddc7a5369",
    "campo": "69f89d2355ed716ddc7a5371",
    "fecha": "2026-06-15T10:00:00.000Z",
    "puntuacion": 85,
    "pares": [4, 5, 4, 4, 3, 5, 4, 3, 5, 4, 5, 4, 3, 5, 4, 4, 4, 5]
}
```

---

#### 12. Mi Historial

```http
GET /api/resultados/usuario/:usuarioId?ordenar=desc
Authorization: Bearer <token>
```

---

##  Ejemplos de Uso

### cURL

```bash
# 1. Registrar usuario
curl -X POST http://localhost:3000/api/usuarios/registro \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan Pérez","email":"juan@test.com","password":"123456","handicap":18}'

# 2. Iniciar sesión (guardar token)
TOKEN=$(curl -s -X POST http://localhost:3000/api/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{"email":"juan@test.com","password":"123456"}' | jq -r '.token')

# 3. Listar campos con token
curl -X GET http://localhost:3000/api/campos/lista \
  -H "Authorization: Bearer $TOKEN"

# 4. Crear reserva
curl -X POST http://localhost:3000/api/reservas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"usuario":"ID_USUARIO","campo":"ID_CAMPO","fecha":"2026-06-15T10:00:00.000Z","hora":"10:00","hoyos":18}'
```

### JavaScript (Frontend)

```javascript
// Registro
const registrarUsuario = async () => {
    const response = await fetch('http://localhost:3000/api/usuarios/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nombre: 'Juan Pérez',
            email: 'juan@test.com',
            password: '123456',
            handicap: 18
        })
    });
    const data = await response.json();
    console.log(data);
};

// Login
const iniciarSesion = async () => {
    const response = await fetch('http://localhost:3000/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: 'juan@test.com',
            password: '123456'
        })
    });
    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data.token;
};

// Obtener datos con token
const obtenerCampos = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/api/campos/lista', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return await response.json();
};
```

---

## ❌ Códigos de Error

### Códigos HTTP

| Código | Significado           |
|--------|-----------------------|
| 200    | OK                    |
| 201    | Created               |
| 400    | Bad Request           |
| 401    | Unauthorized          |
| 403    | Forbidden             |
| 404    | Not Found             |
| 500    | Internal Server Error |

### Errores de la API

| Código | Mensaje                                             | Causa                       |
|--------|-----------------------------------------------------|-----------------------------|
| 400    | "El correo ya está registrado"                      | Email duplicado             |
| 400    | "Email y contraseña son requeridos"                 | Campos vacíos               |
| 401    | "Token no proporcionado"                            | Sin header Authorization    |
| 401    | "Token inválido"                                    | Token expirado o incorrecto |
| 401    | "Credenciales inválidas"                            | Email/password incorrectos  |
| 401    | "Usuario no encontrado"                             |  ID de usuario no existe    |
| 403    | "Acceso denegado. Se requiere rol de administrador" | No es admin                 |
| 404    | "Usuario no encontrado"                             | ID no existe                |
| 500    | "Error al registrar usuario"                        | Error interno               |

### Manejo de Errores en Frontend

```javascript
try {
    const data = await api.auth.register(userData);
    showMessage('Cuenta creada con éxito', 'success');
} catch (err) {
    if (err.message.includes('registrado')) {
        showMessage('El email ya está en uso');
    } else {
        showMessage('Error al registrar: ' + err.message);
    }
}
```

---

##  Autenticación

### Flujo Completo

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Usuario    │     │    API       │     │  MongoDB     │
│  registra    │────▶│  recibe      │────▶│   guarda     │
│              │     │  datos       │     │  usuario     │
└──────────────┘     └──────────────┘     └──────────────┘

┌──────────────┐     ┌──────────────┐     ┌────────────┐
│   Usuario    │     │    API       │     │  MongoDB   │
│   login      │────▶│  verifica    │────▶│  busca     │
│              │     │  credenc.    │     │  usuario   │
│              │◀────│  retorna     │◀────│  retorna   │
│              │     │   token      │     │  usuario   │
└──────────────┘     └──────────────┘     └────────────┘
```

### Header Authorization

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Verificar Token (Middleware)

```javascript
const verificarToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ mensaje: 'Token no proporcionado' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usuario = await Usuario.findById(decoded.id).select('-password');
        
        if (!usuario) {
            return res.status(401).json({ mensaje: 'Usuario no encontrado' });
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        return res.status(401).json({ mensaje: 'Token inválido' });
    }
};
```

---
##  Capturas de Pantalla
### Página Principal

```
┌─────────────────────────────────────────────────────────┐
│  🏌️ CHESHIRE                    [Login] [Registro]      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                BIENVENIDO A CHESHIRE                    │
│                                                         │
│        "Donde el tiempo te pertenece"                   │
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│  │             │  │             │  │             │      │
│  │Reservas     │  │Seguimiento  │  │  Torneos    │      │
│  │Online       │  │ de juego    │  │             │      │
│  └─────────────┘  └─────────────┘  └─────────────┘      │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────────────┐                               │
│  │   🔐 INICIAR SESIÓN  │                               │
│  │ Email    [________]  │                               │
│  │ Pass     [________]  │                               │
│  │    [ENTRAR]       │                                  │
│  │ ¿No tienes cuenta? │                                 │
│  │   Regístrate     │                                   │
│  └──────────────────────┘                               │
├─────────────────────────────────────────────────────────┤
│  © 2026 Club de Golf Cheshire                           │
└─────────────────────────────────────────────────────────┘
```

### Dashboard

``
┌─────────  ────────────────────────────────────────────┐
│   CHESHIRE    Hola, Juan Pérez    [Cerrar Sesión]     │
├───────────────────────────────────────────────────────┤
│  [ Inicio] [  Reservas] [ Resultados] []              │
├───────────────────────────────────────────────────────┤
│                                                       │
│  ┌─────────────────┐  ┌─────────────────┐             │
│  │  HANDICAP       │  │  PRÓXIMA        │             │
│  │    18.0         │  │  Reserva        │             │
│  │                 │  │  15/06/2026     │             │
│  └─────────────────┘  └─────────────────┘             │
│                                                       │
│  ┌──────────────────────────────────────────────┐     │
│  │  MIS ÚLTIMOS RESULTADOS                      │     │
│  │ ───────────────────────────────────────────  │     │
│  │  Club Madrid    85  15/06/2026    -5         │     │
│  │  Club Valencia  92  10/06/2026    +2         │     │
│  │  Club Barcelona 88  05/06/2026    -1         │     │
│  └──────────────────────────────────────────────┘     │
│                                                       │
└───────────────────────────────────────────────────────┘
```

---

## 🛠️ Tecnologías

| Tecnología | Versión | Propósito          |
|------------|--------|---------------------|
| Node.js    | 23.x   | Runtime JavaScript  |
| Express.js | 5.x    | Framework web       |
| Mongoose   | 9.x    | ODM MongoDB         |
| MongoDB    | latest | Base de datos       |
| JWT        | 9.x    | JSON Web Tokens     |
| bcryptjs   | 2.x    | Hash de contraseñas |
| nodemon    | 3.x    | Desarrollo (watch)  |
| Docker     | latest | Contenedores        |

---

##  Scripts npm

| Script | Comando       | Descripción            |
|--------|---------------|------------------------|
| dev    | `npm run dev` | Desarrollo con nodemon |
| start  | `npm start`   | Producción             |
| test   | `npm test`    | Tests (no configurado) |

---

## 📞 Soporte

Para errores o sugerencias:
- Crear un issue en GitHub
- Email: info@cheshire-golf.com

---

*<div align="center"> Cheshire - Donde el tiempo te pertenece</div>*