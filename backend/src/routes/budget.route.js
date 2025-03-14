import express from 'express';
import {addBudget, getBudget, deleteBudget} from '../controllers/budget.controller.js';


const router = express.Router();

router.post('/',addBudget);
router.get('/:user_id',getBudget);
router.delete('/:id',deleteBudget);

export default router;