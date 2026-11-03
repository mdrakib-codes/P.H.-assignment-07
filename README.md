# BazarDor

BazarDor is a responsive Bengali-language market-price browser built with Next.js App Router. Product and category information is fetched from the BazarDor API; authentication is handled by Better Auth with MongoDB.

## Requirements

- Node.js 20 or newer
- npm
- MongoDB connection for sign-up, sign-in, and profile features

## Getting started

1. Install dependencies:

   ```powershell
   npm ci
   ```

2. Copy the example environment file and set the values for your environment:

   ```powershell
   Copy-Item .env.example .env
   ```

   Do not commit `.env` or put production secrets in client-side variables.

3. Start the development server:

   ```powershell
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `MONGODB_URL` | Yes | MongoDB connection URI used by Better Auth. |
| `BETTER_AUTH_SECRET` | Yes | Long, random secret used to sign and encrypt authentication data. |
| `BETTER_AUTH_URL` | Recommended | Canonical application origin, such as the local or production site URL. |
| `BAZARDOR_API_URL` | No | Optional base URL for the upstream API. Defaults to `https://openapi.programming-hero.com/api/bazardor`. |

Generate and store a unique secret for each environment. Never expose it with a `NEXT_PUBLIC_` prefix.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home page with API-provided categories and products. |
| `/products` | Full product listing. |
| `/products/[slug]` | Public product details and available market prices. |
| `/categories` | Categories returned by the API. |
| `/categories/[slug]` | Products for an API-provided category; supports `?sort=asc` and `?sort=desc`. |
| `/sign-in` | Sign in; a validated local `callbackUrl` returns users to their requested page. |
| `/sign-up` | Create an account. |
| `/profile` | Signed-in user's profile and sign-out controls. |
| `/api/auth/[...all]` | Better Auth route handler. |

Legacy `/product/[slug]` and `/category/[slug]` URLs redirect to their plural equivalents.

## Project structure

```text
src/
  app/                       App Router pages and route handlers
    api/                       Same-origin API proxy and Better Auth routes
    categories/                Thin category route entries
    products/                  Thin product route entries
  components/
    navigation/                Site navigation
    providers/                 App-wide query provider
    ui/                        Shared UI primitives
  features/
    categories/components/     Category listing and category detail views
    products/components/       Product listing, cards, details, and ticker
  lib/
    api/
      client.ts                Typed same-origin fetch and response parsing
      endpoints.ts             Internal API routes
      proxy.ts                 Server-only upstream request handler
      queries.ts               TanStack Query keys and hooks
      products.ts              Product normalization
      categories.ts            Category normalization
      types.ts                 Shared API/domain types
    auth.ts                    Server-side Better Auth configuration
    auth-client.ts             Browser-side Better Auth client
    auth/queries.ts            TanStack Query session and auth mutations
```

## Data and API behavior

- Product and category reads use TanStack Query hooks. Matching query keys share in-flight requests and cached data across routes.
- Product and category data stays fresh for 60 seconds; background refetching on window focus is disabled to avoid unnecessary requests.
- Better Auth session reads and sign-in, sign-up, and sign-out operations are centralized in TanStack Query hooks. The session stays fresh for 30 seconds and is revalidated on window focus.
- Same-origin Next.js route handlers proxy API requests, avoiding browser CORS issues and keeping upstream configuration server-side.
- Upstream requests use `cache: "no-store"`; displayed values originate from the API response.
- API responses are normalized and type-checked. Missing prices, units, images, and change data are not invented or presented as real API values.
- Failed requests and malformed responses are surfaced to the route error boundary rather than silently converted to empty data.
- The category endpoint is queried once per category page and the product endpoint once for its matching products.

## Authentication and security

- Market prices and product details are public. Authentication is limited to account and profile features, so a database outage does not block public price browsing.
- Sign-in callback URLs are restricted to local paths to prevent open redirects.
- Authentication secrets and database connection strings are server-only. Keep local secrets in `.env`, which is ignored by Git.
- API and authentication failures are shown without rendering server stack traces or upstream response bodies.

## Commands

```powershell
npm run dev       # Start the development server
npm run lint      # Run ESLint
npm run build     # Type-check and create a production build
npm start         # Start the production server after building
```

No separate automated test runner is currently configured. Run lint and build before submitting changes.

## Responsive behavior

The interface uses responsive Tailwind breakpoints for navigation, product grids, category grids, and product details. The market-price table scrolls horizontally on narrow screens, and the ticker respects reduced-motion preferences.
