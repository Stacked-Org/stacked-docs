---
id: stacked-app
title: Stacked App
sidebar_position: 0
---

## Application Setup

In addition to providing state management it's been clear that every stacked application also requires the following functionality:

- Navigation setup to make it accessible from the `ViewModels`
- Dependency registration for service location
- A Logger formatted to improve code maintenance and awareness of application inner workings

From v 1.9.0 and onward we have the functionality to generate this code for the user. This will remove the reliance on auto_route as well as injectable. To use this functionality it's quite simple. Add the [stacked_generator] package to your application and if you don't have `build_runner` add that in as well.

```yaml
dev_dependencies:
  ...
  build_runner:
  stacked_generator:
```

In the lib folder create a new folder called `app`. In that folder create a file called `app.dart`.

```dart
@StackedApp()
class App {
  /** This class has no puporse besides housing the annotation that generates the required functionality **/
}
```

In that file we define a class called App and we annotate it with `StackedApp`. This annotation class takes in `routes` and `dependencies`.
