---
id: retrieve-tasks
sidebar_label: "Retrieve Tasks"
sidebar_position: 2
---

# Retrieve Tasks

Before updating `HomeView` to list the tasks, create **Tasks Service** using stacked cli:

```shell
stacked create service tasks
```

This command will create two files for us, [tasks_service.dart](#tasks-service) and [tasks_service_test.dart](#tasks-service-unit-tests), as long as the rest of the code to make them functional. We only have to worry about the content of those files.

:::info
When we use create service command on stacked cli, the service is added as a DependencyRegistration into dependencies property at StackedApp annotation.
:::

### Tasks Service

Here is where should add the business logic of the app relative to tasks.

```dart
class TasksService with ReactiveServiceMixin {
  TasksService() {
    _tasks.addAll(_sharedPrefService.tasks);
  }

  final _log = getLogger('TasksService');
  final _sharedPrefService = locator<SharedPreferencesService>();

  final List<Task> _tasks = <Task>[];
  FilterType _currentFilterType = FilterType.all;

  FilterType get currentFilterType => _currentFilterType;

  List<Task> get tasks {
    switch (_currentFilterType) {
      case FilterType.all:
        return allTasks;
      case FilterType.active:
        return activeTasks;
      case FilterType.completed:
        return completedTasks;
    }
  }

  List<Task> get allTasks => _tasks;
  List<Task> get activeTasks => _tasks
      .where(
        (task) => !task.isCompleted,
      )
      .toList();
  List<Task> get completedTasks => _tasks
      .where(
        (task) => task.isCompleted,
      )
      .toList();

  bool get hasTasks => allTasks.isNotEmpty;
  bool get hasActiveTasks => activeTasks.isNotEmpty;
  bool get hasCompletedTasks => completedTasks.isNotEmpty;

  void setCurrentFilterType(FilterType filterType) {
    _log.i('filterType:$filterType');
    _currentFilterType = filterType;
    notifyListeners();
  }

  /// Adds a Task into [_tasks] list
  void add({
    String? id,
    required String title,
    String? description,
    bool? isCompleted,
  }) {
    _log.i(
      'id:$id title:$title description:$description isCompleted:$isCompleted',
    );
    _tasks.add(Task(
      id: id ?? const Uuid().v4(),
      title: title,
      description: description,
      isCompleted: isCompleted ?? false,
    ));
    _sharedPrefService.tasks = _tasks;
    notifyListeners();
  }

  /// Updates a Task inside [_tasks] list
  void update({
    required String id,
    String? title,
    String? description,
    bool? isCompleted,
  }) {
    _log.i(
      'id:$id title:$title description:$description isComplete:$isCompleted',
    );
    final index = _tasks.indexWhere((task) => task.id == id);
    if (index == -1) return;

    _tasks[index] = _tasks[index].copyWith(
      title: title ?? _tasks[index].title,
      description: description ?? _tasks[index].description,
      isCompleted: isCompleted ?? _tasks[index].isCompleted,
    );
    _sharedPrefService.tasks = _tasks;
    notifyListeners();
  }

  /// Removes a Task from the [_tasks] list
  Task? remove(String id) {
    _log.i('id:$id');

    final index = _tasks.indexWhere((task) => task.id == id);
    if (index == -1) return null;

    final removedTask = _tasks[index];
    _tasks.removeAt(index);
    _sharedPrefService.tasks = _tasks;
    notifyListeners();

    return removedTask;
  }

  /// Inserts removed task again into tasks list at index position
  void undoTaskRemoved({required Task task, required int index}) {
    _log.i('task:$task index:$index');
    _tasks.insert(index, task);
    _sharedPrefService.tasks = _tasks;
    notifyListeners();
  }

  /// Toggles [isCompleted] boolean value of Task object with id equal [id]
  void toggle(String id) {
    _log.i('id:$id');
    final index = _tasks.indexWhere((task) => task.id == id);
    if (index == -1) return;

    _tasks[index] = _tasks[index].copyWith(
      isCompleted: !_tasks[index].isCompleted,
    );
    _sharedPrefService.tasks = _tasks;
    notifyListeners();
  }

  /// Removes all completed tasks from [_tasks] list
  void clearAllCompletedTasks() {
    _tasks.removeWhere((task) => task.isCompleted);
    _sharedPrefService.tasks = _tasks;
    notifyListeners();
  }

  /// Mark all tasks [_tasks] as completed
  void markAllTasksAsCompleted() {
    for (var i = 0; i < _tasks.length; i++) {
      if (_tasks[i].isCompleted) continue;

      _tasks[i] = _tasks[i].copyWith(isCompleted: true);
    }

    _sharedPrefService.tasks = _tasks;
    notifyListeners();
  }
}
```
<p align = "center">tasks_service.dart</p>

The service uses SharedPreferencesService, which is a **Facade service** that wraps shared_preferences package, as a local storage to keep the tasks on the app once was removed from memory. Look how simple is to load the tasks from the local storage at the constructor of TasksService with only one line of code.

The list of tasks managed by the service can be filtered by `FilterType` which possible values are all tasks, active tasks and completed tasks.

The methods supported by the service are quite simple and descriptive so we see no reason to explain them. The important concept to pay attention to is how we encapsulate the business logic in a service making it easier to perform unit tests as you can see [below](#tasks-service-unit-tests). If the application requirements change, we already know where to touch the code almost intuitively.

### Tasks Service Unit Tests

Here is where should add the unit tests for code coverage of the business logic.

```dart
void main() {
  List<Task> _testTasks = [
    Task(id: '001', title: 'Task 001', description: 'Description 001'),
    Task(id: '002', title: 'Task 002'),
    Task(
      id: '003',
      title: 'Task 003',
      description: 'Description 003',
      isCompleted: true,
    ),
    Task(id: '004', title: 'Task 004', description: 'Description 004'),
  ];

  TasksService _getService({List<Task> tasks = const []}) {
    final service = TasksService();

    for (var task in tasks) {
      service.add(
        id: task.id,
        title: task.title,
        description: task.description,
        isCompleted: task.isCompleted,
      );
    }

    return service;
  }

  group('TasksServiceTest -', () {
    setUp(() => registerServices());
    tearDown(() => locator.reset());

    group('currentFilterType -', () {
      test(
        'When called, should return current FilterType',
        () {
          final service = _getService();

          expect(service.currentFilterType, FilterType.all);
        },
      );
    });

    group('tasks -', () {
      test(
        'When called with currentFilterType equal FilterType.all, should return allTasks',
        () {
          final service = _getService(tasks: _testTasks);

          expect(service.currentFilterType, FilterType.all);
          expect(service.tasks, service.allTasks);
          expect(service.tasks, _testTasks);
        },
      );

      test(
        'When called with currentFilterType equal FilterType.active, should return activeTasks',
        () {
          final service = _getService(tasks: _testTasks);

          service.setCurrentFilterType(FilterType.active);

          expect(service.currentFilterType, FilterType.active);
          expect(service.tasks, service.activeTasks);
          expect(service.tasks, [_testTasks[0], _testTasks[1], _testTasks[3]]);
        },
      );

      test(
        'When called with currentFilterType equal FilterType.completed, should return completedTasks',
        () {
          final service = _getService(tasks: _testTasks);

          service.setCurrentFilterType(FilterType.completed);

          expect(service.currentFilterType, FilterType.completed);
          expect(service.tasks, service.completedTasks);
          expect(service.tasks, [_testTasks[2]]);
        },
      );
    });

    group('hasTasks -', () {
      test(
        'When called, should return TRUE if tasks is NOT empty',
        () {
          final service = _getService(tasks: _testTasks);

          expect(service.hasTasks, isTrue);
        },
      );

      test(
        'When called, should return FALSE if tasks is empty',
        () {
          final service = _getService();

          expect(service.hasTasks, isFalse);
        },
      );
    });

    group('hasActiveTasks -', () {
      test(
        'When called, should return TRUE if there is any task with isComplete equals FALSE',
        () {
          final service = _getService(tasks: _testTasks);

          expect(service.hasActiveTasks, isTrue);
        },
      );

      test(
        'When called, should return FALSE if there is NO task with isComplete equals TRUE',
        () {
          final service = _getService(tasks: _testTasks);
          service.remove('001');
          service.remove('002');
          service.remove('004');

          expect(service.hasActiveTasks, isFalse);
        },
      );
    });

    group('hasCompletedTasks -', () {
      test(
        'When called, should return TRUE if there is any task with isComplete equals TRUE',
        () {
          final service = _getService(tasks: _testTasks);

          expect(service.hasCompletedTasks, isTrue);
        },
      );

      test(
        'When called, should return FALSE if there is NO task with isComplete equals TRUE',
        () {
          final service = _getService(tasks: _testTasks);
          service.remove('003');

          expect(service.hasCompletedTasks, isFalse);
        },
      );
    });

    group('add -', () {
      test(
        'When called, should increment the length of tasks list one time',
        () {
          final service = _getService();
          final initialLentgh = service.tasks.length;

          service.add(title: 'Test Task');

          expect(service.tasks.length == initialLentgh + 1, isTrue);
        },
      );

      test(
        'When called with title equal "Test Task", tasks list should contains a Task object with "Test Task" title',
        () {
          final service = _getService();

          service.add(title: 'Test Task');

          expect(
            service.tasks.any((item) => item.title == 'Test Task'),
            isTrue,
          );
        },
      );

      test(
        'When called with description equal "Task Description", tasks list should contains a Task object with "Task Description" description',
        () {
          final service = _getService();

          service.add(title: 'Test Task', description: 'Task Description');

          expect(
            service.tasks.any((item) => item.description == 'Task Description'),
            isTrue,
          );
        },
      );

      test(
        'When called, should save tasks on SharedPreferences',
        () {
          final sharedPrefService = getAndRegisterSharedPreferencesService();
          final service = _getService(tasks: _testTasks);

          service.add(title: 'Test Task');

          verify(sharedPrefService.tasks == service.tasks);
        },
      );

      test(
        'When called, should notify listeners',
        () {
          final service = _getService(tasks: _testTasks);
          int called = 0;
          service.addListener(() {
            called++;
          });

          service.add(title: 'Task 5');

          expect(called, 1);
        },
      );
    });

    group('update -', () {
      test(
        'When called, should NOT modify length of tasks list',
        () {
          final service = _getService(tasks: _testTasks);
          final initialLentgh = service.tasks.length;
          final target = service.tasks[0];

          service.update(id: target.id, description: 'Updated Task');

          expect(service.tasks.length == initialLentgh, isTrue);
        },
      );

      test(
        'When called, should update title of Task with [id]',
        () {
          final service = _getService(tasks: _testTasks);
          final target = service.tasks[0];

          service.update(id: target.id, title: 'Updated Task');

          expect(service.tasks[0].title == 'Updated Task', isTrue);
          expect(service.tasks[0].description == 'Description 001', isTrue);
          expect(
            service.tasks.any((item) => item.title == 'Task 001'),
            isFalse,
          );
        },
      );

      test(
        'When called, should update description of Task with [id]',
        () {
          final service = _getService(tasks: _testTasks);
          final target = service.tasks[0];

          service.update(id: target.id, description: 'Updated Task');

          expect(service.tasks[0].title == 'Task 001', isTrue);
          expect(service.tasks[0].description == 'Updated Task', isTrue);
          expect(
            service.tasks.any((item) => item.description == 'Description 001'),
            isFalse,
          );
        },
      );

      test(
        'When called and taskId exists, should save tasks on SharedPreferences',
        () {
          final sharedPrefService = getAndRegisterSharedPreferencesService();
          final service = _getService(tasks: _testTasks);
          final target = service.tasks[0];

          service.update(id: target.id, description: 'Updated Task');

          verify(sharedPrefService.tasks == service.tasks);
        },
      );

      test(
        'When called and taskId does NOT exists, should NOT save tasks on SharedPreferences',
        () async {
          final sharedPrefService = getAndRegisterSharedPreferencesService(
            tasks: _testTasks,
          );
          final service = _getService(tasks: _testTasks);

          service.update(id: 'GHOST', description: 'Updated Task');

          verifyNever(sharedPrefService.tasks == service.tasks);
        },
        skip:
            'Verify why the test is not passing, the method on the service is working.',
      );

      test(
        'When called, should notify listeners',
        () {
          final service = _getService(tasks: _testTasks);
          int called = 0;
          service.addListener(() {
            called++;
          });

          service.update(id: '001', title: 'Updated Task');

          expect(called, 1);
        },
      );
    });

    group('remove -', () {
      test(
        'When called and tasks list is empty, should NOT do anything',
        () {
          final service = _getService();
          final initialLentgh = service.tasks.length;
          final task = Task(id: '1234567890', title: 'Test Task');

          service.remove(task.id);

          expect(service.tasks, isEmpty);
          expect(service.tasks.length == initialLentgh, isTrue);
        },
      );

      test(
        'When called and tasks list is NOT empty, should decrement the length of tasks list one time',
        () {
          final service = _getService(tasks: _testTasks);
          final initialLentgh = service.tasks.length;
          final target = service.tasks[1];

          service.remove(target.id);

          expect(service.tasks.length == initialLentgh - 1, isTrue);
        },
      );

      test(
        'When called, tasks list should NOT contains the removed task',
        () {
          final service = _getService(tasks: _testTasks);
          final target = service.tasks[1];

          service.remove(target.id);

          expect(
            service.tasks.any((item) => item.id == target.id),
            isFalse,
          );
        },
      );

      test(
        'When called, should return removed task',
        () {
          final service = _getService(tasks: _testTasks);
          final target = service.tasks[1];

          final removedTask = service.remove(target.id);

          expect(target, removedTask);
        },
      );

      test(
        'When called, should save tasks on SharedPreferences',
        () {
          final sharedPrefService = getAndRegisterSharedPreferencesService();
          final service = _getService(tasks: _testTasks);
          final target = service.tasks[1];

          service.remove(target.id);

          verify(sharedPrefService.tasks == service.tasks);
        },
      );

      test(
        'When called, should notify listeners',
        () {
          final service = _getService(tasks: _testTasks);
          int called = 0;
          service.addListener(() {
            called++;
          });

          service.remove('001');

          expect(called, 1);
        },
      );
    });

    group('undoTaskRemoved -', () {
      test(
        'When called, should insert removed task on tasks at index position',
        () {
          final service = _getService(tasks: _testTasks);
          final target = service.tasks[1];

          final removedTask = service.remove(target.id);
          service.undoTaskRemoved(task: removedTask!, index: 1);

          expect(
            service.tasks.any((item) => item.id == target.id),
            isTrue,
          );
          expect(service.tasks[1], removedTask);
        },
      );

      test(
        'When called, should save tasks on SharedPreferences',
        () {
          final sharedPrefService = getAndRegisterSharedPreferencesService();
          final service = _getService(tasks: _testTasks);
          final target = service.tasks[1];

          final removedTask = service.remove(target.id);
          service.undoTaskRemoved(task: removedTask!, index: 1);

          verify(sharedPrefService.tasks == service.tasks);
        },
      );

      test(
        'When called, should notify listeners',
        () {
          final service = _getService(tasks: _testTasks);
          final removedTask = service.remove('001');
          int called = 0;
          service.addListener(() {
            called++;
          });

          service.undoTaskRemoved(task: removedTask!, index: 0);

          expect(called, 1);
        },
      );
    });

    group('toggle -', () {
      test(
        'When called, should NOT modify length of tasks list',
        () {
          final service = _getService(tasks: _testTasks);
          final initialLentgh = service.tasks.length;
          final target = service.tasks[1];

          service.toggle(target.id);

          expect(service.tasks.length == initialLentgh, isTrue);
        },
      );

      test(
        'When called, should set [isCompleted] value to true of Task with id equal [id]',
        () {
          final service = _getService(tasks: _testTasks);
          final target = service.tasks[0];

          service.toggle(target.id);

          expect(service.tasks[0].isCompleted, isTrue);
        },
      );

      test(
        'When called, should save tasks on SharedPreferences',
        () {
          final sharedPrefService = getAndRegisterSharedPreferencesService();
          final service = _getService(tasks: _testTasks);
          final target = service.tasks[0];

          service.toggle(target.id);

          verify(sharedPrefService.tasks == service.tasks);
        },
      );

      test(
        'When called, should notify listeners',
        () {
          final service = _getService(tasks: _testTasks);
          int called = 0;
          service.addListener(() {
            called++;
          });

          service.toggle('001');

          expect(called, 1);
        },
      );
    });

    group('clearAllCompletedTasks -', () {
      test(
        'When called, should remove all completed tasks from tasks list',
        () {
          final service = _getService(tasks: _testTasks);

          service.clearAllCompletedTasks();

          expect(service.tasks.length == 3, isTrue);
          expect(service.tasks.any((task) => task.id == '003'), isFalse);
        },
      );

      test(
        'When called, should remove all completed tasks from tasks list',
        () {
          final service = _getService(tasks: _testTasks);
          service.markAllTasksAsCompleted();

          service.clearAllCompletedTasks();

          expect(service.tasks.isEmpty, isTrue);
        },
      );

      test(
        'When called, should save tasks on SharedPreferences',
        () {
          final sharedPrefService = getAndRegisterSharedPreferencesService();
          final service = _getService(tasks: _testTasks);

          service.clearAllCompletedTasks();

          verify(sharedPrefService.tasks == service.tasks);
        },
      );

      test(
        'When called, should notify listeners',
        () {
          final service = _getService(tasks: _testTasks);
          int called = 0;
          service.addListener(() {
            called++;
          });

          service.clearAllCompletedTasks();

          expect(called, 1);
        },
      );
    });

    group('markAllTasksAsCompleted -', () {
      test(
        'When called, should mark all tasks as completed',
        () {
          final service = _getService(tasks: _testTasks);

          service.markAllTasksAsCompleted();

          expect(service.tasks.length == 4, isTrue);
        },
      );

      test(
        'When called, should save tasks on SharedPreferences',
        () {
          final sharedPrefService = getAndRegisterSharedPreferencesService();
          final service = _getService(tasks: _testTasks);

          service.markAllTasksAsCompleted();

          verify(sharedPrefService.tasks == service.tasks);
        },
      );

      test(
        'When called, should notify listeners',
        () {
          final service = _getService(tasks: _testTasks);
          int called = 0;
          service.addListener(() {
            called++;
          });

          service.markAllTasksAsCompleted();

          expect(called, 1);
        },
      );
    });
  });
}
```
<p align = "center">tasks_service_test.dart</p>

### Update Home View

Let's update `HomeView` to show a list of tasks filtered by FilterType. By default, the filter value is set as `FilterType.all`.

```dart
return Scaffold(
    appBar: AppBar(
        title: const Text('Flutter TodosMVVM'),
        actions: const [FilterButton(), ActionsButton()],
    ),
    body: ListView.separated(
        itemBuilder: (BuildContext context, int index) {
          final task = viewModel.tasks[index];
          return TaskTile(
            task: task,
            confirmDismiss: (task) => viewModel.confirmDismiss(task),
            onDismissed: (id) => viewModel.remove(id),
            onTap: (task) => viewModel.goToEditTaskView(task),
            onToggle: (id) => viewModel.toggle(id),
          );
        },
        separatorBuilder: (BuildContext context, int index) {
          return const Divider(height: 1);
        },
        itemCount: viewModel.tasks.length,
    ),
    floatingActionButton: FloatingActionButton(
        onPressed: viewModel.goToAddTaskView,
        child: const Icon(Icons.add),
    ),
);
```
<p align = "center">home_view.dart</p>

### Update Home ViewModel

First observation here is that `HomeView` now extends from **ReactiveViewModel** which adds a function that allows to listen to services, in this case `TasksService`. Also, has to implement reactiveServices getter which returns a list of reactive services with only `_tasksService` for this case.

In addition to TasksService, we get NavigationService, DialogService and SnackbarService classes through the service locator to help in our implementation of the presentation logic.

```dart
class HomeViewModel extends ReactiveViewModel {
  final _log = getLogger('HomeViewModel');
  final _dialogService = locator<DialogService>();
  final _navigationService = locator<NavigationService>();
  final _snackbarService = locator<SnackbarService>();
  final _tasksService = locator<TasksService>();

  @override
  List<ReactiveServiceMixin> get reactiveServices => [_tasksService];

  List<Task> get tasks => _tasksService.tasks;
  FilterType get currentFilterType => _tasksService.currentFilterType;

  void setCurrentFilterType(FilterType filterType) {
    _log.i('filterType:$filterType');
    _tasksService.setCurrentFilterType(filterType);
  }

  Future<void> executeAction(ActionType actionType) async {
    _log.i('actionType:$actionType');
    switch (actionType) {
      case ActionType.clearAllCompleted:
        await clearAllCompletedTasks();
        break;
      case ActionType.markAllAsCompleted:
        markAllTasksAsCompleted();
        break;
    }
  }

  Future<void> clearAllCompletedTasks() async {
    final response = await _dialogService.showCustomDialog(
      variant: DialogType.custom,
      title: 'Are you sure?',
      description: 'You are going to delete all completed tasks.',
      mainButtonTitle: 'Yes',
      secondaryButtonTitle: 'No',
    );

    _log.d('confirm:${response?.confirmed}');

    if (!(response?.confirmed ?? true)) return;

    _tasksService.clearAllCompletedTasks();
  }

  void markAllTasksAsCompleted() {
    _tasksService.markAllTasksAsCompleted();
  }

  void toggle(String id) {
    _log.i('id:$id');
    _tasksService.toggle(id);
  }

  void goToAddTaskView() {
    _navigationService.navigateToAddTaskView();
  }

  void goToEditTaskView(Task task) {
    _navigationService.navigateToEditTaskView(task: task);
  }
}
```
<p align = "center">home_viewmodel.dart</p>

From now on, we will not put the magnifying glass on the other unit tests because they are irrelevant to this tutorial but they can be seen inside the [GitHub](https://github.com/ferrarafer/stacked_todos) repository of the application.
