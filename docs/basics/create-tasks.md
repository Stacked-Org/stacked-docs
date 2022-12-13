---
id: create-tasks
sidebar_label: "Create Tasks"
sidebar_position: 1
---

# Create Tasks

Create **AddTask** view using stacked cli:

```shell
stacked create view add_task
```

This command will create three files for us, [add_task_view.dart](#add-task-view), [add_task_viewmodel.dart](#add-task-viewmodel) and [add_task_viewmodel_test.dart](#add-task-viewmodel-unit-tests), as long as the rest of the code to make them functional. We only have to worry about the content of those files.

:::note
As a reminder, when we display a piece of code, in general, we are going to use the final version of it and, of course, we are going to explain the most important parts. So, in this example, the files are not the ones which were created by the *create view* command, they are the modified versions in their final state.
:::

### Add Task View

Here is where should create the presentation of our view, the UI.

:::caution
TODO: Replace ViewModelBuilderWidget with the new StackedView
:::

```dart
@FormView(
  fields: [
    FormTextField(name: 'title', validator: FormValidators.title),
    FormTextField(name: 'description', validator: FormValidators.description),
  ],
)
class AddTaskView extends ViewModelBuilderWidget<AddTaskViewModel>
    with $AddTaskView {
  AddTaskView({Key? key}) : super(key: key);

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

  @override
  void onViewModelReady(AddTaskViewModel viewModel) {
    listenToFormUpdated(viewModel);
  }

  @override
  void onDispose(AddTaskViewModel viewModel) {
    disposeForm();
  }

  @override
  AddTaskViewModel viewModelBuilder(BuildContext context) {
    return AddTaskViewModel();
  }
}
```
<p align = "center">add_task_view.dart</p>

One of the features we are going to explain on this view is forms handling where we automatically sync the values from the controller with the ViewModel, reducing the amount of boilerplate required to manage them.

### Form Setup

To make use of the form functionality, we use the `@FormView` annotation on the View. It will tell the generator what to include when generating. We can see at the top of AddTaskView class that we added two `FormTextField` items in fields list which accepts `FormField` types. A FormTextField requires a name which is used to create a **TextEdigintController** and a **FocusNode**.

### Generate Form Mixin

Run the following command on your terminal to generate `add_task_view.form.dart` which has a mixin holding TextEditingControllers, FocusNodes, and extensions to set validation messages.

```shell
flutter pub run build_runner build --delete-conflicting-outputs
```

For this case, generates:

- TextEdigintController:
    - titleController
    - descriptionController
- FocusNodes
    - titleFocusNode
    - descriptionFocusNode

### Use Form Mixin

In the view, import the generated file add_task_view.form.dart and extend AddTaskView with $AddTaskView mixin.

To automatically sync the controllers with the viewmodel, you must call `listenToFormUpdated` in onViewModelReady and pass it the model which needs to be FormViewModel type, reason why AddTaskViewModel extends from FormViewModel as you can see below when we show [AddTaskViewModel](#addtaskviewmodel) code.

### Form Validation

To use form validation on your TextEditingControllers you can supply your own custom unit testable validator inside FormTextField. The validator property on FormTextField expects a method that takes a String and returns a nullable String.

Don't forget to run the build runner to update the generated file.

```shell
flutter pub run build_runner build --delete-conflicting-outputs
```

The validator is executed for every character and the value returned is stored in [field_name]ValidationMessage. In addition to that, there's also a boolean value called has[field_name]ValidationMessage which indicates if a validation message is present.

The common way to conditionally show a validation message is to make use of the boolean mentioned above and the validation message value. See an example below.

```dart
if (viewModel.hasTitleValidationMessage) Text(viewModel.titleValidationMessage!),
```

The last thing to mention about the view is that in `onDispose` method we call `disposeForm` and is because the values of the TextEditingControllers are cached but, in this case, we want the input fields to be empty when we navigate back to this view.

### Add Task ViewModel

Here is where should add the presentation logic for our view.

```dart
class AddTaskViewModel extends FormViewModel {
  final _log = getLogger('AddTaskViewModel');
  final _navigationService = locator<NavigationService>();
  final _tasksService = locator<TasksService>();

  @override
  void setFormStatus() {}

  bool get canSubmit =>
      !isBusy &&
      hasTitle &&
      !hasTitleValidationMessage &&
      (hasDescription ? !hasDescriptionValidationMessage : true);

  Future<void> accept() async {
    setBusy(true);

    try {
      _log.d('title:$titleValue description:$descriptionValue');

      _tasksService.add(title: titleValue!, description: descriptionValue);

      _navigationService.back();
    } catch (e) {
      _log.e(e.toString());
    }

    setBusy(false);
  }

  void cancel() {
    _navigationService.back();
  }
}
```
<p align = "center">add_task_viewmodel.dart</p>

As AddTaskViewModel extends FormViewModel, we need to override `setFormStatus` to set a global validation message in case of error. If we don't want a global validation message we can leave the method empty as in the code above.

On this viewmodel there are two main dependencies, **NavigationService** and **TasksService**, used to complete our requirement. The first dependency is just used to navigate `back` to HomeView. The second is used to create a task by calling `add` method.

Observe how we get `canSubmit` value to enable or not the submit button of the form. This way we can easily unit test form submission.

### Add Task ViewModel Unit Tests

Here is where should add the unit tests for code coverage of the presentation logic.

```dart
void main() {
  AddTaskViewModel _getModel() => AddTaskViewModel();

  group('AddTaskViewModel Tests -', () {
    setUp(() => registerServices());
    tearDown(() => locator.reset());

    group('canSubmit -', () {
      test('When called, should returns True', () {
        final model = _getModel();

        model.formValueMap['title'] = 'title';
        model.formValueMap['description'] = 'description';

        expect(model.canSubmit, isTrue);
      });

      test('When called and model isBusy, should returns False', () {
        final model = _getModel();

        model.setBusy(true);

        expect(model.canSubmit, isFalse);
      });

      test('When called and has NOT title, should returns False', () {
        final model = _getModel();

        model.setBusy(false);
        model.formValueMap['description'] = 'description';

        expect(model.canSubmit, isFalse);
      });

      test('When called and hasTitleValidationMessage, should returns False',
          () {
        final model = _getModel();

        model.setBusy(false);
        model.formValueMap['title'] = 'a';
        model.setValidationMessages({
          TitleValueKey: 'Please enter a title that\'s 3 characters or longer',
        });

        expect(model.canSubmit, isFalse);
      });

      test(
          'When called, hasDescription and hasDescriptionValidationMessage is False, should returns False',
          () {
        final model = _getModel();

        model.setBusy(false);
        model.formValueMap['title'] = 'abcd';
        model.formValueMap['description'] = 'abc';
        model.setValidationMessages({
          DescriptionValueKey:
              'Please enter a description that\'s 6 characters or longer',
        });

        expect(model.canSubmit, isFalse);
      });
    });

    group('accept -', () {
      test('When called, should adds task to tasks list', () async {
        final tasksService = getAndRegisterTasksService();
        final model = _getModel();

        model.formValueMap['title'] = 'title';
        model.formValueMap['description'] = 'description';
        await model.accept();

        verify(tasksService.add(
          title: anyNamed('title'),
          description: anyNamed('description'),
        ));
      });

      test('When called, should navigates back to HomeView', () async {
        final navigationService = getAndRegisterNavigationService();
        final model = _getModel();

        model.formValueMap['title'] = 'title';
        model.formValueMap['description'] = 'description';
        await model.accept();

        verify(navigationService.back());
      });
    });

    group('cancel -', () {
      test('When called, should navigates back to HomeView', () {
        final navigationService = getAndRegisterNavigationService();
        final model = _getModel();

        model.cancel();

        verify(navigationService.back());
      });
    });
  });
}
```
<p align = "center">add_task_viewmodel_test.dart</p>

See how easy it is to test all the presentation logic. If you want to practice `Test Driven Development`, just start at this point by defining the unit tests first and then implement the code that passes those tests in the viewmodel.
