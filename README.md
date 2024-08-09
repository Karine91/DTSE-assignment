This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To run the project:

```bash
npm i
npm run dev
```

Implemented 2 pages: overview with list of bidding zones and details page for each zone with chart data for electricity prices.

Direct request for Energy-charts API fails due to CORS issue, as workaround getting requests data on server through next route handler.

Overview page with search functionality implemented with server components

Details page contain 2 tabs: first shows the data for every hour, the second shows bar chart with average price data within a day. Data can be filtered by selecting date range. By default data is shown for current day.

Tech Stack:

- Next.js
- TS
- TailwindCSS
- React Query
- shadcn
- d3.js
- storybook
