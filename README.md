#This project was built with the help of AI 

# Dashboard UI

Modern admin dashboard built with React, TypeScript, and Tailwind CSS.

## Features

- 📊 Responsive layout with sidebar navigation
- 📈 Statistics cards with icons and trends
- 📉 Interactive revenue chart
- 🔔 Real-time notifications dropdown
- 👥 Activity feed with colored avatars
- 🛍️ Top products list with trend indicators
- 📦 Orders table with status badges
- ⚡ Quick action buttons
- 🎯 Monthly goals with progress bars
- 🌍 Sales by region widget
- 👤 Recent customers list
- 🔍 Search functionality in header
- 🎨 Clean, modern design with Tailwind CSS
- ✨ Smooth hover effects and transitions

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Project Structure

```
├── components/
│   ├── ActivityFeed.tsx      # Activity feed with colored avatars
│   ├── Badge.tsx             # Status badge component
│   ├── Card.tsx              # Reusable stat card component
│   ├── Chart.tsx             # Revenue bar chart
│   ├── Footer.tsx            # Footer with links
│   ├── GoalsWidget.tsx       # Monthly goals with progress bars
│   ├── Header.tsx            # Header with search and notifications
│   ├── Notifications.tsx     # Dropdown notifications panel
│   ├── ProgressBar.tsx       # Progress bar component
│   ├── QuickActions.tsx      # Quick action buttons
│   ├── RecentCustomers.tsx   # Recent customers widget
│   ├── SalesMap.tsx          # Sales by region widget
│   ├── Sidebar.tsx           # Navigation sidebar
│   ├── StatCard.tsx          # Statistics card (legacy)
│   └── Table.tsx             # Orders table with status badges
├── App.tsx                   # Main app layout
├── Dashboard.tsx             # Dashboard page with all widgets
├── main.tsx                  # React entry point
└── index.css                 # Global styles with Tailwind
```

## Components Overview

### Statistics Cards
Display key metrics with icons, values, and trend indicators.

### Revenue Chart
Bar chart showing monthly revenue trends.

### Activity Feed
Real-time feed of user activities with colored avatars.

### Orders Table
Comprehensive table with sorting, filtering, and status badges.

### Quick Actions
Fast access buttons for common tasks.

### Goals Widget
Visual progress tracking for monthly targets.

### Sales Map
Regional sales breakdown with progress bars.

### Notifications
Dropdown panel with unread indicators.

## Customization

All colors and styles can be customized in `tailwind.config.js`.

## License

MIT

