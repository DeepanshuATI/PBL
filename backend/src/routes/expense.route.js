import express from 'express';
import { addExpense, getExpense, deleteExpense, downloadExpenseExcel } from '../controllers/expense.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/create',verifyJWT,addExpense);
router.get('/',verifyJWT,getExpense);
router.delete("/:expense_id", verifyJWT, deleteExpense);
router.get("/downloadexcel", verifyJWT, downloadExpenseExcel);

export default router;