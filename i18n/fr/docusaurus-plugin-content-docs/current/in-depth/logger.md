---
id: logger
title: Logger
sidebar_label: Logger
sidebar_position: 4
tags: [logger]
---

Si vous souhaitez ajouter la journalisation (Logger) à votre application, tout ce que vous avez à faire est de fournir une configuration de logger.

```dart
@StackedApp(
    logger: StackedLogger(),
)
```

En plus de cela, vous devez ajouter le package `logger` dans le fichier pubspec de votre projet.

```yaml
dependencies:
  ...
  logger:
```

Lorsque vous exécutez **build_runner**, il créera un nouveau fichier appelé `app.logger.dart` dans le dossier `app`. Dans ce fichier, vous verrez du code pour le logger. La partie la plus importante de ce fichier pour vous est la fonction `getLogger`. Cette fonction est celle que vous utiliserez pour le logger dans votre application. Il y a quelques choses à savoir sur la configuration de ce logger.

### Comment l'utiliser

Lors de l'utilisation du logger, fournissez le nom exact de la classe dans laquelle il est utilisé. Pour utiliser un logger, vous ferez ce qui suit.


```dart
class MyViewModel {
  final logger = getLogger('MyViewModel');

  void doStuff() {
    logger.i('');
  }
}
```

Le code ci-dessus affichera ceci :

```
💡 MyViewModel | doStuff
```

Il affichera automatiquement le nom de la fonction dans laquelle il se trouve. Cela ne peut être fait que si nous connaissons le nom exact de la classe pour laquelle le logger est configuré. C'est pourquoi c'est si important.

### Éviter les conflits avec getLogger

Si vous avez déjà une fonction `getLogger` dans votre projet et que vous souhaitez utiliser un nom différent, vous pouvez également le fournir à la configuration du logger.

```dart
@StackedApp(
logger: StackedLogger(
    logHelperName: 'getStackedLogger',
  )
)
```

Maintenant, la fonction pour obtenir votre journal s'appellera `getStackedLogger`. Si vous souhaitez un guide plus détaillé sur la manière de journaliser efficacement dans votre application, [lisez ce guide](https://www.filledstacks.com/post/flutter-logging-a-guide-to-use-it-effectively/) que nous utilisons pour nos applications de production.
