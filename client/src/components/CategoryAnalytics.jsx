import React from "react";
import categories from "../data/category";
import { Progress } from "antd";


const CategoryAnalytics = ({ allTransactions, turnoverType, type }) => {
  return (
    <>
      {categories.map((category) => {
        const amount = allTransactions
          .filter((txn) => txn.type === type && txn.category === category)
          .reduce((acc, txn) => acc + txn.amount, 0);
        return (
          amount > 0 && (
            <div className="card">
              <div className="card-body">
                <h5>{category}</h5>
                <Progress
                  percent={((amount / turnoverType) * 100).toFixed(0)}
                />
              </div>
            </div>
          )
        );
      })}
    </>
  );
};

export default CategoryAnalytics;
