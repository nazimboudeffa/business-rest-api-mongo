import 'dotenv/config'
import express from 'express';
import cookieParser from 'cookie-parser';
import { connectDB } from './db/connection.js';
import { ideasRoutes } from './routes/ideas.js';
import { usersRoutes } from './routes/users.js';
import { authRoutes } from './routes/auth.js';

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());
app.use(cookieParser());

//routes
app.get('/health', (req, res)=> {
    res.send('Rest API is healthy');
});

app.use('/ideas', ideasRoutes);

app.use('/users', usersRoutes);

app.use('/auth', authRoutes);

const start = async () => {
    console.log("Starting server...");
    try {
        await connectDB(process.env.DATABASE_URL);
        console.log("Connecting to database...");
        app.listen(port, () => console.log(`Server is listening on port ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start();