import express from 'express';
import { addLog, getLogs } from '../controllers/log.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', verifyJWT, addLog);
router.get('/', verifyJWT, getLogs);

export default router;
