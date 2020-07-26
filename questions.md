### 1. What is the difference between Component and PureComponent? give an example where it might break my app.

####Answer: 
 Component and PureComponent are almost the same with the main difference that PureComponent has implemented by default 
 shouldComponentUpdate check, it does a shallow compare of props and state, and only if there is a difference a render will be triggered.
 
 It can break an app when props or state are not primitive variables. In case of an object or an array, if these don't change 
 the reference but change the data inside them, a render will be not triggered and wrong result will be shown. 
 
### 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

####Answer: 
 Because all consumers that use context will re-render whenever provider's props change, it will bypass the ShouldComponentUpdate, 
 and this may lead to undesired results.
 
 
### 3. Describe 3 ways to pass information from a component to its PARENT.

####Answer: 
A component can pass information to his parent through:
  1. callback from props,
  2. updating the context
  3. using a service 
  4. dispatching an action - redux 

### 4. Give 2 ways to prevent components from re-rendering.

####Answer: 
  1. Add a check in ShouldComponentUpdate, and verify if params haven't changed
  2. For functional components you can wrap them in React.memo(), this will add a check like in ShouldComponentUpdate 
  and will reduce the unnecessary renders .
  
### 5. What is a fragment and why do we need it? Give an example where it might break my app.

####Answer:
 Fragment is a utility to wrap multiple elements without adding extra dom element. <BR/>
 ```jsx
  <Fragment>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
  </Fragment>
```

It may break an app when somebody try to attach dynamically a prop to the fragment element or try to attach a reference 
on a component that uses fragment.

### 6.  Give 3 examples of the HOC pattern.

####Answer:
HOC - are higher order component and usually it receives a components and returns a new one with other params attached.

A real example will be `connect` from redux library, it attaches state and actions to the component.
Another example will be `withRouter` from react-router library, it will pass updated route info to the wrapped component,
and third basic HOC implementation example: <br />
```jsx
const withMagicNumber = (SomeComponent) => {
  class MagicNumber extends React.Component {
     render() {
        return (
          <SomeComponent
           {...this.rpops}
            magicNumber={121}
           />);
     }
  }

  return MagicNumber;
}
```
### 7. what's the difference in handling exceptions in promises, callbacks and async...await.

####Answer:
When working with `aync/await`, error handling is done by `try {} catch {}`, for promises we will use `promise.catch` or
second callback from `promise.then()`, in callbacks it will be trickier as `try {} catch {}` will work only in some cases,
for example with `JSON.Parse` so an explicit check for errors is needed, example:
```jsx
 function callback (error, data) {}
  if (error) {
   throw new Error('Something is wrong');
  }

  ...do something
}
```

### 8. How many arguments does setState take and why is it async.

####Answer:
setState accepts two arguments, first is an object with data to be updated, or a callback that will return the data to be updated,
second argument is a callback that will be executed after state will be updated.

setState is async by design to allow all the updates from a component to batch together and reduce number of re-renders.

### 9. List the steps needed to migrate a Class to Function Component.

####Answer:
 1. Change from `class MyCompoenent extends Component` to `function MyCompoenent (props)`
 2. Delete the `constructor`
 3. Remove `this.state` and `this.props` through component
 4. Delete all references to `this` from component
 5. Remove `render` method and only keep the return;
 6. Add `const` before all methods
 7. Instead of `this.state` use hook `useState`
 8. Replace `componentDidMount`, `componentDidUpdate` and `componentWillUnmount` with `useEffect`
 
### 10. List a few ways styles can be used with components
 
####Answer:
1. Styles can be passed directly as an object through props;
2. Styles can be `css` files imported in component
3. Styles can classNames passed through props
4. Styles can be globally imported and then used in different components
5. Styles can be modular, imported in one, and only for one component

### 11. How to render an HTML string coming from the server.
####Answer: 
For a HTML string to be rendered correctly in a React component we need to use `dangerouslySetInnerHTML`.
Example: 
```jsx
 <div dangerouslySetInnerHTML={{ __html: '<h1>Hello World</h1>' }} />
```
