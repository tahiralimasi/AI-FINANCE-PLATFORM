# 💰 AI Finance Platform

A modern AI-powered finance management platform designed to help users track expenses, monitor budgets, and gain intelligent financial insights through automation and AI.

![Project Screenshot](https://github.com/user-attachments/assets/1bc50b85-b421-4122-8ba4-ae68b2b61432)

---

# 🚀 Project Overview

This project combines powerful full-stack technologies to deliver a secure, scalable, and visually appealing personal finance solution.

## 🎯 Core Purpose

- Smart expense tracking
- Budget management
- AI-generated financial insights
- Secure authentication
- Automated workflows
- Real-time analytics

---

# ✨ Key Features

- 🔐 Secure User Authentication
- 💳 Expense & Income Tracking
- 📊 Interactive Dashboard Analytics
- 🤖 AI Financial Recommendations
- 📅 Budget Planning Tools
- 📩 Notifications & Alerts
- 🔄 Recurring Transaction Management
- 🛡️ Advanced Security Protection
- ⚙️ Automated Financial Workflows

---

# 🛠️ Tech Stack

| Technology | Purpose |
|------------|----------|
| **Next.js** | Full-stack React framework |
| **Supabase** | PostgreSQL database backend |
| **Prisma** | Modern ORM for database management |
| **Tailwind CSS** | Responsive UI styling |
| **Shadcn UI** | Clean component system |
| **Clerk** | User authentication |
| **Inngest** | Background job automation |
| **ArcJet** | Security & rate limiting |
| **Gemini AI / OpenAI** | AI-powered finance intelligence |

---

# 📂 Folder Structure

```bash
AI-FINANCE-PLATFORM/
│
├── app/                # Application routes & pages
├── components/         # Reusable UI components
├── lib/                # Utility functions & configurations
├── prisma/             # Database schema & Prisma setup
├── public/             # Static assets
├── hooks/              # Custom React hooks
├── emails/             # Email templates
├── data/               # Static and mock data
└── middleware.js       # Middleware configuration
```

---

# 🎯 Highlights

- Professional full-stack architecture
- Real-world SaaS project structure
- AI integration for smarter finance decisions
- Clean modern dashboard UI
- Scalable backend system
- Production-level security

---

# 📈 Use Cases

- Personal finance management
- Expense categorization
- Budget optimization
- Financial forecasting
- Spending behavior analysis

---

# ⚙️ Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/tahiralimasi/AI-FINANCE-PLATFORM.git

cd AI-FINANCE-PLATFORM
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Setup Environment Variables

Create a `.env.local` file in the root directory and add:

```env
DATABASE_URL=

DIRECT_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in

NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard

NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

GEMINI_API_KEY=

RESEND_API_KEY=

ARCJET_KEY=
```

---

## 4️⃣ Run Database Migration

```bash
npx prisma generate

npx prisma db push
```

---

## 5️⃣ Start Development Server

```bash
npm run dev
```

Application will run on:

```bash
http://localhost:3000
```

# 👨‍💻 Developer

**Tahir Ali Masi**

- Repository link: https://github.com/tahiralimasi/AI-FINANCE-PLATFORM
