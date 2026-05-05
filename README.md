# Cheshire - Club de Golf Management

**Cheshire** es una aplicación web completa para la gestión de un club de golf. Permite a los jugadores reservartee times, registrar sus puntuaciones y seguir su handicap, mientras que los administradores pueden gestionar usuarios, campos y reservas del sistema.

## Descripción

Cheshire es una solución integral que digitaliza la gestión de un club de golf. Los jugadores pueden crear una cuenta, reservar horarios en los campos disponibles, registrar sus partidas y consultar su historial de resultados. Los administradores tienen acceso completo para gestionar usuarios, crear y editar campos de golf, visualizar todas las reservas del sistema y administrar los resultados de todos los jugadores.

La aplicación cuenta con una interfaz web moderna y responsiva que se adapta a cualquier dispositivo, permitiendo a los usuarios gestionar sus reservas desde cualquier lugar.

## Funcionalidades

### Para Jugadores

- Registro e inicio de sesión seguro
- Visualización de campos de golf disponibles
- Creación y cancelación de reservas propias
- Registro de puntuaciones de partidas
- Consulta de historial de resultados
- Seguimiento del handicap

### Para Administradores

- Gestión completa de usuarios
- Creación, edición y eliminación de campos
- Visualización de todas las reservas del sistema
- Cancelación de cualquier reserva
- Gestión de resultados de todos los jugadores

## Arquitectura

El proyecto sigue el patrón **MVC** (Model-View-Controller) con una capa adicional de servicios:

```
src/
├── app.js                 # Punto de entrada de la aplicación
├── db/database.js         # Configuración de conexión a MongoDB
├── Models/                # Esquemas de Mongoose
│   ├── Usuario.js        # Modelo de usuario
│   ├── Campo.js         # Modelo de campo de golf
│   ├── Reserva.js       # Modelo de reserva
│   └── Resultado.js     # Modelo de resultado/partida
├── Controllers/          # Lógica de los endpoints
├── Services/            # Lógica de negocio
├── Routes/              # Definición de rutas API
└── Middleware/         # Autenticación JWT
```

## Stack Tecnológico

| Componente | Tecnología |
|-----------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Base de datos | MongoDB |
| ODM | Mongoose |
| Autenticación | JWT (JSON Web Tokens) |
| Hash de contraseñas | bcryptjs |
| Contenedores | Docker |

## Requisitos del Sistema

- Node.js 18.x o superior
- MongoDB 6.x o superior
- Docker (opcional, recomendado)

## Acceso a la Aplicación

La aplicación está disponible en: **http://localhost:3000**

## Credenciales de Prueba

| Rol | Email | Contraseña |
|-----|-------|------------|
| Administrador | admin@cheshire.com | admin123 |
| Jugador | carlos@golf.com | admin123 |

## API Documentation

Para documentación detallada de la API REST, consulta el archivo [INSTALL.md](./docs/INSTALL.md).

## Estructura de Archivos

```
Cheshire/
├── src/                    # Código fuente del backend
│   ├── app.js             # Punto de entrada
│   ├── db/                # Configuración de base de datos
│   ├── Models/            # Modelos de Mongoose
│   ├── Controllers/       # Controladores de la API
│   ├── Services/          # Servicios de negocio
│   ├── Routes/           # Definición de rutas
│   └── Middleware/       # Middleware de autenticación
├── public/                 # Archivos estáticos públicos
│   ├── css/              # Hojas de estilo
│   └── js/               # JavaScript del frontend
├── views/                  # Plantillas HTML
├── docs/                   # Documentación
├── docker-compose.yml     # Configuración de Docker
├── Dockerfile             # Imagen Docker de la app
├── package.json          # Dependencias npm
├── .env.example          # Variables de entorno
└── README.md             # Este archivo
```

## Características Técnicas

- **Autenticación**: Sistema de login con JWT que expira en 7 días
- **Seguridad**: Contraseñas hasheadas con bcrypt (10 rondas)
- **Autorización**: Control de acceso basado en roles (admin/jugador)
- **Validación**: Verificación de datos en servidor
- **Responsive Design**: Interfaz adaptable a móviles y escritorio

## Tecnologías Frontend

- HTML5 semántico
- CSS3 con variables personalizadas
- JavaScript vanilla (sin frameworks)
- Fetch API para comunicación con el backend

## Licencia

ISC

---

**Cheshire** - *Donde el tiempo te pertenece*
