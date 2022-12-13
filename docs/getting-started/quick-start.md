---
id: quick-start
sidebar_label: "Quick Start"
sidebar_position: 2
---

# Quick Start

:::info Installation Tip
Make sure you have Flutter installed and setup. If not, head over to [Flutter Install](https://docs.flutter.dev/get-started/install) to get is setup
:::

To start with stacked install the `stacked_tools` package through pub by running the following command.

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

Let's describe the main widgets of the view.

- A Text which shows "Hello, STACKED!".
- A MaterialButton which shows the counterLabel and calls incrementCounter on viewmodel when pressed.
- A MaterialButton which calls showDialog on viewmodel when pressed.
- A MaterialButton which calls showBottomSheet on viewmodel when pressed.

## HomeViewModel overview

Let's describe how the presentation logic is managed on the viewmodel.

- An integer private variable is defined as _counter and initialized to 0.
- A String public variable is defined as counterLabel which shows the value of _counter.
- A method called incrementCounter which increase _counter and rebuild the HomeView with notifyListeners.
- A method called showDialog which shows a custom Dialog.
- A method called showBottomSheet which shows a custom BottomSheet.

The most important part of the presentation logic takes place on incrementCounter method because uses notifyListeners method to update the state of the view. This is how Stacked notifies the framework that the internal state of the object, in this case _counter, has changed.

Furthermore, if we take a look at `test/viewmodels/home_viewmodel_test.dart`, we can see how easy is to test the use cases of the presentation logic.
