---
title: "Crear PDF de AFIP en PHP"
description: "Con pocas líneas de código"
pubDate: "Feb 29 2024"
cover: "/images/blog/php.png"
category: "PHP"
---

Podemos usar Afip SDK para crear los PDF de comprobantes de AFIP luego de [obtener el CAE](/blog/crear-factura-electronica-de-afip-en-php/)

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

## Creamos el PDF

Para este tutorial podemos optar por crear una factura o un ticket

**HTML de la factura**

[https://gist.github.com/AfipSDK/60604af781826b0d0438042ae807cc91](https://gist.github.com/AfipSDK/60604af781826b0d0438042ae807cc91)


![Factura de AFIP](/images/blog/invoice.png)


**HTML del ticket**

[https://gist.github.com/AfipSDK/fb05e5bfd059e9bf7fc6045de426ae7f](https://gist.github.com/AfipSDK/fb05e5bfd059e9bf7fc6045de426ae7f)


![Ticket de AFIP](/images/blog/ticket.png)


Ahora nos queda cambiar las variables en nuestro código.

```php
// Descargamos el HTML de ejemplo (ver mas arriba)
// y lo guardamos como bill.html
$html = file_get_contents('./bill.html');

// Nombre para el archivo (sin .pdf)
$name = 'PDF de prueba';
 
// Opciones para el archivo
$options = array(
 "width" => 8, // Ancho de pagina en pulgadas. Usar 3.1 para ticket
 "marginLeft" => 0.4, // Margen izquierdo en pulgadas. Usar 0.1 para ticket 
 "marginRight" => 0.4, // Margen derecho en pulgadas. Usar 0.1 para ticket 
 "marginTop" => 0.4, // Margen superior en pulgadas. Usar 0.1 para ticket 
 "marginBottom" => 0.4 // Margen inferior en pulgadas. Usar 0.1 para ticket 
);

// Creamos el PDF
$res = $afip->ElectronicBilling->CreatePDF(array(
 "html" => $html,
 "file_name" => $name,
 "options" => $options
));

// Mostramos la url del archivo creado
var_dump($res['file']);

// Los PDFs creados con el SDK duran 24hs. 
// Debes descargar el archivo antes de que expire la URL
```

Ya tenemos el PDF listo para enviarle al cliente.

Lo único que nos queda es pasar a modo producción, para más información de cómo hacerlo pueden dirigirse a la documentación de la librería https://docs.afipsdk.com/