import { useState } from "react";
import CountryContext from "./context/CountryContext";
import "./index.css";
import Stripe from "./components/Stripe";
import Fiat from "./assets/fiat126p.jpg";
import Link from "./components/Link";



function App() {
  const [country, setCountry] = useState("US");
  const value = { country, setCountry };
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="App">
      <CountryContext.Provider value={value}>
        {showForm ? (
          <Stripe />
        ) : (
          <>
            <h3>$100.00</h3> <img src={Fiat} alt="product" />{" "}
            <Link to='/payment-form'>
            <button onClick={() => setShowForm(true)}>BUY</button>
            </Link>
            
          </>
        )}
      </CountryContext.Provider>
    </div>
  );
}

export default App;
