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
    - [React Developer Tools](#react-developer-tools)
    - [Updating State Based on Current State](#updating-state-based-on-current-state)
    - [More Thoughts About State + State Guidelines](#more-thoughts-about-state--state-guidelines)
      - [One Component, One State](#one-component-one-state)
      - [UI As A Function Of State](#ui-as-a-function-of-state)
      - [In Practical Terms...](#in-practical-terms)
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

### React Developer Tools

- The React team built dev tools specific for React which can be extremely helpful when working with state. You can find more info [here](https://react.dev/learn/react-developer-tools).
- [React Developer Tools Chrome Extension](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- There are two parts of the React Dev Tools:
  - Components
  - Profiler (We will come back to profiler later in the course)
- Let's understand the components part of the tool.
- Components, as the name suggests, is for showing a component tree.
- So, it will essentially show all of the components with which our app is built; and on right side bar, it has all the states and props that a specific component uses.

### Updating State Based on Current State

- It is very common that we update a state variable based on the current value of that state.
- So, let's now learn how to best do that.

```javascript
import React, { useState } from "react";

export default function App() {
  const [step, setStep] = useState(1);

  function handlePrevious() {
    setStep(step - 1);
  }

  function handleNext() {
    setStep(step + 1);
  }

  return (
    <div>
      <p>{step}</p>
      <button onClick={handlePrevious}>previous</button>
      <button onClick={handleNext}>next</button>
    </div>
  );
}
```

- In the example above we are updating state based on teh current state. For example in the `handleNext()` function we are taking the current state and adding 1 to it.
- So, this is what we mean by "updating state based on the current state".
- The way we are doing it right now is working just fine.
- But, let's now imagine that after a few months, we come back to this app and then we want to change something.
- Let's say that we want the `handleNext()` function to actually move forward twice. So, let's say that we want to set the `step` state twice, like so:

```javascript
import React, { useState } from "react";

export default function App() {
  const [step, setStep] = useState(1);

  function handlePrevious() {
    setStep(step - 1);
  }

  function handleNext() {
    // setting the `step` state twice
    setStep(step + 1);
    setStep(step + 1);
  }

  return (
    <div>
      <p>{step}</p>
      <button onClick={handlePrevious}>previous</button>
      <button onClick={handleNext}>next</button>
    </div>
  );
}
```

- This is perfectly fine, we can call the same function twice.
- Now ideally, what this should do is to increase the value of `step` by 2 each time we click the `next` button.
- However, when we actually click the `next` button, it only increases the `step` state value by 1.
- We will go into detail regarding why this happens.
- But for now, all you need to know is that when you are trying to update a state based on its current state, we shouldn't do it the way we did above.
- Instead, we should pass in a callback function in the `setStep()` function instead of a value.
- This callback function will recieve the current value of the state as an argument.
  - There are multiple conventions on how to name this argument.
  - We can call it `step` but, that might create confusion.
  - We can also call it `curStep` or `s`.
  - For now, let's just call it `s` i.e. just an abbreviation.

```javascript
import React, { useState } from "react";

export default function App() {
  const [step, setStep] = useState(1);

  function handlePrevious() {
    // using a callback function
    setStep((s) => s - 1);
  }

  function handleNext() {
    // using a callback function
    setStep((s) => s + 1);
    setStep((s) => s + 1);
  }

  return (
    <div>
      <p>{step}</p>
      <button onClick={handlePrevious}>previous</button>
      <button onClick={handleNext}>next</button>
    </div>
  );
}
```

- This will now work the exact same way as before.
- So, the view now updates in the same way as before but, this is now a bit more correct because now if we click on the `next` button, we can see that the value of step is increased by 2 instead of 1.
- In the `handleNext()` function, in the first `setStep(s => s + 1)`, we update the step by 1 and then return that state.
- So, in the second `setStep(s => s + 1)`, the step is already increased by 1 and then we increase it by 1 more and returns that so, overall this updates the state by 2.
- So, in order to be safe for future updates, it is a good idea to always use a callback function like we did above when we want to update state based on the current value of that state.
- When we are not setting state based on the current state, then of course we can just pass in the value as normal, like so:

```javascript
import React, { useState } from "react";

export default function App() {
  const [user, setUser] = useState({ name: "Bhoami" });

  function handleClick() {
    // Here we are passing an entirely new object.
    // We are not updating the state value based on current state value
    // So, we can just pass in the value as normal.
    setUser({ name: "Janine" });
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <button onClick={handleClick}>Change Name</button>
    </div>
  );
}
```

- So, in this case we need no callback.
- We can just pass in the state value.
- But in order to be safe for future updates or when working with co-workers, it is best to update the state in a more safe way i.e. by using a callback function.
- So from now on, we will use a callback function to update state when we are trying to update it based on its current value.

### More Thoughts About State + State Guidelines

- As we finish this first dive into state, let's learn a few more important things about state, as well as some practical guidelines.

#### One Component, One State

- ![image](https://github.com/user-attachments/assets/f749fbac-9c18-4437-a9fb-49d84f20f324)
- First of all, there is one important technical detail that you should be aware of, and this might seem obvious but, it is still worth mentioning.
- That is the fact that each component really has and manages its own state.
- So, even if we render the same component multiple times on one page, each of these component instances will operate independently from all the other ones.
- In this example (in the image above), the three counter components all start with a piece of state called `score`, which will be initially set to 0.
- Then, if one of the buttons is clicked, that increases the score by one for each click, but only in that component.
- The state in all the other components stays the same.
- So again, if we change the state in one of the components, that won't affect the other components at all.
- So, the same thing is going to happen when we click on one of the other buttons, or even when one of the components is removed from the UI entirely.
- So, state really is isolated inside of each component.

#### UI As A Function Of State

- ![image](https://github.com/user-attachments/assets/070d26a9-0314-4e26-a441-68352111ec2d)
- If we analyze everything that we just learned about state, we can come to conclusion that we can basically think of the entire application view i.e. the entire user interface, as a function of state.
- In other words, the entire UI is always a representation of all the current states in all components.
- Taking this idea even one step further, a React application is fundamentally all about changing state over time, and of course, also correctly displaying that state at all times.
- This is really what the declarative approach to building user interfaces is all about.
- So, instead of viewing UI as explicit DOM manipulations with state, we now view a UI as a reflection of data changing over time.
- And as you know by now, we describe that reflection of data using state, event handlers, and JSX.
- So, we describe the UI and React does the rest.
- This might all sound a bit philosophical at this point in your journey, but as you become more and mroe experienced in building React apps and working with state, you will truly and deeply understand everything we learned in this lesson.

#### In Practical Terms...

- ![image](https://github.com/user-attachments/assets/255a70a9-53ca-4e5c-a598-044a25ca5545)
- Now to finish let's go through some guidelines on how to use state in practice.
- These guidelines are for you to keep as a reference.

1. You should create a new state variable for any data that a component should keep track of over time. The easy way to figure this out is to think of variables that need to change at some point in the future. So, if you are used to building apps in Vanilla JavaScript, those would be variables defined with `let` or `var`, or also an array or an object that you mutate over the application's lifecycle. So in React, you use state for those.
2. Another way of figuring out when you need state is this: Whenever you want something in a component to be dynamic, create a piece of state related to that "thing", and then update the state when the "thing" should change. In other words, when you need it to be dynamic.
   1. Since this "thing" is a bit abstract, let's think of a modal window that can either be open or closed.
   2. For a modal window, we can create a state variable called `isOpen` that will keep track of whether the modal is currently open or not.
   3. Then, when it is true, we display the window on the screen, and if it is false, we hide it.
3. Whenever you want to change the way a component looks like, or the data that it displays, just update its state, which you usually do inside an event handler function.
4. When you are actually building your components, it is going to be useful to always imagine the components view i.e. the component rendered on the screen, as a reflection of state changing and evolving over time.
5. Finally, there is one common mistake that many beginners make, which is to use state for every single variable that you need in a component, but that's really not necessary. So, do not use state for variables that do not trigger a re-render. This is because it will just cause unnecessary re-renders which can cause performance issues. So, it is very common to need some variables that are not state and for those, you can just use regular variables defined with `const`.

- This is the first set of guidelines about state, which should be more than enough for now.
- So, if you truly internalize these, then building React applications in the future should be a lot easier for you.
- This is because mastering state is the most difficult part of learning React, but once you overcome this hurdle and truly internalize when you need state and how it all works, it will unlock React development for you.

## Author

- [@bhoamikhona](https://github.com/bhoamikhona)
