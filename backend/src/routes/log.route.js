import express from 'express';
import { addLog, getLogs, deleteLog } from '../controllers/log.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/create', verifyJWT, addLog);
router.get('/', verifyJWT, getLogs);
router.delete("/:log_id", verifyJWT, deleteLog);
export default router;
