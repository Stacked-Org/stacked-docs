---
id: stacked-cli
sidebar_label: "Stacked Cli"
sidebar_position: 5
---

# Stacked Cli [![Pub Version](https://img.shields.io/pub/v/stacked_cli)](https://pub.dev/packages/stacked_cli)

The stacked cli is apart of the `stacked_tools` package. This CLI is made to speed up the development using the stacked framework.

## Get Started

To get started you have to install the `stacked_tools` package on your machine

```shell
dart pub global activate stacked_tools
```

This will add the stacked_tools binaries to your `pub_cache`. 

### Creating a Stacked app

To create your first stacked app all you need to do is run

```shell
stacked create app my_app
```

This will create a new flutter app based on your flutter version, add all the code required for a stacked app and generate the required code. When the command completes navigate into the my_app folder and run it. 

### Add a new view

At the root of your stacked application and type the command 

```shell
stacked create view login
```

This will create a new view called `LoginView` with its viewmodel in the `ui/views` folder. This will also create the viewmodel tests file as well as add the view to the routes in app.dart file. 

### Add a new service

At the root of your stacked application type the command

```shell
stacked create service stripe
```

This will create a new service called `StripeService` in the services folder and add it to the dependencies in the `app.core` file. 

## Use cli on existing project

Using the stacked cli in an existing project takes a little bit more effort than above. There's a few things you have to ensure.

1. You need to have your app file in `lib/app/app.dart`
2. If you have tests setup as presented in the [unit testing videos](https://youtu.be/5BFlo9k3KNU) your helper file should be `test/helpers/test_helpers.dart`
3. You tell stacked where to make modifications

The way we know where to add modifications into your code is by reading what we call a **template identifier**. This tells our tools, "At this position you can make a modification". At the moment we only have 2 scaffolding commands:

### Create View

This command creates all the scaffolding to add a new view into the project. 

1. Creates a new folder with the view name in `lib/ui/views/`
2. Creates a new view and viewmodel files in `lib/ui/views/viewName/`
3. Creates the ViewModel tests file in the `test/viewmodel_tests/` folder
4. Adds the route to the `lib/app/app.dart` file

For us to achieve #4 we need to know where to add the route and its import. To indicate that we use the **template identifiers**. Open your `lib/app/app.dart` file and underneath the last import add

```dart
// @stacked-import
```

And underneath your last route add

```dart
// @stacked-route
```

Now if you run `stacked create view myView` you'll see that all the files are generated AND we also add the route into your `app.dart` file. The modifications are optional so if you don't have it they won't happen and everything else will still work. 

### Create Service

This command creates all the scaffolding to add a new service into the project.

1. Creates a new service file in `lib/services/`
2. Creates the unit tests file in `test/services/`
3. Adds the service Mock into the test_helpers and registers it

To allow for #3 we need to know where to add the service Mock, it's registration and its import. Open up your test_helper.dart file and under all the imports add 

```dart
// @stacked-import
```

Underneath your last `MockSpec<T>()` add

```dart
// @stacked-service-mock
```

Underneath your last `getAndRegisterService` that creates a mock and returns add

```dart
// @stacked-mock-create
```

Underneath your last registration in `registerServices` add 

```dart
// @stacked-mock-register
```

Now you can run `stacked create service myService` and you'll see the files created plus all the registration happens.