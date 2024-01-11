---
id: viewmodels
title: View Models
sidebar_label: View Models
sidebar_position: 2
---


# Qu'est-ce qu'un ViewModel ?

Comme nous l'avons vu dans les chapitres précédents, un ViewModel est simplement une classe Dart qui étend `ChangeNotifier` et est responsable de la logique de présentation de la View, de la gestion de son état et de l'exécution d'actions pour les utilisateurs lors de leur interaction avec la View.

## BaseViewModel

C'est le ViewModel "par défaut" de l'architecture Stacked avec un état occupé (**busy state**) et de l'état d'erreur (**error state**). Il permet aussi de définir cet état basé sur un objet qui lui est transmis, en général une propriété du ViewModel qui l'étend. Cela permet d'avoir des busy states différents pour plusieurs valeurs dans les mêmes ViewModels sans dépendre de valeurs d'état implicites. Il contient également une fonction helper pour indiquer l'état occupé pendant qu'une Future est en cours d'exécution. De cette façon, nous évitons d'avoir à appeler `setBusy` avant et après chaque appel de Future.

Pour utiliser le BaseViewModel, vous pouvez l'étendre et utiliser la fonctionnalité busy comme suit.

```dart
class WidgetOneViewModel extends BaseViewModel {
  Human _currentHuman;
  Human get currentHuman => _currentHuman;

  void setBusyOnProperty() {
    setBusyForObject(_currentHuman, true);
    // Récupérer des information à jour
    setBusyForObject(_currentHuman, false);
  }

  void setModelBusy() {
    setBusy(true);
    // Faire quelque chose ici
    setBusy(false);
  }

  Future longUpdateStuff() async {
    // Passe busy à true avant de commencer la Future et le repasse à false après son exécution
    // Vous pouvez également passer un objet en tant qu'objet busy. Si rien n'est précisé, le ViewModel est utilisé.
    var result = await runBusyFuture(updateStuff());
  }

  Future updateStuff() {
    return Future.delayed(const Duration(seconds: 3));
  }
}
```

Cela permet une utilisation pratique dans l'interface utilisateur de manière plus lisible.

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
          // Utilise isBusy pour vérifier si le ViewModel est busy
          color: viewModel.isBusy ? Colors.green : Colors.red,
          alignment: Alignment.center,
          // Un peu idiot de passer la même propriété au viewModel
          // mais cela fait sens ici
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
Les principales fonctionnalités du BaseViewModel sont présentées ci-dessus.

### Gestion de l'état busy

Stacked facilite l'indication à la UI si votre ViewModel est occupé ou non en fournissant quelques fonctions utilitaires. Jetons un coup d'œil à un exemple. Lorsque vous exécutez une Future et que vous voulez indiquer à l'interface utilisateur que le ViewModel est occupé, vous utiliseriez le `runBusyFuture`.

```dart
class BusyExampleViewModel extends BaseViewModel {
 Future longUpdateStuff() async {
    // Passe busy à true avant de commencer la Future et le repasse à false après son exécution
    // Vous pouvez également passer un objet en tant qu'objet busy. Si rien n'est précisé, le ViewModel est utilisé.
    var result = await runBusyFuture(updateStuff());
  }

  Future updateStuff() {
    return Future.delayed(const Duration(seconds: 3));
  }
}
```

Cela définira la propriété busy en utilisant `this` comme clé afin que vous puissiez vérifier si la Future est toujours en cours d'exécution en appelant `isBusy` sur le ViewModel. Si vous voulez lui attribuer une clé différente, dans l'exemple d'une `CartView` où vous avez plusieurs articles répertoriés. En augmentant la quantité d'un article, vous voulez que seul cet article montre un indicateur occupé. Pour cela, vous pouvez également fournir une clé à la fonction `runBusyFuture`.

```dart
const String BusyObjectKey = 'my-busy-key';

class BusyExampleViewModel extends BaseViewModel {
  Future longUpdateStuff() async {
    // Passe busy à true avant de commencer la Future et le repasse à false après son exécution
    // Vous pouvez également passer un objet en tant qu'objet busy. Si rien n'est précisé, le ViewModel est utilisé.
    var result = await runBusyFuture(updateStuff(), busyObject: BusyObjectKey);
  }

  Future updateStuff() {
    return Future.delayed(const Duration(seconds: 3));
  }
}
```

Ensuite, vous pouvez vérifier l'état busy en utilisant cette clé occupée et en appelant `viewModel.busy(BusyObjectKey)`. La clé doit être une valeur unique qui ne changera pas selon l'état busy ou non de l'objet. Dans l'exemple mentionné ci-dessus, vous pouvez utiliser l'identifiant de chacun des produits du panier pour indiquer s'il est occupé ou non. De cette manière, vous pouvez afficher un état occupé pour chacun d'eux individuellement.

### Gestion des erreurs

De la même manière que l'état busy est défini, vous obtenez également un état d'erreur. Lorsque vous utilisez l'un des ViewModels spécialisés ou les fonctions utilitaires Future. `runBusyFuture` ou `runErrorFuture` de Stacked stockera l'exception levée dans le `ViewModel` pour que vous puissiez l'utiliser. Il suivra les mêmes règles que le busy ci-dessus et attribuera l'exception au `ViewModel` ou à la clé transmise. Jetons un coup d'œil à du code.

```dart
class ErrorExampleViewModel extends BaseViewModel {
 Future longUpdateStuff() async {
    // Passe busy à true avant de commencer la Future et le repasse à false après son exécution
    // Vous pouvez également passer un objet en tant qu'objet busy. Si rien n'est précisé, le ViewModel est utilisé.
    var result = await runBusyFuture(updateStuff());
  }

  Future updateStuff() async {
    await Future.delayed(const Duration(seconds: 3));
    throw Exception('Things went wrong');
  }
}
```

Après 3 secondes, cette Future lancera une erreur. Il la capturera automatiquement, rétablira l'affichage en occupé, puis enregistrera l'erreur. Lorsqu'aucune clé n'est fournie à `runBusyFuture`, vous pouvez vérifier s'il y a une erreur en utilisant la propriété  `hasError`. Vous pouvez également obtenir l'exception réelle à partir de la propriété `modelError`. Si vous fournissez une clé, vous pouvez obtenir l'exception en utilisant la fonction d'erreur.

```dart
const String BusyObjectKey = 'my-busy-key';

class BusyExampleViewModel extends BaseViewModel {
  Future longUpdateStuff() async {
    // Passe busy à true avant de commencer la Future et le repasse à false après son exécution
    // Vous pouvez également passer un objet en tant qu'objet busy. Si rien n'est précisé, le ViewModel est utilisé.
    var result = await runBusyFuture(updateStuff(), busyObject: BusyObjectKey);
  }

  Future updateStuff() {
    return Future.delayed(const Duration(seconds: 3));
  }
}
```

Dans ce cas, l'erreur peut être récupérée en utilisant `viewModel.error(BusyObjectKey)` ou vous pouvez simplement vérifier s'il y a une erreur pour la clé en utilisant `viewModel.hasErrorForKey(BusyObjectKey)`. Si vous souhaitez réagir à une erreur de votre Future, vous pouvez overrider `onFutureError` qui renverra l'exception et la clé que vous avez utilisée pour cette Future. Les `ViewModels` spécialisés ont leur propre override d'`onError`, mais celle-ci peut également être utilisée là si nécessaire.


## ViewModels spécialisés

En plus du BaseViewModel, Stacked inclut plusieurs ViewModel spécialisés qui réduisent le code redondant nécessaire pour les cas d'utilisation les plus courants. Ceux-ci sont décrits ci-dessous.

### ReactiveViewModel

Ce ViewModel étend le `BaseViewModel` et ajoute une fonction qui vous permet d'écouter les services utilisés dans le ViewModel. Il y a deux choses à faire pour qu'un ViewModel réagisse aux modifications d'un service.

1. Étendre `ReactiveViewModel`.
2. Implémenter le getter `listenableServices` qui renvoie une liste de services observables.

```dart
class AnyViewModel extends ReactiveViewModel {
  final _postsService = locator<PostsService>();

  int get postCount => _postsService.postCount;

  @override
  List<ListenableServiceMixin> get listenableServices => [_postsService];
}
```

Du côté du service, le service doit utiliser le `ListenableServiceMixin` et passer à `listenToReactiveValues` les propriétés à observer.

```dart
class PostService with ListenableServiceMixin {
  PostService() {
    listenToReactiveValues([_postCount]);
  }

  int _postCount = 0;
  int get postCount => _postCount;

  Future<void> increment() async {
    _postCount++;
    notifyListeners(); // Les ViewModels observant la valeur de postCount sont notifiés et leur View est reconstruite
  }
}
```

### StreamViewModel

Ce `ViewModel` étend le `BaseViewModel` et offre une fonctionnalité pour observer et réagir facilement aux streams de données. Il vous permet de fournir un `Stream` de type `T` auquel il s'abonnera, gérera l'abonnement (disposera lorsque c'est fait) et vous donnera des callbacks où vous pouvez modifier/manipuler les données. Il reconstruira automatiquement la View à mesure que de nouvelles valeurs du Stream arriveront. Il a 1 override requis qui est le getter du Stream et 4 overrides facultatifs.

- **stream**: Retourne le stream que vous souhaitez écouter.
- **onData**: Appelé après que la vue ait été reconstruite et vous fournit les données à utiliser. 
- **onCancel**: Appelé après que le stream ait été disposé. 
- **onSubscribed**: Appelé lorsque le stream a été souscrit.
- **onError**: Appelé lorsqu'une erreur est envoyée sur le stream.


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

// Service (enregistré en utilisant l'injection, NON OBLIGATOIRE)
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

Le code ci-dessus écoutera un stream et vous fournira les données avec lesquelles reconstruire. Vous pouvez créer un `ViewModel`  qui écoute un stream avec deux lignes de code.

```dart
class StreamCounterViewModel extends StreamViewModel<int> {
  @override
  Stream<int> get stream => locator<EpochService>().epochUpdatesNumbers();
}
```

En plus de la fonction onError, vous pouvez remplacer le `ViewModel` qui passera également la propriété `hasError` à true pour faciliter la vérification côté View. Le rappel `onError` peut être utilisé pour exécuter des actions supplémentaires en cas d'échec, et la propriété `hasError` doit être utilisée lorsque vous souhaitez afficher une interface utilisateur spécifique à l'erreur.


### FutureViewModel

Ce `ViewModel` étend le `BaseViewModel` pour fournir une fonctionnalité pour écouter facilement une Future qui récupère des données. Cette exigence découle d'une "View détails" qui doit récupérer des données supplémentaires à afficher à l'utilisateur après avoir sélectionné un élément dans une liste par exemple. Lorsque vous étendez le `FutureViewModel`, vous pouvez fournir un type qui vous obligera ensuite à overrider le getter de la Future que vous voulez exécuter.

La Future s'exécutera automatiquement après la création du ViewModel.

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

Cela définira automatiquement la propriété isBusy de la View et indiquera false lorsqu'elle est complète. Il expose également une propriété `dataReady` qui peut être utilisée. Cela indiquera true lorsque les données sont disponibles. Le `ViewModel` peut être utilisé dans une vue comme suit.

```dart
class FutureExampleView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ViewModelBuilder<FutureExampleViewModel>.reactive(
      builder: (context, viewModel, child) => Scaffold(
        body: Center(
          // Le viewModel va indiquier busy jusqu'à ce que la Future soit terminée
          child: viewModel.isBusy ? CircularProgressIndicator() : Text(viewModel.data),
        ),
      ),
      viewModelBuilder: () => FutureExampleViewModel(),
    );
  }
}
```

Le `FutureViewModel` capturera également une erreur et indiquera qu'il a reçu une erreur via la propriété `hasError`. Vous pouvez également overrider la fonction onError si vous voulez recevoir cette erreur et effectuer une action spécifique à ce moment-là.

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

La propriété hasError peut être utilisée de la même manière que la propriété isBusy.

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

En plus de pouvoir exécuter une Future, vous pouvez également faire en sorte qu'une vue réagisse aux données renvoyées par plusieurs Futures. Cela vous oblige à fournir une map de string ainsi qu'une fonction qui retourne une Future et qui sera exécutée après que le `ViewModel` soit construit. Ci-dessous, un exemple d'utilisation d'un `MultipleFutureViewModel`.

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

Les données pour la Future seront dans le `dataMap` lorsque la Future sera exécutée. Chaque Future sera individuellement définie comme busy en utilisant la clé pour la Future transmise. Avec ces fonctionnalités, vous pourrez afficher un loader séparé pour chaque partie de la UI qui dépend de données d'une Future pendant son exécution. Il existe également une fonction `hasError` qui indiquera si la Future pour une clé spécifique a levé une erreur.

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
                    // Indique busy pour la Future number jusqu'à ce que les données soient récupérées ou que l'appel ait échoué
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
                    // Idique busy pour la Future string jusqu'à ce que les données soient récupérées ou que l'appel ait échoué
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

De manière similaire au `StreamViewModel`, nous avons également un `MultipleStreamViewModel` qui vous permet de fournir plusieurs streams via un lien string -> stream. Chaque valeur de ces stream sera stockée dans les data[key] et il en va de même pour les erreurs. Chaque valeur du stream émise appellera `notifyListeners()` pour mettre à jour la UI. `MultipleStreamViewModel` nécessite que la `streamsMap` soit overridée.

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

Tout comme pour le ViewModel à un seul stream unique. Lorsque votre stream a changé, vous devez appeler `notifySourceChanged` pour indiquer au ViewModel qu'il doit cesser d'écouter le stream actuel et s'abonner au nouveau. Si vous voulez vérifier si le flux a rencontré une erreur, vous pouvez utiliser la fonction `hasError` avec la clé du flux, vous pouvez également obtenir l'erreur en utilisant `getError` avec la clé du flux.

### IndexTrackingViewModel

Ce ViewModel fournit la fonctionnalité de base nécessaire pour l'index tracking comme la bottom navbar, le side drawer, etc. Il offre des méthodes et des propriétés pour définir et obtenir l'index actuel ainsi qu'une propriété qui indique si reversed doit être utilisé avec des animations lors des transitions de page. Il peut être utilisé dans une View comme suit.

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
          onTap: viewModel.setIndex,
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

Où le `ViewModel` est simplement celui-ci.

```dart
class HomeViewModel extends IndexTrackingViewModel {}
```

Une autre fonction qu'il possède est `setCurrentWebPageIndex` qui définit l'index actuel en utilisant la Route actuelle pour le Web. Cette fonction vous permet d'obtenir l'index à partir de l'URL lors d'un refresh de la page. Elle peut être utilisée comme suit :

```dart
class BottomNavExampleViewModel extends IndexTrackingViewModel {
  final _routerService = exampleLocator<RouterService>();

  BottomNavExampleViewModel() {
    setCurrentWebPageIndex(_routerService);
  }
}
```

---

## Nous sommes prêts pour le Web 🚀

Maitrisez Flutter pour le web avec le [cours Flutter Web](https://masterflutterweb.carrd.co/) officiel.
