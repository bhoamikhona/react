# Section 11: How React Works Behind The Scenes

**About:** This is probably the most challenging section in this course but, also one of the most exciting ones and most rewarding ones. Up until this point we have only focused on how React concepts and features work in practice, but now it is time to understand how things actually work internally - inside React, behind the scenes. This information that you are about to learn will not only make you a much better and more confident React developer, but it will also allow you to ace the most common React interview questions with all the confidence that you need in order to nail that job. This knowledge will actually put you right in the top 5% of all React developers. This section is quite intense, and it should probably be in the advanced part of the course but, since there is so many important things to cover that it was placed here. If at some point it becomes a bit overwhelming or tiring, please just at least go through the last lesson of this section where we will briefly summarize everything we covered. So, that lesson really is a must. Anyway, without further ado, let's dive right in and uncover how React works.

## Table Of Content

- [Section 11: How React Works Behind The Scenes](#section-11-how-react-works-behind-the-scenes)
  - [Table Of Content](#table-of-content)
  - [Lessons Learned](#lessons-learned)
    - [Project Setup and Walkthrough](#project-setup-and-walkthrough)
    - [Components, Instances, and Elements](#components-instances-and-elements)
    - [Instances and Elements in Practice](#instances-and-elements-in-practice)
    - [How Rendering Works: Overview](#how-rendering-works-overview)
    - [How Rendering Works: The Render Phase](#how-rendering-works-the-render-phase)
  - [Author](#author)

## Lessons Learned

### Project Setup and Walkthrough

### Components, Instances, and Elements

- Let's start this section with the conceptual difference between React components, Component instances, and React elements.
- Knowing about this difference will hopefully make it a bit a more clear what actually happens with your components as you use them.
- Also, this is a pretty common interview question so, this topic is definitely worth learning about.
- Let's begin by taking another look at components.
- ![image](https://github.com/user-attachments/assets/dc21afd7-d65b-4886-97bf-2de371c96b34)
- Components are what we write in order to describe a piece of the user interface.
- And the component is just a regular JavaScript function, but it is a function that returns React elements.
- So, it returns an element tree.
- And we usually write these elements using the JSX syntax.
- A component is a generic description of the UI.
- So, we can essentially think of a component as a blueprint or a template, and it is out of this one blueprint or template that React then creates one or more multiple component instances.
- ![image](https://github.com/user-attachments/assets/70717d50-45c4-46a9-b2a9-1495b9f96956)
- React does this each time that we use the component somewhere in our code.
- For example, the `Tab` component (in the image above) is included 3 times in the `App` component.
- Therefore, 3 instances of `Tab` are placed in the component tree i.e. in our actual application.
- Behind the scenes, this happens because React will call the `Tab` function 3 times.
- So, one time for each instance.
- So, we can say that an instance is like the actual physical manifestation of a component, living in our component tree.
- While the component itself is really just a function that we wrote before being called.
- And actually, it is each instance that holds its own state and props and that also has its own life cycle.
- So basically, a component instance can be born, it can live for some time until it will eventually die. So, it is bit like a living organism really.
- In practice, we many times just use the terms component and component instance interchangeably.
- For example, we just say component life cycle and not component instance life cycle.
- We also say that the UI is made up of components and not of component instances, even though instances would technically be more accurate.
- So, just keep that in mind for the future when you read documentation or some stack overflow post or something like that.
- Anyway, as React executes the code in each of these instances, each of them will return one or more React elements.
- ![image](https://github.com/user-attachments/assets/57e80dda-5491-4fbc-8b2c-e017db0a1767)
- So, as we learned when we first talked about JSX behind the scenes, JSX will actually get converted to multiple `React.createElement()` function calls.
- Then, as React calls these `createElement()` functions the result will be a React element.
- A React element is basically the result of using a component in our code.
- It is simply a big immutable JavaScript object that React keeps in memory; and we will take a look at this later in our code.
- But, what is this object actually?
- Well, a React element basically contains all the information that is necessary in order to create DOM elements for the current component instance.
- So, it is this React element that will eventually be converted to actual DOM elements, and then painted onto the screen by the browser.
- ![image](https://github.com/user-attachments/assets/112fc121-d118-4ee0-82ac-491cd1922f87)
- So, based on all this, the DOM elements are the actual, final and visual representation of the components instance in the browser.
- Again, it is not the React elements that are rendered to the DOM.
- React elements just live inside the React app and have nothing to do with the DOM.
- They are simply converted to DOM elements when they are painted on the screen in the final step.
- So, this is the journey from writing a single component to using it multiple times in our code as a blueprint all the way until it is converted to a React element, and then rendered as HTML elements into the DOM.

### Instances and Elements in Practice

- Let's now shortly look at component instances and React elements in our code.
- In this lesson we are going to do a couple of quick experiments to look at some interesting things.
- First off, we can actually take a look at a component instance simply by using the component and logging it to the console. So, let's try that out:

```javascript
function DifferentContent() {
  return (
    <div className="tab-content">
      <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  );
}

console.log(<DifferentContent />);
```

- As soon as React sees `<DifferentContent/>`, it will internally call the `DifferentContent()` function and will then return this:

```javascript
// output
{
  $$typeof: Symbol(react.element)
  key: null
  props: {}
  ref: null
  type: ƒ DifferentContent()
  _owner: null
  _store: {validated: false}
  _self: undefined
  _source: {fileName: '...App.jsx', lineNumber: 29, columnNumber: 13}
  [[Prototype]]: Object
}
```

- We can see that the `type` is of `DifferentContent()`.
- We can also see that we didn't pass any props but, which we actually could:

```javascript
function DifferentContent() {
  return (
    <div className="tab-content">
      <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  );
}

// passing props
console.log(<DifferentContent test={23} />);

// output
{
  $$typeof: Symbol(react.element)
  key: null
  props: {test: 23} // props passed in
  ref: null
  type: ƒ DifferentContent()
  _owner: null
  _store: {validated: false}
  _self: undefined
  _source: {fileName: '...App.jsx', lineNumber: 29, columnNumber: 13}
  [[Prototype]]: Object
}
```

- Again, this is what React internally use to then later create our DOM elements.
- Now if you are wondering what is the `$$` in the `$$typeof` key in the output then it is simply a security feature that React has implemented in order to protect us against cross-site scripting attacks.
- Notice how the value of `$$typeof` is a `Symbol` and `Symbol` are one of JavaScript primitives, which cannot be transmitted via JSON.
- In other words, this means that a `Symbol` like this cannot come from an API call.
- So, if some hacker would try to send us a fake React element from that API, then React would not see `$$typeof` as a `Symbol`. Again, because `Symbol` cannot be transmitted via JSON.
- So then React would not include that fake React element into the DOM thereby protecting us against that kind of attack.
- Anyway, let's now try something else.
- If React calls our component internally when it renders them using this syntax: `<DifferentContent />` then why don't we just call components like a regular function call i.e. like so: `DifferentContent()`?

```javascript
function DifferentContent() {
  return (
    <div className="tab-content">
      <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  );
}

console.log(<DifferentContent />);
console.log(DifferentContent());
```

- If we look at the console, we do actually get a result by calling it like so: `DifferentContent()`.
- But if you look closely, the output is a bit different.

```javascript
// Output of `console.log(<DifferentContent />)`
{
  $$typeof: Symbol(react.element)
  key: null
  props: {}
  ref: null
  type: ƒ DifferentContent() // type is DifferentContent()
  _owner: null
  _store: {validated: false}
  _self: undefined
  _source: {fileName: '...App.jsx', lineNumber: 29, columnNumber: 13}
  [[Prototype]]: Object
}


// Output of `console.log(DifferentContent())`
{
  $$typeof: Symbol(react.element)
  key: null
  props: {className: 'tab-content', children: {…}}
  ref: null
  type: "div" // type is div
  _owner: null
  _store: {validated: false}
  _self: undefined
  _source: {fileName: '...App.jsx', lineNumber: 99, columnNumber: 5}
  [[Prototype]]: Object
}
```

- The value of `type` is different. In the first one the `type` is `DifferentContent()` and in the second one the `type` is `div` - which is basically just the content of that component i.e. the `div` that the `DifferentContent` component is returning.
- So, this `div` is now the type of `DifferentContent()` function call.
- We can also see that because in the second output, the `props` now inclue the `className` of that returning `div`.
- So, what this means is that right now, React does no longer see it as a component instance. Instead, it just sees it as a raw React element, which is really not what we want.
- So, when we use a component, we want React to see the component instance and not the raw output element like the one we get with `DifferentContent()`.
- So, never call a component like we call a regular function.
- Let's demonstrate it one more time, but now inside the component.

```javascript
// Entire code is in ./how-react-works/src/App.jsx

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

      {/* Demonstration */}
      {TabContent({ item: content.at(0) })}
    </div>
  );
}
```

- If we now re-load our webpage, it somehow works.
- So you see that actually we got a second `<TabContent/>` rendered.
- So, it looks like this works, right?
- Well, not so fast.
- If we check our component tree, you will see that we only hae one `TabContent` in our component tree.
- This happened exactly because of what we learned earlier, which is that when we call a component like a we call a regular function, then React no longer sees it as a component instance.
- We can also see that the state that `TabContent` manages is actually now inside the parent state or parent component.
- So, if we check the `Tabbed` component in the component tree, you will see that it has the normal state that it had before - which is the active tab but, it also has some other hooks which come from `TabContent`.
- Those hooks are the ones that come from `TabContent` when we call it like a regular function, but they don't really belong there.
- We want them to be inside `TabContent` and not inside `Tabbed`.
- So, what this means again, is that `TabContent()` is not really a component because it cannot even manage its own state at this point.
- So, for all these reasons, we should never call a component like a regular function call, because it will create multiple problems such as violating the rules of hooks that we will talk about later.
- Instead, as you already know, always render it inside the JSX, like this: `<TabContent />`. Here we just use the component. So, basically this blueprint like we have always been doing.
- Then React calls the component and actually recognizes it as a component instance.

### How Rendering Works: Overview

- We are now ready to finally learn about how exactly React renders our applications behind the scenes.
- There is so much to learn here that this topic is split into 3 parts - this lesson and the next two ones.
- This one serves more as an overview and then in the next two lessons, we are going to go really deep into some React internals.
- Let's start with just a small recap.
- ![image](https://github.com/user-attachments/assets/2d4ecf2d-9c1c-4e61-8d5b-a48057d3d285)
- As we build our applications, what we are really doing is building a bunch of components.
- We then use these components inside other components as many times as we want which will cause React to create one or more component instances of each component.
- These are basically the actual physical components that live in our application and holds state and props.
- As React calls each component instance, each JSX will produce a bunch of `React.createElement()` function calls which in turn will produce a React element for each component instance.
- This React element will ultimately be transformed to DOM elements and displayed as a user interface on the screen.
- So, we have a pretty good understanding of the initial part of this process i.e. transforming components to React elements.
- However, what we don't understand yet is the second part of the process, which is how these React elements actually end up in the DOM and displayed on the screen.
- Luckily for us, that is exactly what this series of lessons is all about.
- In this lesson, we are going to have a quick overview of each of the phases involved in displaying our components onto the screen.
- Then we are going to zoom into each of these phases to learn how the entire process works internally, behind the scenes.
- ![image](https://github.com/user-attachments/assets/1b8f0724-56ab-4e9a-b525-4776f7dbb986)
- This process that we are about to study is started by React each time that a new render is triggered, most of the time by updating state somewhere in the application.
- So, state changes trigger renders and so it makes sense that the next phase is the render phase.
- In the render phase, React calls our component functions and figures out how it should update the DOM, in order to reflect the latest state changes.
- However, it does actually not update the DOM in this phase.
- So, React's definition of "render" is very different from what we usually think of as a "render", which can be quite confusing.
- So again, in React, rendering is not about updating the DOM or displaying elements on the screen.
- Rendering only happens internally inside of React and so it does not produce any visual changes.
- In all the previous sections, we have always used the term "rendering" with the meaning of displaying elements on the screen because that was just easy to understand and it made sense.
- However, as we just learned, the "rendering" that we meant is really this render phase plus the next phase.
- Speaking of the next phase, once React knows how to update a DOM, it does so in the commit phase.
- In commit phase, new elements might be placed in the DOM and already existing elements might get updated or deleted in order to correctly reflect the current state of the application.
- So, it is really this commit phase that is responsible for what we traditionally call rendering, not the render phase.
- Finally, the browser will notice that the DOM has been updated and so it re-paints the screen.
- Now this has nothing to do with React anymore but, it is still worth mentioning that it is this final step that actually produces the visual change that users see on their screens.
- Let's now zoom into each of these different steps, starting with the triggering of a render.
- ![image](https://github.com/user-attachments/assets/fb374037-5eae-48c1-8945-c6681247684a)
- There are only two ways in which a render can be triggered.
- The first one is the very first time the application runs which is what we call the intial render.
- The second one is a state update happening in one or more component instances somewhere in the application, which is what we call a re-render.
- It is important to note that the render process really is triggered for the entire application, not just for one single component.
- That doesn't mean that the entire DOM is updated because remember, in React, rendering is only about calling the component functions and figuring out what needs to change in the DOM later.
- Again, this might seem confusing now because earlier in the course, we made it seem as though React only re-renders the component where the state update happened, but that's because we were learning how React works in practice.
- In fact, when we look at what happens in practice, it looks as if only the updated component is re-rendered.
- But now we are learning how React actually works behind the scenes, and so now we know that React looks at the entire tree whenever a render happens.
- Finally, it is important to mention that a render is actrually not triggered immediately after a state update happens.
- Instead, it is scheduled for when the JavaScript engine basically has some free time on its hands.
- But this difference is usually just a few milliseconds that we won't notice.
- There are also some situations like multiple sets state calls in the same function where renders will be batched as we will explore a bit later.
- So, this is how renders are triggered which is the easy part.
- What follows is the hard part, which is the actual rendering. So, let's learn all about that in the next lesson.

### How Rendering Works: The Render Phase

- This is probably the most complicated and most confusing lesson fo the entire course.
- But that is not to say in order to scare you because, this might also be the most interesting and fascinating lesson of the course.
- If you don't immediately understand 100% of what we are going to learn here, that's absolutely fine. So, don't stress about it at all.
- You can use React without knowing any of this but, if you have a curious mind and feel the need to understand how React does what it does, then this lesson is for you.
- Before we even start, let's first go back to where we first learned about the mechanics of state.
- ![image](https://github.com/user-attachments/assets/18ab6de6-b77f-4bfa-b68a-71006ea4aaa0)
- Remember this diagram (image above)?
- Back then we mentioned that we can conceptually imagine this as a new view being rendered on the screen i.e. in the DOM.
- However, now we know that this was technically not true because, rendering is not about the screen or the DOM or the view, it is just about calling component functions.
- We also mentioned that whenever there is a re-render, React discards the old component view and replaces it with a brand new one.
- However, that's also technically not true.
- So, the DOM will actually not be updated for the entire component instance.
- So, if those things are not true, then let's now learn what happens instead and how rendering actually works.
- ![image](https://github.com/user-attachments/assets/ff03d72f-f570-4d2b-b48d-01db5f5b4c5b)
- In the previous lesson we talked about how renders are triggered.
- In this lesson, we are going to learn all about how renders are actually performed in the render phase.
- At the beginning of the render phase, React will go through the entire component tree, take all the component instances that triggered a re-render and actually render them, which simply means to call the corresponding component functions that we have written in our code.
- This will create updated React elements which altogether make up the so-called <ins>virtual DOM</ins>.
- This is a a term that you might have heard before and so let's dig a little bit deeper now into what the virtual DOM actually is.
- ![image](https://github.com/user-attachments/assets/dfb0940b-5873-4cfc-8eb3-d42db2b994e3)
- On the initial render, React will take the entire component tree and transform it into one big React element which will basically be a React element tree like shown in the image above; and this is what we call the virtual DOM.
- So, the virtual DOM is just a tree of all React elements created from all instances in the component tree; and it is relatively cheap and fast to create a tree like this, even if we need many iterations of it because, in the end, it is just a JavaScript object.
- Virtual DOM is probably the most hyped and most used term when people describe what React is and how it works.
- But, if we think about it, if the virtual DOM is just this simple object, it is actually not such a big deal, right?
- And that's why the React team has really downplayed the meaning of this name.
- The official documentation actually no longer mentions the term virtual DOM anywhere.
- But, we are still using it here because everyone still uses it and also because it just sounds a bit nicer than React element tree.
- Also, some people confuse the term with the shadow DOM, even though it has nothing to do with the virtual DOM in React.
- So, the shadow DOM is actually just a browser technology that is used in stuff like web components.
- But anyway, let's now suppose that there is going to be a state updated in component D, which will of course trigger a re-render.
- This means that React will call the function of component D again and place the new React element in the new React element tree i.e. in the new virtual DOM.
- But now comes the very important part, which is this:
- Whenever React renders a component, that render will cause all of its child components to be re-rendered as well.
- That happens no matter if the props that we have passed down have changed or not.
- Again, if the updated components returns one or more other components, those nested components will be re-rendered as well, all the way down the component tree.
- This means that if you update the highest component in a component tree, in this example - component A, then the entire application will actually be re-rendered.
- ![image](https://github.com/user-attachments/assets/e86bd44e-65c7-4aec-a8a4-6aa3a60c5e01)
- This may sound crazy, but React uses this strategy because it doesn't know beforehand whether an update in a component will affect the child components or not.
- So by default, React prefers to play it safe and just render everything.
- Also, keep in mind once again that this does not mean that the entire DOM is updated.
- It is just a virtual DOM that will be re-created which is really not a big problem in small or medium sized applications.
- With this, we now know what this new virtual DOM means. So, let's keep moving forward.
- ![image](https://github.com/user-attachments/assets/32ced5e0-447f-4a57-bcfd-e29e1255f41e)
- What happens next is that this new virtual DOM that was created after the state update will get reconciled with the current so-called <ins>Fiber tree</ins> as it exists before the state update.
- This reconciliation is done in React's reconciler which is called <ins>Fiber</ins>.
- That's why we have a fiber tree.
- Then, the result of this reconciliation process is going to be an updated Fiber tree i.e. a tree that will eventually be used to write to the DOM.
- This is a high level overview of the inputs and the outputs of reconciliation, but of course, now we need to understand what reconciliation is and how it works.
- ![image](https://github.com/user-attachments/assets/b9f49711-97c4-4089-a983-229243c03533)
- You might be wondering, why do we even need stuff like the virtual DOM, a reconciler, and the Fiber trees? Why not simply update the entire DOM whenever state changes somewhere in the app?
- Well, the answer is simple.
- Remember how we said that creating the virtual DOM i.e. the React element tree for the entire app is cheap and fast because it is just a JavaScript object?
- Well, writing to the DOM is not cheap and fast.
- It would be extremely inefficient and wasteful to always write the entire virtual DOM to the actual DOM each time that a render was triggered.
- Also, usually when the state changes somewhere in the app, only a small portion of the DOM needs to be updated and the rest of the DOM that is already present can be reused.
- Of course, on the initial render there is no way around creating the entire DOM from scratch but from there on, doing so doesn't make sense anymore.
- Imagine that you have a complex app like udemy.com and when you click on some button there then `showModal` is set to `true`, which in turn will then trigger a modal to be shown.
- In this situation, only the DOM elements for that modal need to be inserted into the DOM and the rest of the DOM should just stay the same.
- That's what React tries to do.
- Whenever a render a triggered, React will try to be as efficient as possible by re-using as much of the existing DOM tree as possible.
- But that leads us to the next question. How does React actually do that? How does it know what changed from one render to the next one?
- Well, that's where a process called reconciliation comes into play.
- So, reconciliation is basically deciding exactly which DOM elements need to be inserted, deleted or updated in order to reflect the latest state changes.
- So the result of the reconciliation process is going to be a list of DOM operations that are necessary to update the current DOM with the new state.
- Reconciliation is processed by a reconciler and we can say that the reconciler really is the engine of React. It is like the heart of React.
- It is this reconciler that allows us to never touch the DOM directly and instead, simply tell React what the next snapshot of the UI should look like based on state.
- ![image](https://github.com/user-attachments/assets/40fada4a-f6d2-49c3-a7b9-25f969833216)
- As mentioned before, the current reconciler in React is called Fiber, and this is how it works:
- During the initial render of the application, Fiber takes the entire React element tree i.e. the virtual DOM and builds yet another tree which is the Fiber tree based on the virtual DOM.
- The Fiber tree is a special internal tree where for each component instance and DOM element in the app, there is one so-called <ins>Fiber</ins>.
- What's special about this tree is that unlike React elements in the virtual DOM, Fibers are not re-created on every render.
- So, the Fiber tree is never destroyed.
- Instead, it is a mutable data structure and once it has been created during the initial render, it is simply mutated over and over again in future reconciliation steps.
- This makes Fibers the perfect place for keeping track of things like the current component state, props, side effects, list of used hooks and more.
- So, the actual state and props of any component instance that we see on the screen are internally stored inside the corresponding Fiber in the Fiber tree.
- Each Fiber also contains a queue of work to do like updating state, updating refs, running registered side effects, performing DOM, updates etc.
- This is why a Fiber is also defined as a <ins>unit of work</ins>.
- If we take a look at the Fiber tree (in the iamge above), we will see that the Fibers are arranged in a different way than the elements in the React element tree.
- Instead of a normal parent-child relationship, each first child has a link to its parent, and all the other children then have a link to their previous sibling.
- This kind of structure is called a linked list and it makes it easier for React to process the work that is associated with each Fiber.
- We also see that both trees include not only React elements or components, but also regular DOM elements, such as the `<h3>` or `<button>` elements in this example (image above).
- So, both trees really are a complete representation of the entire DOM structure, not just of React components.
- Now going back to the idea that Fibers are units of work, one extremely important characteristic of the Fiber reconciler is that work can be performed asynchronously.
- This means that the rendering process which is what the reconciler does, can be split into chunks, some tasks can be prioritized over others and work can be paused, reused, or thrown away if not valid anymore.
- Just keep in mind that all this happens automatically behind the scenes.
- It is completely invisible to us developers.
- There are, however, also some practical uses of this asynchronous rendering because it enables modern so-called <ins>concurrent features</ins> like <ins>Suspense</ins> or <ins>transitions</ins> in React 18.
- It also allows the rendering process to pause and resume later so that it won't block the browser's JavaScript engine with too long renders, which can be problematic for performance in large applications.
- Again, this is only possible because the render phase does not produce any visible output to the DOM yet.
- At this point we know what the Fiber reconciler ios and how the Fiber tree works but now, it is time to talk about what Fiber actually does, which is the reconciliation process.
- ![image](https://github.com/user-attachments/assets/dc0b890a-810e-4aca-9610-fa654a01020a)
- The best way to explain how reconciliation works is by using a practical example as shown in the image above.
- In the app component, there is a piece of state called `showModal`, which is currently set to `true`.
- Let's say now that the state is updated to `false`.
- This will then trigger a re-render which will create a new virtual DOM.
- In this tree, the modal and all its children are actually gone because they are no longer displayed when `showModal` is not true.
- Also, all remaining elements are yellow, meaning that all of them were re-rendered. Do you remember why that is?
- It is because all children of a re-rendered element are re-rendered as well, as we just learned a few minutes ago.
- Anyway, this new virtual DOM now needs to be reconciled with the current Fiber tree, which will then result in the updated tree which internally is called the `workInProgress` tree.
- So, whenever reconciliation needs to happen, Fiber walks through the entire tree step by step and analyzes exactly what needs to change between the current Fiber tree and the updated Fiber tree based on the new virtual DOM.
- This process of comparing elements step-by-step based on their postion in the tree is called diffing and we will explore exactly how diffing works a bit later in the section because that's actually pretty important in practice.
- Anyway, let's quickly analyze our updated Fiber tree where we marked new work that is related to DOM mutations.
- First, the `Btn` component has some new text and so the work that will need to be done in this Fiber is a DOM update.
- In this case, swapping text from "Hide" to "Rate".
- Then we have the `Modal`, `Overlay`, `<h3>`, and `<button>`. These were in the current Fiber tree but are no longer in the virtual DOM and therefore, they are marked as DOM deletions.
- Finally, we have the interesting case of the `Video` component.
- This component was re-rendered because it is a child of the `App` component, but it actually didn't change.
- So, as a result of reconciliation, the DOM will not be updated in this case.
- Now, once this process is over, all these DOM mutations will be placed into a list called the list of effects which will be used in the next phase i.e. in the commit phase, to actually mutate the DOM.
- What we learned here was still a bit oversimplified but, it is more than enough for you to understand how this process works.
- ![image](https://github.com/user-attachments/assets/221268cd-3554-41ae-8265-7855861e9c0f)
- That was quite a deep-dive but, now we are back here in the high level overview of the render phase.
- We learned that the results of the reconciliation process is a second updated Fiber tree, plus basically a list of DOM updates that need to be performed in the next phase.
- So, React still hasn't written anything to the DOM yet but, it has figured out this so-called list of effects, which is the final result of the render phase as it includes the DOM operations that will finally be made in the commit phase.

## Author

- [@bhoamikhona](https://github.com/bhoamikhona)
