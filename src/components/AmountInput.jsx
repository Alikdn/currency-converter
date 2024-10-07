import React from 'react';

function AmountInput({ value, onChange }) {
  return (
    <div>
      <label>Amount</label>
      <input 
      type="number" 
      value={value} 
      onChange={onChange} 
      className="amount-input" />
    </div>
  );
}

export default AmountInput;