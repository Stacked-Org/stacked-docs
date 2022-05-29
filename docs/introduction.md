---
id: introduction
sidebar_label: "What is Stacked"
sidebar_position: 0
---

# Introduction

Stacked is a production framework for Flutter. For teams or solo developers that require high quality code, Stacked simplifies the development and maintenance of production ready Flutter applications. Built by [FilledStacks](https://www.youtube.com/filledstacks), a mobile software development agency with experience using Native iOS and Android, Xamarin and now Flutter has build over 30 applications. We know what is required to build big, **scalable**, **testable** and **maintanable applications**, this is the core focus of Stacked.

- **Scalable**: Stacked is built to make your team scalable and keep your productivity high. With good code conventions and a strong opinion on how to develop functionality, you or your team will have a clear guide around adding and maintaining features.

- **Testable**: We put an emphasis on unit tests and our MVVM architecture is desiged to make unit testing any part of your business logic or state as easy as possible. By splitting your UI from your Business and State logic it's easier to unit. 

- **Maintainable**: We have strong opinions on separation of concerns, that with our strict code principles will all you to scale your code consistently and without worry of turning into spaghetti as you grow.

## Why Stacked?

Flutter allows you to build your UI using code. This means that everything in Flutter is a widget. While this is incredibly powerful, with great power comes great responsibility. The ease of writing Flutter, without clear conventions, often leads to untestable spaghetti code. Maintenance, testing and readabiliy of your code becomes more difficult which means over time you slow down. Stacked uses the MVVM architecture to ensure that your logic is always testable, your widgets are simpler to write and your repository structure remains clean even as your project grows. Overtime, Stacked helps you to keep moving fast.  


:::info

Like what you hear? [Get Started](get-started.md) and start building

:::

## What is Stacked Not

### ONLY State Management

Stacked is not **ONLY** a Flutter state management solution. It's a Framework built ontop of Flutter. It provides all the building blocks for the basics that you would require, built in a way that makes Flutter more fun and even easier to use. What exactly makes stacked a Framework? There are a few things you need to technically qualify as a Framework.

- **Routing** :white_check_mark:
- **State Management** :white_check_mark: :fire:
- **Devtools**: :white_check_mark:
- **Documentation**: Right here :white_check_mark:
- **IDE Support**: In Progress :woman-running:

We don't have everything ticked off, but in this year (2022) we will be pushing hard to get it done.

### Pro Flutter

Stacked does not "force flutter to be something else". Stacked simply adds a thin layer of abstraction on top of Flutter to make development, testing and maintenance a first class citizen in your code health. We have abstracted the use of `BuildContext` in cases where it makes sense but we are not against the `BuildContext`. We have 1 simple rule, no UI (Flutter framework) code in our `ViewModels` and that simple rule is there for a single reason, as soon as you add that in, you take the unit testabillity of your `ViewModels` away. As we've said, unit testing is important to us. We want unit tests, not tests dependent on Flutter to start up. So ... no UI code in your ViewModels.

Stacked is built for Flutter, using Flutter and we think it's the best way to develop and scale code bases for Flutter applications.
