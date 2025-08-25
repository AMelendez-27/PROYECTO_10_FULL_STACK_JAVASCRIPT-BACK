
# PROJECT 10: API REST - Gestión de Eventos y Asistentes
## _thePower - Desarrollo Full Stack_

## Descripción
Este proyecto es una API REST para la gestión de eventos y asistentes. Permite a los usuarios registrarse, iniciar sesión, crear eventos, confirmar asistencia y gestionar su perfil, incluyendo la subida de avatares y carteles de eventos. El objetivo es practicar buenas prácticas de arquitectura, seguridad y experiencia de usuario en el backend.

## Requisitos del Proyecto
- Backend con Express
- Conexión a MongoDB Atlas usando Mongoose
- Modelo de usuario (nombre, email, contraseña hasheada, avatar)
- Modelo de evento (título, fecha, ubicación, descripción, cartel, asistentes)
- Middleware de autenticación con JWT
- Middleware de subida de ficheros (multer)
- Controladores para CRUD de eventos y usuarios
- Confirmación de asistencia a eventos
- Manejo de errores centralizado
- Rutas protegidas para usuarios autenticados
- README con endpoints y explicación

## Tech

Stack utilizado en este proyecto:
- Node.js
- Express
- Mongoose
- MongoDB
- DotEnv
- Nodemon
- Bcrypt
- JsonWebToken
- Multer
- CORS

## Instalación

Este proyecto requiere [Node.js](https://nodejs.org/) v20.10+ para funcionar.

Instala las dependencias y ejecuta el servidor en modo desarrollo:

```sh
cd [nombre de la carpeta del proyecto]
npm install
npm run dev
```

## Endpoints
#### _AUTH_

| HTTP Method | Route                | Descripción                  | Body/Params (Ejemplo)                                  |
|-------------|----------------------|------------------------------|--------------------------------------------------------|
| `POST`      | `/api/auth/register` | Registro de usuario + login  | FormData: name, email, password, avatar (opcional)     |
| `POST`      | `/api/auth/login`    | Login y obtención de token   | { email, password }                                    |

#### _USERS_

| HTTP Method | Route         | Descripción                | Body/Params (Ejemplo)                                  |
|-------------|--------------|----------------------------|--------------------------------------------------------|
| `GET`       | `/api/users/me` | Obtener perfil propio      | Header: Authorization: Bearer <token>                  |
| `PUT`       | `/api/users/me` | Actualizar perfil propio   | FormData: name, email, password, avatar (opcional)     |

#### _EVENTS_

| HTTP Method | Route                  | Descripción                        | Body/Params (Ejemplo)                                  |
|-------------|------------------------|------------------------------------|--------------------------------------------------------|
| `GET`       | `/api/events`          | Listar todos los eventos           | -                                                      |
| `GET`       | `/api/events/:id`      | Obtener detalles de un evento      | :id (ID del evento)                                    |
| `POST`      | `/api/events`          | Crear evento (autenticado)         | FormData: title, date, location, description, poster   |
| `POST`      | `/api/events/:id/attend` | Confirmar asistencia (autenticado) | :id (ID del evento)                                    |
| `GET`       | `/api/events/:id/attendees` | Listar asistentes de un evento | :id (ID del evento)                                    |

---
---
---
