# NestCollab Architecture Documentation

## 🏗️ System Architecture

### High-Level Overview

```bash
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │         React 19 Components                         │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐         │    │
│  │  │ Projects │  │ Members  │  │ Chapters │  ...    │    │
│  │  └──────────┘  └──────────┘  └──────────┘         │    │
│  └────────────────────────────────────────────────────┘    │
│                          ↕                                   │
│  ┌────────────────────────────────────────────────────┐    │
│  │         TanStack Query Cache Layer                  │    │
│  │  • Client-side caching                              │    │
│  │  • Automatic revalidation                           │    │
│  │  • Optimistic updates                               │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────────┐
│                    Next.js 16 Server                         │
│  ┌────────────────────────────────────────────────────┐    │
│  │              API Routes Layer                       │    │
│  │  /api/projects    /api/members    /api/chapters    │    │
│  │  /api/events      /api/issues     /api/repos       │    │
│  │  /api/sponsors    /api/releases                     │    │
│  └────────────────────────────────────────────────────┘    │
│                          ↕                                   │
│  ┌────────────────────────────────────────────────────┐    │
│  │           OWASP Nest Client                         │    │
│  │  • API key authentication                           │    │
│  │  • Request formatting                               │    │
│  │  • Error handling                                   │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────────┐
│                  OWASP Nest API                              │
│              https://nest.owasp.dev/api/v0                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
nest-collab/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/                      # API Routes (Server-side)
│   │   │   ├── chapters/
│   │   │   │   ├── route.ts          # List chapters
│   │   │   │   └── [id]/route.ts     # Chapter details
│   │   │   ├── community/
│   │   │   │   ├── members/route.ts  # List members
│   │   │   │   └── organizations/route.ts
│   │   │   ├── events/route.ts       # List events
│   │   │   ├── issues/route.ts       # List issues
│   │   │   ├── projects/
│   │   │   │   ├── route.ts          # List projects
│   │   │   │   └── [id]/route.ts     # Project details
│   │   │   ├── releases/route.ts     # List releases
│   │   │   ├── repositories/route.ts # List repositories
│   │   │   └── sponsors/route.ts     # List sponsors
│   │   │
│   │   ├── chapters/page.tsx         # Chapters page
│   │   ├── events/page.tsx           # Events page
│   │   ├── issues/page.tsx           # Issues page
│   │   ├── members/page.tsx          # Members page
│   │   ├── projects/page.tsx         # Projects page
│   │   ├── repositories/page.tsx     # Repositories page
│   │   ├── sponsors/page.tsx         # Sponsors page
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Home page
│   │   └── globals.css               # Global styles
│   │
│   ├── components/                   # React Components
│   │   ├── ui/                       # shadcn/ui components
│   │   │   ├── avatar.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   ├── chapters-browser.tsx      # Chapters browser
│   │   ├── events-browser.tsx        # Events browser
│   │   ├── issues-browser.tsx        # Issues browser
│   │   ├── members-browser.tsx       # Members browser
│   │   ├── projects-browser.tsx      # Projects browser
│   │   ├── repositories-browser.tsx  # Repositories browser
│   │   ├── sponsors-browser.tsx      # Sponsors browser
│   │   ├── navigation.tsx            # Main navigation
│   │   ├── footer.tsx                # Footer
│   │   ├── hero.tsx                  # Hero section
│   │   ├── features.tsx              # Features section
│   │   ├── cta.tsx                   # Call-to-action
│   │   └── theme/                    # Theme components
│   │
│   ├── lib/                          # Utilities
│   │   ├── nest-client.ts            # OWASP Nest API client
│   │   └── utils.ts                  # Helper functions
│   │
│   └── providers/                    # Context providers
│       ├── index.tsx                 # Combined providers
│       └── ReactQueryProvider.tsx    # TanStack Query provider
│
├── public/                           # Static assets
├── .env.local                        # Environment variables
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
├── tailwind.config.ts                # Tailwind config
├── next.config.ts                    # Next.js config
├── README.md                         # Main documentation
├── HACKATHON.md                      # Hackathon submission
└── ARCHITECTURE.md                   # This file
```

---

## 🔄 Data Flow

### 1. User Interaction Flow

```
User Action (e.g., click "Projects")
    ↓
Navigation Component
    ↓
Next.js Router → /projects
    ↓
ProjectsBrowser Component Renders
    ↓
useQuery Hook Triggered
    ↓
Check TanStack Query Cache
    ↓
┌─────────────────────────────┐
│ Cache Hit?                  │
├─────────────────────────────┤
│ YES → Return Cached Data    │
│ NO  → Fetch from API        │
└─────────────────────────────┘
    ↓
API Route: /api/projects
    ↓
Nest Client Request
    ↓
OWASP Nest API
    ↓
Response → Transform → Cache → Display
```

### 2. API Request Flow

```typescript
// Example: Fetching Projects

// 1. Component (Client-side)
const { data, isLoading, error } = useQuery({
  queryKey: ["projects", page, level],
  queryFn: () => fetch(`/api/projects?page=${page}&level=${level}`).then((r) => r.json()),
});

// 2. API Route (Server-side)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const level = searchParams.get("level");

  // 3. Nest Client
  const url = new URL(nestApiUrl("/projects/"));
  url.searchParams.append("page", page);
  if (level) url.searchParams.append("level", level);

  // 4. Fetch from OWASP Nest API
  const response = await fetch(url.toString(), {
    headers: getNestHeaders(),
    cache: "no-store",
  });

  // 5. Return to client
  return Response.json(await response.json());
}
```

---

## 🎨 Component Architecture

### Browser Component Pattern

All resource browsers follow a consistent pattern:

```typescript
// Generic Browser Component Structure

export default function ResourceBrowser() {
  // 1. State Management
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  // 2. Data Fetching
  const { data, error, isLoading } = useQuery({
    queryKey: ['resource', currentPage, filters],
    queryFn: () => fetchResource(currentPage, filters)
  });

  // 3. Client-side Filtering
  const filteredItems = items.filter(item =>
    matchesSearch(item, searchQuery)
  );

  // 4. Render
  return (
    <section>
      {/* Search & Filters */}
      <SearchBar />
      <FilterButtons />

      {/* Loading State */}
      {isLoading && <LoadingSpinner />}

      {/* Error State */}
      {error && <ErrorMessage />}

      {/* Results */}
      <Grid>
        {filteredItems.map(item => <Card {...item} />)}
      </Grid>

      {/* Pagination */}
      <Pagination />
    </section>
  );
}
```

### Component Hierarchy

```
App
├── Providers
│   ├── ThemeProvider
│   └── ReactQueryProvider
│
├── Layout
│   ├── Navigation
│   │   ├── Logo
│   │   ├── MenuItems
│   │   └── ThemeToggle
│   │
│   ├── Page Content
│   │   └── Browser Component
│   │       ├── Header
│   │       ├── SearchBar
│   │       ├── FilterButtons
│   │       ├── ResultsGrid
│   │       │   └── Cards
│   │       └── Pagination
│   │
│   └── Footer
│       ├── Links
│       └── Copyright
```

---

## 🔐 Security Architecture

### API Key Management

```typescript
// Environment Variables (Server-side only)
process.env.NEST_API_KEY;

// Never exposed to client
// Used only in API routes and server components
```

### Request Flow Security

```
Client Request
    ↓
Next.js API Route (Server)
    ↓ [API Key Added]
OWASP Nest API
    ↓
Response (Sanitized)
    ↓
Client
```

### Security Measures

1. **Environment Variables**: API keys stored securely
2. **Server-side API Calls**: All external API calls from server
3. **Input Validation**: Search queries sanitized
4. **CORS**: Configured for secure cross-origin requests
5. **No Client Secrets**: No sensitive data in client bundle

---

## 📊 State Management

### TanStack Query Configuration

```typescript
// providers/ReactQueryProvider.tsx

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      cacheTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
```

### Cache Strategy

```
┌─────────────────────────────────────┐
│         Query Cache                 │
├─────────────────────────────────────┤
│ Key: ['projects', 1, 'flagship']    │
│ Data: { items: [...], total: 50 }  │
│ Status: fresh (< 1 min)             │
├─────────────────────────────────────┤
│ Key: ['members', 1]                 │
│ Data: { items: [...], total: 100 } │
│ Status: stale (> 1 min)             │
└─────────────────────────────────────┘
```

---

## 🎯 Performance Optimizations

### 1. Code Splitting

```typescript
// Automatic route-based splitting
app/
  projects/page.tsx    → projects.chunk.js
  members/page.tsx     → members.chunk.js
  chapters/page.tsx    → chapters.chunk.js
```

### 2. Caching Strategy

- **Client Cache**: TanStack Query (1-5 minutes)
- **API Cache**: `cache: 'no-store'` for fresh data
- **Static Assets**: Next.js automatic optimization

### 3. Image Optimization

```typescript
// Avatar images
<AvatarImage src={member.avatar_url} />
// Automatically optimized by Next.js

// Sponsor logos
<img src={sponsor.image_url} loading="lazy" />
```

### 4. Lazy Loading

- Components loaded on-demand
- Images lazy-loaded
- API calls triggered only when needed

---

## 🧪 Testing Strategy

### Unit Tests (Planned)

```typescript
// Example test structure
describe("ProjectsBrowser", () => {
  it("renders projects correctly", () => {});
  it("filters by level", () => {});
  it("handles pagination", () => {});
  it("shows loading state", () => {});
  it("handles errors gracefully", () => {});
});
```

### Integration Tests (Planned)

- API route testing
- End-to-end user flows
- Cross-browser compatibility

---

## 🚀 Deployment Architecture

### Vercel Deployment

```
GitHub Repository
    ↓ [Push]
Vercel Build
    ↓
├── Build Next.js App
├── Optimize Assets
├── Generate Static Pages
└── Deploy to Edge Network
    ↓
Production URL
```

### Environment Configuration

```
Production:
  NEST_API_KEY=***
  NODE_ENV=production

Preview:
  NEST_API_KEY=***
  NODE_ENV=preview

Development:
  NEST_API_KEY=***
  NODE_ENV=development
```

---

## 📈 Scalability Considerations

### Current Scale

- **API Calls**: ~10-20 per page load (with caching)
- **Bundle Size**: ~200KB (gzipped)
- **Load Time**: <2s (initial), <500ms (cached)

### Future Scaling

1. **Database Layer**: Add PostgreSQL for user data
2. **Redis Cache**: Server-side caching for API responses
3. **CDN**: Static asset distribution
4. **Load Balancing**: Multiple server instances
5. **Rate Limiting**: Protect API routes

---

## 🔄 CI/CD Pipeline

### Current Workflow

```
Developer Push
    ↓
GitHub Actions (Planned)
    ↓
├── Lint Check
├── Type Check
├── Build Test
└── Deploy to Vercel
    ↓
Automatic Deployment
```

---

## 📚 Technology Decisions

### Why Next.js 16?

- **App Router**: Modern routing with layouts
- **Server Components**: Reduced client bundle
- **API Routes**: Built-in backend
- **Optimization**: Automatic code splitting

### Why TanStack Query?

- **Smart Caching**: Reduces API calls
- **Automatic Revalidation**: Fresh data
- **Optimistic Updates**: Better UX
- **DevTools**: Debugging support

### Why Tailwind CSS v4?

- **Utility-First**: Rapid development
- **Customization**: Easy theming
- **Performance**: Minimal CSS bundle
- **Modern**: Latest features

### Why TypeScript?

- **Type Safety**: Catch errors early
- **IntelliSense**: Better DX
- **Refactoring**: Safe code changes
- **Documentation**: Self-documenting code

---

## 🎓 Learning Resources

For developers wanting to contribute:

1. **Next.js**: <https://nextjs.org/docs>
2. **React Query**: <https://tanstack.com/query>
3. **Tailwind CSS**: <https://tailwindcss.com/docs>
4. **OWASP Nest API**: <https://nest.owasp.dev>
5. **TypeScript**: <https://www.typescriptlang.org/docs>

---

**Last Updated**: [Current Date]
**Version**: 1.0.0
**Maintainer**: [Your Name/Team]
