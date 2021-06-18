# About

In honour of the upcoming ten year anniversary of our bookclub, I wanted to make this app for us to track all the books we've read and discussed. Originally, our book club was pretty much a group of friendly coworkers, and now ten years later, basically none of us work at the same place anymore, we've added a bunch more members, and we've even moved out of the same city (and country). But one thing remains - we love books, we love having a low-key book club and we love cheese. The only rules of book club are that we can't talk about work and there must be cheese. You'll note that there's no rule about having read the book - I think that's one key to our longevity as a group.

# About the App

Backend - is built on supabase for authentication and database and API. I'll update with the schema I'm using once it's done. I'd originally built an older version of this using graphql on my WordPress site as a way to play around with graphql. Now that I'm using heavily using graphql in my day job (and we're considering moving away from it...), I figured I'd use this to play around with some new front-end stuff that I've been wanting to try.

Frontend - React/Typescript - this is my first time really using TS with React, although I've used is lots on nodejs backends. Not doing anything fancy, mostly just experimenting and getting a feel for the flow of typed components. And I'm using chakra-ui, which is also a big experiment. I've used other ui/component libraries before but chakra-ui feels really different (in mostly good ways) than I'm used to. I think the trick to it being actually helpful as part of a project is really the theming and then building out your own reusable implementations of components as needed.

# Why Peach Pit?

It's a long story and nothing to do with 90210, but an actual peach pit. But the 90210 diner graphics are nicer than the gross peach pit (or pits?) we found many times in a row at the same spot in the park...

# Getting started

After cloning this repo, you'll just need a simple `.env` file

```
REACT_APP_SUPABASE_URL=<>
REACT_APP_SUPABASE_ANON_KEY=<>
```

Set those up to point to your supabase instance and you'll be good to go!

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
