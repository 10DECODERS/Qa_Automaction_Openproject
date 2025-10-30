# OpenProject Ticket Manager

A modern web application for managing OpenProject tickets with AI-powered test case generation capabilities.

## 📋 Overview

This application provides a streamlined interface for viewing and managing OpenProject work packages (tickets) with enhanced features including:
- Browse projects and their associated tickets
- View detailed ticket information
- AI-powered test case generation for quality assurance
- Responsive design with dark/light mode support

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm installed ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- An OpenProject instance (cloud or self-hosted)
- OpenProject API token

### Installation

1. **Clone the repository**
   ```sh
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Start the development server**
   ```sh
   npm run dev
   ```

4. **Configure OpenProject connection**
   - Navigate to Settings in the app
   - Enter your OpenProject API URL (e.g., `https://openproject.example.com`)
   - Enter your OpenProject email
   - Enter your OpenProject API token
   - Click Save

### Obtaining OpenProject API Token

1. Log in to your OpenProject instance
2. Go to My Account → Access tokens
3. Click "Generate" to create a new API token
4. Copy the token and paste it in the Settings page

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library for building interactive interfaces
- **TypeScript** - Type-safe JavaScript for better developer experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **shadcn/ui** - High-quality, accessible component library
- **React Router** - Client-side routing
- **TanStack Query** - Powerful data fetching and caching

### Backend
- **Lovable Cloud (Supabase)** - Backend-as-a-Service platform
- **Edge Functions** - Serverless functions for API proxying and AI integration

## 🔌 APIs and Integrations

### 1. OpenProject API
**Purpose**: Fetch projects, work packages, and ticket details from your OpenProject instance

**Why we use it**:
- Provides comprehensive project management data
- RESTful API with extensive documentation
- Supports filtering, sorting, and pagination
- Industry-standard work package tracking

**Endpoints used**:
- `/api/v3/projects` - List all projects
- `/api/v3/projects/:id` - Get project details
- `/api/v3/projects/:id/work_packages` - List tickets for a project
- `/api/v3/work_packages/:id` - Get detailed ticket information

### 2. OpenProject Proxy Edge Function
**Purpose**: Securely proxy requests to OpenProject API

**Why we use it**:
- **Security**: Keeps API credentials server-side
- **CORS**: Bypasses browser cross-origin restrictions
- **Centralization**: Single point for API request handling
- **Error handling**: Consistent error responses

**Location**: `supabase/functions/openproject-proxy/index.ts`

### 3. Lovable AI (AI Gateway)
**Purpose**: Generate test cases for tickets using AI models

**Why we use it**:
- **No API key management**: Pre-configured in Lovable Cloud
- **Multiple models**: Access to Google Gemini and OpenAI GPT models
- **Cost-effective**: Optimized pricing with free tier included
- **Fast integration**: No complex setup required

**Models available**:
- `google/gemini-2.5-flash` (default) - Fast and efficient
- `google/gemini-2.5-pro` - Advanced reasoning
- `openai/gpt-5` - Powerful general-purpose model

**Location**: `supabase/functions/generate-test-cases/index.ts`

## 📁 Project Structure

```
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── Layout.tsx    # Main layout wrapper
│   │   └── AppSidebar.tsx # Navigation sidebar
│   ├── pages/            # Route pages
│   │   ├── Projects.tsx  # Project list view
│   │   ├── Tickets.tsx   # Ticket list view
│   │   ├── TicketDetail.tsx # Detailed ticket view
│   │   └── Settings.tsx  # Configuration page
│   ├── integrations/     # External service integrations
│   │   └── supabase/     # Supabase client and types
│   └── App.tsx          # Root component with routing
├── supabase/
│   └── functions/        # Edge functions
│       ├── openproject-proxy/  # OpenProject API proxy
│       └── generate-test-cases/ # AI test case generator
└── README.md
```

## 🎨 Features

### Project Management
- View all accessible OpenProject projects
- Search and filter projects by name or identifier
- Navigate to project-specific ticket views

### Ticket Management
- List all work packages for a project
- Filter tickets by status (Open, Closed, All)
- Search tickets by subject
- View detailed ticket information including:
  - Subject and description
  - Status and priority
  - Assignee information
  - Creation date

### AI-Powered Test Case Generation
- Generate comprehensive test scenarios with one click
- AI analyzes ticket details to create relevant test cases
- Structured test cases with:
  - Test case titles
  - Preconditions
  - Test steps
  - Expected results

## 🔒 Security

- API credentials stored locally in browser storage
- All API requests proxied through secure edge functions
- No credentials exposed in client-side code
- CORS-enabled edge functions for secure cross-origin requests

## 🚢 Deployment

Deploy via Lovable platform:

1. Open [Lovable Project](https://lovable.dev/projects/26ff9547-39e6-4cfb-8f4c-21daba4ce232)
2. Click **Share → Publish**
3. Your app will be live at `<your-app>.lovable.app`

### Custom Domain

To connect a custom domain:
1. Navigate to Project → Settings → Domains
2. Click "Connect Domain"
3. Follow the DNS configuration steps

[Learn more about custom domains](https://docs.lovable.dev/features/custom-domain#custom-domain)

## 🤝 Contributing

### Development Workflow

1. Make changes locally or via [Lovable Editor](https://lovable.dev/projects/26ff9547-39e6-4cfb-8f4c-21daba4ce232)
2. Test in development mode (`npm run dev`)
3. Commit and push changes
4. Changes auto-deploy via Lovable

### Code Style

- TypeScript for type safety
- Tailwind CSS for styling (use design tokens from `index.css`)
- Component-based architecture
- Functional React components with hooks

## 📚 Additional Resources

- [Lovable Documentation](https://docs.lovable.dev/)
- [OpenProject API Docs](https://www.openproject.org/docs/api/)
- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev/)

## 📄 License

This project is created with Lovable. Visit the [Lovable Project Page](https://lovable.dev/projects/26ff9547-39e6-4cfb-8f4c-21daba4ce232) for more information.
