import express from 'express';
import { addExpense, getExpense, deleteExpense } from '../controllers/expense.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/create',verifyJWT,addExpense);
router.get('/: user_id',verifyJWT,getExpense);
router.delete("/:expense_id", verifyJWT, deleteExpense);

export default router;