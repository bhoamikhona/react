# Section 05: Working With Components, Props, and JSX

**About:** In this section, we are going to explore three core concepts of building React apps, viz components, props, and JSX. We will learn how components are the building blocks of React applications, and how to create and re-use them using the powerful JSX syntax. We are also going to share data between components usings props and learn about rendering lists, conditional rendering, and more, all while building our first beautiful project. Along the way, you will start practicing React on your own by building a developer profile card using these fundamental skills. So, let's get started.

## Table of Content

- [Section 05: Working With Components, Props, and JSX](#section-05-working-with-components-props-and-jsx)
  - [Table of Content](#table-of-content)
  - [Lessons Learned](#lessons-learned)
    - [Rendering The Root Component and Strict Mode](#rendering-the-root-component-and-strict-mode)
    - [Before We Start Coding: Debugging](#before-we-start-coding-debugging)
    - [Components as Building Blocks](#components-as-building-blocks)
    - [Creating and Reusing a Component](#creating-and-reusing-a-component)
  - [Author](#author)

## Lessons Learned

### Rendering The Root Component and Strict Mode

- Root Component
  - `ReactDOM.createRoot()`
    - `createRoot()` lets you create a root to display React components inside a browser DOM node.
  - `root.render()`
    - Call `root.render()` to display a piece of JSX ("React node") into the React root's browser DOM node.
- Strict Mode
  - It is really not a big deal.
  - The only thing that it does is that during development it will render all the components twice in order to find certain bugs.
  - Also, React will check if we are using outdated parts of the React API.
  - So, strict mode is nothing groundbreaking but, it is still a good idea to always activate it when we develop React applications.

### Before We Start Coding: Debugging

- Make sure the app is running.
- Try hard re-loading the browser.
- If the app is running but, it is not updating as you code, stop and re-start the app.
- Keep the chrome developers tool console open all the time when developing.
- Google the errors that appear, check stack overflow.
- Always work with ESLint.
- Check the problems tab and output tab (for prettier and ESLint) in the VS code.

### Components as Building Blocks

- As mentioned few times already, React is all about components, but now, let's formally learn what React components are and why they are so important.
- ![image](https://github.com/user-attachments/assets/e9fd8376-857b-4dbd-a289-6ec3c8e42fe5)
- Components are the most fundamental concept in React, simply because React applications are, in fact, entirely made out of components.
- So when you look at any React app, there is nothing that is not a component or at least not inside of some component.
- Therefore, components are the building blocks of any user interface in React.
- In fact, all React does is to take components and draw them onto a webpage i.e. onto a user interface (UI).
- ![image](https://github.com/user-attachments/assets/e68d504c-7983-48da-a5c4-8035d5f53e6b)
- That sounds simple but it is actually the main job of React.
- In more technical terms, React renders a view for each component, and all these views together make up the user interface.
- So we can also think of a component as being a piece of the user interface.
- One key property of components is that each component has its own data, JavaScript logic, and appearance.
- So basically, each component describes how it works and what it look like - which makes them such a great way of building user interfaces.
- ![image](https://github.com/user-attachments/assets/7e90c2a4-2a0e-41df-a735-668aff0ecaa4)
- Speaking of building user interfaces, based on what we just learned, it makes sense that in React we build complex UIs like the one in the image above, by building multiple components, and then combining these components like Lego pieces.
- In the complex UI (in image above), we can identify components like a video player, a menu, a questions list, and also the part where we can refine the displayed questions.
- Those are like the big components, but we can identify many other smaller components in this UI as well. For example, the filters; and what you can see is that these filters are inside the refine questions component.
- So actually, one thing that we do all the time is to place components inside of other components, or in other words, we nest components inside each other.
- So, nesting components is a key aspect of using components in React along with component reusability.
- Notice how we have three similar questions in the questions list, so, we can create one question component and then re-use it 3 times.
- Of course, the data for each of them is different, but we can easily pass different data into different question components by using something called props, which we are going to talk about later.
- So, whenever we need some duplication in our UI, we create a new component, and we use it as many times as necessary.
- So as you can see, one crucial skill that you might learn throughout this course is how to break a complex design, like the one in the image above, into its components.
- One thist that helps with that and with analyzing the components that we create is a component tree like the one in the image below.
- ![image](https://github.com/user-attachments/assets/ebda16ca-885e-4ad2-bd1b-dcc683e572e9)
- This shows the hierarchy that exists between the components that make up the user interface, and it makes it really easy to understand how all of these components are nested inside each other and really, how they relate to one another.
- We can also clearly see relationships between components, like the refine questions being the parent component of the filters, or the other way around that filters is a child component of refine questions.
- We use these terms, viz parent and child components, all the time in React. So, it is important to understand what they mean.
- So, a component tree like this is perfect to understand these kinds of relationships between components.
- This is all you need to know about components for now.
- We will go really deep into some important concepts like re-usability later, but for now, let's start to put some of these concepts into practice.

### Creating and Reusing a Component

- In React, we write new components using functions.
- There are two important rules when we write components as functions:
  - First, the function name needs to start with an uppercase letter.
  - Second, the function needs to return some markup - usually in the form of JSX but, we can even return nothing by returning `null`.
- Each component can only return exactly one element. So, if you want to return more than one element, wrap those elements inside a `<div>`.

> [!NOTE]
>
> By nesting components, we do not mean we write the component function inside another component function.
>
> NOTE that nesting component function declarations will work but, it is a very bad idea for reasons that we will learn later.
>
> What it actually means is that we call/use one component inside of another.

> [!TIP]
>
> All the assets of the app goes into the public folder.
>
> This is because the Webpack i.e. the module bundler will then automatically get them from there.

- To re-use a component, we simply call/use it several times.

## Author

- [@bhoamikhona](https://github.com/bhoamikhona)
