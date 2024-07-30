# Section 05: Working With Components, Props, and JSX

**About:** In this section, we are going to explore three core concepts of building React apps, viz components, props, and JSX. We will learn how components are the building blocks of React applications, and how to create and re-use them using the powerful JSX syntax. We are also going to share data between components usings props and learn about rendering lists, conditional rendering, and more, all while building our first beautiful project. Along the way, you will start practicing React on your own by building a developer profile card using these fundamental skills. So, let's get started.

## Table of Content

- [Section 05: Working With Components, Props, and JSX](#section-05-working-with-components-props-and-jsx)
  - [Table of Content](#table-of-content)
  - [Lessons Learned](#lessons-learned)
    - [Rendering The Root Component and Strict Mode](#rendering-the-root-component-and-strict-mode)
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

## Author

- [@bhoamikhona](https://github.com/bhoamikhona)
