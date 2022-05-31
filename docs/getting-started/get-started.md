---
id: get-started
sidebar_label: "Get Started"
sidebar_position: 1
---

# Get Started

:::info Installation Tip
Make sure you have Flutter installed and setup. If not head over to [Flutter Install](https://docs.flutter.dev/get-started/install) to get is setup
:::

To start with stacked install the stacked_tools package through pub by running 

```shell
dart pub global activate stacked_tools
```

This will give you access to all the stacked goodies. 

## New Stacked Project

To create your first app run 

```shell
stacked create app my_first_app
```

This will create your stacked flutter application and it should be ready to run. Connect a device or an emulator and run the app. 

```shell
flutter run
```

You should see a loading screen with loading indicator and then a view with a counter and some buttons. This starting point gives you the basics of what's required for flutter. It has the following setup:

- State management 
- Start up logic functionality
- Navigation
- Dialog UI builders
- BottomSheet UI builder
- Dependency Inversion
- Unit tests example

Everything to build a production flutter app with your team. 

## View and ViewModel

The main building block of Stacked. It uses a simple split between UI code and State / Logic code called a View (your UI) and a ViewModel (Your logic). To create a new view in your project type

```shell
stacked create view login
```

This will create a new view and viewModel in `lib/ui/login`

- login_view.dart
- login_viewmodel.dart

It will also create a new test file for the ViewModel in `test/viewmodel_tests/home_viewmodel_test.dart` where you have to add all your unit tests. In addition to those files the view is also added into the routes for the app, found in `lib/app/app.dart` file. This is the basics of the State management in Stacked. You have the View that takes in your ViewModel and a builder function that builds your UI.

```dart title="lib/ui/views/login/login_view.dart"
class LoginView extends StatelessWidget {
  const LoginView({super.key});

  @override
  Widget build(BuildContext context) {
    return ViewModelBuilder<LoginViewModel>.reactive(
      viewModelBuilder: () => LoginViewModel(),
      builder: (context, model, child) => Scaffold(
        backgroundColor: Theme.of(context).backgroundColor,
        body: Container(
          padding: const EdgeInsets.only(left: 25.0, right: 25.0),
        ),
      ),
    );
  }
}
```

The ViewModel is basic

```dart title="lib/ui/views/login/login_viewmodel.dart"
class LoginViewModel extends BaseViewModel {}
```

The idea is simple. You do all your logic in the ViewModel and then call `notifyListeners` to rebuild your model. Lets tackle some navigation.
