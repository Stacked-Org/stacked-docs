---
id: navigation-basics
title: Navigation Basics
sidebar_label: Navigation basics
---

If you've followed along from the [Beginning](./00-overview.md) you would have seen this code:

```dart
_navigationService.replaceWith(Routes.homeView);
```

Navigation is part of Stacked Services, a group of services within Stacked that helps you perform certain tasks in your code. _To learn more about What a service is, [read this](../basics-in-depth/services.md)_.

The services currently included are:

1. [Navigation Service][#navigation]
2. Dialog Service
3. Bottom Sheet Service
4. Snackbar Service

...with more coming soon. In this doc we'll cover navigation.


# Navigation

The `NavigationService` is how you navigate within a Stacked app. It's accessible in all `ViewModels` through the locator where you can perform your navigational tasks.

Your Views will automatically be added to `app/app.dart` in the section below, when using the CLI to create a View. This will generate the navigation calls for you to use:

```dart lib/app/app.dart
@StackedApp(routes: [
  MaterialRoute(page: StartupView),
  MaterialRoute(page: HomeView),
  MaterialRoute(page: CounterView),
  // @stacked-route
])
class App {}
```


## Perform a Navigation

There are different navigation types. Lets go through all of them and see what they do.

### Navigate to a View

This is the most common navigation. This will add the `View` that you are navigating to onto the navigation stack. We do this by using the `navigateTo[ViewName]` function:

```dart
_navigationService.navigateToHomeView();
```

### Navigate to a View with Arguments

In your Stacked app generated at [the beginning](./00-overview.md), open `home_view.dart` where we'll pass in a value to it through its constructor:

```dart
class HomeView extends StackedView<HomeViewModel> {
  final int startingIndex;
  const HomeView({Key? key, required this.startingIndex}) : super(key: key);
  ...
}
```

Now run `stacked generate`. You will notice that the `navigateToHomeView` call above will now have a compilation error. Since `startingIndex` is required, you will have to pass in the `startingIndex` value when navigating to the HomeView:

```dart
_navigationService.navigateToHomeView(startingIndex: 0);
```

### Replace with View

Another popular navigation method is to replace the current View on screen with the new one, instead of adding it to the top of the navigation stack. This is done by using the `replaceWith[ViewName]` function and works much the same as above:

```dart
_navigationService.replaceWithHomeView(startingIndex: 0);
```

### Back Navigation

When you want to go back one View to the previous View, you can use the `back` function:

```dart
_navigationService.back();
```

### Pass Data to the Previous View

The `back` function also takes a `result` parameter. This will pass the result back to the calling function. All navigation calls return a `Future` so that they can all be awaited:

```dart
final result = await _navigationService.replaceWithHomeView(startingIndex: 0);
print('Returned result: $result');
```

Given the code above, when you call:

```dart
_navigationService.back(result: 'From back call');
```

It will print `Returned result: From back call`. The result is `dynamic` so you can return any object, your own class, or built in types. In addition to the basics above, there are some additional functions that make some navigation tasks easier:

- **clearStackAndShow:** This will clear the entire navigation stack and then show the `HomeView`:

```dart
_navigationService.clearStackAndShow(Routes.homeView);
```

More advanced docs and tutorials for navigation are coming soon.