---
id: dependency_injection
title: Dependency Injection
sidebar_label: Dependency Injection
---

# What is Dependency Injection?

Dependency injection is a software design pattern in which a component's dependencies are provided by an external source rather than being hard-coded. This is a very powerful pattern that allows us to decouple our code and make it more testable. It also allows us to have a single source of truth for our dependencies.

---

# What is a service locator?

The service locator a pattern in which an object looks up its dependency from a central `locator` object. This `locator` is responsible for creating and managing the lifecycle of the dependencies, and the object looks them up by the type or the name.

# How does Stacked use dependency injection?

Stacked uses a library called [`get_it`](https://pub.dev/packages/get_it) for dependency injection. get_it is a simple yet powerful dependency injection library for Dart and Flutter.

Let's say we have a `ViewModel` called `AuthViewModel` we want to use that depends on a repository `AuthenticationRepository`.

```dart
abstract class IAuthenticationRepository {
  Future<bool> login(String username, String password);
}

class AuthenticationRepository implements IAuthenticationRepository {
  @override
  Future<bool> login(String username, String password) {
    return Future.value(true);
  }
}

class AuthViewModel extends BaseViewModel {}

```

We can inject the repository into the ViewModel using the `locator`.

## Directly accessing the locator

First, we will need to create a file `locator.dart` and register the repository in the `setupLocator` function. If we want to inject this `AuthenticationRepository` as a `LazySingleton`, we can do the following:

> Read more about the different types of registration [here](https://pub.dev/packages/get_it#different-ways-of-registration)

```dart
import 'package:get_it/get_it.dart';
final locator = GetIt.instance;
void setupLocator() {
  locator.lazySingleton<IAuthenticationRepository>(() => AuthenticationRepository());
}
```

Once this is done, we need to call the `setupLocator` function in the `main` function of our app.

```dart
void main() {
  setupLocator();
  runApp(MyApp());
}
```

This will register all the dependencies in the `locator` and make them available to the app. Now we can access the `AuthenticationRepository` in the `AuthViewModel` using the `locator`.

```dart
class AuthViewModel extends BaseViewModel {
  final _authenticationRepository = locator<IAuthenticationRepository>();
}
```

## Using `injectable` to generate the dependency injection code

The other way to inject dependencies is by using the `injectable` package. This package allows us to generate the code for the dependency injection. With this you don't have to manually register the dependencies in the `locator`, we can just annotate the class with the `@injectable` annotation and the code will be generated for us.

In `locator.dart` we need to import the `injectable` package and annotate the `setupLocator` function with `@injectableInit` and run `flutter pub run build_runner build` to generate `locator.config.dart` file.

```dart

import 'package:get_it/get_it.dart';
import 'package:injectable/injectable.dart';
import 'locator.config.dart';
final locator = GetIt.instance;

@injectableInit
void setupLocator() => locator.init();
```

Now we can annotate the `AuthenticationRepository` with `@lazySingleton` and the code will be generated for us.

```dart
import 'package:injectable/injectable.dart';

@LazySingleton(as: IAuthenticationRepository)
class AuthenticationRepository implements IAuthenticationRepository {
  @override
  Future<bool> login(String username, String password) {
    return Future.value(false);
  }
}
```

Now we can access the `AuthenticationRepository` in the `AuthViewModel` using the `locator`.

```dart
class AuthViewModel extends BaseViewModel {
  final _authenticationRepository = locator<IAuthenticationRepository>();
}
```

OR we can use annotate the viewmodel with `@injectable` and the code will be generated for us.

> Note: `@injectable` will register it as a `Factory`

```dart
import 'package:injectable/injectable.dart';
@injectable
class AuthViewModel extends BaseViewModel {
  final IAuthenticationRepository _authenticationRepository;
  AuthViewModel(this._authenticationRepository);
}
```

The injectable will handle the order of the dependencies and will inject the dependencies in the correct order.

Now, when we need to use the viewmodel in the view, we can use the `ViewModelBuilder` and locator to get the viewmodel.

```dart
ViewModelBuilder<AuthViewModel>.nonReactive(
  viewModelBuilder: locator,
  builder: (
    BuildContext context,
    AuthViewModel model,
    Widget? child,
  ) {
    return Scaffold(
      body: Center(
      child: Text(
          'AuthView',
        ),
      ),
    );
  },
);

```

> NOTE: When we are injecting the dependencies from the constructor, we will have to run the `flutter pub run build_runner build` command to generate the code for the dependency injection every time we add or remove a dependency.

---

# Handling the mocks while testing

When we are testing our code, we need to mock the dependencies. We can do this by registering the mock dependencies in the `locator` in the `setUp` function of the test.

## When directly accessing the locator to get the dependency

When we are directly accessing the locator to get the dependency, we will have to ensure that the mocks are properly registered in the `locator` before we run the test.

```dart
class AuthViewModelFromLocator extends BaseViewModel {
  final _authenticationRepository = locator<IAuthenticationRepository>();

  Future<void> login(String username, String password) async {
    await _authenticationRepository.login(username, password);
  }
}

void main() {
  late MockIAuthenticationRepository repository;
  setUpAll(() {
    repository = MockIAuthenticationRepository();
    locator.registerSingleton<IAuthenticationRepository>(repository);
    when(repository.login(any, any)).thenAnswer((_) async => true);
  });
  test('accessing viewmodel from locator', () async {
    final viewModel = AuthViewModelFromLocator();
    await viewModel.login('username', 'password');
    verify(repository.login('username', 'password')).called(1);
  });
}
```

Since we are directly accessing the locator, we need to ensure that `IAuthenticationRepository` mock is registered in the `locator` before we run the test.

## When injecting from the constructor

When we are injecting the dependencies from the constructor and maintaining the dependency injection with `injectable`.

```dart
@injectable
class AuthViewModelFromConstructor extends BaseViewModel {
  AuthViewModelFromConstructor(this._authenticationRepository);

  final IAuthenticationRepository _authenticationRepository;

  Future<void> login(String username, String password) async {
    await _authenticationRepository.login(username, password);
  }
}

void main() {
  late MockIAuthenticationRepository repository;
  setUpAll(() {
    repository = MockIAuthenticationRepository();
    when(repository.login(any, any)).thenAnswer((_) async => true);
  });

  test('accessing viewmodel from constructor', () async {
    final viewModel = AuthViewModelFromConstructor(repository);
    await viewModel.login('username', 'password');
    verify(repository.login('username', 'password')).called(1);
  });
}
```
