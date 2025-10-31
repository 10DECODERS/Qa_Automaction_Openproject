# Open-Nav-Insight Application Documentation

## Overview

Open-Nav-Insight is a React-based QA automation tool that integrates with OpenProject for project and ticket management, featuring AI-powered test case generation through n8n workflows. The application provides a complete workflow from project browsing to automated test case creation and approval.

## Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: React Router v6
- **State Management**: React Query (TanStack Query) for server state
- **UI Components**: Radix UI with Tailwind CSS styling
- **Build Tool**: Vite
- **Deployment**: Static hosting (Netlify/Vercel compatible)

### Backend Services
- **Supabase**: Database and Edge Functions
- **OpenProject**: Project management system
- **n8n**: Workflow automation platform
- **Lovable AI**: Test case generation (via Supabase function)

## Application Flow (End-to-End)

### 1. Initial Setup
```
User visits application → Redirects to /projects → No settings found → Redirects to /settings → User configures OpenProject credentials
```

### 2. Main Workflow
```
Settings configured → Projects page → Fetch projects → User selects project → Tickets page → Fetch work packages → User selects ticket → Ticket detail page → Generate test cases → Approve/Reject test cases
```

### 3. API Flow Architecture
```
Frontend ←JSON-RPC→ Supabase Edge Function ←HTTP Basic Auth→ OpenProject API
Frontend ←HTTP→ n8n Webhooks (test case generation & approval)
```

## OpenProject Integration

### Proxy Implementation
The application uses a serverless proxy (`supabase/functions/openproject-proxy/index.ts`) to securely connect to OpenProject instances without exposing API credentials to the frontend.

**Proxy Function Details:**
- **Input**: `apiUrl`, `apiToken`, `path`
- **Authentication**: Basic Auth with format `apikey:{apiToken}`
- **CORS**: Enabled for frontend access
- **Error Handling**: Comprehensive error responses with OpenProject API error details

### API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v3/projects` | GET | List all accessible projects |
| `/api/v3/projects/:id` | GET | Get detailed project information |
| `/api/v3/projects/:id/work_packages` | GET | List tickets/work packages for a project |
| `/api/v3/work_packages/:id` | GET | Get detailed ticket/work package information |

**Data Structures:**
- **Projects**: Include `id`, `identifier`, `name`, `description`, `active` status
- **Work Packages**: Include `id`, `subject`, `description`, `status`, `priority`, `assignee`, timestamps

### Configuration
```json
// Stored in localStorage as "openproject_settings"
{
  "apiUrl": "https://dev-openproject.inside10d.com",
  "email": "user@example.com", // Optional, for reference
  "apiToken": "your_api_token_here" // Required
}
```

## n8n Integration

### Webhook Endpoints

| Webhook URL | Purpose | Payload | Response |
|-------------|---------|---------|----------|
| `https://n8n.inside10d.com/webhook/75409c62-f8c5-49e0-8329-23585fcfc9ba` | Generate test cases | `{ "id": ticketId }` | `{ "output": [{ "title": "...", "description": "..." }] }` |
| `https://n8n.inside10d.com/webhook/75fd5ddb-6bff-484a-bd69-b9a048b34aa5` | Approve test case | Complex approval payload | Approval data for chaining |
| `https://n8n.inside10d.com/webhook/openproject-new-ticket` | Create new ticket | Chained approval data | Creates new OpenProject ticket |

### Workflow Integration

#### Test Case Generation Flow:
```
Ticket selected → Click "Generate Test Cases" → Call n8n webhook with ticket ID → AI generates test scenarios → Transform and display in UI
```

#### Test Case Approval Flow:
```
Test case approved → Call approval webhook → Process data → Chain to new ticket webhook → Create OpenProject ticket with approved test case
```

### n8n Workflow Structure
Based on the webhook interactions, the n8n workflow appears to:

1. **Receive ticket ID** (generation webhook)
2. **Fetch ticket details** from OpenProject API
3. **Use AI to generate test cases** based on ticket content
4. **Return structured test case data**

For approval:
1. **Process approval request** with test case metadata
2. **Create new OpenProject work package** representing the approved test case
3. **Update internal tracking systems**

## Supabase Edge Functions

### Available Functions

#### 1. `openproject-proxy`
**Purpose**: Secure proxy for OpenProject API calls
**Location**: `supabase/functions/openproject-proxy/index.ts`
**Invoked by**: All frontend OpenProject operations

#### 2. `generate-test-cases`
**Purpose**: AI-powered test case generation using Lovable API
**Location**: `supabase/functions/generate-test-cases/index.ts`
**Invoked**: Currently unused in frontend (TicketDetail uses direct n8n calls)

### Configuration
```toml
# supabase/config.toml
[functions.openproject-proxy]
verify_jwt = false  # Public access for proxy
```

## Frontend Components

### Main Pages

#### Settings (`/settings`)
- Configure OpenProject URL, email, and API token
- Stores configuration in localStorage
- Shows setup instructions for API token creation

#### Projects (`/projects`)
- Displays grid of accessible projects
- Fetches via proxy: `/api/v3/projects`
- Search and filter functionality
- Links to individual project ticket views

#### Tickets (`/projects/:projectId/tickets`)
- Shows work packages for selected project
- Fetches via proxy: `/api/v3/projects/:id/work_packages`
- Table view with status, priority, assignee filters
- Links to detail views

#### TicketDetail (`/projects/:projectId/tickets/:ticketId`)
- Detailed work package view
- Fetches via proxy: `/api/v3/work_packages/:id`
- Integrated test case generation and approval system

### Key Features

#### Test Case Management
- Generate AI-powered test cases via n8n workflows
- Approve/reject workflow with OpenProject ticket creation
- Status tracking (Pending, Approved, Rejected)

#### User Experience
- Responsive design with mobile support
- Loading states and error handling
- Toast notifications for user feedback
- Dark mode support via Tailwind

## Security Considerations

### Credentials Handling
- OpenProject credentials stored in browser localStorage
- API calls proxied through Supabase Edge Functions
- No sensitive data exposed to frontend logs

### API Security
- Basic Auth tokens transmitted in request bodies to proxy
- CORS properly configured for frontend domains
- Request timeouts implemented (10 minutes for n8n calls)

## Deployment and Configuration

### Environment Variables
```env
VITE_SUPABASE_URL=https://vfzhxikyqeevmtxnfjwz.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGci...
```

### Supabase Configuration
- JWT verification disabled for proxy function
- Edge functions deployed globally
- Database: Supabase (types defined in `types.ts`)

### n8n Configuration
- Hosted instance at `https://n8n.inside10d.com`
- Three webhook endpoints configured
- AI integration for test case generation

## Development Setup

### Prerequisites
- Node.js 18+
- Supabase CLI
- OpenProject instance with API access
- n8n instance with configured workflows

### Installation
```bash
npm install
npm run dev  # Development server
npm run build  # Production build
```

### Supabase Functions
```bash
supabase functions deploy openproject-proxy
supabase functions deploy generate-test-cases
```

## API Integration Example

### Fetching Projects (Frontend)
```javascript
const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/openproject-proxy`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    apiUrl: settings.apiUrl,
    apiToken: settings.apiToken,
    path: "/api/v3/projects"
  })
});
```

### Generating Test Cases (n8n Integration)
```javascript
const response = await fetch("https://n8n.inside10d.com/webhook/75409c62-f8c5-49e0-8329-23585fcfc9ba", {
  method: "POST",
  body: JSON.stringify({ id: ticketId })
});
```

## Troubleshooting

### Common Issues

#### OpenProject Connection
- Verify API token permissions
- Check URL format (no trailing slash)
- Ensure instance allows API access

#### n8n Webhooks
- Confirm webhook URLs are active
- Check payload formats
- Verify timeout handling (10 minutes implemented)

#### Supabase Functions
- Check function deployment status
- Verify CORS headers
- Monitor function logs for errors

## Future Enhancements

1. **Authentication**: User authentication beyond localStorage
2. **Database Integration**: Store test cases and approvals in Supabase
3. **Enhanced Workflows**: More n8n integrations (notifications, CI/CD)
4. **Bulk Operations**: Multi-ticket test case generation
5. **Reporting**: Analytics and test coverage reports
6. **Real-time Updates**: WebSocket connections for live updates

---

*This documentation covers the complete application flow, proxy implementation, API integrations, and step-by-step workflow processes for the Open-Nav-Insight QA automation platform.*
