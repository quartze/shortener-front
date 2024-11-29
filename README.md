# Shortener URL Frontend
This is the interface for the `shortener-api` backend, 
built with Vue 3, Nuxt 3, and TailwindCSS. 
It provides full functionality available in the API backend.

Live: [https://shrtl.wavecloud.pl/](https://shrtl.wavecloud.pl/)

API: [https://api.shortener.wavecloud.pl/swagger-ui/index.html#](https://api.shortener.wavecloud.pl/swagger-ui/index.html#)

## Features
* Create short URLs anonymously.
* Register a new account with automatic login after registration.
* Log in to your account.
* Access your profile to manage short URLs (view or delete them).
* Track the number of clicks on your URLs.
* Two AI-generated articles are included to enhance SEO.

## Authentication Strategy
Authentication is handled via Axios. Each request includes an Auth and Refresh token.
If the Auth token expires, it is automatically refreshed, and the previous request is re-sent with the same configuration.

## Nuxt Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

### Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

### Development Server

Start the development server on `http://localhost:7071`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

### Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
