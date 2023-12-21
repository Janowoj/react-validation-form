import { useState, useEffect, useRef, useContext } from "react";
import Panel from "./Panel";
import "primeicons/primeicons.css";
import CountryContext from "../context/CountryContext";

function Dropdown({ options }) {
  const { setCountry } = useContext(CountryContext);
  const [selection, setSelection] = useState(null);

  const onChange = (option) => {
    setSelection(option);
    setCountry(option.value);
  };

  const [isOpen, setIsOpen] = useState(false);
  const divElement = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!divElement.current) return;

      if (!divElement.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const handleClick = () => {
    // setIsOpen((currentIsOpen) => !currentIsOpen); // practically it is impossible to click on this item faster than the rendering time
    setIsOpen(!isOpen);
  };

  // window.timeTwo = performance.now();
  const handleOptionClick = (option) => {
    window.timeOne = performance.now();

    // CLOSE DROPDOWN
    setIsOpen(false);
    // DISPLAY WHAT DID THE USER CLICK ON? instead of event object we can pass the option object
    onChange(option);
  };

  const renderedOptions = options.map((option) => {
    return (
      <div
        className="hover:bg-sky-100 rounded cursor-pointer p-1"
        onClick={() => handleOptionClick(option)}
        key={option.value}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div ref={divElement} className="w-48 relative">
      <Panel
        className="flex justify-between items-center cursor-pointer"
        onClick={handleClick}
      >
        {selection?.label || "Select..."}
        <i className="pi pi-angle-down" style={{ fontSize: "1rem" }}></i>
      </Panel>
      {isOpen && (
        <Panel
        // className="absolute top-full"
        >
          {renderedOptions}
        </Panel>
      )}
    </div>
  );
}

export default Dropdown;
