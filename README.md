# TalentFlow
TalentFlow is a modern, feature-rich hiring platform designed for streamlined recruitment management. Built with React.js, Vite, and Tailwind CSS, it offers a responsive UI, light mode —all powered by mock APIs for rapid prototyping and testing.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Architecture](#architecture)
- [Technical Decisions](#technical-decisions)
- [Future Improvements](#future-improvements)
- [License](#license)

## Features

- **Dashboard**: Overview of jobs and key hiring metrics.
- **Job Management**: Create, view, and manage job listings.
- **Candidate Tracking**: Visualize candidate progress through all hiring stages.
- **Assessments**: Build and take assessments for job applicants.
- **Global Search**: Search jobs, candidates, and assessments.
- **Responsive Design**: Mobile-friendly UI using Tailwind CSS.
- **Mocked API**: MSW simulates backend endpoints for development.

## Tech Stack

- **Frontend**: React.js (19+), TypeScript
- **Build Tool**: Vite
- **Routing**: React Router (6+)
- **Styling**: Tailwind CSS (OKLCH colors, dark mode)
- **UI Components**: Shadcn/UI
- **Icons**: Lucide React
- **API Mocking**: MSW (Mock Service Worker)
- **Theme Management**: Custom React Context
- **Utilities**: `clsx`, `tailwind-merge`
- **Linting/Formatting**: ESLint, Prettier

## Project Structure

```
/ENTNT/
├── public/
│   ├── logo
│   └── mockServiceWorker.js
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── assessments/
│   │   ├── candidates/
│   │   ├── jobs/
│   │   ├── layout/
│   │   ├── ui/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   │   ├── assessments/
│   │   ├── candidates/
│   │   ├── jobs/
│   │   ├── HomePage.tsx
│   │   ├── NotFound.tsx
│   ├── styles/
│   ├── App.tsx
│   ├── main.tsx
│   ├── VITE-ENV.d.ts
├── tailwind.config.js
├── vite.config.ts
├── package.json
├── .env
└── README.md
```

## Setup Instructions

### Prerequisites

- **Node.js**: v18 or higher
- **npm**: v9 or higher

### Installation

1. **Clone the Repository**
  ```bash
  git clone <repository-url>
  cd ENTNT
  ```

2. **Install Dependencies**
  ```bash
  npm install
  ```

3. **Set Up Environment**
  - Create a `.env` file in the root:
    ```
    VITE_API_URL=http://localhost:5174
    ```

4. **Initialize MSW**
  ```bash
  npx msw init public/ --save
  ```

5. **Run the Development Server**
  ```bash
  npm run dev
  ```
  Open [http://localhost:5173](http://localhost:5173) in your browser.

6. **Build for Production**
  ```bash
  npm run build
  npm run preview
  ```

### Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build for production
- `npm run preview`: Preview the production build
- `npm run lint`: Run ESLint
- `npm run format`: Run Prettier

## Architecture

### Frontend

- **React.js**: Component-based architecture with TypeScript.
- **React Router**: Client-side routing (`/`, `/jobs`, `/candidates`, `/assessments` ).
- **Shadcn/UI**: Reusable, accessible UI components.
- **Tailwind CSS**: Utility-first styling with OKLCH color support and dark mode.

### Data Layer

- **DatabaseService**: Mock data layer (`src/lib/db.ts`) for jobs, candidates, assessments.
- **MSW**: Simulates API endpoints with realistic delays and error rates.

### Key Components

- **Navigation**: Responsive navbar with routing and theme toggle.


## Technical Decisions

- **Vite**: Chosen over CRA for faster builds and simpler config.
- **Tailwind CSS (OKLCH)**: Utility-first, accessible, and consistent styling.
- **MSW**: Mock APIs for rapid frontend development.
- **Shadcn/UI**: Accessible, customizable UI components.


## Future Improvements

- Integrate with a real backend (e.g., Node.js/Express).
- Link candidates to jobs/assessments for dynamic analytics.
- Add toast notifications (e.g., `react-toastify`) for user feedback.
- Improve accessibility (ARIA, Lighthouse audits).
- Implement server-side pagination for large datasets.


## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.# ENTNT
