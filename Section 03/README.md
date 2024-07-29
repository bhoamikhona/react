# Section 03: A First Look at React

**About:** In this section we will take a very first look at React. We are going to talk about why we need something like React in the first place, what exactly is React and how it compares to vanilla JavaScript. Then to finish, we are going to discuss different options for setting up a new React application and then use a tool called Create React App to build our very first application. So, let's get started.

## Table of Content

- [Section 03: A First Look at React](#section-03-a-first-look-at-react)
  - [Table of Content](#table-of-content)
  - [Lessons Learned](#lessons-learned)
    - [Why Do Frontend Frameworks Exist?](#why-do-frontend-frameworks-exist)
      - [The Rise of Single Page Applications](#the-rise-of-single-page-applications)
      - [Single-Page Applications With Vanilla JavaScript?](#single-page-applications-with-vanilla-javascript)
      - [Keeping UI In-Sync With Data](#keeping-ui-in-sync-with-data)
      - [Single-Page Applications With Vanilla JavaScript?](#single-page-applications-with-vanilla-javascript-1)
      - [Why do Frontend Frameworks Exist?](#why-do-frontend-frameworks-exist-1)
    - [React vs. Vanilla JavaScript](#react-vs-vanilla-javascript)
    - [What is React?](#what-is-react)
      - [React is Based on Components](#react-is-based-on-components)
      - [React is Declarative](#react-is-declarative)
      - [React is State-Driven](#react-is-state-driven)
      - [React is a JavaScript Library](#react-is-a-javascript-library)
      - [React is Extremely Popular](#react-is-extremely-popular)
      - [React was Created by Facebook](#react-was-created-by-facebook)
      - [Summary](#summary)
    - [Setting Up Our Development Environment](#setting-up-our-development-environment)
  - [Author](#author)

## Lessons Learned

### Why Do Frontend Frameworks Exist?

- Before we start learning about React, let's actually ask ourselves one very important question. Why do frontend frameworks like React actually exist in the first place? Why not simply use Vanilla JavaScript to build our apps?
- Let's answer that question in this lesson and we are going to start at the very beginning by reviewing how website used to be built in the past, how we transitioned to a new way and how that lead to the rise of frontend frameworks.

#### The Rise of Single Page Applications

- ![image](https://github.com/user-attachments/assets/7209fbc9-685b-404c-a603-78dde1a99d0c)
- Back in the day, before around 2010, all websites were always rendered on the server.
- In server-side rendering, a website is basically assembled on the backend i.e. on a web server based on data and templates.
- The resulting HTML, CSS, and JS code is then sent to the client side i.e. to the web browser that requested the page.
- The browser then simply take this code and basically paints it onto the screen.
- A typical example of server-side rendered websites are all websites built with WordPress.
- Now the JavaScript that used to be included in these websites was initially only to add some dynamics to the page, like, simple animations, hover effects, and more things like that.
- And usually a very popular library at the time called jQuery was used for this because it made JS work the exact same way across all browsers back then.
- However, over time, developers started writing more and more JavaScript code to be executed by the browser, until at some point these became fully fledged web applications, which then led to the rise of so-called <ins>single page applications</ins>.
- So these are basically web pages that are rendered on the client, not on the server.
- In client-side rendering, basically the work of rendering a webpage is shifted from the server to the client.
- So now we don't call these webpages anymore but, web applications.
- A web application still needs data, which usually comes from the backend in the form of an API.
- The application consumes this API data and renders a screen for each view of the application.
- These single page applications essentially feel as if you were using a native desktop or phone application.
- So you can click on links or submit forms without the page ever re-loading.
- So, you are technically always on the same page and therefore the name, single page application.
- NOTE: Server side rendering is actually making a comeback right now.
- So, it is slowly getting modern again, driven by frameworks that are built on top of modern client-side rendering frameworks such as Next.js, Remix, etc.
- In either case, we still need to learn how to build single page applications of course, but do we want to do so in with Vanilla JavaScript?

#### Single-Page Applications With Vanilla JavaScript?

- ![image](https://github.com/user-attachments/assets/867141a9-9b53-4d32-8b11-8d2985cb49a8)
- No, we do not want to do that because there are actually several problems with using Vanilla JavaScript to build large scale applications, as we will see in a moment.
- But first, let's establish that building any frontend application is really all about handling data and then displaying that data in a nice user interface.
- That's basically all a web application does, if you think about it.
- So it receives data, changes the data as the user interacts with the app, and it always displays the current data on the screen.
- What this means is that the most important task of a single page app and really of any application and website is to keep the user interface in-sync with the data i.e. to make sure that the UI always displays the current state of the data.
- As it turns out, displaying the correct data and making sure that it stays correct overtime is actually a really hard problem to solve.
- To understand why that is, let's take a look at the Airbnb application.

#### Keeping UI In-Sync With Data

- ![image](https://github.com/user-attachments/assets/0fe780c8-1de4-4042-8f9d-7a7dcde25a69)
- In this interface, we can identify a few pieces of data.
- First, we have a list of apartments, then we have a search bar, and we have some data about the filters that are being applied; and we also have a piece of data on the map which indicates whether the search should be updated as the user moves the map.
- All this is the data that the app depends on.
- In real-world Airbnb app, there is just so much data - this list (above) is not even all of it.
- Anyway, as we know, all of this data needs to be kept in-sync with the user interface, and also with the other pieces of data, because they are all kind of interconnected.
- For example, when we change the data about location or dates, then the UI needs to show those new dates and also the list of apartments needs to be updated.
- Another example, the map needs to show the location of the apartments therefore, when the apartments change, the map must also change.
- The same thing should happen the other way around.
- So, when the map is moved, the list of apartments should change as well; but this should happen only if the user has clicked on check box on the map.
- So, these pieces of data are even more interconnected and it can become a real mess.

> [!NOTE]
>
> In a real world app, we call each of these pieces of data, a piece of state.

- Based on the examples that we see, we would say that without a framework it would be virtually impossible to keep this huge amount of data in-sync with the super complex UI.
- But, you still might be wondering, why? Why would it be so hard to build something like this with vanilla JS?

#### Single-Page Applications With Vanilla JavaScript?

- ![image](https://github.com/user-attachments/assets/54305f68-810c-4991-95ad-aa57b81b2ec9)
- It comes down to two big aspects.
- First, building a complex frontend with vanilla JavaScript alone requires large amounts of direct DOM traversing and manipulation.
- Like in the code you can see in the image above - where we have manual element selection, class toggling, DOM traversing and even manipulation of text and CSS styles.
- This is guaranteed to become an absolute nightmare in a complex app like Airbnb, because our code would be extremely complex and really hard to understand, and we will probably just end up with a huge mess of entangled spaghetti code.
- So this is the first problem.
- The second big problem is that in typical Vanilla JavaScript apps, state such as simple text or numbers are often times simply stored right in the DOM; so, right in the HTML elements themselves, rather than in a central place in the application.
- The result is that we end up with many parts of the app accessing and changing the DOM state directly, which makes the spaghetti code even harder to understand; and even worse, it will most certainly introduce many bugs into our application.
- You could of course try to solve these problems on your own but then, you will just end of creating your own framework, which will most likely be way worse than all the well established frameworks that already exist.
- So at this point, you might as well just use a battle tested framework like React.
- Now that we know why it is so hard to write a single page app with just JavaScript, we can answer the fundamental question that we asked in the beginning: Why do frontend frameworks actually exist?

#### Why do Frontend Frameworks Exist?

- ![image](https://github.com/user-attachments/assets/2daec773-87c6-4507-ba09-ab0c3dceabc0)
- We kind of already answered that question over the course of this lesson.
- So the big fundamental reason why these frameworks exist is because keeping a user interface in-sync with data is really hard, and it is a lot of work too.
- So basically, frameworks like Angular, React, or Vue take this hard work of synchronizing data with the user interface away from us developers.
- So, they solve this really hard problem so that we developers can focus on the data and on building our user interfaces themselves.
- Now, different frameworks have different approaches to doing this, but they are all similar in the fact that they keep UI and data in-sync over time.
- Another extremely valuable thing that frameworks give us, is the fact that they basically enforce a correct way of structuring and writing code.
- So essentially, the authors of each of these frameworks came up with a good way of structuring applications, so that other developers can then follow these conventions as well, to build better applications with hopefully a lot less spaghetti code.
- Finally, frameworks give developers, and especially teams a consistent way of building web applications.
- This way, everyone on the team will build their part of the app in the same style as everyone else, which will in the end, create a more consistent code base and product.
- This is why modern web development is all about JavaScript frameworks.

### React vs. Vanilla JavaScript

- To get a first feeling for how React keeps the user interface in-sync with state, let's quickly compare the advice app that we built in the first section, with a Vanilla JS implementation of the same application.

```javascript
// React
import { useEffect, useState } from "react";

export default function App() {
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);

  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setAdvice(data.slip.advice);
    setCount((c) => c + 1);
  }

  useEffect(function () {
    getAdvice();
  }, []);

  return (
    <div>
      <h1>{advice}</h1>
      <button onClick={getAdvice}>Get advice</button>
      <Message count={count} />
    </div>
  );
}

function Message(props) {
  return (
    <p>
      You have read <strong>{props.count}</strong> pieces of advice
    </p>
  );
}
```

```javascript
// Vanilla JavaScript
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Vanilla JS Advice</title>
  </head>
  <body>
    <h1 class="advice"></h1>
    <button class="btn">Get advice</button>
    <p>You have read <strong class="count"></strong> pieces of advice</p>

    <script>
      // Manually selecting DOM elements (which require a class or ID in markup)
      const adviceEl = document.querySelector(".advice");
      const btnEl = document.querySelector(".btn");
      const countEl = document.querySelector(".count");

      const getAdvice = async function () {
        const res = await fetch("https://api.adviceslip.com/advice");
        const data = await res.json();

        // Updating values
        advice = data.slip.advice;
        count = count + 1;

        // Manually updating DOM elements
        countEl.textContent = count;
        adviceEl.textContent = advice;
      };

      // Setting initial values
      let count = 0;
      let advice;
      getAdvice();

      // Attaching an event listener
      btnEl.addEventListener("click", getAdvice);
    </script>
  </body>
</html>
```

| React                                                                                                                                               | Vanilla JS                                                                                                                                                                                                                                                                     |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| JavaScript is handling everything - even JSX                                                                                                        | HTML is in-charge.                                                                                                                                                                                                                                                             |
| We don't need to manually select any element. Consequently, we don't need to add class names in order to select them.                               | We need to manually select the DOM elements using their classes to keep them updated.                                                                                                                                                                                          |
| We use the `onClick` attribute to get an advice.                                                                                                    | We first need to manually select the button using its class name to attach an event listener to it to trigger the `getAdvice()` function.                                                                                                                                      |
| In the `getAdvice()` function we don't need to update the DOM elements, we simply update the state and it takes care of updating the DOM on itself. | In the `getAdvice()` function, simply updating the vairables `count` and `advice` is not enough. We need to select their respective elements in the DOM and set their `textContent` with `advice` and `count` variables. So, we need to manually update the state and the DOM. |

- This really is a fundamental difference and a fundamental shift in how we build frontend applications.
- You might argue that in this very small example, doing this is not a lot of work, and maybe it might not even be necessary to learn React.
- Of course, we would not need React to build something really small and simply such as our example, but as soon as we get just a little bit bigger than this, it starts getting kind of out of control.
- We would have to select tons of elements and we would really need to create a lot of extra code that, with React, we don't have to. This is because it automatically takes care of keeping the data in-sync with the user interface.
- That's really the main thing that you need to keep in mind from this lesson and from the previous one.
- Feel free to analyze all the differences that exist in the two codes above, because just with those, you can really see the two different philosophies at work.

### What is React?

- Now that we know why we need a JavaScript framework in the first place, let's start by learning about the most popular framework out there - React.
- In this lesson, we will get a high-level overview of what React actually is and how it works.
- It is going to be a full packed but, super interesting lesson. So, let's get started.
- ![image](https://github.com/user-attachments/assets/1acd716d-ea77-4060-b8bb-e0ae58b399c8)
- According to the official React documentation, React is a JavaScript library for building user interfaces.
- That's something but, it really isn't that helpful.
- Let's extend this definition by a bit so that it becomes more helpful.
- ![image](https://github.com/user-attachments/assets/7775e767-5718-4228-bd8d-d8ec6edc95f9)
- This modified definition: "React is an extremely popular, declarative, component-based, state-driven, JavaScript library for building user interfaces, created by Facebook" is a lot more helpful because now, we can deconstruct this definition and learn about what React actually is, step by step.

#### React is Based on Components

- ![image](https://github.com/user-attachments/assets/d4197498-2d38-423b-b601-0aa98e5943a7)
- Starting with component-based design, React is all about components such as buttons, input fields, search bars, etc.
- Components are the building blocks of user interfaces in React.
- In fact, all React does is to take components and draw them on a webpage.
- So, we build complex UIs in React by building multiple components and then combining these components like LEGO pieces.
- For example, to create a complex application like Airbnb.
- ![image](https://github.com/user-attachments/assets/a981ceaf-8b89-4194-8e98-a31baefb9bdf)
- Here we have exactly the same components viz navbar, search bar, results panel, and the map, that we saw earlier, but all combined into a complex UI.
- Another thing that we do with components is to re-use them.
- For example, in the results panel, there are multiple listing that look quite similar.
- So, we can create a listing component and then re-use it 3 times simply by adjusting the data a little bit.

#### React is Declarative

- ![image](https://github.com/user-attachments/assets/dd692fbf-e9bd-4183-8533-5f2a79248c00)
- Since we build complex UIs by combining multiple components, each component must have all the information about what it looks like.
- So, in order to describe what each component looks like and how it works, we use a special declarative syntax called JSX.
- Declarative simply means that we tell React what a component and ultimately the entire UI should look like based on the current state.
- So, React is basically a huge abstraction away from the DOM so that we never have to work with DOM directly as we would with Vanilla JavaScript.
- So, we simply tell React what we want to happen when some data changes, but not how to do it.
- Again, we do that using JSX.
- JSX is basically a syntax that combines parts of HTML, CSS, JavaScript, and it even allows us to reference other React components.
- The declarative nature of React is an essential concept that we will deep dive into later.

#### React is State-Driven

- ![image](https://github.com/user-attachments/assets/ac1ac373-d108-4c26-a700-ed8d4f990066)
- Now you might wonder, if we never touch the DOM, then how does React update the UI?
- That's where the concept of state comes into play.
- Remember that the main goal of React is always keep the UI in-sync with the data.
- From now on, let's actually call that data, state.
- For example, an array of apartments on Airbnb.
- Based on our initial state, React will render a user interface using the components that we wrote using JSX.
- Then based on an event, like a button click, the state might change.
- For example, more data about apartments might be loaded from an API.
- Here comes the interesting part: whenever the state changes, we manually update the state in our app and React will then automatically re-render the user interface to reflect that latest state.
- In other words, React _reacts_ to state changes by re-rendering the UI.
- That is in-fact the whole reason why React is called React in the first place.

#### React is a JavaScript Library

- ![image](https://github.com/user-attachments/assets/9d98956c-e666-4c69-a0c6-962666b6475b)
- There has always been some debate over whether React is actually a framework or just a library.
- The short answer is that React is actually just a library, even though we keep calling it a framework.
- The reason for that is that React itself is really only the so-called <ins>view layer</ins>.
- So, if we wanted to build a complete real-world application, we need to choose multiple external libraries to add to our project.
- For example, for routing or data fetching.
- To address this, there are actually multiple frameworks that have been built on top of React.
- Frameworks that include all these functionalities that React is missing out of the box, and the most popular ones are called Next.js and Remix.
- More about all that, later in the course.

#### React is Extremely Popular

- ![image](https://github.com/user-attachments/assets/4f22a21c-342a-4e81-8b1d-52e3056b6ee9)
- Besides all the great features that we have been talking about, maybe the biggest reason to choose React over all the other frameworks that are similar is because React is extremely popular.
- According to the weekly download numbers from npm, React is by far the most used framework.
- The difference between React and the other ones only seems to be growing.
- So, React really isn't going anywhere.
- A big reason for that is that many large companies have adopted React a long time ago.
- So now, more and more smaller companies all over the world are following in their footsteps.
- This means that all these companies now need React developers for their teams, which of course, has created a huge world wide job market with a high demand for qualified React developers.
- These are not just any jobs. They are usually well-paying jobs.
- Another positive outcome of React's huge popularity is that now, there is a very large and active React developer community, which means that there are always going to be a lot of tutorials, Stack Overflow Q&As, and also, lots of support given to other React develoeprs.
- This is actually one of the strongest benefits of using React right now.
- Also because this huge community has grown a truly gigantic third-party library ecosystem around React.
- So now, you can integrate countless usefull libraries and tools into your own React applications.

#### React was Created by Facebook

- ![image](https://github.com/user-attachments/assets/daee758a-897f-4382-b194-51ec02b220a3)
- React was created by Facebook.
- More specifically, React was created in 2011 by Jordan Walke, an engineer working at Facebook at the time.
- That's why we say that React is backed by Facebook, now known as Meta.
- There, React was first used on the newsfeed and also the chat app.
- From there, it spread out to the entire Facebook and also the Instagram applications.
- Then in 2013, React was open-sourced for everyone to use it and the rest is history.
- React has truly and completely transformed frontend web development, not only by developers that are using React itself, but because many other modern frameworks were created as a response, which really changed the industry forever.

#### Summary

- ![image](https://github.com/user-attachments/assets/79703044-ff68-406b-9c93-6665b1d98b94)
- To summarize, React is really good at two things:
  - First, rendering components on a webpage as a user interface based on their current state.
  - Second, React is really good at keeping the user interface in-sync with state by re-rendering, or in other words, by reacting when the state of one of the component changes.
- And as you will see later, React does all this by employing something called virtual DOM, a Fiber tree, one-way data flow, and many other techniques that we will study throughout this course.
- Now that you have a rough overview of what React actually is, let's setup our development environment so that we can finally start writing some serious code.

### Setting Up Our Development Environment

- [VS Code](https://code.visualstudio.com/) & Configuring it
- [Google Chrome](https://play.google.com/store/apps/details?id=com.android.chrome&hl=en_IN&pli=1)
- [NodeJS](https://nodejs.org/en)
- VS Code Extensions
- VS Code Settings
- Snippets

## Author

- [@bhoamikhona](https://github.com/bhoamikhona)
