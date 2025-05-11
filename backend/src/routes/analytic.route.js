import express from 'express';
import { getExpenseSummary, getMonthlyTrends }  from '../controllers/analytic.controller.js'; 

const router = express.Router();

router.get('/summary/:user_id',getExpenseSummary);
router.get('/trends/:user_id',getMonthlyTrends);

export default router;