# Section 06: State, Events, and Forms - Interactive Components

**About:** In this section we will keep exploring fundamental React topics and finally make our components do something i.e. we will make components interactive now. To do that, we will start learning how to handle events in React and how to update the user interface using the extremely important concept of state. We will also start building our next project where we are going to focus on state and building forms in the React way using controlled elements. By the end of the section we will summarize everything we have learned about props and state, both in theory and in practice by building a really nice and small flashcards application. So this is a super essential and foundational section.

## Table of Content

- [Section 06: State, Events, and Forms - Interactive Components](#section-06-state-events-and-forms---interactive-components)
  - [Table of Content](#table-of-content)
  - [Lessons Learned](#lessons-learned)
    - [Let's Build a Steps Component](#lets-build-a-steps-component)
    - [Handling Events The React Way](#handling-events-the-react-way)
    - [What is State in React?](#what-is-state-in-react)
    - [Creating A State Variable With useState](#creating-a-state-variable-with-usestate)
    - [Don't Set State Manually!](#dont-set-state-manually)
    - [The Mechanics of State](#the-mechanics-of-state)
    - [Adding Another Piece of State](#adding-another-piece-of-state)
  - [Author](#author)

## Lessons Learned

### Let's Build a Steps Component

- If the data, for example an array, doesn't depend on anything that is inside a component then it should be located outside of the component. This is because otherwise each time that the component is executed, the data will be created again. But, we will learn about this more, later.

### Handling Events The React Way

- We are not going to use the `addEventListener()` in React because that is the imperative way of building UIs.
- In React we use a more declarative approach i.e. we do not select DOM elements and therefore, we do not use `addEventListener()`.
- Instead, we use something similar to the HTML inline event listener.
- Basically, we will directly listen for the event right on the element where they will happen.
- For example, if we want to listen for a click event on an JSX element, we will use the `onClick` prop on that element.
  - The "click" is the event name and we always prefix the event names with "on" - and we write all of it in camel case.
- We set its value to a function, and that function will be triggered whenever there is a click on that element.

```javascript
function App() {
  // NOTE: The function that we pass in the `onClick` prop is a function and not a function call. So it is a callback function.
  return <button onClick={() => alert("Hello, React!")}>Greet!</button>;
}
```

- This is how we handle events the React way. So, instead of using the `addEventListener()`, we specify an event listener directly on the element itself.
- In this case we used `onClick` but, there are other events too, for example `onMouseEnter`.
- Usually we do not define the function directly on the `onClick` prop. Instead, we define a function separately and then pass that function in the prop, like so:

```javascript
function App() {
  function handleClick() {
    alert("Hello, React!");
  }

  // NOTE: It is not a function call but a function value that we pass into the `onClick` prop. It is a callback function.
  return <button onClick={handleClick}>Greet!</button>;
}
```

- So, we can define any function we want inside a component body.

### What is State in React?

- We learned how to use event handlers, but now, we want them to actually do something useful because we want to make the component interactive and for that we need state.
- ![image](https://github.com/user-attachments/assets/83b1a9ce-6794-43ff-bec2-b4d60e415b64)
- Without a doubt, state is the most important concept in React.
- So everything basically revolves around state in React therefore, we will keep learning about state throughout the entire course.
- So, let's start with an overview of what exactly you will learn about state while going through this course.
- First, we will learn what state actually is, what it does, and why we need it - which is what this section is all about.
- Then we need to learn how to actually use state in practice using the `useState` or `useReducer` hooks, the context API, or even external tools like Redux.
- We will also need to deeply understand how to think about state in React.
- So, these are topics for future sections.
- With this out of the way, we are now ready to learn what state actually is.
- ![image](https://github.com/user-attachments/assets/5f786c49-bf6d-4574-b558-0e72d8b41034)
- We have learned how to pass data into a component by using props, which remember, is data coming from outside of the component.
- But what if a component needs to actually hold its own data and also hold it overtime?
- Also, what if we actually want to make our app interactive changing the UI as a result of an action?
- Well, that's where state comes into play.
- State is basically data that a component can hold overtime, and we use it for information that a component needs to remember throughout its lifecycle.
- Therefore, we can think of state as being the memory of a component.
- ![image](https://github.com/user-attachments/assets/cc21cc7c-747c-4026-a5fd-4d864c16eba3)
- Examples of state can be simple things like notification count, the text content of an input field, or the active tab in a tab component.
- It can also be a bit more complex data, for example, the content of a shopping cart.
- What all these pieces of state have in common is that, in the application, the user can easily change these values.
- For example, when they read a notification, the count will go down by one, or when they click on another tab, that tab will become active.
- Therefore, each of these components need to be able to hold this data overtime i.e. over the lifecycle of the application.
- For that reason, each of these pieces of information is a piece of state.
- Notice how we used the term "piece of state" here, because just the term "state" is more of a general term.
- So, a piece of state, or a state variable is just one single actual variable in the component that we can define in our code.
- On the other hand, the term state itself is more about the entire state that the component is in, like the entire condition at a certain point in time.
- Basically, the general term state is all teh pieces of state together.
- If this is confusing then don't worry - these are just some minor differences in terminology.
- In practice, we usually use the terms state, piece of state, and state variable quite interchangeably.
- Anyway, let's now move on to the most important aspect of state, which is the fact that updating state triggers React to re-render the component.
- ![image](https://github.com/user-attachments/assets/82b84e24-e5e4-4204-96a8-c01ca88f8f9f)
- So, whenever we update a piece of state in a component, this will make React re-render that component in the user interface i.e. it will create a new updated view for that component.
- A component's view is basically just the component visually rendered on the screen i.e. on the UI.
- Up until this point, we have used the generic term "user interface", but now, we are actually talking about a single component.
- When one single component is rendered, we call that a "view".
- All the views combined together make up the final user interface.
- In the beginning of the course we mentioned how React automatically keeps data in-sync with the UI - well, state is how React does that.
- We change the state, we change the UI.
- ![image](https://github.com/user-attachments/assets/f5d8032a-bd6e-4610-a145-cca8adf4771d)
- In summary, state allows developers to do two important things:
  - First, state allows us to update the component's view by re-rendering the component.
  - So, it gives us a way to change part of the UI.
  - Second, state allows developers to persist local variables between multiple renders and re-renders.
- So, if you think about it, state is basically a tool; and it is in-fact the most powerful tool that we have in the world of React.
- So, understanding how state works and what it does i.e. understanding the mechanics of state will unlock the power of React development for you.

### Creating A State Variable With useState

- In order to use state in practice in a component, we do it in 3 steps.
- First, we create a new state variable.
  - To do so, we use the `useState()` functin that React provides us.
  - Make sure that `useState` is imported from the React library in order to use it.
  - The `useState()` function takes in an argument. This argument is going to be the default value of the state variable it is used for.
  - This `useState()` function returns an array with two elements in it. The first position of this array holds the default value that we pass into the `useState()` function, and the second position holds a function which we can use to update our state variable.
  - So, we immediately destructure this array to use the variable and the function, like so: `const [step, setStep] = useState(1)`
- Second we use it in code, usually in JSX.
- Third, we then update the piece of state in some event handler.
  - In the event handler, we simply use the function that is held in the second position of the array that is returned by `useState()` to update the state variable. For example `setStep(step + 1)`
- NOTE: The `useState()` function is what we call a hook in React.
- We can identify hooks because they start with the `use` keyword.
- So, all the React functions that start with `use`, for example `useReducer`, `useState`, `useEffect` are all hooks; and we will learn what a React hook is a bit later.
- For now, all you need to know is that we can only call hooks like `useState` on the top level of the component function. We cannot call hooks inside an if-statement, or inside another function, or inside a loop. If we do that, we will immediately get an error.
- Another important thing about state is that we should really only update state using the setter function returned to us by the `useState` hook, not manually.

### Don't Set State Manually!

- When we try to update a state variable manually, React has no way of knowing that it is a state variable and that we are trying to update it.
- So, we should always use the setter function that provided to use by `useState` to update the state.
  - This setter function is the functional way of updating the state value, but without mutating it & React is all about immutability.
- We should use the setter funcion because the it is essentially tied to the state variable.

```javascript
import React, { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [step, setStep] = useState(1);
  const [test, setTest] = useState({ name: "Bhoami" });

  function handlePrevious() {
    if (step > 1) setStep(step - 1);
  }

  function handleNext() {
    if (step < 3) setStep(step + 1);

    /**
     * BAD PRACTICE
     *
     * This is a bad practice because sometimes in more complex
     * situations, this won't work.
     *
     * In general, mutating objects like this, especially in a framework
     * like React, which is all about immutability and functional state
     * updates, is bad practice.
     *
     * Never do this.
     */
    // test.name = "Jonas";

    /**
     * If you really want to update the `test` object, just use its
     * setter function.
     */
    setTest({ name: "Jonas" });
  }

  return (
    <div className="steps">
      <div className="numbers">
        <div className={step >= 1 ? "active" : ""}>1</div>
        <div className={step >= 2 ? "active" : ""}>2</div>
        <div className={step >= 3 ? "active" : ""}>3</div>
      </div>
      <p className="message">
        Step {step}: {messages[step - 1]}
        {test.name}
      </p>
      <div className="buttons">
        <button
          style={{ backgroundColor: "#7950f2", color: "#fff" }}
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          style={{ backgroundColor: "#7950f2", color: "#fff" }}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
```

- In conclusion, always treat state as immutable in React i.e. as something that you cannot change directly, but that you can only change using the tools that React gives us i.e. by using the setter function.

### The Mechanics of State

- We just saw the power of state by using the `useState` function, but now let's get a better understanding of how exactly state works in React.
- Let's start from a fundamental React principle that we have already discussed earlier.
- ![image](https://github.com/user-attachments/assets/6098a15b-40d4-4023-aeb0-f5a078b36790)
- Remember how we learned that in React we do not manipulate the DOM directly when we want to update a component's view.
- React is declarative, not imperative, so we never touch the DOM in our code.
- But if that's the case, then this leads us to the question of, how do we update the component on the screen whenever some data changes or whenever we need to respond to some event like a click?
- We already know that the answer to this question is state, but here we are trying to derive it from first principles.
- Anyway, to answer that question, we need to understand another fundamental React principle, which is the fact that React updates a component view by re-rendering that entire component whenever the underlying data changes.
- As soon as will reach the section about how React works behind the scenes, we will learn exact what actually happens inside React when a component re-renders.
- For now, just know that re-rendering basically means that React calls the component function again each time the component is rendered.
- Conceptually we can imagine this as React removing the entire view and replacing it with a new one each time a re-render needs to happen.
- ![re-rendering-view](https://github.com/user-attachments/assets/15990609-07e3-4e54-b277-a30627e18c4c)
- But again, we will learn exactly what happens, later.
- React preserves the component state throughout re-renders. So, even though a component can be rendered time and time again, the state will not be reset unless the component disappears from the UI entirely, which is what we call <ins>unmounting</ins>.
- Speaking of state, it is when state is updated that a component is automatically re-rendered.
- ![image](https://github.com/user-attachments/assets/f9d062f0-5611-49b9-bb8e-a03fdcd2a3f5)
- So, let's imagine that there is an event handler in the view, for example, on a button that the user can click.
- The moment that button is clicked, we can update a piece of state in our component using the setter function coming from the `useState` hook - just like we did in the last lesson.
- Then when React sees that the state has been changed, it will automatically re-render the component, which will result in an updated view for this component.
- For a more real example, we can look at the simple [advice app](../Section%2001/react-first-app-advice/src/App.jsx) that we built right in the first section of the course.
- ![image](https://github.com/user-attachments/assets/b3bd02e1-6c4a-413f-9b77-a43f079bffd8)
- In that application, each time we click the "Get Advice" button, a new piece of advice is fetched from the API.
- When that data arrives, we store that data in the advice state variable. So, we update the `advice` state.
- Let's suppose that the new advice is "Quality beats quantity.". React will notice the state change and re-render the component.
- So, it will remove the old one and display the new updated component view on the screen.
- With this hopefully the mechanics of state in React are very clear to you.
- In conclusion, as React developers, whenever we want to update a component view, we update its state.
- React will then react to that update and do its thing.
- In fact, this whole mechanism is so fundamental to React that it is actually the reason why React is called "React" in the first place.
- ![image](https://github.com/user-attachments/assets/402590ab-49db-48ad-8502-5bf9f3e99fda)
- On a high level, moving from component level to the application level, React reacts to state changes by re-rendering the user interface.
- That's the main thing that it does and therefore, it was decided to call this library <ins>React</ins>.
- With this, we have come full-circle from the first lesson about why frameworks exist.
- There we learned that frameworks exist to keep UI in-sync with data.
- So now, we have learned a bit better regarding how React does that.

### Adding Another Piece of State

- In our [steps application](./steps/src/App.jsx), when we click on the close button and change the value of the `isOpen` piece of state, note how the value of `step` piece of state is retained.
- For example, if the current value of `step` is 2, and then we toggle the `isOpen` state, the value of `step` is retained through those re-renders of the component.
- That's why we say that state is like a memory of the component. It can hold this information over time even though we render and re-render it over and over again.

## Author

- [@bhoamikhona](https://github.com/bhoamikhona)
