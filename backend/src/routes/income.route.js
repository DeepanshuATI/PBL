import express from "express";
import { addIncome, getIncomes } from "../controllers/income.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Routes
router.post("/add", verifyJWT, addIncome);
router.get("/get", verifyJWT, getIncomes);

export default router;
