This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



# AI Chat Application 🚀

A modern, production-ready **AI Chat Application** built with **Next.js** that supports intelligent conversations using **LLMs**, secure authentication, vector search, and scalable backend infrastructure.

This project is designed with **real-world engineering practices**, focusing on performance, scalability, and clean architecture.

---

## ✨ Features

- 🤖 AI-powered chat using **Google Gemini**
- 🧠 Context-aware responses with **LangChain**
- 📄 Vector search & semantic memory using **Qdrant**
- 🔐 Secure authentication & user management with **Clerk**
- 💾 Serverless Postgres with **Neon DB**
- 🧬 Type-safe database access using **Prisma**
- 🎨 Modern UI with **ShadCN UI**
- ⚡ App Router & Server Actions (Next.js)
- 📈 Scalable and production-ready architecture

---

## 🛠 Tech Stack

### Frontend
- **Next.js (App Router)**
- **TypeScript**
- **ShadCN UI**
- **Tailwind CSS**

### Backend / AI
- **LangChain**
- **Google Gemini (LLM)**
- **Qdrant (Vector Database)**

### Database & Auth
- **Neon DB (PostgreSQL)**
- **Prisma ORM**
- **Clerk Authentication**

---

## 🧠 Architecture Overview
Client (Next.js UI)
↓
Server Actions / API Routes
↓
LangChain (Prompt + Memory + Context)
↓
Gemini LLM
↓
Qdrant (Vector Search for Context)
↓
Neon DB (User & Chat Metadata via Prisma)

---

## 🗂 Project Structure
<!-- src/
├─ app/ # Next.js App Router
├─ components/ # UI Components (ShadCN)
├─ lib/
│ ├─ prisma.ts # Prisma Client
│ ├─ qdrant.ts # Vector DB config
│ ├─ langchain.ts # LLM & chain setup
│ └─ auth.ts # Clerk helpers
├─ actions/ # Server Actions
├─ types/ # Shared Types
└─ styles/ -->

```text
-src/
├─ app/                # Next.js App Router
├─ components/         # UI Components (ShadCN)
├─ lib/
│  ├─ prisma.ts        # Prisma Client
│  ├─ qdrant.ts        # Vector DB config
│  ├─ langchain.ts     # LLM & chain setup
│  └─ auth.ts          # Clerk helpers
├─ actions/            # Server Actions
├─ types/              # Shared Types
└─ styles/

---

## 🔐 Environment Variables

Create a `.env` file in the root:

env
# Database
DATABASE_URL=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Gemini
GOOGLE_API_KEY=

# Qdrant
QDRANT_URL=
QDRANT_API_KEY=


🚀 Getting Started
1️⃣ Clone the Repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

2️⃣ Install Dependencies
npm install

3️⃣ Setup Database
npx prisma generate
npx prisma migrate dev

4️⃣ Run the App
npm run dev


App will be available at:
👉 http://localhost:3000

🧪 Key Engineering Decisions

LangChain is used to manage prompt chaining, memory, and context injection.

Qdrant enables semantic search instead of simple keyword matching.

Prisma + Neon ensures type safety and scalability.

Server Actions reduce API boilerplate and improve performance.

Clerk simplifies authentication without compromising security.

📌 Future Improvements

✅ Streaming responses

✅ Chat history summarization

⏳ Multi-document context injection

⏳ Rate limiting & analytics

⏳ Message feedback (👍 / 👎)

📄 License

This project is licensed under the MIT License.

👨‍💻 Author

Nishant Baiga
Software Engineer | Full-Stack | AI-Focused

Built with a focus on real-world engineering, not tutorials.




