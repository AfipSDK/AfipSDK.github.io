---
title: "Crear certificado para usar web services de AFIP en NodeJS"
description: "Con pocas líneas de código"
pubDate: "Feb 28 2024"
cover: "/images/blog/node.png"
category: "Javascript"
---

Podemos usar Afip SDK para crear certificados y evitar hacerlo de manera manual, ya que no solo es difícil, sino que puede tener errores humanos.

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

## Creamos el certificado

Ahora nos queda cambiar las variables en nuestro código.

¡Paciencia! Al ejecutarlo toma unos cuantos segundos en crearse el certificado (a veces mas de 30 segundos)

```js
// Usuario para ingresar a AFIP.
// Para la mayoria es el mismo CUIT, pero al administrar
// una sociedad el CUIT con el que se ingresa es el del administrador
// de la sociedad.
const username = '201111111111'; 

// Contraseña para ingresar a AFIP.
const password = 'contraseñadeafip';

// Alias para el certificado (Nombre para reconocerlo en AFIP)
// un alias puede tener muchos certificados, si estas renovando
// un certificado pordes utilizar le mismo alias
const alias = 'afipsdk';

// Creamos el certificado (¡Paciencia! Esto toma unos cuantos segundos)
const res = await afip.CreateCert(username, password, alias);

// Mostramos el certificado por pantalla
console.log(res.cert);

// Mostramos la key por pantalla
console.log(res.key);

// ATENCION! Recorda guardar el cert y key ya que 
// la libreria por seguridad no los guarda, esto depende de vos.
// Si no lo guardas vas tener que generar uno nuevo con este metodo
```

Ya tenemos nuestro certificado y key para acceder a los web services de AFIP. 

Ahora para poder acceder a un web service primero debemos [Autorizar uso de web services de AFIP en NodeJS](/blog/autorizar-uso-de-web-services-de-afip-en-nodejs/).


Lo único que nos queda es pasar a modo producción, para más información de cómo hacerlo pueden dirigirse a la documentación de la librería https://docs.afipsdk.com/