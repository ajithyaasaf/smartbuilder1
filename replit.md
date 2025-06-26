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

## Complete Project Analysis - Smart Builders & Developers Website

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
- Brand name: "Smart Builders & Developers" 
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
- January 25, 2025: Implemented senior-level responsive design standards across all pages and components with extra-small (xs) breakpoint support, mobile-first optimization, and production-quality accessibility features
- January 25, 2025: Enhanced Tailwind configuration with comprehensive breakpoint system (xs: 475px, sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px)
- January 25, 2025: Applied advanced responsive design to navigation, hero sections, forms, buttons, and interactive elements with touch-friendly sizing and optimal spacing
- January 25, 2025: Significantly enhanced GSAP animations throughout project with advanced visual effects including image reveals, staggered cards, counter animations, background parallax, scroll indicators, typewriter text, morphing shapes, and service tabs
- January 25, 2025: Enhanced Services page with professional project images and improved 3-column layout for better visual presentation
- January 25, 2025: Fixed image fitting issues in "Our Specialties" section by switching to CSS background images for perfect container coverage without white space
- January 25, 2025: Added professional images to "Our Specialties" section on home page - residential projects, independent villas, luxury apartments, and mini apartments with hover effects and gradient overlays
- January 25, 2025: Fixed toast notification timing issues in all forms by removing specific time indicators ("30 minutes", "24 hours") and replacing with "soon"
- January 25, 2025: Added company branding "Smart Builders & Developers" to header navigation across all pages for consistent brand visibility
- January 25, 2025: Updated company address to actual location: 23/72, Ramnagar, 3rd Street, Bypass Rd, S S Colony, Madurai, Tamil Nadu 625016
- January 25, 2025: Completed comprehensive company rebranding from "BuildMasters" to "Smart Builders & Developers" across all files including pages, SEO schemas, admin credentials, sitemap, robots.txt, and metadata
- January 25, 2025: Updated all pages (Home, Services, Gallery, Footer) to reflect correct 22+ years timeline and M Rajan's founding date of 2002
- January 25, 2025: Updated About page timeline and content to accurately reflect M Rajan's professional journey from 1996-2024
- January 25, 2025: Enhanced About page with comprehensive M Rajan founder profile including education, professional memberships, and detailed experience
- January 25, 2025: Updated About and Services page buttons to show brand color by default instead of only on hover
- January 25, 2025: Restored all GSAP animations across all pages while optimizing navigation performance (50ms timeouts)
- January 25, 2025: Successfully completed migration from Replit Agent to standard Replit environment  
- January 25, 2025: Fixed Footer buttons with proper click handlers for phone and contact functionality
- January 25, 2025: Implemented live site visit counter with session tracking and admin reset functionality
- January 25, 2025: Updated admin dashboard export functionality to generate Excel files instead of JSON
- January 25, 2025: Successfully migrated project from Replit Agent to standard Replit environment
- January 25, 2025: Implemented complete admin dashboard with in-memory storage system
- January 25, 2025: Added form submission tracking for Contact, Quick Inquiry, Site Visit, and EMI Calculator
- January 25, 2025: Created admin login system with credentials (admin/smartbuilders2025)
- January 25, 2025: Built real-time dashboard with stats, search, filter, and JSON export functionality
- January 25, 2025: Removed timeline section from About page as requested
- January 25, 2025: Restructured website to 5 main pages: Home, About, Services, Contact, Gallery
- January 25, 2025: Removed old individual service pages (Apartments, Villas, etc.) and consolidated into Services page
- January 25, 2025: Created comprehensive About page with company story, timeline, values, and leadership team
- January 25, 2025: Built Services page with tabbed interface showcasing all 5 service categories
- January 25, 2025: Developed Contact page with multiple contact forms, office locations, and FAQ section
- January 25, 2025: Added creative Gallery page with categorized portfolio, project stats, and visual showcase
- January 25, 2025: Updated navigation across all pages to reflect new structure
- January 25, 2025: Implemented GSAP animations with robust error handling and DOM readiness checks
- January 24, 2025: Updated primary brand color to #b48b2f (gold) throughout application
- January 24, 2025: Created centralized forms structure with 4 form components
- January 15, 2025: Complete project analysis and migration completed

## Current Site Structure (5 Pages)
**Main Navigation**: Home, About, Services, Contact, Gallery

**Page Architecture**:
- **Home**: Hero section, company overview, service highlights, statistics, testimonials, CTA
- **About**: Company story, timeline of milestones, core values, leadership team, awards & recognition  
- **Services**: Tabbed interface for all 5 services (Residential, Apartments, Villas, Mini Apartments, Land Promoters), process steps, why choose us
- **Contact**: Multiple contact forms, office locations, FAQ section, emergency support
- **Gallery**: Portfolio showcase with categories (completed, ongoing, process, awards), project stats, virtual tours

**Forms Architecture**:
**Centralized Location**: `client/src/components/forms/`
- **ContactForm**: Comprehensive contact form with project type, budget, and detailed message
- **QuickInquiryForm**: Simplified callback request form for instant contact  
- **SiteVisitForm**: Scheduled visit booking with date/time selection and visitor count
- **EMICalculatorForm**: Interactive loan calculator with sliders and instant results

**Integration**: Forms distributed across Contact page with appropriate context

## Admin Dashboard System

**Access**: `/admin` route with login credentials
- Username: `admin`
- Password: `smartbuilders2025`

**File-Based Storage System**:
- **Storage Location**: JSON files in `/users` directory + Memory for fast access
- **Data Persistence**: Permanent storage as individual JSON files
- **Auto-loading**: Submissions loaded from files on server startup
- **Dual Storage**: Memory for speed + Files for persistence
- **Capacity**: Perfect for 30 submissions/month volume
- **Real-time Access**: Instant availability in admin dashboard
- **Backup**: JSON export functionality + individual file backups
- **Performance**: Extremely fast search and filtering

**Dashboard Components**:
- **Overview Stats**: Total submissions, breakdown by form type
- **Submissions Table**: Detailed view with contact information
- **Filter Options**: By form type (Contact, Quick Inquiry, Site Visit, EMI Calculator)
- **Search**: Full-text search across all submission data
- **Export**: Download all data as JSON file

**Technical Implementation**:
- Extended MemStorage class with form submission methods
- API endpoints: `/api/forms/submit`, `/api/admin/login`, `/api/admin/submissions`, `/api/admin/stats`
- All forms updated to send data to backend automatically
- Real-time data updates without database complexity

## User Preferences

Preferred communication style: Simple, everyday language.