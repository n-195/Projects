import React, { useState } from "react";
import "./App.css";
import CurrencyDropdown from "./components/CurrencyDropdown";
import TransactionForm from "./components/TransactionForm";
import TransactionTable from "./components/TransactionTable";
import Summary from "./components/Summary";

function App() {
  // Initialize state for currency
  const [currency, setCurrency] = useState("USD");

  // Initialize state for transactions
  const [transactions, onAddTransaction] = useState([]);

  // Initialize state for editing transaction
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleAddTransaction = (newTransaction) => {
    onAddTransaction([...transactions, newTransaction]);
  };

  const handleDeleteTransaction = (transactionToDelete) => {
    onAddTransaction(
      transactions.filter((transaction) => transaction !== transactionToDelete)
    );
  };

  const handleEditTransaction = (transactionToEdit) => {
    setEditingTransaction(transactionToEdit);
  };

  const handleEditSubmit = (editedTransaction) => {
    const updatedTransactions = transactions.map((transaction) =>
      transaction === editingTransaction ? editedTransaction : transaction
    );
    onAddTransaction(updatedTransactions);
    setEditingTransaction(null);
  };

  return (
    <div className="App">
      <h1>Expense Tracker</h1>

      {/* Dropdown menu for selecting currency */}
      <CurrencyDropdown 
        currency={currency} 
        onCurrencyChange={setCurrency} 
      />

      {/* Transaction form */}
      <TransactionForm
        currency={currency}
        onAddTransaction={handleAddTransaction}
        onEditSubmit={handleEditSubmit}
        editingTransaction={editingTransaction}
      />

      {/* Transaction table */}
      <TransactionTable
        transactions={transactions}
        onEditTransaction={handleEditTransaction}
        onDeleteTransaction={handleDeleteTransaction}
      />

      {/* Summary */}
      <Summary 
        currency={currency}
        transactions={transactions}
      />
    </div>
  );
}

export default App;
