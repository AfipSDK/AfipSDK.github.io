---
title: "Consultar constancia de Inscripción de AFIP via API"
description: "Con pocas líneas de código"
pubDate: "Aug 06 2024"
cover: "/images/blog/api.png"
category: "API"
---

Los datos de inscripción de un contribuyente pueden ser solicitados a través de nuestro sistema, consumiendo los servicios de AFIP.

Esto lo vamos a hacer utilizando Afip SDK, que nos permite conectarnos a los servicios web de AFIP sin complicarnos con el uso de SOAP y la autenticación.

## Obtener la autorización

Lo primero que tenemos hacer es obtener el “Token authorization”, que seria la autorización en AFIP.

Para usar los web services de AFIP necesitamos un [certificado y key](https://docs.afipsdk.com/paso-a-paso/instalacion#opcional-si-queres-usar-tu-propio-certificado-para-desarrollo) pero Afip SDK nos deja utilizar el CUIT 20409378472 en modo testing para integrarnos rápidamente.


Debemos ejecutar una solicitud **POST** al endpoint

```bash
https://app.afipsdk.com/api/v1/afip/auth
```

```json
{
    "environment": "dev",
    "tax_id": "20409378472",
    "wsid": "ws_sr_constancia_inscripcion"
}
```

Como respuesta nos devolverá

```json
{
    "expiration": "2024-03-13T00:42:59.845Z",
    "token": "PD94bWwgd...",
    "sign": "kEaCwSs36hpe..."
}
```

Aquí tenemos el token y sign que nos dio AFIP para usar el web service. No es necesario que lo guardemos, Afip SDK se encarga de esto por nosotros, debemos solicitarlo antes de cada llamada a los métodos del web service.


## Obtenemos los datos

Vamos a obtener los datos del contribuyente con el CUIT 20111111111 (cambiar esto por el CUIT que queramos consultar).

Debemos ejecutar una solicitud **POST** al endpoint

```bash
https://app.afipsdk.com/api/v1/afip/requests
```

```json
{
    "environment": "dev",
    "method": "getPersona_v2",
    "wsid": "ws_sr_constancia_inscripcion",
    "params": {
        "token": "{{token}}",
        "sign": "{{sign}}",
        "cuitRepresentada": "20409378472",
        "idPersona" : 20111111111
    }
}
```

Debemos reemplazar **{{token}}** y **{{sign}}** con los que obtuvimos anteriormente.

En la respuesta, nos devolverá los datos de la constancia de inscripción del contribuyente.

```json
{
    "apellido": ...,
    "nombre": ...,
    "domicilioFiscal": ...,
    "actividad": ...
}
```

Con esto ya tenemos los datos del contribuyente. También podes usar el [padrón de alcance 13](https://docs.afipsdk.com/paso-a-paso/web-services/padron-alcance-13) o el [padrón de alcance 10](https://docs.afipsdk.com/paso-a-paso/web-services/padron-alcance-10).

Lo único que nos queda es pasar a modo producción, para más información de cómo hacerlo pueden dirigirse a la documentación de la librería https://docs.afipsdk.com/