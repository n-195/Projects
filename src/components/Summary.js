import React from "react";

function Summary(props) {
  const { transactions } = props;
  const expenses = transactions
      .filter((transaction) => transaction.type === "-")
      .reduce((acc, cur) => acc + cur.amount, 0);

  const income = transactions
      .filter((transaction) => transaction.type === "+")
      .reduce((acc, cur) => acc + cur.amount, 0);

  
  const netIncome = income - expenses;

  const calculateExpenses = () => {
    const expenseFormatted = expenses.toLocaleString(undefined, {
      style: "currency",
      currency: props.currency,
    });
    return expenseFormatted;
  };

  const calculateIncome = () => {
    const incomeFormatted = income.toLocaleString(undefined, {
      style: "currency",
      currency: props.currency,
    });
    return incomeFormatted;
  };
  
  const calculateNetIncome = () => {
    const netIncomeFormatted = netIncome.toLocaleString(undefined, {
      style: "currency",
      currency: props.currency,
    });
    return netIncomeFormatted;
  }


  return (
    <div className="summary">
      <div>
        <h4>Expenses</h4>
        <p>{calculateExpenses()}</p>
      </div>
      <div>
        <h4>Income</h4>
        <p>{calculateIncome()}</p>
      </div>
      <div>
        <h4>Balance</h4>
        <p>{calculateNetIncome()}</p>
      </div>
    </div>
  );
}

export default Summary;
