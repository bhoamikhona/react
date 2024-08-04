# Section 06: State, Events, and Forms - Interactive Components

**About:** In this section we will keep exploring fundamental React topics and finally make our components do something i.e. we will make components interactive now. To do that, we will start learning how to handle events in React and how to update the user interface using the extremely important concept of state. We will also start building our next project where we are going to focus on state and building forms in the React way using controlled elements. By the end of the section we will summarize everything we have learned about props and state, both in theory and in practice by building a really nice and small flashcards application. So this is a super essential and foundational section.

## Table of Content

- [Section 06: State, Events, and Forms - Interactive Components](#section-06-state-events-and-forms---interactive-components)
  - [Table of Content](#table-of-content)
  - [Lessons Learned](#lessons-learned)
    - [Let's Build a Steps Component](#lets-build-a-steps-component)
    - [Handling Events The React Way](#handling-events-the-react-way)
    - [What is State in React?](#what-is-state-in-react)
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

## Author

- [@bhoamikhona](https://github.com/bhoamikhona)
