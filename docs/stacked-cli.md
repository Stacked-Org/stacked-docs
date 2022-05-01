---
sidebar_label: "Stacked Cli"
sidebar_position: 3
---

# Stacked Cli

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

