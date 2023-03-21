---
id: services
title: Servicios
sidebar_label: Servicios
sidebar_position: 2
---

# ¿Qué es un Servicio?

Además de una Vista (que representa nuestra interfaz de usuario) y un Modelo de Vista (que contiene toda la lógica del estado de la vista), también tenemos Servicios. Un servicio, en términos simples, es la clase que hace u orquesta el trabajo real. Hay dos tipos de servicios.

## Tipos de Servicio

Tenemos un Servicio de Fachada y un Servicio de Aplicacion. _En realidad estamos buscando nombres mejores, así que ponte en contacto con nosotros si te interesa_. Veamos primero el servicio que "hace el trabajo de verdad".

### Servicio de Fachada

Un Servicio de Fachada envuelve otro paquete para eliminar la dependencia dura desde nuestro código base y "hace el trabajo real". Veamos el problema que esto resuelve examinando el siguiente ejemplo:

```dart
class HomeViewModel extends BaseViewModel {
  List<Artist> _artists = [];

  Future<void> fetchArtists() async {
    // #1: Estructurar la petición http
    final response = await http.get(Uri.https('venu.is', '/artists'));

    // #2: Validar que la solicitud se ha realizado correctamente
    if (response.statusCode < 400) {
      // #3: Convertir la respuesta en un mapa
      final responseBodyAsMap = jsonDecode(response.body);

      // #4: Obtener datos relevantes de la respuesta
      final artistMaps =
          responseBodyAsMap['data'] as List<Map<String, dynamic>>;
      
      // #5: Deserializar en una lista de artistas
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

En el código anterior podemos ver que "el trabajo a realizar" es realizado por el `HomeViewModel`. Esto significa que el `HomeViewModel` es responsable de estructurar y hacer la petición http (#1), comprobar que se ha realizado correctamente (#2), y deserializar la respuesta en una lista de Artistas (#3, #4, #5). Esto es bastante común en Flutter. De hecho, en la mayoría de los casos, te enseñarán a hacer esto en tu función `initState` 🤯🤯, lo cual, si estás en esta página, te ruego que nunca hagas.

Aquí es donde entra en juego el Servicio de Fachada. El `HomeViewModel`, como todos los otros Modelos de Vista, está ahí para gestionar la lógica del estado de la aplicación y mantener el estado de la Vista. No debería hacer el trabajo real mencionado anteriormente. Para solucionar esto, introducimos un servicio que envuelve todo esto para nosotros. Así es como queremos que se vea en nuestro modelo mental:

![Desglose de la arquitectura Stacked que muestra qué código hace el trabajo real](/img/tutorial/services-who-does-the-work.png)

Como indica el bloque rojo, la Vista y el Model de Vista no deben hacer ningún trabajo. Ellos delegan en el servicio, que hace todo el trabajo real. Veamos un ejemplo. En tu proyecto ejecuta:

```shell
stacked create service api
```

Esto generará una clase `ApiService` y la registrará con el localizador de servicios, generará el fichero de pruebas unitarias, y registrará el mock del servicio para las pruebas unitarias. En el `ApiService` podemos crear ahora una versión de tipo segura del trabajo realizado por el Modelo de Vista. Lo moveremos todo a una función llamada `getArtists`, que nos devolverá una `List<Artist>`:

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

Ahora que hemos envuelto la funcionalidad del paquete (y su implementación) en un Servicio podemos usarlo en el `HomeViewModel`:

```dart
class HomeViewModel extends BaseViewModel {
  final _apiService = locator<ApiService>();
  List<Artist> _artists = [];

  Future<void> fetchArtists() async {
    _artists = await _apiService.getArtists();

    // Hacer algunas cosas con artistas o extraer estado adicional p.e.
    // estado vacío, selección múltiple, etc...
  }
}
```

Eso es todo lo que se necesita para crear un Servicio de Fachada. Con este pequeño cambio, tu código se beneficiará de las siguientes maneras:

- **Separación de Responsabilidades / Responsabilidad Única**: Ahora ha separado las responsabilidades de las solicitudes http, deserialización, comprobación de errores, y la construcción del modelo desde el Modelo de Vista. El Modelo de Vista puede ahora centrarse sólo en la gestión del estado de la vista.
- **Más Testeable**: Dado que se ha eliminado la dependencia del paquete http, se puede simular el `ApiService` y escribir pruebas unitarias deterministas para el Modelo de Vista. 
- **Código DRY**: Cualquier otro Modelo de Vista o Servicio que necesite esta funcionalidad puede simplemente localizar el servicio y utilizar la función `getArtists`. No es necesario repetirla en ningún otro sitio.
- **Código Legible**: En mi opinión, el código se ve mejor y es fácil ver - a alto nivel - lo que se espera sin tener que ver la construcción de las peticiones http y el desorden de deserializar la petición en una lista separada.

Este patrón está en el corazón del atractivo de Stacked. En casi cualquier situación, los expertos de Stacked recomendarán "crear un servicio y llamarlo en tu Modelo de Vista".

### Servicio de Aplicación

Un Servicio de Aplicación (a falta de un nombre mejor) es donde reside tu lógica de negocio. Este tipo de servicios orquestan la interacción entre Servicios de Fachada para completar alguna lógica de dominio (de negocio). Por ejemplo, considera un `ArtistService` que tiene una función que hace lo siguiente: 

- Comprueba si un usuario ha iniciado sesión
- Obtiene los artistas si el usuario ha iniciado sesión
- Almacena los artistas obtenidos en la base de datos local

Este es el aspecto que queremos que tenga esta funcionalidad en nuestro modelo mental:

![Orquestación de Servicio de Aplicación mediante Servicios de Fachada](/img/tutorial/services-app-service-orchestration.png)

Creamos una función en el `ArtistService` que utiliza nuestros Servicios de Fachada para delegar el trabajo real a realizar. Veamos cómo se ve esto en código. _Este código asume que los otros servicios ya han sido creados. Esto no es un ejemplo completo de cómo crear un Servicio de Autenticación o un Servicio de Base de Datos, sólo cómo usarlos._

En tu clase Servicio de Aplicación, el `ArtistService`, esto es lo que harás:

- Localizar los Servicios que necesitas utilizando el `locator` _¡Documento de localización de servicios próximamente!_.
- Utilizar su funcionalidad única para orquestar la lógica de negocio.

En código, esto significa:

```dart
class ArtistService {
  final _databaseService = locator<DatabaseService>();
  final _authenticationService = locator<AuthenticationService>();
  final _apiService = locator<ApiService>();

  Future<List<Artist>> getArtists() async {
    // Comprobar si el usuario ha iniciado sesión
    if (_authenticationService.userLoggedIn()) {
      // Obtener los artistas del backend
      final newArtists = await _apiService.getArtists();

      // Guardar en la base de datos
      await _databaseService.saveArtists(newArtists);

      return newArtists;
    }

    throw Exception('User must be logged in to see artists');
  }
}
```

Localizamos cada uno de los Servicios y luego utilizamos su funcionalidad para lograr nuestro objetivo. Esto hace que nuestro proceso de desarrollo de funcionalidades sea muy claro y fácil de leer cuando observamos nuestros Servicios de Aplicación.

Con esto concluimos nuestra definición de servicios.