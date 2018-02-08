# Tic Tac Toe - React and a bit more

This project is a simple _Tic Tac Toe_ game that was inspired (not copied) by the official React tutorial, [Intro to React](https://reactjs.org/tutorial/tutorial.html).

A live version of the app can be accessed [here](https://reactjs-tictactoe.surge.sh/).

Initially, it was created to learn the basic _React_ concepts, but it turned out to be a great opportunity to learn and explore some new concepts and best practices used to develop modern front-end web applications.

Below, a summary of the technologies, libraries, tools, concepts and best practices that were used to build the project.

## React

The goal was to learn and get comfortable with the _basic_ React concepts, such as class components, functional components, state, props, JSX, PropTypes, and everything mentioned on the [Quick Start session of React docs](https://reactjs.org/docs/hello-world.html). It means that advanced scenarios, such as routing or using a state management library like _Redux_, were not covered in this project.

The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), an awesome project that hides a lot of configuration complexities, allowing us to kick off a React project very quickly.

## ECMAScript 6 (ES6)

_Create React App_ uses _Babel_ under the hood, which allows us to use ES6 features out of the box. Features like _classes_, _arrow functions_, _spread operator_, _const_ and _let_ were used everywhere in the project. A complete list of the ES6 features can be found [here](https://github.com/lukehoban/es6features).

## Styling

The CSS preprocessor [SASS](https://sass-lang.com/) (with SCSS syntax) was used to style the application. It seems to be the [preferred CSS preprocessor](https://www.sitepoint.com/front-end-tooling-trends-2017/) nowadays. The SCSS files were organized following the [7-1 architecture pattern](https://sass-guidelin.es/#the-7-1-pattern) and some tips of the [Sass Guidelines](https://sass-guidelin.es/) were adopted as well.

To better structure the CSS classes, some naming conventions were tested like BEM and OOCSS. However, after some experiments, the [SUIT name convention](https://suitcss.github.io/) was chosen because it plays well with React components. But maybe it's just a personal preference.

To ensure cross-browser consistency, [Normalize.css](https://necolas.github.io/normalize.css/) was used as well.

## Theming

The project comes with two themes, _Dark_ and _Light_. The dynamic theming mechanism was created using the power of [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables). There is a nice article about that [here](https://css-tricks.com/css-custom-properties-theming/).

## Unit tests

Unit tests were written using [Jest](https://facebook.github.io/jest/), which is integrated by default when using _Create React App_. The [Enzyme](airbnb.io/enzyme/) test utility was used to test React components.

## Linters

The project is using [ESLint](https://eslint.org), one of the most popular JavaScript linters, together with the rules provided by the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript), with just some few customizations.

The [Stylelint](https://stylelint.io/) linter, in conjunction with the SASS guidelines, is also used to format and verify the project's SCSS code.

## Package manager

[Yarn](https://yarnpkg.com) was chosen as the project package manager instead of _npm_. Although most of the problems with _npm_ were solved, it seems like Yarn still have some [advantages over npm](https://codingwithspike.wordpress.com/2017/08/11/why-im-sticking-with-yarn/).

## Visual Studio Code

The project was built using [Visual Studio Code](https://code.visualstudio.com/). Although it's not part of the project itself, it's worth mentioning it because it's a really great code editor, highly configurable and with great extensions that can help to increase productivity. These are some really useful extensions used during the project:

* **Debbuger for Chrome** - Allows run your app on Chrome and debug it inside Visual Studio Code.
* **ESLint** - Shows ESlint errors and warnings inside the editor.
* **stylelint** - Shows Stylelint errors and warnings inside the editor.
* **Prettier** - Formats JavaScript and CSS code using ESLint and Stylelint rules.
* **GitLens** - Augments the Git integration with VS Code.

## License

This project is [MIT licensed](LICENSE).
