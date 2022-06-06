---
id: type-safe-navigation
title: "Type Safe Navigation"
sidebar_position: 2
---

# Type Safe Navigation

Until recently, navigation required some type of memorization of arguments that had to be passed along with a specific route. But now Stacked supports type-safe navigation out of the box by using extensions when generating routes. We recognized that it was a bit of an inconvenience for developers to have to know arguments for all the routes they had as we use Stacked for apps we develop ourselves. 

## Usage
To use type-safe navigation, you just have to be on the latest stacked packages and you will see `extension NavigatorStateExtension on NavigationService {` on the last part of `app.router.dart` which has type safe navigation for every route on your app.

When you need to navigate to a view, you just need to call _navigationService.navigateTo`RouteName`();. And if you have any required arguments on the route, an error line is shown right there on your IDE without building and testing the app. It also supports all the other arguments from `_navigationService.navigateTo()`.

