---
id: routing-basics
title: Configuration du routing
sidebar_label: Configuration du routing
---

Initialement, Stacked a été installé sur les appareils, exclusivement en tant qu'application depuis le début du produit. Nous n'avions pas l'intention de prendre en charge le web via le framework car nous n'avions jamais eu la nécessité de construire un projet en utilisant Flutter web. A présent que Flutter est devenu un framework viable pour les applications Web, cela a changé. 

Pour cette raison, nous avons récemment introduit un nouveau service dans Stacked qui offre un meilleur support pour le web. Il s'appelle le `RouterService`. Il s'agit du service qui remplit la même fonction que le `NavigationSevice` mais qui est mieux adapté à la navigation sur le web. La configuration du `RouterService` nécessite une étape supplémentaire par rapport au `NavigationService`.

_Cette configuration est incluse si vous générez un projet `Stacked` en utilisant l'option `—template=web` lors de la création d'une application avec la CLI._

# Configuration de la navigation Web

Pour utiliser la navigation prise en charge par le web dans Stacked, vous devez supprimer le `NavigationService` de votre fichier `app.dart` et le remplacer par le `RouterService`.

```dart
@StackedApp(
	routes: [ ... ],
	dependencies: [
    LazySingleton(classType: RouterService),
    LazySingleton(classType: DialogService),
    LazySingleton(classType: BottomSheetService),
	]
)
class App {}
```

L'étape suivante consiste à indiquer au générateur d'utiliser la version v2 du générateur qui crée un `StackedRouter` basé sur le Flutter V2 navigator. Créez un fichier à la racine du projet appelé `build.yaml`.


```dart
 targets:
  $default:
    builders:
      stacked_generator|stackedRouterGenerator:
        options:
          navigator2: true
```

Ici, nous indiquons simplement au `stackedRouterGenerator` que nous voulons qu'il utilise `navigator2`. C'est tout ce dont vous avez besoin pour que la configuration fonctionne. Ci-dessous, quelques questions fréquemment posées sur le `RouterService`.

# FAQ RouterService

## En quoi est-ce différent du Navigation Service ?

Le `NavigationService` est basé sur la v1 du Flutter navigator, le `RouterService` est basé sur la v2 du Flutter navigator. Les deux fonctionnent sur toutes les plateformes, l'avantage du navigator v2 est qu'il est mieux adapté pour gérer la navigation par URL. Si vous construisez une application qui nécessitera une navigation spécifiquement par URL lorsqu'elle sera déployée sur le web, vous devez construire votre application en utilisant le `RouterService`. Si vous ne vous dirigez pas vers le web, vous pouvez continuer avec le `NavigationService`.

## Pourquoi ne pas avoir qu'un seul service ?

C'est vers cette direction que nous travaillons. À terme, nous remplacerons le `NavigationService` par le `RouterService`. Nous le gardons séparé pour le moment afin de garantir la rétro-compatibilité avec les anciens projets et pour voir combien d'utilisateurs commencent à l'utiliser. Les deux font la même chose, donc nous pouvons remplacer "silencieusement" le navigation service par le router service et tout devrait toujours fonctionner comme prévu.

## Est-ce que cela fonctionne avec les apps mobiles ?

Oui. Le `RouterService` fonctionne de la même manière que le `NavigationService`. La seule différence est qu'il a plus de fonctionnalités adaptées à la navigation par URL : des éléments tels que les dynamic path segments, route redirects, queryParameters et les protections des routes.

Si vous avez d'autres questions, veuillez les poster dans les discussions sur Git ou dans le [Discord de la communauté](https://discord.gg/SAsvNZRep3).