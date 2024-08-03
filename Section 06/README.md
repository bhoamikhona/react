# Section 06: State, Events, and Forms - Interactive Components

**About:** In this section we will keep exploring fundamental React topics and finally make our components do something i.e. we will make components interactive now. To do that, we will start learning how to handle events in React and how to update the user interface using the extremely important concept of state. We will also start building our next project where we are going to focus on state and building forms in the React way using controlled elements. By the end of the section we will summarize everything we have learned about props and state, both in theory and in practice by building a really nice and small flashcards application. So this is a super essential and foundational section.

## Table of Content

- [Section 06: State, Events, and Forms - Interactive Components](#section-06-state-events-and-forms---interactive-components)
  - [Table of Content](#table-of-content)
  - [Lessons Learned](#lessons-learned)
    - [Let's Build a Steps Component](#lets-build-a-steps-component)
    - [Handling Events The React Way](#handling-events-the-react-way)
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

## Author

- [@bhoamikhona](https://github.com/bhoamikhona)
