---
title: "Crear certificado para usar web services de AFIP via API"
description: "Con pocas líneas de código"
pubDate: "Aug 24 2024"
cover: "/images/blog/api-create-cert.png"
category: "API"
---

Podemos usar Afip SDK para crear certificados y evitar hacerlo de manera manual, ya que no solo es difícil, sino que puede tener errores humanos.


## Creamos el certificado

Para realizar la creacion del certificado lo primero que debemos hacer es ejecutar una solicitud **POST** al endpoint

```bash
https://app.afipsdk.com/api/v1/afip/certs
```

Con los parametros

| Nombre        | Tipo   | Valor                                                                                                                                                                  |
| ------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `environment` | string | Usar "dev" para ambiente de desarrollo o "prod" para producción                                                                                                        |
| `tax_id`      | string | CUIT al cual le queremos generar el certificado                                                                                                                        |
| `username`    | string | Usuario para ingresar a AFIP. Para la mayoría es el mismo CUIT, pero al administrar una sociedad el CUIT con el que se ingresa es el del administrador de la sociedad. |
| `password`    | string | Contraseña para ingresar a AFIP.                                                                                                                                       |
| `alias`       | string | Alias para el certificado (Nombre para reconocerlo en AFIP), un alias puede tener muchos certificados, si estas renovando un certificado podes utilizar el mismo alias |


**Ejemplo**

```json
{
    "environment": "dev",
    "tax_id": "11111111111",
    "username": "11111111111",
    "password": "aqui_la_contraseña",
    "alias": "afipsdk"
}
```
Al crear el certificado nos devolverá un `long_job_id` y su `status`

**Response**

```json
{
    "status": "in_process",
    "long_job_id": "0d1e71e0-8882-4b14-b7f8-c5d716261760"
}
```

Ahora debemos agregarle el `long_job_id` al body y llamar nuevamente al endpoint hasta que se cambie el `status`

```json
{
    "environment": "dev",
    "tax_id": "11111111111",
    "username": "11111111111",
    "password": "aqui_la_contraseña",
    "alias": "afipsdk",
    "long_job_id": "0d1e71e0-8882-4b14-b7f8-c5d716261760"
}
```

La recomendación es intentar cada 5 segundos, suele tardar entre 15 y 60 segundos en estar listo, dependiendo de la congestion de AFIP.

<mark style="color:green;">`STATUS`</mark> `200`

```json
{
    "status": "complete",
    "data": {
        "cert": "-----BEGIN CERTIFICATE-----\nMIIDRzC...",
        "key": "-----BEGIN RSA PRIVATE KEY-----\r\nMIIEowIBAAKCA..."
    }
}
```

<mark style="color:red;">`STATUS`</mark> `400`

```json
{
    "status": "error",
    "data": {
        "message":"Número de CUIL/CUIT incorrecto"
    }
}
```

Ya tenemos nuestro certificado y key para acceder a los web services de AFIP. 

Ahora para poder acceder a un web service primero debemos [Autorizar uso de web services de AFIP via API](/blog/autorizar-uso-de-web-services-de-afip-via-api/).

Lo único que nos queda es pasar a modo producción, para más información de cómo hacerlo pueden dirigirse a la documentación de la librería https://docs.afipsdk.com/