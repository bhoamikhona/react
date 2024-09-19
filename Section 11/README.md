# Section 11: How React Works Behind The Scenes

**About:** Welcome to probably the most challenging section in this course but also, one of the most exciting ones and most rewarding ones. Up until this point we have only focused on how React concepts and features work in practice, but now it is time to understand how things actually work internally, inside React, behind the scenes. This information that you are about to learn will not only make you a much better and more confident React developer, but it will also allow you to ace the most common React interview questions with all the confidence that you need in order to nail the job. This knowledge will actually put you right in the top 5% of all React developers. This section is quite intense and it should probably be in the advanced part of the course, but since there are so many important things to learn about before moving on, it was decided to place right here. If at some point it becomes a bit too much or if you become bored, please take a look at the final lesson of the section where we will briefly summarize everything we have covered. So, that lessons is really a must. Anyway, without further ado, let's dive right in and uncover how React works.

## Table of Content

- [Section 11: How React Works Behind The Scenes](#section-11-how-react-works-behind-the-scenes)
  - [Table of Content](#table-of-content)
  - [Lessons Learned](#lessons-learned)
    - [Project Setup and Walkthrough](#project-setup-and-walkthrough)
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

## Author

- [@bhoamikhona](https://github.com/bhoamikhona)
