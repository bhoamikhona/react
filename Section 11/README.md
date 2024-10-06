# Section 11: How React Works Behind The Scenes

**About:** Welcome to probably the most challenging section in this course but also, one of the most exciting ones and most rewarding ones. Up until this point we have only focused on how React concepts and features work in practice, but now it is time to understand how things actually work internally, inside React, behind the scenes. This information that you are about to learn will not only make you a much better and more confident React developer, but it will also allow you to ace the most common React interview questions with all the confidence that you need in order to nail the job. This knowledge will actually put you right in the top 5% of all React developers. This section is quite intense and it should probably be in the advanced part of the course, but since there are so many important things to learn about before moving on, it was decided to place right here. If at some point it becomes a bit too much or if you become bored, please take a look at the final lesson of the section where we will briefly summarize everything we have covered. So, that lessons is really a must. Anyway, without further ado, let's dive right in and uncover how React works.

## Projects

- [How React Works](https://how-react-works-iota.vercel.app/)
- [Eat-'N-Split](https://eat-n-split-section-11.vercel.app/)

## Table of Content

- [Section 11: How React Works Behind The Scenes](#section-11-how-react-works-behind-the-scenes)
  - [Projects](#projects)
  - [Table of Content](#table-of-content)
  - [Lessons Learned](#lessons-learned)
    - [Project Setup and Walkthrough](#project-setup-and-walkthrough)
    - [Components, Instances, and Elements](#components-instances-and-elements)
    - [Instances and Elements in Practice](#instances-and-elements-in-practice)
    - [How Rendering Works: Overview](#how-rendering-works-overview)
    - [How Rendering Works: The Render Phase](#how-rendering-works-the-render-phase)
    - [How Rendering Works: The Commit Phase](#how-rendering-works-the-commit-phase)
    - [How Diffing Works](#how-diffing-works)
    - [Diffing Rules in Practice](#diffing-rules-in-practice)
    - [The Key Prop](#the-key-prop)
    - [Resetting State With The Key Prop](#resetting-state-with-the-key-prop)
    - [Using the Key Prop to Fix Our Eat-'N-Split App](#using-the-key-prop-to-fix-our-eat-n-split-app)
    - [Rules for Render Logic: Pure Components](#rules-for-render-logic-pure-components)
    - [State Update Batching](#state-update-batching)
    - [State Update Batching in Practice](#state-update-batching-in-practice)
    - [How Events Work in React](#how-events-work-in-react)
    - [Libraries vs. Frameworks \& The React Ecosystem](#libraries-vs-frameworks--the-react-ecosystem)
    - [Section Summary: Practical Takeaways](#section-summary-practical-takeaways)
  - [Author](#author)

## Lessons Learned

### Project Setup and Walkthrough

```javascript
import { useState } from "react";

const content = [
  {
    summary: "React is a library for building UIs",
    details:
      "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "State management is like giving state a home",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "We can think of props as the component API",
    details:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

/**
 * All this `App` component does is to include the `Tabbed` component.
 * And it passes the content to the `Tabbed` component as props, which is
 * simply the array above.
 */
export default function App() {
  return (
    <div>
      <Tabbed content={content} />
    </div>
  );
}

/**
 * The `Tabbed` component has some state variable which indicates the
 * current tab so, it seems like it is a number.
 */
function Tabbed({ content }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        {/*
         * Here we have these 4 tabs and notice how we are actually
         * writing them one by one manually, and not looping over some
         * array.
         *
         * Our array has 3 elements so, the first tree Tabs are for those
         * three objects and then we have another one, whose `num` is 3
         * but, let's take a look at that a bit later.
         *
         * Here we have `num`, `activeTab`, and `onClick` as props.
         *
         * As the `onClick`, we are simply passing the `setActiveTab`
         * state setter function.
         *
         * Let's check out what the `Tab` component does at this point.
         *
         * `onClick` is `setActiveTab` and the `num` are the numbers.
         *
         * So basically, when we click on the first tab, it means that the
         * `activeTab` will get set to 0.
         *
         * If we click on the second tab, the `activeTab` will get set to
         * 1, so on and so forth.
         *
         * Based on the `activeTab` state, the `TabContent` below will be
         * rendered.
         */}
        <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />

        <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
      </div>

      {/**
       * Here we can see that the `activeTab` state is used to render the
       * `TabContent` component using the content from the `content` array
       * at the position of the currently active tab.
       *
       * Based on the `activeTab` state, the `TabContent` will be
       * rendered.
       *
       * If the value of `activeTab` is less than or equal to 2, then the
       * content at the index of the array will be rendered.
       *
       * If the value of `activeTab` is greater than 2, then
       * `DifferentContent` component will be displayed which just
       * renders some text.
       *
       * Basically, the goal of the 4th tab here is just to display the
       * `DifferentContent` component.
       *
       * NOTE: When we click on the 4th tab, the component tree changes
       * i.e. instead of `TabComponent` it renders `DifferentComponent`.
       */}
      {activeTab <= 2 ? (
        <TabContent item={content.at(activeTab)} />
      ) : (
        <DifferentContent />
      )}
    </div>
  );
}

/**
 * Basically, `Tab` is just a button, and what happens when we click on
 * the button is that the `onClick` function is called with the current
 * number i.e. `num`.
 *
 * Let's now actually go back to `Tabbed` component, which is where the
 * `Tab` component is used so that we can understand what the `onClick`
 * and the `num` actually are.
 */
function Tab({ num, activeTab, onClick }) {
  return (
    <button
      className={activeTab === num ? "tab active" : "tab"}
      onClick={() => onClick(num)}
    >
      Tab {num + 1}
    </button>
  );
}

/**
 * In `TabContent` we recieve the tab `item` as props, which is basically
 * the content that we are going to use inside the component.
 *
 * We also see that we have two state variables here, `showDetails` and
 * `likes`.
 *
 * We are doing some conditional rendering with `showDetails` which is
 * `true` by default.
 */
function TabContent({ item }) {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);

  /**
   * This function simply takes current `likes` and adds one to it and
   * then sets the new state of `likes` using `setLikes`.
   *
   * Notice how here we didn't use a callback function in order to set
   * state based on the current state, but more about that later.
   */
  function handleInc() {
    setLikes(likes + 1);
  }

  return (
    <div className="tab-content">
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}

      <div className="tab-actions">
        {/**
         * Here we are updating the `showDetails` state by using
         * `setShowDetails` when we click on the button.
         */}
        <button onClick={() => setShowDetails((h) => !h)}>
          {showDetails ? "Hide" : "Show"} details
        </button>

        <div className="hearts-counter">
          {/**
           * Finally, we also have hearts here and that is why we have the
           * second state of `likes` - which is indeed used here.
           */}
          <span>{likes} ❤️</span>
          {/**
           * The first button below has the `handleInc()` function, and
           * the second button has no handler.
           *
           * So, each time we click the first button below, 1 like is
           * added to the state of `likes`.
           */}
          <button onClick={handleInc}>+</button>
          <button>+++</button>
        </div>
      </div>

      <div className="tab-undo">
        {/**
         * Here we have two more buttons, but we see that they have no
         * event handlers attached.
         *
         * So, if we click on them then nothing happens.
         */}
        <button>Undo</button>
        <button>Undo in 2s</button>
      </div>
    </div>
  );
}

/**
 * This is simply one `div` which has a simple `h4` displayed.
 */
function DifferentContent() {
  return (
    <div className="tab-content">
      <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  );
}
```

- Here is what the component tree for the app looks like:
- ![image](https://github.com/user-attachments/assets/48bcec78-ae8c-46b7-b67e-a86f7d41bdad)
- ![image](https://github.com/user-attachments/assets/0582e09a-29c4-4300-9713-a0bd9fbb4a3d)
- With this, it should be pretty clear regarding what this very small demo application does.
- But, before we move on the next lesson, make sure that you take some time to analyze this code on your own so that you truly understand what exactly is happening here.

### Components, Instances, and Elements

- Let's start this section with the conceptual difference between React components, component instances, and React elements.
- Knowing about these differences will hopefully make it a bit more clear as to what happens with your components as you use them.
- Also, this is a pretty common interview question so, this topic is definitely worth learning about.
- Let's begin by taking another look at components.
- ![image](https://github.com/user-attachments/assets/4a467998-e69a-4a5f-974c-c2ec21dd654f)
- Components are what we write in order to describe a piece of the user interface.
- It is just a regular JavaScript function, but it's a function that returns React elements i.e. it returns an element tree.
- We usually write these elements using the JSX syntax.
- A component is a generic description of the UI. So we can essentially think of a component as a blueprint or a template, and it is out of this one blueprint or template that React then creates one or multiple component instances.
- ![image](https://github.com/user-attachments/assets/bec8c6db-a79f-4bb9-8aef-2336c9610897)
- React does this each time that we use the component somewhere in our code.
- For example, the `<Tab />` component that we can see in the image above is used/included 3 times in the `<App />` component.
- Therefore, 3 instances of `<Tab />` are placed in the component tree i.e. in our actual application.
- Behind the scenes, this happens because React will call the `Tab` function 3 times so, one time for each instance.
- So, we can say that an instance is like the actual, physical manifestation of a component living in our component tree.
- While the component, itself, is really just a function that we wrote before being called.
- Actually, it's each instance that holds its own state and props and that also has its own life cycle.
- Basically, a component instance can be born, it can live for some time until it will eventually die.
- So, it is a bit like living organism really.
- In practice, we many times just use the terms component and component instance interchangeably.
- For example, we just say component life cycle and not component instance life cycle.
- We also say that a UI is made up of components, not of component instances, even though instances would technically be more accurate.
- So, just keep that in mind for the future when you read documentation or some stack overflow post or something like that.
- Anyway, as React executes the code in each of these instances, each of them will return one or more React elements.
- ![image](https://github.com/user-attachments/assets/baeeda61-4f81-41e3-a9f1-9e3dd634948b)
- So, as we learned when we first talked about JSX behind the scenes, JSX will actually get converted to multiple `React.createElement()` function calls.
- Then, as React calls these `createElement()` functions, the result will be a React element.
- So, a React element is basically the result of using a component in our code.
- It is simply a big immutable JavaScript object that React keeps in memory.
- We will take a look at this later in our code.
- But, what is this object actually?
- Well, a React element basically contains all the information that is necessary in order to create DOM elements for the current component instance.
- So, it is this React element that will eventually be converted to actual DOM elements.
- ![image](https://github.com/user-attachments/assets/6c6f3803-bdf3-4496-83ed-1c4ab3609f5c)
- These DOM elements are then painted onto the screen by the browser.
- So, based on all this, the DOM elements are the actual, final, and visual representation of the components instance in the browser.
- Again, it is not React elements that are rendered to the DOM.
- React elements just live inside the React app and have nothing to do with the DOM.
- They are simply converted to DOM elements when they are painted on the screen in the final step.
- So, this is the journey from writing a single component to using it multiple times in our code as a blueprint all the way until it is converted to a React element, and then rendered as HTML elements into the DOM.
- Hopefully you found the interesting and useful, and if you did then let's move on the next lesson and take a look at all this in code.

### Instances and Elements in Practice

- Let's now shortly look at component instances and React elements in our code.
- We are going to do a couple of quick experiments in this lesson, to look at some interesting things.
- First off, we can actually look at a component instance simply by using the component and logging it to the console.
- So, let's look at the `<DifferentContent />` on the console, because it doesn't have any state.

```javascript
// Full code at ./how-react-works/src/App.jsx

function DifferentContent() {
  return (
    <div className="tab-content">
      <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  );
}

console.log(<DifferentContent />);
```

- If we run this, then we should see something like this on the console:

```javascript
// React element returned by <DifferentContent />
{
  $$typeof: Symbol(react.element),
  key: null,
  props: {},
  ref: null,
  type: ƒ DifferentContent(),
  _owner: null,
  _store: {validated: false},
  _self: undefined,
  _source: {fileName: '...App.jsx', lineNumber: 29, columnNumber: 13},
  [[Prototype]]: Object,
}
```

- So, as soon as React sees `<DifferentContent />`, it will internally call the `DifferentContent` function which will then return the React element as shown above. Just like we learned in the previous lesson.
- Let's take a quick look at the React element.
- While is is not really interesting, we can see that the `type` is of `ƒ DifferentContent()`, and that's exactly the name of the component being called.
- We also see that we didn't pass in any props but, we actually could.
- So, let's just do it for learning purposes.

```javascript
// Full code at ./how-react-works/src/App.jsx
function DifferentContent() {
  return (
    <div className="tab-content">
      <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  );
}

// passing props
console.log(<DifferentContent test={23} />);

// OUTPUT
// React element returned by <DifferentContent />
{
  $$typeof: Symbol(react.element),
  key: null,
  props: {test: 23}, // passed props
  ref: null,
  type: ƒ DifferentContent(),
  _owner: null,
  _store: {validated: false},
  _self: undefined,
  _source: {fileName: '...App.jsx', lineNumber: 29, columnNumber: 13},
  [[Prototype]]: Object,
}
```

- Again, this is what React internally use to then later create our DOM elements.
- If you are wondering what this weird `$$typeof` thing is (in the output), well this is simply a security feature that React has implemented in order to protect us against cross-site scripting attacks.
- So, notice how the value of `$$typeof` is a `Symbol` and `Symbol` are one of the JavaScript primitives, which cannot be transmitted via JSON.
- In other words, this means that a `Symbol` like the one in the output, cannot come from an API call.
- So, if a hacker would try to send us a fake React element from an API, then React would not see this `$$typeof` as a `Symbol`.
- Again, because `Symbol` cannot be transmitted via JSON.
- So then, React would not include that fake React element into the DOM thereby protecting us against that kind of attack.
- Anyway, let's now try something else.
- If React calls our component internally when it renders them, just as it did above, then maybe you have wondered, why don't we just call components directly?
- So, why should we write it like `<DifferentContent />` when we could also write it like `DifferentContent()`?
- So, basically calling the function ourselves.
- Well, there is really nothing stopping us from doing so.
- So if we save this, then actually get a result as well.

```javascript
// Full code at ./how-react-works/src/App.jsx
function DifferentContent() {
  return (
    <div className="tab-content">
      <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  );
}

// Calling the component as a regular funtion
console.log(DifferentContent());

// OUTPUT
// Raw React Element
{
  $$typeof: Symbol(react.element),
  key: null,
  props: {className: 'tab-content', children: {…}},
  ref: null,
  type: "div",
  _owner: null,
  _store: {validated: false},
  _self: undefined,
  _source: {fileName: '...App.jsx', lineNumber: 99, columnNumber: 5},
  [[Prototype]]: Object,
}
```

- So you see, even in this case, we still got a React element.
- However, it is a very different one.
- This one no longer has the `type` of `ƒ DifferentContent()` instead, it is a `div` which is basically just the content of that component i.e. the `div` that, that component is returning.
- So, that `div` is now the `type` of the `DifferentContent` component; and we can also see that because the `props` include the `className` of `"tab-content"`.
- So, what this means is that right now, React does no longer see it as a component instance.
- Instead, it just sees the raw React element, which is really not what we want.
- So, when we use a component, we want React to see the component instance and not the raw output element like the one above.
- So, never call the component like a regular function.
- Let's demonstrate it one more time, but now, calling `TabContent` component inside another component viz `Tabbed` component.

```javascript
// Full code at ./how-react-works/src/App.jsx
function TabContent({ item }) {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);

  function handleInc() {
    setLikes(likes + 1);
  }

  return (
    <div className="tab-content">
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}

      <div className="tab-actions">
        <button onClick={() => setShowDetails((h) => !h)}>
          {showDetails ? "Hide" : "Show"} details
        </button>

        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={handleInc}>+</button>
          <button>+++</button>
        </div>
      </div>

      <div className="tab-undo">
        <button>Undo</button>
        <button>Undo in 2s</button>
      </div>
    </div>
  );
}

function Tabbed({ content }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
      </div>

      {activeTab <= 2 ? (
        <TabContent item={content.at(activeTab)} />
      ) : (
        <DifferentContent />
      )}

      {/* Calling a component like a regular function inside another component */}
      {TabContent({ item: content.at(0) })}
    </div>
  );
}
```

- Once we do this, we might get some errors but, just reload the page.
- Now, this somehow works.
- ![image](https://github.com/user-attachments/assets/c138d26f-c32a-4d13-9f7f-6d9d586a799a)
- So, you see that actually we got a second `TabContent` rendered on webpage.
- So, it looks like it works, right?
- Well, not so fast.
- Let's checkout our component tree again.
- ![image](https://github.com/user-attachments/assets/6f09a904-ab89-47fd-bc64-b278b75f4590)
- Now you see that we still only have one `TabContent` component instance in our component tree.
- This happened exactly because of what we learned earlier, which is that when we call a component like a regular function, then React no longer sees it as a component instance.
- We can also see that the state that `TabContent` manages is actually now inside the parent component.
- So, if you check out the `Tabbed` component in the component tree, you see that it has the normal state that it had before which is the `activeTab` but, it also has some other hooks, which come from `TabContent`.
- ![image](https://github.com/user-attachments/assets/94d8e618-270e-467b-957e-fde4d42198f0)
- So, those other hooks are the hooks that are inside `TabContent` component but, they don't really belong inside the `Tabbed` component.
- We want them to be inside the `TabContent` component and not inside the `Tabbed` component.
- What this means is that calling a component like a regular function does not result in an actualy component so, it is not really a component because it cannot even manage its own state at this point.
- For all these reasons, we should never ever call a component like we would call a regular function.
- This is because it will create multiple problems such as violating the rules of hooks that we will talk about later.
- Instead, as you already know, always render it inside the JSX, like so `<TabContent item={content.at(activeTab)} />`.
- This way we just use the component like a blueprint, like we have always been doing.
- Then React calls the component and actually recognizes it as a component instance.
- Note how we only have one `Tab` component but, in the component tree we have multiple instances of it:
- ![image](https://github.com/user-attachments/assets/e9b5a383-bb4a-4209-89eb-e2faa487dd80)
- So, this is just like what we learned in the previous lesson.
- Also, these four component instances have their own state and their own props.

### How Rendering Works: Overview

- We are now ready to finally learn about how exactly React renders our applications behind the scenes.
- There is so much to learn here that this lesson is split into 3 parts viz this lesson and the next two ones.
- This one serves more as an overview and then in the next two lessons, we are going to go really deep into some React internals.
- Let's start with just a small recap.
- ![image](https://github.com/user-attachments/assets/0b35e49a-c09f-472e-ac05-69919e4130a8)
- As we build our applications, what we are really doing is building a bunch of components.
- We then use these components inside other components as many times as we want.
- This will cause React to create one or more component instances of each component.
- These are basically the actual, physical components that live in our application which hold state and props.
- As React calls each component instance, each JSX will produce a bunch of `React.createElement()` function calls.
- This in turn will produce a React element for each component instance.
- This React element will ultimately be transformed to DOM elements and displayed as a user interface on the screen.
- So, we have a pretty good understanding of the initial part of this process viz tranforming components to React elements.
- However, what we don't understand yet is the second part of the process i.e. how these React elements actually end up in the DOM and displayed on the screen.
- Luckily for us, that is exactly what this series of lessons is all about.
- ![image](https://github.com/user-attachments/assets/fd6ed541-0c7f-4e78-9c3a-027970f9ad4e)
- In this lesson, we are going to have a quick overview of each of the phases involved in displaying our components onto the screen.
- Then we are going to zoom into each of these phases to learn how the entire process works internally, behind the scenes.
- This process that we are about to study is started by React each time that a new render is triggered, most of the time by updating state somewhere in the application.
- State changes trigger renders and so, it makes sense that the next phase is the render phase.
- In this phase, React calls our component's function and figures our how it should update the DOM, in order to reflect the latest state changes.
- However, it does actually not update the DOM in this phase.
- So, React's definition of render is very different from what we usually think of as a render, which can be quite confusing.
- Again, in React, rendering is not about updating the DOM or displaying elements on the screen.
- Rendering only happens internally inside of React and so, it does not produce any visual changes.
- In all the previous sections, we have always used the term rendering with the meaning of displaying elements on the screen because, that was just easy to understand and it made sense.
- However, as we just learned, the rendering that we meant is really the render phase plus the next phase.
- Speaking of next phase, once React knows how to update the DOM, it does so in the commit phase.
- In the commit phase, new elements might be placed in the DOM, and already existing elements might get updated or deleted in order to correctly reflect the current state of the application.
- So, it is really this commit phase that is responsible for what we traditionally call rendering, not the render phase.
- Then finally, the browser will notice that the DOM has been updated and so it re-paints the screen.
- This has nothing to do with React anymore but, it is still worth mentioning that it is this final step that actually produces the visual change that users see on their screens.
- Let's now zoom into each of these different steps, starting with the triggering of a render.
- ![image](https://github.com/user-attachments/assets/92cf4f96-86b1-4d55-a380-911e2cbd125a)
- There are only two ways in which a render can be triggered.
- The first one is the very first time the application runs, which is what we call the <ins>initial render</ins>.
- The second one is a state update happening in one or more component instances somewhere in the application which is what we call a re-render.
- It is important to note that the render process really is triggered for the entire application, not just for one single component.
- That does not mean that the entire DOM is updated because, remember, in React, rendering is only about calling the component functions and figuring out what needs to change in the DOM later.
- Again, this might seem confusing now because earlier in the course, we made it seem as though React only re-renders the component where the state update happened.
- But that's because we were learning how React works in practice.
- In fact, when we look at what happens in practice, it looks as if only the update component in re-rendered.
- But now we are learning how React actually works behind the scenes.
- So, now we know that React looks at the entire tree whenever a render happens.
- Finally, it is important to mention that a render is actually not triggered immediately after a state update happens.
- Instead, it is scheduled for when the JavaScript engine basically has some free time on its hands.
- But this difference is usually just a few milliseconds that we won't notice.
- There are also some situations like multiple sets state calls in the same function where renders will be batched as we will explore a bit later.
- So, this is how renders are triggered which is the easy part.
- What follows is the hard part, which is the actual rendering.
- Let's learn all about that in the next lesson.

### How Rendering Works: The Render Phase

- This is probably the most complicated and most confusing lesson of the entire course.
- This is not say in order to scare you because, this might also be the most interesting and fascinating lesson of the course.
- If you don't immediately understand 100% of what we are going to learn here, that's absolutely fine. So, don't stress about it at all.
- Again, you can use React without knowing any of this but, if you have a curious mind and feel the need to understand how React does what it does, then this lesson is for you.
- Before we even start, let's first go back to where we first learned about the mechanics of state.
- ![image](https://github.com/user-attachments/assets/02c521c3-1930-41b5-ba66-02c9347d9a76)
- Remember this diagram?
- Back then, we mentioned that we can conceptually imagine this as a new view being rendered on the screen i.e. into the DOM.
- However, now we know that this was technically not true because, rendering is not about the screen or the DOM or the view, it is just about calling component functions.
- We also mentioned that whenever there is a re-render, React discards the old component view and replaces it with a brand new one.
- However, that is also technically not true.
- So, the DOM will actually not be updated for the entire component instance.
- So, if those things are not true, then let's now learn what happens instead and how rendering actually works.
- ![image](https://github.com/user-attachments/assets/f8cbd4ff-9846-41d2-9877-421d985f9567)
- In the previous lesson we talked about how renders are triggered.
- In this lesson, we are going to learn all about how renders are actually performed in the render phase.
- At the beginning of the render phase React will go through the entire component tree, take all the instances that triggered a re-render and actually render them, which simply means to call the corresponding component functions that we have written in our code.
- This will create updated React elements which altogether make up the so-called <ins>virtual DOM</ins>.
- This is a term that you might have heard before and so let's dig a little bit deeper now into what the virtual DOM actually is.
- ![image](https://github.com/user-attachments/assets/49a4fc6e-326b-424a-9268-0a4226f7f5ef)
- On the intial render, React will take the entire component tree and transform it into one big React element which will basically be the React element tree as shown in the image above.
- This is what we call the virtual DOM.
- So, the virtual DOM is just a tree of all React elements created from all instances in the component tree.
- It is relatively cheap and fast to create a tree like this, even if we need many iterations of it because, in the end, it is just a JavaScript object.
- Virtual DOM is probably the most hyped and most used term when people describe what React is and how it works.
- But if we think about it, if the virtual DOM is just a simple object, it is actually not such a big deal.
- That's why the React team has really downplayed the meaning of this name.
- The actual documentation actually no longer mentions the term "virtual DOM" anywhere.
- But we are still using this term here because everyone still uses it and also because it just sounds a bit nicer than React Element Tree.
- Also, some people confuse the term with the shadow DOM, even though it has nothing to do with the virtual DOM in React.
- The shadow DOM is actually just a browser technology that is used in things like web components.
- Anyway, let's now suppose that there is going to be a state update in component D, which will of course trigger a re-render.
- This means that React will call the function of component D again and place the new React element in a new React element tree i.e. in the virtual DOM.
- But now comes the very important, which is this:
- Whenever React renders a component, that render will cause all of its child elements to be rendered as well.
- And that happens no matter if the props that we passed down have changed or not.
- Again, if the updated components return one or more other components, those nested components will be re-rendered as well, all the way down the component tree.
- This means that if you update the highest component in a component tree, in this example A, then the entire application will actually be re-rendered.
- ![image](https://github.com/user-attachments/assets/ecc771d8-f15e-4dfb-9836-9f8d319519ac)
- This may sound crazy, but React uses this strategy because it doesn't know beforehand whether an update in a component will affect the child components or not.
- So by default, React prefers to play it safe and just render everything.
- Also, keep in mind once again that this does not mean that the entire DOM is updated.
- It is just a virtual DOM that will be re-created which is really not a big problem in small or medium sized applpications.
- With this, we now know what this new virtual DOM means.
- So, let's keep moving forward.
- What happens next is that this new virtual DOM that was created after the state update will get reconciled with the current so-called <ins>Fiber Tree</ins> as it exsits before the state update.
- ![image](https://github.com/user-attachments/assets/40a70b4a-5af4-4aa9-8029-909e828eba5b)
- This reconciliation is done in React's reconciler, which is called <ins>Fiber</ins> and that's why we have a fiber tree.
- Then the result of this reconciliation process is going to be an updated Fiber tree i.e. a tree that will eventually be used to write the DOM.
- This is a high-level overview of the inputs and outputs of reconciliation, but, of course, now we need to understand what reconciliation is and how it works.
- ![image](https://github.com/user-attachments/assets/08fd0e8b-1a0a-4d79-badb-9afce2638701)
- You might be wondering, why do we even need things like virtual DOM, a reconciler, and those Fiber trees?
- Why not simply update the entire DOM whenever state changes somewhere in the app?
- The answer is simple.
- Remember how we said that creating the virtual DOM i.e. the React element tree for the entire app is cheap and fast because it is just a JavaScript object?
- Well, writing to the DOM is not cheap and fast.
- It would be extremely inefficient and wasteful to always write the entire virtual DOM to the actual DOM each time that a render was triggered.
- Also, usually when the state changes somewhere in the app only a small portion of the DOM needs to be udpated and the rest of the DOM that is already present can be re-used.
- Of course, on the intial render, there is no way around creating the entire DOM from scratch but, from there on, doing so doesn't make sense anymore.
- So, imagine that you have a complex app like udemy.com, and when you click on some button there then `showModal` is set to `true`, which in turn will then trigger a modal to be shown.
- In this situation, only the DOM elements for that modal need to be inserted into the DOM and the rest of the DOM should just stay the same.
- So, that's what React tries to do.
- Whenever a render is triggered, React will try to be as efficient as possible by re-using as much of the existing DOM tree as possible.
- But that leads us to the next question:
- How does React actually do that? How does it know what changed from one render to the next one?
- Well, that's where a process called <ins>reconciliation</ins> comes into play.
- Reconciliation is basically deciding exactly which DOM elements need to be inserted, deleted, or updated in order to reflect the latest state changes.
- So, the result of the reconciliation process is going to be a list of DOM operations that are necessary to update the current DOM with a new state.
- Now, reconciliation is processed by a reconciler and we can say that the reconciler really is the engine of React.
- It is like the heart of React.
- So, it is this reconciler that allows us to never touch the DOM directly and instead, simply tell React what the next snapshot of the UI should look like based on state.
- And as mentioned before, the current reconciler in React is called Fiber, and this is how it works:
- ![image](https://github.com/user-attachments/assets/335491bd-50ef-4944-8a89-067e773fb3c5)
- During the initial render of the application Fiber take the entire React element tree i.e. the virtual DOM and basied on it builds yet another tree which is the Fiber tree.
- The fiber tree is a special internal tree where for each component instance and DOM element in the app, there is one so-called fiber.
- What's special about this tree is that unlike React elements in the virtual DOM, Fibers are not re-created on every render.
- So, the fiber tree is never destroyed.
- Instead, it is a mutable data structure and once it has been created during the initial render, it is simply mutated over and over again in future reconciliation steps.
- This makes Fibers the perfect place for keeping track of things like the current component state, props, side effects, list of used hooks, and more.
- So, the actual state and props of any component instance that we see on the screen are internally stored inside the corresponding Fiber in the Fiber tree.
- Now, each Fiber also contains a queue of work to do like updating state, updating refs, running registered side effects, performing DOM updates and so on.
- This is why a Fiber is also defined as a <ins>unit of work</ins>.
- Now, if we take a quick look a the Fiber tree, we will see that the fibers are arranged in a different way than the elements in the React element tree.
- So, instead of a normal parent-child relationship, each first child has a link to its parent, and all the other children then have a link to their previous sibling.
- This kind of structure is called a linked list and it makes it easier for React to proces the work that is associated with each fiber.
- We also see that both tree include not only React elements or components, but also regular DOM elements, such as the `<h3>` and the `<button>` elements in this example (image above).
- So, both trees are really a complete representation of the entire DOM structure, not just of React components.
- Now going back to the idea that Fibers are <ins>units of work</ins>, one extremely important characteristic of the Fiber reconciler is that work can be performed asynchronously.
- This means that the rendering process which is what the reconciler does, can be split into chunks, some tasks can be prioritized over others and work can be paused, reused, or thrown away if not valid anymore.
- Just keep in mind that all this happens automatically behind the scenes.
- It is completely invisible to us, developers.
- There are, however, also some practice uses of this asynchronous rendering because it enables modern so-called <ins>concurrent features</ins> like <ins>Suspense</ins> or <ins>Transitions</ins> starting in React 18.
- It also allows the rendering process to pause and resume later so that it won't block the browser's JavaScript engine with too long renders, which can be problematic for performance in large applications.
- Again, this is only possible because the render phase does not produce any visible output to the DOM yet.
- So, at this point we know what the Fiber reconciler is and how the Fiber tree works but now, it is time to talk about what Fiber actually does which is the reconciliation process.
- ![image](https://github.com/user-attachments/assets/43c0a961-016f-464b-a746-82f045458b96)
- The best way to explain how reconciliation works is by using a practical example.
- So, let's take the virtual DOM and the corresponding fiber tree from the image above.
- These trees correspond the piece of code on the right hand side of the image above.
- In the `App` component, there is a piece of state called `showModal`, which is currently set to `true`.
- Let's say now that the state is updated to `false`.
- This will then trigger a re-render which will create a new virtual DOM.
- In this tree, the modal and all its children are actually gone because, they are no longer displayed when `showModal` is `false`.
- Also, all remaining React elements are yellow, meaning that all of them were re-rendered.
- Do you remember why that is? It is because all children of a re-rendered element are re-rendered as well, as we just learned a few minutes ago.
- Anyway, this new virtual DOM now needs to be reconciled with the current Fiber tree, which will then result in the updated tree which internally is called the <ins>workInProgress</ins> tree.
- So, whenever reconciliation needs to happen, Fiber walks through the entire tree step by step and analyzes exactly what needs to change between the current Fiber tree and the updated Fiber tree based on the new virtual DOM.
- This process of comparing elements step by step based on their position in the tree is called <ins>diffing</ins> and we will explore exactly how diffing works a bit later in the section because that's actually pretty important in practice.
- Anway, let's quickly analyze our updated Fiber tree where we marked new work that is related to DOM mutations.
- First, the `Btn` component has some new text and so the work that will need to be done in this FIber is a DOM update.
- In this case, swapping text from "Hide" to "Rate".
- Then we have the `Modal`, `Overlay`, `<h3>`, and `<button>` - these were in the fiber tree but, they are no longer in the virtual DOM and therefore, they are maked as DOM deletions.
- Finally, we have the interesting case of the `Video` component.
- This component was re-rendered because it is a child of the `App` component, but it actually didn't change.
- So, as a result of reconciliation, the DOM will not be updated in this case.
- Once this process is over, all these DOM mutations will be placed into a list called <ins>the list of effects</ins> which will be used in the next phase i.e. in the commit phase to actually mutate the DOM.
- Now, what we learned here is still a bit oversimplified but, it is more than enough for you to understand how this process works.
- ![image](https://github.com/user-attachments/assets/987ace82-80a1-46e7-b7b5-76e2ee7dea07)
- That was quite a deep-dive but, now we are back to the high-level overview of the render phase.
- We learned that the results of the reconcilation process is a second updated Fiber tree, plus basically a list of DOM updates that need to be performed in the next phase.
- So, React still hasn't written anything to the DOM yet but, it has figured our this so-called <ins>list of effects</ins>.
- This is the final result of the render phase as it includes the DOM operations that will finally be made in the commit phase which is the topic of our next lesson.

### How Rendering Works: The Commit Phase

- This lesson is part 03 of how rendering works behind the scenes.
- We just finished learning about the render phase which resulted in a list of DOM updated and this list will now get used in the commit phase.
- ![image](https://github.com/user-attachments/assets/922250c3-8b39-443f-8c33-0520936ffdd6)
- Technically speaking, the current workInProgrss fiber tree also goes into the commit phase but, let's keep it simple here.
- So, these are more conceptual diagrams so that we can understand what is happening, not a 100% accurate description of the algorithms inside React.
- Anyway, as you know by now, the commit phase is where React finally writes to the DOM. So, it inserts, deletes, and updates DOM elements.
- You will sometimes also read that React flushes updated to the DOM in this phase.
- Basically, React goes through the effects list that was created during rendering, and applies them one by one to the actual DOM elements that were in the already existing DOM tree.
- Writing to the DOM happens all in one go.
- So, we say that the commit phase is synchronous unlike the rendering phase, which can be paused.
- So, committing cannot be interrupted.
- This is necessary so that the DOM never shows partial results which ensures that the UI always stays consistent.
- In fact, that's the whole point of dividing the entire process into the render phase and the commit phase, in the first place.
- It is so that rendering can be paused, resumed, and discarded and the results of all that rendering can then be flushed to the DOM in one go.
- Then once the commit phase is completed, the workInProgress fiber tree becomes the current tree for the next render cycle.
- That's because, remember, fiber trees are never discarded and never re-created from scratch.
- Instead, they are re-used in order to save precious rendering time.
- With that, we close up the commit phase.
- The browser will then notice that the DOM has been changed, and as a result, it will repaint the screen whenever it has some idle time.
- So, this is where these DOM updates are finally made visible to the user in the form of an updated user interface.
- Now, we are going to go into how this phase works because this is really more about how browsers work internally, and not React.
- However, there is still one more thing that we need to talk about.
- The browser paint phase that we just mentioned is of course performed by whatever browser the user is using.
- The render phase is obviously performed by the React library.
- But what about the commit phase? We would think that it is also done by React, right?
- But, that is actually not true.
- It is actually a separate library that writes to the DOM, and it is called <ins>ReactDOM</ins>.
- Not a very creative name but, that's just what it is called.
- ![image](https://github.com/user-attachments/assets/52b12c5a-9ba3-411b-ae32-09d24a183d9c)
- In fact, React itself never touches the DOM, and it actually has no idea where the result of the render phase will actually be committed and painted.
- So, React only does the render phase but, not the commit phase.
- The reason for that is that React itself was designed to be used independently from the platform where element will actually be shown, and therefore React can be used with many different so-called <ins>hosts</ins>.
- Up until this point, we have only ever thought of React in conjunction with the DOM because, we usually use it build web applications; and in 90%of the cases, that's actually what we do with React.
- But, the truth is that React is used with other hosts as well.
- For example, we can actually build native mobile applications for iOS and Android using React Native; or we can build videos with React using a package called Remotion.
- And we can even create all kinds of documents like Word/PDF/Figma Designs and many more, using so-called <ins>renderers</ins>.
- Now, if we think about this, "renderer" is actually a pretty terrible name because according to React's own terminology, renderers do not render, but they commit the results of the render phase.
- But the name renderer probably comes from a time before React divided the render and the commit phase into two separate phases.
- So, they chose the term renderer because it fits with the common sense definition of rendering.
- Anyway, in all these situations, the results of the render phase is not really a list of DOM updates, but a list of updates of whatever elements are used in the host that's being used.
- So, the term virtual DOM then, also doesn't really make much sense when we look at it from a different angle, which is just one more reason why the React team prefers the more accurate name of React element tree.
- Now, all of these details are not really that important.
- What you need to retain from this part of the lesson is that the React library is not the one responsible for writing to the DOM, because the DOM is just one of the many hosts to which React apps can be committed i.e. to which they can be output.
- For each of these hosts we have a different package that we can use.
- That's why in our index.js file, we always import both React and ReactDOM.
- So, now you know the exact reason why we have to do that.
- So, after looking at all these phases in so much detail, let's do a quick recap here and summarize everything that we have learned.
- ![image](https://github.com/user-attachments/assets/d3268658-febb-45a5-9dff-32b3d6126483)
- The whole process of rendering and displaying a React application on the screen starts with a trigger, which can either be the initial render of the app, or a state update in one of the component instances.
- This then triggers the render phase which does not produce any visual output.
- So, this phase starts by rendering all component instances that need a re-render.
- And rendering in React simply means to call the components' functions.
- This will create one or more updated React elements which will be placed in a new virtual DOM, which is actually simply a tree of React elements.
- Now, what's really important to remember about this process is that rendering a component will cause all of its child components to be rendered as well, no matter if props changed or not.
- This is because React doesn't know whether children have been affected by the parent re-rendering or not.
- Now, next up, this new virtual DOM needs to be reconciled with the current fiber tree i.e. with the representation of the element tree before the state update.
- This is necessary because it would be slow and inefficient to destroy and rebuild the entire DOM tree each time that something on the screen must be updated.
- Instead, reconciliation tries to reuse as much of the DOM as possible by finding the smallest number of DOM updates that reflect the latest state update on the screen.
- Now this reconciliation process is done using a reconciler called Fiber, which works with immutable data structure called the fiber tree.
- In this tree, for each React element and DOM element, there is a fiber, and this fiber holds the actual component state, props, and a queue of work.
- After reconciliation, this queue of work will contain the DOM updates that are needed for that element.
- The computation of these DOM updates is performed by a diffing algorithm, which step-by-step compares the elements in the new virtual DOM with the elements in the current fiber tree to see what has changed.
- So, the final result of the render phase i.e. of the reconciliation and diffing process is a second updated fiber tree as well as a list of all necessary DOM udpates.
- Now, it is important to note that the render phase is asynchronous. So, fiber can prioritize and split work into chunks and pause and resume some work later.
- This is necessary for concurrent features and also to prevent the JavaScript engine to be blocked by complex render processes.
- Anyway, the output of the render phase, so the list of DOM updates will finally, actually be written to the DOM in the commit phase.
- In this phase, a so-called renderer like ReactDOM will insert, delete, and update DOM elements so that we end up with an updated DOM that reflects the new state of the application.
- And unline the render phase, the commit phase is actually synchronous.
- So, all the DOM updates are performed in one go in order to ensure a consistent UI over time.
- Finally, once the browser realizes that the DOM has been updated, it starts a new browser paint in order to visually update the user interface on the screen.
- There you have it.
- This is how, in a nutshell, we go from an updated React elements all the way to an updated DOM and user interface on the screen.
- So, it sure was a really long process but, hopefully you have learned a lot along the way and that it wasn't too overwhelming.
- Again, keep in mind that you can build React apps without being aware that most of these things even exist.
- Some of these things do have practical implications and also implications for performance but, we will talk about those later.
- For now, just a take breath as this was probably the hardest part of the entire course, so good job of sticking with it to the end.

### How Diffing Works

- In the lesson about the render phase, we left out one critical piece, which was the diffing algorithm that is part of the reconciliation process.
- ![image](https://github.com/user-attachments/assets/1f45ead2-c9a2-4caa-a7b0-8b4c30b4e1a6)
- We mentioned diffing back then but, we didn't really go into how diffing works.
- Since that's really important, let's do that now.
- ![image](https://github.com/user-attachments/assets/1a080be9-6059-4a8c-9c5a-66bac961f8ef)
- Diffing is first of all based on two fundamental assumptions.
- The first one is that two elements of different types will produce different trees.
- The second assumption is that elements with a stable key, so a key that is consistent over time, will stay the same across renders.
- These assumptions may seem pretty obvious especially the first assumption but, they allow the algorithm to be orders of magnitude faster going, for example, from a billion operations per a thousand processed elements to just a thousand operations.
- Remember that diffing is comparing elements step-by-step between two renders based on their position in the tree; and there are basically two different situations that need to be considered.
- First, having two different elements at the same position in the tree between two renders, and second, having the same element at the same position in the tree.
- So, those are the only two situations that matter.
- So, let's now start with the first situation.
- ![image](https://github.com/user-attachments/assets/544598d7-048d-4fd1-a89b-686dc1fdd7c0)
- Let's say that at some point an application is re-rendered, and in the diffing process, we find that an element has changed in a certain position of the tree.
- Here (in the image above), we are actually not looking at the tree but, at the JSX code, which leads to that tree.
- This is because it is a bit easier to understand like that.
- Anyway, in the case of a DOM element changing like thise, changing simply means that the type of the element has changed like in the example (in the image above) from a `div` to a `header`.
- So, in a situation like this, React will assume that the element itself plust all its children are no longer valid.
- Therefore, all these elements will actually be destroyed and removed from the DOM.
- And that also includes their state, which is really important to remember.
- So, as we see in this example (image above), both, the `div` element and the `SearchBar` component will be removed from the DOM and will then be re-built as a `header` with a brand new `SearchBar` component instance as its child.
- So, if the child elements stays the same across renders, the tree will actually get re-built, but it gets rebuilt with brand new elements.
- So, if there were any components with state, that state will not be recovered.
- So, this effectively resets state and has huge implications for the way that React applications work in practice.
- And that's why we will see some examples of this behavior in the next lesson.
- Now, everything we just learned works the exact same way for React elements, so basically for component instances as we can see in the second example in the image above.
- In the second example, the `SearchBar` component changed to a `ProfileMenu` component and therefore, the search bar is again completely destroyed including its state and removed from the DOM.
- So, this is the first situation.
- The second situation is when between two renders we have the exact same element at the same position in the tree.
- ![image](https://github.com/user-attachments/assets/ef5f4cd2-1129-4e89-9ec5-6cacb76ad9e1)
- This one is way more straightforward.
- If after a render, an element at a certain position in the tree is the same as before, like in the examples shown in the image above, the element will simply be kept in the DOM; and that includes all child elements and more importantly, the component's state.
- This may sound pretty obvious but, it actually has some important implications in practice.
- Again, the same element at the same position in the tree stays the same and preserves state, and it works like this for DOM elements and for React elements as well.
- Looking at these examples, we actually see that something has changed.
- However, it was not the element type that has changed but simply the `className` attribute in the `div` and the `weight` prop in the `SearchBar` component.
- So, what React is going to do is to simply mutate the DOM element attributes; and in the case of React elements, it will pass in the new props, but that's it.
- So, React tries to be as efficient as possible and so the DOM elements themselves will stay the same.
- They are not removed from the DOM, and more importantly, their state will not be destroyed.
- Now sometimes we actually don't want this standard behavior but, instead to create a brand new component instance with new state.
- So, that's where the `key` prop comes into play as we will learn about after seeing these rules that we just learned, in action.

### Diffing Rules in Practice

- In this lesson, let's quickly demonstrate the diffing rules that we just learned in our previous lesson, in our [project](./how-react-works/src/App.jsx) so that we can see that they actually do have a practical effect in the real world.

```javascript
// project code

import { useState } from "react";

const content = [
  {
    summary: "React is a library for building UIs",
    details:
      "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "State management is like giving state a home",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "We can think of props as the component API",
    details:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

export default function App() {
  return (
    <div>
      <Tabbed content={content} />
    </div>
  );
}

function Tabbed({ content }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
      </div>

      {activeTab <= 2 ? (
        <TabContent item={content.at(activeTab)} />
      ) : (
        <DifferentContent />
      )}
    </div>
  );
}

function Tab({ num, activeTab, onClick }) {
  return (
    <button
      className={activeTab === num ? "tab active" : "tab"}
      onClick={() => onClick(num)}
    >
      Tab {num + 1}
    </button>
  );
}

function TabContent({ item }) {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);

  function handleInc() {
    setLikes(likes + 1);
  }

  return (
    <div className="tab-content">
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}

      <div className="tab-actions">
        <button onClick={() => setShowDetails((h) => !h)}>
          {showDetails ? "Hide" : "Show"} details
        </button>

        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={handleInc}>+</button>
          <button>+++</button>
        </div>
      </div>

      <div className="tab-undo">
        <button>Undo</button>
        <button>Undo in 2s</button>
      </div>
    </div>
  );
}

function DifferentContent() {
  return (
    <div className="tab-content">
      <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  );
}
```

- Let's start by examining a bit better, what happens as we use the tab component.
- We have a button called "Hide Details" that hides the paragraph when we click on it.
- We also have another button which increases the number of `likes` when we click on it.
- So, let's hide the paragraph and increase the number of `likes` to 4 in tab 1.
- Now if we go to tab 2, then the you will see that the text is still hidden and the number of `likes` is still increased.
- So, what this means is that the state of the `TabContent` component has been preserved.
- If we hadn't learned about this in the previous section, then this would look really strange.
- This is because, we would expect that whenever we go to a new `Tab` component instance, the state of `likes` and `showDetails` to be reset.
- But, that's not what happnes.
- So, as we click through tabs 1, tab 2, and tab 3, the only thing that happens is that the title of the tab changes.
- The paragraph text also changes but, it stays invisible.
- So, what is actually happening?
- Well, basically each time we click on one of the tabs from 1 to 3, the `TabContent` component is re-rendered.
- However, as we can see in the component tree in React developer tools, the `TabContent` component instance always stays in the exact same position in the tree.
- So with this, we are now in the situation that we learned in the previous lesson, where we have the same element - in this case - the same component, in the same position.
- Because of that, the state is preserved across renders.
- Just like we learned before.
- Again, as we keep clicking around the tabs 1 to 3, the `TabContent` component instance is actually not destroyed.
- It stays in the DOM, and the only thing that changes is the `props` that it receives.
- ![diffing-practice-1](https://github.com/user-attachments/assets/1baa4e9c-f557-4a4b-bcad-e093cacfdf80)
- So the state, again, remains completely unchanged.
- But, what if we now click on the tab 4?
- As we can see in our code, if we click tab 4, whose `num` value is 3, then `DifferentContent` component will be rendered.
- Keep in mind that the `likes` state has the value of 4 and the `showDetails` is set to `false` when we are clicking on tab 4.
- Now, let's see what happens.
- Immediately, we see that the `TabContent` component in the component tree is replaced with `DifferentContent` component.
- So, it is still in the same position of the tree but, it is no longer `TabContent` but, `DifferentContent`.
- Now if we click on any of the other tabs i.e. tab 1 or tab 2 or tab 3, we will see that the state of `likes` and `showDetails` has actually been reset.
- ![diffing-practice-2](https://github.com/user-attachments/assets/cb356359-e70c-40d4-a5a3-cb2720cf14b5)
- This is because the `TabContent` that we had here before has been completely destroyed and removed from the DOM in the meantime - while we were at the `DifferentContent`.
- That's also why we have a string in `DifferentTab` which mentions that it will reset the state. 😅
- So, this is the direct consequence of the diffing rules that we just learned about.
- This means that these rules are very important in practice.
- So, you can see this situation happening all the time, and actually, we saw the exact same thing in our [Eat-'N-Split Application](https://eat-n-split-six-ruby.vercel.app/).
- But, don't worry about that for now because, we will come back to that app in a few lessons from now.
- Now, sometimes we do not want this behavior.
- For example, let's say that we hide the details in Tab 1 but, when we go to Tab 2, we expect that the details over there are set to default.
- So, let's take a look at how we can solve it in the next lesson.

### The Key Prop

- Remember how we mentioned the `key` prop when we talked about how the diffing algorithm works.
- So, let's now take some time to look at the `key` prop in detail in order to learn what it does and when we need to use it.
- ![image](https://github.com/user-attachments/assets/88ca201b-606d-4f8d-a01c-e983e503f0e1)
- The `key` prop is a special prop that we can use to tell the diffing algorithm that a certain element is unique.
- This works for both, DOM elements and React elements.
- In practice, this means that we can give each component instance, a unique identification, which will allow React to distinguish between multiple instances of the same component type.
- Now, that's all great but, why do we need this?
- Well, remember that the second assumption of the diffing algorithm is that whenever an element has a stable `key` i.e. a `key` that stays same across renders, the element will be kept in the DOM, even if the position in the tree has changed.
- This is the whole reason why we should use the `key` prop in lists, as we have already done so many times throughout the course.
- So, in a few moments, you will finally learn why we need to do that.
- On the other hand, when the `key` of a certain element changes between renders, the element will be destroyed and a new one will be created in its place, even if the element's position in the tree is exactly the same as before.
- So, this is great to reset state, which is the second big use case of the `key` prop.
- But, let's go back to the first big use case of the `key` prop, which is to use `key` in lists.
- ![keys-in-lists-stable-key](https://github.com/user-attachments/assets/09cbf6cb-fb99-4363-809b-970c1adaea71)
- Let's start by considering this example without keys:

```javascript
// No Keys

<ul>
  <Question question={q[1]} />
  <Question question={q[2]} />
</ul>
```

- Here we have a list with two question items, which clearly have no `key` prop but, let's see what happens when we add a new item to the top of the list.

```javascript
// No Keys

<ul>
  {/* Adding new item to the top of the list */}
  <Question question={q[0]} />
  <Question question={q[1]} />
  <Question question={q[2]} />
</ul>
```

- The two list items that we already has are clearly still the same, but they will now appear at different positions in the React Element Tree.
- They are no longer the first and second children but now, they are the second and the third children.
- So, we basically have the same elements but, at different positions in the tree.
- So, according to the diffing rules that we learned earlier, these two DOM elements will be removed from the DOM and then immediately re-created at their new positions.
- And this is obviously bad for performance because, removing and rebuilding the same DOM element is just wasted work, right?
- But, the thing is that React doesn't know that this is wasted work.
- Of course, we developers intuitively know that these two elements are actually the same as before but React has no way of knowing that.
- But, what if we could actually change that?
- Well, that's where `key` comes into play.

```javascript
// With Keys

<ul>
  <Question key="q1" question={q[1]} />
  <Question key="q2" question={q[2]} />
</ul>
```

- Remember, a `key` allows us developers to uniquely identify an element so, we can give React information that it doesn't have on its own.
- Now when we add a new item to the top of the list, the two original elements are of course, still in different positions of the tree but, they do have a stable `key` i.e. a `key` that stays the same across renders. That's `q1` and `q2` in this case.

```javascript
// With Keys

<ul>
  {/* Adding new item to the top of the list */}
  <Question key="q0" question={q[0]} />
  <Question key="q1" question={q[1]} />
  <Question key="q2" question={q[2]} />
</ul>
```

- So now, according to the diffing rules, these two elements will now be kept in the DOM even though their position in the tree is different.
- So, they will not be destroyed, and the result will be a bit more of a performant UI.
- Of course, you won't notice this difference on small lists, but it will make a huge difference when you have a really big list with thousands of elements, which can actually happen in some applications.
- So, in summary, always use the `key` prop when you have multiple child elements of the same type, just like the `Question` elements in this example.
- And you already knew you should do that because well, otherwise React will complain and give us a warning but now, you hopefully understand exactly why you need to do it.
- Alright, so we looked at the use case for a stable key so now, let's look at the use case for a changing key, which is used to reset state in component instances.
- ![image](https://github.com/user-attachments/assets/c282ae10-804f-45cd-be1d-88d101fdb454)
- Here we don't need a code example because we will do this in practice, in the next lesson.
- But, let's just see what we mean by resetting state.
- Let's say we have a `Question` inside a `QuestionBox` and we pass in an object as a prop.

```javascript
<QuestionBox>
  <Question
    question={{
      title: "React vs JS",
      body: "Why should we use React?",
    }}
  />
</QuestionBox>
```

- Now the question component instance has an `answer` state, which is right now set to `"React allows us to build apps faster"`.
- But now, let's imagine that the question changes to this one:

```javascript
<QuestionBox>
  <Question
    question={{
      title: "Best course ever :D",
      body: "This is THE React course!",
    }}
  />
</QuestionBox>
```

- So, we still have the same element at the same position in the tree.
- All that changed was the `question` prop.
- What do you think will happen to the state in this case?
- Well, let's remember one of the diffing rules, which says that if we have the same element at the same position in the tree, the DOM element and its state will be kept.
- Therefore, what's going to happen is that the state of the `Question` will be preserved.
- ![image](https://github.com/user-attachments/assets/32d20a70-9635-47d3-8c8e-c084534a5133)
- So, it will still show the answer that was in the component state before.
- But that answer is of course completely irrelevant to this new question, right?
- So, it doesn't make any sense to keep this state around here.
- So basically, what we need is a way to reset the `answer` state, and as you can guess, this is where the `key` prop comes into play once again.
- ![image](https://github.com/user-attachments/assets/28824cc9-d6ac-4aad-961e-7ba2157b9384)
- So now, we have a key of `q23` in the first question, which allows React to uniquely identify this component instance:

```javascript
<QuestionBox>
  <Question
    question={{
      title: "React vs JS",
      body: "Why should we use React?",
    }}
    key="q23"
  />
</QuestionBox>
```

- Then, when a new question appears, we can give it a different `key`:

```javascript
<QuestionBox>
  <Question
    question={{
      title: "Best course ever :D",
      body: "This is THE React course!",
    }}
    key="q89"
  />
</QuestionBox>
```

- by doing so, we tell React that this should be a different component instance and therefore, it should create a brand new DOM element.
- The result of doing this is that the `answer` state in the `Question` component will be reset, which is exactly what we need in this situation in order to make this small app work in a logical way.
- So, whenever you find yourself in a position where you need to reset state, just make sure that you give the element a `key` and that the `key` changes across renders.
- Now, this actually isn't necessary very often but you will sometimes find yourself in this situation.
- So, when this happens, it is very important to know that this is the solution.
- To make this even more clear now, let's go back to our small project and see it in action.

### Resetting State With The Key Prop

- Let's now use what we just learned about the `key` prop to our advantage and fix our `Tabbed` component.

```javascript
// project code

import { useState } from "react";

const content = [
  {
    summary: "React is a library for building UIs",
    details:
      "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "State management is like giving state a home",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "We can think of props as the component API",
    details:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

export default function App() {
  return (
    <div>
      <Tabbed content={content} />
    </div>
  );
}

function Tabbed({ content }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
      </div>

      {activeTab <= 2 ? (
        <TabContent item={content.at(activeTab)} />
      ) : (
        <DifferentContent />
      )}
    </div>
  );
}

function Tab({ num, activeTab, onClick }) {
  return (
    <button
      className={activeTab === num ? "tab active" : "tab"}
      onClick={() => onClick(num)}
    >
      Tab {num + 1}
    </button>
  );
}

function TabContent({ item }) {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);

  function handleInc() {
    setLikes(likes + 1);
  }

  return (
    <div className="tab-content">
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}

      <div className="tab-actions">
        <button onClick={() => setShowDetails((h) => !h)}>
          {showDetails ? "Hide" : "Show"} details
        </button>

        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={handleInc}>+</button>
          <button>+++</button>
        </div>
      </div>

      <div className="tab-undo">
        <button>Undo</button>
        <button>Undo in 2s</button>
      </div>
    </div>
  );
}

function DifferentContent() {
  return (
    <div className="tab-content">
      <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  );
}
```

- So, as we have just explored previously, as we change the state in `TabContent` component, that state will be preserved as we re-render that component.
- That's because the `TabContent` component is exactly of the same type as before i.e. it stays the same element between renders, and it also stays in the exact same place in the component tree.
- Therefore, its state is not reset.
- It is only reset when we change to the `DifferentContent` (tab 4) component and then switch back to the `TabContent` component.
- Now, in the meantime, our state was lost.
- But if we change the state of `showDetails` and/or `likes` in `TabContent` and just switch between tabs 1, 2, and 3, then the state is preserved.
- Now, as we were saying before, this is not what we want.
- So, let's now use the `key` prop to change this behavior.
- And actually, it is extremely easy.
- All we have to do is to give the `TabContent` a different `key` for each of the tabs, basically.
- So then, each time the `TabContent` component is re-rendered, it will get a different key. Then React will see it as a unique component instance.
- Therefore, the old one will be destroyed, and the state will be reset - just as we learned in the previous lesson.
- So, let's do that.

```javascript
function Tabbed({ content }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
      </div>

      {activeTab <= 2 ? (
        <TabContent
          item={content.at(activeTab)}
          key={content.at(activeTab).summary}
        />
      ) : (
        <DifferentContent />
      )}
    </div>
  );
}
```

- We don't have a unique ID for each of the element of the array so, we can use the `summary` as it is unique in all 3 elements.
- Now, as soon as the `TabContent` component will be re-rendered, then not only the value of the `item` will change, but also the value of `key`.
- So now we are in that situation where the key changes across renders and that will then reset the state.
- So, if we hide the details in Tab 1 then move to Tab 2 then the `TabComponent` state is reset.
- If we move back to Tab 1 then its state is also reset.
- So you see that our component state has indeed been reset.
- Again, that's just because React now views it as a completely different instance of `TabContent`.
- We can also see that in the React component tree, where it also displays the `key` for `TabContent`.
- This is exactly how React now makes each of the `TabContent` component instances unique and distinguishes between them.
- So, this is really nice and helpful and so, you really need to understand what happened here and keep it in mind for future situations.
- So, this `key` prop, it looks very simple but, it can make a huge difference.
- Let's now use the `key` prop in the [Eat-'N'-Split App](https://eat-n-split-six-ruby.vercel.app/), that we built before, in the next lesson.

### Using the Key Prop to Fix Our Eat-'N-Split App

- Let's now go back to our Eat-'N-Split App to fix one problem that we have left in that application.

```javascript
// Full project code at ./eat-n-split/src/App.jsx

import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

// More code

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  // More code

  return (
    <div className="app">
      {/* More code */}

      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

// More code
```

- The problem with this is that when we select a friend and start filling the form, then we choose another form, the state values of the form are still the same.
- ![key](https://github.com/user-attachments/assets/4bc3bbb5-621f-4524-8ec2-299b81387c09)
- So, this is the exactly same problem as before.
- So, as we select another friend, the only thing that changes is really the props that is being passed into the component.
- So, the `FormSplitBill` receives the `selectedFriend` object but, we change the `selectedFriend`, nothing changes in the React Element Tree.
- So, across these re-renders, exactly the same component is re-rendered in exact the same position of the tree.
- Therefore, the state is not reset across renders.
- But also just like before, this is not the behavior that we would expect in this application.
- So, if suddenly we move from one friend to the other one, we would certainly expect that the form input fields should be reset.
- So, how can we do that?
- We are using the `FormSplitBill` component in the `App` component.
- Now we basically need to make each component instance of the `FormSplitBill` unique so that each time that it is rendered with a new friend, React will see it as a completely new component instance.
- And as you already know, the way we do that is by providing a `key` that will actually change across the re-renders.
- Here, as a `key`, we can give the `selectedFriend.id`.

```javascript
// Full project code at ./eat-n-split/src/App.jsx

import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

// More code

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  // More code

  return (
    <div className="app">
      {/* More code */}

      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
          {/* Adding Key */}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}

// More code
```

- Now our App is working as expected.
- ![key-2](https://github.com/user-attachments/assets/7bdf0446-9e7e-4056-a46f-4e9849a8ab78)
- That's it, that's all we had to do here.
- Let's now move on to the next lesson.

### Rules for Render Logic: Pure Components

- In order for the rendering process to work in the way that we just learned before, our render logic needs to follow some simple rules.
- So, let's look at these rules in this lesson.
- ![image](https://github.com/user-attachments/assets/8e66c278-92ef-4063-a4a4-65e6053e32b8)
- But first of all, what actually is render logic?
- Well, in order to understand that, let's actually take a look at the two types of logic that we can write in React components. They are <ins>Render Logic</ins> and <ins>Event Handler Functions</ins>.
- Render logic is basically all the code that lives at the top level of your component functions and that participates in describing how the view of a certain component instance should look like.
- In the code example, in the image above, there is a lot of render logic.
- We have the two lines at the top level which are describing state for the component, then also the return block where our component returns its JSX.
- These describe exactly how the component will be displayed on the screen.
- However, if we look closely, we can identify yet another piece of render logic here, even though this code is actually inside a function.
- So, as you can see in the return block of our component, the code there is actually calling the `createList()` function.
- Therefore, that logic also participates in describing the component view. So, it is also render logic.
- Basically, render logic is all the code that is executed as soon as the component is rendered i.e. each time that the function is called.
- Now, moving to the event handler functions, those are very easy to identify.
- They are basically pieces of code that are executed as a consequence of the event that the handler is listening to.
- In our example, we have this line of code `onChange={handleNewAnswer}` that essentially registered `handleNewAnswer()` for the change event and therefore, `handleNewAnswer()` is our event handler function.
- This is, of course, nothing new at this point. We have done this many times in the course.
- But it is still important to differentiate between these two types of logic because, they do actually do fundamentally different things.
- So, while render logic is code that renders the component, event handlers contain code that actually does things i.e. code that makes things happen in the application.
- So, event handlers contain things like state updates, HTTP requests, reading input fields, page navigation, and many more.
- So, all things that basically change and manipulate the application in some way.
- Why is this all so important?
- Well, it is important because React requires that components are pure when it comes to render logic in order for everything to work as expected.
- But, what does pure actually mean?
- To answer that, let's have a quick refresher on functional programming principles, which are quite important in React, in general.
- ![image](https://github.com/user-attachments/assets/5c134ba3-4b24-4b2e-903d-372747483042)
- Let's start with side effects.
- A side effect happens whenever a function depends on any data that is outside the function scope, or even more importantly, whenever a function modifies data that is outside its scope.
- We can think of side effect as a function's interaction with the outside world.
- For example, the second code example in the image above - the function is mutating an outside object.
- So, this is clearly a side effect.
- Other examples of side effects are HTTP requests, writing to the DOM, setting timers, and more.
- The other important functional concept is pure functions, which are basically functions without side effects.
- Essentially, pure functions are functions that do not change any variable outside their scope.
- Also, when we give a pure function the same input, it will always return the same output.
- For example, the first code example in the image above - this function is clearly a pure function because, if we give it the same argument `r`, it will always give us the area of the circle based on that `r` value.
- So, the output only depends on the inputs, which makes this function predictable.
- The last code example in the image above, is completely unpredictable because, it returns a string that contains a date; and that date changes every second.
- So in this case, even if we give the function the same input, the output will always be different because the date will always be different and therefore, it is an impure function.
- The same is true for the second code example in the image above.
- Notice how it mutates an outside vairable, which of course makes that function impure as well.
- Now, calling functions impure makes it sound as if side-effects are somehow bad but, that's actually not true.
- Side effects are not bad in themselves.
- In fact, if we think about it, any program can only be useful if it has some interaction with the outside world at some point.
- For example, a web application that never affects any data or never writes to the DOM is just completely useless.
- However, in order to make useful and bug-free applications, we need to know when and how to create side-effects, which brings us back to React and its rules for render logic.
- ![image](https://github.com/user-attachments/assets/94bd0bf2-b3b6-4eae-9729-eb6f064fb055)
- Essentially, there is just one big rule, which is that components must be pure functions when it comes to render logic.
- This means that if we give a certain component instance the same props i.e. the same input then the same component should always return the exact same output in the form of JSX.
- In practice, this means that the render logic is not allowed to produce any side effects.
- So in other words, the logic that runs at the top level and is responsible for rendering the component should have no interaction with the outside world.
- This means that render logic is not allowed to perform network requests, to create timers, or to directly work with the DOM API.
- For example, listening to event using `addEventListener()`.
- Now, according to what we learned previously, render logic must also not mutate objects or variables that are outside the scope of the component function.
- This is actually the reason why we cannot mutate props, which remember, is one of the hard rules of React.
- So, now you know why that rule exists.
- It is because doing so would be a side effect and side effects are not allowed.
- Finally, we really cannot update state or refs in render logic.
- Updating state in render logic would actually create an infinite loop, which is why we can never do that.
- State updates are technically not side effects but it is still important for them to be on this list.
- There are other side effects that are technically not allowed as well, but that we create all the time like using `console.log()` or creating random numbers.
- These are clearly interactions with the outside world but, they don't seem to do any harm. So, we can safely keep doing them.
- Now you might be wondering, if all this is not allowed, then how will we ever be able to make an API call to fetch some data?
- Well, keep in mind that these side effects are only forbidden inside render logic.
- This means that you have other options for running your side effects.
- First of all, we saw earlier that event handler function are not render logic and therefore, side effects are allowed and actually encouraged to be used inside these functions.
- Second, if we need to create a side effect as soon as the component function is first executed, we can register that side effect using a special hook called `useEffect`. We will learn all about `useEffect` in the next section.
- For now, let's move on to another super important topic, which is state update batching.

### State Update Batching

- We have dived really deep into some aspects of the render phase, like the rules for render logic, and how the `key` prop works.
- But now, let's take one step back, and go back to one important aspect of the first triggering phase, which is the fact that state updates are batched.
- ![image](https://github.com/user-attachments/assets/f4dfa305-6fbb-4b07-8f25-ec9c987f6164)
- In that first lesson about how rendering works, we mentioned that renders are not triggered immediately, but scheduled for when the JS engine has some "free time". There is also batching of multiple `setState` calls in event handlers.
- In this lesson, let's focus on "There is also batching of multiple `setState` calls in event handlers.".
- As always, the easiest way of explaining difficult concepts is by using a small code example. So, let's take the code example from the image above.
- In this code example, we have 3 pieces of state, defined using the `useState` hook, and we also have a button in the user interface.
- Then, whenever there is a click on the button, the event handler function named `reset()` is called.
- In this function, the 3 pieces of state viz `answer`, `best`, and `solved`, are basically reverted back to their original state and therefore, this function is called "reset" and this is the part that interests us in this lesson so, let's now focus only on the event handler function.
- ![image](https://github.com/user-attachments/assets/a59ab8f7-a989-488e-b548-e71b64477f72)
- Now, what we want to do here is to analyze how these 3 pieces of state are actually updated behind the scenes.
- So, we might think that, as React sees the `setAnswer()` function call, it would update the state to the empty string as requested, and then trigger a re-render, and the commit phase, then it would move on to the next line, and do the same thing again, and a third time for the third state update.
- So intuitively, we would think that, if there are 3 state variables being updated in the event handler, then React would re-render 3 times.
- However, this actually not how it works.
- This is not how React updates multiple pieces of state in the same event handler function.
- Instead, these state updates will actually get batched into just one state update for the entire event handler.
- ![image](https://github.com/user-attachments/assets/6a516cdc-4b37-4578-875b-13135f171498)
- So, updating multiple pieces of state won't immediately cause a re-render for each update.
- Instead, all pieces of state inside the event handler are updated in one go.
- So, they are batched, and only then will React trigger one single render and commit.
- And conceptually, it makes sense that React works this way, because if we are updating these pieces of state together, it probably means that they should just represent one new view, and therefore, React only updates the screen once.
- So, if these date updates belong together, it really wouldn't make much sense to update the screen 3 times.
- Doing so would also create two wasted renders, because we are not interested in the first two renders, only the final one, which already contains all the 3 state updates.
- Therefore, the fact that React automatically batches state updates in this way is yet another performance optimization that React gives us out of the box.
- Now, batching state updates is extremely useful, but it can also have surprising results.
- ![image](https://github.com/user-attachments/assets/e3f05333-dfb0-4bb0-8c9e-1f5f1d09b30d)
- So, let's now turn our attention to this line of code: `console.log(answer)` (in the image above) where we reference the `answer` state variable right after updating it.
- So, what do you think will be the value of `answer` at this point (in the image above)?
- Well, let's try to think about this.
- Remember, that component state is stored in the Fiber tree during the render phase.
- At this point in the code, the render phase has not happened yet.
- So, React is still reading the function line by line to figure out what state needs to be udpated but, it hasn't actually updated the state yet, and it also hasn't re-rendered yet.
- That's the whole point of batching state updates in the first place, right?
- So, what this means is that, at this point of the code, the answer variable will still hold the current state i.e. the state before the update, even though we already told React to update it.
- So, at this point, we say that our state is <ins>stale</ins>, meaning that the state is no longer fresh and updated, because in fact, a state update will only be reflected in the state variable after the re-render.
- So for this reason, we say that updating state in React is asynchronous, and again, it is asynchronous.
- Again, it is asynchronous because React does not give us the updated state variable immediately after the `setAnswer()` call, but only after the re-render has happened.
- Now, the same thing is also true whenever there is only one piece of state being updated.
- So, no matter how many state variables are being updated, the updated state is only available after the re-render, not immediately.
- Now sometimes we actually do need the new value immediately after updating it, and in the case that we need the new value in order to update the same state again i.e. if we need to update the state based on a previous state update in the same event handler, we can pass a callback function into the set state function instead of a single value.
- And we have actually done this in practice all the time.
- ![image](https://github.com/user-attachments/assets/f451768b-d3ce-449b-98a9-51b4471e001c)
- So far we have only talked about batching in event handler functions, like the `reset()` function.
- That's because before React 18, React only did automatic batching in event handlers, but not in situations that happen after a browser event has already happened.
- However, there are certain very important situations in which we do need to update state, long after a browser event, like a click, has happened.
- Examples of that are timeouts and promises. For instance, we might want to run our `reset()` function only a second after a click event, or we might want to run it after some data has been fetched.
- So, it would be nice to also have automatic batching in those situations to improve performance, right?
- Well, that's actually one of the important features that React 18 gave us.
- Before React 18, if the `reset()` function was called by a timeout or by a promise, state updates inside the function would not be batched.
- Instead, in these situations, React would actually update the state variables one by one, and therefore, in this case, render 3 times.
- Now another case is handling native events using DOM methods such as `addEventListener()`, where state updates used to not be batched, but now they are.
- So again, if you are using the latest React version, you will now get automatic batching all the time, everywhere in your code.
- And if for some reason you are working with an older version of React, maybe at your work, it is important to know that batching used to work in a different way before version 18.
- Now, there are also some extremely rare situations in which automatic batching can be problematic.
- So, if you ever find yourself in a situation like that, you can just wrap the problematic state update in a `ReactDOM.flushSync()` function, and React will then exclude that update from batching.
- But you will most likely never need this.
- We are just mentioning it here, so that you know it exists.

### State Update Batching in Practice

- Let's move back to our project, and see how React batches state updates in practice and how this state updating is in fact asynchronous.
- Let's look at the `TabContent` component, and play around a little bit with the states that we have in it.

```javascript
// full code at ./how-react-works/src/App.jsx

function TabContent({ item }) {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);

  function handleInc() {
    setLikes(likes + 1);
  }

  return (
    <div className="tab-content">
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}

      <div className="tab-actions">
        <button onClick={() => setShowDetails((h) => !h)}>
          {showDetails ? "Hide" : "Show"} details
        </button>

        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={handleInc}>+</button>
          <button>+++</button>
        </div>
      </div>

      <div className="tab-undo">
        <button>Undo</button>
        <button>Undo in 2s</button>
      </div>
    </div>
  );
}
```

- First of all, let's now implement the functionality of the `undo` button.
- This `undo` button will basically reset the state of the `showDetails` and `likes`.
- So, let's write a simple function called `handleUndo()` and what it does is to set `showDetails` back to `true` and set `likes` back to `0`.
- And then tie the `handleUndo` with the `undo` button.

```javascript
// full code at ./how-react-works/src/App.jsx

function TabContent({ item }) {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);

  function handleInc() {
    setLikes(likes + 1);
  }

  function handleUndo() {
    setShowDetails(true);
    setLikes(0);
  }

  return (
    <div className="tab-content">
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}

      <div className="tab-actions">
        <button onClick={() => setShowDetails((h) => !h)}>
          {showDetails ? "Hide" : "Show"} details
        </button>

        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={handleInc}>+</button>
          <button>+++</button>
        </div>
      </div>

      <div className="tab-undo">
        <button onClick={handleUndo}>Undo</button>
        <button>Undo in 2s</button>
      </div>
    </div>
  );
}
```

- Now if we click on the `undo` button, we get the desired effect.
- So, as we learned in the previous lesson, isnide of the event handler function, such as the one of `handleUndo()`, the state updates are batched.
- So, they will only cause one component re-render.
- How can we actually prove that?
- Well, one simple way is to log something to the console in the component.
- Now, each time that the component gets rendered, it will log "RENDER" to the console.

```javascript
// full code at ./how-react-works/src/App.jsx

function TabContent({ item }) {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);

  console.log("RENDER");

  function handleInc() {
    setLikes(likes + 1);
  }

  function handleUndo() {
    setShowDetails(true);
    setLikes(0);
  }

  return (
    <div className="tab-content">
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}

      <div className="tab-actions">
        <button onClick={() => setShowDetails((h) => !h)}>
          {showDetails ? "Hide" : "Show"} details
        </button>

        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={handleInc}>+</button>
          <button>+++</button>
        </div>
      </div>

      <div className="tab-undo">
        <button onClick={handleUndo}>Undo</button>
        <button>Undo in 2s</button>
      </div>
    </div>
  );
}
```

- Nevermind the log that is a bit more grayed out, that is coming from somewhere else.
- The only one important is the white one - and this comes from the initial render of the `TabContent` component.
- And if we go to another tab, then we get another log, because then the `TabContent` component is updated.
- Now if we increase the number of likes and hide the details, we might get a few more "RENDER" string logs onto the console as they are updating the component and hence, it gets re-rendered.
  - This is actually a really nice way of proving that rendering is in-fact, calling the component function.
- But, let's now clear the console, with the clear button in the chrome dev tools.
- And now, if we click on the `undo` button, we should only see one "RENDER" logged in the console - which would then mean that the two state updates in the `handleUndo()` were batched.
- Indeed, we only get one "RENDER" in the console.
- ![state-update-in-batches](https://github.com/user-attachments/assets/073cdccd-180d-410d-9c26-a33ec0c25bf6)
- Great! Now, let's also see that the state updating is asynchronous.
- So basically, if we try to access the number of `likes` right after updating the state in `handleUndo()` then watch what happens.

```javascript
// full code at ./how-react-works/src/App.jsx

function TabContent({ item }) {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);

  console.log("RENDER");

  function handleInc() {
    setLikes(likes + 1);
  }

  function handleUndo() {
    setShowDetails(true);
    setLikes(0);
    console.log(likes);
  }

  return (
    <div className="tab-content">
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}

      <div className="tab-actions">
        <button onClick={() => setShowDetails((h) => !h)}>
          {showDetails ? "Hide" : "Show"} details
        </button>

        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={handleInc}>+</button>
          <button>+++</button>
        </div>
      </div>

      <div className="tab-undo">
        <button onClick={handleUndo}>Undo</button>
        <button>Undo in 2s</button>
      </div>
    </div>
  );
}
```

- First, we obviously need to increase the number of `likes`, let's say we increase it to 5, then, if we click on the `undo` button, the value of `likes` is still `5` even though we reset the `likes` back to 0 right before logging it to the console.
- ![async-state-updates](https://github.com/user-attachments/assets/83b6abac-e9c8-45f9-ba1b-f083652b0425)
- This might be surprising but, if you paid good attention in the previous lesson, then this will actually no longer come as a surprise to you.
- So, the reason that we get `5` is that the state is in fact actually only updated after the re-rendering - or basically during the re-rendering, but not immediately after we call `setLikes()` - that's impossible.
- Therefore, we still get the old state of `likes` which is still at `5`.
- Now, qhat do you think will happen i.e. what do you think will get rendered/logged if we click the `undo` button again?
- Let's clear the console and see what happens.
- ![state-values-default](https://github.com/user-attachments/assets/91dc91a8-ce84-4b2f-93b1-3a9ae60aa246)
- Now if we click the `undo` button, you will see that no "RENDER" string was logged to the console.
- Why do you think that is?
- Why was the component instance not re-rendered this time?
- Well, it is because both the state values were already at their default basically.

> [!NOTE]
> According to Chat GPT:
>
> When you update a component's state with the same value as the current state, **React still runs the component once before blocking subsequent renders**. This is due to how React works and its reconciliation process.
>
> In case the values are identical, React still performs a reconciliation process to ensure that no side effects have been introduced by this update.
>
> It is important to note that React tries to optimize these cases by avoiding updating the DOM if no difference is detected during reconciliation. This means that although the component rendering has been performed, there will be no actual DOM update.

> [!NOTE]
>
> According to legacy React documentation:
>
> If your update function returns the exact same values as the current state, the subsequent re-render will be skipped completely.
>
> [Reference](https://legacy.reactjs.org/docs/hooks-reference.html#functional-updates)

- So, `showDetails` was already `true` and `likes` was already `0`.
- So then, as we attempted to update the state, both of them were actually not updated.
- That's because the new state was equal to the current state. So, in that situation, React will not even try to update the state, and then of course, it will also not re-render the component instance.
- That's why, nothing happens.
- As we keep clicking `undo`, the `console.log(likes)` keeps getting executed but again, the component itself is not re-rendered.
- Let's now move on and implement the `+++` button.
- Here we have 3 pluses which essentially means that we want a "super like", so this should then increase the `likes` by 3.
- So, let's create a function for that in the `TabContent` and let's call it `handleTripleInc()`.

```javascript
// full code at ./how-react-works/src/App.jsx

function TabContent({ item }) {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);

  console.log("RENDER");

  function handleInc() {
    setLikes(likes + 1);
  }

  function handleTripleInc() {
    setLikes(likes + 1);
    setLikes(likes + 1);
    setLikes(likes + 1);
  }

  function handleUndo() {
    setShowDetails(true);
    setLikes(0);
    console.log(likes);
  }

  return (
    <div className="tab-content">
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}

      <div className="tab-actions">
        <button onClick={() => setShowDetails((h) => !h)}>
          {showDetails ? "Hide" : "Show"} details
        </button>

        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={handleInc}>+</button>
          <button onClick={handleTripleInc}>+++</button>
        </div>
      </div>

      <div className="tab-undo">
        <button onClick={handleUndo}>Undo</button>
        <button>Undo in 2s</button>
      </div>
    </div>
  );
}
```

- What do you think is going to happen when we click on `+++` now?
- Well, it only increased by 1 instead of 3 times as we might expect.
- ![super-like-increases-by-one](https://github.com/user-attachments/assets/7c5a9500-4b7b-487a-a11a-e6bd734100b1)
- But, were we actually expecting that it would increase 3 times with what we already know?
- We should know that this could never work:

```javascript
function handleTripleInc() {
  setLikes(likes + 1);
  setLikes(likes + 1);
  setLikes(likes + 1);
}
```

- Let's see why that is.
- So, right at the beginning of `handleTripleInc()` function, `likes` was set to 0.
- Then at the first `setLikes(likes + 1)`, `likes` would be 0 and 0 + 1 is 1.
- So, that's pretty clear but then, what in the next line?
- What is the value of `likes` in the second `setLikes(likes + 1)`?
- Well, it is actually still 0.
- That's because, the state update is once again, asynchronous.
- So, we do not get access to the new state value after the first `setLikes(likes + 1)`.
- And the same thing happens with the `setLikes(0)` in the `handleUndo()` function.
- So, at the second `setLikes(likes + 1)`, the state is now stale, just as we learned in the previous lesson as well.
- So, we can very easily see that with a `console.log()`.

```javascript
function handleTripleInc() {
  setLikes(likes + 1);
  console.log(likes);
  setLikes(likes + 1);
  setLikes(likes + 1);
}
```

- So, how can we make this work if we wanted to update the state by 3.
- We could do this `setLikes(likes + 3)` but, that is not the point here.
- We are trying to learn how we could do it in another way.
- So actually, we have been doing it all along.
- So, all the time, whenever we were updating state based on the current state, we would use a callback function instead of just a value.
- We also talked about it in the previous lesson.
- So now, the time finally came to learn why we have been doing it with the callback function all the time.
- So, let's comment out what we already have and do it the right way.

```javascript
function handleTripleInc() {
  // setLikes(likes + 1);
  // console.log(likes);
  // setLikes(likes + 1);
  // setLikes(likes + 1);

  setLikes((likes) => likes + 1);
  setLikes((likes) => likes + 1);
  setLikes((likes) => likes + 1);
}
```

- ![super-like-increases-by-three](https://github.com/user-attachments/assets/d0f8b33a-2666-42b4-9c36-3265d679219e)
- Now it works.
- So, this is the trick that changes the way the state is updated.
- So, in the callback function, we do actually get access to the latest updated state.
- Initially, `likes` was 0 and then it returned `1`.
- In the second call, the `likes` in the callback function will be `1` and so then we can update it by another `1` and then by another `1`.
- So, this is the reason why we have been mentioning that each time that we set a state based on the previous state or based on the current state, we should always, always use a callback function like we did above.
- Now you might be wondering, why should be do that in the `handleInc()` function? It works fine just the way it is.
- But, we never know what other developers might do with our functions, or even what we might do later, ourselves.
- So, let's say that at some point, we want to change how our function works, and then without thinking about it, we just do this:

```javascript
function handleInc() {
  setLikes(likes + 1);
  setLikes(likes + 1);
}
```

- Now we go back to `handleInc()` not working as expected.
- So, now we want to increase the likes by 2, but it will still only increase it by 1.
- Another situation might be where we simply want to call the `handleInc()` function in the `handleTripleInc()` function 3 times, like so:

```javascript
function handleInc() {
  setLikes(likes + 1);
  // setLikes(likes + 1);
}

function handleTripleInc() {
  // setLikes(likes + 1);
  // console.log(likes);
  // setLikes(likes + 1);
  // setLikes(likes + 1);

  // setLikes((likes) => likes + 1);
  // setLikes((likes) => likes + 1);
  // setLikes((likes) => likes + 1);

  handleInc();
  handleInc();
  handleInc();
}
```

- Or maybe some other developer might think that.
- So then, they would get surprised when they see this is actually not working.
- So again, you should always, always use the callback function, because then you are always safe for whatever change your code goes through in the future.

```javascript
function handleInc() {
  // setLikes(likes + 1);
  // setLikes(likes + 1);

  setLikes((likes) => likes + 1);
}

function handleTripleInc() {
  // setLikes(likes + 1);
  // console.log(likes);
  // setLikes(likes + 1);
  // setLikes(likes + 1);

  // setLikes((likes) => likes + 1);
  // setLikes((likes) => likes + 1);
  // setLikes((likes) => likes + 1);

  handleInc();
  handleInc();
  handleInc();
}
```

- Now it will work.
- So, even if you then use the `handleInc()` function somewhere else, by using the callback function, we just safeguarded about any changes that might occur in the future.
- Now to finish, let's just prove that automatic batching now works in React 18 even outside of event handlers.
- In our code we have a button which will undo i.e. reset our state, 2 seconds later.
- Well, that's easy enough.
- Let's just create a function called `handleUndoLater()` and it will simply set a timeout, and then after 2 seconds, it will call `handleUndo()`.

```javascript
function handleUndo() {
  setShowDetails(true);
  setLikes(0);
  console.log(likes);
}

function handleUndoLater() {
  setTimeout(handleUndo, 2000);
}
```

- Now `handleUndo()` is no longer really an event handler function.
- It is just any function that simply gets called at a later time.
- ![delayed-undo](https://github.com/user-attachments/assets/55c42dd4-ed0b-4496-a7fb-3c503c175d8c)
- Indeed, 2 seconds later, our state was updated also, our component was only rendered once, which is proved by the single "RENDER" string.
- Again, this proves that in React 18, batching happens not only inside event handlers, but also inside a `setTimeout()`.
- The same is true for promises and other situations.
- This is all that we had to learn here.
- It was a bit longer than expected but, we did do a lot of stuff here.
- Let's now move on to the next lesson.

### How Events Work in React

- Let's now leave the topics of rendering and state, and turn towards another essential part of React applications that we haven't really talked about yet, and that's events.
- In this lesson, we will learn how react handles events, and how they work behind the scenes, but let's start with a quick refresher on how event propagation and event delegation work in the DOM, because this is important to understand how React works.
- ![image](https://github.com/user-attachments/assets/fb9f320c-8dcb-42d0-9820-427700915ded)
- Let's consider the tree of DOM elements in the image above.
- Note that it really is a DOM tree, not a fiber tree or a React element tree.
- Now let's say that some event happens, like a click on one of the three buttons.
- Here is what's going to happen in the browser:
- As soon as the event fires, a new event object will be created, but it will not be created where teh click actually happened.
- Instead, the object will be created at the root of the document so, at the very top of the tree.
- From there, the event will then travel down the entire tree during the so-called capturing phase, all the way, until it reaches the target element, and the target element is simply the element on which the event was actually first triggered.
- So at the target, we can choose to handle that event by placing an event handler function on that element, which usually is exactly what we do.
- Then immediately after the target element has been reached, the event object travels all the way back up the entire tree during the so-called bubbling phase.
- Now, there are two very important things to understand about this process.
- First, during the capturing and bubbling phases, the event really goes through every single child and parent element one-by-one.
- In fact, it is as if the event originated or happened in each of these DOM elements.
- The second important thing is that by default, event handlers listen to events not only on the target element, but also during the bubbling phase.
- So, if we put these two things together, it means that every single event handler in a parent element will also be executed during the bubbling phase as long as it is also listening for the same type of event.
- For example, if we added another click event to the header element, then during this whole process, both the handlers at the target and the header element would be executed when the click happens.
- Now, sometimes we actually don't want this behavior, and in that case, we can prevent the event from bubbling up any further simply by calling the `stopPropagation()` method on the event object, and this works in vanilla JavaScript, and also in React.
- But it is actually very rarely necessary so, only use it if there really is no other solution.
- So, this is essentially how events work in the browser.
- Now, the fact that events bubble like this allows developers to implement a very common and very useful technique called event delegation.
- So, with event delegation, we can handle event for multiple elements in one central place, which is one of the parent elements.
- So, imagine that instead of 3 buttons, there would be like 1000 buttons.
- Now, if we wanted to handle events on all of them, each button would have to have its own copy of the event handler function, which could become problematic for the app's performance and memory usage.
- Instead, by simply using event delegation, we can simply add just one handler function to the first parent elements of these buttons.
- Then, when a click happens on one of these buttons, the event will bubble up to the options div (in this example), where we can then use the events target property in order to check whether the event originated from one of the buttons or not, and if it did, we can then handle the event in this central event handler function.
- We do this all the time in vanilla JS applications.
- However, in React apps, it is actually not so common for us to use this technique, but that might leave you wondering, if this is actually not important in React, then why are we talking about this?
- Well, for two reasons:
- First, because sometimes you find strange behaviors related to events in your applications, which might actually have to do with event bubbling, and so as a good React developer, you always want to understand exactly what's going on in order to fix these problems, and the second reason is that this is actually what React does behind the scenes with our events, and so let's take a look at that.
- ![image](https://github.com/user-attachments/assets/ead62b03-b68a-4e0a-8d99-a314d12dc4fa)
- Let's consider the same DOM tree from before, and let's say again that we want to attach an event handler to one of the buttons, or even to some other DOM element.
- This is what the code would look like in React:

```javascript
<button className="btn" onClick={() => setLoading(true)} />
```

- So, we could simply use the `onClick` prop to listen for click events, and then pass it a function. That's really easy.
- Now, if we think about how React actually registers these event handlers behind the scenes, we might believe it would look something like this:

```javascript
document
  .querySelector(".btn")
  .addEventListener("click", () => setLoading(true));
```

- So, React might select the button and then add the event handler to that element - that sounds pretty logical.
- However, this is actually not what React does internally.
- Instead, what React does is to register this and all other event handler functions to the `root` DOM container, and that root container is simply the DOM element in which the React app is displayed.

```javascript
document
  .querySelector("#root")
  .addEventListener("click", () => setLoading(true));
```

- So, if we use the default of `create-react-app`, that's usually the `div` element with an ID set to `"root"`.
- Again, instead of selecting the button where we actually placed our event handler, we can imagine that React selects the `root` element, and then adds all our event handlers to that element.
- And we say imagine beause the way React does all this behind the scenes is actually a lot more complex than this, but that's not relaly worth diving into here.
- The only thing that's worth knowing is that React physically registers one event handler function per event type, and it does so at the root node of the fiber tree during the render phase.
- So, if we have multiple `onClick` handlers in our code, React will actually somehow bundle them all together and just add one big `onClick` handler to the `root` node of the fiber tree.
- So, this is yet another important function of the fiber tree.
- Anyway, what this means is that behind the scenes, React actually performs event delegation for all events in our applications.
- So, we can say that React delegates all events to the `root` DOM container because, that's where they will actually get handled, not in the place where we thought we registered them, and so this works exactly how we just learned few moments ago.
- Again, whenever a click happens on the button, a new event object is fired off, which will then travel down the DOM tree until it reaches the target element.
- From there, the event will bubble back up.
- Then, as soon as the event reaches the `root` container where React registered all our handlers, the event will actually finally get handled according to whatever handlers match the event and the target element.
- Finally, once that's all done, the event, of course, continues bubbling up until it disappears into nowhere, and the beauty of this is that it all happens automatically and invisibly just to make our React apps yet a little bit more performant.
- Now, just one small detail that you need to notice is that it is really the DOM tree that matters here, not the component tree.
- So, just because one component is a child if another component, that doesn't mean that the same is true in the displayed DOM tree.
- So, just keep that in mind when thinking about bubbling in React applications.
- Alright, so we talked a lot about events and event objects, and so now, let's finish by taking a look at how these event objects actually work behind the scenes.
- ![image](https://github.com/user-attachments/assets/061bb2a0-4278-42cb-acaa-ceb2a6e1d55f)
- Whenever we declare an event handler like this:

```javascript
<input onChange={(e) => setText(e.target.value)} />
```

- React gives us access to the event object that was created, just like in the vanilla JS.
- However, in React, this event object is actually different.
- In vanilla JS, we simply get access to the native DOM event object, for example, `PointerEvent`, `MouseEvent`, `KeyboardEvent`, etc.
- React on the other hand, will give us something called `SyntheticEvent`, which is basically a thin wrapper around the DOM's native event object, and by wrapper we simply mean that synthetic events are pretty similar to native event objects, but they just add or change some functionalities on top of them.
- These `SyntheticEvent` have the same interface as native event objects, and that includes the important methods such as `stopPropagation()` and `preventDefault()`.
- What's special about synthetic events though, and one of the reasons why the React team decided to implement them is the fact that they fix some browser inconsistencies, making it so that events work in the exact same way in all browsers.
- The React team also decided that all of the most important synthetic events actually bubble, including the `focus`, `blur`, and `change` events, which usually do not bubble.
- The only exception here is the `scroll` event, which also does not bubble in React.
- Now to finish, let's quickly learn some differences between how event handlers work in React and vanilla JS.
- The first one is that in React, the prop name to attach an event handler are named using camel case, e.g. `onClick`
- On the other hand, in HTML, it would be `onclick` - all lower case; and if we used `addEventListener()` in vanilla JS, the event would simply be called `click`.
- In vanilla JS, whenever we want to stop the default behavior of the browser in response to an event, we can return `false` from the event handler function.
- A big example of that is the browser automatically reloading the page when we submit the form.
- However, if we would attempt to return `false` in a React event handler, that would simply not work.
- So in React, the only way to prevent the browser's default behavior is to call `preventDefault()` on the synthetic event object.
- Finally, in the rare event that you need to handle an event in the capturing phase rather than in bubbling phase, you can simply attach `Capture` to the event handler name, for example `onClickCapture` instead of just `onClick`, but most likely, you will never use this, so just keep this somewhere in the back of you mind.
- So, everything that we just learned is basically everything that you need to know in practice in order to successfully work with events in React.
- The rest all happens invisibly behind the scenes.

### Libraries vs. Frameworks & The React Ecosystem

- To finish off this section, let's talk about something entirely different.
- So, this lesson is not really about how React works behind the scenes, but more about what React actually is, which is a library.
- So, for future React developers, like you, it is important to understand what it means that React itself is a library and not a framework.
- So, let's now learn about the differences, as well as the React ecosystem.
- To understand the difference between a framework and a library, let's start with an analogy.
- ![image](https://github.com/user-attachments/assets/ab6bde70-2997-4ffd-9916-77ee0b5e24ff)
- Imagine that you want to make your own Sushi for the first time.
- You have two choices about how you want to do it.
- The first option is to just buy one of those all in one Sushi kits, which will come with all the ingredients that you need and therefore, you don't have to buy anything separately.
- All you have to do is to assemble these ingredients into your Sushi.
- However, there is also a downside to this because now you are stuck with the ingredients that included in the kit that you bought.
- So, if you find out that you don't like one of these ingredients then you still have to use it anyway.
- Now, instead of getting an all in one kit, you also have the option to buy all the ingredients separately.
- This will give you complete freedom to choose only the best ingredients and the ones that you like the most.
- On the other hand, all this freedom can give you decision fatigue because now, for each ingredient, you need to research which brand is the best option and then you also have to go buy each of the products separately.
- Even worse, if one of your selected brands changes or is no longer sold then you need to start the whole process over.
- But, probably at this point you are wondering, why are we talking about Sushi?
- Well, the reason is that this analogy translates beautifully into the difference between building a framework or using a library.
- So, we could actually just replace the images in the image above and call it a day.
- ![image](https://github.com/user-attachments/assets/4310e11b-feef-418a-8951-146881751ba2)
- So, we could describe Angular, Vue, or Svelte, for example, as the all-in-one kit, and React as buying separate ingredients.
- The pros and cons of building a web app with each of these approaches are basically exactly the same as in making Sushi at home.
- Let's now replace these terms and actually learn what's the difference between a framework and a library is.
- ![image](https://github.com/user-attachments/assets/2d08d802-89ea-49b5-a310-fa9d4b565148)
- In the world of JavaScript, a framework is basically a complete stucture that includes everything that you need in order to build a complete large scale application.
- We can say that frameworks like Angular are batteries included because they include things like routing, styling, HTTP requests, form management, and more - all out of the box.
- The downside of this is that you are stuck with the framework's tools and conventions even if you don't like or agree with them.
- However, that's actually not always bad.
- So, this is not a real downside for some developers.
- On the other hand, we have JS libraries, which are basically pieces of code that developers share for other developers to use.
- The prime example here is of course, React, which is what we call a view library.
- View because all React does is to draw components onto a user interface so, onto a so-called _view_.
- Now, if you want to build a large scale single page application, you will need to include many external, third party libraries for things like routing, styling, HTTP requests, etc.
- So, all these functionalities are not part of React itself, unlike what happens with Angular and other frameworks.
- So, this is how this notion that React is a library ties into the analogy of buying separate ingredients to make Sushi, because to build a React app, we have to choose all these separate libraries.
- Don't get it wrong, we can actually build React apps with just React itself i.e. without using any libraries, but that only makes sense for small apps or while we are still learning React.
- Now, being able to choose multiple libraries in order to build your application offers you incredible freedom because you can choose exactly the ones that you like the most.
- Also, every app will have different requirements. So, each app will require a different combination of libraries.
- So, including all of them in a framework might not even be necessary.
- However, on the other hand, the implication of this is that as a React developer, you need to be able to find and download all the right libraries for your specific application.
- Of course, on top of that you need to then learn how to use these libraries and even stay up to date with them over time.
- But don't worry, it is actually not as bad as it may sound.
- So, if you follow the course until the end, you will have a very good understanding of the most important libraries that we usually include into most React projects, which leads us to our next point, which is - React's huge third party library ecosystem.
- ![image](https://github.com/user-attachments/assets/0bb2a22a-c1de-42d6-be20-68f35426f196)
- So, React's huge popularity has led to a really, really large ecosystem of libraries that we can include in our React projects for different needs like routing for single page applications, making HTTP requests, managing remote server state, managing global application state, styling, managing forms, animations and transitions, and event entire UI component libraries.
- We will not go over all of them ony by one because that will take too much time so, you can just research them yourself, if you need.
- The libraries that are considered the most important are marked with a red border in the image above, and we will use/learn those later in this course.
- Things like React Router, React Query, Redux, Style Components, or Tailwind.
- Now, many React developers actually do feel overwhelmed by having to take so many decisions and choosing between so many third party libraries.
- So, this fact, among some other reasons, has led to the development of multiple opinionated React frameworks such as Next.js, Remix, or Gatsby.
- ![image](https://github.com/user-attachments/assets/41aca158-7745-45dc-bf5d-24fbb382085e)
- Next.js or Remix are React frameworks because they are actually built on top of React.
- They basically extend React's functionality and they are opinionated because other developers basically included their own opinions into how to handle stuff like routing, state management, or stylying into these frameworks.
- Where in the traditional React apps, we have to make decisions about what libraries to include in an app built with a React framework.
- Some of these important decisions have already been taken away from you, the developer.
- So, this makes project development much easier and much faster; and it can also lead to a better overall developer experience.
- Now, different frameworks specialize in different aspects but, all of them offload much of the setup work from you.
- Also, all of them offer many advantages besides just being opinionated, such as server side rendering or static site generation.
- In fact, we can even describe many of these frameworks as full stack React frameworks because they include so many features that we can actually build full stack apps with them, all while using React as the base layer.
- Anyway, this is just a brief overview of React frameworks.
- We will learn a lot more about this in the last part of the course where we will actually build a very large project using Next.js.

### Section Summary: Practical Takeaways

- Welcome to the last lesson of this long and complicated section. Hopefully, you enjoyed learning about all these internal workings of React.
- Now, to finish, let's summarize the key learnings that you should retain from this section.
- This is not a summary of everything that we learned but only the practical takeaways and conclusions that you will actually need to know in practice as you build your own React apps.
- This is necessary beacause, as mentioned multiple times previously, you don't need to know all the complicated things about how React works behind the scenes but, you do need to know the practical implications of it.
- So, this is the lesson where we gather all of those practical implications in the form of text slides that you can save and read in the future.
- Anyway, let's now move on to our first point.
- ![image](https://github.com/user-attachments/assets/15e2446d-1892-44a2-85c2-3914cb42c307)
- A component is basically like a blueprint for a piece of UI that will eventually exist on the screen.
- When we then use a component, React creates a component instance, which is like an actual, physical manifestation of a component, which contains props, state, effects, and more.
- So, following the analogy of the blueprint, the component is like a blueprint for a house and the component instances are like the actual houses that have been built from that blueprint.
- Finally, a component instance when rendered, will return a React element.
- Let's now move on to rendering.
- In React, rendering only means calling component functions and calculating what DOM elements need to be inserted, deleted, or updated later.
- So, rendering has nothing to with actually writing i.e. with actually updating the DOM.
- Writing to the DOM is actually called committing in the React language.
- So, what you need to remember here is that each time a component instance is rendered and re-rendered, the function is simply called again.
- But, what actually triggers a render to happen?
- As you should know already, only the initial render and state updates can cause a render which will happen for the entire application.
- So, even though it might look as if only one single component is rendered, the process is actually executed for all components.
- Now, when a component instance does get re-rendered, all its children will get re-rendered as well.
- This doesn't mean that all children will get updated in the DOM because, thanks to reconciliation, React will check which elements have actually changed between the two renders.
- One of the main parts of reconciliation that we just mentioned is diffing.
- ![image](https://github.com/user-attachments/assets/ef169a51-3a61-44b3-8c6e-bf51b441fa58)
- Diffing is how React decides which DOM elements need to be added or modified later.
- If between two renders, a certain React element stays at the same position in the element tree, the corresponding DOM element and the component state will simply stay the same.
- So, the DOM will not be modified in this case which is a huge win for performance.
- However, if the element did change to a different position in the tree or if it changed to a different element type altogether, then the DOM element and the corresponding state will be destroyed.
- So, they will basically be reset.
- Now, one cool thing about the diffing algorithm is the fact that we can actually influence it by giving elements a `key` prop, which then allows React to distinguish between multiple component instances of the same component type.
- So, when the `key` on a certain element stays the same across renders, the element is kept in the DOM even if it appears at a different position in the tree.
- So, this is the reason why we need to use `key` in lists because it will prevent unnecessary re-creations of elements in the DOM.
- On the other hand, when we change the `key` between renders, the DOM element will be destroyed and re-built.
- So, this is a very nice trick that we can use in order to reset state, which is sometimes necessary as we saw in two practical examples in this section.
- Next, we have one very important rule that you must never ever forget which is that you should never declare a new component inside another component.
- That's because doing so will re-create that nested component every time the parent component re-renders. So, that nested component would always be a new variable basically.
- This means that React would always see the nested component as a brand new component, and therefore, reset its state each time that the parent's state is updated.
- Now, the reason why this happens is not the important part, but what matters is that you should always, always declare i.e. you should write new components at the top level of a file, never inside another component.
- Now, the logic that is responsible for creating DOM elements i.e. logic that produces JSX is called render logic and this render logic is not allowed to produce any side effects.
- So, render logic can have no API calls, no timers, no object or variable mutations, and no state updates.
- The only place where side effects are allowed is inside event handlers and inside `useEffect`.
- Now, after all this rendering, it is time to finally update the DOM, which happens in the commit phase.
- ![image](https://github.com/user-attachments/assets/362c99c3-b60f-4e0c-a18e-8bdc893ef00c)
- However, it is actually not React that does this committing but, a so-called renderer called ReactDOM.
- That's why we always need to include both these libraries in a React web application project.
- We can also use other renderers to use React on different platforms.
- For example, to build mobile or native applications with React Native.
- Now, for the rest of this lesson, let's leave the topic of rendering behind and quickly talk about state and events.
- So, when we have multiple state updates inside an event handler function, all these state updates will be batched.
- So basically, they will happen all at once and this is super important because it means that multiple related state updates will only create one re-render which, once again, is great for performance.
- Since React 18, automatic batching even happens inside timeouts, promises, and native event handlers.
- Now, one super important practical implication of this is that we cannot access a state variable immediately after we update it which is why we say that state updates are asynchronous.
- Next up, when we use events inside event handler functions, we get access to a so-called synthetic event object, not the browser's native object.
- So, the React team created synthetic events so that events work the exact same way across all browsers and the main difference between synthetic and native events is that most synthetic events do actually bubble and that includes the focus, blur, and change events, which do not usually bubble as native browser events.
- The only exception here is the scroll event.
- Finally, let's remember that React is a library and not a framework.
- This means that you can basically assemble your applications using your favorite or the community's favorite third-party libraries and this is great for flexibility and creative freedom.
- The downside of this freedom is that there is basically an infinite amount of libraries that you can choose from and so, you need ot first find and then learn all these additional libraries that you need.
- However, that's not big of a problem because we will learn about the most commonly used libraries in the main projects of this course.
- There you have it. This is essentially what you need to remember from this section, going forward.

## Author

- [@bhoamikhona](https://github.com/bhoamikhona)
