# SEM Planner Tool

A full-stack Search Engine Marketing (SEM) Planner Tool with React (Vite + TailwindCSS) frontend and FastAPI backend. Integrates Google Ads Keyword Planner API.

## Features
- Input form for Brand/Competitor URLs, Service Locations, Budgets
- Calls FastAPI `/generate_keywords` endpoint
- Displays ad groups, keywords (with metrics), suggested CPC, PMax themes
- Download results as CSV

## Tech Stack
- Frontend: React (Vite), TailwindCSS
- Backend: FastAPI (Python 3.10+), Google Ads API
- Deployment: Frontend (Netlify/Vercel), Backend (Railway/Render)

## Setup

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

## Deployment
- Frontend: Deploy to Netlify or Vercel
- Backend: Deploy to Railway or Render (CORS enabled)

## Note
- Replace placeholder logic in backend with Google Ads API integration and real business logic as needed.
