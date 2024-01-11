---
id: form-basics
title: Concepts de base des formulaires
sidebar_label: Formulaires
---

Permettre à l'utilisateur de saisir des données est une grande partie de toute application. Dans Stacked, cela se fait via Stacked Forms. La partie la plus importante de cette fonctionnalité est que le framework :

1. Génère automatiquement tous les contrôleurs de texte pour vous
2. Synchronise automatiquement la valeur tapée par l'utilisateur avec le ViewModel
3. Fournit des vérifications de validation de base dans le ViewModel

Créons maintenant un formulaire de base.

# Créer la View

Créez une View `TextReverse` en utilisant la CLI Stacked en exécutant la commande suivante :


```shell
stacked create view textReverse
```


## Formulaires dans Stacked

Stacked utilise un générateur pour créer le code nécessaire pour travailler avec des formulaires. Pour indiquer au framework quels contrôleurs générer, nous ajoutons une annotation à la classe `View` appelée `FormView`. Cette annotation prend une liste de champs où vous pouvez nommer le contrôleur. Nous appellerons notre TextController `reverseInput` :

```dart
import 'package:stacked/stacked_annotations.dart';

@FormView(fields: [
  FormTextField(name: 'reverseInput'),
])
class TextReverseView extends StackedView<TextReverseViewModel> {
  const TextReverseView({Key? key}) : super(key: key);
  ...
}
```

Maintenant, nous pouvons exécuter la commande de génération pour créer notre code de formulaire :

```shell
stacked generate
```

Cela créera un nouveau fichier appelé `text_reverse_view.form.dart`. Il contient un mixin portant le même nom que la classe mais avec un préfixe `$` : `$TextReverseView`. Ce fichier contient tous vos `TextEditingControllers`, `FocusNodes` et la fonctionnalité pour synchroniser automatiquement ceux-ci avec votre ViewModel. Nous couvrirons cela plus en détail juste après.

### Synchronisation automatique du texte avec le ViewModel

La prochaine étape consiste à informer la View que vous souhaitez que le texte saisi par l'utilisateur se synchronise automatiquement avec votre ViewModel. Pour ce faire, nous devons faire ceci :

1. Importer le fichier de formulaire généré
2. Utiliser le Mixin `$TextReverseView`
3. Appeler la fonction `syncFormWithViewModel` lorsque le `viewModel` est prêt


```dart
import 'text_reverse_view.form.dart'; // 1. Importer le fichier de formulaire généré

@FormView(fields: [
  FormTextField(name: 'reverseInput'),
])
class TextReverseView extends StackedView<TextReverseViewModel>
  with $TextReverseView { // 2. Utiliser le Mixin `$TextReverseView`

  @override
  Widget builder(
    BuildContext context,
    TextReverseViewModel viewModel,
    Widget? child,
  ) {
    return Scaffold(
      ...
    );
  }

  // 3. Appeler la fonction `syncFormWithViewModel` lorsque le `viewModel` est prêt
  @override
  void onViewModelReady(TextReverseViewModel viewModel) {
    syncFormWithViewModel(viewModel);
  }
  ...
}
```

La dernière chose à faire est de mettre à jour le `TextReverseViewModel` pour étendre le `FormViewModel` plutôt que le `BaseViewModel`.

```dart
class TextReverseViewModel extends FormViewModel {
  ...
}
```

A présent, les contrôleurs peuvent être utilisés dans n'importe quel `TextWidget` qui accepte un `TextEditingController` et le `ViewModel` sera automatiquement mis à jour lorsque cette valeur changera.

### UI de base

Étant donné que ce n'est pas un tutoriel sur la "construction de UI Flutter", je vais faire court. Ce que nous voulons créer, c'est l'interface utilisateur suivante :

![Stacked form Example UI](/img/getting-started/04-reverse-text-screenshot.png)

Maintenant, avant que vous ne disiez quelque chose, je sais que c'est la plus belle interface utilisateur de formulaire que vous ayez jamais vue. Alors s'il vous plaît, si vous voulez me faire des compliments sur l'interface utilisateur, [rejoignez notre Discord](https://discord.gg/auR5sJyx) où nous discutons de nombreuses choses intéressantes liées à Stacked. 😁

<details>
<summary>TextReverseView builder code</summary>
<p>
Remplacez votre fonction de construction dans `text_reverse_view.dart` par ce qui suit.

```dart
 @override
  Widget builder(
    BuildContext context,
    TextReverseViewModel viewModel,
    Widget? child,
  ) {
    return Scaffold(
      appBar: AppBar(title: const Text('Text Reverser')),
      body: Container(
        padding: const EdgeInsets.only(left: 25.0, right: 25.0),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              verticalSpaceMedium,
              const Text(
                'Text to Reverse',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
              ),
              verticalSpaceSmall,
              TextFormField(controller: reverseInputController),
              if (viewModel.hasReverseInputValidationMessage) ...[
                verticalSpaceTiny,
                Text(
                  viewModel.reverseInputValidationMessage!,
                  style: const TextStyle(
                    color: Colors.red,
                    fontSize: 12,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ],
              verticalSpaceMedium,
              Text(
                viewModel.reversedText,
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
```
</p>
</details>

La partie la plus importante de cette UI est que nous n'avons ni à créer ni à gérer nos contrôleurs et que nous pouvons simplement écrire ceci :

```dart
TextFormField(controller: reverseInputController),
```

Le reste de la fonctionnalité du formulaire sera géré par notre configuration précédente. La dernière chose à faire est de réellement inverser le texte. Dans le `TextReverseViewModel`, nous ajouterons une nouvelle propriété dynamique qui renverra le texte inversé ou un placeholder si aucun texte n'est saisi :

```dart
import 'package:stacked/stacked.dart';
import 'text_reverse_view.form.dart';

class TextReverseViewModel extends FormViewModel {
  String get reversedText =>
    hasReverseInput ? reverseInputValue!.split('').reversed.join('') : '----';
}
```

Exécutez ce code pour vous assurer que tout fonctionne comme prévu. En écrivant dans le champ de formulaire, vous devriez voir le texte en dessous afficher votre saisie dans l'ordre inverse.

### Dispose des Contrôleurs

Étant donné que nous ne créons pas les contrôleurs, souvent nous oublions que nous devons malgré tout les `dispose`. Cette fonctionnalité est également générée pour vous. Tout ce que nous avons à faire est de remplacer la fonction `dispose` dans la View et d'appeler la fonction `disposeForm` fournie par le code de formulaire généré. Ajoutez le code suivant dans `text_reverse_view.dart` :

```dart
  @override
  void onDispose(TextReverseViewModel viewModel) {
    super.onDispose(viewModel);
    disposeForm();
  }
```

### Validation des Formulaires

La dernière chose à aborder dans les bases est la validation du formulaire. La classe `FormTextField` prend un `validator`. Il s'agit d'une fonction qui renvoie une `String` nullable et accepte également une `String` nullable. La façon dont nous la fournissons est sous la forme d'une fonction `static`. C'est une exigence stricte des annotations mais nous force également à organiser nos validateurs.

Ouvrez `text_reverse_viewmodel.dart`. Sous la classe, créez une nouvelle classe `TextReverseValidators`. Dans cette classe, nous allons créer un validateur avec les règles suivantes :

1. Lorsque nous détectons un chiffre n'importe où dans la chaîne, nous renvoyons `"No numbers allowed"`
2. Si aucun chiffre n'est présent, nous renvoyons `null`

```dart
class TextReverseValidators {
  static String? validateReverseText(String? value) {
    if (value == null) {
      return null;
    }

    if (value.contains(RegExp(r'[0-9]'))) {
      return 'No numbers allowed';
    }
  }
}
```

Pour l'utiliser, nous le fournissons en tant que validateur à l'annotation `FormTextField` :

```dart
@FormView(fields: [
  FormTextField(
    name: 'reverseInput',
    validator: TextReverseValidators.validateReverseText,
  ),
])
...
```

Maintenant, nous pouvons exécuter `stacked generate`, qui va utiliser ce nouveau validateur. Si vous exécutez votre application et tapez du texte avec un chiffre, vous verrez qu'elle affiche un message de validation rouge avec ce que nous renvoyons. Cela devrait ressembler à ceci :

![Stacked form validation message](/img/getting-started/04-form-validation.gif)

La UI pour le message de validation est basique. Il s'agit d'un texte qui s'affiche uniquement lorsque `hasReverseInputValidationMessage` est `true`. C'est une propriété qui est également générée pour vous. Cela conclut nos bases sur les formulaires. Nous travaillons sur une exploration approfondie des formulaires Stacked qui arrivera bientôt.

### Utiliser le ViewModel de Formulaire avec d'autres comme Future et Stream

La fonctionnalité de formulaire est regroupée dans un mixin appelé `FormStateHelper`. Cela signifie que si vous avez déjà un `ViewModel` qui étend l'un des ViewModels spéciaux comme `FutureViewModel` ur `StreamViewModel`, vous pouvez simplement le mélanger avec `FormStateHelper`. Voyez l'exemple ci-dessous.



```dart
// Classe d'origine à laquelle vous voulez ajouter la fonctionnalité du formulaire
class ContentViewModel extends FutureViewModel<Posts> {
  ...
}

// Faites plutôt ceci
class ContentViewModel extends FutureViewModel<Posts> with FormStateHelper implements FormViewModel {
  ...
}
```

---

## Nous sommes prêts pour le Web 🚀

Maitrisez Flutter pour le web avec le [cours Flutter Web](https://masterflutterweb.carrd.co/) officiel.
