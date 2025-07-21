// src/services/paymentService.js
export const submitPayment = async (amount, paymentMethod) => {
  try {
    // Simuler un appel API pour traiter le paiement
    const response = await fetch('http://localhost:8080/api/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, paymentMethod }),
    });

    const data = await response.json();
    return { status: data.success ? 'success' : 'failure' };
  } catch (error) {
    console.error('Erreur lors du paiement:', error);
    return { status: 'failure' };
  }
};
