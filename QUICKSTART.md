# Quick Start Guide - NestCollab

Get NestCollab up and running in 5 minutes!

## 🚀 Prerequisites

Before you begin, ensure you have:

- ✅ **Node.js 22+** installed ([Download](https://nodejs.org/))
- ✅ **pnpm** package manager ([Install](https://pnpm.io/installation))
- ✅ **Git** for version control
- ✅ **OWASP Nest API Key** ([Get yours](https://nest.owasp.dev))

## 📦 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/sanjaysah101/nest-collab
cd nest-collab
```

### Step 2: Install Dependencies

```bash
pnpm install
```

This will install all required packages including:

- Next.js 16
- React 19
- TanStack Query
- Tailwind CSS v4
- shadcn/ui components
- And more...

### Step 3: Configure Environment

Create a `.env.local` file in the root directory:

```bash
# Create environment file
touch .env.local
```

Add your OWASP Nest API key:

```env
NEST_API_KEY=your_api_key_here
```

> 💡 **Getting an API Key**: Visit [OWASP Nest](https://nest.owasp.dev) to obtain your free API key.

### Step 4: Run Development Server

```bash
pnpm dev
```

The application will start at `http://localhost:3000`

## 🎯 First Steps

### 1. Explore the Home Page

Navigate to `http://localhost:3000` to see:

- Hero section with project overview
- Feature highlights
- Call-to-action buttons

### 2. Browse Projects

Click **"Projects"** in the navigation to:

- View all OWASP projects
- Filter by project level (Flagship, Production, Lab, etc.)
- Search for specific projects
- Navigate through paginated results

### 3. Discover Members

Visit the **"Members"** page to:

- Browse OWASP community members
- Search by name, company, or location
- View member profiles and GitHub links

### 4. Find Local Chapters

Go to **"Chapters"** to:

- Discover OWASP chapters worldwide
- Filter by country
- Find local security communities

### 5. Check Upcoming Events

Navigate to **"Events"** to:

- See upcoming OWASP events
- Toggle between upcoming and past events
- Get event details and registration links

### 6. Explore Repositories

Visit **"Repositories"** to:

- Browse OWASP GitHub repositories
- View repository statistics (stars, forks, contributors)
- Find active projects to contribute to

### 7. Find Issues to Contribute

Go to **"Issues"** to:

- Browse open issues across OWASP projects
- Filter by state (open/closed)
- Find good first issues for beginners

### 8. View Sponsors

Check out **"Sponsors"** to:

- See organizations supporting OWASP
- Filter by sponsor tier
- Learn about sponsorship opportunities

## 🛠️ Development Commands

### Run Development Server

```bash
pnpm dev
```

Starts the development server with hot reload at `http://localhost:3000`

### Build for Production

```bash
pnpm build
```

Creates an optimized production build

### Start Production Server

```bash
pnpm start
```

Runs the production build (must run `pnpm build` first)

### Lint Code

```bash
pnpm lint
```

Checks code for linting errors

### Format Code

```bash
pnpm format
```

Formats code using Prettier

## 🎨 Customization

### Change Theme

The app supports light and dark themes. Click the theme toggle in the navigation bar to switch.

### Modify Styling

All styles use Tailwind CSS. Edit:

- `src/app/globals.css` for global styles
- Component files for component-specific styles

### Add New Features

1. Create new components in `src/components/`
2. Add new pages in `src/app/`
3. Create API routes in `src/app/api/`

## 🐛 Troubleshooting

### Port Already in Use

If port 3000 is already in use:

```bash
# Use a different port
pnpm dev -- -p 3001
```

### API Key Issues

If you see "NEST_API_KEY is not set":

1. Check `.env.local` exists in root directory
2. Verify the API key is correct
3. Restart the development server

### Dependencies Issues

If you encounter dependency errors:

```bash
# Clear node_modules and reinstall
rm -rf node_modules
pnpm install
```

### Build Errors

If build fails:

```bash
# Clear Next.js cache
rm -rf .next
pnpm build
```

## 📚 Next Steps

### Learn More

- 📖 Read the [Full Documentation](./README.md)
- 🏗️ Understand the [Architecture](./ARCHITECTURE.md)
- ✨ Explore all [Features](./FEATURES.md)
- 🤝 Learn how to [Contribute](./CONTRIBUTING.md)
- 🏆 View [Hackathon Submission](./HACKATHON.md)

### Explore the Code

Key files to explore:

- `src/app/page.tsx` - Home page
- `src/components/projects-browser.tsx` - Projects browser component
- `src/app/api/projects/route.ts` - Projects API route
- `src/lib/nest-client.ts` - OWASP Nest API client

### Make It Your Own

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## 🆘 Getting Help

Need assistance?

- 📖 Check the [README](./README.md)
- 🐛 [Open an issue](https://github.com/sanjaysah101/nest-collab/issues)
- 💬 Join discussions
- 📧 Contact maintainers

## 🎉 Success

You're now ready to explore and contribute to NestCollab!

---

**Happy Coding! 🚀**
