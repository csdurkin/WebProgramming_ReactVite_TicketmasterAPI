# WebProgramming_ReactVite_TicketmasterAPI

A React Single Page Application (SPA) built with Vite that uses the Ticketmaster Discovery API to display and navigate through U.S.-based events, attractions, and venues. The app features paginated browsing, detailed views, and client-side routing for seamless user navigation.

---

## Overview

This project demonstrates a fully client-rendered React application using the [Ticketmaster Discovery API](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/) as its data source.
The app allows users to browse and explore events, attractions, and venues across the United States. Each page uses pagination to navigate through API results, and each entity (event, attraction, or venue) includes a detailed view.

The application integrates React Router for navigation, Material UI (MUI) for consistent styling, Axios for API requests, and a custom theme for cohesive UI design.

---

## Tech Stack

* **Frontend Framework:** React (via Vite)
* **Routing:** React Router DOM
* **Styling:** Material UI (MUI) + Custom Theme (`theme.js`)
* **HTTP Client:** Axios
* **Build Tool:** Vite
* **Linting / Formatting:** ESLint with React, React Hooks, and Refresh plugins

---

## Features

* **Home Page:** Overview of the app with navigation buttons linking to Events, Attractions, and Venues.
* **Browsing Pages:**

  * Paginated lists for events, attractions, and venues (`/events/page/:page`, `/attractions/page/:page`, `/venues/page/:page`).
  * API results displayed with styled cards and MUI components.
* **Detail Pages:**

  * Display full details for individual items (`/events/:id`, `/attractions/:id`, `/venues/:id`).
* **404 Page:**

  * Handles invalid URLs and missing API entities.
* **Navigation Bar:**

  * Persistent top AppBar with responsive navigation links across pages.
* **Theming:**

  * Global MUI theme with a custom color palette, typography, and component overrides.

---

## File Structure

```text
WebProgramming_ReactVite_TicketmasterAPI/
├─ public/
│  └─ vite.svg                     # Default Vite asset
├─ src/
│  ├─ assets/                      # Static assets
│  │  └─ react.svg
│  ├─ components/
│  │  ├─ app/
│  │  │  ├─ App.css
│  │  │  └─ App.jsx                # Main application component with routes
│  │  ├─ img/
│  │  │  └─ brioche.jpg
│  │  ├─ muiStyling/
│  │  │  └─ theme.js               # Custom MUI theme configuration
│  │  └─ pages/                    # React Router pages
│  │     ├─ HomePage.jsx           # Landing page with navigation
│  │     ├─ EventsBrowsePage.jsx   # Paginated event list
│  │     ├─ EventDetailPage.jsx    # Event detail view
│  │     ├─ AttractionsBrowsePage.jsx
│  │     ├─ AttractionDetailPage.jsx
│  │     ├─ VenuesBrowsePage.jsx
│  │     ├─ VenueDetailPage.jsx
│  │     ├─ Navigation.jsx         # Navigation component for AppBar
│  │     └─ NotFoundPage.jsx       # 404 fallback page
│  ├─ index.css                    # Global CSS resets and base styles
│  └─ main.jsx                     # React entry point and BrowserRouter setup
├─ eslint.config.js                # ESLint rules and plugins
├─ vite.config.js                  # Vite configuration with React plugin
├─ package.json                    # Dependencies and npm scripts
└─ README.md                       # This file
```

---

## Setup Instructions

```bash
# 1) Clone this repository
git clone <your-repo-url> WebProgramming_ReactVite_TicketmasterAPI
cd WebProgramming_ReactVite_TicketmasterAPI

# 2) Install dependencies
npm install

# 3) Start the development server
npm run dev
# App will be available at:
#   http://localhost:5173/  (Vite default port)

# 4) Build for production
npm run build

# 5) Preview the production build
npm run preview
```

---

## API Usage

* **Base URL:** `https://app.ticketmaster.com/discovery/v2/`
* **Endpoints Used:**

  * `/events`
  * `/attractions`
  * `/venues`
* **Query Parameters:**

  * `apikey` (included in source for demonstration; ideally stored in `.env`)
  * Pagination parameters handled via React Router page routes.
* Each entity type has both a browse view (list) and detail view fetched dynamically by ID.

---

## Notes

* **Theme Design:**
  The MUI theme (`theme.js`) defines a cohesive palette (blue and orange), rounded UI components, and accessible typography consistent across pages.
* **Client-Side Routing:**
  The app uses React Router’s `<BrowserRouter>` for dynamic navigation without page reloads.
* **Performance:**
  Vite’s fast dev server and HMR ensure quick iteration during development.
* **Error Handling:**
  Invalid routes and failed API requests redirect to the NotFound page.
* **Security:**
  The API key is hardcoded for demonstration; a `.env` file should be used in production to prevent exposure.

---

Author: **Connor Durkin**
