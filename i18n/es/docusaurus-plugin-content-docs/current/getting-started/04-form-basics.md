---
id: form-basics
title: Un formulario Stacked básico
sidebar_label: Formularios
tags: [introducción]
---

Permitir al usuario introducir datos en su aplicación es una parte importante de cualquier aplicación. En Stacked, esto se hace utilizando la funcionalidad formularios Stacked. La parte más importante de esta funcionalidad es que Stacked:

1. genera todos los controladores de texto para usted
2. sincroniza automáticamente el valor que el usuario escribe con el Modelo de Vista
3. proporciona comprobaciones básicas de validación en el Modelo de Vista

Vamos a crear un formulario básico.


# Creación de la vista

Crea una Vista **TextReverse** usando Stacked CLI ejecutando el siguiente comando:

```shell
stacked create view textReverse
```


## Formularios en Stacked

Stacked utiliza un generador para crear el código necesario para trabajar con formularios. Para decirle al framework qué controladores generar, añadimos una anotación a la clase `Vista` llamada `FormView`. Esta toma una lista de campos donde puedes nombrar el controlador. Llamaremos a nuestro TextController `reverseInput`:

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

Ahora podemos ejecutar el comando generate para crear el código de nuestro formulario:

```shell
stacked generate
```

Esto creará un nuevo archivo llamado `text_reverse_view.form.dart`. Contiene un mixin con el mismo nombre que la clase pero con un prefijo `$`, `$TextReverseView`. Este archivo contiene todos tus `TextEditingControllers`, `FocusNodes` y la funcionalidad para sincronizarlos automáticamente con tu Modelo de Vista, cubriremos esto con más detalle más adelante.

### Sincronización Automática del Texto al Modelo de Vista

El siguiente paso es hacer saber a la Vista que queremos que el texto introducido por el usuario se sincronice automáticamente con nuestro `Modelo de Vista`. Para ello, tenemos que hacer algunas cosas:

1. Importar el fichero del formulario generado
2. Incluir el `$TextReverseView`
3. Llamar a la función `syncFormWithViewModel` cuando el `Modelo de Vista` esté listo

```dart
import 'text_reverse_view.form.dart'; // 1. Importar el fichero del formulario generado

@FormView(fields: [
  FormTextField(name: 'reverseInput'),
])
class TextReverseView extends StackedView<TextReverseViewModel>
  with $TextReverseView { // 2. Incluir el $TextReverseView

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

  @override
  void onViewModelReady(TextReverseViewModel viewModel) {
    syncFormWithViewModel(viewModel);
  }
  ...
}
```

Lo último que hay que hacer es actualizar el `TextReverseViewModel` para que extienda desde el `FormViewModel` en lugar de desde el `BaseViewModel`.

```dart
class TextReverseViewModel extends FormViewModel {
  ...
}
```

Ahora los controladores se pueden utilizar en cualquier `TextWidget` que acepte un `TextEditingController` y el `Modelo de Vista` se actualizará automáticamente cuando este valor cambie.

### Interfaz de Usuario Básica

Dado que esto no es un tutorial de "construir una interfaz de usuario Flutter", voy a ser breve. Lo que queremos crear es la siguiente UI:

![UI Ejemplo de Formulario Stacked](/img/getting-started/04-reverse-text-screenshot.png)

Antes de que digas nada, sé que esta es la interfaz de usuario de formularios más bonita que has visto nunca. Así que por favor, si quieres hacerme cumplidos sobre la interfaz de usuario, [Únete a nuestro Slack](https://join.slack.com/t/filledstacks/shared_invite/zt-1mmpc84as-g_3l8bLHkEFekRfXnr7MXQ) donde discutimos un montón de cosas geniales de Stacked. 😁

<details>
<summary>TextReverseView código de construcción</summary>
<p>
Sustituye tu función constructora en "text_reverse_view.dart" por lo siguiente.

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

La parte más importante de esta interfaz de usuario es el hecho de que no tenemos que crear o gestionar nuestros controladores, podemos simplemente escribir lo siguiente:

```dart
TextFormField(controller: reverseInputController),
```

El resto de la funcionalidad del formulario es manejado por nuestra configuración anterior. Lo último que tenemos que hacer es invertir el texto. En el `TextReverseViewModel` añadiremos una nueva propiedad dinámica que devolverá el texto invertido o una cadena de texto si no se introduce texto:

```dart
import 'package:stacked/stacked.dart';
import 'text_reverse_view.form.dart';

class TextReverseViewModel extends FormViewModel {
  String get reversedText =>
    hasReverseInput ? reverseInputValue!.split('').reversed.join('') : '----';
}
```

Ejecute este código para asegurarse de que todo funciona. A medida que escriba en el campo del formulario, debería ver que el texto que aparece debajo muestra su entrada en orden inverso.

### Deshacerse de los Controladores

Dado que no creamos los controladores, la gente a menudo se olvida de que todavía tenemos que eliminarlos. Esta funcionalidad también se genera para ti. Todo lo que tenemos que hacer es sobreescribir la función `dispose` en la Vista y llamar a la función `disposeForm` proporcionada por el código del formulario generado. Añade el siguiente código a `text_reverse_view.dart`:

```dart
  @override
  void onDispose(TextReverseViewModel viewModel) {
    super.onDispose(viewModel);
    disposeForm();
  }
```

### Validación de Formularios

La última cosa a abordar en los fundamentos básicos es la validación de formularios. La clase `FormTextField` toma un `validator`. Esta es una función que devuelve una cadena o valor nulo y acepta una cadena o valor nulo. La forma en que proporcionamos esto es en forma de una función `estática`. Este es un requisito estricto de las anotaciones, pero también nos obliga a organizar nuestros validadores.

Abre `text_reverse_viewmodel.dart`. Debajo de la clase, crea una nueva clase `TextReverseValidators`. Dentro de ella crearemos un validador con las siguientes reglas:

1. Si detectamos un número en cualquier parte de la cadena, devolveremos `"No se admiten números"`
2. Si no hay números, devolvemos `null`

```dart
class TextReverseValidators {
  static String? validateReverseText(String? value) {
    if (value == null) {
      return null;
    }

    if (value.contains(RegExp(r'[0-9]'))) {
      return 'No se admiten números';
    }
  }
}
```

Para utilizarlo, lo proporcionamos como validador a la anotación `FormTextField`:

```dart
@FormView(fields: [
  FormTextField(
    name: 'reverseInput',
    validator: TextReverseValidators.validateReverseText,
  ),
])
...
```

Ahora podemos ejecutar `stacked generate`, que utilizará este nuevo validador. Cuando ejecutes tu aplicación y escribas un texto con un número, verás que imprime un mensaje de validación en rojo con lo que hemos devuelto. Debería verse así:

![Mensaje de validación de formulario Stacked](/img/getting-started/04-form-validation.gif)

La interfaz de usuario para el mensaje de validación es simple. Es un texto que sólo se mostrará si `hasReverseInputValidationMessage` es true. Esta es una propiedad que también se genera para ti. Con esto terminamos lo básico sobre formularios. Estamos trabajando en una inmersión profunda sobre los Formularios en Stacked que vendrá pronto.
