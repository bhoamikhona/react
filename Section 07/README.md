# Section 07: Thinking in React - State Management

**About:** In this section, we will start looking at a core skill that every React developer needs to develop right from the beginning, and that core skill is to think in React. Thinking in React encompasses many different aspects, but in this section we will focus on state management. You will learn when and where to create state variables, when and how to derive state, and also how to communicate between child and parent components by lifting state up; and also how to communicate between child and parent components by lifting state up. All these new skills will be needed as we keep building our travel list application.

## Table of Content

- [Section 07: Thinking in React - State Management](#section-07-thinking-in-react---state-management)
  - [Table of Content](#table-of-content)
  - [Lessons Learned](#lessons-learned)
    - [What is "Thinking in React"?](#what-is-thinking-in-react)
  - [Author](#author)

## Lessons Learned

### What is "Thinking in React"?

- Let's start this section by discovering what thinking in React is all about.
- ![image](https://github.com/user-attachments/assets/5c9e91ac-2ef3-4e15-8efe-3c5f9aa59181)
- As you might have noticed by now, building React applications requires a completely new mindset because it is just very different from building applications with Vanilla JavaScript.
- So to build React apps, you not only need to learn how to work with the React API in practice like with all the different functions like `useState` but you also need to be able to think in React.
- So you need to basically enter the React mindset.
- Once you have both of these skills, you will have mastered React and you will be well on your way to building professional React application.
- What does thinking in React actually mean?
- Well, while you are building an application, thinking in React means that you have a very good mental model of how and when to use all the React tools like components, state, props, general data flow, effects, and many more.
- It is also about always thinking in terms of state transitions rather than in element mutations as we have learned before.
- You can also view thinking in React as a whole process which can help us build apps in a more structured way.
- ![image](https://github.com/user-attachments/assets/15693f8c-2acc-43b0-a2b6-162d54b0373c)
- The first step in this process is to break the desired UI into components and establish how these components are related to one another i.e. to establish the component tree.
- This also includes thinking about re-usability and composability of components.
- After that, we can start by building a static version of the application i.e. without any state and interactivity, and this is great because by doing this, we do most of the coding upfront before having to worry about state and interactivity - that part comes next.
- So, step 3 is where we think about state. Here we decide:
  - When we need state
  - What types of state we need
  - Where to place each piece of state
- Finally, we think about establishing how data flows through the application.
- This includes thinking about one-way data flow, child-to-parent communication, and the way global state should be accessed.
- So, these points viz 3 and 4 is what we collectively call state management, which is the main focus of this section.
- Of course, this is not a rigid process that we always need to follow to the letter.
- In practice, there is always a lot of back and forth between these steps and things are never this linear, but it is still good to have a process like this as an overall guideline.
- Once you really know how to think in React, you will be able to answer questions like:
  - How to break up the UI design into components?
  - How to make some of the components truly re-usable?
  - How to assemble a user interface from re-usable components?
- We also think a lot about state:
  - What pieces of state do we need for interactivity that we want?
  - Where to place each of these states? OR What components should "own" each piece of state?
  - What types of state can or should we use?
- In more general terms:
  - How to make our data flow through the application?
- As you might have noticed, we already started to talk about some of these topics before but, it is good to have one section where we can really focus on some of these skills so that we can start getting more and more into the React mindset.
- Of course, you will only really master these skills through practice and writing code, and luckily we will do lots of that in this course.
- But we will also take a bit of a theoretical approach from time-to-time, just like this lesson because that is still really very important as well, besides the React API itself.

## Author

- [@bhoamikhona](https://github.com/bhoamikhona)
