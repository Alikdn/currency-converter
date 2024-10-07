import React, { useState, useEffect } from 'react';
import './App.css';
import CurrencySelector from './components/CurrencySelector';
import AmountInput from './components/AmountInput';
import ConversionResult from './components/ConversionResult';

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [error, setError] = useState(null);

  // Fetch exchange rates
  useEffect(() => {
    fetch(`https://v6.exchangerate-api.com/v6/70164fa06850c06e4771cf48/latest/${fromCurrency}`)
      .then(response => response.json())
      .then(data => {
        if (data.result !== 'success') throw new Error('Failed to fetch data');
        setCurrencies(Object.keys(data.conversion_rates));
        setExchangeRate(data.conversion_rates[toCurrency]);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load exchange rates');
      });
  }, [fromCurrency, toCurrency]);
  
  useEffect(() => {
    setConvertedAmount((amount * exchangeRate) .toFixed(4));
  }, [amount, exchangeRate]);

  const handleFromCurrencyChange = (e) => setFromCurrency(e.target.value);
  const handleToCurrencyChange = (e) => setToCurrency(e.target.value);
  const handleAmountChange = (e) => setAmount(e.target.value);

  return (
    <div className="App">
      <header className="header">
        <a href='/'>
        <img src="/logo.PNG" alt='Logo' className="logo"></img>
        </a>
      </header>
      <h1>Currency Converter</h1>
      <p><i>Check live foreign currency exchange rates</i></p>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="converter">
        <CurrencySelector
          label="From"
          value={fromCurrency}
          onChange={handleFromCurrencyChange}
          currencies={currencies}
        />
        <CurrencySelector
          label="To"
          value={toCurrency}
          onChange={handleToCurrencyChange}
          currencies={currencies}
        />
        <AmountInput value={amount} onChange={handleAmountChange} />
        <ConversionResult amount={convertedAmount} currency={toCurrency} />
      </div>

      <footer>
        <p> Made by Ali ©</p>
        <a href="https://x.com/Alikdn_" target="_blank" rel="noopener noreferrer">
          <img src="/X_logo_2023.svg.webp" alt="Twitter X" width="30" />
        </a>
        <div className='contact-button-container'>
          <button className='contact-button' onClick={() => window.location.href = 
            'mailto:ali.casawi.el@gmail.com?subject=Currency%20Converter%20Inquiry&body=Hello%20Ali,'}>Contact Us
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;