---
id: quick-start
sidebar_label: "Quick Start"
sidebar_position: 2
---

# Quick Start

:::info Installation Tip
Make sure you have Flutter installed and setup. If not, head over to [Flutter Install](https://docs.flutter.dev/get-started/install) to get is setup
:::

To start with stacked, install the `stacked_tools` package by running.

```shell
dart pub global activate stacked_tools
```

This will give you access to all the stacked goodies. 

## Create project 

To create your first app run the following command in the command line.

```shell
stacked create app my_first_app
```

This will create your stacked flutter application and it should be ready to run. Connect a device or an emulator and run the app with the following command.

```shell
flutter run
```

You should see `startup_view` with a loading indicator. After 3 seconds, app navigates to `home_view` which has a counter and some buttons. This starting point gives you the basics of what's required for flutter. It has the following setup:

- State management 
- Start up logic functionality
- Navigation
- Dialog UI builders
- BottomSheet UI builder
- Dependency Inversion
- Unit tests example

Everything to build a production flutter app with your team. 

## HomeView overview

The HomeView (as all other views) extends from a `StackedView<T>`. The type `T` has to be a ViewModel or any class that extends `ChangeNotifier`.

This class is the core of our state management solution. When the ViewModel supplied as `T` calls notifyListeners the build method fires and passes through the latest version of the ViewModel.

At this point your UI will rebuild with the new state values in the viewmodel.

## HomeViewModel overview

When we look at the `HomeViewModel` you'll see a basic Dart class, and that's the goal of Stacked. The only code that should look like Flutter code is the View/Widget code. Everything else should look like a normal Dart class and Dart code.

This class controls when your build function in the view is fired to rebuild the UI. When you call notifyListeners like in the incrementCounter function then the builder will fire and you'll get the viewmodel in the function where you can read the new value and display it in the UI.

Furthermore, if we take a look at `test/viewmodels/home_viewmodel_test.dart`, we can see how easy is to test the use cases of the presentation logic.
