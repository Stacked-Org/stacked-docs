---
id: how-it-works
title: Comment ça marche ?
sidebar_label: Comment ça marche ?
tags: [Introduction]
---

Stacked crée une simple relation View / ViewModel permettant de réaliser la gestion du state sans code répétitif. L'idée est de séparer complètement notre state de notre UI, nous permettant de tester et faire évoluer facilement la logique sans impacter la UI. Regardons comment ça marche.


# Essayons ensemble

Dans l'app que vous avez créé pendant le [Guide d'Introduction](00-overview.md#cr%C3%A9er-une-app-stacked), nous allons créer une nouvelle View appelée `counter`, très original, je sais... Mais il s'agit surtout de vous montrer les bases de Stacked. Pour créer la nouvelle vue avec Stacked, exécutez la commande suivante :

```shell
stacked create view counter
```

Cette commande va créer trois fichiers pour nous :

1. [counter_view.dart](#counter-view) : C'est ici que vous construisez la UI en utilisant les widgets Flutter
2. [counter_viewmodel.dart](#counter-viewmodel-flutter-statemanagement): Stocke le state et exécute les actions lors d'interactions utilisateurs.
3. counter_viewmodel_test.dart: Contient tous les **unit** tests pour le `CounterViewModel`

Détaillons la View en premier.


## Counter View

La `CounterView` contient la UI qui sera affichée sur le device. En observant la structure de la View, vous remarquez qu'elle n'étend ni `StatelessWidget`, ni `StatefulWidget`. A la place, la classe étend `StackedView`:

```dart
class CounterView extends StackedView<CounterViewModel> {

  @override
  // Une fonction buidler qui nous donne une ViewModel
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

De plus, vous pouvez également voir un override obligatoire appelée `viewModelBuilder`. Cette fonction construit notre ViewModel qui stockera notre état. Mais avant d'entrer dans les détails, laissez-nous vous montrer comment fonctionne cette relation View / ViewModel. C'est la fondation de la gestion du state de Stacked. L'objectif de `StackedView` est de 'lier notre ViewModel à notre UI'. Cela nous permet de séparer complètement le state et la logique de notre interface utilisateur. Le mécanisme est assez simple.

**Construire la UI basé sur le ViewModel, mettre à jour le ViewModel puis reconstruire la UI basée sur ce ViewModel.** Voici un petit diagramme qui illustre les explications ci-dessous :

![Stacked View-ViewModel binding Diagram](/img/todo/view-viewmodel-relationship.png)

1. La méthode `viewModelBuilder` crée notre `ViewModel`
2. Stacked passe ce `ViewModel` à notre fonction `builder`
3. La fonction `builder` crée notre UI
4. L'utilisateur interagit avec cettre UI
5. L'interaction est transmise au `ViewModel`, met à jour `ViewModel`, puis demande de reconstruire la UI via `rebuildUi` 
6. La fonction `rebuildUi` déclenche la fonction `builder` avec le `ViewModel` mis à jour pour reconstruire la UI

Et c'est aussi simple que ça. Avec ce processus, vous pouvez gérer 100% des scénarios possibles sans jamais avoir à écrire du code relatif à la gestion du state dans votre View. C'est une séparation propre de votre state, qui est le meilleur point de départ pour une application maintenable.


## Counter ViewModel: Gestion du Flutter State

La `ViewModel` générée est très simple : il s'agit d'une classe normale qui étend `BaseViewModel` :

```dart
class CounterViewModel extends BaseViewModel {}
```

Et la gestion du state est tout aussi simple. Pour notre exemple de compteur, nous voulons stocker un integer qui est incrémenté, donc nous allons créer une valeur privée, ainsi qu'une fonction pour l'incrémenter. Quand nous avons changé la valeur, nous appelons `rebuildUi` qui va exécuter notre fonction `builder` dans la [View](#counter-view) :

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

Pour conclure l'exemple, affichons le compteur à l'écran et appelons la fonction `incrementCounter` quand le `FloatingActionButton` est tapé. Au sein du fichier `counter_view.dart`, modifiez la fonction pour retourner ceci :

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

Enfin, la dernière chose à faire est d'ouvrir le fichier `startup_viewmodel.dart` et modifier :

```dart
_navigationService.replaceWithHomeView();
```

pour

```dart
_navigationService.replaceWithCounterView();
```

Vous pouvez maintenant lancer votre application en exécutant `flutter run` ou en démarrant une session de debug dans VS Code. Sur l'écran, vous devriez voir apparaitre un compteur qui est incrémenté à chaque fois que vous tapez sur le `FloatingActionButton`.

![Example Counter App in Stacked](/img/getting-started/01-counter-example.gif)

Nous allons à présent aborder la `StartupView` ainsi que la `Navigation`.

---

## Nous sommes prêts pour le Web 🚀

Maitrisez Flutter pour le web avec le [cours Flutter Web](https://masterflutterweb.carrd.co/) officiel.