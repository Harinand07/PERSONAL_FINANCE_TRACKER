import express from 'express';
import connectDb from './database/mongodb.js';
import expenseRoutes from './routes/expenseRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());

app.use(authRoutes);
app.use(expenseRoutes);

const PORT = process.env.PORT || 5000;

connectDb();

app.get('/', (req, res) => {
    res.send('<h1>Welcome to Expense Tracker Backend</h1>');
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
