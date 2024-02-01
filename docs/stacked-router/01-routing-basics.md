---
id: routing-basics
title: Routing Setup
sidebar_label: Routing Setup
---

Stacked has been device installed, app-only since the beginning of the product. We never intended to support web through Stacked because we never intended to build anything using Flutter web. That has changed as it has now become a viable web-building framework for building applications. 

For that reason, we recently introduced a new service to Stacked that has better support for the web. It’s called the `RouterService`. This is the service that serves the same purpose as the `NavigationSevice` but is better suited for navigation on the web. The setup for the `RouterService` has one extra step compared to the `NavigationService`.

_This setup is included if you generate a `Stacked` project using the`—t web` option when creating an app with the CLI._

# Web Navigation Setup

To use the web-supported navigation in Stacked you have to remove the `NavigationService` from your `app.dart` file and replace it with the `RouterService`.

```dart
@StackedApp(
	routes: [ ... ],
	dependencies: [
    LazySingleton(classType: RouterService),
    LazySingleton(classType: DialogService),
    LazySingleton(classType: BottomSheetService),
	]
)
class App {}
```

The next thing to do is to tell the generator to use the v2 version of the generator which generates a `StackedRouter` based on the Flutter V2 navigator. Create a file in the root project called `build.yaml`

```dart
 targets:
  $default:
    builders:
      stacked_generator|stackedRouterGenerator:
        options:
          navigator2: true
```

Here we’re simply we’re telling the `stackedRouterGenerator` that we want it to use `navigator2`. That’s all you need to get the setup working. Below are some frequently asked questions about the `RouterService`

# FAQ RouterService

## How is this different from the Navigation Service?

The `NavigationService` is based on Flutter’s v1 navigator, the `RouterService` is based on Flutter’s v2 navigator. Both work on all the platforms, the benefit of the v2 navigator os that it’s better suited to handle url navigation. If you are building an app that will require specific url style navigation when deployed to web then you should build your app using the `RouterService`. If you’re not going to web you can stick with the `NavigationService`

## Why not have only one service?

That’s what we’re working towards. Eventually we’ll replace the `NavigationService` with the `RouterService`. We’re keeping it separate for now to ensure no older projects break and to see how many users start using it. Both do the same thing so we can “silently” replace the navigation service with the router service and everything should still work as expected. 

## Does it work with Mobile?

Yes. The `RouterService` works the same as the `NavigationService`. The only difference is that it has more functionality catered towards url-style navigation. Things like dynamic path segments, route redirects, queryParameters and route guarding. 

If you have more frequently asked questions please post them in the discussions on git or in the [community discord](https://discord.gg/SAsvNZRep3).