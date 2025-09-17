# custom-decore-full

Full scaffold: frontend (Vite + Tailwind) + backend (Express + Stripe test) + ml_service (FastAPI placeholders).

## Local run

Frontend:
```
cd frontend
npm install
npm run dev
```

Backend:
```
cd backend
npm install
node server.js
```

ML service:
```
cd ml_service
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

## Deploy
- Frontend: Vercel (Root Directory = frontend). Build: `npm run build`, Output: `dist`.
- Backend: Render/Railway (deploy backend folder). Use `.env.example`.
- ML service: Railway / Hugging Face.

Owner email: endrockind@gmail.com
