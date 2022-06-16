---
id: navigation-basics
title: "Navigation Basics"
sidebar_position: 1
---

# Navigation Basics

Stacked has a navigation system setup that relies on code generation and navigator 1.0 functionality. Navigation funtionality is accessible through a service called `NavigationService`. The reason it's wrapped in a service is to allow it to be used where yout business logic makes those navigation decisions. This also makes it mockable and thus, unit testable. 

## Defining your routes

Routes are defined in the `lib/app/app.dart` file

```dart
...
// @stacked-import
@StackedApp(routes: [
  MaterialRoute(page: StartupView),
  MaterialRoute(page: HomeView),
  MaterialRoute(page: LoginView),
// @stacked-route
], dependencies: [
  LazySingleton(classType: NavigationService),
  LazySingleton(classType: DialogService),
  LazySingleton(classType: BottomSheetService),
])
class App {}
```

_The comment `// @stacked-route` is how we know where to insert a new route when adding it from the cli._ When this file is modified it's important to run

```
flutter pub run build_runner build --delete-conflicting-outputs
```

To generate your new router. This will be automatically done for you when you create a new view using the dev tools.

## Navigating to a Route

If you've followed along from [Introduction](../../getting-started/introduction.md) then you can continue. If not, run `stacked create app my_first_app`. cd into the my_first_app repo and run `flutter create view login`_

To perform a navigation you need to do 2 things:
1. Import the `NavigationService`
2. Navigate to the required route

In the `HomeViewModel` we start by getting the navigation service from our service locator.

```dart
import 'package:my_first_app/app/app.locator.dart';
import 'package:stacked_services/stacked_services.dart';

class HomeViewModel extends BaseViewModel {
  final _navigationService = locator<NavigationService>();

  ...
}
```

Next up is to perform the navigation. Update your incrementCounter to perform a navigation instead.
```dart
void incrementCounter() {
    _navigationService.navigateTo(Routes.loginView);
}
```

Run your app and tap on the counter button. Instead of it incrementing you should see it navigating to a new view with the fade through transition.

## Passing parameters

### Pass parameters to the View

On the LoginView add a new final parameter that's passed in through the constructor and display it in the center of the screen. 

```dart
class LoginView extends StatelessWidget {
  final int counter;
  const LoginView({required this.counter, super.key});
  
  @override
  Widget build(BuildContext context) {
    return ViewModelBuilder<LoginViewModel>.reactive(
      viewModelBuilder: () => LoginViewModel(),
      builder: (context, model, child) => Scaffold(
        backgroundColor: Theme.of(context).backgroundColor,
        body: Center(
            child: Text(
          'I have counted to $counter',
          style: const TextStyle(color: Colors.white),
        )),
      ),
    );
  }
}
```

Now run `flutter pub run build_runner build --delete-conflicting-outputs` .The reason we run build runner again is to generate the ViewArguments. Now you can update your navigation call to

```dart
 _navigationService.navigateTo(Routes.loginView,
        arguments: LoginViewArguments(
          counter: ++_counter,
        ));
```

Everything should still work the same but now when you navigate to the login view you're also passing the counter value to the view. 

### Pass parameters to the ViewModel

To pass the parameters passed to the view into the ViewModel you can pass it in the `viewModelBuilder` function where we construct the `ViewModel` instance. First we update our viewmodel to take the value through the constructor.

```dart
class LoginViewModel extends BaseViewModel {
  final int counter;
  LoginViewModel({required this.counter});
}
```

Then we can update the `viewModelBuilder` property in the `LoginView`

```dart
...
Widget build(BuildContext context) {
    return ViewModelBuilder<LoginViewModel>.reactive(
        viewModelBuilder: () => LoginViewModel(counter: counter),
        builder: (context, model, child) => ... ,
    );
}
...
```

Now you have access to the counter in the ViewModel.

## Run code when navigation completes or returns

All navigation actions return a `Future` this means you can wait in the calling function until it returns and then you can run some additional code. Lets update our code to see how this works. In the `LoginView` add a new `FloatingActionButton` that calls model.closeView

```dart title="login_view.dart"
  @override
  Widget build(BuildContext context) {
    return ViewModelBuilder<LoginViewModel>.reactive(
      viewModelBuilder: () => LoginViewModel(counter: counter),
      builder: (context, model, child) => Scaffold(
        floatingActionButton: FloatingActionButton(onPressed: model.closeView),
        ...
      ),
    );
  }
```

Then in the `LoginViewModel` add the new function and call back on the navigation service.

```dart title="login_viewmodel.dart"
class LoginViewModel extends BaseViewModel {
  final _navigationService = locator<NavigationService>();

  final int counter;
  LoginViewModel({required this.counter});

  void closeView() {
    _navigationService.back();
  }
}
```

The last thing to update it to await on the navigation call in the `HomeViewModel`. Update the increment button to be a future and await on the navigation call. We'll add some print statements as well so you can see when those print statements get executed.

```dart title="home_viewmodel.dart"
Future<void> incrementCounter() async {
    print('Navigate to Login View');
    await _navigationService.navigateTo(Routes.loginView,
        arguments: LoginViewArguments(
          counter: ++_counter,
        ));
    print('Login Navigation complete');
}
```

If you run the code now and tap on the counter button you'll see is prints out `Navigate to Login View`, and when you tap on the `FloatinActionButton` do you see the `Login Navigation complete` log.

## Return data from navgation view

In addition to waiting for the navigation call to complete, you can also return data from the view that you navigated to. The `back` function on the `NavigationService` allows you to pass in any value to return to the calling function. Update the code in the `LoginViewModel` to return `"I am from LoginView"`.

```dart title="login_viewmodel.dart"
class LoginViewModel extends BaseViewModel {
  final _navigationService = locator<NavigationService>();

  final int counter;
  LoginViewModel({required this.counter});

  void closeView() {
    _navigationService.back(result: 'I am from LoginView');
  }
}
```

Now in in the navigation caller you can store that value in a result and print it. 

```dart title="home_viewmodel.dart"
  Future<void> incrementCounter() async {
    final result = await _navigationService.navigateTo(Routes.loginView,
        arguments: LoginViewArguments(
          counter: ++_counter,
        ));
    print('Login Navigation complete. Result:$result');
  }
```