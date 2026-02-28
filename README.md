# Kalki AI 26 - Frontend

Kalki AI 26 Frontend - A modern AI Agent platform frontend application. Built with Next.js 15, providing an intuitive user interface to interact with AI Agents.

## Features

- **Modern UI**: Responsive interface based on Next.js 15 and React 19
- **Real-time Streaming Response**: WebSocket-supported real-time message streaming
- **Multi-language Support**: Built-in support for 9 languages
- **Markdown Rendering**: Code highlighting, math formulas, Mermaid diagrams
- **File Management**: Upload, preview, and edit multiple file formats
- **Sandbox Desktop**: Virtual desktop environment with file operations and terminal
- **Dark/Light Theme**: Adaptive system theme

## Tech Stack

- **Next.js 15** - React Framework (App Router)
- **React 19** - UI Library
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Shadcn/ui** - Component Library
- **Supabase** - Authentication and Real-time Data
- **TanStack Query** - Data Fetching

## Quick Start

### 1. Requirements

- Node.js 18+
- pnpm (recommended) or npm
- Supabase Project
- Running Backend Service

### 2. Install Dependencies

```bash
# Install pnpm
npm install -g pnpm

# Install dependencies
pnpm install
```

### 3. Environment Configuration

Copy the environment template:

```bash
cp .env.example .env.local
```

Edit `.env.local` file:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Backend API URL
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000/v1

# Application URL
NEXT_PUBLIC_URL=http://localhost:3000

# Environment Mode
NEXT_PUBLIC_ENV_MODE=local
```

### 4. Start Development Server

```bash
pnpm dev
```

Application will start at `http://localhost:3000`.

## Main Pages

- `/` - Home/Landing Page
- `/dashboard` - Dashboard
- `/agents` - Agent Management
- `/agents/[threadId]` - Agent Conversation
- `/knowledge` - Knowledge Base
- `/settings` - User Settings
- `/pricing` - Pricing Page

## Project Structure

```
kalki-ai-frontend/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (dashboard)/     # Authenticated pages
│   │   ├── (home)/          # Public pages
│   │   ├── auth/            # Authentication
│   │   └── api/             # API Routes
│   ├── components/          # React Components
│   │   ├── ui/              # Base UI Components
│   │   ├── thread/          # Conversation Components
│   │   ├── agents/          # Agent Management
│   │   ├── sidebar/         # Sidebar Components
│   │   └── billing/         # Billing Components
│   ├── hooks/               # Custom Hooks
│   ├── lib/                 # Utility Functions
│   ├── stores/              # State Management
│   └── i18n/                # Internationalization
├── public/                  # Static Assets
├── translations/            # Translation Files
└── package.json
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase Anon Key |
| `NEXT_PUBLIC_BACKEND_URL` | ✅ | Backend API URL |
| `NEXT_PUBLIC_URL` | ✅ | Application URL |
| `NEXT_PUBLIC_ENV_MODE` | ⚪ | Environment Mode (local/production) |

## Main Components

### ThreadComponent
Core conversation component supporting:
- Message streaming render
- Tool call display
- File attachment handling
- Voice input

### SandboxDesktop
Virtual desktop environment providing:
- File browser
- Terminal access
- Code editor
- Spreadsheet application

### AgentSelector
Agent selection and management component:
- Create new Agent
- Switch current Agent
- Configure Agent settings

## Development Guide

### Run Tests

```bash
pnpm test
```

### Code Linting

```bash
pnpm lint
```

### Build for Production

```bash
pnpm build
```

### Type Check

```bash
pnpm type-check
```

## Internationalization

Supported languages:
- English (en)
- Chinese (zh)
- Japanese (ja)
- Korean (ko)
- French (fr)
- German (de)
- Spanish (es)
- Italian (it)
- Portuguese (pt)

Adding a new language:
1. Create `{lang}.json` in `translations/` directory
2. Add language config in `src/i18n/config.ts`

## Docker Deployment

```bash
# Build image
docker build -t kalki-ai-frontend .

# Run container
docker run -p 3000:3000 --env-file .env.local kalki-ai-frontend
```

## Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## License

MIT License

## Author

**Rahul Paul**

## Links

- GitHub Repository: https://github.com/rahulpaul3696/kalki-ai-frontend
