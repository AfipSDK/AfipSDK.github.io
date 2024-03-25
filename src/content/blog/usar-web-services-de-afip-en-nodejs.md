---
title: "Usar web services de AFIP en NodeJS"
description: "Con pocas líneas de código"
pubDate: "Feb 27 2024"
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

## Creamos una instancia del web service

```js
/**
 * URL al archivo WSDL de test
 * 
 * Esta URL la podes encontrar en el manual del web service
 **/
const WSDL_TEST = 'https://fwshomo.afip.gov.ar/wsct/CTService?wsdl';

/**
 * URL al archivo WSDL de produccion
 * 
 * Esta URL la podes encontrar en el manual del web service
 **/
const WSDL = 'https://serviciosjava.afip.gob.ar/wsct/CTService?wsdl';
 
/**
 * URL del Web service de produccion
 * 
 * Esta URL la podes encontrar en el manual del web service
 **/
const URL = 'https://serviciosjava.afip.gob.ar/wsct/CTService';

/**
 * URL del Web service de test
 * 
 * Esta URL la podes encontrar en el manual del web service
 **/
const URL_TEST = 'https://fwshomo.afip.gov.ar/wsct/CTService';

/**
 * Setear en true si el web service requiere usar soap v1.2
 * 
 * Si no estas seguro de que necesita v1.2 proba con ambas opciones
 **/
const soapV1_2 = false;
/**
 * Nombre del web service.
 * 
 * El nombre por el cual se llama al web service en AFIP.
 * Esto lo podes encontrar en el manual correspondiente. 
 * Por ej. el de factura electronica se llama 'wsfe', el de
 * comprobantes T se llama 'wsct'  
 **/
const servicio = 'wsct';
/**
 * A partir de aca ya no debes cambiar ninguna variable
 **/
/**
 * Preparamos las opciones para el web service
 **/
const options = {
 'WSDL': WSDL,
 'WSDL_TEST': WSDL_TEST,
 'URL': URL,
 'URL_TEST': URL_TEST,
 'soapV1_2': soapV1_2
};
/**
 * Creamos el web service
 **/
const genericWebService = afip.WebService(servicio, options);
```


## Llamamos al web service

Este es un ejemplo de como utilizar el wsct para obtener el ultimo comprobante autorizado.

Aquí veras como obtener un Token Authorization para el web service que acabamos de crear y como ejecutar un request básico


```js
(async () => {
 /**
  * Obtenemos el Token Authorizataion
  **/
 const ta = await genericWebService.getTokenAuthorization();
 
 /**
  * Preparamos los datos que nos pide el web service
  * 
  * Este ejemplo es especifico para el wsct. En el manual
  * del web service que quieras utilizar encontraras que 
  * datos requiere cada metodo
  **/
 const data = {
  'authRequest': { 
   'token': ta.token,
   'sign' : ta.sign,
   'cuitRepresentada' : afip.CUIT
  },
  'codigoTipoComprobante': 195,
  'numeroPuntoVenta': 1
 };

 /**
  * Iniciamos la variable donde guardaremos el resultado
  **/
 let result;
 
 try {
  /**
   * Ejecutamos la request al web service
   * 
   * consultarUltimoComprobanteAutorizado es un metodo
   * de wsct, esto debes cambiarlo por el metodo que 
   * quieras utilizar
   **/
  result = await genericWebService.executeRequest('consultarUltimoComprobanteAutorizado', data);
 
  /**
   * Seteamos el resultado en nuestra variable.
   * 
   * consultarUltimoComprobanteAutorizadoReturn es especifico
   * de este metodo de este web service. Esto deberas adaptarlo
   * al web service que estes integrando
   **/
  result = result.consultarUltimoComprobanteAutorizadoReturn
 
  /**
   * Checkeamos si devolvio error en el resultado.
   * 
   * arrayErrores es especifico de este web service. 
   * Esto deberas adaptarlo al web service que estes integrando
   **/
  if (typeof result.arrayErrores !== 'undefined') {
   err = Array.isArray(result.arrayErrores.codigoDescripcion) ? result.arrayErrores.codigoDescripcion[0] : result.arrayErrores.codigoDescripcion;
   throw new Error(`(${err.codigo}) ${err.descripcion}`, err.codigo);
  }
 }
 catch(error){
 /**
  * Si hubo un error lo logeamos
  **/
 console.error(error);
}

/**
* Logeamos el resultado final
**/
console.log(result);
})();
```

Con esto ya podemos acceder a todos los web servicies de AFIP en NodeJS.


Lo único que nos queda es pasar a modo producción, para más información de cómo hacerlo pueden dirigirse a la documentación de la librería https://docs.afipsdk.com/