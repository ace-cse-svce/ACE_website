# ACE | Association of Computer Engineers Website

This repository contains the official website for the **Association of Computer Engineers (ACE)**. It is a modern, responsive, and performant single-page application built with React, TypeScript, and Vite, currently deployed on Cloudflare.

## 🚀 Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI + Tailwind)
- **State Management / Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Icons**: [Lucide React](https://lucide.dev/)
- **SEO Management**: [React Helmet Async](https://github.com/staylor/react-helmet-async)
- **Other Utilities**:
  - `date-fns` for date formatting
  - `recharts` for data visualization/charts
  - `embla-carousel-react` for image/content carousels

## 🏗️ Architecture & Design

The project follows a standard modern React application structure, organized to promote reusability and clean code separation. 

### Directory Structure
- **`src/`**: Contains all source code.
  - **`pages/`**: Represents the main views of the application (e.g., `Home`, `Teams`, `Events`, `Gallery`, `Join`, and `NotFound`). These correspond directly to the defined routes.
  - **`components/`**: Contains reusable UI components. 
    - Includes layout-specific elements like `Navbar`, `Footer`, `RecruitmentBanner`, and `Seo`.
    - **`components/ui/`**: Houses the base `shadcn/ui` components (e.g., buttons, cards, dialogs, form inputs) which are highly customizable via Tailwind classes.
  - **`lib/`**: Contains utility functions and helpers (e.g., Tailwind class merging).
  - **`hooks/`**: Custom React hooks for shared logic.
  - **`data/`**: Static data or mock data definitions used across the site.
  - **`App.tsx`**: The root component where providers (Helmet, QueryClient, Tooltip) and the routing topology are defined.
  - **`main.tsx`**: The entry point that mounts the React app to the DOM.

### Design System
- The design heavily leverages **Tailwind CSS** for rapid and consistent styling across all viewports.
- The UI feels modern and accessible, thanks to the unstyled primitives from **Radix UI** combined with pre-designed, customizable variants from **shadcn/ui**.
- Micro-interactions, page transitions, and complex animations are handled gracefully by **Framer Motion**, giving the website a premium and dynamic feel.

### SEO & Performance
- Uses `react-helmet-async` to dynamically inject meta tags (title, description, Open Graph tags) for better search engine indexing and social media sharing.
- Built on top of `Vite`, ensuring ultra-fast cold starts and near-instant Hot Module Replacement (HMR) during development.

---

## 💻 How to Run Locally

Follow these steps to set up the project on your local machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (preferably LTS version).

### 1. Clone the repository
If you haven't already, clone the project and navigate to the directory:
```bash
# (Assuming you are in the directory containing the project)
cd ACE_website
```

### 2. Install Dependencies
Install all required packages defined in `package.json`. You can use `npm`, `yarn`, `pnpm`, or `bun` (a `bun.lockb` file exists, indicating `bun` might be the preferred package manager, but `npm` works perfectly fine).

Using npm:
```bash
npm install
```

### 3. Run the Development Server
Start the Vite development server:
```bash
npm run dev
```

The server will start, typically on `http://localhost:8080` (as defined in `vite.config.ts`). Open this URL in your browser to view the website.

### 4. Build for Production (Optional)
To create an optimized production build:
```bash
npm run build
```
This will generate a `dist/` folder containing the compiled assets, ready to be deployed to Cloudflare or any other hosting provider. You can preview the production build locally using:
```bash
npm run preview
```
