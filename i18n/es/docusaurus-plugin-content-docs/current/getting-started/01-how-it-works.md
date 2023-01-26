---
id: how-it-works
title: ¿Cómo funciona?
sidebar_label: Cómo funciona
tags: [introducción]
---

Stacked crea una simple relación entre Vista y Modelo de Vista que nos permite realizar la gestión del estado sin un montón de código boilerplate. La idea es separar completamente nuestro estado de nuestra interfaz de usuario, lo que nos permite probar y ampliar fácilmente la lógica sin afectar a la interfaz de usuario. Veamos cómo funciona.


# Vamos a probarlo

En la aplicación que creaste en el [paso anterior](00-overview.md#crear-una-aplicación-stacked) crearemos una nueva Vista llamada `counter`, lo sé, muy original, pero esto es sólo para mostrarte lo básico de Stacked. Para crear una nueva Vista con Stacked ejecuta el siguiente comando:

```shell
stacked create view counter
```

Este comando nos creará tres archivos:

1. [counter_view.dart](#contador-vista): Aquí es donde se construye la interfaz de usuario utilizando Widgets de Flutter
2. [counter_viewmodel.dart](#counter-viewmodel-flutter-statemanagement): Almacena el estado y realiza acciones para los usuarios a medida que interactúan
3. counter_viewmodel_test.dart: Contiene todas las pruebas **unitarias** para el `CounterViewModel`.

Primero vamos a diseccionar la Vista.


## Vista Counter: Interfaz de Usuario

La Vista `CounterView` contiene nuestra interfaz de usuario que se mostrará en el dispositivo. Mirando la estructura de la vista, puedes ver que no extendemos desde un `StatelessWidget` o un `StatefulWidget`. En su lugar, estamos extendiendo desde un `StackedView`:

```dart
class CounterView extends StackedView<CounterViewModel> {

  @override
  // Una función constructora que nos da un Modelo de Vista
  Widget builder(
    BuildContext context,
    CounterViewModel viewModel,
    Widget? child,
    ) {
    return Scaffold(
      ...
    );
  }

  @override
  CounterViewModel viewModelBuilder(BuildContext context) => CounterViewModel();
}
```

Además, también puedes ver un reemplazo requerido llamado `viewModelBuilder`. Esta función construye nuestro Model de Vista que almacenará nuestro estado. Pero antes de entrar en eso, déjame mostrarte cómo funciona esto de Vista / Modelo de Vista. Esta es la base de la gestión del estado de Stacked. El objetivo de `StackedView` es "enlazar nuestro Modelo de Vista a nuestra UI". Esto nos permite separar completamente el estado y el código lógico de nuestra interfaz de usuario. El mecanismo es bastante simple.

**Construir la interfaz de usuario desde el Model de Vista, actualizar el Modelo de Vista, y luego reconstruir la interfaz de usuario desde ese Modelo de Vista.** He aquí un pequeño diagrama que representa visualmente la explicación que figura a continuación:

![Diagrama de enlace Vista-ModeloDeVista Stacked](/img/todo/view-viewmodel-relationship.png)

1. El `viewModelBuilder` crea nuestro `Modelo de Vista`
2. Stacked pasa este `Modelo de Vista` a nuestra función `builder`
3. La función `builder` crea nuestra interfaz de usuario
4. El usuario interactúa con esta interfaz de usuario
5. La interacción va al `Modelo de Vista`, actualiza el `Modelo de Vista`, y luego llama a `rebuildUi`.
6. La función `rebuildUi` dispara la función `builder` con el `Modelo de Vista` actualizado para reconstruir la interfaz de usuario.

Así de sencillo. Con este proceso, puedes gestionar el 100% de todos los escenarios de estado sin tener que escribir código relacionado con el estado en tu archivo de vista. La separación limpia de tu estado es el mejor punto de partida para una aplicación mantenible.


## Modelo de Vista Counter: Gestión de Estado

El `Modelo de Vista` generado es probablemente el más básico: es una clase normal que extiende `BaseViewModel`:

```dart
class CounterViewModel extends BaseViewModel {}
```

Y la gestión del estado es igual de fácil. Para nuestro ejemplo de contador, queremos almacenar un entero que cuente hacia arriba, así que crearemos un valor entero privado junto con una función para incrementarlo. Cuando hayamos cambiado el valor llamaremos a `rebuildUi` que llamará a nuestra función `builder` en la [Vista](#vista-counter):

```dart
class CounterViewModel extends BaseViewModel {
    int _counter = 0;
    int get counter => _counter;

    void incrementCounter() {
      _counter++;
      rebuildUi();
    }
}
```

Para terminar el ejemplo, vamos a mostrar el contador en la pantalla y llamar a la función `incrementCounter` cuando el FAB es tocado. En el archivo `counter_view.dart`, actualiza la función constructora para que devuelva lo siguiente:

```dart
@override
Widget builder(BuildContext context, CounterViewModel viewModel, Widget? child) {
  return Scaffold(
    floatingActionButton:
      FloatingActionButton(onPressed: viewModel.incrementCounter),
    body: Center(
      child: Text(
        viewModel.counter.toString(),
        style: const TextStyle(
          fontSize: 30,
          fontWeight: FontWeight.bold,
        ),
      ),
    ),
  );
}
```

Y lo último que hay que hacer es abrir `startup_viewmodel.dart` y cambiar:

```dart
_navigationService.replaceWithHomeView();
```

por

```dart
_navigationService.replaceWithCounterView();
```

Finalmente, ejecute su aplicación ejecutando `flutter run` o iniciando una sesión de depuración en VS Code. En la pantalla debería ver ahora un simple contador que se incrementa cuando toca el botón `FloatingActionButton`.

![Ejemplo de aplicación contador en Stacked](/img/getting-started/01-counter-example.gif)

Hablaremos de `StartupView` y `Navigation` a continuación.
