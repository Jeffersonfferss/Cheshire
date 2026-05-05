# Cheshire - API de Gestión de Club de Golf

API Backend para la gestión completa de un club de golf. El nombre hace referencia al gato de Cheshire de Alicia en el país de las maravillas, simbolizando una presencia sutil que facilita cada movimiento del jugador.

## Características

- Gestión de usuarios con roles (admin/jugador)
- Sistema de reservas de tee times
- Registro de resultados y puntuaciones
- Control de handicap por jugador
- Interfaz web responsive

## Requisitos

- Node.js 18+
- MongoDB 6+
- Docker (opcional)

## Instalación

```bash
npm install
```

## Ejecución

```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## Configuración

Crear archivo `.env`:

```env
PORT=3000
MONGODB_URI=mongodb://admin:golfpassword123@mongo:27017/cheshire?authSource=admin
JWT_SECRET=cheshire_jwt_secret_key_2026
NODE_ENV=development
```

### Docker

```bash
docker-compose up -d
```

## Endpoints de la API

### Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/usuarios/registro` | Registrar nuevo usuario |
| POST | `/api/usuarios/login` | Iniciar sesión |

### Usuarios

| Método | Endpoint | Descripción | Rol |
|--------|----------|-------------|-----|
| GET | `/api/usuarios` | Listar usuarios | Admin |
| GET | `/api/usuarios/perfil/:id` | Ver perfil | Usuario |
| DELETE | `/api/usuarios/:id` | Eliminar usuario | Admin |

### Campos

| Método | Endpoint | Descripción | Rol |
|--------|----------|-------------|-----|
| GET | `/api/campos` | Listar campos | Usuario |
| GET | `/api/campos/:id` | Ver campo | Usuario |
| POST | `/api/campos/nuevo` | Crear campo | Admin |
| PUT | `/api/campos/:id` | Actualizar campo | Admin |
| DELETE | `/api/campos/:id` | Eliminar campo | Admin |

### Reservas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/reservas` | Crear reserva |
| GET | `/api/reservas` | Todas las reservas |
| GET | `/api/reservas/usuario/:id` | Mis reservas |
| GET | `/api/reservas/:id` | Ver reserva |
| PUT | `/api/reservas/:id` | Actualizar reserva |
| DELETE | `/api/reservas/:id` | Cancelar reserva |

### Resultados

| Método | Endpoint | Descripción | Rol |
|--------|----------|-------------|-----|
| POST | `/api/resultados` | Guardar tarjeta | Usuario |
| GET | `/api/resultados` | Todos los resultados | Admin |
| GET | `/api/resultados/usuario/:id` | Mi historial | Usuario |

## Parámetros de consulta

- `ordenar=asc|desc` - Ordenar resultados
- `anio=2026` - Filtrar por año
- `estado=confirmada|pendiente|cancelada` - Filtrar por estado

## Tecnologías

- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **MongoDB** - Base de datos
- **Mongoose** - ODM
- **JWT** - Autenticación
- **bcryptjs** - Hash de contraseñas
- **Docker** - Contenedores

## Credenciales de prueba

| Rol | Email | Contraseña |
|----|-------|------------|
| Admin | admin@cheshire.com | admin123 |
| Jugador | carlos@golf.com | admin123 |

## Estructura del proyecto

```
src/
├── app.js              # Punto de entrada
├── db/
│   └── database.js    # Conexión MongoDB
├── Models/             # Esquemas Mongoose
├── Controllers/       # Lógica de endpoints
├── Services/          # Lógica de negocio
├── Routes/            # Definición de rutas
└── Middleware/        # Autenticación JWT

views/                  # Frontend HTML
public/
├── css/styles.css    # Estilos
└── js/app.js          # JavaScript frontend
```

## Licencia

ISC