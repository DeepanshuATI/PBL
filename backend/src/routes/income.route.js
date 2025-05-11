import express from "express";
import { addIncome, deleteIncome, getIncomes,  updateIncome, downloadIncomeExcel } from "../controllers/income.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.post("/add", verifyJWT, addIncome);
router.get("/get", verifyJWT, getIncomes);
router.delete("/:id",verifyJWT,deleteIncome);
router.put("/:id",verifyJWT,updateIncome);
router.get("/downloadexcel",verifyJWT,downloadIncomeExcel);


export default router;
