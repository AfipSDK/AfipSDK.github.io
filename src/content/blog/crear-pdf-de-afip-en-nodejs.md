---
title: "Crear PDF de AFIP en NodeJS"
description: "Con pocas líneas de código"
pubDate: "Mar 1 2024"
cover: "/images/blog/node.png"
category: "Javascript"
---

Podemos usar Afip SDK para crear los PDF de comprobantes de AFIP luego de [obtener el CAE](/blog/crear-factura-electronica-de-afip-en-nodejs/)

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

## Creamos el PDF

Para este tutorial podemos optar por crear una factura o un ticket

**HTML de la factura**

[https://gist.github.com/AfipSDK/60604af781826b0d0438042ae807cc91](https://gist.github.com/AfipSDK/60604af781826b0d0438042ae807cc91)


![Factura de AFIP](/images/blog/invoice.png)


**HTML del ticket**

[https://gist.github.com/AfipSDK/fb05e5bfd059e9bf7fc6045de426ae7f](https://gist.github.com/AfipSDK/fb05e5bfd059e9bf7fc6045de426ae7f)


![Ticket de AFIP](/images/blog/ticket.png)


Ahora nos queda cambiar las variables en nuestro código.

```js
(async () => {
 // Descargamos el HTML de ejemplo (ver mas arriba)
 // y lo guardamos como bill.html
 const html = require('fs').readFileSync('./bill.html', 'utf8');
 
 // Nombre para el archivo (sin .pdf)
 const name = 'PDF de prueba';
 
 // Opciones para el archivo
 const options = {
  width: 8, // Ancho de pagina en pulgadas. Usar 3.1 para ticket
  marginLeft: 0.4, // Margen izquierdo en pulgadas. Usar 0.1 para ticket 
  marginRight: 0.4, // Margen derecho en pulgadas. Usar 0.1 para ticket 
  marginTop: 0.4, // Margen superior en pulgadas. Usar 0.1 para ticket 
  marginBottom: 0.4 // Margen inferior en pulgadas. Usar 0.1 para ticket 
 };
 
 // Creamos el PDF
 const res = await afip.ElectronicBilling.createPDF({
  html: html,
  file_name: name,
  options: options
 });
 
 // Mostramos la url del archivo creado
 console.log(res.file);
})();

// Los PDFs creados con el SDK duran 24hs. 
// Debes descargar el archivo antes de que expire la URL
```

Ya tenemos el PDF listo para enviarle al cliente.

Lo único que nos queda es pasar a modo producción, para más información de cómo hacerlo pueden dirigirse a la documentación de la librería https://docs.afipsdk.com/