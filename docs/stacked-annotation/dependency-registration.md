---
id: dependency-registeration
title: "Dependency Registration"
sidebar_position: 4
---

The other major piece of boilerplate that was required was setting up get_it and making use of it on its own. This is still a very valid approach but with these new changes I wanted to introduce a quicker way of setting all that up and remove the boilerplate. This is also done using the `StackedApp` annotation. The class takes in a list of `DependencyRegistration`'s into a property called `dependencies`.

```dart
@StackedApp(
dependencies: [
    LazySingleton(classType: ThemeService, resolveUsing: ThemeService.getInstance),
    // abstracted class type support
    LazySingleton(classType: FirebaseAuthService, asType: AuthService),

    Singleton(classType: NavigationService),

    Presolve(
      classType: SharedPreferencesService,
      presolveUsing: SharedPreferencesService.getInstance,
    ),
  ],
)
```

There are (at the point of writing **21 February 2021**) 4 dependency types that can be registered as a dependency.

- Factory: When this dependency is requested from get_it it will return a new instance of the class given as the `classType`
- Singleton: This will **construct** and register a single instance of the class. When that `classType` is requested it will always return the instance that was created
- LazySingleton: This will **only construct the type when requested** and for every request after that return the same instance that was first constructed
- Presolve: This is a type that requires the instance to be initialised or resolved before being able to register it. Your have to supply `presolveUsing` and it has to be a static function that returns a Future of the type defined in `classType`. The presolve function for the above function looks as follows.

```dart
static Future<SharedPreferencesService> getInstance() async {
  if (_instance == null) {
    // Initialise the asynchronous shared preferences
    _sharedPreferences = await SharedPreferences.getSharedPrefs();
    _instance = SharedPreferencesService();
  }

  return Future.value(_instance);
}
```

You can also pass in a parameters for to Factories through locator using `FactoryWithParam` and annotate paramaters with `@factoryParam`

```dart
FactoryWithParam(classType: FactoryService),
```

Annotate paramaters with `@factoryParam`

```dart
class FactoryService {
  final String? key;
  final double? value;

  FactoryService({
    @factoryParam this.key,
    @factoryParam this.value,
  });
}

```

Then those parameters can be accessed with locator from any where as `param1` and `param2`

```dart
final _factoryService = exampleLocator<FactoryService>(param1: "Key", param2: "Value");
```

The generated code will look like this

```dart
exampleLocator.registerFactoryParam<FactoryService, String?, double?>((param1, param2) => FactoryService(key: param1, value: param2));
```

You can also pass in a `resolveFunction` for singleton registrations which takes a static `Function`. This would produce something like this

```dart
locator.registerLazySingleton(() => ThemeService.getInstance());
```

When looking at the `ThemeService` dependency registration. Once you've defined your dependencies then you can run

```
flutter pub run build_runner build --delete-conflicting-outputs
```

This will create a new file called app.locator.dart which contains a `setupLocator` function. That function should be called before the runApp function call in main.dart

```dart
void main() {
  setupLocator();
  runApp(MyApp());
}
```

If you have any dependency registered that needs to be preSolved then you have to change your main function into a Future and await the setupLocator call.

```dart
Future main() async {
  await setupLocator();
  runApp(MyApp());
}
```

After that you can start using the get_it locator

```dart
final navigationService = locator<NavigationService>;
```

To learn more about using get_it as a service locator you can [watch this video](https://youtu.be/vBT-FhgMaWM?t=321). That's all the functionality that the stacked_generator will generate for now. Over time we'll add more functionality that can help us reduce the amount of boilerplate required to build a stacked application.

### Environments

It is possible to register different dependencies for different environments by using `environments: {Environment.dev}` in the below example `NavigationService` is now only registered if we pass the environment name to `setupLocator(environment: Environment.dev);`

```dart
LazySingleton(
    classType: NavigationService,
    environments: {Environment.dev},
 ),
```

Now passing your environment to `setupLocator` function will create a simple environment filter that will only validate dependencies that have no environments or one of their environments matches the given environment.
Alternatively, you can pass your own EnvironmentFilter to decide what dependencies to register based on their environment keys, or use one of the shipped ones

- NoEnvOrContainsAll
- NoEnvOrContainsAny
- SimpleEnvironmentFilter
