import Income from "../models/income.model.js";
import { Expense } from "../models/expense.model.js";
import { isValidObjectId, Types } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";



//Dashboard data
export const getDashboardData = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));
  
      // Fetch total incomes and expenses
      const totalIncome= await Income.aggregate([
         {$match: { userId: userObjectId } },
         {$group: { _id:null, total: { $sum: "$amount" } } },
      ]);
  
      console.log("totalIncome", { totalIncome, userId : isValidObjectId(userId)});


      const totalExpense = await Expense.aggregate([
         { $match: { userId : userObjectId } },
         { $group: { _id:null, total: { $sum: "$amount"} } } 
      ]);

     // console.log("totalExpense", { totalExpense,userId: isValidObjectId(userId)});

     //Get income transaction in the last 60 days.

     const last60DaysIncomeTransaction = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 1000)},
     }).sort({date: -1});

     //Get total income for lst 60 days
     const incomeLast60Days = last60DaysIncomeTransaction.reduce(
      (sum, transaction) => sum + transaction.amount,0
     );
     

     //Get income transaction in the last 60 days.

     const last60DaysExpenseTransaction = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 1000)},
     }).sort({date: -1});

      //Get total income for lst 60 days
     const expenseLast60Days = last60DaysExpenseTransaction.reduce(
      (sum, transaction) => sum + transaction.amount,0
     );

     //Fetch last 5 transaction 

     const lastTransaction = [
      ...(await Income.find({ userId }).sort({ date: -1}).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
            type:"income",
        })
      ),
      ...((await Expense.find({ userId }).sort({ date: -1}).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type:"expense",
        })
      ))
     ].sort((a, b) => b.date -a.date);
     

     res.json({
      totalBalance:
          (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
          totalIncome: totalIncome[0]?.total || 0,
          totalExpense: totalExpense[0]?.total || 0,
          last30DaysExpense: {
            total: expenseLast60Days,
            transactions: last60DaysExpenseTransaction, 
          },
          last30DaysIncomeTransaction:{
            total: incomeLast60Days,
            transactions: last60DaysIncomeTransaction,
          },
          recentTransaction: lastTransaction,
     });

      
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: "Server Error",
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