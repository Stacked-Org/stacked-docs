---
id: stacked-cli
sidebar_label: "Stacked CLI"
sidebar_position: 5
---


# Stacked CLI [![Pub Version](https://img.shields.io/pub/v/stacked_cli)](https://pub.dev/packages/stacked_cli)

La CLI Stacked fait partie du package `stacked_cli`. La CLI a été créé pour accélérer le développement en utilisant le framework Stacked.


## Démarrage facile

Pour commencer, installez le package `stacked_cli` sur votre machine :

```shell
dart pub global activate stacked_cli
```

### Création d'une nouvelle application

Pour créer votre première application Stacked, tout ce que vous avez à faire est d'exécuter :

```shell
stacked create app my_app
```

Cela créera une nouvelle application Flutter basée sur votre version Flutter, ajoutera tout le code requis pour une application Stacked et générera le code nécessaire. Lorsque la commande est terminée, accédez au dossier `my_app` et lancez l'application.

Les `arguments` suivants sont disponibles pour la commande de création d'application :

| Argument                  | Alias | Description                                                                                                      |
| ------------------------- | ----- | ---------------------------------------------------------------------------------------------------------------- |
| --help                    | -h    | Affiche ces informations d'utilisation.                                                                          |
| --[no-]v1                 |       | Lorsque v1 ou use-builder est spécifié, ViewModelBuilder sera utilisé à la place de StackedView.                 |
| --template                | -t    | Sélectionne le type de starter template à utiliser pour créer une nouvelle application. L'une étant orientée mobile first, l'autre web first. Valeurs autorisées : **mobile**, web. |
| --config-path             | -c    | Spécifie un chemin pour la configuration personnalisée. |
| --description             |       | Description à utiliser pour le nouveau projet Flutter. Cette valeur est stockée dans le fichier pubspec.yaml.    |
| --org                     |       | L'organisation responsable de votre nouveau projet Flutter, en notation inversée du nom de domaine.              |
| --platforms               |       | Les plateformes supportées par ce projet. Les dossiers des Plateformes seront générés dans le projet spécifié. Valeurs autorisées : ios, android, windows, linux, macos, web |
| --line-length             | -l    | Lorsqu'un nombre est spécifié, il sera utilisé comme longueur de lignes pour le formatting du code.              |

### Ajout d'une nouvelle View

Depuis le dossier racine de votre application Stacked, exécutez la commande :

```shell
stacked create view login
```

Cela créera une nouvelle vue appelée `LoginView` avec son ViewModel associé dans le dossier `ui/views`. Cela créera également le fichier de tests du ViewModel, ainsi que ajoutera la vue aux routes disponibles dans le fichier `app.dart`.

Les `arguments` suivants sont disponibles pour la commande de création de View :

| Argument                  | Alias | Description                                                                                                      |
| ------------------------- | ----- | ---------------------------------------------------------------------------------------------------------------- |
| --help                    | -h    | Affiche ces informations d'utilisation.                                                                        |
| --[no-]exclude-route      |       | Lorsqu'une route est exclue, elle ne sera pas ajoutée aux routes du fichier app.dart.                            |
| --[no-]v1                 |       | Lorsque v1 ou use-builder est spécifié, ViewModelBuilder sera utilisé à la place de StackedView.                 |
| --template                | -t    | Définit le type de View à créer au lieu de la vue vide par défaut.                                               |
| --config-path             | -c    | Spécifie un chemin pour la configuration personnalisée.                                                          |
| --line-length             | -l    | Lorsqu'un nombre est spécifié, il sera utilisé comme longueur de lignes pour le formatting du code.              |

### Ajout d'un nouveau service

Depuis le dossier racine de votre application Stacked, exécutez la commande :

```shell
stacked create service stripe
```

Cela créera un nouveau service appelé `StripeService` dans le dossier `services` et l'ajoutera aux dépendances dans le fichier `app.dart`.

Les `arguments` suivants sont disponibles pour la commande de création de service :

| Argument                  | Alias | Description                                                                                                      |
| ------------------------- | ----- | ---------------------------------------------------------------------------------------------------------------- |
| --help                    | -h    | Affiche ces informations d'utilisation.                                                                          |
| --[no-]exclude-dependency |       | Lorsqu'un service est exclu, il ne sera pas ajouté à la liste des services du fichier app.dart                   |
| --template                | -t    | Spécifie le type de service à créer au lieu du service vide par défaut.                                          |
| --config-path             | -c    | Spécifie un chemin pour la configuration personnalisée.                                                          |
| --line-length             | -l    | Lorsqu'un nombre est spécifié, il sera utilisé comme longueur de lignes pour le formatting du code.              |

### Ajout d'une nouvelle Bottom Sheet

Depuis le dossier racine de votre application Stacked, exécutez la commande :

```shell
stacked create bottom_sheet alert
```

Cela créera une nouvelle BottomSheet appelée `AlertSheet` dans le dossier `ui/bottom_sheets` et l'ajoutera aux dépendances dans le fichier `app.dart`. Par défaut, cela créera également un SheetModel et le fichier de tests unitaires. Si vous voulez seulement une BottomSheet sans modèle et sans test, vous devez simplement passer le flag `--no-model` à la commande.

Les `arguments` suivants sont disponibles pour la commande de création de bottom_sheet :

| Argument                  | Alias | Description                                                                                                              |
| ------------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------ |
| --help                    | -h    | Affiche ces informations d'utilisation.                                                                                  |
| --[no-]exclude-route      |       | Lorsqu'une route est exclue, elle ne sera pas ajoutée aux routes du fichier app.dart.                                    |
| --[no-]model              |       | Lorsqu'un model est spécifié, StackedView sera utilisé au lieu du et le Model sera créée. Défaut : **true**.             |
| --template                | -t    | Spécifie le type de bottom sheet à créer au lieu du bottom sheet vide par défaut.                                        |
| --config-path             | -c    | Spécifie un chemin pour la configuration personnalisée.                                                                  |
| --line-length             | -l    | Lorsqu'un nombre est spécifié, il sera utilisé comme longueur de lignes pour le formatting du code.                                       |

### Ajout d'une nouvelle Dialog

Depuis le dossier racine de votre application Stacked, exécutez la commande :

```shell
stacked create dialog error
```

Cela créera une nouvelle Dialogue appelée `ErrorDialog` dans le dossier `ui/dialogs` et l'ajoutera aux dépendances dans le fichier `app.dart`. Par défaut, cela créera également un DialogModel et le fichier de test unitaire. Si vous voulez seulement une Dialog sans modèle et sans test, vous devez simplement passer le flag `--no-model` à la commande.

Les `arguments` suivants sont disponibles pour la commande de création de Dialog :

| Argument                  | Alias | Description                                                                                                              |
| ------------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------ |
| --help                    | -h    | Affiche ces informations d'utilisation.                                                                                  |
| --[no-]exclude-route      |       | Lorsqu'une route est exclue, elle ne sera pas ajoutée aux routes du fichier app.dart.                                    |
| --[no-]model              |       | Lorsqu'un model est spécifié, StackedView sera utilisé au lieu du et le Model sera créée. Défaut : **true**.             |
| --template                | -t    | Spéficie le type de Dialog à créer au lieu du Dialog vide par défaut.                                                    |
| --config-path             | -c    | Spécifie un chemin pour la configuration personnalisée.                                                                  |
| --line-length             | -l    | Lorsqu'un nombre est spécifié, il sera utilisé comme longueur de lignes pour le formatting du code.                                       |

### Ajouter un nouveau Widget

Depuis le dossier racine de votre application Stacked, exécutez la commande :

```shell
stacked create widget users_list
```

Cela créera un nouveau Widget appelé `UsersList` avec son WidgetModel associé appelé `UsersListModel` dans le dossier `ui/widgets/common/users_list`. Cela créera également le fichier de test du WidgetModel à l'intérieur de `test/widget_models/`.

Les arguments suivants sont disponibles pour la commande de création de Widget :

| Argument                  | Alias | Description                                                                                                      |
| ------------------------- | ----- | ---------------------------------------------------------------------------------------------------------------- |
| --help                    | -h    | Affiche ces informations d'utilisation.                                                                          |
| --[no-]model              |       | Lorsqu'un model est spécifié, StackedView sera utilisé au lieu du et le Model sera créée.                        |
| --template                | -t    | Spéficie le type de Widget à créer au lieu du Widget vide par défaut.                                            |
| --config-path             | -c    | Spécifie un chemin pour la configuration personnalisée.                                                          |
| --path                    | -p    | Spécifie le chemin pour le composant.                                                                            |
| --line-length             | -l    | Lorsqu'un nombre est spécifié, il sera utilisé comme longueur de lignes pour le formatting du code.              |

### Générer du Code

Lorsque vous avez modifié quelque chose manuellement ou ajouté un nouveau modèle, au lieu d'exécuter la commande `flutter pub run build_runner build --delete-conflicting-outputs`, vous pouvez simplement exécuter `stacked generate`.


### Mettre à jour la CLI

Lorsque vous souhaitez mettre à jour l'application `stacked_cli`, au lieu d'exécuter la commande `dart pub global activate stacked_cli`, vous pouvez simplement exécuter `stacked update`.


## Utiliser la CLI avec un projet existant

Utiliser le Stacked CLI avec un projet existant nécessite un peu plus d'efforts que ci-dessus. Il y a quelques étapes dont vous devez vous assurer :

1. Vous devez avoir votre fichier app dans `lib/app/app.dart`.
2. Si vous avez configuré des tests comme présenté dans les [vidéos de tests unitaires](https://youtu.be/5BFlo9k3KNU), votre fichier helper doit être `test/helpers/test_helpers.dart`.
3. Vous indiquez à Stacked où apporter les modifications.

La manière dont nous savons où apporter des modifications dans votre code est en lisant ce que nous appelons un identifiant de template (**template identifier**). Cela indique à nos outils : "À cette position, vous pouvez apporter une modification". Pour l'instant, nous avons seulement quatre commandes de structure :

### Créer une View

Cette commande crée toute la structure pour ajouter une nouvelle View dans le projet :

1. Crée un nouveau dossier avec le nom de la View dans `lib/ui/views/`.
2. Crée les nouveaux fichiers View et ViewModel dans `lib/ui/views/view_name/`.
3. Crée le fichier de tests du ViewModel dans le dossier `test/viewmodel_tests/`.
4. Ajoute la route dans le fichier `lib/app/app.dart`.


Pour réaliser le point #4, nous devons savoir où ajouter la route et son importation. Pour indiquer cela, nous utilisons les  **template identifiers**, ouvrez votre fichier `lib/app/app.dart` et sous le dernier import, ajoutez :


```dart
// @stacked-import
```

Et en dessous de votre dernière route, ajoutez :

```dart
// @stacked-route
```

À présent, si vous exécutez `stacked create view profile`, vous verrez que tous les fichiers sont générés ET nous ajoutons également la route dans votre fichier `app.dart`. Les modifications sont facultatives, donc si vous n'avez pas les template identifiers, Stacked générera toujours les fichiers nécessaires mais n'ajoutera pas automatiquement la route dans votre fichier `app.dart`. Néanmoins, tout le reste fonctionnera toujours.


### Créer un Service

Cette commande crée toute la structure pour ajouter un nouveau Service dans le projet :

1. Crée un nouveau fichier Service dans `lib/services/`.
2. Crée le fichier de tests unitaires dans `test/services/`.
3. Enregistre le Service dans votre `StackedApp`.
4. Ajoute le Service Mock dans les test_helpers et l'enregistre.

Pour réaliser le point #3, nous devons savoir où ajouter l'enregistrement de la dépendance. Ouvrez votre fichier `lib/app/app.dart` et sous le dernier enregistrement de dépendance, ajoutez :

```dart
// @stacked-service
```

Pour réaliser le point #4, nous devons savoir où ajouter le Service Mock. Ouvrez votre fichier `test_helpers.dart` et sous tous les imports, ajoutez :

```dart
// @stacked-import
```

Sous votre dernier `MockSpec<T>()`, ajoutez :


```dart
// @stacked-mock-spec
```

Sous votre dernier `getAndRegisterService` qui crée un Mock et le retourne, ajoutez :

```dart
// @stacked-mock-create
```

Sous votre dernier enregistrement de Service dans `registerServices`, ajoutez :

```dart
// @stacked-mock-register
```

Maintenant, lorsque vous exécutez `stacked create service user`, vous verrez que les fichiers sont créés pour le `UserService` et tous les enregistrements se feront automatiquement.


### Créer une BottomSheet

Cette commande crée toute la structure pour ajouter une nouvelle BottomSheet dans le projet :

1. Crée un nouveau dossier avec le nom de la BottomSheet dans `lib/ui/bottom_sheets/`.
2. Crée un nouveau fichier de BottomSheet dans `lib/ui/bottom_sheets/sheet_name/`.
3. Enregistre la BottomSheet dans votre `StackedApp`.

Pour réaliser le point 3, nous devons savoir où ajouter l'enregistrement de la dépendance. Ouvrez votre fichier `lib/app/app.dart` et sous le dernier enregistrement de dépendance dans la propriété `bottomsheets` de StackedApp, ajoutez :

```dart
// @stacked-bottom-sheet
```

Maintenant, si vous exécutez `stacked create bottom_sheet alert`, vous verrez que tous les fichiers sont générés ET nous enregistrons le `SheetBuilder` dans le BottomSheetService. Les modifications sont facultatives, donc si vous n'avez pas les template identifiers, Stacked générera toujours les fichiers nécessaires mais n'ajoutera pas automatiquement la route dans votre fichier `app.dart`. Néanmoins, tout le reste fonctionnera toujours.

### Créer une Dialog

Cette commande crée toute la structure pour ajouter une nouvelle Dialog dans le projet :

1. Crée un nouveau dossier avec le nom de la Dialog dans `lib/ui/dialogs/`.
2. Crée un nouveau fichier de Dialog dans `lib/ui/dialogs/dialog_name/`.
3. Enregistre la Dialog dans votre `StackedApp`.

Pour réaliser le point #3, nous devons savoir où ajouter l'enregistrement de la dépendance. Ouvrez votre fichier l`lib/app/app.dart` et sous le dernier enregistrement de dépendance dans la propriété `dialogs` de StackedApp, ajoutez :

```dart
// @stacked-dialog
```

Maintenant, si vous exécutez `stacked create dialog error`, vous verrez que tous les fichiers sont générés ET nous enregistrons le `DialogBuilder` dans le DialogService. Les modifications sont facultatives, donc si vous n'avez pas les template identifiers, Stacked générera toujours les fichiers nécessaires mais n'ajoutera pas automatiquement la route dans votre fichier `app.dart`. Néanmoins, tout le reste fonctionnera toujours.


## Configuration

Si vous voulez utiliser `stacked_cli` dans un package qui ne correspond pas à la structure que le CLI attend, vous pouvez configurer Stacked pour chercher au bon endroit. Créez un nouveau fichier dans le dossier racine de votre package appelé `stacked.json`. À l'intérieur du fichier, créez un JSON avec les propriétés suivantes :

| Propriété | Description |
| -------- | ----------- |
| bottom_sheets_path | Chemin où les BottomSheets seront générées. |
| dialogs_sheets_path | Chemin où les Dialogs seront générées. |
| line_length | Passée au formatter Flutter quand des commandes CLI sont exécutées. |
| locator_name | Le nom du locator dans lequel les Services sont enregistrés. Ceci est utilisé à la création d'un nouveau service en utilisant la commande `create service`. |
| prefer_web | Détermine si le template web doit être utilisé quand aucun argument n'est spécifié. |
| register_mocks_function | Nom de la fonction qui enregistre tous les Mocks pour les tests. Ceci est utilisé à la génération d'un fichier de tests en utilisant la commande `create service`. |
| services_path | Chemin où les Services sera généré. |
| stacked_app_file_path | Chemin vers le fichier contenant la configuration de la `StackedApp`. |
| test_helpers_file_path | Chemin vers le fichier qui contient les tests helpers (mocks, registerService, etc). |
| test_services_path | Chemin où les unit tests des Services seront générés. |
| test_views_path | Chemin où les unit tests des ViewModels seront générés. |
| test_widgets_path | Chemin où les unit tests des Widgets seeront générés. |
| v1 | Spécifie si vous voulez utiliser ViewModelBuilder (v1) ou StackedView (v2). |
| views_path | Chemin où les Views et les ViewModels seront générés. |
| widgets_path | Chemin où les Widgets et les WidgetModels seront générés. |

Incluez uniquement les chemins que vous souhaitez personnaliser. Si vous omettez un chemin, la valeur par défaut sera utilisée pour celui-ci.


### Configuration Stacked par défaut

```json
{
    "bottom_sheets_path": "ui/bottom_sheets",
    "dialogs_path": "ui/dialogs",
    "line_length": 80,
    "locator_name": "locator",
    "prefer_web": true,
    "register_mocks_function": "registerServices",
    "services_path": "services",
    "stacked_app_file_path": "app/app.dart",
    "test_helpers_file_path": "helpers/test_helpers.dart",
    "test_services_path": "services",
    "test_views_path": "viewmodels",
    "test_widgets_path": "widget_models",
    "v1": false,
    "views_path": "ui/views",
    "widgets_path": "ui/widgets/common"
}
```

---

## Nous sommes prêts pour le Web 🚀

Maitrisez Flutter pour le web avec le [cours Flutter Web](https://masterflutterweb.carrd.co/) officiel.