# Section 12: Effects and Data Fetching

**About:** Probably 95% of all React apps out there fetch some kind of data from some API, making data fetching an essential skill when building web applications. One way of fetching data in a React app is inside an effect and so, that's what this section is all about. In this section, we will continue working on the usePopcorn project as we learn all about side effects. So, we are going to focus on the `useEffect` hook, how and when effects are executed, and how we can clean effects up. Also, loading external data into our application finally makes them feel a lot more real world and alive. So, let's get started.

## Table of Content

- [Section 12: Effects and Data Fetching](#section-12-effects-and-data-fetching)
  - [Table of Content](#table-of-content)
  - [Lessons Learned](#lessons-learned)
    - [The Component Lifecycle](#the-component-lifecycle)
    - [How NOT to Fetch Data in React](#how-not-to-fetch-data-in-react)
    - [useEffect to the Rescue](#useeffect-to-the-rescue)
  - [Author](#author)

## Lessons Learned

### The Component Lifecycle

- In this section, we are finally going to come back to our usePopcorn project.
- However, before we go any further, we just need to look at one more lesson here, where we will quickly learn about the lifecycle of components, because this is going to be highly relevant for the rest of the section.
- Actually, we should say that we are going to learn about the lifecycle of a component instance, because it is only an actual physical instance of a component that can go through a lifecycle.
- But, as mentioned earlier, it is common for people to use component instead of component instance so, that's what we are going to do here as well.
- Anyway, what does a component lifecycle actually mean?
- ![image](https://github.com/user-attachments/assets/aebc957d-808e-4960-8acf-262e6a377011)
- Well, the lifecycle of a component basically encompasses the different phases that a specific component instance can go through over time.
- The first phase in any component's lifecycle is that a component instance is <ins>mounted</ins> which is also called <ins>initial render</ins>.
- So, this is when the component is rendered for the very first time, based on everything that we have learned in the previous section.
- This is also when fresh state and props are created for the component instance.
- Therefore, we can use the analogy that the component is born in this phase.
- Now, once the component has been rendered and is on the screen, it can be re-rendered an unlimited number of times.
- Now, as we learned in the previous section, a React application is re-rendered, whenever there is a state update.
- However, back then, we were talking about the entire application, not about one specific component instance.
- So, in practical terms, a component will also be re-rendered when the props that it receives change, when its parent component re-renders, or when something called <ins>context</ins> changes.
- More about context later.
- Now, the re-render phase is actually optional, so it doesn't always happen in all components.
- So, some components are only mounted and then unmounted right away, which actually brings us to the next phase.
- Finally, there comes a point in time, where a component instance is no longer needed.
- So, that's when the component is unmounted. So, according to our analogy, this is when the component basically dies.
- In this step, the component instance is completely destroyed and removed from the screen along with its state and props.
- We have already seen this happening many times in the applications that we have been building.
- So, this can happen when users navigate to a new section or a new page of the app or when they close the app all together.
- Now, of course, a new instance of the same component can be mounted later, but this specific instance is now gone. So, it has been unmounted.
- And that's actually it.
- So, it is pretty straightforward, especially after the deep dive from the last section.
- So, why was it even worth learning about this now?
- Well, it is important to know about the component lifecycle, because we can hook into different phases of this lifecycle.
- So, we can basically define code to be executed at these specific points in time, which can be extremely useful.
- And we do so by using the `useEffect` hook, which is the big topic of this section.

### How NOT to Fetch Data in React

- When we fetch data from the API and set the `movies` state when we fetch the data:

```javascript
fetch(URL)
  .then((res) => res.json())
  .then((data) => setMovies(data.Search));
```

- Then if we look into our Network tab in the chrome developer tools, we will notice that it is fetching data on repeat from the API. Even though on surface i.e. on our UI, everything seems to be working the way we want.
- Why is that?
- The reason is that setting the state in the render logic will then immediately cause the component to re-render itself again.
- That's just how state works.
- However, as the component is re-rendered, the function is executed again which will fetch from the API again, which will set the state again.
- So, this really is an infinite loop of state setting and then the component re-rendering.
- This is the reason why it is really not allowed to set state in render logic.
- We can even notice that if we try to set the state on the top level code of the component function:

```javascript
export default function App() {
  const [watched, setWatched] = useState([]);

  setWatched([]);

  return <div>App</div>;
}
```

- This actually gives us an error of too many re-renders because we are setting the state of `watched` on the top level code even without being inside a `then()` handler then immediately React will complain that there are too many renders, which means that we again entered that infinite loop where updating state will cause a component to re-render, which will cause the state to be set and so on to infinity.
- So, we can simply get rid of that and get back to where our app was working.
- However, we do actually want to set the state of `movies` in the `then()` handler, but without having all the problems that we just saw.
- So, how can we do that? Well, that's where we need the `useEffect` hook which we will learn about in the next lesson.

### useEffect to the Rescue

- The idea of the `useEffect` hook is to give us a place where we can safely write side effects like the one we discussed in the previous lesson.
- But, the side effects registered with the `useEffect` hook will only be executed after certain renders.
- For example, only right after the initial render, which is exactly what we are looking for in our app.
- The `useEffect` doesn't return anything so, we don't store the result into a variable but instead, we pass in a function.
- This function is then called our effect, and it contains the code that we want to run as a side effect.
- The second argument that the `useEffect` hook takes is a dependancy array.
- This dependancy array is actually the most confusing part of this hook, and we will learn all about it throughout this section.
- For now, we can just pass in an empty array - which means that the effect that we just specified in the function argument will only run on mount.
- So, the function in the `useEffect` will only run when the App component renders for the very first time.
- Now if we check our Network tab in chrome developer tools, we will notice that we have no more infinite loops and no more infinite requests to the API.
- So, the problem that we created in the previous lesson has indeed been fixed.
- Now our effect is only running as the component mounts.

```javascript
import React, { useState, useEffect } from "react";

export default function App() {
  const [movies, setMovies] = useState([]);

  useEffect(function () {
    fetch(
      `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=interstellar`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.Search));
  }, []);

  return <div>App</div>;
}
```

## Author

- [@bhoamikhona](https://github.com/bhoamikhona)
