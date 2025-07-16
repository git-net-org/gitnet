# GitNet Backend

Backend API server for GitNet - A privacy-first, GitHub-powered chat application.

## Quick Start

### 1. Environment Setup

Copy the example environment file and configure your settings:

```bash
cp .env.example .env.local
```

Fill in the required values in `.env.local`:

- `STACK_SECRET_SERVER_KEY`: Your Stack Auth server key
- `GITHUB_CLIENT_ID`: GitHub OAuth client ID
- `GITHUB_CLIENT_SECRET`: GitHub OAuth client secret
- `DATABASE_URL`: PostgreSQL connection string (Neon DB)

### 2. Database Setup

For detailed database setup instructions, see [DATABASE_SETUP.md](../DATABASE_SETUP.md).

Quick setup:
```bash
pnpm install
npx prisma generate
npx prisma migrate deploy
```

### 3. Run the Server

```bash
pnpm start
```

The server will start on `http://localhost:5000` (or the port specified in your environment).

## Project Structure

```
backend/
├── controllers/         # Route handlers
├── functions/          # Business logic
├── middlewares/        # Custom middleware
├── prisma/            # Database schema and migrations
├── routes/            # API routes
├── index.js           # Main server file
└── package.json       # Dependencies
```

## API Endpoints

### Authentication
- `POST /auth/github` - GitHub OAuth login
- `POST /auth/logout` - Logout user

### User Management
- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update user profile
- `GET /user/connections` - Get user connections

### Messaging
- `GET /messages/:connectionId` - Get messages for a connection
- `POST /messages` - Send a message
- `DELETE /messages/:messageId` - Delete a message

### Real-time Features
- Socket.IO connection for real-time messaging
- WebRTC signaling for video calls

## Development

### Prerequisites
- Node.js (v18+)
- pnpm (recommended) or npm
- PostgreSQL database (Neon DB)

### Scripts
- `pnpm start` - Start development server with nodemon
- `pnpm test` - Run tests (not implemented yet)

### Database Commands
- `npx prisma studio` - Open Prisma Studio
- `npx prisma migrate dev` - Create and apply migration
- `npx prisma db push` - Push schema changes to database

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GITHUB_CLIENT_ID` | GitHub OAuth client ID | Yes |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth client secret | Yes |
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NODE_ENV` | Environment (development/production) | Yes |
| `FRONTEND_URL` | Frontend application URL | Yes |

## License

This project is licensed under the ISC License.
