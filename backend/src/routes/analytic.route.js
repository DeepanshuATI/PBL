import express from 'express';
import { getExpenseSummery, getMonthlyTrends }  from '../controllers/analytic.controller.js'; 

const router = express.Router();

router.get('/summary/:user_id',getExpenseSummery);
router.get('/trends/:user_id',getMonthlyTrends);

export default router;