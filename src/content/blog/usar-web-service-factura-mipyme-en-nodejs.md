---
title: "Usar web service factura MiPyME en NodeJS"
description: "Con pocas líneas de código"
pubDate: "Mar 5 2024"
cover: "/images/blog/node.png"
category: "Javascript"
---

En este tutorial vamos a ver como utilizar los web services SOAP de AFIP con ayuda de una librería que nos facilita el acceso al mismo, encargándose de la autorización con el WSAA, y conexión SOAP por nosotros.

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

## Creamos una instancia del web service

```js
const ws = afip.WebService('wsfecred');
```

## Preparamos lo datos para la solicitud

En el [manual del web service](https://servicioscf.afip.gob.ar/facturadecreditoelectronica/documentos/Manual-Desarrollador-WSFECRED.pdf) pueden encontrar los métodos disponibles.

En este ejemplo vamos a usar los datos para el método **consultarMontoObligadoRecepcion**

```js
// Obtenemos el TA
const ta = await ws.getTokenAuthorization();
 
// Preparamos los datos
const data = {
    'authRequest': {
        'token': ta.token,
        'sign': ta.sign,
        'cuitRepresentada': afip.CUIT,
    },
    'cuitConsultada': '20409378472',
    'fechaEmision': '2024-03-03'
};
```

## Ejecutamos la solicitud

```js
const res = await ws.executeRequest('consultarMontoObligadoRecepcion', data);

console.log(res);
```

Esto es todo, ya podemos trabajar con la respuesta del web service de AFIP.

Lo único que nos queda es pasar a modo producción, para más información de cómo hacerlo pueden dirigirse a la documentación de la librería https://docs.afipsdk.com/