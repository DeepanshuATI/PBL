import express from 'express';
import { addExpense, getExpense } from '../controllers/expense.controller.js';

const router = express.Router();

router.post('/',addExpense);
router.get('/: user_id',getExpense);

export default router;