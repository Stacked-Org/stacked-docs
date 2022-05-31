---
id: stacked-setup
title: Stacked Setup
sidebar_position: 0
---

## Application Setup

:::info Non cli users

If you generated your app with the cli then this doesn't apply. 

:::

In addition to providing state management it's been clear that every stacked application also requires the following functionality:

- Navigation setup to make it accessible from the `ViewModels`
- Dependency registration for service location
- A Logger formatted to improve code maintenance and awareness of application inner workings

To use this functionality it's quite simple, add the [stacked_generator] package to your application and if you don't have `build_runner` add that in as well.

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

In that file we define a class called App and we annotate it with `StackedApp`. This annotation class takes in `routes` and `dependencies`. This is all generated for you when you create an app with the cli.
