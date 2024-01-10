---
id: startup-logic
title: Logique de démarrage
sidebar_label: Logique de démarrage
---

Stacked contient quelques fonctionnalités que nous avons rencontrées dans la pluspart des applications. Celles-ci incluent : 

1. Un endroit où exécuter du code avant que l'app se lance
2. La navigation
3. La journalisation (logging)
4. UI superposées (overlays)

Dans cette section, nous aborderons le point #1 et survolerons certains autres.


# Logique de démarrage

Si vous avez créé une application en utilisant la CLI Stacked, vous disposerez d'une View et d'un ViewModel appelés `startup`. Le but de cette View est de s'afficher directement après l'écran de démarrage et de vous fournir un endroit pour exécuter votre "logique de démarrage", le code que vous souhaitez exécuter avant le lancement de l'application. C'est là que vous effectuerez par exemple des vérifications pour décider où naviguer au démarrage. Construisons quelque chose pour illustrer cette fonctionnalité.


Ci-dessous se trouve un schéma qui montre ce que nous voulons accomplir : nous aimerions naviguer vers un endroit différent en fonction du statut de la connexion de l'utilisateur.

![Stacked Startup Logic Diagram](/img/getting-started/02-startup-flow.png)

Voici comment le code s'exécute avec Stacked :

1. L'application se lance et ouvre la `StartupView`
2. Dans le `StartupViewModel`, la fonction `runStartupLogic` est exécutée.
3. Nous vérifions via notre `authenticationService` si l'utilisateur est connecté ou non.
4. Si l'utilisateur est bien connecté, nous naviguons vers la `HomeView`.
5. Sinon, nous naviguons vers la `LoginView`.


_Remarque : Le service d'authentification est factice. Vous devez utiliser votre propre implémentation d'authentification._

## Préparons les Views

Nous commencerons par créer la LoginView afin de pouvoir y naviguer. Dans votre projet Stacked, exécutez la commande suivante :

```shell
stacked create view login
```

Une fois terminé, ouvrez `login_view.dart` et changez la couleur de fond en rouge :

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

Maintenant, ouvrez `home_view.dart` et changez la couleur de fond en violet :

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


## Enregistrons notre Service

Maintenant, nous pouvons créer notre service d'authentification. Exécutez la commande suivante :

```shell
stacked create service authentication
```

Cela créera le service et l'enregistrera automatiquement pour l'inversion de dépendance. Ouvrez `authentication_service.dart` où nous ajouterons une nouvelle fonction pour vérifier si l'utilisateur est connecté. Pour l'instant et pour simplifier les choses, cela renverra une valeur statique :

```dart
class AuthenticationService {
  bool userLoggedIn() {
    return true;
  }
}
```
**Note:** : Nous avons un cours complet sur l'authentification via Firebase si vous souhaitez implémenter une authentification réelle via Stacked
([Connexion avec Firebase en utilisant Stacked](https://www.filledstacks.com/post/sign-in-with-google-or-apple-sign-in-using-flutter/), [Logique de démarrage personnalisée avancée avec Stacked](https://www.filledstacks.com/post/practical-guide-to-unit-testing-in-flutter/#writing-a-unit-test)).

## Écrire la logique de démarrage

Ouvrez `startup_viewmodel.dart` où nous pouvons enfin commencer à écrire notre logique de démarrage pour l'application. Comme nous l'avons vu précédemment, nous voulons vérifier si l'utilisateur est connecté, et si c'est le cas, aller vers `HomeView`, sinon le rediriger vers `LoginView`. Cela se traduit par le code suivant :

```dart
class StartupViewModel extends BaseViewModel {
  // 1. Récupérer l'Authentication et le NavigationService
  final _authenticationService = locator<AuthenticationService>();
  final _navigationService = locator<NavigationService>();

  Future runStartupLogic() async {
    // 2. Vérifier si l'utilisateur est connecté
    if (_authenticationService.userLoggedIn()) {
      // 3. Naviguer vers la HomeView
      _navigationService.replaceWith(Routes.homeView);
    } else {
      // 4. Ou vers la LoginView
      _navigationService.replaceWith(Routes.loginView);
    }
  }
}
```

Nous commençons par obtenir les services dont nous avons besoin, `AuthenticationService` que nous avons créé et `NavigationService` qui fait partie de `Stacked`. Ensuite, nous vérifions si l'utilisateur est connecté et en fonction de cela, nous naviguons soit vers `HomeView` soit vers `LoginView`. C'est aussi simple que ça. Si vous exécutez ce code, vous verrez que nous aboutissons sur la Vue violette. Si vous changez la valeur dans `AuthenticationService` à `false` et redémarrez l'application, vous verrez que nous aboutissons sur la Vue rouge. Cela couvre les bases du code de démarrage dans Stacked. Nous avons évoqué d'autres parties ci-dessus qui ne sont pas encore expliquées, mais nous les aborderons dans les prochains chapitres.

:::info Tutoriel de démarrage plus complexe
[Voici un tutoriel plus complexe](https://www.filledstacks.com/post/practical-guide-to-unit-testing-in-flutter/#writing-a-unit-test) qui couvre quelques scénarios supplémentaires lors de la logique de démarrage.
:::

---

## Nous sommes prêts pour le Web 🚀

Maitrisez Flutter pour le web avec le [cours Flutter Web](https://masterflutterweb.carrd.co/) officiel.