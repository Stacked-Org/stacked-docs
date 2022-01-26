---
sidebar_label: "Get Started"
sidebar_position: 3
---

# Get Started

Before jumping into any code let's do a quick overview of what Stacked is. Stacked is based on a basic MVVM architecture. It consists of 3 major pieces:

- **View**: Shows the UI to the user. Single widgets also qualify as views (for consistency in terminology). A view, in this case, is not a "Page" it's just a UI representation.

- **ViewModel**: Manages the state of the View, interacts with business logic by making use of services.

- **Services**: A wrapper of a related functionality, packages or a single feature set. This is commonly used to wrap things like API integration, database operations, packages for dependency inversion, etc.

`Views` are made smart by giving it a `ViewModel`. `ViewModels` make use of `Services` to provide the functionality that the user wants to execute.

## Stacked Principles

- Views should never make use of services directly
- Views should contain zero business logic
- Views should only render the state from a single `ViewModel`

:::info

Don't worry. No need to remember this. We will remind you of it constantly throughout our docs with concrete examples of what to do instead when there's a clash.

:::
