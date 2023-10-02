import React from "react";
import { Progress } from "antd";
import CategoryAnalytics from "./CategoryAnalytics";

const Analytics = ({ allTransactions }) => {
  //total transactions
  const totalTransaction = allTransactions.length;
  const totalIncomeTransactions = allTransactions.filter(
    (txn) => txn.type === "income"
  );
  const totalExpenseTransactions = allTransactions.filter(
    (txn) => txn.type === "expense"
  );
  const totalIncomePercent =
    (totalIncomeTransactions.length / totalTransaction) * 100;
  const totalExpensePercent =
    (totalExpenseTransactions.length / totalTransaction) * 100;

  //total Turnover
  const totalTurnover = allTransactions.reduce(
    (acc, txn) => acc + txn.amount,
    0
  );
  const totalIncomeTurnover = allTransactions
    .filter((txn) => txn.type === "income")
    .reduce((acc, txn) => acc + txn.amount, 0);

  const totalExpenseTurnover = allTransactions
    .filter((txn) => txn.type === "expense")
    .reduce((acc, txn) => acc + txn.amount, 0);

  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;
  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              No. of transactions : {totalTransaction}
            </div>
            <div className="card-body">
              <h5 className="text-success">
                Income : {totalIncomeTransactions.length}
              </h5>
              <h5 className="text-danger">
                Expense : {totalExpenseTransactions.length}
              </h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomePercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalExpensePercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">Total Turnover : {totalTurnover}</div>
            <div className="card-body">
              <h5 className="text-success">Income : {totalIncomeTurnover}</h5>
              <h5 className="text-danger">Expense : {totalExpenseTurnover}</h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomeTurnoverPercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalExpenseTurnoverPercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-4">
          <h4>Category wise Income</h4>
          <CategoryAnalytics
            type={"income"}
            turnoverType={totalIncomeTurnover}
            allTransactions={allTransactions}
          />
        </div>
        <div className="col-md-4">
          <h4>Category wise Income</h4>
          <CategoryAnalytics
            type={"expense"}
            turnoverType={totalExpenseTurnover}
            allTransactions={allTransactions}
          />
        </div>
      </div>
    </>
  );
};

export default Analytics;
