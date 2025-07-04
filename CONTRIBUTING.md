# 🤝 Contributing to GitNet

Thanks for considering contributing to **GitNet**!  
This project is made for developers, by developers. If you’re passionate about GitHub, real-time collaboration, or AI tooling, you’re in the right place.

---

## 📌 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Setup Instructions](#setup-instructions)
- [How to Submit a Pull Request](#how-to-submit-a-pull-request)
- [Feature Ideas to Explore](#feature-ideas-to-explore)
- [Commit Message Format](#commit-message-format)

---

## 📜 Code of Conduct

We are committed to maintaining a respectful and inclusive environment for everyone. By participating in this project, you agree to:

- Be respectful to others and open to different viewpoints  
- Use welcoming and inclusive language  
- Avoid personal attacks or discriminatory behavior  
- Report abusive behavior to the repository maintainers  

Violations may result in removal from the community.

---

## 🛠️ Setup Instructions

> This section will help you get GitNet running on your local machine for development and testing.

### 1. Fork the Repository

Click the **"Fork"** button on the GitHub repo page to create your own copy under your GitHub account.

---

### 2. Clone the Fork

Open a terminal and run:

```bash
git clone url
cd gitnet
````
### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
````
### 4. Setup Backend
```bash
cd ../backend
npm install
npm start
````
The backend runs by default on http://localhost:5000.

### 5. Add Environment Variables
```bash
PORT=5000
DATABASE_URL=your-neon-db-url
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
JWT_SECRET=your_jwt_secret
NODE_ENV="development"
````
### 6. Verify Everything Works
Visit http://localhost:3000

### 7. Create a New Branch
````bash
git checkout -b feat/my-new-feature
````
### 8. Make Your Changes

````bash
git add .
git commit -m "feat: added AI walkthrough to chat"
git push origin feat/my-new-feature

````
### 9. Create a Pull Request

```bash
Visit your fork on GitHub.
Click "Compare & pull request".
Add a meaningful title and description.
Click Create pull request.
````
