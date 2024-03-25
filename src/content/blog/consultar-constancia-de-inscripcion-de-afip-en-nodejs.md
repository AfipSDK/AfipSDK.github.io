---
title: "Consultar constancia de Inscripción de AFIP en NodeJS"
description: "Con pocas líneas de código"
pubDate: "Oct 27 2023"
cover: "/images/blog/node.png"
category: "Javascript"
---

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

## Obtenemos los datos

```js
// CUIT del contribuyente
const taxId = 20111111111;

const taxpayerDetails = await afip.RegisterInscriptionProof.getTaxpayerDetails(taxId);
```

Con esto ya tenemos los datos del contribuyente. También podes usar el [padrón de alcance 13](https://docs.afipsdk.com/paso-a-paso/web-services/padron-alcance-13) o el [padrón de alcance 10](https://docs.afipsdk.com/paso-a-paso/web-services/padron-alcance-10).


Lo único que nos queda es pasar a modo producción, para más información de cómo hacerlo pueden dirigirse a la documentación de la librería https://docs.afipsdk.com/