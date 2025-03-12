import  { useEffect } from 'react';

const PayPalPayment = () => {
  useEffect(() => {
    const loadPayPalScript = () => {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=AY48GvE-KpIwdl1MRHd_jgL-tJOjTwyYfUSYYU3jFfqQcP4tCGzqUxe3ZFXqr2ooIXiYey88DGVgey4E`;
      script.onload = () => {
        window.paypal.Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: '10.00', // Replace with the payment amount
                  },
                },
              ],
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
              alert(`Transaction completed by ${details.payer.name.given_name}`);
            });
          },
          onError: (err) => {
            console.error(err);
          },
        }).render('#paypal-button-container');
      };
      document.body.appendChild(script);
    };

    loadPayPalScript();
  }, []);

  return <div id="paypal-button-container"></div>;
};

export default PayPalPayment;
