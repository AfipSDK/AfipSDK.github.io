---
title: "Autorizar uso de web services de AFIP en NodeJS"
description: "Con pocas líneas de código"
pubDate: "Feb 29 2024"
cover: "/images/blog/node.png"
category: "Javascript"
---

Podemos usar Afip SDK para autorizar a los certificados que creamos el acceso a los diferentes web services y evitar hacerlo de manera manual, ya que no solo es difícil, sino que puede tener errores humanos.

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

## Creamos la autorización

Ahora nos queda cambiar las variables en nuestro código.

¡Paciencia! Al ejecutarlo toma unos cuantos segundos en crearse la autorización (a veces mas de 30 segundos)

```js
// Usuario para ingresar a AFIP.
// Para la mayoria es el mismo CUIT, pero al administrar
// una sociedad el CUIT con el que se ingresa es el del administrador
// de la sociedad.
const username = '201111111111'; 

// Contraseña para ingresar a AFIP.
const password = 'contraseñadeafip';

// Alias del certificado a autorizar (previamente creado)
const alias = 'afipsdk';

// Id del web service a autorizar
const wsid = 'wsfe';

// Creamos la autorizacion (¡Paciencia! Esto toma unos cuantos segundos)
const res = await afip.CreateWSAuth(username, password, alias, wsid);

// Mostramos el resultado por pantalla
console.log(res);
```

Ya tenemos la autorización lista para acceder al web service de AFIP.


Lo único que nos queda es pasar a modo producción, para más información de cómo hacerlo pueden dirigirse a la documentación de la librería https://docs.afipsdk.com/