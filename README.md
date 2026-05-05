# Cheshire

API Backend para gestión deClub de Golf.

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
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/cheshire
JWT_SECRET=tu_secreto_aqui
NODE_ENV=development
```

---

## Documentación de la API

### Autenticación

Todos los endpoints (excepto registro y login) requieren header:
```
Authorization: Bearer <token>
```

### Endpoints

#### Usuarios

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/usuarios/registro` | Registrar nuevo usuario | No |
| POST | `/api/usuarios/login` | Iniciar sesión | No |
| GET | `/api/usuarios/perfil/:id` | Obtener perfil | Sí |

#### Campos

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/campos/lista?ordenar=asc\|desc` | Listar campos | Sí |
| POST | `/api/campos/nuevo` | Crear campo | Sí (Admin) |

#### Reservas

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/reservas/crear` | Crear reserva | Sí |
| GET | `/api/reservas/usuario/:usuarioId?ordenar=asc\|desc` | Mis reservas | Sí |
| DELETE | `/api/reservas/cancelar/:id` | Cancelar reserva | Sí |

#### Resultados

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/resultados/guardar` | Guardar tarjeta | Sí |
| GET | `/api/resultados/historial/:usuarioId?ordenar=asc\|desc` | Ver historial | Sí |

---

## Ordenamiento

Los endpoints de listado soportan parámetro `ordenar`:
- `ordenar=asc` - Orden ascendente
- `ordenar=desc` - Orden descendente
- Por defecto: descendente

---

## Tecnologías

- Express.js
- MongoDB + Mongoose
- JWT + bcryptjs