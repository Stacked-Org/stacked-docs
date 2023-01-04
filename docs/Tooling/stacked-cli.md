---
id: stacked-cli
sidebar_label: "Stacked Cli"
sidebar_position: 5
---

# Stacked Cli [![Pub Version](https://img.shields.io/pub/v/stacked_cli)](https://pub.dev/packages/stacked_cli)

The Stacked cli is apart of the `stacked_cli` package. This CLI is made to speed up the development using the Stacked framework.

## Get Started

To get started you have to install the `stacked_cli` package on your machine

```shell
dart pub global activate stacked_cli
```

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

### Generate Stacked Code

When you've changed something manually, or added a new model. Instead of executing the command `flutter pub run build_runner build --delete-conflicting-outputs` you can simply run `stacked generate`.

## Use cli on existing project

Using the stacked cli in an existing project takes a little bit more effort than above. There's a few things you have to ensure.

1. You need to have your app file in `lib/app/app.dart`
2. If you have tests setup as presented in the [unit testing videos](https://youtu.be/5BFlo9k3KNU) your helper file should be `test/helpers/test_helpers.dart`
3. You tell stacked where to make modifications

The way we know where to add modifications into your code is by reading what we call a **template identifier**. This tells our tools, "At this position you can make a modification". At the moment we only have 2 scaffolding commands:

### Create View

This command creates all the scaffolding to add a new view into the project. 

1. Creates a new folder with the view name in `lib/ui/views/`
2. Creates a new view and viewmodel files in `lib/ui/views/view_name/`
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

Now if you run `stacked create view profile` you'll see that all the files are generated AND we also add the route into your `app.dart` file. The modifications are optional so if you don't have it they won't happen and everything else will still work. 

### Create Service

This command creates all the scaffolding to add a new service into the project.

1. Creates a new service file in `lib/services/`
2. Creates the unit tests file in `test/services/`
3. Registers the service with your `StackedApp`
4. Adds the service Mock into the test_helpers and registers it

To allow for #3 we need to add the identifier to our file that contains our dependency registrations. Open up your file that contains your `StackedApp` and add 

```dart
// @stacked-service
```

Under the last dependency registration.

To allow for #4 we need to know where to add the service Mock, it's registration and its import. Open up your test_helper.dart file and under all the imports add 

```dart
// @stacked-import
```

Underneath your last `MockSpec<T>()` add

```dart
// @stacked-mock-spec
```

Underneath your last `getAndRegisterService` that creates a mock and returns add

```dart
// @stacked-mock-create
```

Underneath your last registration in `registerServices` add 

```dart
// @stacked-mock-register
```

Now you can run `stacked create service user` and you'll see the files created plus all the registration happens.

## Config

If you want to use stacked_cli in a package that doesn't fit the structure that the cli expects then you can configure stacked to look in the correct places. Create a new file in the root of your package called `stacked.json`. Inside you can create a json body with the following properties:

- `views_path`: The relative path where views and viewmodels will be generated. The default value is: `ui/views`
- `services_path`: The relative path where services will be generated. The default value is: `services`
- `stacked_app_path`: The relative path to the file that contains the `StackedApp` setup. The default value is: `app/app.dart`
- `test_helpers_path`: The relative path to the file that contains the test_helpers (mocks, registerService, etc). Default: `helpers/test_helpers.dart`
- `test_services_path`: The relative path to where the service's unit tests will be generated. Default: `services`
- `test_views_path`: The relative path to where the viewmodel's unit tests will be generated. Default: `viewmodels`
- `locator_name`: The name of the locator that mock services are registered on. This is used when creating a new service using the `create service` command. Default: `locator`
- `register_mocks_function`: The name of the function that registers all the mocks when running a test. This is used when generating a test file during `create service` command. Default: `registerServices`

Only included the paths you want to use. If you exclude one the default value will be used for it. 

### Example

```json
{
    "stacked_app_file_path" : "app/app.dart",
    "services_path" : "services",
    "views_path" : "ui/views",
    "test_helpers_file_path" : "helpers/test_helpers.dart",
    "test_services_path" : "services",
    "test_views_path" : "viewmodels",
    "locator_name" : "locator",
    "register_mocks_function" : "registerServices",
    "v1": false, // Indicates if you want to use ViewModelBuilder(v1) or the the new StackedView (v2)
    "line_length": 80 // Passed into the flutter formatter when running cli commands
}
```
