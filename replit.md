# Full-Stack Web Application with React, Express, and PostgreSQL

## Overview

This is a modern full-stack web application built with React (frontend), Express.js (backend), and PostgreSQL (database). The project uses TypeScript throughout, Tailwind CSS for styling, and includes a comprehensive UI component library based on shadcn/ui. The application is configured for deployment on Replit with autoscaling capabilities.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Comprehensive component library based on Radix UI primitives and shadcn/ui

### Backend Architecture
- **Runtime**: Node.js 20 with Express.js framework
- **Language**: TypeScript with ES modules
- **API Structure**: RESTful API with `/api` prefix
- **Development**: Hot reloading with tsx for TypeScript execution
- **Storage Interface**: Abstracted storage layer with in-memory implementation

### Data Storage Solutions
- **Primary Database**: PostgreSQL 16 (configured via Drizzle)
- **Development Storage**: In-memory storage implementation for rapid prototyping
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Validation**: Zod integration with Drizzle for runtime validation

## Key Components

### Database Schema
- **Users Table**: Basic user management with username/password authentication
- **Schema Location**: `shared/schema.ts` for shared type definitions
- **Migration System**: Drizzle Kit for database migrations

### Frontend Components
- **UI Library**: 40+ pre-built components including forms, navigation, data display, and feedback components
- **Form Handling**: React Hook Form with Zod resolvers for validation
- **Design System**: Consistent theming with CSS custom properties
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Backend Services
- **Storage Abstraction**: Interface-based design allowing easy switching between storage implementations
- **Error Handling**: Centralized error handling middleware
- **Request Logging**: Comprehensive API request logging with response capture
- **Static File Serving**: Vite integration for serving frontend assets

## Data Flow

1. **Client Requests**: Frontend makes HTTP requests to `/api` endpoints
2. **Server Processing**: Express routes handle requests using the storage interface
3. **Data Persistence**: Storage layer abstracts database operations
4. **Response Handling**: TanStack Query manages client-side caching and updates
5. **UI Updates**: React components re-render based on state changes

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: PostgreSQL connection for serverless environments
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm**: Type-safe database operations
- **express**: Backend web framework

### UI and Styling Dependencies
- **@radix-ui/react-***: Unstyled, accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant API for components
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Frontend build tool and dev server
- **typescript**: Static type checking
- **esbuild**: Backend bundling for production

## Deployment Strategy

### Development Environment
- **Command**: `npm run dev`
- **Port**: 5000 (proxied to port 80 externally)
- **Hot Reloading**: Both frontend and backend support hot reloading
- **Database**: PostgreSQL 16 module in Replit environment

### Production Build
- **Frontend Build**: Vite builds optimized static assets
- **Backend Build**: esbuild bundles server code for Node.js
- **Output Directory**: `dist/` contains both frontend assets and server bundle
- **Start Command**: `npm run start` runs the production server

### Replit Configuration
- **Modules**: nodejs-20, web, postgresql-16
- **Deployment Target**: Autoscale for dynamic scaling
- **Port Mapping**: Internal port 5000 mapped to external port 80
- **Build Process**: Automated build on deployment

## Complete Project Analysis - BuildMasters Website

### Design System & Brand Identity
**Primary Brand Color**: `#17a6b8` (Teal blue)
- Used for: Logo, CTA buttons, active states, accents
- Hover states: `#148a9a` (darker teal)

**Typography**: Poppins font family throughout
- Headers: Bold, large sizes (64px main heading)
- Body text: Regular 16-18px
- Custom tracking: -1.50px for logo, -1.64px for main heading

**Color Palette**:
- Primary text: `#313131` (dark gray)
- Secondary text: `#6b6b6b` (medium gray)
- Background: White with light gray accents (`#c9e7ff` for decorative elements)
- Card backgrounds: `neutral-50`

### Component Architecture
**UI Components** (45+ components available):
- Navigation: NavigationMenu, Sheet (mobile menu)
- Layout: Card, Grid systems
- Interactive: Button (with variants), Form components
- Data display: Tables, Charts, Progress indicators
- Feedback: Toast, Alert, Dialog
- All based on Radix UI primitives for accessibility

**Button Design Pattern**:
- Unique rounded corners: `40px 5px 40px 5px`
- Multiple variants: primary, outline, ghost
- Custom shadows with brand colors
- Responsive sizing

### Layout & Responsive Design
**Grid System**: CSS Grid with Tailwind
- Mobile-first approach
- Breakpoints: sm, md, lg, xl, 2xl
- Main layout: Single column mobile, 2-column desktop

**Spacing System**:
- Consistent padding/margins using Tailwind spacing scale
- Large hero sections with breathing room
- Statistics section with proper visual hierarchy

### Key Sections Analysis
**Header/Navigation**:
- Brand name: "BuildMasters" 
- Navigation items: Home, About Us, Services, Project
- Mobile hamburger menu with slide-out panel
- Active state indicators with custom dots

**Hero Section**:
- Split layout: Content left, image right
- Compelling headline with brand color highlights
- Two CTA buttons: "Explore" (primary) and "Contact Us" (outline)
- Statistics showcase: Projects Done, Buildings Done, Total Employees

**Visual Elements**:
- Decorative background SVG elements
- Rounded decorative shapes with brand colors
- Building/construction imagery
- Partner logos section with grayscale/hover effects

### Technical Implementation
**Frontend Stack**:
- React 18 with TypeScript
- Wouter for routing
- TanStack Query for state management
- Tailwind CSS for styling
- Vite for build process

**Backend Stack**:
- Express.js with TypeScript
- PostgreSQL database ready
- Drizzle ORM for database operations
- RESTful API structure

**Deployment Ready**:
- Configured for Replit deployment
- Autoscale settings
- Production build process
- Environment variables support

## Changelog
- January 15, 2025: Complete project analysis and migration completed
- January 15, 2025: All components, design patterns, and architecture documented

## User Preferences

Preferred communication style: Simple, everyday language.