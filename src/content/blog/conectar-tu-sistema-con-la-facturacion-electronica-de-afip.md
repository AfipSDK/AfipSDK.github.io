---
title: "Conectar tu sistema con la facturación electrónica de AFIP"
description: "Guía paso a paso"
pubDate: "Jul 22 2024"
cover: "/images/blog/afip.png"
category: "AFIP"
---

Conectar tu sistema con los sistemas de AFIP puede parecer complicado de entender, pero con la guía correcta puedes integrarlo de manera rápida. Aquí te guiaré a través de los pasos necesarios para que entiendas cómo conectarte, independientemente de la tecnología que utilices.

## Los diferentes entornos: dev y prod

AFIP nos provee un entorno de prueba (dev) y otro de producción (prod).

Todas las facturas que emitamos en el entorno de prueba no tienen validez alguna, precisamente para poder realizar todas las pruebas necesarias en nuestro sistema antes de pasarlas al entorno productivo.

## Código de Autorización Electrónico

Una de las primeras confusiones es creer que al igual que cuando creamos una factura desde la página de AFIP, esta nos devuelve un PDF, pero esto no es así. AFIP nos devuelve el Código de Autorización Electrónico (CAE) con su respectivo vencimiento.

Con el CAE y su vencimiento, uno ya puede armar la factura misma en el formato que prefiera: impresa, PDF, imagen, impresora térmica, etc.

## Ver las facturas emitidas desde la página de AFIP

Una vez que pasamos al entorno de producción, las facturas que emitamos podemos verlas desde la sección "Mis Comprobantes". No estarán disponibles a través de "Comprobantes en línea", ya que en esta aplicación solo están disponibles los emitidos por ella misma.

-------

## Certificado Digital

El primer paso es obtener un certificado digital válido reconocido por AFIP. Este certificado es necesario para garantizar la seguridad y la autenticidad en tus transacciones con AFIP. Puedes obtenerlo siguiendo el tutorial [Obtener certificado de testing](https://docs.afipsdk.com/paso-a-paso/tutoriales-pagina-de-afip/obtener-certificado-de-testing) o [Obtener certificado de producción](https://docs.afipsdk.com/paso-a-paso/tutoriales-pagina-de-afip/obtener-certificado-de-produccion).

En algunas partes de la página de AFIP se requiere tener un "Computador Fiscal"; en esos casos, este certificado actúa como computador fiscal.

## Autorizar web service

El segundo paso es autorizar el certificado que creamos para utilizar el web service de facturación electrónica. Puedes hacerlo siguiendo el tutorial [Autorizar web service de testing](https://docs.afipsdk.com/paso-a-paso/tutoriales-pagina-de-afip/autorizar-web-service-de-testing) o [Autorizar web service de producción](https://docs.afipsdk.com/paso-a-paso/tutoriales-pagina-de-afip/autorizar-web-service-de-produccion).

## Obtener un Token de Autorización o "TA"

Una vez que tenemos el certificado, este nos permitirá conectarnos con los web services de AFIP. El proceso consta de dos partes: el [web service de autenticación](https://www.afip.gob.ar/ws/documentacion/wsaa.asp), que nos da un "Token de Autorización" con el cual podemos realizar requests a los web services de negocio como el de facturación electrónica.

Librerías como [Afip SDK](https://afipsdk.com/) se encargan de manejar la obtención del TA automáticamente, ya que este debe ser guardado y renovado periódicamente.

## Obtener un CAE

Lo siguiente es efectivamente realizar un request al [web service de facturación electrónica](https://www.afip.gob.ar/ws/documentacion/ws-factura-electronica.asp).

Tanto el web service de autenticación como el de facturación electrónica tienen una documentación complicada de entender. Para no complicarnos, podemos usar librerías como [Afip SDK](https://docs.afipsdk.com/paso-a-paso/instalacion) que proveen guías de uso mucho más simples, además de un código ya listo para que lo conectes a tu sistema.

## Armar y enviar la factura al cliente

Con el CAE y su vencimiento, uno ya puede [armar el QR](https://docs.afipsdk.com/paso-a-paso/web-services/factura-electronica/codigo-qr) para la factura y [la factura misma](https://docs.afipsdk.com/paso-a-paso/web-services/factura-electronica/crear-pdf) en el formato que prefiera: impresa, PDF, imagen, impresora térmica, etc.
