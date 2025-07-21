// src/components/PaymentForm.js
import React, { useState } from 'react';
import './PaymentForm.scss';  // Assurez-vous que ce fichier existe

const PaymentForm = ({ onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(amount, paymentMethod);
    }
  };

  return (
    <div className="payment-form">
      <form onSubmit={handleSubmit}>
        <h2>Paiement</h2>

        <div className="form-group">
          <label htmlFor="amount">Montant :</label>
          <input
            id="amount"
            type="number"
            placeholder="Entrez le montant"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="payment-method">Méthode de paiement :</label>
          <select
            id="payment-method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="">Sélectionnez une méthode</option>
            <option value="credit-card">Carte de crédit</option>
            <option value="paypal">PayPal</option>
            <option value="bank-transfer">Virement bancaire</option>
          </select>
        </div>

        <button type="submit">Effectuer le paiement</button>
      </form>
    </div>
  );
};

export default PaymentForm;
