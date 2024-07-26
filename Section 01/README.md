# Section 01: Introduction

**About:** Before we dive in, let's take a quick overview of how the course is organized and the projects that we are going to build together.

## Table of Content

- [Section 01: Introduction](#section-01-introduction)
  - [Table of Content](#table-of-content)
  - [Course Overview](#course-overview)
    - [Part 01: Fundamentals](#part-01-fundamentals)
    - [Part 02: Intermediate](#part-02-intermediate)
    - [Part 03: Advanced](#part-03-advanced)
    - [Part 04: Professional Dev](#part-04-professional-dev)
    - [Part 05: Next.js](#part-05-nextjs)
  - [Lessons Learned](#lessons-learned)
    - [Building Our First React App](#building-our-first-react-app)
  - [Author](#author)

## Course Overview

- The course is divided into 4 big parts which will take you from knowing nothing about React to a skilled and confident React developer, in no time.

### Part 01: Fundamentals

- In part 01, we are going to build a few small but nice projects to get you up to speed with React fundamentals, such as components, JSX, props, state, and forms.
- It also includes a ton of challenges and exercises to get you coding in React on your own, right off the bat.

### Part 02: Intermediate

- In part 02, we build upon the foundations learned in part 01 to learn intermediate concepts like data fetching, the `useEffect` hook, and custom hooks.
- There is also a special section on how React works behind the scenes which will make you super confident when working with React on your own.

### Part 03: Advanced

- Part 03 is where we really take things to the next level and work on your advanced React skills.
- We are going to deep dive into topics like reducers and performance optimization.
- We will also build our first single page app with React Router and also explore Redux and modern Redux Toolkit.

### Part 04: Professional Dev

- In part 04, we take all we have learned and apply it to the real world as we build two, beautiful, professional applications using industry standard libraries and tools like Redux, Tailwind, React Query, Superbase, and more.

### Part 05: Next.js

- This part is all about taking React to the server and taking advantage of its most cutting-edge features using powerful and super popular Next.js framework.

## Lessons Learned

### Building Our First React App

- [Code Sandbox](https://codesandbox.io/)
- React component - it is essentially a piece of the user interface.
- A component in React is really just a function. These functions i.e. components can return something called JSX, which is a syntax that looks like HTML that will basically describe what we can see on the screen.
- State
  - State is the most fundamental concept of React.
  - Whenever we need something to change in the user interface, we change the state.
  - `useState` hook
    - `useState` is a function in React library which returns an array.
    - Where on the first position of that array we have the value of the state, and the second value is a setter function - a function that we can use to update the piece of state.
  - Whenever the piece of state is updated, the user interface will also be updated.
- Adding JavaScript to JSX
- `useEffect` hook
  - It takes two arguments. First is the function that we want to execute on initial load of the component; and second is the dependency array and we will learn about that later.
  - For now, just make sure you have an empty array as the second argument in the `useEffect` hook.
- In React, we try to divide user interface into multiple components.
- It is a convention in React to capitalize component names.
- props
  - props are basically just like parameters to a function.

## Author

- [@bhoamikhona](https://github.com/bhoamikhona)
