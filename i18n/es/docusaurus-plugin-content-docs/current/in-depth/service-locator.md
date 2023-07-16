---
id: service-locator
title: Service Locator
sidebar_label: Service Locator
sidebar_position: 1
tags: [service-locator, dependency-registration, location-service]
---

# What is a Service Locator?

The main idea of the Service Locator is to create a registry containing all the dependencies and get components from it whenever we need them. Every object that needs something from this registry will interact with it rather than trying to instantiate a dependency itself. However, the object will still have a dependency, but only for the Service Locator itself, and it will provide us with the needed implementation transparently.

Using `dependencies` property in `StackedApp` annotation we can set a list of `DependencyRegistration` type as following.

```dart
@StackedApp(
dependencies: [
    Singleton(classType: NavigationService),
    LazySingleton(classType: ThemeService, resolveUsing: ThemeService.getInstance),
    LazySingleton(classType: FirebaseAuthService, asType: AuthService),
    InitializableSingleton(classType: SharedPreferencesService),
    Factory(classType: FactoryService),
  ],
)
```

## Dependency Types

Below we describe all dependency types that can be registered as a dependency in the `StackedApp` annotation.

### Singleton

It provides a way to register an object as a Singleton to the service locator. A Singleton means the object will be instantiated during the first fetch and then will stay alive in the memory and the same instance will be returned in the subsequent fetches.

| Parameter    | Description |
| ------------ | ----------- |
| classType    | The concrete class to be registered to the service locator. |
| asType       | An abstract class or interface to map the **classType** to. This is useful when you want to abstract the concrete implementation and depend on interfaces. |
| resolveUsing | A callback that resolves the instance. If null, **classType** is instantiated directly. |
| environments | A set of environment names where this registration should be included. Useful for conditionally including a service depending on the running environment. |
| instanceName | An optional instance name that can be used to register multiple objects of the same type. You will need to fetch the object by instance name from the service locator. |

### LazySingleton

It provides a way to register an object as a Lazy Singleton to the service locator. A Lazy Singleton means the object will be instantiated during the first fetch and then will stay alive in the memory and the same instance will be returned in the subsequent fetches. The key difference between a `Singleton` and a `LazySingleton` is that a Lazy Singleton is not created until it is fetched for the first time.

| Parameter    | Description |
| ------------ | ----------- |
| classType    | The concrete class to be registered to the service locator. |
| asType       | An abstract class or interface to map the **classType** to. This is useful when you want to abstract the concrete implementation and depend on interfaces. |
| resolveUsing | A callback that resolves the instance. If null, **classType** is instantiated directly. |
| environments | A set of environment names where this registration should be included. Useful for conditionally including a service depending on the running environment. |
| instanceName | An optional instance name that can be used to register multiple objects of the same type. You will need to fetch the object by instance name from the service locator. |

### InitializableSingleton

It provides a way to register an object as a Singleton to the service locator. This means the object will be instantiated during the first fetch and then will stay alive in the memory and the same instance will be returned in the subsequent fetches.

When used with a class implementing the `InitializableDependency` interface, the `init` method of the class will be called upon registration, allowing any necessary asynchronous initialization logic to be executed before the singleton instance is fetched for the first time. This is useful when you need to perform some setup or initialization task (like setting up a database, making a network request, etc.) before the class can be used.

| Parameter    | Description |
| ------------ | ----------- |
| classType    | The concrete class to be registered to the service locator. This class should implement **InitializableDependency** interface. |
| asType       | An abstract class or interface to map the **classType** to. This is useful when you want to abstract the concrete implementation and depend on interfaces. |
| environments | A set of environment names where this registration should be included. Useful for conditionally including a service depending on the running environment. |
| instanceName | An optional instance name that can be used to register multiple objects of the same type. You will need to fetch the object by instance name from the service locator. |

### Factory

It provides a way to register an object as a Factory to the service locator. A Factory means that a new instance of the object will be created each time it is fetched.

| Parameter    | Description |
| ------------ | ----------- |
| classType    | The concrete class to be registered to the service locator. |
| asType       | An abstract class or interface to map the **classType** to. This is useful when you want to abstract the concrete implementation and depend on interfaces. |
| environments | A set of environment names where this registration should be included. Useful for conditionally including a service depending on the running environment. |
| instanceName | An optional instance name that can be used to register multiple objects of the same type. You will need to fetch the object by instance name from the service locator. |

### FactoryWithParam

It provides a way to register an object as a Factory with parameters to the service locator. A Factory with parameters means that a new instance of the object will be created each time it is fetched, and the parameters will be passed to the factory function to create the instance.

| Parameter    | Description |
| ------------ | ----------- |
| classType    | The concrete class to be registered to the service locator. |
| asType       | An abstract class or interface to map the **classType** to. This is useful when you want to abstract the concrete implementation and depend on interfaces. |
| environments | A set of environment names where this registration should be included. Useful for conditionally including a service depending on the running environment. |
| instanceName | An optional instance name that can be used to register multiple objects of the same type. You will need to fetch the object by instance name from the service locator. |

## Environments

It is possible to register different dependencies for different environments by using `environments: {Environment.dev}` in the below example `NavigationService` is now only registered if we pass the environment name to `setupLocator(environment: Environment.dev);`.

```dart
LazySingleton(
  classType: NavigationService,
  environments: {Environment.dev},
),
```

Now passing your environment to `setupLocator` function will create a simple environment filter that will only validate dependencies that have no environments or one of their environments matches the given environment. Alternatively, you can pass your own EnvironmentFilter to decide what dependencies to register based on their environment keys, or use one of the shipped ones

* NoEnvOrContainsAll
* NoEnvOrContainsAny
* SimpleEnvironmentFilter
