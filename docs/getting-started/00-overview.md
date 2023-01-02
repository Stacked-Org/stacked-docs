---
id: overview
sidebar_label: What is Stacked
sidebar_position: 0
---

Stacked is a production framework built in Flutter. For teams or solo developers that require high quality code, Stacked simplifies the development and maintenance of production Flutter applications. Built by [FilledStacks](https://www.youtube.com/filledstacks), a mobile software development agency with experience using Native iOS and Android, Xamarin and now Flutter has build over 30 applications. We know what is required to build big, **scalable**, **testable** and **maintanable applications**, this is the core focus of Stacked.

- **Scalable**: Stacked is built to make your team scalable and keep your productivity high. With good code conventions and a strong opinion on how to develop functionality, you or your team will have a clear guide around adding and maintaining features.

- **Testable**: We put an emphasis on unit tests and our MVVM architecture is desiged to make unit testing any part of your business logic or state as easy as possible.

- **Maintainable**: We have strong opinions on separation of concerns. This in combination with our strict coding principles will allow you to scale your code consistently and without worry of turning into spaghetti as you grow.

Now with its own CLI, it makes it even easier to get into Stacked.


# Get Started

:::info Installation Tip
Make sure you have Flutter installed and setup. If not head over to [Flutter Install](https://docs.flutter.dev/get-started/install) to get is setup
:::

To start with stacked install the stacked_tools package through pub by running 

```shell
dart pub global activate stacked_tools
```

This will give you access to all the stacked goodies. 

## Create a Stacked App

To create your first app run 

```shell
stacked create app my_first_app
```

This will create your stacked flutter application. Connect a device or an emulator and run the app using the normal flutter command. 

```shell
flutter run
```

You should see a loading screen with loading indicator and then a view with a counter and some buttons. This starting point gives you the basics of what's required for a Stacked Application. It has the following setup:

- State management 
- Start up logic functionality
- Navigation
- Dialog UI builders
- BottomSheet UI builder
- Dependency Inversion
- Unit tests example

Everything to build a production flutter app with your team. 