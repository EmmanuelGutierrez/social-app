# 📦 Frontend
## 🧠 Descripción

Este repositorio contiene el frontend de una red social, desarrollado con Next.js y Apollo Client, enfocado en rendimiento, UX y manejo avanzado de estado.

Consume un backend GraphQL y soporta:

- Feed con paginación infinita

- Detalle de posts y comentarios

- Likes en tiempo real

- Notificaciones

- Autenticación persistente

- Subida y compresión de imágenes

## 🏗️ Stack tecnológico

- Next.js (App Router)

- React

- Apollo Client

- Zustand

- React Hook Form

- Zod

- Tailwind CSS

- GraphQL Code Generator

## 🗂️ Estructura del proyecto
```` 
src/
├── app/
│   ├── main/
│   ├── post/
│   ├── auth/
│   └── layout.tsx
├── hooks/
│   ├── usePost.ts
│   ├── useAuth.ts
│   └── useNotifications.ts
├── graphql/
│   ├── queries/
│   ├── mutations/
│   └── fragments/
├── store/
│   └── zustand/
└── components/
````
## 🔐 Autenticación

- Login con cookies HttpOnly

- Refresh automático del token

- Persistencia de estado con Zustand

- Redirecciones protegidas

- Logout seguro

## 📰 Feed y posts

- Feed con cursor-based pagination

- Infinite scroll (fetchMore)

- Cache normalizado de Apollo

- Evita duplicación de posts

- Actualización manual del cache cuando corresponde

## 💬 Comentarios y detalle de post

- Vista de post con:

  - ancestros

  - replies

  - Replies paginados (ej. 4 en 4)

  - Actualización inmediata al comentar

## ❤️ Likes

- Optimistic UI

- Actualización local del contador

- Refetch selectivo

- Preparado para sincronización por subscriptions

## 🔔 Notificaciones

- GraphQL Subscriptions

- Manejo de notificaciones pendientes

- Sincronización periódica

- Control de alta concurrencia

## 📁 Manejo de imágenes

- Selección desde input file

- Compresión con browser-image-compression

- Validación de tipo y tamaño

Envío mediante GraphQL Upload

## ⚙️ Variables de entorno
```
NEXT_PUBLIC_BACKEND_URL=
NEXT_PUBLIC_BACKEND_WS_URL=
```
## 🚀 Instalación y ejecución
```
pnpm install
pnpm run dev
```

## Aplicación disponible en:

```
http://localhost:3000
```

## 📌 Notas

Compatible con backend en localhost o ngrok

Pensado para producción

Arquitectura escalable y mantenible