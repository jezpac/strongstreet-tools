# StrongStreet Tools - Internal Tools Suite

## Project Overview

This is an internal tools application built to streamline various business processes including truck route manifest generation, usage spreadsheet reconciliation, and other operational workflows. The application is designed as a multi-tool suite with a clean, professional interface suitable for internal team use.

**Technology Stack:**
- Frontend: Next.js 15 with App Router
- UI Framework: React 19
- Styling: Tailwind CSS 4
- Language: TypeScript
- Deployment: Cloudflare Workers via OpenNext
- Runtime: Node.js compatibility mode

## Architecture

### Frontend Structure
- **App Router**: File-based routing with `app/` directory
- **Layout**: Sidebar navigation with tool-specific pages (`app/layout.tsx`)
- **Components**: Client-side React components with TypeScript
- **Styling**: Tailwind CSS with utility-first approach

### Deployment Platform
- **Target**: Cloudflare Workers using OpenNext adapter
- **Assets**: Static assets served via Cloudflare Assets binding
- **Configuration**: `wrangler.jsonc` for worker configuration
- **Build**: OpenNext builds Next.js app for Workers runtime

### Current Tools
1. **Manifest Generation** (`/manifest-generation`): Truck delivery manifest generator
2. **Tool Placeholders**: 4 additional tool slots ready for implementation

## Development Commands

```bash
# Development
npm run dev              # Start development server with Turbopack
npm run build           # Build for production
npm run lint            # Run ESLint
npm run cf-typegen      # Generate Cloudflare types

# Deployment
npm run deploy          # Build and deploy to Cloudflare
npm run preview         # Build and preview locally
```

## Code Patterns & Conventions

### Tool Page Structure
Each tool should follow this pattern:

```typescript
// app/[tool-name]/page.tsx
"use client";

import { useState } from "react";

export default function ToolPage() {
  // State management
  const [file, setFile] = useState<File | null>(null);

  // Event handlers
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Tool logic here
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Instructions Section */}
      <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <h2 className="text-lg font-semibold text-blue-800">Instructions</h2>
        <p className="mt-2 text-sm text-blue-700">
          Tool-specific instructions here
        </p>
      </div>

      {/* Form/Content Section */}
      <form className="space-y-4 rounded-lg border bg-white p-6 shadow">
        {/* Form elements */}
      </form>
    </div>
  );
}
```

### Navigation Updates
When adding new tools, update the tools array in `app/layout.tsx`:

```typescript
const tools = [
  { name: "Manifest Generation", href: "/manifest-generation" },
  { name: "New Tool Name", href: "/new-tool-route" },
  // ... existing tools
];
```

### Styling Guidelines
- Use Tailwind utility classes consistently
- Follow the established color scheme: blue for primary actions, gray for neutral elements
- Maintain responsive design with proper spacing and typography
- Use `max-w-2xl mx-auto` for main content containers

## File Organization

```
app/
├── layout.tsx              # Main layout with sidebar navigation
├── page.tsx               # Homepage with tool overview
├── globals.css            # Global styles and Tailwind imports
├── manifest-generation/
│   └── page.tsx          # Manifest generation tool
└── [new-tool]/
    └── page.tsx          # New tool implementation

public/                    # Static assets
package.json              # Dependencies and scripts
next.config.ts            # Next.js configuration with OpenNext
wrangler.jsonc           # Cloudflare Workers configuration
tsconfig.json            # TypeScript configuration
```

## AI Assistant Guidelines

### When Adding New Tools:
1. Create new directory under `app/[tool-name]/`
2. Implement `page.tsx` following the established pattern
3. Update navigation in `app/layout.tsx`
4. Ensure TypeScript compliance
5. Test locally with `npm run dev`
6. Run linting with `npm run lint`

### Code Quality Standards:
- All components must be TypeScript with proper typing
- Use client-side components (`"use client"`) for interactive tools
- Follow React 19 patterns and hooks
- Maintain consistent error handling
- Use semantic HTML and accessible design patterns

### Deployment Process:
1. Test locally with `npm run dev`
2. Build and validate with `npm run build`
3. Preview deployment with `npm run preview`
4. Deploy to Cloudflare with `npm run deploy`

### Common Tasks:
- **File Upload Tools**: Use `<input type="file">` with state management
- **Form Processing**: Handle submissions with `preventDefault()` and validation
- **Data Export**: Implement download functionality for generated files
- **API Integration**: Use fetch for external data sources (if needed)

## Environment & Configuration

### Development Environment:
- Node.js with npm package management
- TypeScript strict mode enabled
- ESLint for code quality
- Tailwind CSS for styling

### Production Environment:
- Cloudflare Workers runtime
- OpenNext adapter for Next.js compatibility
- Asset optimization and caching
- Observability enabled in Wrangler configuration

### Environment Variables:
- Store sensitive data in Cloudflare secrets (not environment variables)
- Use `.dev.vars` for local development secrets
- Configure in `wrangler.jsonc` for production

## Troubleshooting

### Common Issues:
1. **Build Failures**: Check TypeScript errors and dependency compatibility
2. **Deployment Issues**: Verify Wrangler configuration and authentication
3. **Styling Issues**: Ensure Tailwind classes are properly applied and configured
4. **Route Problems**: Verify file-based routing in `app/` directory

### Debug Commands:
```bash
npm run lint            # Check code quality
npm run build          # Test production build
npm run cf-typegen     # Update Cloudflare types
```

## Future Enhancements

### Planned Features:
- Additional internal tools as business needs evolve
- Enhanced file processing capabilities
- Integration with external APIs
- User authentication (if required)
- Advanced data visualization tools

### Technical Improvements:
- Database integration (Cloudflare D1)
- Real-time features (WebSockets)
- Enhanced error handling and logging
- Performance optimization
- Automated testing suite

---

**Last Updated**: September 2025
**Maintained By**: Development Team
**Next Review**: As architecture evolves