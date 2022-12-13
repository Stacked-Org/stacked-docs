---
id: architecture
sidebar_label: "Architecture"
sidebar_position: 1
---

# Architecture

### Stacked MVVM implementation

Stacked implementation of MVVM architecture pattern is very simple. It consists of 3 major pieces, everything else is up to your implementation style. These pieces are:

- **View**: Shows the UI to the user. Single widgets also qualify as views (for consistency in terminology) a view, in this case, is not a "Page" it's just a UI representation.
- **ViewModel**: Manages the state of the View, presentation logic, and any other logic as required from user interaction. It does this by making use of the services.
- **Services**: A wrapper of a single functionality/feature set. This is commonly used to wrap things like showing a dialog, wrapping database functionality, integrating an API, etc.

![Stacked Architecture](/img/docs/stacked-architecture.svg "MVVM Architecture")
<p align = "center">MVVM Architecture</p>

### Stacked principles

Let's go over some of those principles to follow during development.

- Views should never MAKE USE of services directly.
- Views should contain zero to (preferred) no logic. If the logic is from UI only items then we do the least amount of required logic and pass the rest to the ViewModel.
- Views should ONLY render the state in its ViewModel.
- ViewModels for widgets that represent page views are bound to a single View only.
- ViewModels may be re-used if the UI require the same functionality.
- ViewModels should not know about other ViewModels

That's quite a bit of "rules" but they help during production. Trust me.

Stacked provides you with classes and functionalities to make it easy to implement the base architecture. There are additional things that you can add to your application that will make the use of this architecture much more pleasant like navigation, dependency injection, service location, error handling, etc.
