# Kev Channoeurn Portfolio

Personal portfolio website of **Kev Channoeurn**, a Computer Science student and Front-End Developer, built with React and Vite.

> This project is currently set up for **local development only**.

## About

Kev Channoeurn is a Computer Science student at the Royal University of Phnom Penh (2023 – Present). He is building practical front-end projects with React and is looking for a Front-End internship.

The portfolio uses a clean, modern layout inspired by Linear: dark mode by default, a floating glass navigation, generous spacing, thin dividers, one soft ambient light and calm animations. Each section keeps its title in a narrow left column, and a single italic serif accent with a drawn underline adds a personal touch. It also supports light mode and a system mode that follows the operating system.

## Tech Stack

- [React 19](https://react.dev) with JavaScript
- [Vite](https://vite.dev) for development and builds
- [React Router](https://reactrouter.com) for local routes
- [Lucide React](https://lucide.dev) for icons
- Plain modern CSS: custom properties, container queries, `color-mix()`
- [Inter](https://rsms.me/inter/) font, self-hosted through `@fontsource-variable/inter`
- ESLint for code checks

No UI framework or chart library is used. The dashboard chart is built with HTML and CSS.

## Features

- One-page portfolio with sections for About, Skills, Projects, Experience, Education and Contact
- Each section has its own route (for example `/skills`) that scrolls to the section
- Floating glass navigation with an active-section highlight and a glass mobile menu
- Dark, Light and System themes, saved in LocalStorage, with smooth colour transitions
- Three working projects. Clicking a project card opens the app on its own page in a new tab
- Subtle reveal animations that are turned off when the user prefers reduced motion
- Responsive layout for desktop, laptop, tablet and mobile
- Accessibility: semantic HTML, skip link, visible focus states, keyboard support and ARIA labels
- SEO: page title, meta description, Open Graph tags, favicon and per-page titles
- Project apps are lazy-loaded, so the main portfolio stays light

## Projects

All three projects live in `src/projects/` and run entirely in the browser. Each one opens full screen at `/projects/<slug>`, with a slim top bar (back to the portfolio, GitHub, theme). The project cards use real screenshots of the apps, one for each theme.

### Student Task Manager

A responsive task manager for students to organize assignments, deadlines and daily tasks.
Style: **Minimalist + Ambient**.

- Add, edit, delete and complete tasks
- Search, status filters (All / Active / Completed) and priority filter (Low / Medium / High)
- Due dates with "Due today", "Due tomorrow" and "Overdue" labels
- Saved in LocalStorage, with polished empty states
- Its own dark/light toggle, linked to the portfolio theme

### Mini Shop Dashboard

A small e-commerce dashboard for managing products and viewing basic sales information.
Style: **Material + SaaS**.

- Summary cards: Products, Orders, Revenue and Low Stock
- 7-day sales chart with tooltips and a "View as table" option
- Stock status breakdown, revenue by category and a recent orders table
- Product list with search, category filter and stock filter
- Add, edit, view and delete products (validated forms in native `<dialog>` modals)
- Uses made-up sample data saved in LocalStorage, with a "Reset sample data" button

### Weather & Travel Explorer

A weather app that lets users search for cities and view current weather and a 5-day forecast.
Style: **Ambient + Glass**.

- City search with the Open-Meteo geocoding API
- Current temperature, condition, humidity, wind speed, "feels like" temperature and chance of rain
- 5-day forecast with temperature range bars
- Favorite cities and the last viewed city, saved in LocalStorage
- Loading, error (with retry) and empty states
- The background changes subtly with the weather (clear, cloudy, rain, storm, snow, fog)

Weather data comes from [Open-Meteo](https://open-meteo.com), which is free for non-commercial use and **does not need an API key**. An internet connection is needed for this project.

## Repositories

Each demo project also has its own standalone repository:

| Project | Repository |
| --- | --- |
| Portfolio (this repo) | <https://github.com/sokhin-devops/kev-channoeurn-portfolio> |
| Student Task Manager | <https://github.com/sokhin-devops/student-task-manager> |
| Mini Shop Dashboard | <https://github.com/sokhin-devops/mini-shop-dashboard> |
| Weather & Travel Explorer | <https://github.com/sokhin-devops/weather-travel-explorer> |

The same app code lives in `src/projects/` here, so each project can open on its own page inside the portfolio. When you change an app, update both copies (and retake its screenshots in `src/assets/projects/` if it looks different).

## Installation

Requirements: [Node.js](https://nodejs.org) 20.19+ or 22.12+ (the latest LTS is recommended).

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Then open the local URL printed in the terminal (usually <http://localhost:5173>).

## Build

```bash
npm run build
```

The production files are written to `dist/`. To preview the build locally:

```bash
npm run preview
```

To check the code with ESLint:

```bash
npm run lint
```

## Local Routes

| Route | Page |
| --- | --- |
| `/` | Home (full one-page portfolio) |
| `/about` | Home, scrolled to About |
| `/skills` | Home, scrolled to Skills |
| `/projects` | Home, scrolled to Projects |
| `/experience` | Home, scrolled to Experience |
| `/education` | Home, scrolled to Education |
| `/contact` | Home, scrolled to Contact |
| `/projects/student-task-manager` | Student Task Manager app, full screen |
| `/projects/mini-shop-dashboard` | Mini Shop Dashboard app, full screen |
| `/projects/weather-explorer` | Weather & Travel Explorer app, full screen |
| Any other path | 404 page |

Old `/projects/<slug>/demo` links redirect to `/projects/<slug>`.

## Environment Variables

No environment variables are required. `.env.example` is included in case a weather provider that needs an API key is used later. Copy it to `.env` and never commit real keys (`.env` is already in `.gitignore`).

## Project Structure

```
kev-portfolio/
├── index.html              # Page title, meta tags, favicon, theme script
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx            # App entry: router, theme provider, global CSS
    ├── App.jsx             # All routes
    ├── assets/             # Profile photo and project screenshots
    ├── components/
    │   ├── layout/         # Navbar, Footer, Layout, AmbientBackground
    │   ├── projects/       # ProjectCard, AppLoading
    │   └── ui/             # Button, Reveal, SplitSection, ThemeSwitcher, ...
    ├── context/            # ThemeContext (dark / light / system)
    ├── data/
    │   ├── profile.js      # Personal info, skills, education, experience, links
    │   ├── projects.js     # Project names, descriptions, screenshots and GitHub links
    │   └── navigation.js   # Navigation items
    ├── hooks/              # useLocalStorage, useReveal, useScrollSpy, useTheme, ...
    ├── pages/              # HomePage, ProjectAppPage, NotFoundPage
    ├── projects/           # The three apps (each with its own CSS)
    │   ├── task-manager/
    │   ├── shop-dashboard/
    │   └── weather-explorer/
    ├── sections/           # Hero, About, Skills, Projects, Experience, Education, Contact
    ├── styles/             # Design tokens, base styles, layout, components, sections
    └── utils/
```

## Updating Content

- **Contact details, skills, education, experience:** edit `src/data/profile.js`.
- **GitHub profile link:** set `links.github` in `src/data/profile.js`. While it is `null`, no GitHub icon is shown in the navigation.
- **Project details:** edit `src/data/projects.js` (name, description, technologies, GitHub link).
- **Project screenshots:** replace the `*-dark.jpg` and `*-light.jpg` files in `src/assets/projects/` (16:10, taken from each app's `/projects/<slug>` page).
- **Profile photo:** replace `src/assets/kev-channoeurn.jpg`, keeping the same file name.
