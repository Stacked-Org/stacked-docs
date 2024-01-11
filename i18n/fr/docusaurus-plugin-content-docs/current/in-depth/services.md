---
id: services
title: Services
sidebar_label: Services
sidebar_position: 3
---


# Qu'est-ce qu'un Service ?

En plus d'avoir une View (qui fait le rendu notre UI) et un ViewModel (qui contient toute la logique de l'état de la View), nous avons également des Services. Un service, en termes simples, est la classe qui effectue ou orchestre le vrai travail. Il existe deux types de services.


## Types de Services

Nous avons un Facade Service et un App Service. _En fait, nous recherchons de meilleurs noms, alors n'hésitez pas à collaborer si vous êtes intéressé._ Regardons d'abord le service qui "fait le travail réel".

### Facade Service

Un facade service englobe un autre package pour supprimer la dépendance forte de notre codebase et "fait le travail réel". Regardons le problème que cela résout en examinant l'exemple ci-dessous :

```dart
class HomeViewModel extends BaseViewModel {
  List<Artist> _artists = [];

  Future<void> fetchArtists() async {
    // #1: Structure la requête http
    final response = await http.get(Uri.https('venu.is', '/artists'));

    // #2: Valide si la réponse est un succès
    if (response.statusCode < 400) {
      // #3: Convertit la réponse en map
      final responseBodyAsMap = jsonDecode(response.body);

      // #4: Récupère les informations utiles de la réponse
      final artistMaps =
          responseBodyAsMap['data'] as List<Map<String, dynamic>>;
      
      // #5: Désérialise en une liste d'artistes
      _artists = artistMaps.map(Artist.fromJson).toList();
    }
  }
}

class Artist {
  final String name;
  final String coverImage;

  Artist({required this.name, required this.coverImage});

  factory Artist.fromJson(Map<String, dynamic> data) => Artist(
        name: data['name'],
        coverImage: data['coverImage'],
      );
}
```

Dans le code ci-dessus, on peut voir que "le travail effectué" est entièrement effectué par le `HomeViewModel`. Cela signifie que le `HomeViewModel` a la responsabilité de structurer et d'effectuer la requête http (#1), de vérifier qu'elle a réussi (#2) et de désérialiser la réponse en une liste d'artistes (#3, #4, #5). C'est assez courant en Flutter. En fait, dans la plupart des cas, on vous apprend à le faire dans votre fonction `initState` 🤯🤯, ce que, si vous êtes sur cette page, je vous supplie de ne jamais faire.

C'est là que le Service de Facade intervient. Le `HomeViewModel`, comme tous les autres ViewModels, est là pour gérer la logique de l'état de l'application et maintenir l'état de la View. Il ne devrait pas effectuer le travail réel mentionné ci-dessus. Pour résoudre cela, nous introduisons un service qui englobe tout cela pour nous. Voici à quoi nous voulons que cela ressemble dans notre modèle mental :

![Stacked architecture breakdown that shows what code does the actual work](/img/tutorial/services-who-does-the-work.png)

Comme indiqué par le bloc rouge, la View et le ViewModel ne doivent pas effectuer de travail. Ils délèguent au service, où tout le travail réel est effectué. Regardons un exemple. Dans votre projet Stacked, exécutez :

```shell
stacked create service api
```

Cela générera une classe `ApiService` et l'enregistrera dans le service locator, créera le fichier de tests unitaires et enregistrera le mock de ce service pour les tests unitaires. Dans le `ApiService`, nous pouvons maintenant créer une version typée du travail qui était effectué par le ViewModel. Nous allons tout déplacer dans une fonction appelée `getArtists` qui nous renvoie une `List<Artist>` :

```dart
class ApiService {
  Future<List<Artist>> getArtists() async {
    final response = await http.get(Uri.https('venu.is', '/artists'));
    if (response.statusCode < 400) {
      final responseBodyAsMap = jsonDecode(response.body);
      final artistMaps =
          responseBodyAsMap['data'] as List<Map<String, dynamic>>;
      return artistMaps.map(Artist.fromJson).toList();
    }

    throw Exception('Response Code: ${response.statusCode} - ${response.body}');
  }
}
```

Maintenant que nous avons englobé la fonctionnalité (et l'implémentation) du package dans un Service, nous pouvons l'utiliser dans le `HomeViewModel` :

```dart
class HomeViewModel extends BaseViewModel {
  final _apiService = locator<ApiService>();
  List<Artist> _artists = [];

  Future<void> fetchArtists() async {
    _artists = await _apiService.getArtists();

    // Utilisez artistes ou extrayez un état supplémentaire, par ex.
    // empty state, multi select, etc ...
  }
}
```

Rien de plus n'est nécessaire pour créer un Service de Facade. Avec ce petit changement, votre code bénéficie des avantages suivants :

- **Séparation des responsabilités / Responsabilité unique** : Vous avez maintenant séparé la responsabilité des requêtes http, de la désérialisation, de la vérification des erreurs et de la construction du modèle du ViewModel. Le ViewModel peut maintenant se concentrer uniquement sur la gestion de l'état pour la View.
- **Plus facile à tester** : Comme la dépendance forte sur le package Http a été supprimée, cela signifie que vous pouvez mocker l'ApiService et écrire des tests unitaires déterministes pour votre ViewModel.
- **Code DRY** : Tout autre ViewModel ou Service qui nécessite cette fonctionnalité peut simplement `locate` le service et utiliser la fonction `getArtists`. Pas besoin de la dupliquer ailleurs.
- **Lisibilité du code** : À notre avis, le code semble clair et il est facile de voir très rapidement ce qui est attendu sans avoir à voir la construction des requêtes http et la complexité de la désérialisation de la réponse dans une liste distincte.

Ce modèle est au cœur de l'attrait de Stacked. Dans presque toutes les situations, les experts de Stacked recommanderont de "Créer un service et l'appeler dans votre ViewModel".


### App Service

Un App Service (faute d'un meilleur nom) est l'endroit où réside votre logique métier. Ces types de services orchestrent l'interaction entre les Facade Services pour accomplir une certaine business logic (métier). Prenons par exemple un `ArtistService` qui a une fonction qui fait ce qui suit :

- Vérifie si un utilisateur est connecté
- Récupère des artistes lorsqu'un utilisateur est connecté
- Enregistre les artistes dans la base de données locale lorsqu'ils sont renvoyés

C'est ainsi que nous voulons que cette "Fonctionnalité" apparaisse dans notre modèle mental :

![App Service orchestration using Facade Services](/img/tutorial/services-app-service-orchestration.png)

Nous créons une fonction dans la classe `ArtistService` qui utilise nos Facade Services pour déléguer le travail réel à effectuer. Voyons à quoi cela ressemble en code. _Ce code suppose que les autres services sont déjà créés. Il ne s'agit pas d'un exemple complet de création d'un service Auth ou d'un service DB, mais illustre simplement comment utiliser ces services._


Dans votre classe d'App Service, le `ArtistService`, ce que vous ferez est :

- Localiser les Services requis en utilisant le `locator` _Documentation sur le `locator` à venir !_
- Utiliser leurs fonctionnalités pour orchestrer la logique métier


En code, cela se traduit par ce qui suit :

```dart
class ArtistService {
  final _databaseService = locator<DatabaseService>();
  final _authenticationService = locator<AuthenticationService>();
  final _apiService = locator<ApiService>();

  Future<List<Artist>> getArtists() async {
    // Vérifier si l'utilisateur est connecté
    if (_authenticationService.userLoggedIn()) {
      // Récupérer les artistes depuis le backend
      final newArtists = await _apiService.getArtists();

      // Sauver en base de données
      await _databaseService.saveArtists(newArtists);

      return newArtists;
    }

    throw Exception('User must be logged in to see artists');
  }
}
```

Nous localisons chacun des services, puis utilisons leurs fonctionnalités pour atteindre notre objectif. Cela rend notre processus de développement de fonctionnalités très clair et facile à lire lorsqu'on regarde nos App Services.


Ceci conclut notre définition des Services.

---

## Nous sommes prêts pour le Web 🚀

Maitrisez Flutter pour le web avec le [cours Flutter Web](https://masterflutterweb.carrd.co/) officiel.