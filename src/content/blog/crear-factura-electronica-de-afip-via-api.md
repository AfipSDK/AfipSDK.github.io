---
title: "Crear factura electrónica de AFIP via API"
description: "Con pocas líneas de código"
pubDate: "Mar 17 2024"
cover: "/images/blog/api.png"
category: "API"
---

El primer paso para crear una factura electrónica de AFIP es obtener el Código de Autorización Electrónico o CAE. 

Esto lo vamos a hacer utilizando Afip SDK que nos permite conectarnos a los web services de AFIP sin complicarnos con el uso de SOAP y la autenticación.

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
    "wsid": "wsfe"
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


## Crear la factura

Vamos a crear una Factura B por un importe de $121

Debemos ejecutar una solicitud **POST** al endpoint

```bash
https://app.afipsdk.com/api/v1/afip/requests
```

```json
{
    "environment": "dev",
    "method": "FECAESolicitar",
    "wsid": "wsfe",
    "params": {
        "Auth" : { 
            "Token": "{{token}}",
            "Sign": "{{sign}}",
            "Cuit": "20409378472"
        },
        "FeCAEReq" : {
            "FeCabReq" : {
                "CantReg" 	: 1,
                "PtoVta" 	: 1,
                "CbteTipo" 	: 6
            },
            "FeDetReq" : { 
                "FECAEDetRequest" : {
                    "Concepto" : 1,
                    "DocTipo" : 99,
                    "DocNro" : 0,
                    "CbteDesde" : 1,
                    "CbteHasta" : 1,
                    "CbteFch" : 20240317,
                    "ImpTotal" : 121,
                    "ImpTotConc" : 0,
                    "ImpNeto" : 100,
                    "ImpOpEx" : 0,
                    "ImpIVA" : 21,
                    "ImpTrib" : 0,
                    "MonId" : "PES",
                    "MonCotiz" : 1,
                    "Iva" : { 
                        "AlicIva": [{
                                "Id" : 5,
                                "BaseImp" : 100,
                                "Importe" : 21
                        }]
                    }
                }
            }
        }
    }
}
```

Debemos reemplazar **{{token}}** y **{{sign}}** con los que obtuvimos anteriormente.

En la respuesta nos devolverá el CEA y su vencimiento

```json
{
...
  "CAE": "12345678987654",
  "CAEFchVto": "20240327"
...
}
```
Eso es todo, ya tenemos el CAE correspondiente a la factura que acabamos de crear.

Lo único que nos queda es pasar a modo producción, para más información de cómo hacerlo pueden dirigirse a la documentación de la librería https://docs.afipsdk.com/