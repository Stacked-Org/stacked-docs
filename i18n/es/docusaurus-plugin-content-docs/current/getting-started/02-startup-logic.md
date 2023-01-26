---
id: startup-logic
title: Lógica de Inicio
sidebar_label: Lógica de Inicio
tags: [introducción]
---

Stacked viene con algunas funcionalidades que hemos encontrado comunes a todas las aplicaciones. Estas funcionalidades incluyen:

1. Un lugar para ejecutar algo de código antes de que se inicie la aplicación
2. Navegación
3. Registrar
4. Interfaces de usuario superpuestas

En esta sección, cubriremos el punto 1 y tocaremos algunos de los otros.


# Lógica de Inicio

Cuando creas una aplicación usando el Stacked CLI, tendrás una Vista y Modelo de Vista llamada `startup`. El propósito de esta vista es aparecer justo después de la pantalla de presentación y darle un lugar para ejecutar su "lógica de inicio", el código que desea ejecutar antes de que se inicie la aplicación. Aquí es donde harías algunas comprobaciones para decidir hacia dónde navegar en el comienzo. Vamos a construir algo para demostrar esta funcionalidad.

Abajo hay un diagrama que muestra lo que queremos lograr. Queremos navegar a un lugar diferente dependiendo de si el usuario ha iniciado sesión o no.

![Diagrama Lógico de Inicio Stacked](/img/getting-started/02-startup-flow.png)

Así es como se ejecuta el código a través de Stacked:

1. La aplicación se inicia y abre la vista `StartupView`
2. La función `runStartupLogic` se ejecuta en el modelo de vista `StartupViewModel`
3. Comprobamos con nuestro `AuthenticationService` si el usuario ha iniciado sesión o no
4. Si el usuario ha iniciado sesión, navegamos a la vista `HomeView`
5. Si no, navegamos a la vista `LoginView`

_Nota: El servicio de Autenticación es falso. Deberías usar tu propia implementación de autenticación._


## Preparando las Vistas

Empezaremos creando la `LoginView` para que podamos navegar allí. En tu proyecto Stacked, ejecuta

```shell
stacked create view login
```

Cuando termine, abre `login_view.dart` y cambia el color del fondo a rojo:

```dart
class LoginView extends StackedView<LoginViewModel> {
  const LoginView({Key? key}) : super(key: key);

  @override
  Widget builder(
    BuildContext context,
    LoginViewModel viewModel,
    Widget? child,
  ) {
    return Scaffold(
      backgroundColor: Colors.red,
      body: Container(
        padding: const EdgeInsets.only(left: 25.0, right: 25.0),
      ),
    );
  }

  @override
  LoginViewModel viewModelBuilder(
    BuildContext context,
  ) =>
      LoginViewModel();
}
```

Ahora abre `home_view.dart` y cambia el color del fondo a violeta:

```dart
class HomeView extends StackedView<HomeViewModel> {
  const HomeView({Key? key}) : super(key: key);

  @override
  Widget builder(
    BuildContext context,
    HomeViewModel viewModel,
    Widget? child,
  ) {
    return Scaffold(
      backgroundColor: Colors.purple,
      body: Container(
        padding: const EdgeInsets.only(left: 25.0, right: 25.0),
      ),
    );
  }

  @override
  HomeViewModel viewModelBuilder(
    BuildContext context,
  ) =>
      HomeViewModel();
}
```


## Registrando nuestro Servicio

Ahora estamos listos para crear nuestro servicio de autenticación. Ejecuta el siguiente comando:

```shell
stacked create service authentication
```

Esto creará el servicio y lo registrará para la inversión de dependencias. Abre `authentication_service.dart` donde añadiremos una nueva función para comprobar si el usuario ha iniciado sesión. Por ahora, esto devolverá un valor estático por simplicidad:

```dart
class AuthenticationService {
  bool userLoggedIn() {
    return true;
  }
}
```

**Nota:** Tenemos una serie completa de autenticación con Firebase si desea implementar autenticación real a través de Stacked ([Iniciar sesión con Firebase usando Stacked](https://www.filledstacks.com/post/sign-in-with-google-or-apple-sign-in-using-flutter/), [Lógica de inicio personalizada avanzada con Stacked](https://www.filledstacks.com/post/practical-guide-to-unit-testing-in-flutter/#writing-a-unit-test)).


## Escribiendo la Lógica de Inicio

Abrimos `startup_viewmodel.dart` donde por fin podemos empezar a escribir nuestra lógica de arranque para la aplicación. Como vimos antes, queremos comprobar si el usuario ha iniciado sesión, y si es así, ir a la vista `HomeView`, de lo contrario ir a la vista `LoginView`. Esto se traduce en el siguiente código:

```dart
class StartupViewModel extends BaseViewModel {
  // 1. Obtener los servicios de Autenticación y Navegación
  final _authenticationService = locator<AuthenticationService>();
  final _navigationService = locator<NavigationService>();

  Future runStartupLogic() async {
    // 2. Comprobar si el usuario ha iniciado sesión
    if (_authenticationService.userLoggedIn()) {
      // 3. Navegar a HomeView
      _navigationService.replaceWith(Routes.homeView);
    } else {
      // 4. O navegar a LoginView
      _navigationService.replaceWith(Routes.loginView);
    }
  }
}
```

Empezamos obteniendo los servicios que necesitamos, `AuthenticationService` que hemos creado y `NavigationService` que es parte de `Stacked`. Luego comprobamos si el usuario ha iniciado sesión y en base a eso navegamos a `HomeView` o `LoginView`. Así de simple. Si ejecutas este código, verás que terminamos en la vista púrpura. Si cambias el valor en `AuthenticationService` a `false` y reinicias, verás que terminamos en la vista roja. Esto cubre lo básico del código de inicio en Stacked. Hemos tocado otras partes que aún no están explicadas, pero las veremos a continuación.

:::info Tutorial de Inicio Complejo
[Aquí hay un tutorial más complejo](https://www.filledstacks.com/post/practical-guide-to-unit-testing-in-flutter/#writing-a-unit-test) que cubre algunos escenarios adicionales durante la lógica de arranque.
:::