---
id: logger
title: Logger
sidebar_label: Logger
sidebar_position: 4
tags: [logger]
---

If you want to add a Logger to your app, all you have to do is supply a logger config.

```dart
@StackedApp(
    logger: StackedLogger(),
)
```

In addition to that you have to add the `logger` package into your project's pubspec file.

```yaml
dependencies:
  ...
  logger:
```

When you run the **build_runner** it will create a new file called `app.logger.dart` in the same folder as your app folder. In that file you will see some code for the logger. The most important part of that file for you is the `getLogger` function. This function is what you'll use for logging in your app. There's a few things about how this logger is setup.

### How to use it

When using the logger provide the exact class name it's being used in. To make use of a logger you'll do the following.

```dart
class MyViewModel {
  final logger = getLogger('MyViewModel');

  void doStuff() {
    logger.i('');
  }
}
```

The code above will print out the following.

```
💡 MyViewModel | doStuff
```

It will automatically print out the name of the function that it's in. This can only be done if we know the exact class name that the logger is for. Which is why that's so important.

### Avoid clash with getLogger

If you already have `getLogger` function in your code base and you want to use a different name you can supply that to the logger config.

```dart
@StackedApp(
logger: StackedLogger(
    logHelperName: 'getStackedLogger',
  )
)
```

Now the function to get your logger will be called `getStackedLogger`. If you want a more detailed guide on how to effectively log in your application read [this guide](https://www.filledstacks.com/post/flutter-logging-a-guide-to-use-it-effectively/) that we use for our production apps.
