---
id: service-locator
title: Service Locator
sidebar_label: Service Locator
sidebar_position: 1
tags: [service-locator, dependency-registration, location-service]
---

# Qu'est-ce qu'un Service Locator ?

L'idée principale du Service Locator est de créer un registre contenant toutes les dépendances et d'obtenir des composants à partir de celui-ci chaque fois que nous en avons besoin. Chaque objet ayant besoin de quelque chose de ce registre interagira avec lui plutôt que d'essayer d'instancier une dépendance lui-même. Bien-sûr, l'objet aura toujours une dépendance, mais uniquement pour le Service Locator lui-même, et il nous fournira l'implémentation nécessaire de manière transparente.

En utilisant la propriété `dependencies` dans l'annotation `StackedApp`, nous pouvons définir une liste de type `DependencyRegistration` comme suit.

```dart
@StackedApp(
dependencies: [
    Singleton(classType: NavigationService),
    LazySingleton(classType: ThemeService, resolveUsing: ThemeService.getInstance),
    LazySingleton(classType: FirebaseAuthService, asType: AuthService),
    InitializableSingleton(classType: SharedPreferencesService),
    Factory(classType: FactoryService),
  ],
)
```

## Types de dépendances

Ci-dessous, nous décrivons tous les types de dépendances qui peuvent être enregistrés comme dépendance dans l'annotation `StackedApp`.

### Singleton

Il offre un moyen d'enregistrer un objet en tant que Singleton dans le service locator. Un Singleton signifie que l'objet sera instancié lors du premier appel, puis restera en mémoire et la même instance sera renvoyée lors des appels suivants.

| Paramètre    | Description |
| ------------ | ----------- |
| classType    | La classe concrète à enregistrer dans le service locator. |
| asType       | Une classe abstraite ou une interface pour mapper le **classType**. C'est utile lorsque vous souhaitez abstraire l'implémentation concrète et dépendre des interfaces. |
| resolveUsing | Un callback qui résout l'instance. Si `null`, le **classType** est instancié directement. |
| environments | Un ensemble de noms d'environnement où cet enregistrement doit être inclus. Utile pour inclure conditionnellement un service en fonction de l'environnement d'exécution. |
| instanceName | Un nom d'instance optionnel qui peut être utilisé pour enregistrer plusieurs objets du même type. Vous devrez récupérer l'objet par nom d'instance à partir du service locator. |

### LazySingleton

Il offre un moyen d'enregistrer un objet en tant que Lazy Singleton dans le service locator. Un Lazy Singleton signifie que l'objet sera instancié lors du premier appel, puis restera en mémoire et la même instance sera renvoyée lors des appels suivants. La principale différence entre un `Singleton` et un `LazySingleton` est qu'un Lazy Singleton n'est pas créé tant qu'il n'est pas appelé pour la première fois.

| Paramètre    | Description |
| ------------ | ----------- |
| classType    | La classe concrète à enregistrer dans le service locator. |
| asType       | Une classe abstraite ou une interface pour mapper le **classType**. C'est utile lorsque vous souhaitez abstraire l'implémentation concrète et dépendre des interfaces. |
| resolveUsing | Un callback qui résout l'instance. Si `null`, le **classType** est instancié directement. |
| environments | Un ensemble de noms d'environnement où cet enregistrement doit être inclus. Utile pour inclure conditionnellement un service en fonction de l'environnement d'exécution. |
| instanceName | Un nom d'instance optionnel qui peut être utilisé pour enregistrer plusieurs objets du même type. Vous devrez récupérer l'objet par nom d'instance à partir du service locator. |

### InitializableSingleton

Il offre un moyen d'enregistrer un objet en tant que Singleton dans le service locator. Cela signifie que l'objet sera instancié lors du premier appel, puis restera en mémoire et la même instance sera renvoyée lors des appels suivants.

Lorsqu'il est utilisé avec une classe implémentant l'interface `InitializableDependency`, la méthode `init` de la classe sera appelée lors de l'enregistrement, permettant l'exécution de toute logique d'initialisation asynchrone nécessaire avant que l'instance singleton ne soit récupérée pour la première fois. Cela est utile lorsque vous devez effectuer une configuration ou une tâche d'initialisation (comme la configuration d'une base de données, effectuer une requête réseau, etc.) avant que la classe puisse être utilisée.

| Paramètre    | Description |
| ------------ | ----------- |
| classType    | La classe concrète à enregistrer dans le service locator. This class should implement **InitializableDependency** interface. |
| asType       | Une classe abstraite ou une interface pour mapper le **classType**. C'est utile lorsque vous souhaitez abstraire l'implémentation concrète et dépendre des interfaces. |
| environments | Un ensemble de noms d'environnement où cet enregistrement doit être inclus. Utile pour inclure conditionnellement un service en fonction de l'environnement d'exécution. |
| instanceName | Un nom d'instance optionnel qui peut être utilisé pour enregistrer plusieurs objets du même type. Vous devrez récupérer l'objet par nom d'instance à partir du service locator. |

### Factory

Il offre un moyen d'enregistrer un objet en tant que Factory dans le service locator. Une Factory signifie qu'une nouvelle instance de l'objet sera créée à chaque fois qu'elle est appelée.

| Paramètre    | Description |
| ------------ | ----------- |
| classType    | La classe concrète à enregistrer dans le service locator. |
| asType       | Une classe abstraite ou une interface pour mapper le **classType**. C'est utile lorsque vous souhaitez abstraire l'implémentation concrète et dépendre des interfaces. |
| environments | Un ensemble de noms d'environnement où cet enregistrement doit être inclus. Utile pour inclure conditionnellement un service en fonction de l'environnement d'exécution. |
| instanceName | Un nom d'instance optionnel qui peut être utilisé pour enregistrer plusieurs objets du même type. Vous devrez récupérer l'objet par nom d'instance à partir du service locator. |

### FactoryWithParam

Il offre un moyen d'enregistrer un objet en tant que Factory avec des paramètres dans le service locator. Une Factory avec des paramètres signifie qu'une nouvelle instance de l'objet sera créée à chaque fois qu'elle est appelée, et les paramètres seront passés à la fonction de la factory pour créer l'instance.

| Paramètre    | Description |
| ------------ | ----------- |
| classType    | La classe concrète à enregistrer dans le service locator. |
| asType       | Une classe abstraite ou une interface pour mapper le **classType**. C'est utile lorsque vous souhaitez abstraire l'implémentation concrète et dépendre des interfaces. |
| environments | Un ensemble de noms d'environnement où cet enregistrement doit être inclus. Utile pour inclure conditionnellement un service en fonction de l'environnement d'exécution. |
| instanceName | Un nom d'instance optionnel qui peut être utilisé pour enregistrer plusieurs objets du même type. Vous devrez récupérer l'objet par nom d'instance à partir du service locator. |

## Environments

Il est possible d'enregistrer différentes dépendances pour différents environnements en utilisant `environments: {Environment.dev}` dans l'exemple ci-dessous, le `NavigationService` est maintenant enregistré uniquement si nous passons le nom de l'environnement à `setupLocator(environment: Environment.dev);`.

```dart
LazySingleton(
  classType: NavigationService,
  environments: {Environment.dev},
),
```

Maintenant, en passant votre environnement à la fonction `setupLocator`, vous créerez un filtre d'environnement simple qui ne validera que les dépendances qui n'ont pas d'environnements ou dont l'un de leurs environnements correspond à l'environnement donné. Vous pouvez également passer votre propre EnvironmentFilter pour décider quelles dépendances enregistrer en fonction de leurs clés d'environnement, ou utiliser l'un des filtres fournis.

* NoEnvOrContainsAll
* NoEnvOrContainsAny
* SimpleEnvironmentFilter
