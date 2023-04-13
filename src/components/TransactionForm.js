import React, { useState, useEffect } from "react";
import { currencyFormat } from "../util";
import "./TransactionForm.css";

function TransactionForm({ currency, onAddTransaction, onEditSubmit, editingTransaction }) {

  // Initialize state for form inputs
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("+");

  useEffect(() => {
    if (editingTransaction) {
      setDescription(editingTransaction.description);
      setAmount(editingTransaction.amount);
      setTransactionType(editingTransaction.type);
    }
  }, [editingTransaction]);

  // Function to handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create new transaction object
    const newTransaction = {
      description,
      amount: parseFloat(amount),
      type: transactionType,
      date: new Date(),
      currency: currencyFormat[currency],
    };

    if (editingTransaction) {
      // Call the onEditSubmit function with the updated transaction and the index of the transaction to be edited
      onEditSubmit(newTransaction, editingTransaction.index);
    } else {
      // Add new transaction to transactions array
      onAddTransaction(newTransaction);
    }

    // Reset form inputs
    setDescription("");
    setAmount("");
    setTransactionType("+");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          />
      </div>
      <div className="form-control">
        <label htmlFor="amount">Amount ({currency})</label>
          <input
          type="number"
          id="amount"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          />
      </div>
      <div className="form-control">
        <label htmlFor="transactionType">Type</label>
          <select
          id="transactionType"
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          required
          >
          <option value="+">Income</option>
          <option value="-">Expense</option>
          </select>
      </div>
      <button className="btn">{editingTransaction ? "Edit Transaction" : "Add Transaction"}</button>
    </form>
    );
}
          
export default TransactionForm;
