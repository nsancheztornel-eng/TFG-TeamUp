# Team up
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

## Cómo ampliar
- Nueva entidad: añadir una migración en `server/db/migrations.js`, un módulo en `server/modules/` y registrarlo en `server/index.js`.
- Nueva sección en el cliente: crear `public/js/components/<nombre>.js` y registrarla en `public/js/main.js`.
