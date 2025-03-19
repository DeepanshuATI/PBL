import express from "express";
import {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} from "../controllers/transaction.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.post("/", verifyJWT, addTransaction);


router.get("/", verifyJWT, getTransactions);


router.put("/:transaction_id", verifyJWT, updateTransaction);


router.delete("/:transaction_id", verifyJWT, deleteTransaction);

export default router;
