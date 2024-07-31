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
    - [What is JSX?](#what-is-jsx)
    - [Creating More Components](#creating-more-components)
    - [JavaScript Logic in Components](#javascript-logic-in-components)
    - [Separation of Concerns](#separation-of-concerns)
    - [Styling React Applications](#styling-react-applications)
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

### What is JSX?

- We have written some pieces of JSX in this course already but, what actually is JSX and why is it such a big deal in React?
- ![image](https://github.com/user-attachments/assets/fb26c1b1-e75d-449c-b707-aea7d09f735f)
- When we first talked about components, we talked about how a component contains its own data, logic, and appearance; and that makes sense because if a component is a piece of the user interface, it means that we must be able to describe exactly what that component looks like.
- That's where JSX comes into play.
- JSX is a declarative syntax that we use to describe what components look like and how they work based on their data and logic.
- So, it is all about the component's appearance.
- In practice, this means that each component must return one block of JSX, which React will then use to render the component on the UI.
- Looking at the code (in the image above), this JSX looks a lot like HTML.
- But in fact, JSX is an extension of JavaScript, which allows us to combine parts of HTML, CSS, and JavaScript all into one block of code.
- Basically, we can write HTML and embed some pieces of JavaScript where necessary, for example, to reference some JavaScript variables.
- We can even reference other React components so that we can then combine, nest, and re-use multiple components.
- But now, you might be thinking if React is a JavaScript framework then how will it understand this HTML looking code?
- Remember that JSX is just an extensionof JavaScript, which means that there is a simple way of converting JSX to JavaScript.
- ![image](https://github.com/user-attachments/assets/054bee55-9af4-4d62-9d78-972df0b19c50)
- This is done by a tool called Babel, which was automatically included in our application by Create-React-App.
- The result of this conversion looks something like what is shown in the image above - where each JSX element was converted to `React.createElement()` function call.
- This hopefully looks familiar to you because this is the function that is used in our index.js file and also, we used it in our Pure React lesson in Section 03.
- Anyway, this conversion is necessary because browsers of cource, do not understand JSX. They only understand HTML.
- So behind the scenes, all the JSX that we write is converted into many nested `React.createElement()` function calls.
- These function calls are what in the end, create the HTML elements that we see on the screen.
- What this means is that we could actually use React without JSX at all.
- So, we could just manually write these `createElement()` functions instead of JSX but, that doesn't look like a lot of fun.
- It also makes the code really hard to read and to understand.
- So, everyone just uses JSX.
- Now that we know what JSX is all about, let's go back to the first point where we say that JSX is a declarative syntax.
- What does it actually mean that JSX is declarative?
- ![image](https://github.com/user-attachments/assets/19b3a61b-368d-4f08-abf6-bebd0876afb2)
- Well, before we can understand what declarative means, we first have to review what imperative means.
- When we try to build UIs using vanilla JS, we will by default use an imperative approach.
- This means that we manually select elements, traverse the DOM, and attach event handlers to elements.
- Then each time something happens in the app like a button click, we give the browser step-by-step intstructions on how to mutate those DOM elements until we reach the desired updated UI.
- So in the imperative approach, we basically tell the browser exactly how to do things.
- However, doing this in a complex app is completely unfeasible for all the reasons that we have learned about before.
- And remember that that's the reason why frameworks like React exist in the first place; and it is the reason why React chose to use a declarative approach to building user interfaces.
- A declarative approach is to simply describe what the UI should look like at all times, always based on the current data that is in the component.
- We will soon learn that this data is props and state.
- Again, we use JSX to describe the UI based on props and state.
- All that happens without any DOM manipulation at all.
- So, there are no `querySelector()`, no `addEventListener()`, no `classList`, no `textContent` proeprties anywhere to be seen here.
- This is because of the fact that React is a huge abstraction away from the DOM so that we developers, never have to touch the DOM directly.
- Instead, we think of the UI as a reflection of the current data and let React automatically synchronize the UI with that data.
- In essence, the difference between imperative and declarative is that in the declarative approach, we use JSX to tell React what we want to see on the screen but now how to achieve it step-by-step.
- React can figure that out on its own.
- This has many, many advantages as we will see throughout the course.

### Creating More Components

### JavaScript Logic in Components

### Separation of Concerns

- At this point, we have used JSX to describe the appearance of some components and we have also used some JavaScript inside of them.
- So now that we have a tiny bit of experience in writing components, I want to take a minute and go back to the fact that JSX combines HTML, CSS, and JavaScript into one single block of code.
- This is because you might be wondering, why did React come up with this idea in the first place?
- Why not just keep HTML, CSS, and JS in separate places, like we have always done before?
- This might sound like a trivial question, something you think is not really relevant at all but, it is actually deeply relevant to understand why React was completely designed around components.
- ![image](https://github.com/user-attachments/assets/616626be-170b-4d4e-823d-a56f28c09931)
- Let's understand this topic from the very beginning i.e. from the rise of interactive single page applications (SPA).
- Before single page applications, we always had one file for HTML, one for JS, and one for CSS.
- Basically, one technology per file.
- That was our traditional separation of concerns.
- This is how all of us web developers first learned web development.
- However, as pages got more and more interactive, they became single page applications, where the JavaScript started to determine the user interface and the content in general.
- In other words, JavaScript became more and more in-charge of the HTML.
- We can see that in the small code example (in the image above), where the content and the presentation of these HTML elements are really completely determined by the JavaScript code.
- They are in-fact tightly coupled together.
- So the HTML doesn't even make sense without the JS there.
- The details of this code are really not important. So, if you cannot read this code, that's no problem at all.
- The point is that if the JS is in-charge of HTML anyway, so if the logic and the UI are so tightly coupled together, then why should we keep them separated in these different files and in different code blocks?
- The answer to that question is what gave us React components and JSX.
- ![image](https://github.com/user-attachments/assets/31822874-1c6c-4cac-9ae9-8455691e745d)
- So, the fact that logic and UI are so tightly coupled together in modern web apps, is really the reason why a React component contains the data, the logic, and the appearance of one piece of the UI.
- In fact, it is the fundamental reason why React is all about components.
- The same is also true for most other modern frontend frameworks.
- Returning to the coding example in the image above, in this React example, we can see how JavaScript and HTML live happily together in this one single component.
- So, this component has some JavaScript logic, it has JSX and then inside that JSX, there is yet another block of JavaScript, which in turn has even more JSX inside of it.
- So, everything is mixed together but, it all still works really well.
- The content and logic are tightly coupled together and so it makes sense that they are <ins>co-located</ins> here.
- <ins>co-located</ins> simply means that things that change together should be located as close as possible, together.
- In the case of React apps, this means that instead of one technology per file, we have one component per file.
- So, one component that contains data, logic, and appearance - all mixed together.
- When React and JSX first came out a long time ago, many people just hated the way that JSX looks like.
- They hated that we are throwing separation of concerns out of the window.
- But actually, are we really? Is there really no separation of concerns in React?
- ![image](https://github.com/user-attachments/assets/a1b8e59e-2a80-42e1-8917-6a3e8980ed74)
- People who say that React has no separation of concerns, got it all wrong.
- This is because React does have separation of concerns.
- It is just not one technology per file, as we had traditionally. Instead, it is one component per file.
- So, each component is in fact, only concerned with one piece of the UI.
- Then, within each of these components, of course we still have the three concerns of HTML, CSS, and JS all mixed up, as we have been discussing.
- So compared to the traditional separation of concerns, this is a completely new paradigm that many people were really not used to in the beginning.
- But now, many years later, we all got used to it and it works just great.
- So, having all the information about a certain component in one single place, really does work in an amazing way.
- So in conclusion, React does have separation of concerns, just a different separation of concerns.

### Styling React Applications

- Inline CSS using the `style` attribute
  - All of the CSS properties are camel cased.
- External CSS File
  - Importing an external CSS File.
  - In JSX, we cannot use the `class` attribute that we use in HTML. This is because in JavaScript the keyword `class` is reserved for classes for OOP paradigm. Instead, we use `className` when we want to appoint a CSS class to a JSX element.

> [!NOTE]
>
> The styles that we import from an external CSS file are global styles. So, they are not scoped to each particular component.
>
> This works fine for for small apps, but we will also use something called styled components later, in another project. Then we will have CSS that really only belongs to one single component.

## Author

- [@bhoamikhona](https://github.com/bhoamikhona)
