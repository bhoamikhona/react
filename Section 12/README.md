# Section 12: Effects and Data Fetching

**About:** Probably 95% of all React apps out there fetch some kind of data from some API, making data fetching an essential skill when building web applications. One way of fetching data in a React app is inside an effect and so, that's what this section is all about. In this section, we will continue working on the usePopcorn project as we learn all about side effects. So, we are going to focus on the `useEffect` hook, how and when effects are executed, and how we can clean effects up. Also, loading external data into our application finally makes them feel a lot more real world and alive. So, let's get started.

## Table of Content

- [Section 12: Effects and Data Fetching](#section-12-effects-and-data-fetching)
  - [Table of Content](#table-of-content)
  - [Lessons Learned](#lessons-learned)
    - [The Component Lifecycle](#the-component-lifecycle)
    - [How NOT to Fetch Data in React](#how-not-to-fetch-data-in-react)
    - [useEffect to the Rescue](#useeffect-to-the-rescue)
    - [A First Look at Effects](#a-first-look-at-effects)
    - [Using an async Function](#using-an-async-function)
    - [Adding a Loading State](#adding-a-loading-state)
    - [Handling Errors](#handling-errors)
    - [The useEffect Dependency Array](#the-useeffect-dependency-array)
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

### A First Look at Effects

- We just used the `useEffect` hook for the very first time in order to fetch movie data as the component mounts.
- But, what actually is an effect and how is it different from an event handler function?
- Well, let's find out in this lesson.
- Just so we are all on the same page, let's start by reviewing what a side effect is.
- ![image](https://github.com/user-attachments/assets/8f30cd2f-87cb-476d-9052-3f53212c975a)
- Basically in React, a side effect is any interaction between a React component and the world outside that component.
- We can think of a side effect as some code that actually makes something useful happen. For example, fetching data from some API.
- So, what this means is that we actually need side effects all the time when we build React apps.
- Now we already know that side effects should not happen during a component render, or in other words, side effects should not be in render logic.
- Instead, we can create side effects in two different places in React.
- First one is inside event handlers.
- Remember that event handlers are simply functions that are triggered whenever the event that they are listening to happens.
- However, simply reacting to events is sometimes not enough for what an application needs.
- Instead, in some situations, we need to write some code that will be executed automatically as the component renders.
- So, this is when we can create a so-called effect by using the `useEffect` hook.
- So, by creating an effect we can basically write code that will run at different moments of a component instance's life-cycle. So, when the component mounts, when it re-renders, or even when it unmounts.
- And this is really great because it opens up a whole new door of possibilities.
- Let's now get just a bit deeper into how effects work by comparing event handlers to effects created with `useEffect` hook; and let's get back to the example of fetching movie data that we have been using.
- ![image](https://github.com/user-attachments/assets/05e6b5af-ebe5-463b-b364-ac13690d8a2f)
- Fetching movie data is very clearly a side effect because it is clearly an interaction with the world outside the component.
- There are two possibilities of when we might want to create this side effect.
- The first possibility is that we might want to fetch movie data only when a certain event happens.
- In that case, we will of course just use an event handler function, just like we have been doing up until this point.
  - I mean, we haven't been using event handlers for fetching data but, we have used them for other things.
- The other possibility of when to fetch the data would be to do so immediately after the component mounts i.e. right after it is first rendered.
- So, this is exactly what we did in the previous lesson when we first used the `useEffect` hook to specify an effect that was executed right after the component was painted to the screen.
- So, we can say that these two pieces of code produce the exact same result.
- They both fetch data about a movie but, they do so at different moments in time.
- The event handler executes when an event happens and the `useEffect` executes whenever the component first renders, at least in this situation because the exact moment at which the effect is executed actually depends on its dependency array which we mentioned shortly in the previous lesson.
- So, we can basically use this dependency array to tell the effect to also run after a component re-renders.
- But, we won't go deep into it right now since it is easier to explain with code.
- But, speaking of dependency array, this array is just one of three parts that any effect can have.
- So, besides the dependency array we have of course, the effect code itself and also each effect can return a so-called <ins>cleanup function</ins>, which is a function that will be called before the component re-renders or unmounts.
- Now, thinking about different moments of the component lifecycle viz mounting, re-rendering, and unmounting, can be helpful to understand how effects work.
- However, we should actually not think about life cycles, but about synchronization.
- So, the real reason why effects exist is not to run code at different points of lifecycle, but to keep a component synchronized with some external system.
- So in this example, that would be keep the component in-sync with the movie data that comes from some external API.
- If that sounds confusing, keep in mind that this just a first introduction to effects.
- We will come back to all this after having used the `useEffect` hook a bit more in practice.
- Anyway, to finish our comparison, as we just learned, we use effects to keep a component in-sync with the external world.
- While on the other hand, we use event handlers to react to a certain event that happened in the user interface.
- Now, what's very important to note here is that event handlers are always the preferred way of creating side effects.
- So, whenever possible we should not overuse the `useEffect` hook.
- So, everything that can be handled inside event handlers should be handled there.

### Using an async Function

- Let's now convert our effect to an `async` function instead of the basic promise handling that we are doing right now.

```javascript
// Entire code at ./usepopcorn/src/App.jsx

// Basic promise handling
useEffect(function () {
  fetch(
    `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=interstellar`
  )
    .then((res) => res.json())
    .then((data) => setMovies(data.Search));
}, []);
```

- So, many times when we need a lot of code to handle a promise, it is a lot easier and nicer to just have an `async` function.
- So, we might think that all we need to do is to place the `async` keyword before the `function` keyword in the `useEffect` and then use `await` inside of it, like so:

```javascript
// Entire code at ./usepopcorn/src/App.jsx

useEffect(async function () {
  fetch(
    `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=interstellar`
  )
    .then((res) => res.json())
    .then((data) => setMovies(data.Search));
}, []);
```

- However, we immediately get a warning from ESLint which tells us that effect callbacks are synchronous to prevent race conditions.
- Basically, the effect function that we place into `useEffect` cannot return a promise, which is what an async function does.
- So, instead of doing it directly, like we did above, we can just create a new function and place the async function inside of it, like so:

```javascript
// Entire code at ./usepopcorn/src/App.jsx

useEffect(function () {
  async function fetchMovies() {
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=interstellar`
    );

    const data = await res.json();
    setMovies(data.Search);
  }
}, []);
```

- But now, of course, nothing is happening because nowhere are we call the `fetchMovies()` function.
- So, our effect's function is the one that is wrapping the `fetchMovies()` function above, but all that the effect function is doing is to define another fucntion viz `fetchMovies()`.
- So, to make it work, we will just call it and it will be back to working.

```javascript
// Entire code at ./usepopcorn/src/App.jsx

useEffect(function () {
  async function fetchMovies() {
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=interstellar`
    );

    const data = await res.json();
    setMovies(data.Search);
  }

  fetchMovies();
}, []);
```

- Now instead of hard coding "interstellar" in the URL from which we fetch movies, let's extract it into another variable, which we can call `query`.
  - This is just temporary.

```javascript
// Entire code at ./usepopcorn/src/App.jsx

const query = "interstellar";

useEffect(function () {
  async function fetchMovies() {
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`
    );

    const data = await res.json();
    setMovies(data.Search);
  }

  fetchMovies();
}, []);
```

- Now we want to log all the movies that we get from the API onto the console, just so we can see something.

```javascript
// Entire code at ./usepopcorn/src/App.jsx

const [movies, setMovies] = useState([]);
const query = "interstellar";

useEffect(function () {
  async function fetchMovies() {
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`
    );

    const data = await res.json();
    setMovies(data.Search);

    // logging movies onto console
    console.log(movies);
  }

  fetchMovies();
}, []);
```

- Do you think that logging movies like that is going to work?
- Let's reload to actually see the true result, which is an empty array.
- So, why is this happening?
- Well, hopefully you learned in the previous section that setting state is asynchronous.
- In other words, after the state has been set in `setMovies(data.Search)` line of code, or actually, after we instructed React to set the state, that doesn't mean that it happens immediately.
- Instead, it will happen after the `setMovies()` function has been called.
- So, in the very next line of code i.e. `console.log(movies)` we have stale state which basically means that we still have the old value of the state which was before we set its new value.
- And in this case, before, it was just an empty array i.e. the initial state of `movies` is set to an empty array.
- So, in `fetchMovies()` function, instead of loggin `movies`, we can log `data.Search` instead.

```javascript
// Entire code at ./usepopcorn/src/App.jsx

const [movies, setMovies] = useState([]);
const query = "interstellar";

useEffect(function () {
  async function fetchMovies() {
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`
    );

    const data = await res.json();
    setMovies(data.Search);

    // logging data.Search onto console
    console.log(data.Search);
  }

  fetchMovies();
}, []);
```

- Now let's talk about the fact that when we log `console.log(data.Search)` into the console, we get 2 outputs. Basically, why we have two requests happening.
- Well, the reason for that is React's strict mode.
- When strict mode is activated in React 18, our effects will not run only once, by actually twice.
- So, React will call our effects twice but, only in development.
- So, when our application is in production, this will no longer be happening.
- This is just so that React can identify if there are ny problems with our effects.
- So, we remove the strict mode from our index.js file and reload the webpage, then you can see that we only get one output in the console.
- This means that there was only one HTTP request.
- So, the effect was only called once indeed.
- But, keep the strict mode on because, it is somehow safer that way.

### Adding a Loading State

- Let's now add a very simple loading indicator to our application.
- Basically, whenever the movie data is still being loaded in the background we want to instead display some kind of loading indicator.
- In order to do that, we need some more state i.e. a state variable which baiscally tells our UI that the data is still being loaded.
- Then, as soon as the data has been loaded, we want to display the data and not the loading indicator anymore.
- Anyway, let's simply create that state variable and usually it is called `isLoading`.

```javascript
const [isLoading, setIsLoading] = useState(false);
```

- In our async `fetchMovies()` function, set `isLoading` to `true`.
- This will then indicate to our UI that information is still loading so that it can render the loading indicator.

```javascript
// Entire code at ./usepopcorn/src/App.jsx

const [movies, setMovies] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const query = "interstellar";

useEffect(function () {
  async function fetchMovies() {
    // set `isLoading` to true
    setIsLoading(true);
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`
    );

    const data = await res.json();
    setMovies(data.Search);
    console.log(data.Search);
  }
  fetchMovies();
}, []);
```

- Then, when all of the loading is done, we can then set the `isLoading` state back to `false`.

```javascript
// Entire code at ./usepopcorn/src/App.jsx

const [movies, setMovies] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const query = "interstellar";

useEffect(function () {
  async function fetchMovies() {
    // set `isLoading` to true
    setIsLoading(true);
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`
    );

    const data = await res.json();
    setMovies(data.Search);

    // set `isLoading` to false
    setIsLoading(false);
  }
  fetchMovies();
}, []);
```

- Now, we can use the ternary operator in JSX to conditionally render the loading indicator or the list of movies.

```javascript
// Entire code at ./usepopcorn/src/App.jsx

// Loader
function Loader() {
  return <p className="loader">Loading...</p>;
}

// JSX part
<Box>{isLoading ? <Loader /> : <MovieList movies={movies} />}</Box>;
```

- Now if you reload the webpage, you will see it working.
- With this, this whole behavior is a bit more natural and also a bit more real world because in all real applications you always have some indication to the user that some data is being fetched.

### Handling Errors

- Whenever we are doing any data fetching in any web application and dealing with asynchronous data, we always need to assume that something can go wrong.
- Therefore, let's now account for that situation by handling those errors.
- One of the things that can go wrong is your users suddenly losing their internet connection.
- We can simulate that using the network tab in the chrome developer tools.
- First make sure that we are on slow 3G. Then, when the movies are loading, switch it to offline.
- So right now, you can see that our application basically never leaves the state of `isLoading`.
- Also, when we see our console, we get an error that says "Failed to fetch", which, again, is because our user basically lost their internet connection.
- So, when that happens, we want to display some kind of error message on the screen and not keep the application in the loading state forever.
- This is because, if we let our app be in the loading state forever, the user will think that the data will eventually arrive, but of course it won't with no internet conenction.
- Now, reacting to errors like this is actually not built into the `fetch()` function itself. So, we have to take care of that manually.
- So, let's try that in our `fetchMovies()` function.
- On the response object that we reiceve from `fetch()` exists a property called `ok` - we can check for that.
- So basically, if the response is not `ok` then we want to throw a new error.
  - NOTE: This is pretty standard JS code.

```javascript
// Entire code at ./usepopcorn/src/App.jsx

const [movies, setMovies] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const query = "interstellar";

useEffect(function () {
  async function fetchMovies() {
    setIsLoading(true);
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`
    );

    // Checking for `ok` and if it is not `ok` then throw new error.
    if (!res.ok) throw new Error("Something went wrong with fetching movies");

    const data = await res.json();
    setMovies(data.Search);
    setIsLoading(false);
  }
  fetchMovies();
}, []);
```

- So now if we are throwing an error here, we need to wrap all of our code in a try catch block.

```javascript
// Entire code at ./usepopcorn/src/App.jsx

const [movies, setMovies] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const query = "interstellar";

useEffect(function () {
  async function fetchMovies() {
    try {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`
      );

      if (!res.ok) throw new Error("Something went wrong with fetching movies");

      const data = await res.json();
      setMovies(data.Search);
      setIsLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  }
  fetchMovies();
}, []);
```

- Now if we want to display the error message onto the UI, we need to store that message in a state variable.
- So, let's create another piece of state that indicates if we currently have an error or not.

```javascript
// Entire code at ./usepopcorn/src/App.jsx

const [movies, setMovies] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState("");
const query = "interstellar";

useEffect(function () {
  async function fetchMovies() {
    try {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`
      );

      if (!res.ok) throw new Error("Something went wrong with fetching movies");

      const data = await res.json();
      setMovies(data.Search);
      setIsLoading(false);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  }
  fetchMovies();
}, []);
```

- Now we can do some conditional rendering to show the error on our UI.

> [!NOTE]
>
> On the UI we get the message "Failed to Fetch" instead of "Something went wrong with fetching movies" why is that?
>
> This is because error is happened in await `` fetch(`http://www.omdbapi.com/?s=${query}&apikey=${KEY}`) `` so, `res` cannot be established. We could add catch method after it like this:
> `` const res = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${KEY}`).catch(()=> {throw new Error("this is where error happened");}) ``
> And you could get the right messgae "this is where error happened".

```javascript
// Entire code at ./usepopcorn/src/App.jsx

// Error Message Component
function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔</span> {message}
    </p>
  );
}

// JSX part
<Box>
  {isLoading && <Loader />}
  {!isLoading && !error && <MovieList movies={movies} />}
  {error && <ErrorMessage message={error} />}
</Box>;
```

- Here the situation is indeed a bit tricky with all the 3 different state we have and with all the conditional rendering, but they are now 3 mutually exclusive conditions.
- However, there is still a problem, because as soon as the new error is thrown, the rest of the code is not evaluated in the `try` block so, the `isLoading` state is never set to `false`.
- To remedy that, we can use the `finally` block and set the `isLoading` state to `false` there.

```javascript
// Entire code at ./usepopcorn/src/App.jsx

const [movies, setMovies] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState("");
const query = "interstellar";

useEffect(function () {
  async function fetchMovies() {
    try {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`
      );

      if (!res.ok) throw new Error("Something went wrong with fetching movies");

      const data = await res.json();
      setMovies(data.Search);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  fetchMovies();
}, []);
```

- Now let's handle another kind of error which is not really an error but, a situation in which we would want to display a message.
- The situation being that we cannot find any movie for the search query.
- Let's say that the movie search query is "ka92an" - of course the API will not find anything.
- Before we handle that, if we just check the result of "ka92an" we get "Cannot read properties of undefined" as an error from React.

```javascript
// Entire code at ./usepopcorn/src/App.jsx

const [movies, setMovies] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState("");
const query = "ka92an";

useEffect(function () {
  async function fetchMovies() {
    try {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`
      );

      if (!res.ok) throw new Error("Something went wrong with fetching movies");

      const data = await res.json();
      setMovies(data.Search);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  fetchMovies();
}, []);
```

- So, the problem is that the data that comes back from the API now is apparently `undefined`.
- We can take a look at that by logging it to the console.

```javascript
// Entire code at ./usepopcorn/src/App.jsx

const [movies, setMovies] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState("");
const query = "ka92an";

useEffect(function () {
  async function fetchMovies() {
    try {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`
      );

      if (!res.ok) throw new Error("Something went wrong with fetching movies");

      const data = await res.json();
      setMovies(data.Search);
      console.log(data);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  fetchMovies();
}, []);
```

- This is what we get as an output:

```javascript
// output
{Response: 'False', Error: 'Movie not found!'}
```

- Indeed, we no longer have the `Search` property in the returning object from the API.
- So, what's happening then is that `data.Search` is being set to `undefined`.
- Therefore, we get the error mentioned above.
- So, as mentioned in the beginning, we always need to handle all these situations that can go wrong; and when working with data fetching there's always a lot of things that can go wrong.
- So, working with data is a lot of work but, it is also essential in most if not all web applications.
- Anyway, here we can now use the response `{Response: 'False', Error: 'Movie not found!'}` to our advantage, in order to throw another error in this situation.
- So, we can check is `data.Response === "False"` then throw a new error.

```javascript
// Entire code at ./usepopcorn/src/App.jsx

const [movies, setMovies] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState("");
const query = "ka92an";

useEffect(function () {
  async function fetchMovies() {
    try {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`
      );

      if (!res.ok) throw new Error("Something went wrong with fetching movies");

      const data = await res.json();

      if (data.Response === "False") throw new Error("Movie not found");

      setMovies(data.Search);
      console.log(data);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  fetchMovies();
}, []);
```

- Now it is working as expected.
- Recap:
- What we did was to implement another state variable, this time, specific for the error.
- So, whenever some error occured we could store the error message in that variable and display it in the UI as soon as an error occured.
- Now, as soon as the the error did occur, we threw a new error in the `try` block and caught it in the `catch` block - which is the standard way of catching errors in JS.
- In this situation, we then set the error state to the message of the error that we specified when throwing new error.
- Finally, we use the `error` state variable in order to render something on the screen conditionally.
- That's it for now, for error handling.
- It is a very important part that many people overlook but, it is essential to deal with these kinds of situations.

### The useEffect Dependency Array

- We have mentioned the `useEffect` dependency array a few times already, but we don't know yet what it actually does and how it works.
- So, let's change that in this lesson.
- ![image](https://github.com/user-attachments/assets/5af2e1f1-a54b-4cef-8285-29dc4e94482b)
- As we saw in the beginning of this section, by default, an effect will run after each and every render.
- However, that's almost never what we want.
- But, the good news is that we can change this default behavior by passing a dependency array into the `useEffect` hook as a second argument, but why does `useEffect` actually need an array of dependencies?
- The reason is that without the dependency array, React doesn't know when to actually run the effect.
- But, if we do specify the effect dependencies by passing in the dependency array, the effect will be executed each time that one of the dependencies changes.
- We will come back to why this is so amazing in a few moments.
- For now, this is all you need to know.
- Now, what exactly are those dependencies?
- Well, effect dependencies are state variables and props that are used inside the effect.
- The rule is that each and every one of those variables and props must be included in the dependency array.
- But, let's take a look at an example to understand what we are talking about.

```javascript
const title = props.movie.Title;
const [userRating, setUserRating] = useState("");

useEffect(
  function () {
    if (!title) return;
    document.title = `${title} ${userRating && `(Rated ${userRating} 🌟)`}`;

    return () => (document.title = "usePopcorn");
  },
  [title, userRating]
);
```

- The code is really not important.
- What matters is that the effect uses the `title` prop and the `userRating` state.
- We can clearly see at the top of the code that `title` is indeed a prop and that `userRating` is indeed a piece of state.
- Therefore, both of them must be included in the dependency array.
- So, the effect function depends on these variables to do its work, and therefore, we need to tell React about them.
- Otherwise, if the `title` or the `userRating` changes, React will not know about this change, and therefore, it won't be able to re-execute the effect code.
- This will then lead to a bug called <ins>stale closure</ins>.
- We will talk about what a stale closure is and also about some more rules for dependency array in a later, more advanced section.
- For now, let's actually understand why the dependency array is so important for the `useEffect` hook.
- ![image](https://github.com/user-attachments/assets/6349df15-feaa-4495-939c-b901608b558b)
- We can think of `useEffect` hook as an event listener that is listening for one or more dependencies to change.
- And when one of the dependencies does change, `useEffect` will simply execute the effect again.
- So, a bit like a regular event listener, but for effects.
- But, let's go back to our previous example where we had the `title` and `userRating` dependencies in the array.
- So, whenever the `title` or the `userRating` changes, React will execute the effect again.
- So, it will run the code one more time, which will update the document title.
- So, the website title that we see in a browser tab.
- Essentially, effects react to updates to state and props that are used inside the effect, because again, those are the effect's dependencies.
- So, in a way, effects are reactive, just like React reacts to state updates by re-rendering the UI.
- This is extremely useful and powerful, as we will see throughout the rest of the course.
- But, all this only works if we correctly specify the dependency array.
- Now let's remember how we mentioned in the very first lesson about effects, that effects are used to keep a component synchronized with some external system that lives outside of our React based code.
- And if we think about it, that's exactly what is happening here.
- The state and props of our component are now in fact synchronized with an external system, which is, in this case, the title of the document.
- Now, updating the title in some other way will, of course, not magically update the `title` or `userRating`.
- So, the synchronization only works in one way, but that's not really the point.
- The same actually happens with state updates and we still say that the UI is in sync with state.
- So, the point is that `useEffect` truly is a sychronization mechanism i.e. a mechanism to synchronize effects with the state of the application.
- And you will discover this each time you are going to use an effect.
- So, let's go and explore this a little bit further.
- ![image](https://github.com/user-attachments/assets/48cecda8-6f16-49cf-b30c-480e6bba664e)
- So, as we just learned, whenever a dependency changes, the effect is executed again.
- But now, let's remember that dependencies are always state or props.
- And, what happens to a component each time that its state or props are updates?
- Well, the component will re-render.
- This means that effects and the life cycle of a component instance are deeply interconnected.
- That's why when the `useEffect` hook was first introduced, many people thought that it was a life cycle hook rather than a hook for synchronizing the component with a side effect.
- Now, the conclusion and the big takeaway from this is that we can use the dependency array in order to run effects whenever the component renders or re-renders.
- So, in a way, the `useEffect` hook _is_ actually about synchronization and about the component life cycle.
- With this knowledge, let's now look at the three different types of dependency arrays that we can specify and also how they affect both, synchronization and life cycle.
- When we have multiple dependencies like in this example: `useEffect(fn, [x, y, z])`, it means that the effect synchronizes with `x`, `y`, and `z`.
- Now, in terms of the life cycle, it means that the effect will run on initial render and also on each re-render triggered by updating one of the dependencies `x`, `y`, or `z`.
- So again, just to make this crystal clear, the effect will be executed each time the component instance is being re-rendered by an update to `x`, `y`, or `z`.
- But if some other piece of state or prop is updated, then this particular effect will not be executed.
- Now, if we have an empty dependency array e.g. `useEffect(fn, [])`, that means that the effect synchronizes with no state or props.
- Therefore, it will only run on mount.
- In other words, if an effect has no dependencies, it doesn't use any values that are relevant for rendering the component.
- Therefore, it is safe to be executed only once.
- Finally, if we have no array at all e.g. `useEffect(fn)`, we already know that the effect will run on every render, which is usually a really bad idea and not what we want.
- Now, if the effect runs on every render, that basically means that the effect synchronizes with everything.
- Essentially, every state and ever prop in the component will be dependencies in this case.
- Now to finish, let's look at when exactly effects are executed during the render and commit process.
- ![image](https://github.com/user-attachments/assets/36ee4df5-9db6-4bae-a4bf-0cc371a8bf3b)
- Now, we mentioned in the first lesson on effects that they are executed after render.
- And while that's not wrong, it is also not the full story.
- So, let's take a look at a timeline of events that happen as components render and re-render.
- So, as we already know, the whole process starts with mounting the component instance, in this case an instance of `MovieDetails`.
- After that, the result of rendering is committed to the DOM, and finally the DOM changes are painted onto the screen by the browser.
- So, this is just what we learned in the previous section, but where do effects come into play here?
- Well, effects are actually only executed after the browser has painted the component instance on the screen.
- So, not immediately after render, as you might have thought initially.
- That's why we say that effects run asynchronously after the render has already been painted to the screen.
- And the reasons why effect work this way is that effects may contain long-running processes, such as fetching data.
- So, in a situation like that, if React would execute the effect before the browsers paints a new screen, it would block this entire process and the users would see an old version of the component for way too long.
- And of course, that would be very un-desirable.
- Now, one important consequence of the fact that effects do not run during render is that if an effect sets state, then a second additional render will be required to display the UI correctly.
- So, this is one of the reasons why you shouldn't overuse effects.
- Moving on, let's say that the `title` was initially set to "Interstellar" but then, it changes to "Interstellar Wars".
- Since this `title` is a prop, it means that the component will re-render, and the DOM changes will be committed and painted to the screen again.
- Now, since `title` is part of the dependency array of this effect, the effect will be executed again at this point - just as we learned a few moments ago.
- And this whole process can of course be repeated over and over again until the `MovieDetails` instance finally unmounts and disappears from the screen.
- Now, you might think that there is actually a hole between the commit and browser paint, right?
- The reason for that is that in React, there is actually another type of effect called the Layout effect: `useLayoutEffect`.
- The only difference between a regular effect and the layout effect is that the layout effect runs before the browser actually paints the new screen.
- But, we almost never need this.
- So, the React team actually discourages the use of the `useLayoutEffect` hook.
- We are simply mentioning it here for your knowledge.
- And actually, there are event two more holes in this timeline.
- But, we will talk about these mystery steps by the end of this section.

## Author

- [@bhoamikhona](https://github.com/bhoamikhona)
