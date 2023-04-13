import React, { useState } from "react";
import "./TransactionTable.css"

function TransactionTable({
  transactions,
  onEditTransaction,
  onDeleteTransaction
}) {
  const [sortBy, setSortBy] = useState("date");
  const [filterBy, setFilterBy] = useState("all");

  // Sort transactions by date
  const sortedTransactions = transactions.sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === "amount") {
      return b.amount - a.amount;
    } else {
      return 0;
    }
  });

  // Filter transactions by type
  const filteredTransactions = sortedTransactions.filter((transaction) => {
    if (filterBy === "all") {
      return true;
    } else {
      return transaction.type === filterBy;
    }
  });

  return (
    <div>
      {/* Sorting dropdown */}
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="date">Sort by Date</option>
        <option value="amount">Sort by Amount</option>
      </select>

      {/* Filtering dropdown */}
      <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
        <option value="all">All Transactions</option>
        <option value="+">Income</option>
        <option value="-">Expense</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction, index) => {
            return(
            <tr key={index}>
              <td>{transaction.description}</td>
              <td>{transaction.currency}{transaction.amount}</td>
              <td>{transaction.type === "+" ? (
                <span className="income">Income</span>
              ) : (
                <span className="expense">Expense</span>
              )}
              </td>
              <td>{transaction.date.toLocaleDateString()}</td>
              <td>
                <button onClick={() => onEditTransaction(transaction)}>Edit</button>
                <button onClick={() => onDeleteTransaction(transaction)}>Delete</button>
              </td>
            </tr>
          )})}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;
