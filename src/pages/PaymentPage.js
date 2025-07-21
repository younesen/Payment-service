import React, { useState } from 'react';
import axios from 'axios';
import { FaCreditCard, FaMobileAlt, FaLandmark, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import paymentIllustration from './assets/payment-illustration.jpg';
import '../styles/PaymentPage.scss';

const ModernPaymentCard = () => {
  const [formData, setFormData] = useState({
    amount: '',
    paymentMethod: 'CREDIT_CARD',
    phoneNumber: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    creditor: 'Client Pro'
  });

  const [activeTab, setActiveTab] = useState('creditCard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatCardNumber = (value) => {
    return value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

 const handleSubmit = async (e) => {
   e.preventDefault();
   setIsProcessing(true);

   try {
     const endpoint = formData.paymentMethod === 'CREDIT_CARD'
       ? 'http://localhost:9090/api/payments'
       : formData.paymentMethod === 'MTC'
         ? 'http://localhost:9090/api/mtc-mock/payments'
         : 'http://localhost:9090/api/tgr/payments';

     const response = await axios.post(endpoint, formData);
     setPaymentResult({
       success: true,
       data: response.data,
       method: formData.paymentMethod
     });
   } catch (error) {
     setPaymentResult({
       success: false,
       error: error.response?.data?.message || "Échec du paiement"
     });
   } finally {
     setIsProcessing(false);
   }
 };


  return (
    <div className="payment-container">
      <div className="payment-header">
        <h2>Paiement Sécurisé</h2>
        <p>Effectuez vos transactions en toute confiance</p>
      </div>

      <div className="payment-card">
        <div className="payment-methods">
          <button 
            className={`method-tab ${activeTab === 'creditCard' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('creditCard');
              setFormData(prev => ({ ...prev, paymentMethod: 'CREDIT_CARD' }));
            }}
          >
            <FaCreditCard className="method-icon" />
            <span>Carte Bancaire</span>
          </button>
          
          <button 
            className={`method-tab ${activeTab === 'mtc' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('mtc');
              setFormData(prev => ({ ...prev, paymentMethod: 'MTC' }));
            }}
          >
            <FaLandmark className="method-icon" />
            <span>MTC Pay</span>
          </button>
          
          <button 
            className={`method-tab ${activeTab === 'tgr' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('tgr');
              setFormData(prev => ({ ...prev, paymentMethod: 'TGR' }));
            }}
          >
            <FaLandmark className="method-icon" />
            <span>TGR Pay</span>
          </button>
        </div>

        <div className="payment-body">
          <div className="payment-illustration">
            <img src={paymentIllustration} alt="Paiement sécurisé" />
            <div className="security-badge">
              <span>100% Sécurisé</span>
              <div className="secure-icons">
                <div className="lock-icon">🔒</div>
                <div className="ssl-icon">SSL</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="payment-form">
            {activeTab === 'creditCard' && (
              <>
                <div className="form-group">
                  <label>Numéro de carte</label>
                  <div className="card-input">
                    <FaCreditCard className="card-icon" />
                    <input
                      type="text"
                      name="cardNumber"
                      value={formatCardNumber(formData.cardNumber)}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 16) {
                          handleInputChange({
                            target: {
                              name: 'cardNumber',
                              value: value
                            }
                          });
                        }
                      }}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      required
                    />
                  </div>
                </div>

                <div className="card-details">
                  <div className="form-group">
                    <label>Date d'expiration</label>
                    <input
                      type="text"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, '');
                        if (value.length > 2) {
                          value = value.substring(0, 2) + '/' + value.substring(2, 4);
                        }
                        if (value.length <= 5) {
                          handleInputChange({
                            target: {
                              name: 'cardExpiry',
                              value: value
                            }
                          });
                        }
                      }}
                      placeholder="MM/AA"
                      maxLength={5}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Code CVC</label>
                    <div className="cvc-input">
                      <input
                        type="text"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 3) {
                            handleInputChange({
                              target: {
                                name: 'cardCvc',
                                value: value
                              }
                            });
                          }
                        }}
                        placeholder="123"
                        maxLength={3}
                        required
                      />
                      <span className="cvc-hint">3 chiffres au dos</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'mtc' && (
              <div className="form-group">
                <label>Numéro de téléphone</label>
                <div className="phone-input">
                  <span className="country-code">+212</span>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="6 12 34 56 78"
                    required
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Montant (MAD)</label>
              <div className="amount-input">
                <span className="currency">MAD</span>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  min="1"
                  step="0.01"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span className="processing">
                  <span className="spinner"></span>
                  Traitement...
                </span>
              ) : (
                `Payer ${formData.amount ? formData.amount + ' MAD' : ''}`
              )}
            </button>

            <div className="payment-footer">
              <div className="accepted-cards">
                <img src="./assets/visa.png" alt="Visa" />
                <img src="./assets/mastercard.png" alt="Mastercard" />
                <img src="./assets/cih.png" alt="CIH" />
                <img src="./assets/bam.png" alt="AM" />
              </div>
              <p className="secure-info">
                <FaCheckCircle className="secure-icon" />
                Transactions 100% sécurisées
              </p>
            </div>
          </form>
        </div>
      </div>

      {paymentResult && (
        <div className={`payment-result ${paymentResult.success ? 'success' : 'error'}`}>
          <div className="result-content">
            {paymentResult.success ? (
              <>
                <FaCheckCircle className="result-icon" />
                <h3>Paiement Réussi!</h3>
                <p>Référence: <strong>{paymentResult.data.transactionId}</strong></p>
                <p>Montant: <strong>{formData.amount} MAD</strong></p>
                <p>Méthode: <strong>{paymentResult.method === 'CREDIT_CARD' ? 'Carte Bancaire' : paymentResult.method === 'MTC' ? 'Maroc Telecommerce' : 'TGR Maroc'}</strong></p>
              </>
            ) : (
              <>
                <FaTimesCircle className="result-icon" />
                <h3>Paiement Échoué</h3>
                <p>{paymentResult.error}</p>
                <button className="retry-btn" onClick={() => setPaymentResult(null)}>
                  Réessayer
                </button>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default ModernPaymentCard;