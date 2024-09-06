# Section 10: Thinking in React - Components, Composition, and Reusability

**About:** In this section we will learn how to think about components, component composition and component reusability. Over the next few sections we are going to build a beautiful project called "usePopcorn". In this section, we lay the foundation of the project by learning deeply about how to split a user interface into components, what type of components we can use, and then how implement it all in React. We will also build a simple app layout for the first time using the power of composition. All these are already intermediate React topics but still, absolutely fundamental for any React developer.

## Table of Content

- [Section 10: Thinking in React - Components, Composition, and Reusability](#section-10-thinking-in-react---components-composition-and-reusability)
  - [Table of Content](#table-of-content)
  - [Lessons Learned](#lessons-learned)
    - [Setting Up The "usePopcorn" Project](#setting-up-the-usepopcorn-project)
    - [How to Split a UI into Components](#how-to-split-a-ui-into-components)
      - [Component Size Matters](#component-size-matters)
      - [How to Split a UI into Components](#how-to-split-a-ui-into-components-1)
      - [Framework: When to Create a New Component?](#framework-when-to-create-a-new-component)
      - [Some More General Guidelines](#some-more-general-guidelines)
    - [Splitting Components in Practice](#splitting-components-in-practice)
    - [Component Categories](#component-categories)
    - [Prop Drilling](#prop-drilling)
    - [Component Composition](#component-composition)
    - [Fixing Prop Drilling With Composition (And Building a Layout)](#fixing-prop-drilling-with-composition-and-building-a-layout)
  - [Author](#author)

## Lessons Learned

### Setting Up The "usePopcorn" Project

### How to Split a UI into Components

- We are back in a section about thinking in React, which is all about state, data flow, and components.
- We already talked about state management in detail so, now it is time to talk more about components.
- When it comes to components, the important questions that we need to ask ourselves are, "How do we split up a UI into components?", and "When should we actually create new components?".
- So, let's try to answer these questions in this lesson.

#### Component Size Matters

- One way in which we can start answering those questions is by looking at component size.
- ![image](https://github.com/user-attachments/assets/be0e9f98-b204-45b4-ae39-75225650c667)
- We can classify every component based on its size, which means that we can place every component on the axis of component size.
- On one side we have really small components, and on the other extreme, we have huge components.
- At many times, none of these extremes are ideal.
- Imagine that we wanted to build a simple card (like the one in the image above).
- One way of doing it would be to create just one huge component for the entire card.
- However, that would create a whole set of problems.
- First, there is way to much stuff going on in this component so, it has too many responsibilities.
- Components are just like JavaScript functions, in the sense that if a function does too many different things, we should break it up into multiple functions.
- The same applies to React components.
- Another way in which it becomes apparent that a component is too large is when it needs to receive too many props in order to work properly.
- For example, if we need 10 or 15 props to properly configure a certain component, that component is probably way too big, and should be split up.
- In general, these two problems make it very hard to re-use the component, which is one of the big advantages of components in the first place.
- Also, huge components generally contain a lot of code that might be complex and intertwined, which ultimately makes the whole component hard to understand and to use.
- Does this mean that we should do the opposite and create many small components, like the one shown in the image below?
- ![image](https://github.com/user-attachments/assets/e9543bd2-ff93-4bf8-97ac-b5244270a0df)
- Most of the time, that would probably be a terrible idea as well.
- If we would build a UI or an entire app in this way, we would end up with 100s if not 1000s of mini-components.
- This, of course, would create a code base that is super confusing to navigate and to understand, and it would be way too abstracted.
  - If you are not familiar with the term "abstraction", in programming, it basically means to create something new in order to hide the implementation details of that thing.
  - For example, when we create a button component, the user of that component might have no idea how the button actually does what it does, because the implementation details are hidden behind this abstraction i.e. this component.
  - So in a way, each new component that we create is an abstraction.
- Now, if both ends of the spectrum i.e. both really small and huge components have these problems then what should we do?
- Most of the time, the goal is to create components that strike the right balance between being too specific and too broad, or in other words, between being too small and being too big.
- These problems that we identified here, like components having too many responsibilities and being hard to use can help us understand how we should actually split a UI into components.

#### How to Split a UI into Components

- ![image](https://github.com/user-attachments/assets/4fff3e23-3d8e-4f9c-ab71-517ace6e1461)
- Using the same example as before, first we had the whole card, which is one huge component (the top component in the image above).
- Then we had a lot of small components (the bottom component in the image above), and both these ways of splitting up the UI are far from ideal for all the reasons that we have talked about.
- Instead, we want something like the middle component in the image above where we have a more logical separation of the content into different components, and some of these components are probably even going to be re-usable, like the heart button or the "SUPERHOST" label.
- Also, each of these components has a well-defined responsibility, like displaying the price or the rating, and they are also not overly complex.
- From this, we can now derive a couple of criteria that we can use to split a user interface into components.
- First, when we decide which components we need to implement a certain UI, it is important that these components create a logical separation of the content, or even of the layout of a page.
- We should also strive to make some of these components re-usable and ensure that each component has a single, well-defined responsibility.
- Finally, there is one even more subjective criterion, which is your personal coding style.
- Some people work better with smaller components, and some people just prefer larger components. Therefore, you need to create components in a way that works best for you so that you can stay as productive as possible.
- Now, let's actually dig a bit deeper into all these different criterias.

#### Framework: When to Create a New Component?

- ![image](https://github.com/user-attachments/assets/6126d5d0-4f97-4ccf-a8fd-50509d2f03be)
- So, let's look at framework that will help you create new components from bigger components.
- The idea is that, when you are creating a new component and you are in doubt about what the component should include, just start with a relatively big component but, now a huge component, and then split that bigger component into smaller components as it becomes necessary.
- Now you might ask, when does it actually become necessary to split big components into multiple small ones?
- That's where the four criterias come into play again, viz:
  - Logical separation of content/Layout
  - Reusability
  - Responsibility/Complexity
  - Personal coding style
- Of course, if you already know that you need a small and re-usable component, such as a button, you can just skip all this and simply create a component.
- But otherwise, you can just start big and don't need to focus on reusability and complexity at the very beginning.
- At some point, however, you do need to worry about these topics, and so let's analyze them one by one, starting with logical separation.
- If after writing your big component, you feel like the component contains some piece of code, or of layout, that don't really belong together, then that means that it is probably a good idea to create a new component.
- About reusability, if it is possible to re-use a part of your big component, and if you actually want or need to re-use that part, then you should take that code and extract it into a new component.
- Another sign that you should probably extract part of your component into a new one is that your component is doing way too many different things, or that it is relying on to many props.
- So, if your big component has too many pieces of state or effects, or if the code is way too complex or too confusing, it might be once again, time to create a new, smaller component.
- Finally, as mentioned previously, it is important that you feel productive when working with your components.
- So, if you prefer smaller functions/components, just split up big components into smaller ones.
- But on the other hand, if you prefer big components, that's totally fine.
- It is all upto you, because remember, in the end, these are all just guidelines and best practices that will become intuitive over time, and by then, building your components will become second nature to you.
- But as you start out right now, it is great to have guidelines like these to help you out.
- Speaking of guidelines, let's look at a few more general guidelines.

#### Some More General Guidelines

- ![image](https://github.com/user-attachments/assets/b1d7cece-e7a1-48dd-ac98-21943bb94c0a)
- First off, you need to be aware that creating a new component creates a new abstraction (we talked about what abstractions are earlier in this lesson).
- Abstractions have cost, because having more abstractions requires more mental energy to think about different components and to switch back and forth between components.
- So, try not to create new components too early if you can avoid it.
- Next, it is important to name a component according to what it does or what it displays.
- Don't be afraid of using long component names. That's completely normal in React development.
- What's even more important is that you never, ever declare a new component inside another component, and we will learn the reason for that in the next section.
- What you can do instead when you have some related components is to co-locate these related components inside the same file.
- Finally, and going back to our intial topic of component size, it is completely normal that an application has components of many different sizes, including some very small ones and some huge ones.
- ![image](https://github.com/user-attachments/assets/90a53e00-5000-4208-8a89-d4effc820f9a)
- So, even though we said in the beginning that very small components have some problems, of course, we always need some small components (like the ones marked in the image above) in any application, because they are highly re-usable and have a very low complexity, which is sometimes exactly what we need.
- Most apps will also have a few huge components that are not meant to be re-used.
- For example, we might have a huge page component which contains the layout of the entire app or a page, and that might very well be a fairly complex component which is not meant to be re-used.
- So, in situations like this, don't worry about re-usability or about needing to split this component up.
- Speaking of reusability, as you can see from the image above, we can say that, as a general rule, the reusability range is pretty similar to the size range.
- Generally speaking, the smaller components are, the more reusable they will be.
- Of course, as components get bigger, they will become less re-usable.
- But that's no problem at all for some components.
- So, not all components are meant to be re-usable.
- Finally, we have all these medium-sized components as well, which all have different degrees of size, reusability, responsibility, and complexity.
- In the end, our application will have many different components across the entire spectrum, and that's completely normal and natural.
- In the next lesson, we will apply the concepts that we just learned into practice.

### Splitting Components in Practice

### Component Categories

- Now that we have created a few different components, let's quickly talk about different component categories that naturally emerge in most React code bases.
- ![image](https://github.com/user-attachments/assets/28f914e7-91c5-40a9-98a0-b50aa2651bee)
- Most of your components will naturally fall into one of the three categories:
  - Stateless or presentational components
  - Stateful components
  - Structural components
- We say "naturally" because we shouldn't force our components into one of these categories.
- These are all still normal React components in our code - just like the ones that we have been writing.
- But we can categorize them in this way when we think about components.
- There are also other categories that could be used, but these make the most sense.
- Starting with stateless or presentational components, as the name suggests, these don't have any state.
- Usually, they are components that receive some props and then they simply present that data or even some other content. Therefore, the name _presentational_.
- Many times these are quite small components, such as the Logo, NumResults, and Movie components in our current app.
- Next, stateful components are simply components that do have state.
- Just because these components have state, that doesn't mean that they can't be highly re-usable.
- For example, the Search component that we built does have state and we could re-use this input as many times as we wanted throughout the app.
- Finally, you can think of structural components as pages, layouts, or screens of the application - which are often times the result of composing many smaller components together.
- More about composition later in this section.
- These structural components can be large and non-reusable components, but they don't have to.
- Structural components are sometimes quite small too.
- What matters is that they are responsible for providing some sort of structure to applications such as pages or layouts.
- Therefore, these components might not be present in really small apps.
- But you will definitely have a few structural components as your app grows bigger and bigger.

### Prop Drilling

- Prop drilling basically means that we need to pass some prop through several nested child components - that don't even need that prop, all they are needed for is to pass the data down even futher in the component tree in order to get that data into some deeply nested component.
- So, prop drilling is not fun and it could be worse if the data is nested very deep into the tree.
- We will look at ways of fixing prop drilling a bit later in this section.
- So, prop drilling is a perfectly valid solution but, it is not always the best solution - especially if we need to pass that prop down very deep into the component tree.
- So, in the next lesson we will take a look at one of the possible solutions to this problem, which is component composition.

### Component Composition

- As we keep learning about components in this section, there is one essential principle that we really need to focus on now, which is component composition.
- ![image](https://github.com/user-attachments/assets/93d882b7-a346-41c6-80c1-36991e6f1b46)
- In order to talk about component composition, we first need to take a look at what happens when we simply use or include a component in another component in JSX.
- Let's say that we have a Modal component that we want to re-use, and also a Success component which simply renders the message "well done".

```javascript
function Modal() {
  return (
    <div className="modal">
      <Success />
    </div>
  );
}
```

- Then, we just use the Success component inside the Modal component.

```javascript
function Success() {
  return <p>Well done!</p>;
}
```

- This sort of thing is exactly what we have been doing with our components most of the time. So, we just use them inside of other components.
- However, when it comes to re-usability, this creates a big problem.
- That's because the Success component really is inside of the Modal. They are deeply linked together in the JSX and therefore, we cannot re-use the Modal component to display some other message inside of it, for example, an error message.
- But as you can imagine, in order to solve this, we now bring in the technique of component composition where we can compose the Modal and Success components together.
- So here we have our Modal component again, but with a fundamental difference.

```javascript
function Modal({ children }) {
  return <div className="modal">{children}</div>;
}
```

- This component does not include a pre-defined component but instead, it accepts children with the `children` prop - just like we have learned before.
- So, if we get our Success component again, we can now basically just pass it into the Modal by placing it between the opening and closing tags when we use Modal.

```javascript
function Modal({ children }) {
  return <div className="modal">{children}</div>;
}

function Success() {
  return <p>Well done!</p>;
}

function App() {
  return (
    <Modal>
      <Success />
    </Modal>
  );
}
```

- If you need, take a minute to analyze this code because it is important to grasp the fundamental difference here.
- In the first example, the Success component is really tied to the Modal.
- So that modal might as well be called a SuccessModal.
- This is because we cannot use it for anything else anymore.
- But with component composition, we simply passed the Success component right into the Modal and composed them together using the `children` prop.
- Of course, we could have passed in any other component which makes the Modal component highly re-usable.
- So essentially, when we do component composition, we leave this "hole" or this "empty slot" in the component ready to be filled with any other component that we want.
- So, let's say that we needed another Modal window somewhere else in the app, but one that renders an error message.
- That's easy now - we just use the Modal component again but, this time we pass in the Error component as `chilren`

```javascript
function Modal({ children }) {
  return <div className="modal">{children}</div>;
}

function Success() {
  return <p>Well done!</p>;
}

function Error() {
  return <p>Oops, try again!</p>;
}

function App() {
  return (
    <>
      <Modal>
        <Success />
      </Modal>

      <Modal>
        <Error />
      </Modal>
    </>
  );
}
```

- With this, we have also successfully composed these two components together as well.
- ![image](https://github.com/user-attachments/assets/65e9308b-bdc4-4af4-bc03-32a1e54007e3)
- Formally, component composition is the technique of combining different components by using the `children` prop or by explicitly defining components as props.
- We use composition for two big reasons or in two important situations.
- First, when we want to create highly re-usable and flexible components such as the Modal window or really a million other re-usable components that we can think of - and we do this all the time.
- The second situation in which we can use composition is in order to fix a prop drilling problem like the one that we found in our previous lesson.
- This is actually great for creating layouts as we will do in the next lesson.
- Just keep in mind that this is only possible because components do not need to know their children in advance which allows us to leave these "empty slots" inside of them in the form of the `children` prop.

### Fixing Prop Drilling With Composition (And Building a Layout)

## Author

- [@bhoamikhona](https://github.com/bhoamikhona)
