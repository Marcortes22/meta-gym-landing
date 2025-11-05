# Meta Gym Landing Page# Meta Gym Landing Page



Landing page profesional para Meta Gym - Sistema de gestión para gimnasios.Landing page profesional para Meta Gym - Sistema de gestión para gimnasios.



## 🔥 Stack Tecnológico## 🔥 Stack Tecnológico



- **Framework**: Astro 5.13.7 con SSR- **Framework**: Astro 5.13.7

- **UI**: React 19.2.0 (Islands Architecture)- **Base de Datos**: Firebase (Firestore)

- **Base de Datos**: Firebase Firestore- **Email**: Resend API

- **Email**: Resend API- **Despliegue**: Vercel

- **Despliegue**: Vercel (Serverless)- **Estilos**: Tailwind CSS

- **Estilos**: Tailwind CSS + GSAP- **Iconos**: Lucide React

- **Iconos**: Lucide

## 🚀 Project Structure

## 📦 Estructura del Proyecto

Inside of your Astro project, you'll see the following folders and files:

```text

/```text

├── public//

├── src/├── public/

│   ├── components/│   └── favicon.svg

│   │   ├── layout/       # Header, Footer├── src

│   │   ├── sections/     # Hero, Features, Pricing, etc.│   ├── assets

│   │   └── ui/          # Modal (React Islands)│   │   └── astro.svg

│   ├── data/            # JSON estáticos│   ├── components

│   ├── layouts/         # Layout principal│   │   └── Welcome.astro

│   ├── pages/│   ├── layouts

│   │   ├── api/         # Endpoints serverless│   │   └── Layout.astro

│   │   └── index.astro  # Página principal│   └── pages

│   ├── styles/          # Estilos globales│       └── index.astro

│   ├── types/           # TypeScript interfaces└── package.json

│   └── utils/           # Firebase & Email utils```

└── package.json

```To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).



## 🚀 Comandos## 🧞 Commands



| Comando | Acción |All commands are run from the root of the project, from a terminal:

| :-- | :-- |

| `pnpm install` | Instalar dependencias || Command                   | Action                                           |

| `pnpm dev` | Servidor de desarrollo en `localhost:4321` || :------------------------ | :----------------------------------------------- |

| `pnpm build` | Build de producción en `./dist/` || `pnpm install`             | Installs dependencies                            |

| `pnpm preview` | Preview del build local || `pnpm dev`             | Starts local dev server at `localhost:4321`      |

| `pnpm build`           | Build your production site to `./dist/`          |

## 🔧 Variables de Entorno| `pnpm preview`         | Preview your build locally, before deploying     |

| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |

Crear archivo `.env` con:| `pnpm astro -- --help` | Get help using the Astro CLI                     |



```env## 👀 Want to learn more?

# Firebase

FIREBASE_API_KEY=Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
FIREBASE_MEASUREMENT_ID=

# Resend
RESEND_API_KEY=
```

## 📝 Colecciones Firebase

- `register_requests` - Solicitudes de registro de gimnasios
- `newsletter_subscribers` - Suscriptores al newsletter
- `saas_plans` - Planes de suscripción
