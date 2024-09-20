# Section 11: How React Works Behind The Scenes

**About:** Welcome to probably the most challenging section in this course but also, one of the most exciting ones and most rewarding ones. Up until this point we have only focused on how React concepts and features work in practice, but now it is time to understand how things actually work internally, inside React, behind the scenes. This information that you are about to learn will not only make you a much better and more confident React developer, but it will also allow you to ace the most common React interview questions with all the confidence that you need in order to nail the job. This knowledge will actually put you right in the top 5% of all React developers. This section is quite intense and it should probably be in the advanced part of the course, but since there are so many important things to learn about before moving on, it was decided to place right here. If at some point it becomes a bit too much or if you become bored, please take a look at the final lesson of the section where we will briefly summarize everything we have covered. So, that lessons is really a must. Anyway, without further ado, let's dive right in and uncover how React works.

## Table of Content

- [Section 11: How React Works Behind The Scenes](#section-11-how-react-works-behind-the-scenes)
  - [Table of Content](#table-of-content)
  - [Lessons Learned](#lessons-learned)
    - [Project Setup and Walkthrough](#project-setup-and-walkthrough)
    - [Components, Instances, and Elements](#components-instances-and-elements)
    - [Instances and Elements in Practice](#instances-and-elements-in-practice)
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

## Author

- [@bhoamikhona](https://github.com/bhoamikhona)
