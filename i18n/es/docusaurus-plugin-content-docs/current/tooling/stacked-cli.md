---
id: stacked-cli
sidebar_label: "Stacked CLI"
sidebar_position: 5
tags: [introducción]
---


# Stacked CLI [![Pub Version](https://img.shields.io/pub/v/stacked_cli)](https://pub.dev/packages/stacked_cli)

La Stacked CLI es parte del paquete `stacked_cli`. La CLI fue creada para acelerar el desarrollo utilizando el framework Stacked.


## Introducción

Para empezar, instale el paquete `stacked_cli` en su sistema:

```shell
dart pub global activate stacked_cli
```

### Crear una Aplicación

Para crear tu primera aplicación Stacked, todo lo que necesitas hacer es ejecutar:

```shell
create stacked app my_app
```

Esto creará una nueva aplicación Flutter basada en tu versión de Flutter, añadirá todo el código necesario para una aplicación Stacked y generará el código requerido. Cuando el comando se complete, navega a la carpeta `my_app` y ejecuta la aplicación.

### Añadir una nueva Vista

Desde la carpeta raíz de su aplicación Stacked, ejecute el comando:

```shell
stacked create view login
```

Esto creará una nueva Vista llamada `LoginView` con su Modelo de Vista asociado en la carpeta `ui/views`. Esto también creará el archivo de pruebas del Modelo de Vista y añadirá la Vista a las rutas disponibles en el archivo `app.dart`.

### Añadir un nuevo Servicio

Desde la carpeta raíz de su aplicación Stacked, ejecute el comando:

```shell
stacked create service stripe
```

Esto creará un nuevo Servicio llamado `StripeService` en la carpeta `services` y lo añadirá a las dependencias en el archivo `app.dart`.

### Añadir una nueva Hoja Inferior

Desde la carpeta raíz de su aplicación Stacked, ejecute el comando:

```shell
stacked create bottom_sheet alert
```

Esto creará una nueva Hoja Inferior llamada `AlertSheet` en la carpeta `ui/bottom_sheets`. Esto también añadirá el valor al enum BottomSheetType y añadirá el SheetBuilder a los constructores disponibles en el archivo `ui/setup/setup_bottom_sheet_ui.dart`.

### Añadir un Nuevo Diálogo

Desde la carpeta raíz de su aplicación Stacked, ejecute el comando:

```shell
stacked create dialog error
```

Esto creará un nuevo Diálogo llamado `ErrorDialog` en la carpeta `ui/dialogs`. Esto también añadirá el valor al enum DialogType y añadirá el DialogBuilder a los constructores disponibles en el archivo `ui/setup/setup_dialog_ui.dart`.

### Generar Código

Si has cambiado algo manualmente, o has añadido un nuevo modelo, en lugar de ejecutar `flutter pub run build_runner build --delete-conflicting-outputs`, puedes simplemente ejecutar `stacked generate`.

### Actualizar la CLI

Si quieres actualizar la aplicación `stacked_cli`, en lugar de ejecutar `dart pub global activate stacked_cli` puedes simplemente ejecutar `stacked update`.


## Uso de la CLI con un Proyecto Existente

El uso de la Stacked CLI con un proyecto existente requiere un poco más de esfuerzo que el descrito anteriormente. Hay algunas cosas que usted necesita tener en cuenta:

1. Necesitas tener tu archivo app en `lib/app/app.dart`
2. Si tienes las pruebas configuradas como se muestra en [Unit Testing Videos](https://youtu.be/5BFlo9k3KNU), tu archivo de ayuda debe ser `test/helpers/test_helpers.dart`
3. Dile a Stacked dónde hacer los cambios

La forma en que sabemos dónde añadir modificaciones a su código es mediante la lectura de lo que llamamos un **identificador de plantilla**. Esto le dice a nuestras herramientas "aquí es donde se puede hacer una modificación". Por ahora, sólo tenemos cuatro comandos de generación de automática de código:

### Crear Vista

Este comando crea todo el andamiaje necesario para añadir una nueva Vista al proyecto:

1. Crea una nueva carpeta con el nombre de la Vista en `lib/ui/views/`
2. Crea los nuevos archivos Vista y Modelo de Vista en `lib/ui/views/view_name/`
3. Crea el archivo de pruebas del Modelo de Vista en la carpeta `test/viewmodel_tests/`
4. Añade la ruta al fichero `lib/app/app.dart`

Para lograr #4, necesitamos saber dónde añadir la ruta y su importación. Para indicar que estamos utilizando los **identificadores de plantilla**, abre tu archivo `lib/app/app.dart` y bajo la última importación, añade:

```dart
// @stacked-import
```

Y bajo la última ruta añade:

```dart
// @stacked-route
```

Ahora si ejecutas `stacked create view profile` verás que se crean todos los archivos Y también añadimos la ruta a tu archivo `app.dart`. Las modificaciones son opcionales, así que si no tienes los identificadores de plantilla, Stacked seguirá generando los archivos necesarios, pero no añadirá automáticamente la ruta a tu archivo `app.dart`. Todo lo demás seguirá funcionando.

### Crear Servicio

Este comando crea todo el andamiaje para añadir un nuevo Servicio al proyecto:

1. Crea un nuevo archivo de Servicio en `lib/services/`
2. Crea el archivo de pruebas unitarias en `test/services/`
3. Registra el servicio con tu `StackedApp`
4. Añade el Servicio Simulado (MockService) a test_helpers y lo regístra

Para lograr #3, necesitamos saber donde añadir el registro de dependencias. Abre tu fichero `lib/app/app.dart` y añade bajo el último registro de dependencia:

```dart
// @stacked-service
```

Para lograr #4, necesitamos saber dónde añadir el Servicio Simulado. Abre tu fichero `test_helpers.dart` y bajo todas las importaciones añade:

```dart
// @stacked-import
```

Bajo tu último `MockSpec<T>()` añade:

```dart
// @stacked-mock-spec
```

Bajo tu último `getAndRegisterService` que crea y devuelve un servicio simulado, añade:

```dart
// @stacked-mock-create
```

Debajo de tu último registro de Servicios en `registerServices` añade:

```dart
// @stacked-mock-register
```

Ahora, cuando ejecutes `stacked create service user`, verás los archivos creados para el `UserService` y todo el registro se realizará automáticamente.

### Crear Hoja Inferior

Este comando crea todo el andamiaje necesario para añadir una nueva Hoja Inferior al proyecto:

1. Crea una nueva carpeta con el nombre de la Hoja en `lib/ui/bottom_sheets/`
2. Crea un nuevo archivo de Hoja en `lib/ui/bottom_sheets/sheet_name/`
3. Añade un nuevo valor al enum BottomSheetType
4. Añade un constructor de Hoja (SheetBuilder) al fichero `lib/ui/setup/setup_bottom_sheet_ui.dart`

Para lograr #3, necesitamos saber dónde está su enum BottomSheetType. Para indicar que estamos utilizando los **identificadores de plantilla**, abra el archivo donde está definido el enum BottomSheetType y bajo el último valor, añada:

```dart
// @stacked-bottom-sheet-type
```

Para lograr #4, necesitamos saber dónde añadir el constructor y su importación. Para indicar que estamos usando los **identificadores de plantilla**, abre tu archivo `lib/ui/setup/setup_bottom_sheet_ui.dart` y bajo la último importación añade:

```dart
// @stacked-import
```

Y debajo del último constructor añade:

```dart
// @stacked-bottom-sheet-builder
```

Ahora si ejecutas `stacked create bottom_sheet alert` verás que se crean todos los archivos Y además añadimos el valor a su enum `BottomSheetType` y registramos el `SheetBuilder` en el BottomSheetService. Las modificaciones son opcionales, por lo que si no tiene los identificadores de plantilla, Stacked seguirá generando los archivos necesarios, pero no añadirá automáticamente el valor al enum ni registrará el constructor. Todo lo demás seguirá funcionando.

### Crear Diálogo

Este comando crea todo el andamiaje necesario para añadir un nuevo Diálogo al proyecto:

1. Crea una nueva carpeta con el nombre del Diálogo en `lib/ui/dialogs/`
2. Crea un nuevo archivo de Diálogo en `lib/ui/dialogs/dialog_name/`
3. Añade un nuevo valor al enum DialogType
4. Añade un constructor de Diálogo (DialogBuilder) al fichero `lib/ui/setup/setup_dialog_ui.dart`

Para lograr #3, necesitamos saber dónde está tu enum DialogType. Para indicar que estamos usando los **identificadores de plantilla**, abre el archivo donde está definido el enum DialogType y bajo el último valor, añade:

```dart
// @stacked-dialog-type
```

Para lograr #4, necesitamos saber dónde añadir el constructor y su importación. Para indicar que estamos usando los **template identifiers**, abre tu archivo `lib/ui/setup/setup_dialog_ui.dart` y bajo el último import, añade:

```dart
// @stacked-import
```

Y bajo el último constructor añade:

```dart
// @stacked-dialog-builder
```

Ahora si ejecutas `stacked create dialog error` verás que se generan todos los archivos Y además añadimos el valor a su enum `DialogType` y registramos el `DialogBuilder` en DialogService. Las modificaciones son opcionales, así que si no tienes los identificadores de plantilla, Stacked generará los archivos necesarios, pero no añadirá automáticamente el valor al enum ni registrará el constructor. Todo lo demás seguirá funcionando.


## Configuración

Si quieres usar `stacked_cli` en un paquete que no se ajusta a la estructura que el CLI espera, entonces puedes configurar Stacked para que busque en los lugares correctos. Crea un nuevo archivo en la carpeta raíz de tu paquete llamado `stacked.json`. Dentro del archivo, crear un documento del tipo JSON con las siguientes propiedades:

- `views_path`: La ruta relativa donde se generarán Vistas y Modelos de Vista. Por defecto: `ui/views`.
- `services_path`: La ruta relativa donde se generarán los Servicios. Por defecto: `services`.
- `bottom_sheets_path`: La ruta relativa donde se generarán las Hojas Inferiores. Por defecto: `ui/bottom_sheets`.
- `bottom_sheet_type_file_path`: La ruta del archivo donde se encuentra el enum BottomSheetType. Por defecto: `enums/bottom_sheet_type.dart`.
- `bottom_sheet_builder_file_path`: La ruta del archivo donde se encuentra el constructor de Hoja Inferior. Por defecto: `ui/setup/setup_bottom_sheet_ui.dart`.
- `dialogs_path`: La ruta relativa donde se generarán los Diálogos. Por defecto: `ui/dialogs`.
- `dialog_type_file_path`: La ruta del archivo donde se encuentra el enum DialogType. Por defecto: `enums/dialog_type.dart`.
- `dialog_builder_file_path`: La ruta del archivo donde se encuentra el constructor de Diálogo. Por defecto: `ui/setup/setup_dialog_ui.dart`.
- `stacked_app_path`: La ruta relativa al archivo que contiene la configuración de `StackedApp`. Por defecto: `app/app.dart`.
- `test_helpers_path`: La ruta relativa al archivo que contiene los `test_helpers` (servicios simulados, registerService, etc). Por defecto: `helpers/test_helpers.dart`.
- `test_services_path`: La ruta relativa a donde se generarán las pruebas unitarias de los Servicios. Por defecto: `services`.
- `test_views_path`: La ruta relativa donde se generarán las pruebas unitarias de los Modelos de Vista. Por defecto: `viewmodels`.
- `locator_name`: El nombre del localizador con el que se registran los Servicios. Se utiliza al crear un nuevo Servicio mediante el comando `create service`. Por defecto: `locator`.
- `register_mocks_function`: El nombre de la función que registra todos los simulados (Mocks) cuando se ejecuta un test. Se utiliza cuando se genera un fichero de pruebas con el comando `create service`. Por defecto: `registerServices`.

Incluye sólo las rutas que quieras personalizar. Si excluyes una ruta, se utilizará el valor por defecto para ella.

### Ejemplo

```json
{
    "stacked_app_file_path" : "app/app.dart",
    "services_path" : "services",
    "views_path" : "ui/views",
    "bottom_sheets_path": "ui/bottom_sheets",
    "bottom_sheet_type_file_path": "enums/bottom_sheet_type.dart",
    "bottom_sheet_builder_file_path": "ui/setup/setup_bottom_sheet_ui.dart",
    "dialogs_path": "ui/dialogs",
    "dialog_type_file_path": "enums/dialog_type.dart",
    "dialog_builder_file_path": "ui/setup/setup_dialog_ui.dart",
    "test_helpers_file_path" : "helpers/test_helpers.dart",
    "test_services_path" : "services",
    "test_views_path" : "viewmodels",
    "locator_name" : "locator",
    "register_mocks_function" : "registerServices",
    "v1": false, // Indica si desea utilizar ViewModelBuilder (v1) o el nuevo StackedView (v2)
    "line_length": 80 // Pasado al formateador Flutter al ejecutar comandos CLI
}
```