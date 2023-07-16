---
id: viewmodels
title: Modelos de Vista
sidebar_label: Modelos de Vista
sidebar_position: 2
---


# ¿Qué es un Modelo de Vista?

Como vimos en capítulos anteriores, un Model de Vista es simplemente una clase Dart que extiende a `ChangeNotifier` y es responsable de la lógica de presentación de la Vista, gestionando su estado y realizando acciones para los usuarios a medida que interactúan con la Vista.


## BaseViewModel

El Modelo de Vista `por defecto` de la arquitectura Stacked con **estado de ocupado** y **estado de error**. Permite establecer cualquier estado basado en un objeto que se le pasa, probablemente una propiedad en el Modelo de Vista extendido. Surgió de la necesidad de tener estados ocupados para múltiples valores en los mismos Modelos de Vista sin depender de valores de estado implícitos. También contiene una función auxiliar para indicar ocupado mientras se está ejecutando un Future. De esta forma evitamos tener que llamar a `setBusy` antes y después de cada llamada a Future.

Para utilizar el BaseViewModel puedes extenderlo y hacer uso de la funcionalidad busy de la siguiente manera.

```dart
class WidgetOneViewModel extends BaseViewModel {
  Human _currentHuman;
  Human get currentHuman => _currentHuman;

  void setBusyOnProperty() {
    setBusyForObject(_currentHuman, true);
    // Obtener datos humanos actualizados
    setBusyForObject(_currentHuman, false);
  }

  void setModelBusy() {
    setBusy(true);
    // Hacer cosas aquí
    setBusy(false);
  }

  Future longUpdateStuff() async {
    // Establece busy a verdadero antes de iniciar future y lo establece a falso después de ejecutar.
    // También puedes pasar un objeto como objeto ocupado. De lo contrario usará el Modelo de Vista.
    var result = await runBusyFuture(updateStuff());
  }

  Future updateStuff() {
    return Future.delayed(const Duration(seconds: 3));
  }
}
```

Esto hace que sea conveniente utilizarlo en la interfaz de usuario de una manera más legible.

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
          // Usar isBusy para comprobar si el Modelo de Vista está ocupado
          color: viewModel.isBusy ? Colors.green : Colors.red,
          alignment: Alignment.center,
          // Un poco tonto para pasar la misma propiedad de nuevo en el Modelo 
          // de Vista pero aquí tiene sentido
          child: viewModel.busy(viewModel.currentHuman)
              ? Center(
                  child: CircularProgressIndicator(),
                )
              : Container(/* Estilo de los detalles del Humano */)
        ),
      ),
    );
  }
}
```

Toda la funcionalidad principal para el BaseViewModel se muestra arriba.

### Manejo de estado ocupado

Stacked hace que sea más fácil para el desarrollador indicar a la interfaz de usuario si su Modelo de Vista está ocupado o no a través de proporcionar algunas funciones de utilidad. Veamos un ejemplo. Cuando ejecutas un futuro y quieres indicar a la interfaz de usuario que el Modelo de Vista está ocupado utilizarías la función `runBusyFuture`.

```dart
class BusyExampleViewModel extends BaseViewModel {
 Future longUpdateStuff() async {
    // Etablece busy a verdadero antes de iniciar future y lo pone a false después de ejecutar.
    // También se puede pasar un objeto como objeto ocupado. De lo contrario usará el Modelo de Vista.
    var result = await runBusyFuture(updateStuff());
  }

  Future updateStuff() {
    return Future.delayed(const Duration(seconds: 3));
  }
}
```

Esto establecerá la propiedad busy usando `this` como clave para que puedas comprobar si el futuro sigue en marcha llamando a `isBusy` en el Modelo de Vista. Si quieres asignarle una clave diferente, en el ejemplo de un `CartView` donde tienes múltiples artículos listados. Al aumentar la cantidad de un artículo desea que sólo ese artículo muestre un indicador de ocupado. Para ello también puede proporcionar una clave a la función `runBusyFuture`.

```dart
const String BusyObjectKey = 'my-busy-key';

class BusyExampleViewModel extends BaseViewModel {
  Future longUpdateStuff() async {
    // Etablece busy a verdadero antes de iniciar future y lo pone a false después de ejecutar.
    // También se puede pasar un objeto como objeto ocupado. De lo contrario usará el Modelo de Vista.
    var result = await runBusyFuture(updateStuff(), busyObject: BusyObjectKey);
  }

  Future updateStuff() {
    return Future.delayed(const Duration(seconds: 3));
  }
}
```

Entonces puedes comprobar el estado de ocupado usando esa clave de ocupado y llamando a `viewModel.busy(BusyObjectKey)`. La clave debe ser cualquier valor único que no cambie con el estado ocupado del objeto. En el ejemplo anterior puedes utilizar el id de cada uno de los productos del carrito para indicar si está ocupado o no. De esta forma puedes mostrar el estado de ocupado para cada uno de ellos individualmente.

### Manejo de estado de error

De la misma forma que se establece el estado ocupado también se obtiene un estado de error. Cuando usas uno de los `ViewModels` especiales o las funciones auxiliares de futuros `runBusyFuture` o `runErrorFuture` se almacenará la excepción lanzada en el `ViewModel` para que puedas utilizarla. Seguirá las mismas reglas que el estado de ocupado anterior y asignará la excepción al `ViewModel` o a la clave que se le haya pasado. Veamos algo de código.

```dart
class ErrorExampleViewModel extends BaseViewModel {
 Future longUpdateStuff() async {
    // Etablece busy a verdadero antes de iniciar future y lo pone a false después de ejecutar.
    // También se puede pasar un objeto como objeto ocupado. De lo contrario usará el Modelo de Vista.
    var result = await runBusyFuture(updateStuff());
  }

  Future updateStuff() async {
    await Future.delayed(const Duration(seconds: 3));
    throw Exception('Las cosas salieron mal');
  }
}
```

Después de 3 segundos este futuro lanzará un error. Atrapará automáticamente ese error, devolverá la vista a no ocupada y guardará el error. Cuando no se proporciona ninguna clave a `runBusyFuture` puedes comprobar si hay un error utilizando la propiedad `hasError`. También puedes obtener la excepción real desde la propiedad `modelError`. Sin embargo, si proporcionas una clave, puedes obtener la excepción utilizando la función error.

```dart
const String BusyObjectKey = 'my-busy-key';

class BusyExampleViewModel extends BaseViewModel {
  Future longUpdateStuff() async {
    // Etablece busy a verdadero antes de iniciar future y lo pone a false después de ejecutar.
    // También se puede pasar un objeto como objeto ocupado. De lo contrario usará el Modelo de Vista.
    var result = await runBusyFuture(updateStuff(), busyObject: BusyObjectKey);
  }

  Future updateStuff() {
    return Future.delayed(const Duration(seconds: 3));
  }
}
```

En este caso el error puede ser recuperado usando `viewModel.error(BusyObjectKey)` o simplemente puedes comprobar si hay un error para la clave usando `viewModel.hasErrorForKey(BusyObjectKey)`. Si quieres reaccionar a un error de tu futuro puedes redefinir `onFutureError` que devolverá la excepción y la clave que usaste para ese futuro. Los `ViewModels` especiales tienen su propia redefinición de onError pero esta puede ser usada allí también si es necesario.


## Modelos de Vista especiales

Además del BaseViewModel, Stacked incluye un número de Modelos de Vista especiales que reducen el código predefinido requerido para casos de uso comunes. Se describen a continuación.

### ReactiveViewModel

Este Modelo de Vista extiende el `BaseViewModel` y añade una función que permite escuchar los servicios que se están utilizando en el Modelo de Vista. Hay dos cosas que tienes que hacer para que un Modelo de Vista reaccione a los cambios en un servicio.

1. Extender desde `ReactiveViewModel`.
2. Implementar el getter `listenableServices` que devuelve una lista de servicios escuchables.

```dart
class AnyViewModel extends ReactiveViewModel {
  final _postsService = locator<PostsService>();

  int get postCount => _postsService.postCount;

  @override
  List<ListenableServiceMixin> get listenableServices => [_postsService];
}
```

En el lado del Servicio, el mismo tiene que utilizar el `ListenableServiceMixin` y pasar a `listenToReactiveValues` las propiedades a escuchar.

```dart
class PostService with ListenableServiceMixin {
  PostService {
    listenToReactiveValues([_postCount]);
  }

  int _postCount = 0;
  int get postCount => _postCount;

  Future<void> increment() async {
    _postCount++;
    notifyListeners(); // Los Modelos de Vista escuchando al valor de postCount son noificados y sus vistas recontruidas
  }
}
```

### StreamViewModel

Este `ViewModel` extiende el `BaseViewModel` y proporciona funcionalidad para escuchar y reaccionar fácilmente a los datos de un stream. Te permite suministrar un `Stream` de tipo `T` al que se suscribirá, gestionará la suscripción (desechará cuando termine), y te dará callbacks donde puedes modificar o manipular los datos. Reconstruirá automáticamente la `Vista` cuando entren nuevos valores en el flujo. Tiene 1 redefinición requerida que es el stream getter y 4 opcionales.

- **stream**: Devuelve el `Stream` que quieres escuchar
- **onData**: Llamada después de que la vista se haya reconstruido y te proporciona los datos a utilizar
- **onCancel**: Llamada después de que el flujo ha sido descartado
- **onSubscribed**: Llamada cuando el stream ha sido suscripto
- **onError**: Llamada cuando se envía un error a través del flujo

```dart
// ViewModel
class StreamCounterViewModel extends StreamViewModel<int> {

  String get title => 'Esté es el tiempo en segundos desde la úiltima época: \n $data';

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

// Servicio (registrado mediante inyección, NO OBLIGATORIO)
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

El código anterior escuchará un flujo y le proporcionará los datos con los que reconstruir. Puedes crear un `ViewModel` que escuche un stream con dos líneas de código.

```dart
class StreamCounterViewModel extends StreamViewModel<int> {
  @override
  Stream<int> get stream => locator<EpochService>().epochUpdatesNumbers();
}
```

Además de tener la función `onError` que puede redefinir, el `ViewModel` también establecerá la propiedad hasError a verdadera para facilitar la comprobación en el lado de la Vista. La llamada de retorno `onError` se puede utilizar para ejecutar acciones adicionales en caso de fallo y la propiedad `hasError` se debe utilizar cuando se desea mostrar la interfaz de usuario específica de error.

### FutureViewModel

Este `ViewModel` extiende el `BaseViewModel` para proporcionar funcionalidad para escuchar fácilmente a un Futuro que obtiene datos. Este requisito vino de una Vista de Detalles que tiene que obtener datos adicionales para mostrar al usuario después de seleccionar un elemento. Cuando extiendes el `FutureViewModel` puedes proporcionar un tipo que requerirá que redefinas el getter futuro donde puedes establecer el futuro que quieres ejecutar.

El futuro se ejecutará después de que el ViewModel se haya creado automáticamente.

```dart
class FutureExampleViewModel extends FutureViewModel<String> {
  @override
  Future<String> futureToRun() => getDataFromServer();

  Future<String> getDataFromServer() async {
    await Future.delayed(const Duration(seconds: 3));
    return 'Esto se obtiene de cualquier lado';
  }
}
```

This will automatically set the view's isBusy property and will indicate false when it's complete. It also exposes have a `dataReady` property that can be used. This will indicate true when the data is available. The `ViewModel` can be used in a view as follows.
Esto establecerá automáticamente la propiedad isBusy de la vista e indicará falso cuando esté finalizada. También expone la propiedad `dataReady` que puede ser utilizada. Esta indicará verdadero cuando los datos estén disponibles. El `ViewModel` se puede utilizar en una vista de la siguiente manera.

```dart
class FutureExampleView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ViewModelBuilder<FutureExampleViewModel>.reactive(
      builder: (context, viewModel, child) => Scaffold(
        body: Center(
          // el Modelo de Vista indicará ocupado hasta que se obtenga el futuro
          child: viewModel.isBusy ? CircularProgressIndicator() : Text(viewModel.data),
        ),
      ),
      viewModelBuilder: () => FutureExampleViewModel(),
    );
  }
}
```

El `FutureViewModel` también capturará un error e indicará que ha recibido el mismo a través de la propiedad `hasError`. También puedes redefinir la función `onError` si quieres recibir ese error y realizar una acción específica en ese momento.

```dart
class FutureExampleViewModel extends FutureViewModel<String> {
  @override
  Future<String> get future => getDataFromServer();

  Future<String> getDataFromServer() async {
    await Future.delayed(const Duration(seconds: 3));
    throw Exception('Esto es un error');
  }

  @override
  void onError(error) {
  }
}
```

La propiedad hasError se puede utilizar en la vista del mismo modo que la propiedad isBusy.

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
                  'Se ha producido un error al ejecutar el futuro',
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

Además de poder ejecutar un Futuro, también hace que una vista reaccione a los datos devueltos por múltiples futuros. Requiere que proporciones un mapa de tipo string junto con una Función que devuelva un Futuro que será ejecutada después de que el `ViewModel` haya sido construido. Vea a continuación un ejemplo de uso de un `MultipleFutureViewModel`.

```dart
import 'package:stacked/stacked.dart';

const String _NumberDelayFuture = 'numeroRetrasado';
const String _StringDelayFuture = 'cadenaRetrasada';

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
    return 'datos de la cadena';
  }
}
```

Los datos del futuro estarán en el `dataMap` cuando el futuro esté listo. Cada futuro se establecerá individualmente como ocupado utilizando la clave del futuro pasado. Con estas funcionalidades, podrás mostrar un indicador de ocupado para la interfaz de usuario que dependa de los datos del futuro mientras se obtiene. También hay una función `hasError` que indicará si el Futuro para una clave específica ha arrojado un error.

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
                    // Mostrar ocupado para el número futuro hasta que los datos están de vuelta o hayan fallado
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
                    // Mostrar ocupado para la cadena futura hasta que los datos estén de vuelta o hayan fallado
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

De forma similar al `StreamViewModel`, también tenemos un `MultipleStreamViewModel` que le permite proporcionar múltiples flujos a través de un Map<String, Stream>. Cualquiera de los valores de estos streams se almacenará en data[key] y lo mismo ocurre con los errores. Cada valor emitido llamará a `notifyListeners()` para actualizar la interfaz de usuario. El `MultipleStreamViewModel` requiere que se redefina el `streamsMap`.

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

De forma similar al Modelo de Vista de flujo único. Cuando tu flujo ha cambiado debes llamar a `notifySourceChanged` para que el Modelo de Vista sepa que debe dejar de escuchar el flujo antiguo y suscribirse al nuevo. Si quieres comprobar si el flujo tiene un error puedes usar la función `hasError` con la clave del flujo, también puedes obtener el error usando `getError` con la clave del flujo.

### IndexTrackingViewModel

Este Modelo de Vista proporciona la funcionalidad básica necesaria para el seguimiento de índices como la barra de navegación inferior, el cajón lateral, etc. Tiene funciones y propiedades que establecen y obtienen el índice actual, así como una propiedad que indica `reversed` para ser utilizada con animaciones de transición de página. se puede utilizar en una vista de la siguiente manera.

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

Donde el `ViewModel` es sólo esto.

```dart
class HomeViewModel extends IndexTrackingViewModel {}
```
