# Memoria del Proyecto - Cheshire

## 1. Descripción del Proyecto

**Cheshire** es una API backend para la gestión de un club de golf. El nombre hace referencia al gato de Alicia en el país de las maravillas, simbolizando la presencia sutil que facilita cada movimiento del jugador.

## 2. Decisiones Técnicas

### Arquitectura
- **Patrón MVC** (Model-View-Controller) con capa de servicios intermedia
- **Express.js** como framework web
- **MongoDB + Mongoose** como base de datos y ODM

### Estructura del proyecto
```
src/
├── app.js              # Punto de entrada
├── db/database.js      # Conexión a MongoDB
├── Models/             # Esquemas de Mongoose
├── Controllers/        # Lógica de endpoints
├── Services/         # Lógica de negocio
├── Routes/            # Definición de rutas
└── Middleware/        # Autenticación JWT
```

### Autenticación y Seguridad
- **JWT (JSON Web Tokens)** para autenticación sin estado
- **bcryptjs** para hash de contraseñas
- Roles: `admin` y `jugador`

### Base de Datos
Colecciones implementadas:
1. **Usuario** - Jugadores del club
2. **Reserva** - Tee times reservados
3. **Campo** - Campos de golf disponibles
4. **Resultado** - Tarjetas de puntuación

## 3. Retos y Soluciones

### Reto 1: Autenticación segura
- **Problema**: Sistema vulnerable con passwords en texto plano
- **Solución**: Implementación de bcrypt para hash y JWT para sesiones

### Reto 2: Middleware de autorización
- **Problema**: Verificación de roles vía headers era insegura
- **Solución**: Token JWT con payload que incluye el rol

### Reto 3: Disponibilidad de reservas
- **Problema**: Conflictos de horarios
- **Solución**: Verificación de disponibilidad antes de crear reserva

### Reto 4: Gestión de múltiples endpoints por recurso
- **Problema**: Endpoints insuficientes para CRUD completo
- **Solución**: Implementación de endpoints adicionales (PUT, DELETE, GET individual)

## 4. Endpoints Implementados

### Usuarios (`/api/usuarios`)
| Endpoint | Método | Función |
|----------|--------|----------|
| `/api/usuarios/registro` | POST | Registrar usuario |
| `/api/usuarios/login` | POST | Iniciar sesión |
| `/api/usuarios` | GET | Listar usuarios (paginado, filtro) |
| `/api/usuarios/perfil/:id` | GET | Ver perfil |
| `/api/usuarios/:id` | PUT | Actualizar usuario |
| `/api/usuarios/:id` | DELETE | Eliminar usuario |
| `/api/usuarios/:id/handicap` | PATCH | Actualizar handicap |

### Reservas (`/api/reservas`)
| Endpoint | Método | Función |
|----------|--------|----------|
| `/api/reservas` | POST | Crear reserva |
| `/api/reservas` | GET | Listar todas (con filtros) |
| `/api/reservas/disponibilidad` | GET | Ver horarios disponibles |
| `/api/reservas/usuario/:id` | GET | Mis reservas |
| `/api/reservas/:id` | GET | Detalles de reserva |
| `/api/reservas/:id` | PUT | Actualizar reserva |
| `/api/reservas/:id` | DELETE | Cancelar reserva |

### Campos (`/api/campos`)
| Endpoint | Método | Función |
|----------|--------|----------|
| `/api/campos` | GET | Listar campos |
| `/api/campos/:id` | GET | Ver campo |
| `/api/campos` | POST | Crear campo (admin) |
| `/api/campos/:id` | PUT | Actualizar campo (admin) |
| `/api/campos/:id` | DELETE | Eliminar campo (admin) |

### Resultados (`/api/resultados`)
| Endpoint | Método | Función |
|----------|--------|----------|
| `/api/resultados` | POST | Guardar tarjeta |
| `/api/resultados` | GET | Listar todos (admin) |
| `/api/resultados/usuario/:id` | GET | Ver historial |
| `/api/resultados/:id` | GET | Ver resultado |
| `/api/resultados/:id` | PUT | Actualizar resultado |
| `/api/resultados/:id` | DELETE | Eliminar resultado (admin) |

## 5. Distribución de Tareas

Desarrollo realizado por un único desarrollador:
- Diseño de arquitectura
- Implementación de modelos
- Creación de servicios y controladores
- Configuración de rutas
- Implementación de autenticación JWT
- Documentación con JSDoc
- Ampliación de endpoints CRUD

## 6. Tecnologías Utilizadas

| Tecnología | Uso |
|------------|-----|
| Node.js | Entorno de ejecución |
| Express.js | Framework web |
| MongoDB | Base de datos |
| Mongoose | ODM |
| bcryptjs | Hash de contraseñas |
| jsonwebtoken | Autenticación JWT |
| Docker | Contenedores |
| nodemon | Desarrollo |

## 7. Mejoras Futuras

- Paginación en listados
- Filtrado avanzado de reservas
- Sistema de notificaciones
- Panel de administración web

---

**Fecha de entrega:** Mayo 2026
