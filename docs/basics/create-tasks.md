---
id: create-tasks
sidebar_label: "Create A Form View for Tasks"
sidebar_position: 1
---

# Create Tasks

Create **AddTask** view using stacked cli by running the following command

```shell
stacked create view add_task
```

This command will create three files for us, [add_task_view.dart](#add-task-view), [add_task_viewmodel.dart](#add-task-viewmodel) and [add_task_viewmodel_test.dart](#add-task-viewmodel-unit-tests).

## Add Task View

The `AddTaskView` contains our UI that will be shown. Lets start by looking at the View structure. As you can see we don't extend from `StatelessWidget` or `StatefulWidget` instead we extend from a `StackedView`. 

```dart
class AddTaskView extends StackedView<AddTaskViewModel> ... {
  AddTaskView({Key? key}) : super(key: key);

  @override
  // A builder function that accepts a ViewModel
  Widget builder(
    BuildContext context,
    AddTaskViewModel viewModel,
    Widget? child,
  ) {
    return Scaffold(
      ...
    );
  }

  @override
  // The builder function that constructs the ViewModel
  AddTaskViewModel viewModelBuilder(
    BuildContext context,
  ) => AddTaskViewModel(); 
}
```

### How a Stacked View Works

The singular goal of the stacked View is to "bind our ViewModel to our UI (View or Widget)". This allows us to completely separate state logic and code from our UI. The mechanism is quite simple. Here's a little diagram that visually depicts the explanation below.

[Stacked View-ViewModel binding Diagram](../../static/img/todo/view-viewmodel-relationship.png)

1. The `viewModelBuilder` creates our `ViewModel`
2. We pass that `ViewModel` to our `builder` function that accepts a `ViewModel`
3. The build function creates a UI that is shown on the device
4. The user insteracts w/ the UI
5. The interaction goes to the ViewModel, updates its state, and the ViewModel requests to `rebuildUi`
6. The `rebuildUi` call then calls the `builder` function with the updated `ViewModel` to rebuild the UI.

That's how simple the process is. And with this process you can manage 100% of all state scenarios without ever having to write state related code in your view file. 

### Forms in Stacked

As with any Todo application, we need to take in text. This requires form functionality. When using Stacked we automatically sync the values from the controller with the ViewModel, reducing the amount of boilerplate required to manage them. The start of the form functionality is to add the `FormView` annotation to your class. 

```dart
import 'package:stacked/stacked_annotations.dart';

@FormView(
  fields: [
    FormTextField(name: 'title'),
    FormTextField(name: 'description'),
  ],
)
class AddTaskView extends StackedView<AddTaskViewModel> { 
  ...
}
```

This indicates to the generator that we want to generate form code for this class. We need two text fields, so we supply two `FormTextField`'s to the `fields` list with name `title` and `description`. Now we can generate our form code.

```shell
flutter pub run build_runner build --delete-conflicting-outputs
```

This will create a new file called `add_task_view.form.dart`. It contains a mixin with the same name as the class but with a `$` infront of it, `$AddTaskView`. This file contains all your `TextEdittingControllers`, `FocusNodes` and functionality to automatically sync those with your viewmodel and some additional functionality we'll cover soon. 

#### Automatic text to ViewModel sync
The next step is to let the view know you want the text entered by the user to automatically sync to your ViewModel. To do this we have to do a few things.

1. Import the generated form file
2. Mix in the `$AddTaskView`
3. Call the `syncFormWithViewModel` function when the model is ready

```dart
import 'add_task_view.form.dart'; // 1. Import the genereated file

@FormView(
  fields: [
    FormTextField(name: 'title'),
    FormTextField(name: 'description'),
  ],
)
class AddTaskView extends StackedView<AddTaskViewModel>
    with $AddTaskView { // 2. Mix in $AddTaskView Mixin

  @override
  Widget builder(
    BuildContext context,
    AddTaskViewModel viewModel,
    Widget? child,
  ) {
    return Scaffold(
     ...
    );
  }

  @override
  void onViewModelReady(AddTaskViewModel viewModel) {
    syncFormWithViewModel(viewModel);
  }

  ...
}
```

To complete this we need to update the `AddTaskViewModel` to extend from the `FormViewModel` instead of the `BaseViewModel`.

```dart
class AddTaskViewModel extends FormViewModel {
  @override
  void setFormStatus() {}
}
```

Now the controllers can be used in any `TextWidget` that accepts a `TextEditingController` and the ViewModel will automatically be updated as that value changes.

### Basic UI

Since this is not a Flutter UI building tutorial I'll keep this short. What we want to create is the following UI

[Stacked View-ViewModel binding Diagram](../../static/img/todo/add_task_ui.png)

Now before you say anything, I know this is the most becautiful Todo UI you've ever seen. So please, if you want to give me compliments on the UI, [join our Slack](#TODO: Add Slack invite url here) where we discuss lots of cool Stacked things 😁

<details>
<summary>AddTaskView builder code</summary>
<p>
Replace your builder function in the `add_test_view.dart` file with the following.

```dart
@override
  Widget builder(
    BuildContext context,
    AddTaskViewModel viewModel,
    Widget? child,
  ) {
    return Scaffold(
      appBar: AppBar(title: const Text('Flutter TodosMV*')),
      body: Container(
        padding: const EdgeInsets.only(left: 25.0, right: 25.0),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              verticalSpaceMedium,
              const Text(
                'Title',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
              ),
              verticalSpaceSmall,
              TextFormField(
                controller: titleController,
                focusNode: titleFocusNode,
                textAlignVertical: TextAlignVertical.top,
              ),
              if (viewModel.hasTitleValidationMessage) ...[
                verticalSpaceTiny,
                Text(
                  viewModel.titleValidationMessage!,
                  style: const TextStyle(
                    color: Colors.white54,
                    fontSize: 12,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ],
              verticalSpaceMedium,
              const Text(
                'Description',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
              ),
              verticalSpaceSmall,
              TextFormField(
                controller: descriptionController,
                focusNode: descriptionFocusNode,
                textAlignVertical: TextAlignVertical.top,
              ),
              if (viewModel.hasDescriptionValidationMessage) ...[
                verticalSpaceTiny,
                Text(
                  viewModel.descriptionValidationMessage!,
                  style: const TextStyle(
                    color: Colors.white54,
                    fontSize: 12,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ],
              verticalSpaceLarge,
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                mainAxisSize: MainAxisSize.max,
                children: [
                  MaterialButton(
                    child: const Text(
                      'Accept',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    color: viewModel.canSubmit
                        ? Colors.white
                        : Colors.grey.shade700,
                    onPressed: viewModel.canSubmit ? viewModel.accept : () {},
                    padding: const EdgeInsets.symmetric(
                      horizontal: 60,
                      vertical: 20,
                    ),
                    textColor:
                        viewModel.canSubmit ? Colors.black : Colors.black45,
                  ),
                  MaterialButton(
                    child: const Text(
                      'Cancel',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    color: Colors.white,
                    onPressed: viewModel.cancel,
                    padding: const EdgeInsets.symmetric(
                      horizontal: 60,
                      vertical: 20,
                    ),
                    textColor: Colors.black,
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
```
</p>
</details>


The most important part of this UI is the fact that we don't have to manage our controllers and can simply write this. 

```dart
 TextFormField(
    controller: titleController,
    focusNode: titleFocusNode,
    textAlignVertical: TextAlignVertical.top,
  ),
```

The rest of the form functionality will be handled by our previous setup. Next up we'll tackle the state management of the form.
