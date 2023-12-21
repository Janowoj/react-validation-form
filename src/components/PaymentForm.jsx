import { useState, useContext } from "react";
import CountryContext from "../context/CountryContext";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import DropdownPage from "../pages/DropdownPage";

// const CARD_OPTIONS = {
// 	iconStyle: "solid",
// 	style: {
// 		base: {
// 			iconColor: "#c4f0ff",
// 			color: "black",
// 			fontWeight: 500,
// 			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
// 			fontSize: "16px",
// 			fontSmoothing: "antialiased",
// 			":-webkit-autofill": { color: "black" },
// 			"::placeholder": { color: "black" }
// 		},
// 		invalid: {
// 			iconColor: "#ffc7ee",
// 			color: "black"
// 		}
// 	}
// }

const countryToDefaultName = {
  US: "John Doe",
  PL: "Jan Kowalski",
};

function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const { country } = useContext(CountryContext);

  const stripe = useStripe();
  const elements = useElements();
  // const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(
        CardCvcElement,
        CardExpiryElement,
        CardNumberElement,
      ),
      confirmParams: {
        return_url: "http://localhost:4000/payment",
      },
      redirect: 'if_required'
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:4000/payment", {
          amount: 10000,
          id,
        });
        if (response.data.success) {
          console.log("Successful Payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <div>
        <div className="select">
        <DropdownPage />
      </div>
        <form onSubmit={handleSubmit}>
          <h2>{country === 'US' ? 'Payment Form' : 'Formularz zamówienia'}</h2>
          <h3>{country === 'US' ? 'Validating CreditCard with stripe' : 'Walidacja karty kredytowej za pomocą Stripe'}</h3>

          <fieldset className="FormGroup">
            <div className="FormRow">
              {countryToDefaultName[country]}
            </div>
          </fieldset>

          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardNumberElement />
            </div>
          </fieldset>

          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardExpiryElement />
            </div>
          </fieldset>

          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardCvcElement />
            </div>
          </fieldset>
          <button>{country === 'US' ? 'PAY' : 'PŁAĆ'} </button>
        </form>
        </div>
      ) : (
        <div className="payment-success">
          <h2>Payment successful</h2>
          <h3 className="Thank-you">Thank You for your patronage</h3>
        </div>
      )}
    </>
  );
}

export default PaymentForm;
