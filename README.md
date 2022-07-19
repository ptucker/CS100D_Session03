# CS100D_Session03

## React -- Building Component-based Dynamic Web Pages

Our web pages are getting cooler and cooler. You can make them show your content (HTML), display things the way you want them to look (CSS), and make them interactive (JavaScript). Very cool. As your projects get larger, though, they can become difficult to maintain. For example, in a larger interactive web site, when content changes, you may need to make updates to a lot of other components. In our calculator, when the user clicks on a button, the display needs to change.

The [React](https://reactjs.org/) JavaScript library helps manage this complexity. React is a popular framework based on Node.js, and in a quick search on Indeed I found a handful of entry-level openings where React was used. There are other, similar JavaScript libraries, including Ionic, Angular, and Vue. More will come, but learning one will help you learn the others.

You can develop React components that can be reused anywhere in your web app. You define your components as JavaScript classes (which we used in Python), and each class describes how to display themselves using HTML and CSS, based on the properties and the state for that component.

## Setup

First we need to install Node.js and then create our React app:

1. Install [Node.js](https://nodejs.org/en/). The download "recommended for most users" will do fine.
2. Start Visual Code in the folder you'd like to create your app in. Open a terminal and type `npx create-react-app my-app`, but replace `my-app` with the name you'd like for your app. It may ask you for permission to install packages, and you'll want to allow that.
3. Delete all the files that were created in the `src` folder for your app. We'll start building our app from scratch.
4. Create a file called `index.css` in your `src` folder, with these contents (obviously you can use any fonts or colors you'd like):

```
body {
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color:#cccccc;
    border-color:#c20202;
}
```

5. Create a file named `index.js` in the `src` folder with these contents:

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Main extends React.Component {
    render() {
        return (
            <div className='Main'>
                <p>Hello World</p>
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);
```

6. In the terminal, change directories to your app's folder (e.g. `cd my-app`), then type `npm start`. This will tell Node.js to start your web app. It should open a browser, then display "Hello World" (as always).

### Wait, what just happened?

Let's look through the JavaScript code to see what's going on. First, notice that your app's folder structure has three folders:

1. The `node_modules` folder contains all the libraries that React needs. You'll never need to look in that folder, and when you decide to download additional React libraries, they'll go there.
2. The `public` folder contains static files (e.g. image files) as well as `index.html`. The `index.html` file is the starting point for your web site, and React will use it to show your components
3. The `src` folder is where you'll spend nearly all of your time. Here's where each of your component files will be stored, including our first component, `Main`.

Inside `index.js`:
* The first two lines import the basic React libraries, and the third line imports the CSS file
* We created a class called `Main` which inherits from `React.Component`. That is, `Main` is a `React.Component`. It's almost identical to what we did in Python to create our GUI apps. Remember `class mainwindow(QWidget):`? Our `mainwindow` class inherited from `QWidget` to get the GUI functionality.
* React components implement the `render()` function. When React thinks it needs to re-draw a component, it will call `render` for you. In our case, the component simply puts `Hello World` inside a `<div>` tag.
* Finally, the last two lines create a `Main` component object and place it inside the `<div id="root"></div>` that's in `index.html`.

### Checkpoint

1. Try out the code above.
2. Change the `Hello World` to show a different message.
3. Add a second `<p>` tag inside the `<div>` for `Main` to show a second message.

An important point about the `render` function. It can only return a single HTML element, which will generally be a `<div>` tag with contents. The following is legal:

```
    render() {
        return (
            <div className='Main'>
                <p>Hello World</p>
            </div>
        )
    }
```

But this is not:

```
    render() {
        return (
            <div className='Main'>
                <p>Hello World</p>
            </div>
            <div className='Main'>
                <p>Hello World</p>
            </div>
        )
    }
```

## Properties and State in React

React components have two concepts that will be important for us: *properties* and *state*. Properties are given to the component when it's created, and so you can't change them. State keeps track of data that describes the content that needs to be shown. 

### Properties

Let's modify our example, first to show properties in action. Try this code in your `Main` class:

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Main extends React.Component {
    render() {
        const { user } = this.props
        return (
            <div className='Main'>
                <p>Hello {user}</p>
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main user='Pete' />);
```

First, take a look at the last line. I've modified the code to pass in a `user` property, which is set to `Pete`. React components have a dictionary called `props`, and each property that's defined when the component is created is placed in that dictionary.

In my `render` function, I first get the value of the `user` property: `const { user } = this.props`. The `this`1 object is referring to theclass object. It's the same as `self` in Python. Then, in my `<p>` tag that used to say `Hello World`, I changed it to `<p>Hello {user}</p>`, and those curly braces around `user` tell react to get the value from the `user` variable (and not show the string `Hello user`).

You're allowed to have as many properties as you'd like. For example, maybe you want to separate first name and last name: `root.render(<Main first='George' last='Whitworth' />);`, and then to get those values in `render` you'd use `const { first, last } = this.props`.

### State

State contains data that might change during the life of your component, and like properties, all React components have a `state` dictionary containing that data. Let's add a button to our webpage, and count how many times it's clicked:

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Main extends React.Component {
    constructor() {
        super()

        this.state = {'count': 0}
    }

    incrementCount() {
        const { count } = this.state
        this.setState({...this.state, count: count+1})
    }

    render() {
        const { user } = this.props
        const { count } = this.state
        return (
            <div className='Main'>
                <p>Hello {user}</p>
                <p>{count} clicks</p>

                <button onClick={this.incrementCount.bind(this)}>Count</button>
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main user='Pete' />);
```

Let's look at the changes:

1. I created a constructor for our component (just like `__init__` in Python). It first tells React to construct this component, then it sets the state. In this case. we have only one piece of data in our state, `count`, which is initialized to 0.
2. I created a function called `incrementCount()`. That function first gets the current `count` value, then calls `setState` to change the state to `count+1`. *The `setState` call is important.* It tells React that the component's state has changed, and that it will need to call our `render` function to update the look of the component.
3. In `render`, I first get the `count` value from state. I added another `<p>` tag that shows how many clicks have been done: `<p>{count} clicks</p>`.
4. Also in `render`, I added a button. For the `onClick` attribute, I've set up a call to `incrementCount`. Notice that it's a little more involved. I'm using `this.incrementCount.bind(this)`. What we're saying is that I want you to call `incrementCount`, but we need to make sure that the class object (`this`) is accessible in that function.


## Simple Calculator Project in React

We've made a calculator in straight JavaScript. Let's see about making a calculator in React. As we did before, I've given you a starting point in the `calc` folder for this repo. You'll see `calc.css` and `index.js` in the `src` folder. Open those. Using the terminal, type `cd calc` and then `npm start` to see the buttons. As before, they won't do anything (yet).

Let's first respond to clicks on number buttons. When the user clicks on a number, we want to take what's currently in the display, the append the number on that button. We'll store the value to be displayed in `state`, so we'll first need a constructor:

```
    constructor() {
        super()
        this.state = {display: '0'}
    }
```

In `render`, get the `display` value from state: 

```
    render() {
        const { display } = this.state
```

And then replace the `0` with `{display}` to use the display value in the `display` section of the table:

```
<td colspan="5"><span className="display" id="display">{display}</span></td>
```

Here's our first function, `numberClick`. I put it right below the `constructor`:

```
    numberClick(event) {
        const { display } = this.state
        const val = event.target.value
        var newdisplay
        if (display === "0")
            newdisplay = val
        else
            newdisplay = display + val
        this.setState({...this.state, display: newdisplay})
    }
```

In this case, `numberClick` takes an argument `btn`, which repreents the click event. We'll get the `value` attribute of the button that caused the event, which is the number displayed, and append it to what's already in the display. If the display contains 0, or some non-number, we'll clear the display before appending the number.

Now we need to tell the number buttons to call our function in the `render` method. As we did with `incrementCount` above, we'll bind `this` to the function call at the beginning of `render`:

```
const numberClick = this.numberClick.bind(this)
```

Then we'll update each of our number buttons:

```
<td><button className="number" onClick={numberClick} value='7'>7</button></td>
<td><button className="number" onClick={numberClick} value='8'>8</button></td>
<td><button className="number" onClick={numberClick} value='9'>9</button></td>
```

### Checkpoint

1. Take the above example and update all 10 number buttons, then test to make sure it's working.
2. Make a function called `ceClick` to handle the `CE` button. That's pretty straight-forward: If that's clicked, change what's in `display` to `0`.

All right, let's hook up the arithmetic operator buttons. Think about how a calculator operates. You type in the first number. When you hit an operator button, the number in the display has to be stored as well as the operator, then the display is cleared for the next number. So we'll add two variables to state, one for the number (that will be on the left-hand side of the equation) and the operator:

```
constructor() {
    super()
    this.state = {display: '0', leftnum: 0, op: ''}
}
```

And here's code for `opClick`:

```
opClick(event) {
    const { display } = this.state
    const leftnum = parseInt(display)
    const op = event.target.value
    this.setState({...this.state, display: '0', leftnum: leftnum, op: op})
}
```

We first grab the number out of the display, and convert it from a string type to an integer, then store it in our `leftnum` variable so we can use it later (when the user hits `=`). Then we grab the value for the button that was clicked, then clear out the display. You'll also need to update the `onclick` event attributes and the `value` attributes for the operator buttons:

```
<td><button className="op" onClick={opClick} value='/'>/</button></td>
```

### Checkpoint

1. Take the above example and update the `+`, `-`, `*`, and `/` buttons, then test to make sure it's working. (You might have guessed what we'll do with the `?` buttons. Ignore them for now.)

Whew, we're almost there. We finally need to hook up the `=` button. When that's clicked, if we have a value in `op`, then there's work to do. We need to do the appropriate operation with what's in `leftnum` and what's in the display, then update the display and clear out the `op` variable.

```
eqClick() {
    const {leftnum, op, display } = this.state
    if (op !== '') {
        const rightnum = parseInt(display)
        var res = 0
        if (op === '+')
            res = leftnum + rightnum
        else if (op === '-')
            res = leftnum - rightnum
        else if (op === '*')
            res = leftnum * rightnum
        else if (op === '/')
            res = leftnum / rightnum

        this.setState({...this.state, display: res.toString(), leftnum: 0, op: ''})
    }
}
```

**Note:** You'll want to clear out the `op` variable in your click function for `CE`.

### Checkpoint

1. Add the `onclick` attribute to the `=` button to call `eqElick` then test all four operators.


## Wrapping it up
1. You had to know this was coming. For each of the `?` buttons, implement your own operators. Maybe it's the `%` operator, or some trig functions, or `!`. Be creative.

## For next week

React is really cool and really popular, and there's so much more. Find other React tutorials, including the one on the [official React site](https://reactjs.org/tutorial/tutorial.html), to explore more. We're getting back into Python next week, and writing code that will run on a web server, rather than in a web browser. Think about it this way -- When you log into Amazon, you get an HTML page with JavaScript running. But Amazon also has to get data out of it's database, running on a server, to give you personalized content. Next week we'll write that server-side code, and then create a React app to fetch data from that server-side code. We'll use a framework called [Flask](https://www.fullstackpython.com/flask.html) to manage our server code.

