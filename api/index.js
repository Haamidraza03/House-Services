import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import spRoutes from './routes/sp.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// import path from "path";
// import { fileURLToPath } from 'url';

dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

// const __dirname = path.resolve();
app.use(express.json());


app.use(cookieParser());

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/sp", spRoutes);

// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });

// app.get("*", (req, res) => res.sendFile(path.join(__dirname, 'client/dist/index.html')));

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
})