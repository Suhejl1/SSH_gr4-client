import React, { useState } from 'react';
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import Review from '../Review';


const steps = ['Shipping address', 'Payment details', 'Review your order'];

const Checkout = ({ cart, onCaptureCheckout, order, error }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const classes = useStyles();
  const history = useHistory();

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  const Form = () => {
    if (activeStep === 0) {
      return <AddressForm next={next} />;
    } else if (activeStep === 1) {
      return <PaymentForm shippingData={shippingData} nextStep={nextStep} backStep={backStep} onCaptureCheckout={onCaptureCheckout} cart={cart} />;
    } else {
      return <Review cart={cart} shippingData={shippingData} nextStep={nextStep} />;
    }
  };

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation order={order} error={error} /> : <Form />}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
