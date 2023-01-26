---
id: overview
title: Visión General
sidebar_label: Qué es Stacked
tags: [introducción]
---

Stacked es un framework de producción construido sobre Flutter. Para equipos o desarrolladores individuales que necesitan código de alta calidad, Stacked simplifica el desarrollo y mantenimiento de aplicaciones Flutter de producción. Construido por [FilledStacks](https://www.youtube.com/filledstacks), una agencia de desarrollo de software móvil con experiencia en Native iOS y Android, Xamarin, y ahora Flutter, habiendo construido más de 30 aplicaciones. Sabemos lo que se necesita para construir aplicaciones grandes, **escalables**, **testeables** y **mantenibles**, este es el enfoque central de Stacked.

- **Escalable**: Stacked está diseñado para mantener su equipo escalable y su productividad alta. Con buenas convenciones de código y una sólida visión de cómo debe desarrollarse la funcionalidad, usted o su equipo tendrán una guía clara para añadir y mantener funcionalidades.

- **Testeable**: Hacemos hincapié en las pruebas unitarias, y nuestra arquitectura MVVM está diseñada para que las pruebas unitarias de cualquier parte de su lógica de negocio o estado sean lo más fáciles posible.

- **Mantenible**: Creemos firmemente en la separación de responsabilidades. Esto, combinado con nuestros estrictos principios de codificación, le permite escalar su código de forma consistente sin preocuparse de que se convierta en espaguetis a medida que crece.

Ahora con su propia CLI, es aún más fácil empezar con Stacked.


# Instalación

:::info Consejo de Instalación
Asegúrate de tener Flutter instalado y configurado. Si no es así, vaya [aquí](https://docs.flutter.dev/get-started/install) para configurarlo.
:::

Para empezar con Stacked, instala el paquete stacked_cli ejecutando pub:

```shell
dart pub global activate stacked_cli
```

Esto te dará acceso a todas las ventajas de Stacked.


## Crear una Aplicación Stacked

Para crear tu primera aplicación, ejecuta

```shell
create stacked app my_first_app
```

Esto creará tu aplicación Flutter Stacked. Conecta un dispositivo o emulador y ejecuta la aplicación utilizando los comandos habituales de Flutter:

```shell
flutter run
```

Deberías ver una pantalla de carga con un indicador de carga, seguida de una vista con un contador y algunos botones. Este punto de partida te da lo básico de lo que se necesita para una aplicación Stacked. Lo siguiente está configurado por defecto:

- Manejo de Estados
- Funcionalidad de la lógica de inicio
- Navegación
- Constructor de Interfaz de Diálogo
- Constructor de Interfaz de Hojas Inferiores
- Inversión de Dependencias
- Ejemplo de Pruebas Unitarias

Todo lo que necesita para crear una aplicación Flutter de producción con su equipo.