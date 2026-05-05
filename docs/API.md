# API Reference - Cheshire

Referencia completa de los endpoints de la API REST de Cheshire.

## Autenticación

Todos los endpoints protegidos requieren un token JWT en el header de la petición:

```http
Authorization: Bearer <token>
```

## Endpoints Públicos

### Registrar Usuario

Registra un nuevo usuario en el sistema.

```http
POST /api/usuarios/registro
Content-Type: application/json
```

**Request Body:**

```json
{
  "nombre": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "password": "contraseña123",
  "handicap": 18
}
```

**Campos:**
- `nombre` (requerido): Nombre completo del usuario
- `email` (requerido): Correo electrónico único
- `password` (requerido): Contraseña del usuario
- `handicap` (opcional): Handicap inicial (default: 36)

**Respuesta (201):**

```json
{
  "mensaje": "Usuario creado con éxito",
  "usuario": {
    "_id": "...",
    "nombre": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "rol": "jugador",
    "handicap": 18
  }
}
```

---

### Iniciar Sesión

Autentica a un usuario y retorna un token JWT.

```http
POST /api/usuarios/login
Content-Type: application/json
```

**Request Body:**

```json
{
  "email": "admin@cheshire.com",
  "password": "admin123"
}
```

**Respuesta (200):**

```json
{
  "mensaje": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "usuario": {
    "_id": "...",
    "nombre": "Administrador",
    "email": "admin@cheshire.com",
    "rol": "admin",
    "handicap": 0
  }
}
```

---

## Endpoints Protegidos

### Listar Usuarios

Obtiene todos los usuarios registrados. **Solo admins.**

```http
GET /api/usuarios
Authorization: Bearer <token>
```

**Respuesta (200):**

```json
[
  {
    "_id": "...",
    "nombre": "Administrador",
    "email": "admin@cheshire.com",
    "rol": "admin",
    "handicap": 0
  }
]
```

---

### Obtener Perfil

Obtiene los datos de un usuario específico.

```http
GET /api/usuarios/perfil/:id
Authorization: Bearer <token>
```

**Parámetros:**
- `id` (path): ID del usuario

**Respuesta (200):**

```json
{
  "_id": "...",
  "nombre": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "rol": "jugador",
  "handicap": 18,
  "createdAt": "2026-01-15T10:00:00Z"
}
```

---

### Eliminar Usuario

Elimina un usuario. **Solo admins.**

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

### Listar Campos

Obtiene todos los campos de golf disponibles.

```http
GET /api/campos
Authorization: Bearer <token>
```

**Query Parameters:**
- `ordenar` (opcional): `asc` o `desc`

**Respuesta (200):**

```json
[
  {
    "_id": "...",
    "nombre": "Club de Golf Madrid",
    "ubicacion": "Madrid, España",
    "hoyos": 18,
    "par": 72,
    "precio_socio": 45,
    "precio_invitado": 85
  }
]
```

---

### Crear Campo

Crea un nuevo campo de golf. **Solo admins.**

```http
POST /api/campos/nuevo
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "nombre": "Nuevo Campo",
  "ubicacion": "Ciudad, País",
  "hoyos": 18,
  "par": 72,
  "precio_socio": 50,
  "precio_invitado": 100
}
```

---

### Crear Reserva

Crea una nueva reserva de tee time.

```http
POST /api/reservas
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "campo": "id_del_campo",
  "fecha": "2026-06-15",
  "hora": "10:00",
  "hoyos": 18
}
```

---

### Mis Reservas

Obtiene las reservas del usuario autenticado.

```http
GET /api/reservas/usuario/:id
Authorization: Bearer <token>
```

**Query Parameters:**
- `ordenar`: `asc` o `desc`
- `anio`: Filtrar por año (ej: 2026)
- `estado`: Filtrar por estado (confirmada/pendiente/cancelada)

---

### Cancelar Reserva

Cancela una reserva existente.

```http
DELETE /api/reservas/:id
Authorization: Bearer <token>
```

---

### Guardar Resultado

Registra el resultado de una partida.

```http
POST /api/resultados
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "campo": "id_del_campo",
  "fecha": "2026-06-15",
  "puntuacion": 85
}
```

---

### Mi Historial

Obtiene el historial de resultados del usuario.

```http
GET /api/resultados/usuario/:id
Authorization: Bearer <token>
```

---

## Códigos de Respuesta

| Código | Descripción |
|--------|-------------|
| 200 | OK - Operación exitosa |
| 201 | Created - Recurso creado |
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - Token no válido |
| 403 | Forbidden - Sin permisos |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |

---

## Ejemplos con cURL

```bash
# 1. Login
TOKEN=$(curl -s -X POST http://localhost:3000/api/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@cheshire.com","password":"admin123"}' | jq -r '.token')

# 2. Listar usuarios
curl -X GET http://localhost:3000/api/usuarios \
  -H "Authorization: Bearer $TOKEN"

# 3. Crear reserva
curl -X POST http://localhost:3000/api/reservas \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"campo":"id_campo","fecha":"2026-06-15","hora":"10:00"}'
```
