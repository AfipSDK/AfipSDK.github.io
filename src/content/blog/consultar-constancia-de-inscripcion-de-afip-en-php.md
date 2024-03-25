---
title: "Consultar constancia de Inscripción de AFIP en PHP"
description: "Con pocas líneas de código"
pubDate: "Oct 27 2023"
cover: "/images/blog/php.png"
category: "PHP"
---

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

## Obtenemos los datos

```php
// CUIT del contribuyente
$tax_id = 20111111111;

$taxpayer_details = $afip->RegisterInscriptionProof->GetTaxpayerDetails($tax_id);
```

Con esto ya tenemos los datos del contribuyente. También podes usar el [padrón de alcance 13](https://docs.afipsdk.com/paso-a-paso/web-services/padron-alcance-13) o el [padrón de alcance 10](https://docs.afipsdk.com/paso-a-paso/web-services/padron-alcance-10).


Lo único que nos queda es pasar a modo producción, para más información de cómo hacerlo pueden dirigirse a la documentación de la librería https://docs.afipsdk.com/