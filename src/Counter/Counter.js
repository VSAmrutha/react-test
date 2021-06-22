import React, { useState } from "react";
import "./Counter.css";
export default function Counter() {
  const [counterValue, setCounterValue] = useState(0);
  const [inputValue, setInputValue] = useState(1);
  const onChangeValue = (e) => {
    setInputValue(parseInt(e.target.value));
  };
  const addButton = () => {
    setCounterValue(counterValue + inputValue);
  };
  const subtractButton = () => {
    setCounterValue(counterValue - inputValue);
  };
  return (
    <div className="counter">
      <h1 data-testId="header" className="h1">
        Counter
      </h1>
      <h2
        className={`${counterValue >= 100 ? "green" : ""}${
          counterValue <= -100 ? "red" : ""
        } h2`}
        data-testId="counter"
      >
        {counterValue}
      </h2>
      <button
        className="generic-btn button-sub"
        onClick={subtractButton}
        data-testId="sub-btn"
      >
        -
      </button>
      <input
        className="inputCounter"
        data-testId="input"
        type="number"
        onChange={onChangeValue}
        value={inputValue}
      />

      <button
        className="generic-btn button-add"
        onClick={addButton}
        data-testId="add-btn"
      >
        +
      </button>
    </div>
  );
}
