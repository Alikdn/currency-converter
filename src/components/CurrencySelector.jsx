import React from 'react';

function CurrencySelector({ label, value, onChange, currencies }) {
  return (
    <div>
      <label>{label}</label>
      <select value={value} onChange={onChange}>
        {currencies.map((currency, index) => (
          <option key={index} value={currency}>{currency}</option>
        ))}
      </select>
    </div>
  );
}

export default CurrencySelector;