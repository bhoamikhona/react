# Section 12: Effects and Data Fetching

**About:** Probably 95% of all React apps out there fetch some kind of data from some API, making data fetching an essential skill when building web applications. One way of fetching data in a React app is inside an effect and so, that's what this section is all about. In this section, we will continue working on the usePopcorn project as we learn all about side effects. So, we are going to focus on the `useEffect` hook, how and when effects are executed, and how we can clean effects up. Also, loading external data into our application finally makes them feel a lot more real world and alive. So, let's get started.

## Table of Content

- [Section 12: Effects and Data Fetching](#section-12-effects-and-data-fetching)
  - [Table of Content](#table-of-content)
  - [Lessons Learned](#lessons-learned)
    - [The Component Lifecycle](#the-component-lifecycle)
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

## Author

- [@bhoamikhona](https://github.com/bhoamikhona)
