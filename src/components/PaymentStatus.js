// src/components/PaymentStatus.js
import React from 'react';
import './PaymentStatus.scss';  // Assurez-vous que ce fichier existe

const PaymentStatus = ({ status }) => {
  return (
    <div className={`payment-status ${status ? 'success' : 'failure'}`}>
      {status ? 'Paiement effectué avec succès!' : 'Échec du paiement. Veuillez réessayer.'}
    </div>
  );
};

export default PaymentStatus;
