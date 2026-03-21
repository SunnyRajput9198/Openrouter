# OpenRouter Clone – AI Model Gateway

A unified API gateway for routing requests across multiple AI models, inspired by [OpenRouter](https://openrouter.ai). Built as a high-performance monorepo using Elysia.js on Bun.

---

## Screenshots

![Dashboard Overview](images/img1.png.png)

![Model Routing](images/img2.png.png)

![API Response](images/img3.png.png)

---

## What It Does

Most AI apps are hardcoded to one model. Swap providers and everything breaks.

This system is different. It provides a single API interface that routes requests to multiple AI providers — Anthropic, OpenAI, Google Gemini — with a clean dashboard to manage and monitor everything.

---

## Features

- **Multi-model routing** — Send requests to Claude, GPT, or Gemini through one unified API
- **Provider abstraction** — Switch models without changing your app code
- **JWT Authentication** — Secure API key management
- **Real-time dashboard** — Monitor requests, usage, and responses
- **Type-safe end-to-end** — Elysia Eden treaty for fully typed API calls from frontend to backend

---

## Tech Stack

**Backend (api-backend):**
- [Elysia.js](https://elysiajs.com/) — Fast, type-safe Bun web framework
- [Bun](https://bun.sh/) — JavaScript runtime & package manager
- Anthropic SDK, OpenAI SDK, Google Gemini SDK
- `@elysiajs/bearer` — Bearer token auth
- `@elysiajs/openapi` — Auto-generated API docs

**Auth Backend (primary-backend):**
- Elysia.js + Bun
- JWT Authentication (`@elysiajs/jwt`)
- CORS (`@elysiajs/cors`)

**Frontend (dashboard-frontend):**
- React 18 + TypeScript
- React Router v7
- TanStack Query v5
- Radix UI + Tailwind CSS v4
- Elysia Eden (type-safe API client)
- Bun bundler with `bun-plugin-tailwind`

**Shared:**
- `db` — Shared database package
- [Turborepo](https://turbo.build/) — Monorepo build system
- TypeScript across all packages

---

## Project Structure

```
Openrouter/
├── apps/
│   ├── api-backend/          # Main AI gateway (Elysia + Bun)
│   ├── primary-backend/      # Auth & user management (Elysia + Bun)
│   └── dashboard-frontend/   # React dashboard (Bun bundler)
├── packages/
│   ├── db/                   # Shared database layer
│   ├── ui/                   # Shared UI components
│   ├── eslint-config/
│   └── typescript-config/
├── bunfig.toml
└── turbo.json
```

---

## Getting Started

### Prerequisites
- [Bun](https://bun.sh/) v1.1.20+
- PostgreSQL

### Installation

```bash
git clone https://github.com/SunnyRajput9198/Openrouter.git
cd Openrouter

# Install all dependencies
bun install
```

### Environment Setup

```bash
# apps/api-backend/.env
ANTHROPIC_API_KEY=your_anthropic_key
OPENAI_API_KEY=your_openai_key
GOOGLE_API_KEY=your_google_key

# apps/primary-backend/.env
JWT_SECRET=your_jwt_secret
DATABASE_URL=postgresql://user:password@localhost:5432/openrouter
```

### Run in Development

```bash
# Run all services together
bun run dev

# Or run individually
cd apps/api-backend && bun run dev        # API Gateway → port 3000
cd apps/primary-backend && bun run dev    # Auth Backend → port 3002
cd apps/dashboard-frontend && bun run dev # Dashboard → port 3001
```

### Build

```bash
bun run build
```

---

## API Usage

Once running, hit the gateway like this:

```bash
# Route to Claude
curl -X POST http://localhost:3000/api/chat \
  -H "Authorization: Bearer your_token" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-sonnet-4-20250514",
    "messages": [{ "role": "user", "content": "Hello!" }]
  }'

# Route to GPT
curl -X POST http://localhost:3000/api/chat \
  -H "Authorization: Bearer your_token" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o",
    "messages": [{ "role": "user", "content": "Hello!" }]
  }'
```

Auto-generated API docs available at: `http://localhost:3000/swagger`

---

## Current Status

**Working:**
- ✅ Multi-model routing (Anthropic, OpenAI, Gemini)
- ✅ JWT auth with bearer tokens
- ✅ React dashboard with real-time updates
- ✅ Type-safe Eden client (no manual type duplication)
- ✅ Turborepo monorepo with shared packages

**In Progress:**
- 🚧 Usage analytics & cost tracking
- 🚧 Rate limiting per API key
- 🚧 Model fallback (auto-retry on failure)
- 📋 Streaming response support
- 📋 Prompt caching layer

---

## Why Bun + Elysia?

- **Bun** is significantly faster than Node.js for I/O-heavy workloads like API proxying
- **Elysia** gives end-to-end type safety via Eden — the frontend knows exact request/response types without any code generation step
- **Turborepo** makes managing 3 apps + shared packages clean and fast

---

## License

MIT — do whatever you want with it.

---

## Contact

GitHub: [@SunnyRajput9198](https://github.com/SunnyRajput9198)

Issues: [GitHub Issues](https://github.com/SunnyRajput9198/Openrouter/issues)