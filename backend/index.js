import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { configDotenv } from 'dotenv';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user-routes.js'
import { authenticatedUser } from './middlewares/auth.js';
import cookieParser from 'cookie-parser';
import { initializeSocketServer } from './functions/sockets/initialiseSocket.js';

configDotenv();
const app = express();
const server = createServer(app);

initializeSocketServer(server)

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'x-csrf-token'],
    credentials: true //requests can send and receive cookies or credentials
}));
app.use(express.json()); //parses json to js object

app.use(express.urlencoded({ extended: true })); //to parse from data to js objects, extended means to allow nested objects (urlencoded data)

app.use('/auth', authRoutes);
app.use(cookieParser());
app.use(authenticatedUser);
app.use('/user', userRoutes);

server.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on http://localhost:${process.env.PORT || 5000}`);
});