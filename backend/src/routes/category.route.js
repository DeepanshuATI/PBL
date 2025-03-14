import express from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { createCategory, getCategory,deleteCategory} from '../controllers/category.controller.js';

const router = express.Router();

router.post('/',createCategory);
router.get('/:user_id',getCategory);
router.delete("/:category_id", verifyJWT, deleteCategory);

export default router;