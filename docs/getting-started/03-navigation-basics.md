---
id: navigation-basics
title: Navigation Basics
sidebar_label: Navigation Basics
---

If you've followed along from the [Beginning](./00-overview.md) you would have seen this code. 

```dart
_navigationService.replaceWith(Routes.homeView);
```

This is apart of the Stacked Services. A group of services within Stacked that helps you perform certain tasks in your code. _To learn more about What a service is, [read this](../basics-in-depth/services.md)_. 

The services we currently have are:

1. [Navigation Service][#navigation]
2. Dialog Service
3. Bottom Sheet Service
4. Snackbar Service

With more coming soon. In this doc we'll cover navigation

# Navigation

The `NavigationService` is how you navigate within the a Stacked app. It's accessible in all `ViewModels` through the locator where you can perform your navigational tasks. 

All your views will be added to `app/app.dart` when using the cli to create a view in the section below. This will generate the navigate calls for you to use.

```dart lib/app/app.dart
@StackedApp(routes: [
  MaterialRoute(page: StartupView),
  MaterialRoute(page: HomeView),
  MaterialRoute(page: CounterView),
  // @stacked-route
])
class App {}
```

## Perform a navigation

There are different types of navigations. Lets go through all of them and see what they do. 

### Navigate to a View

This is the most common navigation. This will add the `View` you are navigating too, onto the navigation stack. We do this by using the `navigateTo[ViewName]` function.

```dart
_navigationService.navigateToHomeView();
```

### Navigate to a View with Arguments

In your stacked app generated at [the beginning](./00-overview.md) open `home_view.dart` where we'll pass in a value to it through its constructor. 

```dart
class HomeView extends StackedView<HomeViewModel> {
    final int startingIndex;
  const HomeView({Key? key, required this.startingIndex}) : super(key: key);

  ...
}
```

Now run `stacked generate`. The `navigateToHomeView` call above will now have a compilation error. Since `startingIndex` is required, you will now have to pass in the value when navigating to the HomeView.

```dart
_navigationService.navigateToHomeView(startingIndex: 0);
```

### Replace with View

Another popular navigation method is to replace the current view on screen with the new one instead of stacking it ontop of it in the navigation stack. This is done by using the `replaceWith[ViewName]` function, and works much the same as above.

```dart
_navigationService.replaceWithHomeView(startingIndex: 0);
```

### Back navigation

When you want to go back 1 view to the previous view you can use the `back` function. 

```dart
_navigationService.back();
```

### Pass data to previous screen

the `back` function also takes a `result` parameter. This will pass the result back to the calling function. All navigation calls return a `Future` so they can all be awaited. 

```dart
final result = await _navigationService.replaceWithHomeView(startingIndex: 0);
print('Returned Result: $result');
```

Given the code above, when you call

```dart
_navigationService.back(result: 'From back call');
```

It will print `Returned Result: From back call`. The result is `dynamic` so you can return any object, your own class, or built in types. In addition to the basics above there are some additional functions that make some navigation tasks easier:

- **clearStackAndShow:** This will clear the entire navigation stack and then show the `HomeView`.

```dart
_navigationService.clearStackAndShow(Routes.homeView);
```

More advanved docs and tutorials for navigation is coming soon.