# NestCollab - Security Research Collaboration Platform

NestCollab is a modern web platform that connects security researchers, developers, and mentors through the OWASP Nest API. Discover security projects, find collaborators, and engage with a thriving community of security professionals.

## Features

- **Project Discovery** - Browse and search 1000+ OWASP security projects with advanced filtering
- **Contributors Directory** - Find security experts by role, expertise, and contributions
- **Community Forum** - Engage in real-time discussions organized by topics
- **Advanced Search** - Powerful search with multi-tag filtering and sorting options
- **Real-time Data** - Live integration with OWASP Nest API for up-to-date content
- **Responsive Design** - Mobile-first design that works seamlessly on all devices

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Data Fetching**: SWR for client-side caching and synchronization
- **API Integration**: OWASP Nest TypeScript SDK
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm
- NEST_API_KEY (from OWASP Nest platform)

### Installation

1. Clone the repository

```bash
git clone https://github.com/sanjaysah101/nest-collab
cd nest-collab
```

2. Install dependencies

```bash
pnpm add
```

3. Set up environment variables in the Vars section:

```
NEST_API_KEY=your_api_key_here
```

4. Run the development server

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Browse Projects

1. Navigate to the Projects page from the header
2. Use the search bar to find specific projects
3. Filter by topics and expertise areas
4. Click on a project card to view details

### Find Contributors

1. Go to the Contributors Directory
2. Search by name, role, or expertise
3. View contributor profiles and statistics
4. Connect and collaborate

### Participate in Discussions

1. Visit the Discussion Forum
2. Browse conversations by category
3. Start new discussions
4. Engage with the community

### Advanced Search

1. Go to the Search page
2. Use multiple filters (topics, types, expertise)
3. Sort by relevance, popularity, or recency
4. Explore results

## Environment Variables

| Variable     | Required | Description                                |
| ------------ | -------- | ------------------------------------------ |
| NEST_API_KEY | Yes      | Your OWASP Nest API key for authentication |

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com)
3. Connect your GitHub repository
4. Add environment variables in Project Settings
5. Deploy!

```bash

# Or deploy via CLI

vercel
```

## Development

### Building for Production

```bash
pnpm build
pnpm start
```

### Code Formatting

```bash
pnpm lint
```

## API Integration

NestCollab uses the OWASP Nest TypeScript SDK to fetch data. The integration is configured in `lib/nest-client.ts`:

```typescript
import { Nest } from "owasp-nest";

const nestClient = new Nest({
  apiKey: process.env.NEST_API_KEY ?? "",
});
```

All API routes use the client to fetch and transform data before sending to the frontend.

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Performance & Optimization

- **SWR Caching**: Client-side data caching reduces API calls
- **Debounced Search**: Search queries are debounced to minimize API requests
- **Image Optimization**: Next.js Image component for optimized loading
- **Code Splitting**: Route-based code splitting for faster initial load

## Security

- API keys are stored as secure environment variables
- All API routes validate requests
- Input sanitization for search queries
- CORS configured for secure cross-origin requests

## Troubleshooting

### "NEST_API_KEY is not set"

- Add `NEST_API_KEY` to the Vars section in the .env file
- Restart the development server

### Projects not loading

- Verify your NEST_API_KEY is valid
- Check browser console for API errors
- Ensure you have network connectivity

### Search not returning results

- Try broader search terms
- Check that filters are not too restrictive
- Verify API is responding with data

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or feedback:

- Open an issue on GitHub
- Visit the [OWASP Nest Documentation](https://nest.owasp.dev)
- Check the [TypeScript SDK Repository](https://github.com/owasp/nest-sdk-typescript)

## Roadmap

- Real-time notifications for project updates
- User authentication and profiles
- Project recommendation engine
- Team collaboration features
- Advanced analytics dashboard
- Mobile app

## Acknowledgments

- OWASP for the Nest API and data
- Next.js and React communities
- shadcn/ui for excellent components
- All contributors and community members

**Built with ❤️ for the security research community**
