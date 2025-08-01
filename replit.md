# Full-Stack Web Application with React, Express, and PostgreSQL

## Overview
This project is a modern full-stack web application designed for "Smart Builders & Developers," a construction company. It provides a comprehensive online presence, showcasing their services, projects, and contact information. The application aims to streamline customer interactions, provide financial planning tools (EMI Calculator), and offer an administrative dashboard for managing inquiries. The business vision is to enhance the company's digital footprint, attract new clients, and efficiently manage customer data, reflecting 22+ years of expertise in the construction industry.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### UI/UX Decisions
- **Design System**: Built upon shadcn/ui, offering a comprehensive component library (40+ components).
- **Styling**: Tailwind CSS with a custom design system, utilizing `neutral-50` for card backgrounds and a primary brand color of `#17a6b8` (Teal blue) for accents, CTAs, and active states.
- **Typography**: Poppins font family throughout, with specific sizing and tracking for headers and body text.
- **Component Architecture**: Utilizes Radix UI primitives for accessibility. Features unique button designs with rounded corners (`40px 5px 40px 5px`) and custom shadows.
- **Responsive Design**: Mobile-first approach with Tailwind's comprehensive breakpoint system (xs, sm, md, lg, xl, 2xl).
- **Layout**: CSS Grid for flexible layouts, transitioning from single-column mobile to multi-column desktop.
- **Animations**: Ultra-simple fade-ins (0.2s) for smooth performance, optimized for mobile with GSAP.
- **Key Sections**: Features a hero section with a split layout, statistics showcase, and partner logos. Navigation includes Home, About Us, Services, and Project.

### Technical Implementations
- **Frontend**: React 18 with TypeScript, Vite for bundling, Wouter for lightweight client-side routing, and TanStack Query for server state management. React Hook Form with Zod resolvers for form validation.
- **Backend**: Node.js 20 with Express.js and TypeScript. RESTful API structure with `/api` prefix. Hot reloading enabled with `tsx`.
- **Database**: PostgreSQL 16 managed via Drizzle ORM for type-safe operations. Zod integrated for schema validation.
- **Storage Abstraction**: Interface-based design for storage, with an in-memory implementation for development and file-based JSON storage for admin dashboard data persistence, optimized for up to 30 submissions/month.
- **Error Handling**: Centralized middleware for API error handling.
- **Admin Dashboard**: Accessible via `/admin` with a simple login. Provides an overview of submissions, filtering, search, and JSON export functionality.

### Feature Specifications
- **Client-Side Routing**: Handled by Wouter for seamless navigation.
- **Form Management**: Centralized forms (Contact, Quick Inquiry, Site Visit, EMI Calculator) with validation and backend submission.
- **Image Modals**: Responsive image modal with keyboard navigation and cycling.
- **Interactive Map**: Google Maps integration on the Contact page for office location.
- **Gallery Page**: Pagination system (9 projects per page) with navigation.
- **Site Visit Counter**: Live counter with session tracking and admin reset.

## External Dependencies

- **@neondatabase/serverless**: PostgreSQL connection for serverless environments.
- **@tanstack/react-query**: Server state management and caching.
- **drizzle-orm**: Type-safe database operations.
- **express**: Backend web framework.
- **@radix-ui/react-***: Unstyled, accessible UI primitives.
- **tailwindcss**: Utility-first CSS framework.
- **class-variance-authority**: Type-safe variant API for components.
- **lucide-react**: Icon library.
- **vite**: Frontend build tool and dev server.
- **typescript**: Static type checking.
- **esbuild**: Backend bundling for production.