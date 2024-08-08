import React from "react";
import { useState } from "react";

function App() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  const date = new Date();
  date.setDate(date.getDate() + count);

  function reset() {
    setStep(1);
    setCount(0);
  }

  return (
    <main className="main">
      <div className="left">
        <div className="step-div">
          <button
            className="btn"
            onClick={() => setStep((s) => (s > 1 ? s - 1 : s))}
          >
            -
          </button>
          <p className="text">Step: {step}</p>
          <button className="btn" onClick={() => setStep((s) => s + 1)}>
            +
          </button>
        </div>
        <div className="count-div">
          <button className="btn" onClick={() => setCount((c) => c - step)}>
            -
          </button>
          <p className="text">Count: {count}</p>
          <button className="btn" onClick={() => setCount((c) => c + step)}>
            +
          </button>
        </div>

        <button className="btn reset" onClick={reset}>
          Reset
        </button>
      </div>

      <div className="right">
        <p className="date">
          <span className="date-top">
            {count === 0
              ? "Today is"
              : count > 0
              ? `${count} day(s) from today is `
              : `${Math.abs(count)} day(s) ago from today was `}
          </span>
          <span className="date-bottom">{date.toDateString()}</span>
        </p>
      </div>
    </main>
  );
}

export default App;
