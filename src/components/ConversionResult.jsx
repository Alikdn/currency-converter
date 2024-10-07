import React from 'react';

function ConversionResult({ amount, currency }) {
  return (
    <div>
      <h2>Converted Amount</h2>
      <p>{Number(amount).toFixed(4)} {currency}</p>  {/* Ensure 4 decimal places */}
    </div>
  );
}

export default ConversionResult;