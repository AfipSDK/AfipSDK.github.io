---
title: "Crear QR de AFIP en NodeJS"
description: "Con pocas líneas de código"
pubDate: "Oct 24 2024"
cover: "/images/blog/nodejs-create-qr.png"
category: "Javascript"
---

Luego de [obtener el CAE](/blog/crear-factura-electronica-de-afip-en-nodejs/) vamos a generar el QR de AFIP para nuestro comprobante.

## Preparamos el QR

Para generar el QR vamos a utilizar [node-qrcode](https://github.com/soldair/node-qrcode)

```bash
npm install qrcode
```

Y generamos el codigo QR

```js
const QRCode = require('qrcode');

(async () => {
    // Datos para el QR (Respetar si es string o numero)
    const QRCodeData = {
        'ver': 1, // Versión del formato de los datos (1 por defecto)
        'fecha': '2017-10-25', // Fecha de emisión del comprobante
        'cuit': 12345678912, // Cuit del Emisor del comprobante
        'ptoVta': 1, // Punto de venta utilizado para emitir el comprobante
        'tipoCmp': 6, // Tipo de comprobante
        'nroCmp': 32, // Tipo de comprobante
        'importe': 150, // Importe Total del comprobante (en la moneda en la que fue emitido)
        'moneda': 'ARS', // Moneda del comprobante
        'ctz': 1, // Cotización en pesos argentinos de la moneda utilizada
        'tipoDocRec': 80, // Código del Tipo de documento del receptor
        'nroDocRec': 12345678912, // Número de documento del receptor
        'tipoCodAut': 'E', // “A” para comprobante autorizado por CAEA, “E” para comprobante autorizado por CAE
        'codAut': 12345678912345  // CAE o CAEA, segun corresponda
    };


    // Preparamos el texto para el qr en base a https://www.afip.gob.ar/fe/qr/documentos/QRespecificaciones.pdf
    const QRCodeText = 'https://www.afip.gob.ar/fe/qr/?p=' + btoa(JSON.stringify(QRCodeData));

    console.log(await QRCode.toDataURL(QRCodeText)); // Podemos obtenerlo como URL
    await QRCode.toFile('qr-afip.png', QRCodeText); // o podemos guardarlo como un archivo
})();
```

![QR de AFIP](/images/blog/qr-afip.png)


Ya tenemos el QR listo para nuestro comprobante. Ahora podemos [crear el PDF](/blog/crear-pdf-de-afip-en-nodejs/)
