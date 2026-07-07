"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const currencies = [
  { code: 'EUR', symbol: '€', label: 'EUR (€)', rate: 1.0 },
  { code: 'USD', symbol: '$', label: 'USD ($)', rate: 1.08 },
  { code: 'MAD', symbol: 'DH', label: 'MAD (DH)', rate: 10.85 },
  { code: 'GBP', symbol: '£', label: 'GBP (£)', rate: 0.85 },
];

export function CurrencyProvider({ children }) {
  const [activeCurrency, setActiveCurrency] = useState('EUR');

  // Hydrate selected currency state from client storage if available
  useEffect(() => {
    const saved = localStorage.getItem('morocco_vibe_currency');
    if (saved && currencies.some(c => c.code === saved)) {
      setActiveCurrency(saved);
    }
  }, []);

  const changeCurrency = (code) => {
    if (currencies.some(c => c.code === code)) {
      setActiveCurrency(code);
      localStorage.setItem('morocco_vibe_currency', code);
    }
  };

  const getCurrencyDetails = () => {
    return currencies.find(c => c.code === activeCurrency) || currencies[0];
  };

  // Convert base EUR price dynamically and output clean currency formatting
  const formatPrice = (basePriceInEUR) => {
    if (basePriceInEUR === undefined || basePriceInEUR === null || isNaN(Number(basePriceInEUR))) {
      return '—';
    }
    const current = getCurrencyDetails();
    const converted = Math.round(Number(basePriceInEUR) * current.rate);
    
    // Custom suffix representation for MAD Moroccan Dirham
    if (current.code === 'MAD') {
      return `${converted.toLocaleString()} DH`;
    }
    return `${current.symbol}${converted.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{ activeCurrency, changeCurrency, formatPrice, currencies }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
