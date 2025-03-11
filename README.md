# StartupExel

StartupExel is an AI-powered platform that guides entrepreneurs through the startup journey from ideation to growth. It provides tools for business planning, prototype development, financial modeling, and growth tracking, along with AI assistants that offer expertise across various domains.

![StartupExel Dashboard](https://via.placeholder.com/800x400?text=StartupExel+Dashboard)

## Features

- **Business Planning Tools**: Create comprehensive business plans with AI assistance
- **AI-CTO**: Transform business requirements into functional prototypes without technical co-founders
- **AI-CFO**: Generate financial projections, monitor runway, and prepare for funding
- **AI-CMO**: Develop marketing strategies and content with data-driven insights
- **Legal AI**: Create necessary legal documents and ensure compliance
- **Funding Tools**: Prepare for fundraising and track investor relationships
- **Growth Analytics**: Monitor traction and key business metrics
- **Mentorship Network**: Connect with advisors and mentors in your industry

## Technology Stack

- **Frontend**: Next.js, React, TailwindCSS
- **State Management**: Zustand + React Query
- **Backend**: Node.js (Express)
- **Database**: PostgreSQL
- **API**: RESTful with TypeScript types
- **AI Integrations**: OpenAI, Bolt.new

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or pnpm
- PostgreSQL database

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/exel/startup-exel.git
   cd startup-exel
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your PostgreSQL connection string and API keys

4. Run database migrations
   ```bash
   npm run migrate
   # or
   pnpm migrate
   ```

5. Start the development server
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js | Yes |
| `OPENAI_API_KEY` | OpenAI API key for AI assistants | Yes |
| `BOLT_API_KEY` | Bolt.new API key for prototype generation | Yes |
| `NEXT_PUBLIC_APP_URL` | Base URL for the application | Yes |

## Project Structure

```
startup-exel/
├── public/                # Static assets
├── src/
│   ├── app/               # Next.js App Router pages
│   ├── components/        # React components
│   │   ├── ui/            # Base UI components
│   │   ├── features/      # Feature-specific components
│   │   └── layout/        # Layout components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── services/          # External service integrations
│   │   ├── ai/            # AI assistant services
│   │   ├── auth/          # Authentication
│   │   └── api/           # API client
│   ├── styles/            # Global styles
│   └── types/             # TypeScript type definitions
├── prisma/                # Database schema and migrations
│   ├── schema.prisma      
│   └── migrations/     
├── scripts/               # Utility scripts
├── tests/                 # Test files
├── .env.example           # Example environment variables
├── .eslintrc.js           # ESLint configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## Development Workflow

### Branch Naming

- `feature/feature-name` - For new features
- `fix/issue-description` - For bug fixes
- `chore/task-description` - For maintenance tasks

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
feat: add AI-CFO financial projection tool
fix: correct calculation in runway estimation
docs: update README with new setup instructions
```

### Testing

Run tests:
```bash
npm run test
# or
pnpm test
```

### Linting

Check code quality:
```bash
npm run lint
# or
pnpm lint
```

## Deployment

The application is deployed using Vercel. Commits to the `main` branch trigger automatic deployments to production. Preview deployments are created for pull requests.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## API Documentation

API documentation is available at `/api/docs` when running the development server.

## Integration with Exel Ecosystem

StartupExel is part of the broader Exel ecosystem, which includes:

- **JobExel**: Career development for professionals
- **UniExel**: Academic and early career guidance for students  
- **ExelBusiness**: Business solutions for enterprises

Integration points include shared authentication, user profiles, and cross-product data sharing where relevant.

## License

This project is proprietary and confidential. Unauthorized copying, transfer, or reproduction of the contents is strictly prohibited.

## Support

For support, please contact the development team at dev@exel.com or open an issue in this repository.