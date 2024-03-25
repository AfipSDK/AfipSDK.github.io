---
title: "Usar web services de AFIP en PHP"
description: "Con pocas líneas de código"
pubDate: "Feb 26 2024"
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

## Creamos una instancia del web service

```php
/**
 * URL al archivo WSDL de test
 * 
 * Esta URL la podes encontrar en el manual del web service
 **/
$WSDL_TEST = 'https://fwshomo.afip.gov.ar/wsct/CTService?wsdl';

/**
 * URL al archivo WSDL de produccion
 * 
 * Esta URL la podes encontrar en el manual del web service
 **/
$WSDL = 'https://serviciosjava.afip.gob.ar/wsct/CTService?wsdl';
 
/**
 * URL del Web service de produccion
 * 
 * Esta URL la podes encontrar en el manual del web service
 **/
$URL = 'https://serviciosjava.afip.gob.ar/wsct/CTService';

/**
 * URL del Web service de test
 * 
 * Esta URL la podes encontrar en el manual del web service
 **/
$URL_TEST = 'https://fwshomo.afip.gov.ar/wsct/CTService';

/**
 * Version de SOAP que requiere el web service
 * 
 * Si no estas seguro de que version necesitas proba 
 * con ambas opciones (SOAP_1_1 o SOAP_1_2)
 **/
$soap_version = SOAP_1_1;

/**
 * Nombre del web service.
 * 
 * El nombre por el cual se llama al web service en AFIP.
 * Esto lo podes encontrar en el manual correspondiente. 
 * Por ej. el de factura electronica se llama 'wsfe', el de
 * comprobantes T se llama 'wsct'  
 **/
$servicio = 'wsct';

/**
 * A partir de aca ya no debes cambiar ninguna variable
 **/

/**
 * Preparamos las opciones para el web service
 **/
$options = array(
 'WSDL' => $WSDL,
 'WSDL_TEST' => $WSDL_TEST,
 'URL' => $URL,
 'URL_TEST' => $URL_TEST,
 'soap_version' => $soap_version
);

/**
 * Creamos el web service
 **/
$generic_web_service = $afip->WebService($servicio, $options);
```


## Llamamos al web service

Este es un ejemplo de como utilizar el wsct para obtener el ultimo comprobante autorizado.

Aquí veras como obtener un Token Authorization para el web service que acabamos de crear y como ejecutar un request básico


```php
/**
 * Obtenemos el Token Authorizataion
 **/
$ta = $generic_web_service->GetTokenAuthorization();

/**
 * Preparamos los datos que nos pide el web service
 * 
 * Este ejemplo es especifico para el wsct. En el manual
 * del web service que quieras utilizar encontraras que 
 * datos requiere cada metodo
 **/
$data = array(
 'authRequest' => array( 
  'token' => $ta->token,
  'sign'  => $ta->sign,
  'cuitRepresentada'  => $afip->CUIT
 ),
 'codigoTipoComprobante' => 195,
 'numeroPuntoVenta' => 1
);

/**
 * Ejecutamos la request al web service
 * 
 * consultarUltimoComprobanteAutorizado es un metodo
 * de wsct, esto debes cambiarlo por el metodo que 
 * quieras utilizar
 **/
$result = $generic_web_service->ExecuteRequest('consultarUltimoComprobanteAutorizado', $data);

/**
 * Seteamos el resultado en nuestra variable.
 * 
 * consultarUltimoComprobanteAutorizadoReturn es especifico
 * de este metodo de este web service. Esto deberas adaptarlo
 * al web service que estes integrando
 **/
$result = $result->consultarUltimoComprobanteAutorizadoReturn;

/**
 * Checkeamos si devolvio error en el resultado.
 * 
 * arrayErrores es especifico de este web service. 
 * Esto deberas adaptarlo al web service que estes integrando
 **/
if (isset($result->arrayErrores)) {
 $err = is_array($result->arrayErrores->codigoDescripcion) ? $result->arrayErrores->codigoDescripcion[0] : $result->arrayErrores->codigoDescripcion;

 throw new Exception('('.$err->codigo.') '.$err->descripcion, $err->codigo);
}

/**
 * Mostramos por pantalla el resultado final
 **/
var_dump($result);
```

Con esto ya podemos acceder a todos los web servicies de AFIP en PHP.


Lo único que nos queda es pasar a modo producción, para más información de cómo hacerlo pueden dirigirse a la documentación de la librería https://docs.afipsdk.com/