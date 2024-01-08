---
id: overview
title: Aperçu
sidebar_label: Qu'est-ce que Stacked ?
---

Stacked est un framework de production pour Flutter. Que ce soit pour les équipes ou pour les développeurs solos qui exigent un code de haute qualité, Stacked simplifie le développement et la maintenance d'application Flutter de production. Construit par [FilledStacks](https://www.youtube.com/filledstacks), une agence de développement d'applications mobile spécialisées en iOS et Android natifs, Xamarin et maintenant Flutter, et ayant construit plus de 30 applications. Nous savions ce qui est requis pour construire de **grandes applications**, **évolutives**, **testables** et **maintenables**, ceci est le focus premier de Stacked. 

- **Évolutif**: Stacked a été conçu pour permettre à votre équipe d'évoluer tout en conservant une productivité élevée. Grâce à de bonnes conventions de code et une forte opinion sur la manière de développer des fonctionnalités, vous ou votre équipe disposerez d'un guide clair pour l'ajout et la maintenance des fonctionnalités.

- **Testable**: Nous mettons l'accent sur les tests unitaires et notre architecture MVVM est conçue pour faciliter autant que possible les tests unitaires de n'importe quelle partie de votre logique métier ou du state.

- **Maintenable**: Nous avons des convictions fortes concernant la séparation des responsabilités. Ceci, combiné à nos principes de développement stricts, vous permettra de faire évoluer votre code de manière cohérente et sans crainte qu'il ne devienne complexe à mesure que vous grandissez.

Et maintenant, avec sa propre CLI, c'est encore plus simple d'apprendre et d'utiliser Stacked.


# Démarrage facile

:::info Astuce d'installation
Vérifiez que vous avez Flutter correctement installé et configuré. Si ce n'est pas le cas, suivez [Flutter Install](https://docs.flutter.dev/get-started/install) pour le configurer.
:::

Pour commencer avec Stacked, installez le package stacked_cli package via pub en exécutant :

```shell
dart pub global activate stacked_cli
```

Ceci vous donnera accès à l'ensemble des fonctionnalités de Stacked.


## Créer une app Stacked

Pour créer votre première app, exécutez :

```shell
stacked create app my_first_app
```

Cela créera votre application Stacked Flutter. Connectez un device ou un émulateur et lancez votre nouvelle app via la commande Flutter habituelle :

```shell
flutter run
```

Vous devriez obtenir un écran de chargement avec un indicateur, suivi d'une View comprenant un compteur et quelques boutons. Ce point de départ vous donne les bases nécessaires pour une application Stacked. Voici ce qui est configuré par défaut : 

- Gestion du state
- Logique au démarrage de l'app
- Navigation
- Constructeurs de UI pour les Dialogs
- Constructeurs de UI pour les BottomSheets
- Inversion de dépendance
- Exemple de tests unitaires

Soit tout ce que vous avez besoin pour construire une app Flutter de production avec votre équipe.

---

## Nous sommes prêts pour le Web 🚀

Maitrisez Flutter pour le web avec le [cours Flutter Web](https://masterflutterweb.carrd.co/) officiel.
