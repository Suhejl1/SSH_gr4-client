import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ cart, shippingData, onCaptureCheckout, nextStep, backStep }) => {
  const history = useHistory();

  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      const orderItems = cart.map((item) => ({
        productItemId: item.id,
        orderId: null, // Assuming the orderId is generated on the backend
        quantity: item.quantity,
        price: item.price,
      }));

      const orderData = {
        userId: shippingData.userId,
        orderDate: new Date().toISOString().split('T')[0],
        shippingAddress: `${shippingData.address}, ${shippingData.city}, ${shippingData.zip}`,
        orderTotal: cart.reduce((total, item) => total + (item.price * item.quantity), 0),
        orderItems: orderItems,
      };

      console.log("Order dat in payment form:", orderData);
      toast.success("Order placed successfully!");
      onCaptureCheckout(orderData);
      nextStep();

      history.push('/home');
    }
  };

  return (
    <>
      <Review cart={cart} shippingData={shippingData} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br /> <br />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" onClick={backStep}>Back</Button>
                <Button type="submit" variant="contained" color="primary" disabled={!stripe}>
                  Pay ${cart.reduce((total, item) => total + (item.price * item.quantity), 0)}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;