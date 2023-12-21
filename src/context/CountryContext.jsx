import { createContext } from "react";

const CountryContext = createContext({
  country: "US",
  setCountry: (country) => {},
});

export default CountryContext;
