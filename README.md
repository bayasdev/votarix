# Votarix E-Voting System 🗳️

Votarix es un sistema web de votación electrónica que permite a los usuarios ejercer su derecho al voto de forma remota y segura desde cualquier dispositivo con acceso a Internet ✅

![Votarix](docs/img/landing.png)

## Características ⚡️

- Soporta múltiples procesos electorales
- Permite votar por dignidades de elección popular (Presidente, Alcalde, Prefecto, etc.)
- Soporta partidos políticos o listas
- Soporta candidatos principales y alternos
- Carga de imágenes
- Opción de voto nulo y voto en blanco
- Límite de tiempo para votar
- Página de conoce al candidato con información sobre sus propuestas
- Página de resultados por proceso electoral
- Generación de actas de escrutinio en PDF
- Generación de certificados de votación en PDF para cada votante
- Carga masiva del padrón electoral desde un archivo CSV
- Autenticación mediante NextAuth.js y middleware
- Registros de auditoría
- Personalizable

## Tecnologías 🛠️

- TypeScript
- Next.js 14 App Router + Server Actions
- Shadcn UI + Tailwind CSS
- React Hook Form + Zod
- Prisma
- PostgreSQL

## Despliegue 🚀

### Requisitos

- Node.js 20+
- PostgreSQL 16+
- API key de UploadThing [https://uploadthing.com/](https://uploadthing.com/)
- Llenar el archivo `.env` con las variables de entorno necesarias

### Instalar dependencias

```bash
yarn
```

### Levantar base de datos con datos iniciales (Docker Compose)

```bash
yarn db:restart
```

### Crear build de producción

```bash
yarn build
```

### Levantar servidor de producción

```bash
yarn start
```

### Levantar servidor de desarrollo

```bash
yarn dev
```

## Créditos 👨🏻‍💻

&copy; Copyright 2024 [Codestrats](https://codestrats.com). Todos los derechos reservados.

- [Victor Bayas](https://github.com/bayasdev) (Desarrollador principal)
- [Jhon Guacho](https://github.com/guacho20) (Desarrollador)
