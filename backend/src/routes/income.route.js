import express from "express";
import { addIncome, deleteIncome, getIncomes,  updateIncome, getUserIncomes, downloadIncomeExcel } from "../controllers/income.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.post("/add", verifyJWT, addIncome);
router.get("/get", verifyJWT, getIncomes);
router.get("/user/:userId", verifyJWT, getUserIncomes);
router.delete("/:id",verifyJWT,deleteIncome);
router.put("/:id",verifyJWT,updateIncome);
router.get("/downloadexcel",verifyJWT,downloadIncomeExcel);


export default router;
