# CLAUDE.md - Project Guide

## Build Commands
- `npm run dev` - Start development server
- `npm run build` - Build production site to ./dist/
- `npm run preview` - Preview build locally
- `npm run astro` - Run Astro CLI commands

## Code Style Guidelines
- **TypeScript**: Uses strict type checking (extends "astro/tsconfigs/strict")
- **Imports**: Use named imports where possible
- **Components**: Use .astro files for templating
- **Naming**: PascalCase for components, camelCase for utilities
- **CSS**: Modular CSS structure in src/styles/modules/
- **Error Handling**: Use type-safe error handling
- **Project Structure**:
  - Components in src/components/
  - Page templates in src/pages/
  - Utilities in src/util/
  - Data sources in src/data/

## File Structure
Follows standard Astro project organization with TypeScript support.