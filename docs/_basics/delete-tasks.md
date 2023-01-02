---
id: delete-tasks
sidebar_label: "Delete Tasks"
sidebar_position: 4
---

# Delete Tasks

To implement the requirement to delete a task we use Dismissible Widget that is a common practice to remove an item in a list.

```dart
class TaskTile extends StatelessWidget {
  final Future<bool> Function(Task)? confirmDismiss;
  final void Function(String)? onDismissed;
  final void Function(Task)? onTap;
  final void Function(String)? onToggle;
  final Task task;
  const TaskTile({
    super.key,
    this.confirmDismiss,
    this.onDismissed,
    this.onTap,
    this.onToggle,
    required this.task,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Dismissible(
      key: Key(task.id),
      direction: onDismissed != null
          ? DismissDirection.endToStart
          : DismissDirection.none,
      child: ListTile(
        contentPadding: const EdgeInsets.all(0.0),
        onTap: () => onTap?.call(task),
        leading: IconButton(
          onPressed: () => onToggle?.call(task.id),
          icon: task.isCompleted
              ? const Icon(Icons.check_box_outlined)
              : const Icon(Icons.check_box_outline_blank),
        ),
        title: Text(
          task.title,
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
        ),
        subtitle: task.description != null
            ? Text(
                task.description!,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              )
            : null,
      ),
      onDismissed: (direction) => onDismissed?.call(task.id),
      confirmDismiss: (direction) async => confirmDismiss?.call(task),
      background: ColoredBox(
        color: theme.colorScheme.error,
        child: const Align(
          alignment: Alignment.centerRight,
          child: Padding(
            padding: EdgeInsets.all(16.0),
            child: Icon(Icons.delete, color: Colors.white),
          ),
        ),
      ),
    );
  }
}
```
<p align = "center">task_tile.dart</p>

We put again the focus on HomeViewModel where we have two methods that are used to remove the listed tasks.

We use `confirmDismiss` method to ask the user delete confirmation, and when is granted we proceed.

On `remove` method, apart from removing the task from the list, we cached it to use it later if the user wants to undo the removing process.

```dart
void remove(String id) {
    _log.i('id:$id');

    final removedIndex = _tasksService.tasks.indexWhere((t) => t.id == id);
    if (removedIndex == -1) return;

    final removedTask = _tasksService.remove(id);

    _snackbarService.showCustomSnackBar(
      variant: SnackbarType.custom,
      title: 'Task Deleted',
      message: 'Task [${removedTask!.title}] was deleted.',
      duration: const Duration(seconds: 5),
      mainButtonTitle: 'Undo',
      onMainButtonTapped: () {
        _tasksService.undoTaskRemoved(task: removedTask, index: removedIndex);
        _snackbarService.closeSnackbar();
      },
    );
}

Future<bool> confirmDismiss(Task task) async {
    _log.i('task:$task');
    final response = await _dialogService.showCustomDialog(
      variant: DialogType.custom,
      title: 'Are you sure?',
      description: '''
        You are going to delete the following task:

        ${task.title}
      ''',
      mainButtonTitle: 'Yes',
      secondaryButtonTitle: 'No',
    );

    _log.d('confirm:${response?.confirmed}');

    if (!(response?.confirmed ?? true)) return false;

    return true;
}
```
<p align = "center">home_viewmodel.dart</p>
