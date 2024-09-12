# Section 11: How React Works Behind The Scenes

**About:** This is probably the most challenging section in this course but, also one of the most exciting ones and most rewarding ones. Up until this point we have only focused on how React concepts and features work in practice, but now it is time to understand how things actually work internally - inside React, behind the scenes. This information that you are about to learn will not only make you a much better and more confident React developer, but it will also allow you to ace the most common React interview questions with all the confidence that you need in order to nail that job. This knowledge will actually put you right in the top 5% of all React developers. This section is quite intense, and it should probably be in the advanced part of the course but, since there is so many important things to cover that it was placed here. If at some point it becomes a bit overwhelming or tiring, please just at least go through the last lesson of this section where we will briefly summarize everything we covered. So, that lesson really is a must. Anyway, without further ado, let's dive right in and uncover how React works.

## Table Of Content

- [Section 11: How React Works Behind The Scenes](#section-11-how-react-works-behind-the-scenes)
  - [Table Of Content](#table-of-content)
  - [Lessons Learned](#lessons-learned)
    - [Project Setup and Walkthrough](#project-setup-and-walkthrough)
    - [Components, Instances, and Elements](#components-instances-and-elements)
    - [Instances and Elements in Practice](#instances-and-elements-in-practice)
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

## Author

- [@bhoamikhona](https://github.com/bhoamikhona)
