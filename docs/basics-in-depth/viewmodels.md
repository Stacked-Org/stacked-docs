---
id: viewmodels
title: View Models
sidebar_label: View Models
sidebar_position: 1
---


# What is a View Model?

As we saw in previous chapters, a ViewModel is simply a Dart class that extends `ChangeNotifier` and is responsible for the presentation logic of the View, managing its state and performing actions for users as they interact with the View.


## BaseViewModel

The `default` ViewModel of the Stacked architecture with **busy state** and **error state** handling. Allows you to set either state based on an object passed to it, most likely a property on the extended ViewModel. It came from the need to have busy states for multiple values in the same ViewModels without relying on implicit state values. It also contains a helper function to indicate busy while a Future is running. This way we avoid having to call `setBusy` before and after each Future call.

To use the BaseViewModel you can extend it and make use of the busy functionality as follows.

```dart
class WidgetOneViewModel extends BaseViewModel {
  Human _currentHuman;
  Human get currentHuman => _currentHuman;

  void setBusyOnProperty() {
    setBusyForObject(_currentHuman, true);
    // Fetch updated human data
    setBusyForObject(_currentHuman, false);
  }

  void setModelBusy() {
    setBusy(true);
    // Do things here
    setBusy(false);
  }

  Future longUpdateStuff() async {
    // Sets busy to true before starting future and sets it to false after executing
    // You can also pass in an object as the busy object. Otherwise it'll use the ViewModel
    var result = await runBusyFuture(updateStuff());
  }

  Future updateStuff() {
    return Future.delayed(const Duration(seconds: 3));
  }
}
```

This makes it convenient to use in the UI in a more readable manner.

```dart
class WidgetOneView extends StackedView<WidgetOneViewModel> {
  const WidgetOneView({Key? key}) : super(key: key);

  @override
  Widget builder(
    BuildContext context,
    WidgetOneViewModel viewModel,
    Widget? child,
  ) {
    return GestureDetector(
        onTap: () => viewModel.longUpdateStuff(),
        child: Container(
          width: 100,
          height: 100,
          // Use isBusy to check if the ViewModel is set to busy
          color: viewModel.isBusy ? Colors.green : Colors.red,
          alignment: Alignment.center,
          // A bit silly to pass the same property back into the ViewModel
          // but here it makes sense
          child: viewModel.busy(viewModel.currentHuman)
              ? Center(
                  child: CircularProgressIndicator(),
                )
              : Container(/* Human Details styling */)
        ),
      ),
    );
  }
}
```

All the major functionality for the BaseViewModel is shown above.

### Busy handling

Stacked makes it easier for you to indicate to the UI if your ViewModel is busy or not through by providing some utility functions. Lets look at an example. When you run a future and you want to indicate to the UI the ViewModel is busy you would use the `runBusyFuture`.

```dart
class BusyExampleViewModel extends BaseViewModel {
 Future longUpdateStuff() async {
    // Sets busy to true before starting future and sets it to false after executing
    // You can also pass in an object as the busy object. Otherwise it'll use the ViewModel
    var result = await runBusyFuture(updateStuff());
  }

  Future updateStuff() {
    return Future.delayed(const Duration(seconds: 3));
  }
}
```

This will set the busy property using `this` as the key so you can check if the future is still running by calling `isBusy` on the ViewModel. If you want to assign it a different key, in the example of a `CartView` where you have multiple items listed. When increasing the quantity of an item you want only that item to show a busy indicator. For that you can also supply a key to the `runBusyFuture` function.

```dart
const String BusyObjectKey = 'my-busy-key';

class BusyExampleViewModel extends BaseViewModel {
  Future longUpdateStuff() async {
    // Sets busy to true before starting future and sets it to false after executing
    // You can also pass in an object as the busy object. Otherwise it'll use the ViewModel
    var result = await runBusyFuture(updateStuff(), busyObject: BusyObjectKey);
  }

  Future updateStuff() {
    return Future.delayed(const Duration(seconds: 3));
  }
}
```

Then you can check the busy state using that busy key and calling `viewModel.busy(BusyObjectKey)`. The key should be any unique value that won't change with the busy state of the object. In the example mentioned above you can use the id of each of the cart products to indicate if it's busy or not. This way you can show a busy state for each of them individually.

### Error Handling

The same way that the busy state is set you also get an error state. When you use one of the specialty `ViewModels` or the future helper functions. `runBusyFuture` or `runErrorFuture` stacked will store the exception thrown in the `ViewModel` for you to use. It will follow the same rules as the busy above and will assign the exception to the `ViewModel` or the key passed in. Lets look at some code.

```dart
class ErrorExampleViewModel extends BaseViewModel {
 Future longUpdateStuff() async {
    // Sets busy to true before starting future and sets it to false after executing
    // You can also pass in an object as the busy object. Otherwise it'll use the ViewModel
    var result = await runBusyFuture(updateStuff());
  }

  Future updateStuff() async {
    await Future.delayed(const Duration(seconds: 3));
    throw Exception('Things went wrong');
  }
}
```

After 3 seconds this future will throw an error. It will automatically catch that error, set the view back to not busy and then save the error. When no key is supplied to `runBusyFuture` you can check if there's an error using the `hasError` property. You can also get the actual exception from the `modelError` property. If you do supply a key however then you can get the exception back using the error function.

```dart
const String BusyObjectKey = 'my-busy-key';

class BusyExampleViewModel extends BaseViewModel {
  Future longUpdateStuff() async {
    // Sets busy to true before starting future and sets it to false after executing
    // You can also pass in an object as the busy object. Otherwise it'll use the ViewModel
    var result = await runBusyFuture(updateStuff(), busyObject: BusyObjectKey);
  }

  Future updateStuff() {
    return Future.delayed(const Duration(seconds: 3));
  }
}
```

In this case the error can be retrieved using `viewModel.error(BusyObjectKey)` or you can simply check if there is an error for the key using `viewModel.hasErrorForKey(BusyObjectKey)`. If you want to react to an error from your future you can override `onFutureError` which will return the exception and the key you used for that future. The Specialty `ViewModels` have their own onError override but this one can be used in there as well if needed.


## Special View Models

In addition to the BaseViewModel, Stacked includes a number of special ViewModels that reduce the boilerplate code required for common use cases. These are described below.

### ReactiveViewModel

This ViewModel extends the `BaseViewModel` and adds a function that allows you to listen to services that are being used in the ViewModel. There are two things you have to do to make a ViewModel react to changes in a service.

1. Extend from `ReactiveViewModel`.
2. Implement `listenableServices` getter that returns a list of listenable services.

```dart
class AnyViewModel extends ReactiveViewModel {
  final _postsService = locator<PostsService>();

  int get postCount => _postsService.postCount;

  @override
  List<ListenableServiceMixin> get listenableServices => [_postsService];
}
```

On the Service side, the Service has to use the `ListenableServiceMixin` and pass to `listenToReactiveValues` the properties to be listened to.

```dart
class PostService with ListenableServiceMixin {
  PostService {
    listenToReactiveValues([_postCount]);
  }

  int _postCount = 0;
  int get postCount => _postCount;

  Future<void> increment() async {
    _postCount++;
    notifyListeners(); // ViewModels listening postCount value are notified and their View is rebuild
  }
}
```

### StreamViewModel

This `ViewModel` extends the `BaseViewModel` and provides functionality to easily listen and react to stream data. It allows you to supply a `Stream` of type `T` which it will subscribe to, manage subscription (dispose when done), and give you callbacks where you can modify/manipulate the data. It will automatically rebuild the `View` as new stream values come in. It has 1 required override which is the stream getter and 4 optional overrides.

- **stream**: Returns the `Stream` you would like to listen to
- **onData**: Called after the view has rebuilt and provides you with the data to use
- **onCancel**: Called after the stream has been disposed
- **onSubscribed**: Called when the stream has been subscribed to
- **onError**: Called when an error is sent over the stream

```dart
// ViewModel
class StreamCounterViewModel extends StreamViewModel<int> {

  String get title => 'This is the time since epoch in seconds \n $data';

  @override
  Stream<int> get stream => locator<EpochService>().epochUpdatesNumbers();
}

// View
class StreamCounterView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ViewModelBuilder<StreamCounterViewModel>.reactive(
      builder: (context, viewModel, child) => Scaffold(
            body: Center(
              child: Text(viewModel.title),
            ),
          ),
      viewModelBuilder: () => StreamCounterViewModel(),
    );
  }
}

// Service (registered using injectable, NOT REQUIRED)
@lazySingleton
class EpochService {
  Stream<int> epochUpdatesNumbers() async* {
    while (true) {
      await Future.delayed(const Duration(seconds: 2));
      yield DateTime.now().millisecondsSinceEpoch;
    }
  }
}
```

The code above will listen to a stream and provide you the data to rebuild with. You can create a `ViewModel` that listens to a stream with two lines of code.

```dart
class StreamCounterViewModel extends StreamViewModel<int> {
  @override
  Stream<int> get stream => locator<EpochService>().epochUpdatesNumbers();
}
```

Besides having the onError function you can override the `ViewModel` will also set the hasError property to true for easier checking on the view side. The `onError` callback can be used for running additional actions on failure and the `hasError` property should be used when you want to show error specific UI.

### FutureViewModel

This `ViewModel` extends the `BaseViewModel` to provide functionality to easily listen to a Future that fetches data. This requirement came off a Details view that has to fetch additional data to show to the user after selecting an item. When you extend the `FutureViewModel` you can provide a type which will then require you to override the future getter where you can set the future you want to run.

The future will run after the ViewModel has been created automatically.

```dart
class FutureExampleViewModel extends FutureViewModel<String> {
  @override
  Future<String> futureToRun() => getDataFromServer();

  Future<String> getDataFromServer() async {
    await Future.delayed(const Duration(seconds: 3));
    return 'This is fetched from everywhere';
  }
}
```

This will automatically set the view's isBusy property and will indicate false when it's complete. It also exposes a `dataReady` property that can be used. This will indicate true when the data is available. The `ViewModel` can be used in a view as follows.

```dart
class FutureExampleView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ViewModelBuilder<FutureExampleViewModel>.reactive(
      builder: (context, viewModel, child) => Scaffold(
        body: Center(
          // viewModel will indicate busy until the future is fetched
          child: viewModel.isBusy ? CircularProgressIndicator() : Text(viewModel.data),
        ),
      ),
      viewModelBuilder: () => FutureExampleViewModel(),
    );
  }
}
```

The `FutureViewModel` will also catch an error and indicate that it has received an error through the `hasError` property. You can also override the onError function if you want to receive that error and perform a specific action at that point.

```dart
class FutureExampleViewModel extends FutureViewModel<String> {
  @override
  Future<String> get future => getDataFromServer();

  Future<String> getDataFromServer() async {
    await Future.delayed(const Duration(seconds: 3));
    throw Exception('This is an error');
  }

  @override
  void onError(error) {
  }
}
```

The hasError property can be used in the view the same way as the isBusy property.

```dart
class FutureExampleView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ViewModelBuilder<FutureExampleViewModel>.reactive(
      builder: (context, viewModel, child) => Scaffold(
        body: viewModel.hasError
            ? Container(
                color: Colors.red,
                alignment: Alignment.center,
                child: Text(
                  'An error has occered while running the future',
                  style: TextStyle(color: Colors.white),
                ),
              )
            : Center(
                child: viewModel.isBusy
                    ? CircularProgressIndicator()
                    : Text(viewModel.data),
              ),
      ),
      viewModelBuilder: () => FutureExampleViewModel(),
    );
  }
}
```

### MultipleFutureViewModel

In addition to being able to run a Future, you also make a view react to data returned from multiple futures. It requires you to provide a map of type string along with a Function that returns a Future that will be executed after the `ViewModel` has been constructed. See below for an example of using a `MultipleFutureViewModel`.

```dart
import 'package:stacked/stacked.dart';

const String _NumberDelayFuture = 'delayedNumber';
const String _StringDelayFuture = 'delayedString';

class MultipleFuturesExampleViewModel extends MultipleFutureViewModel {
  int get fetchedNumber => dataMap[_NumberDelayFuture];
  String get fetchedString => dataMap[_StringDelayFuture];

  bool get fetchingNumber => busy(_NumberDelayFuture);
  bool get fetchingString => busy(_StringDelayFuture);

  @override
  Map<String, Future Function()> get futuresMap => {
        _NumberDelayFuture: getNumberAfterDelay,
        _StringDelayFuture: getStringAfterDelay,
      };

  Future<int> getNumberAfterDelay() async {
    await Future.delayed(Duration(seconds: 2));
    return 3;
  }

  Future<String> getStringAfterDelay() async {
    await Future.delayed(Duration(seconds: 3));
    return 'String data';
  }
}
```

The data for the future will be in the `dataMap` when the future is complete. Each future will individually be set to busy using the key for the future passed in. With these functionalities, you'll be able to show a busy indicator for the UI that depends on the future's data while it's being fetched. There's also a `hasError` function which will indicate if the Future for a specific key has thrown an error.

```dart
class MultipleFuturesExampleView extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return ViewModelBuilder<MultipleFuturesExampleViewModel>.reactive(
      builder: (context, viewModel, child) => Scaffold(
            body: Center(
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: <Widget>[
                  Container(
                    width: 50,
                    height: 50,
                    alignment: Alignment.center,
                    color: Colors.yellow,
                    // Show busy for number future until the data is back or has failed
                    child: viewModel.fetchingNumber
                        ? CircularProgressIndicator()
                        : Text(viewModel.fetchedNumber.toString()),
                  ),
                  SizedBox(
                    width: 20,
                  ),
                  Container(
                    width: 50,
                    height: 50,
                    alignment: Alignment.center,
                    color: Colors.red,
                    // Show busy for string future until the data is back or has failed
                    child: viewModel.fetchingString
                        ? CircularProgressIndicator()
                        : Text(viewModel.fetchedString),
                  ),
                ],
              ),
            ),
          ),
      viewModelBuilder: () => MultipleFuturesExampleViewModel());
  }
}

```

### MultipleStreamViewModel

Similarly to the `StreamViewModel`, we also have a `MultipleStreamViewModel` which allows you to provide multiple streams through a String key -> Stream paring. Any of the values from these streams will be stored in the data[key] and the same goes for the errors. Each stream value emitted will call `notifyListeners()` to update the UI. `MultipleStreamViewModel` requires the `streamsMap` to be overridden.

```dart
const String _NumbersStreamKey = 'numbers-stream';
const String _StringStreamKey = 'string-stream';

class MultipleStreamsExampleViewModel extends MultipleStreamViewModel {
  int numbersStreamDelay = 500;
  int stringStreamDelay = 2000;

  @override
  Map<String, StreamData> get streamsMap => {
        _NumbersStreamKey: StreamData<int>(numbersStream(numbersStreamDelay)),
        _StringStreamKey: StreamData<String>(stringStream(stringStreamDelay)),
      };

  Stream<int> numbersStream([int delay = 500]) async* {
    var random = Random();
    while (true) {
      await Future.delayed(Duration(milliseconds: delay));
      yield random.nextInt(999);
    }
  }

  Stream<String> stringStream([int delay = 2000]) async* {
    var random = Random();
    while (true) {
      await Future.delayed(Duration(milliseconds: delay));
      var randomLength = random.nextInt(50);
      var randomString = '';
      for (var i = 0; i < randomLength; i++) {
        randomString += String.fromCharCode(random.nextInt(50));
      }
      yield randomString;
    }
  }
}
```

Similarly to the single-stream ViewModel. When your stream has changed you should call `notifySourceChanged` to let the ViewModel know that it should stop listening to the old stream and subscribe to the new one. If you want to check if the stream had an error you can use the `hasError` function with the key for the stream, you can also get the error using `getError` with the key for the Stream.

### IndexTrackingViewModel

This ViewModel provides the basic functionality required for index tracking like bottom nav bar, side drawer, etc. It has functions and properties set and get the current index as well as a property that indicates `reversed` to be used with page transition animations. it can be used in a view as follows.

```dart
class HomeView extends StatelessWidget {
  const HomeView({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ViewModelBuilder<HomeViewModel>.reactive(
      builder: (context, viewModel, child) => Scaffold(
        body: getViewForIndex(viewModel.currentIndex),
        bottomNavigationBar: BottomNavigationBar(
          type: BottomNavigationBarType.fixed,
          backgroundColor: Colors.grey[800],
          currentIndex: viewModel.currentTabIndex,
          onTap: viewModel.setTabIndex,
          items: [
            BottomNavigationBarItem(
              title: Text('Posts'),
              icon: Icon(Icons.art_track),
            ),
            BottomNavigationBarItem(
              title: Text('Todos'),
              icon: Icon(Icons.list),
            ),
          ],
        ),
      ),
      viewModelBuilder: () => HomeViewModel(),
    );
  }

  Widget getViewForIndex(int index) {
    switch (index) {
      case 0:
        return PostsView();
      case 1:
        return TodosView();
    }
  }
}
```

Where the `ViewModel` is just this.

```dart
class HomeViewModel extends IndexTrackingViewModel {}
```
