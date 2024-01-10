---
id: navigation-basics
title: Concepts de base de la Navigation
sidebar_label: Navigation
---

Si vous avez suivi ce tutoriel depuis le [début](00-overview.md), vous devriez avoir aperçu ce code :

```dart
_navigationService.replaceWith(Routes.homeView);
```

La navigation fait partie des Services Stacked, un groupe de services au sein de Stacked qui vous aide à effectuer certaines tâches dans votre code. _Pour en savoir plus sur ce qu'est un service, [lisez ceci](/in-depth/services.md)_.


Les services actuellement inclus sont :

1. [Navigation Service][#navigation]
2. Dialog Service
3. Bottom Sheet Service
4. Snackbar Service

... et bientôt d'autres à venir. Dans ce document, nous aborderons la navigation.


# Navigation

Le `NavigationService` est ce qui vous permet de naviguer au sein d'une application Stacked. Il est accessible dans tous les `ViewModels` via le locator, où vous pouvez effectuer vos tâches de navigation.

Vos Views seront automatiquement ajoutées à `app/app.dart` dans la section ci-dessous, lorsque vous utilisez la CLI pour créer une View. Cela générera les méthodes de navigation que vous pourrez utiliser :

```dart lib/app/app.dart
@StackedApp(routes: [
  MaterialRoute(page: StartupView),
  MaterialRoute(page: HomeView),
  MaterialRoute(page: CounterView),
  // @stacked-route
])
class App {}
```


## Effectuer une navigation

Il existe différents types de navigation. Explorons-les tous pour comprendre ce qu'ils font.

### Naviguer vers une View

Il s'agit de la navigation la plus courante. Cela ajoutera la `View` vers laquelle vous naviguez à la pile de navigation. Nous le faisons en utilisant la fonction navigateTo[NomDeLaView] :

```dart
_navigationService.navigateToHomeView();
```

### Naviguer vers une View avec des paramètres

Dans votre application Stacked générée [au début](00-overview.md), ouvrez `home_view.dart` où nous transmettrons une valeur à travers son constructeur :

```dart
class HomeView extends StackedView<HomeViewModel> {
  final int startingIndex;
  const HomeView({Key? key, required this.startingIndex}) : super(key: key);
  ...
}
```

Maintenant, exécutez `stacked generate`. Vous remarquerez que l'appel `navigateToHomeView` ci-dessus aura désormais une erreur de compilation. Comme `startingIndex` est requis, vous devrez obligatoirement transmettre la valeur de `startingIndex` lors de la navigation vers HomeView :

```dart
_navigationService.navigateToHomeView(startingIndex: 0);
```

### Remplacer par une View

Une autre méthode de navigation populaire consiste à remplacer la View actuelle à l'écran par une nouvelle, au lieu de l'ajouter en haut de la pile de navigation. Cela se fait en utilisant la fonction `replaceWith[NomDeLaView]` et fonctionne de manière similaire à ce qui précède :

```dart
_navigationService.replaceWithHomeView(startingIndex: 0);
```

### Navigation Retour (Back)

Lorsque vous souhaitez revenir d'une View à la Vue précédente, vous pouvez utiliser la fonction `back` :

```dart
_navigationService.back();
```

### Transmettre des données à la View précédente

La fonction `back` prend également un paramètre `result`. Cela transmettra le résultat à la fonction appelante. Tous les appels de navigation renvoient un `Future` afin qu'ils puissent tous être attendus :

```dart
final result = await _navigationService.replaceWithHomeView(startingIndex: 0);
print('Returned result: $result');
```

Ainsi, avec le code ci-dessus, lorsque vous appelez :

```dart
_navigationService.back(result: 'From back call');
```

Il affichera `Returned result: From back call`. Le résultat est de type `dynamic`, vous pouvez donc renvoyer n'importe quel objet : votre propre classe ou des types built-in. En plus des bases ci-dessus, il existe quelques fonctions supplémentaires qui facilitent certaines tâches de navigation :

- **clearStackAndShow:** Cela effacera l'ensemble de la pile de navigation puis affichera la `HomeView`:

```dart
_navigationService.clearStackAndShow(Routes.homeView);
```

Des documents et tutoriels plus avancés sur la navigation arriveront bientôt.

### Transitions custom 

Dans Flutter, les routes `MaterialRoute` et `CupertinoRoute` ont des transitions pré-définies. Pour définir votre propre transition, vous devez utiliser une `CustomRoute`. Stacked vous permet de le faire. La transition peut être fournie à l'application `StackedApp` pour garantir que toute navigation vers cette vue utilise la transition fournie, ou elle peut être fournie lors de la navigation vers la View.

**Définition au niveau de l'app**

Dans votre fichier `app.dart` lorsque vous définissez la route, utilisez une `CustomRoute` plutôt qu'une `MaterialRoute` or `CupertinoRoute`.

```dart
@StackedApp(routes: [
  MaterialRoute(page: StartupView),
  MaterialRoute(page: HomeView),
  CustomRoute(page: CounterView), // <== Custom Route
  // @stacked-route
])
class App {}
```

La route personnalisée vous permet de fournir une propriété de transition. Cela DOIT être une fonction de construction statique. Stacked est livré avec des transitions prédéfinies que vous pouvez utiliser. Nous couvrons les transitions de base comme `fadeIn`, `zoomIn`, `slideLeft`, `slideRight` et bien d'autres sous la classe `TransitionsBuilders`. Utilisons le `fadeIn` pour notre exemple.

```dart
@StackedApp(routes: [
  ...
  CustomRoute(
    page: CounterView, 
    transitionsBuilder: TransitionsBuilders.fadeIn,
  ),
  // @stacked-route
])
class App {}
```

Maintenant, exécutez `stacked generate` et lorsque vous naviguerez vers cette vue, vous la verrez apparaître en fade-in. Si vous ne voulez aucune transition (ce qui est généralement préféré sur le web), supprimez le constructeur de transition et gardez uniquement la `CustomRoute`.

**Définition au moment de la navigation**

En plus de fournir la transition au niveau de l'application, vous pouvez également fournir la transition lors de la navigation. Pour ce faire, votre route doit toujours être une `CustomRoute` pour permettre à Stacked de construire la transition que vous souhaitez. Cela ne nécessite pas de régénération du code pour fonctionner, si le code a déjà été généré en tant que `CustomRoute`.

```dart
  await _navigationService.navigateTo(
    Routes.secondView,
    transition: TransitionsBuilders.fadeIn,
  );
```

**Construisez votre propre transition**

Construire une transition est assez simple. Vous créez une classe centralisant vos `Transitions` et à l'intérieur, vous créez une fonction statique avec la signature suivante : `Widget Function(BuildContext context, Animation<double> animation, Animation<double> secondaryAnimation, Widget child)`. Cette fonction sera appelée au moment de la transition. Voici un exemple de transition en utilisant le package `Animations`.

```dart
import 'package:animations/animations.dart';
import 'package:flutter/material.dart';

class CustomRouteTransition {
  static Widget sharedAxis(BuildContext context, Animation<double> animation,
      Animation<double> secondaryAnimation, Widget child) {

    // À cet enderoit, vous pouvez utiliser n'importe quelle classe de Transition existante dans Flutter
    return SharedAxisTransition(
      animation: animation,
      secondaryAnimation: secondaryAnimation,
      transitionType: SharedAxisTransitionType.scaled,
      child: child,
    );
  }
}
```

Cela peut être utilisé de la même manière que les transitions fournies avec Stacked dans la classe `TransitionBuilders`. 

```dart
// Dans app.dart
CustomRoute(
  page: CounterView, 
  transitionsBuilder: CustomRouteTransition.sharedAxis,
),

// À la navigation
await _navigationService.navigateTo(
  Routes.secondView,
  transition: transitionsBuilder: CustomRouteTransition.sharedAxis,
);
```

---

## Nous sommes prêts pour le Web 🚀

Maitrisez Flutter pour le web avec le [cours Flutter Web](https://masterflutterweb.carrd.co/) officiel.
