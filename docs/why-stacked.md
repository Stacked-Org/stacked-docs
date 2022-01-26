---
sidebar_label: "Why Stacked"
sidebar_position: 0
---

# What is Stacked

Stacked is the production framework for Flutter. For teams or solo developers that require production level code, Stacked makes it easy to achieve. [FilledStacks](https://www.youtube.com/filledstacks) is a mobile software development agency with experience using Native, Xamarin and now Flutter to develop over 30 applications for large companies. We know what is required to build big, **scalable**, **testable** and **maintanable applications**, this is the core focus of Stacked.

- **Scalable**: Stacked is built to make your team scalable and keep your productivity high. With strict principles and a strong opinion on how to develop functionality, you or your team will have a clear guide around adding or maintaining features.

- **Testable**: We put an emphasis on unit tests and our architecture is desiged to make unit testing any part of your business logic or state as easy as possible.

- **Maintainable**: With the strong opinions we have and strict principles to follow your code base can scale consistently and without worry of turning into spaghetti as you grow.

## Why Stacked?

Flutter is a framework that allows you to build your UI using code. This is amazing, but also dangerous. If there is not careful thought put into keeping these two separate, you will end up with UI files that are mixed with business logic and that proves almost impossible to unit test. Maintenance, testing and readabiliy of your code becomes more difficult which means over time you slow down. Stacked aims to do the opposite. Overtime, when using Stacked it actually makes you move faster. With our structure and guides you'll be able to build extremely large applications and feel like you're still working on a simple 2 screen application.

:::info

We work with many teams of developers, we're certain using our framework will benefit your code health, quality and maintenance in the long run.

:::

## What is Stacked Not

### State Management

Stacked is not **ONLY** a Flutter state management solution. It's a Framework built ontop of Flutter. It provides all the building blocks for the basics that you would require, built in a way that makes Flutter more fun and even easier to use. What exactly makes stacked a Framework? There are a few things you need to technically qualify as a Framework.

- **Routing** :white_check_mark:
- **State Management** :white_check_mark: :fire:
- **Devtools**: In Progress :man-running:
- **IDE Support**: In Progress :woman-running:
- **Documentation**: Right here :eyes:

We don't have everything ticked off, but in this year (2022) we will be making waves with how easy development with Stacked is.

### Anti-Flutter

Stacked does not "force flutter to be something else". Stacked simply adds a thin layer of abstraction on top of Flutter to make development, testing and maintenance a first class citizen in your code health. We have abstracted the use of `BuildContext` in cases where it makes sense but we are not against the `BuildContext`. We have 1 simple rule, no UI (framework engine) code in our `ViewModels` and that simple rule is there for a single reason, as soon as you add that in, you take the unit testabillity of your `ViewModels` away. As we've said, unit testing is important to us. We want unit tests, not tests dependent on Flutter to start up. So ... no UI code in your ViewModels.

Stacked is built for Flutter, using Flutter and we think it's the best way to develop and scale code bases for mobile applications.
