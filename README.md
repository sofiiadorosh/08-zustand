# NoteHub

NoteHub is a simple app for creating, browsing and searching personal notes. It is built with the Next.js App Router and uses the public NoteHub API.

**Live demo:** [08-zustand-three-liard.vercel.app](https://08-zustand-three-liard.vercel.app/)

This project is homework 08 of the GoIT React course. It builds on `07-routing-nextjs` and adds SEO metadata, the Roboto font, a separate page for creating notes, and a note draft that is saved with Zustand.

## Features

- **Notes list** with keyword search (debounced), pagination and filtering by tag in a sidebar.
- **Note details** on their own page, or in a modal when opened from the list (intercepting and parallel routes).
- **Create note** on a separate page, `/notes/action/create`, with a plain HTML form and a form action (no Formik).
- **Draft autosave.** While you fill in the form, the draft is saved to a Zustand store and persisted to `localStorage`. It survives page reloads and Cancel, and is cleared only after the note is created.
- **SEO.** Every page has its own `title`, `description`, canonical URL and Open Graph tags. Dynamic pages build them with `generateMetadata`.
- **Roboto font**, loaded globally through `next/font/google`.

## Tech stack

- [Next.js](https://nextjs.org/) (App Router) and React
- TypeScript
- [TanStack Query](https://tanstack.com/query) for data fetching, with server-side prefetching and hydration
- [Zustand](https://zustand.docs.pmnd.rs/) with the `persist` middleware for the note draft
- axios
- CSS Modules
- ESLint, Prettier, Husky and lint-staged

## Routes

| Route                  | Description                                                           |
| ---------------------- | --------------------------------------------------------------------- |
| `/`                    | Home page                                                             |
| `/notes/filter/all`    | All notes                                                             |
| `/notes/filter/[tag]`  | Notes with one tag: `Todo`, `Work`, `Personal`, `Meeting`, `Shopping` |
| `/notes/[id]`          | Note details (opens as a modal when navigated to from the list)       |
| `/notes/action/create` | Create a new note                                                     |

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:

   ```bash
   NEXT_PUBLIC_NOTEHUB_TOKEN=your_notehub_api_token
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

   | Variable                    | Required | Description                                                                                  |
   | --------------------------- | -------- | -------------------------------------------------------------------------------------------- |
   | `NEXT_PUBLIC_NOTEHUB_TOKEN` | Yes      | Bearer token for the NoteHub API                                                             |
   | `NEXT_PUBLIC_SITE_URL`      | No       | Public site URL used for canonical and Open Graph links. Defaults to `http://localhost:3000` |

3. Start the dev server:

   ```bash
   npm run dev
   ```

   Then open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script                 | Description                    |
| ---------------------- | ------------------------------ |
| `npm run dev`          | Start the development server   |
| `npm run build`        | Build for production           |
| `npm run start`        | Start the production server    |
| `npm run lint`         | Run ESLint                     |
| `npm run lint:fix`     | Run ESLint and fix issues      |
| `npm run format`       | Format files with Prettier     |
| `npm run format:check` | Check formatting with Prettier |

## Project structure

```
app/
  @modal/(.)notes/[id]/   Note preview modal (intercepting route)
  notes/
    [id]/                 Note details page
    action/create/        Create note page
    filter/
      @sidebar/           Tag sidebar (parallel route)
      [...slug]/          Notes list filtered by tag
  layout.tsx              Root layout: metadata, Roboto font, providers
  not-found.tsx           404 page
  page.tsx                Home page
components/               UI components, each in its own folder with a CSS Module
lib/
  api.ts                  NoteHub API requests
  seo.ts                  Shared SEO constants and helpers
  store/noteStore.ts      Zustand store for the note draft
types/
  note.ts                 Note types and tags
```

## Deployment

The app is ready to deploy on [Vercel](https://vercel.com/). In the Vercel project settings, add the `NEXT_PUBLIC_NOTEHUB_TOKEN` and `NEXT_PUBLIC_SITE_URL` environment variables. Set `NEXT_PUBLIC_SITE_URL` to the deployed URL.
