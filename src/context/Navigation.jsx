import { createContext, useState, useEffect } from "react";

const NavigationContext = createContext();

// the only reason that we are using this piece of state is to cause our component to rerender
function NavigationProvider ({ children }) {
 const [currentPath, setCurrentPath] = useState(window.location.pathname);

 // handling the user clicking forward and back buttons
 useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    
    window.addEventListener("popstate", onLocationChange);
    
    return () => {
      window.removeEventListener("popstate", onLocationChange);
    };
 }, []);

 const navigate = (to) => {
    window.history.pushState({}, "", to);
    setCurrentPath(to);
 };

 // sharing the navigation function and state with the rest of the application
  return (
    <NavigationContext.Provider value={{currentPath, navigate}}>
    {children}
    </NavigationContext.Provider>
  );

};

export { NavigationProvider };
export default NavigationContext;