# 🗄️ Database Setup Guide (Super Easy!)

Don't worry - setting up the database is easier than you think! Just follow these simple steps.

**📖 Want to understand the database structure?** Check out [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md) for detailed information about tables and relationships.

## Step 1: Create Your Free Database (3 minutes!)

### 1.1 Go to Neon
1. Visit [neon.tech](https://neon.tech/)
2. Click the big **"Sign up"** button
3. Choose **"Continue with GitHub"** (easiest option)

### 1.2 Create Your Database
1. You'll see a page asking for project details
2. Just type a name like `gitnet-database` 
3. Click **"Create Project"**
4. Wait 30 seconds... Done! 🎉

### 1.3 Get Your Database Link
1. Look for a box that says **"Connection string"**
2. Copy the long text that starts with `postgresql://`
3. Save it somewhere - you'll need it in the next step!

It looks like this:
```
postgresql://username:password@hostname:5432/database_name?sslmode=require
```

## Step 2: Set Up Your Project Files

### 2.1 Navigate to the Backend Folder
```bash
cd backend
```

### 2.2 Copy the Backend Example File
```bash
cp .env.example .env.local
```

### 2.3 Add Your Database Link
1. Open the file `.env.local` in any text editor
2. Find the line that says `DATABASE_URL=`
3. Replace the placeholder text with your database link from Step 1.3
4. Save the file

Your file should look like this:
```env
DATABASE_URL='postgresql://your_actual_database_link_here'
```

**Important**: Keep the single quotes around your database link!

### 2.4 Set Up Frontend Environment
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```

2. Create a frontend environment file:
   ```bash
   echo "JWT_SECRET=your_jwt_secret_here" > .env.local
   ```

3. **Important**: Use the same JWT_SECRET value from your backend `.env.local` file

**Note**: The frontend needs the JWT_SECRET to verify authentication tokens from the backend.

## Step 3: Install Everything (Auto-magic!)

Navigate back to the backend folder and run these commands one by one:

```bash
cd ../backend
```

### 3.1 Install Project Dependencies
```bash
pnpm install
```
*Don't have pnpm? Use: `npm install`*

### 3.2 Set Up the Database Structure
```bash
npx prisma generate
```


### 3.3 Create Database Tables
```bash
npx prisma migrate deploy
```

### 3.4 Test It Works
```bash
npx prisma studio
```

This should open a webpage where you can see your database tables. If it works, you're done! 🎉

**💡 Want to understand what these tables do?** Check out [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md) for detailed explanations.

## Step 4: Run Your App

### Start the Backend
```bash
pnpm start
```

### Start the Frontend (in a new terminal)
```bash
cd ../frontend
pnpm dev
```

Visit `http://localhost:3000` - your app should be running!

## 📊 Understanding the Database

The database has 4 main tables:
- **Users**: GitHub profile information
- **Connections**: Direct user connections
- **FilteredConnections**: GitHub-based connections with permissions
- **Messages**: Chat messages between users

For detailed schema information, see [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md).

## ❓ Something Not Working?

### "Command not found" Error
**Problem**: Terminal says `pnpm: command not found`
**Solution**: Use `npm` instead of `pnpm` in all commands

### "Connection refused" Error
**Problem**: Can't connect to database
**Solution**: 
1. Check your internet connection
2. Make sure you copied the database link correctly
3. Verify the database link has single quotes around it

### "Migration failed" Error
**Problem**: Database tables won't create
**Solution**: 
1. Double-check your database link in `.env.local`
2. Make sure your Neon database is still active (check neon.tech)
3. Try running `npx prisma db push` instead

### "403 Forbidden" or Authentication Errors
**Problem**: Frontend can't authenticate with backend
**Solution**: 
1. Make sure both frontend and backend have the same `JWT_SECRET` in their `.env.local` files
2. Check that both environment files exist and are properly configured
3. Restart both frontend and backend servers after changing environment variables

### Still Stuck?
1. Copy the exact error message
2. Create an issue on GitHub with:
   - What you were trying to do
   - The exact error message
   - Your operating system (Windows/Mac/Linux)

## 🔐 Keep Your Secrets Safe!

- Never share your `.env.local` file
- Never commit `.env.local` to GitHub
- If you accidentally share it, create a new database

---

**That's it! You're ready to code! 🚀**

*This guide was made with ❤️ for beginners. If something confused you, let us know!*
