import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors';
import bookRouter from './router/book.router.js';
import userRouter from './router/user.router.js';
import aiRouter from './router/ai.router.js';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const dbURL = process.env.dbURL;
try {
    mongoose.connect(dbURL);
    console.log("connected to mongoDB");
}
catch (error) {
    console.log(error);
}

app.listen(PORT, () => {
    console.log(`app is listening at PORT ${PORT} `);
});

app.get('/', (req, res) => {
    res.send('Bookstore project');
});
// defining the routers as middlewares
app.use("/api/book", bookRouter);
app.use("/user", userRouter);
app.use("/api/recommend", aiRouter);