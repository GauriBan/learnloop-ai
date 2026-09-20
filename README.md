# LearnLoop AI

**Tagline:** Turn any topic into a clear learning path, practice quiz, and actionable study plan.

LearnLoop AI is an original full-stack AI learning assistant built for the InfinityX Global Hackathon 2K26. It helps students who get stuck between scattered tutorials and unclear study plans by turning a topic into a simple explanation, adaptive practice questions, and a short study roadmap.

## Core features
- AI topic explainer with beginner-friendly output
- 5-question MCQ generator with explanations
- Personalized 7-day study plan
- Local learning history and quiz scores
- Progress dashboard
- Responsive modern UI
- Gemini API stays on the backend; API key is never exposed to the browser
- Demo fallback mode so the UI can still be explored without an API key

## Tech stack
- React + Vite
- Node.js + Express
- Google Gemini via `@google/genai`
- Plain CSS
- Browser localStorage for lightweight progress history

## Run locally

### 1. Server
```bash
cd server
npm install
copy .env.example .env
npm run dev
```

Add your Gemini key to `server/.env`:
```env
GEMINI_API_KEY=your_key_here
PORT=5000
```

### 2. Client
Open another terminal:
```bash
cd client
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

## Demo flow
1. Enter a topic such as `JavaScript Arrays`.
2. Click **Explain Topic**.
3. Open **Practice Quiz** and submit answers.
4. Generate a **7-Day Plan**.
5. Check the dashboard for saved progress.

## Hackathon submission checklist
- Project name + tagline
- Problem statement
- Solution
- Features
- Technology stack
- GitHub source code
- Working demo/prototype
- Demo video
- Screenshots
- Team information

## Originality / AI usage
This project is an original implementation prepared for the participant. AI-assisted development can be used as permitted by the hackathon rules; the participant remains responsible for testing, originality, licenses, and submission content.

## License
MIT
