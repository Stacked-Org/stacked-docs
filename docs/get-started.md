---
sidebar_label: "Get Started"
sidebar_position: 1
---

# Get Started

Before jumping into any code let's do a quick overview of what Stacked is. Stacked is based on a basic MVVM architecture. It consists of 3 major pieces:

- **View**: Shows the UI to the user. Single widgets also qualify as views (for consistency in terminology). A view, in this case, is not a "Page" it's just a UI representation.

- **ViewModel**: Manages the state of the View, interacts with business logic by making use of services.

- **Services**: A wrapper of related functionality, packages or a single feature set. This is commonly used to wrap things like API integration, database operations, packages for dependency inversion, etc.

`Views` are made smart by giving it a `ViewModel`. `ViewModels` make use of `Services` to provide the functionality that the user wants to execute.

## Stacked Principles

- Views should never make use of services directly
- Views should contain zero business logic
- Views should only render the state from a single `ViewModel`
- A `ViewModel` should not know about another `ViewModel`

:::info

Don't worry. No need to remember this. We will remind you of it constantly throughout our docs with concrete examples of what to do instead when there's a clash.

:::

## Installation

We start by adding `stacked` to our pubspec.yaml

```yaml
    stacked:
```

## Basic Usage

Now that we have it installed lets go over the most basic usage of stacked. Binding your View to a ViewModel. We'll start from the beginning which is creating a flutter app. 

:::info

These steps assume that you have everything setup for flutter to run. If you don't follow these [Flutter setup instructions](https://docs.flutter.dev/get-started/install)

:::

### Creating a Flutter app

Run the flutter command

```shell
flutter create stacked_app
```

Then you can open this in VS code or your editor of choice.