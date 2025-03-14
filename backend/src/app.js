import express from 'express';
import cors from 'cors';
import { errorHandler, notFoundHandler} from './middlewares/error.middleware.js'
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';
import categoryRoutes from './routes/category.route.js';
import expenseRoutes from './routes/expense.route.js';
import budgetRoutes from './routes/budget.route.js';
import analyticsRoutes from './routes/analytic.route.js';
import logRoutes from './routes/log.route.js';
import incomeRoutes from './routes/income.route.js';
import dotenv from "dotenv";
dotenv.config();




const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
    optionSuccessStatus:200
}))

app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded({extended:true,limit:'16kb'}))

app.use(express.static('public'))

app.use(cookieParser())


app.use('/api/v1/users', userRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/expenses', expenseRoutes);
app.use('/api/v1/budgets', budgetRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/logs', logRoutes);
app.use('/api/v1/incomes', incomeRoutes);



app.use(notFoundHandler);
app.use(errorHandler);



export { app }