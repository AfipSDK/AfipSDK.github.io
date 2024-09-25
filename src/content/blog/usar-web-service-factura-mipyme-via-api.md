---
title: "Usar web service factura MiPyME via API"
description: "Con pocas líneas de código"
pubDate: "Sep 25 2024"
cover: "/images/blog/api.png"
category: "API"
---


Consumir los web services de AFIP puede ser un poco complicado, por eso vamos a utilizar la API de Afip SDK, que nos permite conectarnos a los web services de AFIP sin complicarnos con el uso de SOAP y la autenticación.

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
    "wsid": "wsfecred"
}
```

Utilizamos el web service id <u>wsfecred</u> `"wsid": "wsfecred"`, el cual corresponde al web service factura MiPyME. 

En la pestaña "API" [de la documentacion](https://docs.afipsdk.com/paso-a-paso/instalacion#id-3-crear-una-instancia-clase-afip) podes consultar todos los parametros del endpoint.

Como respuesta nos devolverá:

```json
{
    "expiration": "2024-07-13T00:42:59.845Z",
    "token": "PD94bWwgd...",
    "sign": "kEaCwSs36hpe..."
}
```

Aquí tenemos el token y sign que nos dio AFIP para usar el web service factura MiPyME. No es necesario que lo guardemos, Afip SDK se encarga de esto por nosotros, debemos solicitarlo antes de cada llamada a los métodos del web service.


## Llamar al web service

En el [manual del web service](https://servicioscf.afip.gob.ar/facturadecreditoelectronica/documentos/Manual-Desarrollador-WSFECRED.pdf) pueden encontrar los métodos disponibles

Para este ejemplo vamos a llamar al metodo `consultarMontoObligadoRecepcion`.

Debemos ejecutar una solicitud **POST** al endpoint

```bash
https://app.afipsdk.com/api/v1/afip/requests
```

```json
{
    "environment": "dev",
    "method": "consultarMontoObligadoRecepcion",
    "wsid": "wsfecred",
    "params": {
        "authRequest": {
            "token": "{{token}}",
            "sign": "{{sign}}",
            "cuitRepresentada": "20409378472",
        },
        "cuitConsultada": "20409378472",
        "fechaEmision": "2024-03-03"
    }
}
```

Debemos reemplazar **{{token}}** y **{{sign}}** con los que obtuvimos anteriormente.

En la pestaña "API" [de la documentacion](https://docs.afipsdk.com/paso-a-paso/web-services/otro-web-service) podes consultar todos los parametros del endpoint.

En la respuesta, nos devolverá la respuesta del web service.

```json
{
    "consultarMontoObligadoRecepcionReturn": ...,
}
```

Con esto ya podemos conectarnos al web service factura MiPyME a través de la API.

Lo único que nos queda es pasar a modo producción, para más información de cómo hacerlo pueden dirigirse a la documentación de la librería https://docs.afipsdk.com/