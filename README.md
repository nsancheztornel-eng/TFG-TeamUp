# Team up 🚀
Plataforma web para la gestión de equipos, capacitación técnica y reclutamiento de talento.

## Arranque
Requiere Node.js 22.5 o superior (SQLite integrado, sin `npm install`).

    node server/index.js

Abre http://localhost:3000. La base de datos `teamup.db` se crea, migra y rellena sola.

## Arquitectura
- `server/index.js`: arranque y manejo de errores.
- `server/modules/*.js`: un módulo por dominio (users, ideas, cards, messages) que registra sus rutas.
- `server/lib/`: router, validación, hub de eventos en tiempo real.
- `server/db/`: conexión, migraciones versionadas y datos de ejemplo.
- `public/js/api.js`: única capa de acceso al servidor. `events.js`: tiempo real. `components/`: una vista por archivo.
---

## 📌 Tabla de Contenidos

- [Acerca del Proyecto](#-acerca-del-proyecto)
- [Características Principales](#-características-principales)
- [Arquitectura e Infraestructura](#-arquitectura-e-infraestructura)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Despliegue](#-despliegue)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

---

## 💡 Acerca del Proyecto

En entornos académicos y profesionales, organizar grupos de trabajo con intereses y habilidades complementarias suele ser un desafío. **TeamUp** resuelve esta problemática ofreciendo una plataforma centralizada y reactiva donde los usuarios pueden interactuar al instante, proponer ideas y construir equipos colaborativos.

---

## ✨ Características Principales

- ⚡ **Sincronización en Tiempo Real:** Comunicación fluida cliente-servidor impulsada por **Socket.IO**.
- 🎨 **Interfaz Dinámica e Intuitiva:** Frontend responsivo desarrollado con HTML5, CSS3 y JavaScript moderno (ES6+).
- 🛠️ **Arquitectura Modular:** Backend basado en Node.js y Express con separación clara de capas para fácil escalabilidad.
- 📦 **Cero Sobrepeso de Frameworks:** Diseñado con JavaScript vanila en el cliente para máxima eficiencia de renderizado.

---

## 🏗️ Arquitectura e Infraestructura

La aplicación sigue un patrón de arquitectura **Cliente-Servidor Event-Driven**:

```text
┌─────────────────────────┐               ┌─────────────────────────┐
│     Cliente (Browser)   │               │    Servidor (Node.js)   │
│                         │               │                         │
│  - public/index.html    │  HTTP / Static│  - server.js            │
│  - public/styles.css    │ <───────────> │  - Express Static Middleware│
│  - public/app.js        │               │                         │
│                         │   WebSockets  │  - Socket.IO Engine     │
│  - Socket.IO Client     │ <───────────> │    (Real-time Events)   │
└─────────────────────────┘               └─────────────────────────┘
```

---

## 📁 Estructura del Proyecto

```text
TFG-TeamUp/
├── public/                 # Archivos estáticos de la aplicación (Frontend)
│   ├── index.html          # Estructura principal de la interfaz
│   ├── styles.css          # Estilos globales y reglas de diseño
│   └── app.js              # Lógica de cliente y gestión de eventos de Socket.IO
├── server.js               # Servidor Express e inicialización de Socket.IO
├── package.json            # Metadatos del proyecto y dependencias
├── README.md               # Documentación del proyecto
└── .gitignore              # Archivos y carpetas excluidos del control de versiones
```

---

## 📋 Requisitos Previos

Asegúrate de contar con las siguientes herramientas instaladas en tu sistema antes de comenzar:

- **Node.js**: v14.0.0 o superior (recomendado v18.x / v20.x LTS)
- **npm**: v6.0.0 o superior (incluido con Node.js)
- **Git**: Sistema de control de versiones

---

## 🚀 Instalación y Configuración Local

Sigue estos pasos para poner en marcha el proyecto en tu entorno de desarrollo:

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/TFG-TeamUp.git
cd TFG-TeamUp
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar la aplicación
```bash
# Entorno de producción / ejecución estándar
npm start

# O ejecutar directamente con Node
node server.js
```

### 4. Acceso en el navegador
Abre tu navegador de preferencia y entra en:
```text
http://localhost:3000
```

---

## ⚙️ Scripts Disponibles (`package.json`)

| Comando | Descripción |
| :--- | :--- |
| `npm start` | Inicia la aplicación ejecutando `node server.js`. |
| `npm run dev` | *(Opcional)* Ejecuta la aplicación con `nodemon` para recarga automática durante el desarrollo. |

---

## 🌐 Despliegue

Este proyecto puede ser desplegado fácilmente en plataformas en la nube compatibles con Node.js y WebSockets:

- **Render / Railway / Heroku:**
  - Conecta este repositorio.
  - Configura el comando de inicio: `npm start`.
  - Asegúrate de exponer la variable de entorno `PORT`.

---

## 🤝 Contribución

Las contribuciones son las que hacen de la comunidad de código abierto un lugar increíble para aprender, inspirar y crear. Cualquier contribución que hagas será **muy apreciada**.

1. Haz un **Fork** del proyecto.
2. Crea una rama para tu nueva característica (`git checkout -b feature/NuevaCaracteristica`).
3. Realiza tus commits (`git commit -m 'Añadir nueva característica'`).
4. Haz Push a la rama (`git push origin feature/NuevaCaracteristica`).
5. Abre un **Pull Request**.

---

## 📄 Licencia

Distribuido bajo la licencia **MIT**. Consulta el archivo `LICENSE` para obtener más información.
