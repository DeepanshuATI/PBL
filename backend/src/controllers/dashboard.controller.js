import Income from "../models/income.model.js";
import { Expense } from "../models/expense.model.js";
import { Types } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";

const getTransactionsSumLast60Days = async (userId, model) => {
  const transactions = await model.find({
    user: new Types.ObjectId(userId),
    date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
  }).sort({ date: -1 });

  return transactions;
};

export const getDashboardData = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch total incomes and expenses
    const totalIncome = await Income.aggregate([
      { $match: { user: new Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalExpense = await Expense.aggregate([
      { $match: { user: new Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalIncomeValue = totalIncome.length > 0 ? totalIncome[0].total : 0;
    const totalExpenseValue = totalExpense.length > 0 ? totalExpense[0].total : 0;

    // Get income and expense for the last 60 days
    const incomeLast60Days = await getTransactionsSumLast60Days(userId, Income);
    const expenseLast30Days = await getTransactionsSumLast60Days(userId, Expense);

    const incomeLast60DaysTotal = incomeLast60Days.reduce((sum, transaction) => sum + transaction.amount, 0);
    const expenseLast30DaysTotal = expenseLast30Days.reduce((sum, transaction) => sum + transaction.amount, 0);

    // Fetch the last 5 transactions
    const recentIncomeTransactions = await Income.find({ user: new Types.ObjectId(userId) })
      .sort({ date: -1 })
      .limit(5);

    const recentExpenseTransactions = await Expense.find({ user: new Types.ObjectId(userId) })
      .sort({ date: -1 })
      .limit(5);

    const lastTransaction = [
      ...recentIncomeTransactions.map(txn => ({ ...txn.toObject(), type: "income" })),
      ...recentExpenseTransactions.map(txn => ({ ...txn.toObject(), type: "expense" })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({
      totalBalance: totalIncomeValue - totalExpenseValue,
      totalIncome: totalIncomeValue,
      totalExpense: totalExpenseValue,
      last60DaysIncome: { total: incomeLast60DaysTotal, transactions: incomeLast60Days },
      last30DaysExpense: { total: expenseLast30DaysTotal, transactions: expenseLast30Days },
      recentTransactions: lastTransaction,
    });
  } catch (err) {
    console.error("Error in getDashboardData:", err.message);
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching dashboard data",
      error: err.message,
    });
  }
});



  
  
  




{/*import  Income  from "../models/income.model.js";
import { Expense } from "../models/expense.model.js";
import { Types } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getDashboardData = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const userObjectId = new Types.ObjectId(String(userId));



        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);



        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);



        const last60DaysIncomeTransaction = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 1000) },
        }).sort({ date: -1 });



        const incomeLast60Days = last60DaysIncomeTransaction.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        const last60DaysExpenseTransaction = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 1000) },
        }).sort({ date: -1 });

        const expenseLast60Days = last60DaysExpenseTransaction.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        const lastTransaction = [
            ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "income",
                })
            ),
            ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "expense",
                })
            ),
        ].sort((a, b) => b.date - a.date);

        res.json({
            totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30DaysExpense: {
                total: expenseLast60Days,
                transactions: last60DaysExpenseTransaction,
            },
            last30DaysIncomeTransaction: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransaction,
            },
            recentTransaction: lastTransaction,
        });
    } catch (err) {
        console.error("Error fetching dashboard data:", err);
        res.status(500).json({
            status: "error",
            message: "Server Error",
            error: err.message,
        });
    }
});
*/}