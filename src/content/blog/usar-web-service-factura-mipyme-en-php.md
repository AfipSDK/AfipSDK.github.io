---
title: "Usar web service factura MiPyME en PHP"
description: "Con pocas líneas de código"
pubDate: "Mar 5 2024"
cover: "/images/blog/php.png"
category: "PHP"
---

En este tutorial vamos a ver como utilizar los web services SOAP de AFIP con ayuda de una librería que nos facilita el acceso al mismo, encargándose de la autorización con el WSAA, y conexión SOAP por nosotros.

## Instalación

Lo primero es instalar la librería [Afip.php](https://github.com/AfipSDK/afip.php)

**Composer**

```bash
composer require afipsdk/afip.php
```

**Manual**

1. Descargar la librería [Afip.php](https://github.com/AfipSDK/afip.php) y copiar la carpeta src en nuestro proyecto. [Link de descarga directo](https://github.com/AfipSDK/afip.php/archive/refs/heads/master.zip)

2. Incluimos el archivo **src/Afip.php** en nuestro proyecto


## Creamos una instancia de la clase Afip

```php
include 'ruta/a/src/Afip.php';

/**
 * CUIT vinculado al certificado
 *
 * Podes usar 20409378472 para desarrollo
 * sin necesidad de key o cert
 **/
$CUIT = 20409378472; 

$afip = new Afip(array('CUIT' => $CUIT));
```

## Creamos una instancia del web service

```php
$ws = $afip->WebService('wsfecred');
```

## Preparamos lo datos para la solicitud

En el [manual del web service](https://servicioscf.afip.gob.ar/facturadecreditoelectronica/documentos/Manual-Desarrollador-WSFECRED.pdf) pueden encontrar los métodos disponibles.

En este ejemplo vamos a usar los datos para el método **consultarMontoObligadoRecepcion** 

```php
// Obtenemos el TA
$ta = $ws->GetTokenAuthorization();
 
// Preparamos los datos
$data = array(
 'authRequest' => array(
        'token' => $ta->token,
        'sign' => $ta->sign,
        'cuitRepresentada' => $afip->CUIT,
    ),
    'cuitConsultada' => '23043831739',
    'fechaEmision' => '2024-03-03'
);
```

## Ejecutamos la solicitud

```php
$res = $ws->ExecuteRequest('consultarMontoObligadoRecepcion', $data);

var_dump($res);
```

Esto es todo, ya podemos trabajar con la respuesta del web service de AFIP.

Lo único que nos queda es pasar a modo producción, para más información de cómo hacerlo pueden dirigirse a la documentación de la librería https://docs.afipsdk.com/