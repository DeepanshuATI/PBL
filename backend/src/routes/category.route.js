import express from 'express';
import { createCategory, getCategory} from '../controllers/category.controller.js';

const router = express.Router();

router.post('/',createCategory);
router.get('/:user_id',getCategory);

export default router;