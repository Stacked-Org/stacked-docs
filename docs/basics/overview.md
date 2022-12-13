---
id: basics-overview
sidebar_label: "Overview"
sidebar_position: 0
---

# Overview

In this section, we are going to build a ToDo app using `Stacked`. The complete code of the application can be accessed [here](https://github.com/ferrarafer/stacked_todos), feel free to clone the project and try the app if you are confortable with the basics topics, otherwise, if you are starting with `Stacked` and their ecosystem, I would suggest to complete this section to cover the main concepts of a real example.

![todos-stacked-demo.gif](todos-stacked-demo.gif)

### Create project

We already seen how to create a project with stacked cli on [getting-started](/docs/getting-started/quick-start) section but let's do it again to start our new project for this app.

```shell
stacked create app todos
```

When a project is created we get two views by default, startup and home views. We are going to use them for loading resources when app starts and shows list of tasks, respectively. But we are going back to this views later.

### Install packages

Add the following packages which are going to help us to build the app.

- **frezzed**: code generation for immutable classes that has a simple syntax/API without compromising on the features.
- **freezed_annotation**: annotations for `frezzed` code-generator.
- **json_serializable**: automatically generate code for converting to and from JSON by annotating Dart classes.
- **json_annotation**: classes and helper functions that support JSON code generation via the `json_serializable` package.
- **logger**: small, easy to use and extensible logger which prints beautiful logs.
- **shared_preferences**: package for reading and writing simple key-value pairs.

Firstly, we will focus on how to create a task using the only model we are going to need to accomplish all requirements, **Task** model. Can be seen in details below.

### Task Model
```dart
import 'package:flutter/foundation.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'task.freezed.dart';
part 'task.g.dart';

@freezed
class Task with _$Task {
  const Task._();

  factory Task({
    required String id,
    required String title,
    String? description,
    @Default(false) bool isCompleted,
  }) = _Task;

  factory Task.fromJson(Map<String, Object?> json) => _$TaskFromJson(json);

  bool get hasDescription => description != null;
}
```
<p align = "center">task.dart</p>

:::note
TODO: Research if we can use the code from GitHub repository directly instead of copy / paste the code.
https://github.com/ferrarafer/stacked_todos/blob/0804fd2c83a85d02477f1ad5cc33e33c3a891e95/lib/models/task/task.dart#L1-L21
:::

Thanks to the recently installed packages, this is the only thing we need to write to have our model ready, just run the following command and the rest of the functionality will be auto generated.

```shell
flutter pub run build_runner build --delete-conflicting-outputs
```

If there were no errors which the executed command, you are going to see two new files, `task.freezed.dart` and `task.g.dart`.
