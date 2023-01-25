# Development

This document describes the process for running this application on your local computer.

## Getting started

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Requirements

Node.js version 16.14 or above.

### Installation

In the directory containing package.json, run your package manager's install command:

npm
```
$ npm install
```

yarn
```
$ yarn install
```

### Build

Docusaurus is a modern static website generator so we need to build the website into a directory of static contents and put it on a web server so that it can be viewed. To build the website:

npm
```
$ npm run build
```

yarn
```
$ yarn build
```

and contents will be generated within the /build directory, which can be copied to any static file hosting service like GitHub pages, Vercel or Netlify.

### Running the development server

To preview your changes as you edit the files, you can run a local development server that will serve your website and reflect the latest changes.

npm
```
$ npm run start
```

yarn
```
$ yarn start
```

By default, a browser window will open at http://localhost:3000.