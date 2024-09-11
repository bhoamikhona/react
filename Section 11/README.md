# Section 11: How React Works Behind The Scenes

**About:** This is probably the most challenging section in this course but, also one of the most exciting ones and most rewarding ones. Up until this point we have only focused on how React concepts and features work in practice, but now it is time to understand how things actually work internally - inside React, behind the scenes. This information that you are about to learn will not only make you a much better and more confident React developer, but it will also allow you to ace the most common React interview questions with all the confidence that you need in order to nail that job. This knowledge will actually put you right in the top 5% of all React developers. This section is quite intense, and it should probably be in the advanced part of the course but, since there is so many important things to cover that it was placed here. If at some point it becomes a bit overwhelming or tiring, please just at least go through the last lesson of this section where we will briefly summarize everything we covered. So, that lesson really is a must. Anyway, without further ado, let's dive right in and uncover how React works.

## Table Of Content

- [Section 11: How React Works Behind The Scenes](#section-11-how-react-works-behind-the-scenes)
  - [Table Of Content](#table-of-content)
  - [Lessons Learned](#lessons-learned)
    - [Project Setup and Walkthrough](#project-setup-and-walkthrough)
    - [Components, Instances, and Elements](#components-instances-and-elements)
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

## Author

- [@bhoamikhona](https://github.com/bhoamikhona)
