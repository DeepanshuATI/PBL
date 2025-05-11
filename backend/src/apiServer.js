const express = require("express");
const router = express.Router();
const {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} = require("../controllers/transactionController");

router.get("/transactions", getTransactions);
router.post("/transactions", addTransaction);
router.delete("/transactions/:id", deleteTransaction);
router.put("/transactions/:id", updateTransaction);

module.exports = router;
