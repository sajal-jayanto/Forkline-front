# Forkline-front

The web dashboard for [Forkline](https://github.com/sajal-jayanto/Forkline). Use it to manage menu items and outlets, take orders, and view sales reports.

Built with React, TypeScript, Vite, Tailwind CSS and Ant Design.

## Requirements

- **Node.js** 20.19+ or 22.12+
- **npm**
- The **Forkline backend** running. By default it listens on `http://localhost:9000`.

## Installation

```bash
git clone https://github.com/sajal-jayanto/Forkline-front.git
cd Forkline-front
npm install
```

## Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

| Variable       | Description                     | Default                 |
| -------------- | ------------------------------- | ----------------------- |
| `VITE_API_URL` | Base URL of the Forkline API    | `http://localhost:9000` |

Restart the dev server after changing `.env`. Vite only reads it on startup.

## Running the project

Start the backend first, then run:

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## Scripts

| Command           | What it does                                    |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Start the dev server with hot reload            |
| `npm run build`   | Type-check and build for production into `dist/` |
| `npm run preview` | Serve the production build locally              |
| `npm run lint`    | Lint the code with oxlint                       |
| `npm run format`  | Format `src/` with Prettier                     |

## Project structure

```
src/
├── components/     Reusable UI (top bar, modals)
├── hooks/          Data and form hooks (useFetch, useMenuItems, useCreateOrder, …)
├── http/
│   ├── client.ts   Shared axios instance and error handling
│   └── service/    API calls grouped by resource
├── pages/          Dashboard, Outlets, Outlet dashboard, Report
├── utils/          Small helpers
├── theme.ts        Ant Design theme (brand colours, font)
└── index.css       Tailwind setup and colour tokens
```
