# GitNet 🧠💬
![Alt text](image/gitnet.png)
**Connect. Collaborate. Contribute.**  
A privacy-first, GitHub-powered chat application that helps developers connect meaningfully — without ever sharing personal information.

---

## ✨ Overview

**GitNet** is a real-time chat platform built for developers who want to collaborate, discuss tutorials, or explore open-source ideas — all through their GitHub identity.

Just create your profile, and you're good to go.  
No emails, no phone numbers, no fluff — just GitHub-powered dev-to-dev communication.

---

## 🔧 Tech Stack

| Layer        | Technology                 |
|--------------|----------------------------|
| Frontend     | [Next.js](https://nextjs.org/)            |
| Backend      | [Express.js](https://expressjs.com/)       |
| Real-time    | [Socket.IO](https://socket.io/)            |
| Auth/Data    | [GitHub API](https://docs.github.com/en/rest) |

---

## 🚀 Features

### 🔹 1. GitHub-Only Profiles
- Users sign in via GitHub
- Profiles are built automatically from public GitHub data
- No email or personal info shared

### 🔹 2. Real-Time Chat
- Connect with fellow GitHub users
- Start conversations based on shared interests or repositories
- Invite users to chat using just their GitHub username

### 🔹 3. Privacy-First Architecture
- No unnecessary data stored
- Only GitHub public metadata used
- Conversations stay within the platform

---

## 🔮 Coming Soon

> A bold new direction in code collaboration.

### 🧠 AI Repo Walkthroughs
Imagine asking:
> “How is auth implemented in this repo?”

And instantly getting:
- A step-by-step breakdown of the logic
- File and line-level explanations
- GitHub Copilot-like insights, but repo-scoped and contextual

### 🗂️ Repo Workspaces
- Create a workspace around a GitHub repository
- View PRs, issues, comments, and chats in one unified, clean interface
- Think: GitHub meets Discord, but organized by repo context

---
## 🤝 Contributing         

We welcome contributions of all kinds — bug reports, feature suggestions, or even whole PRs!

Please read our [**Contributing Guidelines**](CONTRIBUTING.md) before submitting a PR.
## ⚙️ Setup Instructions

1. Clone the repo
   ```bash
   git clone url
   cd gitnet
2.  Install dependencies
   ````bash
   cd frontend  # for frontend
   npm install

   cd ../backend  # for backend
   npm install

## 🐳 Docker Setup

A full Docker-based development setup for the GitNet project, including backend, frontend, and PostgreSQL database.

---

### 🔧 Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

### 📦 Services Overview

| Service     | URL                     | Port Mapping     |
|-------------|--------------------------|------------------|
| Frontend    | http://localhost:3000   | `3000:3000`      |
| Backend API | http://localhost:5000   | `5000:5000`      |
| PostgreSQL  | —                        | `5432:5432`      |

### Backend + Database (Docker Compose)

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Configure environment variables:**
   Copy `.env.example` to `.env` and fill in your values:

   - `GITHUB_CLIENT_ID`: Your GitHub OAuth client ID
   - `GITHUB_CLIENT_SECRET`: Your GitHub OAuth client secret
   - `JWT_SECRET` : Your JWT secret


3. **Start backend and database:**
   ```bash
   docker-compose up --build
   ```

   **Services:**
   - Backend API: http://localhost:5000
   - PostgreSQL: localhost:5432 (user: `gitnet`, pass: `gitnetpass`, db: `gitnetdb`)

4. **Stop services:**
   ```bash
   docker-compose down
   ```

### Frontend (Standalone Docker)

1. **Build the frontend image:**
   ```bash
   cd frontend
   docker build -t gitnet-frontend .
   ```

2. **Run the frontend container:**
   ```bash
   docker run -p 3000:3000 gitnet-frontend
   ```

   **Frontend:** http://localhost:3000


### Database Management

**Access PostgreSQL:**
```bash
# Via Docker Compose
docker-compose exec postgres psql -U gitnet -d gitnetdb

# Or connect from host
psql -h localhost -p 5432 -U gitnet -d gitnetdb
```

**Reset database:**
```bash
docker-compose down -v  # Removes volumes
docker-compose up --build
```
