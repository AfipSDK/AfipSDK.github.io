---
title: "Crear Factura Electrónica de AFIP en NodeJS"
description: "Con pocas líneas de código"
pubDate: "Jan 13 2020"
cover: "/images/blog/node.png"
category: "Javascript"
---

El primer paso para crear una factura electrónica de AFIP es obtener el Código de Autorización Electrónico o CAE. 

Esto lo vamos a hacer utilizando Afip SDK que nos permite conectarnos a los web services de AFIP sin complicarnos con el uso de SOAP y la autenticación.

## Instalación

Lo primero es instalar la librería [Afip.js](https://github.com/AfipSDK/afip.js)

**npm**

```bash
npm install --save @afipsdk/afip.js
```

**Yarn**

```bash
yarn add @afipsdk/afip.js
```

## Creamos una instancia de la clase Afip

```js
const Afip = require('@afipsdk/afip.js');

/**
 * CUIT vinculado al certificado
 *
 * Podes usar 20409378472 para desarrollo
 * sin necesidad de key o cert
 **/
const CUIT = 20409378472; 

const afip = new Afip({ CUIT: CUIT });
```

## Crear la factura

Vamos a crear una Factura B por un importe de $121

```js
const fecha = new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000)).toISOString().split('T')[0];

let data = {
	'CantReg' 	: 1,  // Cantidad de comprobantes a registrar
	'PtoVta' 	: 1,  // Punto de venta
	'CbteTipo' 	: 6,  // Tipo de comprobante (ver tipos disponibles) 
	'Concepto' 	: 1,  // Concepto del Comprobante: (1)Productos, (2)Servicios, (3)Productos y Servicios
	'DocTipo' 	: 99, // Tipo de documento del comprador (99 consumidor final, ver tipos disponibles)
	'DocNro' 	: 0,  // Número de documento del comprador (0 consumidor final)
	'CbteDesde' 	: 1,  // Número de comprobante o numero del primer comprobante en caso de ser mas de uno
	'CbteHasta' 	: 1,  // Número de comprobante o numero del último comprobante en caso de ser mas de uno
	'CbteFch' 	: parseInt(fecha.replace(/-/g, '')), // (Opcional) Fecha del comprobante (yyyymmdd) o fecha actual si es nulo
	'ImpTotal' 	: 121, // Importe total del comprobante
	'ImpTotConc' 	: 0,   // Importe neto no gravado
	'ImpNeto' 	: 100, // Importe neto gravado
	'ImpOpEx' 	: 0,   // Importe exento de IVA
	'ImpIVA' 	: 21,  //Importe total de IVA
	'ImpTrib' 	: 0,   //Importe total de tributos
	'MonId' 	: 'PES', //Tipo de moneda usada en el comprobante (ver tipos disponibles)('PES' para pesos argentinos) 
	'MonCotiz' 	: 1,     // Cotización de la moneda usada (1 para pesos argentinos)  
	'Iva' 		: [ // (Opcional) Alícuotas asociadas al comprobante
		{
			'Id' 		: 5, // Id del tipo de IVA (5 para 21%)(ver tipos disponibles) 
			'BaseImp' 	: 100, // Base imponible
			'Importe' 	: 21 // Importe 
		}
	],
};

const res = await afip.ElectronicBilling.createVoucher(data);
```


Y por último mostramos el CAE y su vencimiento por pantalla.

```js
console.log(res['CAE']); //CAE asignado el comprobante
console.log(res['CAEFchVto']); //Fecha de vencimiento del CAE (yyyy-mm-dd)
```

Ahora que tenemos el CAE ya podemos proceder a [Crear PDF de AFIP en NodeJS](/blog/crear-pdf-de-afip-en-nodejs).

Luego, lo único que nos queda es pasar a modo producción, para más información de cómo hacerlo pueden dirigirse a la documentación de la librería https://docs.afipsdk.com/