---
id: update-tasks 
sidebar_label: "Update Tasks"
sidebar_position: 3
---

# Update Tasks

Create **EditTask** view using stacked cli:

```shell
stacked create view edit_task
```

This command will create three files for us, [edit_task_view.dart](#edit-task-view), [edit_task_viewmodel.dart](#edit-task-viewmodel) and edit_task_viewmodel_test.dart.

:::info
When we use create view command on stacked cli, the view is added into routes property at StackedApp annotation.
:::

### Edit Task View

This view is very similar to AddTaskView, the main difference being the requirement of a Task instance passed through the constructor that is used to populate the view, as in this case, setting the text property of the text editing controllers in the onViewModelReady method.

```dart
@FormView(
  fields: [
    FormTextField(name: 'title', validator: FormValidators.title),
    FormTextField(name: 'description', validator: FormValidators.description),
  ],
)
class EditTaskView extends ViewModelBuilderWidget<EditTaskViewModel>
    with $EditTaskView {
  final Task task;
  EditTaskView({Key? key, required this.task}) : super(key: key);

  @override
  Widget builder(
    BuildContext context,
    EditTaskViewModel viewModel,
    Widget? child,
  ) {
    return Scaffold(
      appBar: AppBar(title: const Text('Flutter TodosMVVM')),
      body: Container(
        padding: const EdgeInsets.only(left: 25.0, right: 25.0),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              verticalSpaceMedium,
              const Text('Title'),
              verticalSpaceSmall,
              TextFormField(
                controller: titleController,
                focusNode: titleFocusNode,
                textAlignVertical: TextAlignVertical.top,
              ),
              if (viewModel.hasTitleValidationMessage)
                Text(viewModel.titleValidationMessage!),
              verticalSpaceMedium,
              const Text('Description'),
              verticalSpaceSmall,
              TextFormField(
                controller: descriptionController,
                focusNode: descriptionFocusNode,
                textAlignVertical: TextAlignVertical.top,
              ),
              if (viewModel.hasDescriptionValidationMessage)
                Text(viewModel.descriptionValidationMessage!),
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
                    onPressed: () {
                      if (!viewModel.canSubmit) return;

                      viewModel.update(task.id);
                    },
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
  void onViewModelReady(EditTaskViewModel viewModel) {
    listenToFormUpdated(viewModel);
    titleController.text = task.title;
    if (task.description != null) {
      descriptionController.text = task.description!;
    }
  }

  @override
  void onDispose(EditTaskViewModel viewModel) {
    disposeForm();
  }

  @override
  EditTaskViewModel viewModelBuilder(BuildContext context) {
    return EditTaskViewModel();
  }
}
```
<p align = "center">edit_task_view.dart</p>

### Edit Task ViewModel

In this case we have nothing new with respect to AddTaskViewModel.

```dart
class EditTaskViewModel extends FormViewModel {
  final _log = getLogger('EditTaskViewModel');
  final _navigationService = locator<NavigationService>();
  final _tasksService = locator<TasksService>();

  @override
  void setFormStatus() {}

  bool get canSubmit =>
      !isBusy &&
      hasTitle &&
      !hasTitleValidationMessage &&
      (hasDescription ? !hasDescriptionValidationMessage : true);

  Future<void> update(String id) async {
    setBusy(true);

    try {
      _log.d('id:$id title:$titleValue description:$descriptionValue');

      _tasksService.update(
        id: id,
        title: titleValue!,
        description: descriptionValue,
      );

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
<p align = "center">edit_task_viewmodel.dart</p>
