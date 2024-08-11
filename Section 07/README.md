# Section 07: Thinking in React - State Management

**About:** In this section, we will start looking at a core skill that every React developer needs to develop right from the beginning, and that core skill is to think in React. Thinking in React encompasses many different aspects, but in this section we will focus on state management. You will learn when and where to create state variables, when and how to derive state, and also how to communicate between child and parent components by lifting state up; and also how to communicate between child and parent components by lifting state up. All these new skills will be needed as we keep building our travel list application.

## Table of Content

- [Section 07: Thinking in React - State Management](#section-07-thinking-in-react---state-management)
  - [Table of Content](#table-of-content)
  - [Lessons Learned](#lessons-learned)
    - [What is "Thinking in React"?](#what-is-thinking-in-react)
    - [Fundamentals of State Management](#fundamentals-of-state-management)
    - [Thinking About State and Lifting State Up](#thinking-about-state-and-lifting-state-up)
    - [Reviewing "Lifting Up State"](#reviewing-lifting-up-state)
    - [Deleting an Item: More Child-to-Parent Communication!](#deleting-an-item-more-child-to-parent-communication)
    - [Updating an Item: Complex Immutable Data Operation](#updating-an-item-complex-immutable-data-operation)
    - [Derived State](#derived-state)
    - [Calculating Statistics as Derived State](#calculating-statistics-as-derived-state)
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

### Fundamentals of State Management

- We learned before that state is the most important concept in React.
- Therefore, managing state is the most important aspect when it comes to thinking in React.
- So, let's now talk about the fundamentals of state management in React.
- ![image](https://github.com/user-attachments/assets/a063c967-801d-40cf-ae3b-a7a57e019728)
- As you already know, we can use the `useState` function to create multiple pieces of state in order to track data that changes over the life cycle of an application.
- In the image above, we have many examples of state in the Udemy application that you are familiar with.
- All of it looks like a bit of mess. How do we know that we even need all of these pieces of state? How do we know where exactly to place them inside the code?
- Well, that's where state management comes into play.
- State management can be defined in different ways by different people.
- But, state management could be thought of as deciding when we need to create new pieces of state, what types of state we need, where to place each piece of state inside our code base, and also how all the data should flow through the app.
- To summarize all this, we can use the analogy that state management is basically giving each piece of state a home within our code base.
- Up until this point, in our small apps, we never had to worry about state management at all.
- We simply placed each state in a component that needed it and that's it.
- But as an application grows, the need to find the right home for each piece of state starts to become really important - no matter if that home is the component where we first need that state, some parent component, or even global state.
- ![image](https://github.com/user-attachments/assets/c399cc78-6b2f-4f81-aec2-d314d09d73d9)
- Speaking of global state, let's actually analyze the difference between the big two types of state that exist in React viz global state and local state.
- This will only become more important to us later on, but let's still start learning about this in this section.
- In React, each piece of state is either local state or global state.
- Local state is state that is only needed in one component or any few different components, like child or sibling components.
- We simply create a piece of local state using the `useState` function inside a certain component.
- That piece of state is then only accessible to that exact component and maybe to its child components if we pass the state using props.
- Going back to the example of the Udemy app (in the image above), an example of local state might be the input text in the search bar. So probably, only that component needs to know about this data.
- Therefore, that state is local to that search bar component.
- Global state is the state that many different components in the app might need access to.
- Therefore, when we define state as being global, that piece of state will become accessible to every single component in the entire app.
- It is shared between all components, and therefore, we can also call it <ins>shared state</ins>.
- In practice, we can define global state using React's Context API or also an external global state management library like Redux that you might have heard of.
- In the Udemy app (in the image above), one piece of global state is the shopping cart. That piece of data is used all over the place. All the components highlighted in the dark blue color need access to the shopping cart state, and therefore, it makes sense that it is a global state.
- This distinction between local and global state will matter more in large applications.
- In the app that we are building right now i.e. the travel list application won't truly need global state.
- In fact, we are going to keep using just the local state for Parts 01 and 02 of this course.
- NOTE: One important guideline in state management is to always start with local state and only move to global state if you really truly need it.
- We will learn all about this in Part 03 and 04 of this course.
- For now, let's take a look at how to decide when we actually need state and where we should place it.
- ![image](https://github.com/user-attachments/assets/ee08e72b-b0d3-48dd-90ae-9a10381f71f3)
- The above image will act like a flowchart that will help you take the decision regarding where and when to put a state.
- It all starts with you realizing that you need to store some data.
- When this happens, the first question to ask is, will this data change at some point in time?
- If the answer is no then all you need is a regular variable, probably a `const` variable.
- If the data does need to change in the future, the next question to ask is, is it possible to compute/calculate this new data from an existing piece of state/props?
- If that is the case, then you should derive the state. So basically, you calculate it based on an already existing state or prop.
- This is a pretty important concept so, there is a separate lesson on derived state later in this section.
- However, most of the time you cannot derive state. In that case, you need to ask yourself whether updating the state should re-render the component.
- We have already learned before that updating state always re-renders a component, but there is actually something called a `ref` which persists data over time like regular state, but does not re-render a component.
- It is basically a special type of state that we will look at later.
- Most of the time you actually do want the state to re-render the component so, what you do is to create a new piece of state using the `useState` function and you then place that new piece of state into the component that you are currently building.
- So that's the always start with local state guideline that we talked about previously.
- With this, we have completed the decision process of when to create state.
- Again, most of the time you will just create a new piece of state using the `useState` hook, but there are also all these other cases.
- So it is important that you are aware of when to create each of them.
- Anyway, let's now focus where to place each new piece of state.
- If the state variable that we just created is only used by the current component, then simply leave it in that component, and you are done. That's the end of the process right there.
- However, the state variable might also be necessary for a child component.
- In that case, simply pass the state down into the child component by using props.
- If the state variable is also necessary for one or a few sibling components or even for a parent component of your current component, it is time to move that state to the first common parent component.
- In React, this is what we call <ins>lifting state up</ins>.
- This is another one of those super important topics that we will actually start using in practice in the next lesson.
- Finally, the state variable might be needed in even more than just a few siblings. So, it might be necessary all over the place in the component tree.
- That sounds like global state.
- Since we won't need global state for some time, we will complete this diagram once we reach the global state management lesson.
- Hopefully this diagram will be useful once you start building your own small apps or even throughout the rest of the course.
- This might look super confusing and a lot of work right now, but it will become really intuitive over time.
- So, at some point, you will just intuitively know when to create a piece of state, when to derive state from existing state, and when to lift state up.
- But this flow chart can still be very helpful in the beginning.

### Thinking About State and Lifting State Up

- Applying <ins>lifting up the state</ins> to the travel list app.

### Reviewing "Lifting Up State"

- We just created an important piece of state and lifted it up to a parent component that is common to both components that needed to use or to update that state.
- However, this whole idea might still be a bit confusing because in fact, it can seem quite counter intuitive.
- So, let's now look at another example and some diagrams to really understand how lifting up state works and why it is so important.
- ![image](https://github.com/user-attachments/assets/443df83b-b4cc-4fd7-b858-af961a806cb1)
- As an example, let's use the checkout part of the Udemy interface that we have seen in a previous lesson.
- Let's say that we started by building the promotions component where the user can input coupon codes that will then be added to a list of applied coupons.
- That sounds like we need a piece of state called `coupons`.
- That `coupons` state is now local to the promotions component along with a `setCoupons` function coming from `useState`.
- Next, we set out to build the total component, but here we quickly realize that the total component also needs access to the `coupons` state.
- Otherwise, without knowing which coupons have been applied, how would the total component know what discounts to apply and what price to display?
- So here we encounter a problem. How do we give the total component access to the `coupons` state? Because in React, we have one-way data flow. So, data can only flow down from parent to children but, not sideways to sibling components.
- Therefore, we cannot simply pass the coupons data as props to the total component. That's just not possible.
- So, we need a way of sharing state with other components that are further up or sideways in the component tree.
- But luckily for us, we already did exactly that in the last lesson by _lifting it up_.
- So, we already know that lifting up state is the technique that will solve this problem.
- ![image](https://github.com/user-attachments/assets/109fc410-d04d-4728-b766-bdf8e32feb7c)
- But what does that mean and how exactly does it work?
- Lifting state up simply means to place some state in a component that is a parent of both components that need the piece of state in question.
- In this example, we would remove the `coupons` state from promotions and place it in the checkout component.
- Just like that, we have lifted state up to the closes common parent of both total and promotions components.
- Now, giving both these components access to the state is as easy as passing it down using props, that's it.
- By lifting state up, we have just successfully shared one piece of state with multiple components in different positions in the component tree, which is something that we need to do all the time in React apps.
- So it is really important that you get used to this pattern and remember that we need this pattern in the first place as a direct consequence of React's one-way data flow.
- Anyway, all this now seems to be working just fine at this point.
- But now what happens when we want to add a new coupon to the `coupons` state? In other words, what happens when the user inputs a new coupon and click on the "Appy" button?
- ![image](https://github.com/user-attachments/assets/9a92e9c1-c18b-41d3-a720-f3c20e2069a7)
- We want to update the `coupons` state, but how do we do that now? Because after lifting the state up, it now lives in the parent component i.e. not in the promotions component anymore.
- Promotions only receive this data via props but, as you know, we cannot mutate props.
- That's one of the hard rules of React.
- So, what we are asking is that if we have one-way data flow i.e. if the data can only flow from parent component to children components, then how can the child component promotions update the state that lives in the parent component, checkout?
- The solution is quite simple. All we have to do is to pass the `setCoupons` function down as a prop to the components who need to update the state.
- Now that we have the `setCoupons` function in promotions, once a new coupon is added, we can simply use the `setCoupons` function to update the state that lives in the parent component.
- This is actually exactly what we did in the previous lesson with the difference that we didn't directly pass `setItem`, but a function that uses `setItems` to update the items, which is essentially the same thing.
- But anyway, we can call this technique of passing down a setter function, <ins>child-to-parent communication</ins> or also <ins>inverse data flow</ins>.
- "Inverse" because usually data only flows down but here, we basically have a trick that allows us to basically have the data flowing up as well.
- Of course this is not truly flowing up, but this workaround of passing down the setter function and use it update the parent state is pretty close to actually having the data flow up the tree.

### Deleting an Item: More Child-to-Parent Communication!

### Updating an Item: Complex Immutable Data Operation

### Derived State

- Another aspect that we mentioned in the state management lesson was derived state.
- It sounds complicated but, it is actually pretty straightforward.
- ![image](https://github.com/user-attachments/assets/43863a62-48d1-4dad-9e28-4a839a0ae011)
- Essentially, derived state is simply state that is computed from another existing piece of state or also from props.
- Let's look at some actual code (the first code snippet in the image above).
- Here we have 3 pieces of state as we can see by the 3 `useState` function calls.
- However, if we analyze these states, it actually doesn't make much sense that all of them exist because `numItems` and `totalPrice` depend entirely on the `cart`.
- `numItems` is simply the number of items in the cart and `totalPrice` is the sum of all the prices in the cart.
- So, all the data for these two pieces of state is actually already in the `cart`.
- So, there is no need to create the additional state variables; and doing so is actually quite problematic.
- These are problematic because, first - now we have to keep all these states in-sync. So, we need to be careful to always update them together.
- In this situation, whenever we update the cart, we will also need to manually update the number of items and total price, otherwise our state would get out of sync.
- But updating these 3 states separately creates a second problem because then, that will re-render the component 3 times, which is absolutely unnecessary.
- Instead, we can simply derive the `numItems` and `totalPrice` state from the `cart` thereby solving these problems. This is because `cart` already contains all the data that we need.
- Here (second code snippet in the image above) we simply calculate `numItems` as the `cart` length and `totalPrice` as the sum of all prices and store them in regular variables.
- There is no `useState` required here which will cause unnecessary re-renders.
- The `cart` state acts as a single source of truth for these related pieces of state, making sure that everything will always stay in-sync.
- This works because updating the cart will re-render the component which means that the function is called again; and so all the rest of the code is executed again as well. Therefore, `numItems` and `totalPrice` will also automatically get re-calculated.
- Of course, most of the time, we cannot derive state but whenever you have a situation like this, where one state can easily be computed from another, always prefer derived state.
- So, don't create two state variables if you actually only need one.
- That's a very common beginner mistake, but now, you will be able to avoid it.

### Calculating Statistics as Derived State

## Author

- [@bhoamikhona](https://github.com/bhoamikhona)
