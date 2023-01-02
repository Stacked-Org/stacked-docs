---
id: custom-navigation
title: "Custom Navigation"
sidebar_position: 3
---

# Custom Navigation

Stacked supports custom navigation to allow developers to use their own animation upon navigating.

## Creating custom page animation
For this example purposes we are using [animations](https://pub.dev/packages/animations) package 
```dart
import 'package:animations/animations.dart';
import 'package:flutter/material.dart';

class CustomRouteTransition {
  static Widget sharedAxis(BuildContext context, Animation<double> animation,
      Animation<double> secondaryAnimation, Widget child) {
    return SharedAxisTransition(
      animation: animation,
      secondaryAnimation: secondaryAnimation,
      transitionType: SharedAxisTransitionType.scaled,
      child: child,
    );
  }
}
```

## Defining animation on your routes

Go into `lib/app/app.dart` and add the custom animation made above to your custom route. Whenever the page is opened, it will use the animation defined. 

```dart
...
// @stacked-import
@StackedApp(routes: [
    ...
    CustomRoute(
      page: NonReactiveView,
      transitionsBuilder: CustomRouteTransition.sharedAxis,
    ),
    ...
// @stacked-route
], dependencies: [
  ...
])
class App {}
```


## Using custom animation when navigating 
If the same page is supposed to open in different animations in different places, we have got you covered. Just pass the transition when calling the `NavigationService`

```dart
_navigationService.navigateTo(
    Routes.homeView,
    transition: CustomRouteTransition.sharedAxis,
);
```