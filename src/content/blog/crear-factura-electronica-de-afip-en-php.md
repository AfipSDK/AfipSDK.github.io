---
title: "Crear Factura Electrónica de AFIP en PHP"
description: "Con pocas líneas de código"
pubDate: "Jun 11 2019"
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

## Crear la factura

Vamos a crear una Factura B por un importe de $121

```php
$data = array(
	'CantReg' => 1,  // Cantidad de comprobantes a registrar
	'PtoVta' => 1,  // Punto de venta
	'CbteTipo' => 6,  // Tipo de comprobante (Factura B)(ver tipos disponibles) 
	'Concepto' => 1,  // Concepto del Comprobante: (1)Productos, (2)Servicios, (3)Productos y Servicios
	'DocTipo' => 99, // Tipo de documento del comprador (99 consumidor final, ver tipos disponibles)
	'DocNro' => 0,  // Número de documento del comprador (0 consumidor final)
	'CbteDesde' => 1,  // Número de comprobante o numero del primer comprobante en caso de ser mas de uno
	'CbteHasta' => 1,  // Número de comprobante o numero del último comprobante en caso de ser mas de uno
	'CbteFch' => intval(date('Ymd')), // (Opcional) Fecha del comprobante (yyyymmdd) o fecha actual si es nulo
	'ImpTotal' => 121, // Importe total del comprobante
	'ImpTotConc' => 0,   // Importe neto no gravado
	'ImpNeto' => 100, // Importe neto gravado
	'ImpOpEx' => 0,   // Importe exento de IVA
	'ImpIVA' => 21,  //Importe total de IVA
	'ImpTrib' => 0,   //Importe total de tributos
	'MonId' => 'PES', //Tipo de moneda usada en el comprobante (ver tipos disponibles)('PES' para pesos argentinos) 
	'MonCotiz' => 1,     // Cotización de la moneda usada (1 para pesos argentinos)  
	'Iva' => array( // (Opcional) Alícuotas asociadas al comprobante
		array(
			'Id' => 5, // Id del tipo de IVA (5 para 21%)(ver tipos disponibles) 
			'BaseImp' => 100, // Base imponible
			'Importe' => 21 // Importe 
		)
	), 
);

$res = $afip->ElectronicBilling->CreateVoucher($data);
```


Y por último mostramos el CAE y su vencimiento por pantalla.

```php
echo $res['CAE']; //CAE asignado el comprobante
echo $res['CAEFchVto']; //Fecha de vencimiento del CAE (yyyy-mm-dd)
```

Eso es todo, ya tenemos el CAE correspondiente a la factura que acabamos de crear. Lo único que nos queda es pasar a modo producción, para más información de cómo hacerlo pueden dirigirse a la documentación de la librería https://docs.afipsdk.com/