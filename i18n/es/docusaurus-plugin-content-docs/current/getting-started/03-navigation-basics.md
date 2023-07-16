---
id: navigation-basics
title: Conceptos Básicos de Navegación
sidebar_label: Navegación
tags: [introducción]
---

Si has seguido desde el [inicio](00-overview.md) habrás visto este código:

```dart
_navigationService.replaceWith(Routes.homeView);
```

La navegación forma parte de los Servicios de Stacked, un grupo de servicios dentro de Stacked que te ayuda a realizar ciertas tareas en tu código. _Para saber más sobre qué es un servicio, [lee esto](/in-depth/services.md)_.

Los servicios incluidos actualmente son:

1. Servicio de Navegación
2. Servicio de diálogo
3. Servicio de hoja inferior
4. Servicio Snackbar

...y próximamente más. En este documento trataremos la navegación.


# Navegación

El `NavigationService` es la forma de navegar dentro de una aplicación Stacked. Es accesible en todos los `Modelos de Vista`, a través del localizador, donde puedes realizar tus tareas de navegación.

Tus Vistas se añaden automáticamente a `app/app.dart` en la sección de abajo cuando utilizas la CLI para crear una Vista. Esto generará las llamadas de navegación para que las utilices:

```dart lib/app/app.dart
@StackedApp(routes: [
  MaterialRoute(page: StartupView),
  MaterialRoute(page: HomeView),
  MaterialRoute(page: CounterView),
  // @stacked-route
])
class App {}
```


## Realizar una Navegación

Existen varios tipos de navegación. Repasémoslas todas y veamos lo que hacen.

### Navegar a una Vista

Este es el tipo más común de navegación. Esto añadirá la `Vista` que está navegando a la pila de navegación. Hacemos esto usando la función `navigateTo[ViewName]`:

```dart
_navigationService.navigateToHomeView();
```

### Navegar a una Vista con Argumentos

En tu aplicación Stacked generada al [principio](00-overview.md), abre `home_view.dart`, donde le pasaremos un valor a través de su constructor:

```dart
class HomeView extends StackedView<HomeViewModel> {
  final int startingIndex;
  const HomeView({Key? key, required this.startingIndex}) : super(key: key);
  ...
}
```

Ahora ejecute `stacked generate`. Notarás que la llamada `navigateToHomeView` de arriba tiene ahora un error de compilación. Dado que `startingIndex` es necesario, tienes que pasar el valor `startingIndex` cuando navegues a la vista `HomeView`:

```dart
_navigationService.navigateToHomeView(startingIndex: 0);
```

### Reemplazar con Vista

Otro método popular de navegación es reemplazar la Vista actual en la pantalla por la nueva, en lugar de añadirla a la parte superior de la pila de navegación. Esto se hace utilizando la función `replaceWith[ViewName]` y funciona de forma muy similar a la anterior:

```dart
_navigationService.replaceWithHomeView(startingIndex: 0);
```

### Navegar hacia atrás

Si desea retroceder una Vista a la Vista anterior, puede utilizar la función `back`:

```dart
_navigationService.back();
```

### Pasar datos a la Vista anterior

La función `back` también toma un parámetro `result`. Este pasa el resultado de vuelta a la función que llama. Todas las llamadas de navegación devuelven un `futuro`, por lo que puedes esperarlas todas:

```dart
final result = await _navigationService.replaceWithHomeView(startingIndex: 0);
print('Resultado retornado: $result');
```

Dado el código anterior, cuando se llama:

```dart
_navigationService.back(result: 'De la llamada de vuelta');
```

Se imprimirá `Resultado retornado: De la llamada de vuelta`. El resultado es `dynamic`, por lo que puede devolver cualquier objeto, su propia clase, o tipos incorporados. Además de lo básico anterior, hay algunas funciones adicionales que facilitan algunas tareas de navegación:

- **clearStackAndShow:** Esto borrará toda la pila de navegación y luego mostrará la vista `HomeView`:

```dart
_navigationService.clearStackAndShow(Routes.homeView);
```

Pronto dispondremos de documentación y tutoriales de navegación más avanzados.