import React from "react";
import "./CurrencyDropdown.css";

function CurrencyDropdown({ currency, onCurrencyChange }) {
  const currencies = ["USD", "EUR", "INR", "JPY"];

  return (
    <div className="form-control">
      <label htmlFor="currency">Currency</label>
      <select
        id="currency"
        value={currency}
        onChange={(e) => onCurrencyChange(e.target.value)}
      >
        {currencies.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencyDropdown;
