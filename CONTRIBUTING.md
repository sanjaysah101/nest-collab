# Contributing to NestCollab

Thank you for your interest in contributing to NestCollab! This document provides guidelines and instructions for contributing to the project.

## 🤝 Code of Conduct

This project follows the [OWASP Code of Conduct](https://owasp.org/www-policy/operational/code-of-conduct). By participating, you are expected to uphold this code.

## 🎯 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (OS, browser, Node version)

### Suggesting Features

Feature suggestions are welcome! Please:

- **Check existing feature requests** first
- **Provide clear use case** and benefits
- **Explain implementation ideas** (if any)
- **Consider OWASP mission alignment**

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with clear messages**
6. **Push to your fork**
7. **Open a Pull Request**

## 💻 Development Setup

### Prerequisites

- Node.js 22+
- pnpm
- Git
- NEST_API_KEY from OWASP Nest

### Local Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/nest-collab
cd nest-collab

# Add upstream remote
git remote add upstream https://github.com/sanjaysah101/nest-collab

# Install dependencies
pnpm install

# Set up environment
cp .env.example .env.local
# Add your NEST_API_KEY to .env.local

# Run development server
pnpm dev
```

## 📝 Coding Standards

### TypeScript

- **Use TypeScript** for all new files
- **Define interfaces** for all data structures
- **Avoid `any` type** - use proper types
- **Export types** that might be reused

```typescript
// ✅ Good
interface Project {
  key: string;
  name: string;
  level: ProjectLevel;
}

// ❌ Bad
const project: any = { ... };
```

### React Components

- **Use functional components** with hooks
- **Follow naming conventions**: PascalCase for components
- **Keep components focused**: Single responsibility
- **Extract reusable logic** into custom hooks

```typescript
// ✅ Good
export default function ProjectCard({ project }: { project: Project }) {
  return <Card>...</Card>;
}

// ❌ Bad
export default function component(props: any) {
  return <div>...</div>;
}
```

### File Organization

```
src/
├── app/
│   ├── [resource]/
│   │   └── page.tsx          # Page component
│   └── api/
│       └── [resource]/
│           └── route.ts      # API route
├── components/
│   ├── [resource]-browser.tsx  # Browser component
│   └── ui/                     # Shared UI components
└── lib/
    └── utils.ts                # Utility functions
```

### Naming Conventions

- **Files**: kebab-case (`projects-browser.tsx`)
- **Components**: PascalCase (`ProjectsBrowser`)
- **Functions**: camelCase (`fetchProjects`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Interfaces**: PascalCase with `I` prefix optional (`Project` or `IProject`)

### Code Style

We use ESLint and Prettier for code formatting:

```bash
# Check linting
pnpm lint

# Fix linting issues
pnpm lint --fix

# Format code
pnpm format
```

### Component Pattern

Follow this pattern for browser components:

```typescript
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface Resource {
  // Define interface
}

export default function ResourceBrowser() {
  // 1. State
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  // 2. Data fetching
  const { data, error, isLoading } = useQuery({
    queryKey: ['resource', currentPage],
    queryFn: () => fetch(`/api/resource?page=${currentPage}`).then(r => r.json())
  });
  
  // 3. Derived state
  const items = data?.items || [];
  const filteredItems = items.filter(/* ... */);
  
  // 4. Render
  return (
    <section>
      {/* Search */}
      {/* Filters */}
      {/* Loading */}
      {/* Error */}
      {/* Results */}
      {/* Pagination */}
    </section>
  );
}
```

### API Route Pattern

```typescript
import { getNestHeaders, nestApiUrl } from "@/lib/nest-client";

export async function GET(request: Request) {
  try {
    // 1. Parse query params
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    
    // 2. Build API URL
    const url = new URL(nestApiUrl("/resource/"));
    url.searchParams.append("page", page);
    
    // 3. Fetch from OWASP Nest API
    const response = await fetch(url.toString(), {
      headers: getNestHeaders(),
      cache: "no-store",
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    // 4. Return data
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Error fetching resource:", error);
    return Response.json(
      { error: "Failed to fetch resource" },
      { status: 500 }
    );
  }
}
```

## 🧪 Testing

### Writing Tests

```typescript
// Example test structure
import { render, screen } from '@testing-library/react';
import ProjectsBrowser from './projects-browser';

describe('ProjectsBrowser', () => {
  it('renders projects list', () => {
    render(<ProjectsBrowser />);
    expect(screen.getByText('OWASP Projects')).toBeInTheDocument();
  });
  
  it('filters projects by level', () => {
    // Test implementation
  });
});
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

## 📚 Documentation

### Code Comments

- **Add JSDoc comments** for complex functions
- **Explain "why"** not "what"
- **Keep comments updated** with code changes

```typescript
/**
 * Fetches projects from OWASP Nest API with pagination and filtering
 * @param page - Page number (1-indexed)
 * @param level - Project level filter (optional)
 * @returns Paginated project data
 */
async function fetchProjects(page: number, level?: string) {
  // Implementation
}
```

### README Updates

When adding new features:

1. Update feature list in README.md
2. Add usage instructions
3. Update API endpoints list
4. Add to roadmap if incomplete

## 🔄 Git Workflow

### Branch Naming

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `refactor/` - Code refactoring
- `test/` - Test additions

Examples:
- `feature/add-releases-page`
- `fix/pagination-bug`
- `docs/update-api-docs`

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Tests
- `chore`: Maintenance

Examples:
```
feat(projects): add level filtering

Add ability to filter projects by level (Flagship, Production, etc.)
Includes UI updates and API route changes.

Closes #123
```

### Pull Request Process

1. **Update documentation** as needed
2. **Add tests** for new features
3. **Ensure all tests pass**
4. **Update CHANGELOG.md**
5. **Request review** from maintainers
6. **Address feedback**
7. **Squash commits** if requested

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Added new tests
- [ ] Manual testing completed

## Screenshots
(if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
```

## 🎨 UI/UX Guidelines

### Design Principles

1. **Consistency**: Follow existing patterns
2. **Accessibility**: WCAG 2.1 AA compliance
3. **Responsiveness**: Mobile-first approach
4. **Performance**: Optimize images and code

### Component Library

Use shadcn/ui components:

```typescript
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
```

### Styling

Use Tailwind CSS utilities:

```typescript
// ✅ Good
<div className="flex items-center gap-4 p-6">

// ❌ Bad
<div style={{ display: 'flex', padding: '24px' }}>
```

## 🚀 Release Process

### Version Numbering

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

### Release Checklist

- [ ] All tests pass
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version bumped in package.json
- [ ] Git tag created
- [ ] Deployed to production

## 📞 Getting Help

- **GitHub Issues**: For bugs and features
- **Discussions**: For questions and ideas
- **Email**: [maintainer email]
- **OWASP Slack**: #nest-api channel

## 🙏 Recognition

Contributors will be:

- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to NestCollab!** 🎉

Your efforts help make OWASP resources more accessible to the security community.