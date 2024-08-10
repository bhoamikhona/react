import React from "react";
import { useState } from "react";

function App() {
  return (
    <main className="main">
      <Counter1 />
      <Counter2 />
    </main>
  );
}

export default App;

function Counter1() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  const date = new Date();
  date.setDate(date.getDate() + count);

  function reset() {
    setStep(1);
    setCount(0);
  }

  return (
    <article className="counter">
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
    </article>
  );
}

function Counter2() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  const date = new Date();
  date.setDate(date.getDate() + count);

  function handleReset() {
    setStep(1);
    setCount(0);
  }

  return (
    <article className="counter">
      <div className="left">
        <div className="step-div">
          <input
            className="step-range"
            id="range"
            type="range"
            min="0"
            max="10"
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
          />
          <label htmlFor="range" className="step-label">
            {step}
          </label>
        </div>
        <div className="count-div">
          <button className="btn" onClick={() => setCount((c) => c - step)}>
            -
          </button>
          <input
            className="step-input"
            type="text"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            placeholder="0"
          />
          <button className="btn" onClick={() => setCount((c) => c + step)}>
            +
          </button>
        </div>
        {count !== 0 || step !== 1 ? (
          <button onClick={handleReset} className="btn reset">
            Reset
          </button>
        ) : null}
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
    </article>
  );
}
