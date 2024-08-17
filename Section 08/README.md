# Section 08: Practice Project - Eat-'N-Split

**About:** We will review everything that we have learned up until this point by building a brand new project called Eat-'N-Split. This project is about splitting the restaurant bill with your friends. Similar to an app called [Splitwise](https://www.splitwise.com/).

## Table Of Content

- [Section 08: Practice Project - Eat-'N-Split](#section-08-practice-project---eat-n-split)
  - [Table Of Content](#table-of-content)
  - [Lessons Learned](#lessons-learned)
    - [Project Setup](#project-setup)
    - [Building The Static App: List of Friends](#building-the-static-app-list-of-friends)
    - [Building The Static App: Forms](#building-the-static-app-forms)
    - [Displaying The New Friend Form](#displaying-the-new-friend-form)
    - [Adding a New Friend](#adding-a-new-friend)
    - [Selecting a Friend](#selecting-a-friend)
    - [Creating Controlled Elements](#creating-controlled-elements)
    - [Splitting a Bill](#splitting-a-bill)
  - [Author](#author)

## Lessons Learned

### Project Setup

### Building The Static App: List of Friends

### Building The Static App: Forms

### Displaying The New Friend Form

### Adding a New Friend

- `crypto.randomUUID()` - This method is used to generate a v4 UUID using a cryptographically secure random number generator.
  - It takes no parameters
  - It returns a string containing a randomly generated, 36 character long v4 UUID.
  - NOTE: UUID stands for Universally Unique Identifier which is a label used to uniquely identify a resource among all other resources of that type.
  - So, this is a good way of generating random IDs right now in the browser.
  - It is not an external package, but it won't work in older browsers.

### Selecting a Friend

- Whenever we have a component that doesn't actually need a prop but, all it does with the prop is to pass it down into one of its children, we say that we are <ins>prop-drilling</ins>.
- In this project, it is not a big problem but sometimes we need to pass a prop through 5 or 6 levels - then it becomes problematic.
- In a future section, we will learn about that in detail along its solution.

### Creating Controlled Elements

### Splitting a Bill

## Author

- [@bhoamikhona](https://github.com/bhoamikhona)
