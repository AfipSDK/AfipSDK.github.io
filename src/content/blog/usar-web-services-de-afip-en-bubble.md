---
title: "Usar web services de AFIP en Bubble"
description: "Paso a paso"
pubDate: "Sep 07 2024"
cover: "/images/blog/bubble.png"
category: "Bubble"
---


Consumir los web services de AFIP puede ser un poco complicado y para hacerlo en [Bubble](https://bubble.io) necesitamos poder conectarnos a una API REST, por eso vamos a utilizar la API de Afip SDK, que nos permite conectarnos a los web services de AFIP sin complicarnos con el uso de SOAP y la autenticación.

---

En este tutorial vamos a usar como ejemplo el web service de facturacion electronica, vamos a obtener los detalles de un comprobante emitido a travez de este web service.


#### 1) Creamos una interfaz simple para poner los datos a enviar al web service

![Paso 1](/images/blog/usar-web-services-de-afip-en-bubble/1.png)



#### 2) En el menu izquierdo clickeamos en el icono de plugins

![Paso 2](/images/blog/usar-web-services-de-afip-en-bubble/2.png)



#### 3) Clickeamos en "+ Add Plugins"

![Paso 3](/images/blog/usar-web-services-de-afip-en-bubble/3.png)



#### 4) Buscamos "API Connector" y le damos a "Install"

![Paso 4](/images/blog/usar-web-services-de-afip-en-bubble/4.png)



#### 5) Le damos a "Add another API"
Rellenamos los datos:

- API Name: Afip SDK

![Paso 5](/images/blog/usar-web-services-de-afip-en-bubble/5.png)


#### 6) En el recuadro de API Call, en la esquina superior derecha, le damos a expand

Para usar los web services de AFIP necesitamos un [certificado y key](https://docs.afipsdk.com/paso-a-paso/instalacion#opcional-si-queres-usar-tu-propio-certificado-para-desarrollo) pero Afip SDK nos deja utilizar el CUIT 20409378472 en modo testing para integrarnos rápidamente.

Rellenamos los datos:

- Name: Auth Create
- Use as: Action
- Data type: JSON
- POST https://app.afipsdk.com/api/v1/afip/auth
- Body:
``` JSON
{
    "environment": "dev",
    "tax_id": "20409378472",
    "wsid": "wsfe"
}
```

![Paso 6](/images/blog/usar-web-services-de-afip-en-bubble/6.png)


#### 7) Clickeamos en "Initialize Call"

![Paso 7](/images/blog/usar-web-services-de-afip-en-bubble/7.png)

#### 8) Clickeamos en "Show raw data" y nos guardamos los datos

![Paso 8](/images/blog/usar-web-services-de-afip-en-bubble/8.png)

#### 9) Le damos a "Save"

![Paso 9](/images/blog/usar-web-services-de-afip-en-bubble/9.png)

#### 10) Le damos a "Add another call" (No confundir con Add another API)
Lo que vamos a ahacer aqui es llamar al metodo del web service para [Obtener información de un comprobante ya emitido](https://docs.afipsdk.com/paso-a-paso/web-services/factura-electronica#obtener-informacion-de-un-comprobante-ya-emitido)

Rellenamos los datos:

- Name: Get details
- Use as: Action
- Data type: JSON
- POST https://app.afipsdk.com/api/v1/afip/requests
- Body:
``` JSON
{
    "environment": "dev",
    "method": "FECompConsultar",
    "wsid": "wsfe",
    "params": {
        "Auth" : { 
            "Token": "<token>",
            "Sign": "<sign>",
            "Cuit": "20409378472"
        },
        "FeCompConsReq" : {
            "CbteNro" : <CbteNro>,
            "PtoVta" : <PtoVta>,
            "CbteTipo" : <CbteTipo>
        }
    }
}
```

Luego de rellenar el Body nos apareceran los parametros `token, sign, CbteNro, PtoVta, CbteTipo`. En token y sign debemos poner los datos que guardamos de la Api call anterior y en los demas tal como vemos en la imagen. Todos estos son datos de prueba, luego los vincularemos con los datos que vienen del formulario. 

**IMPORTANTE!!** No olvidar destildar el campo "Private" que esta al lado de cada parametro, sino luego no nos aparecera para vincular con el formulario que creamos al inicio.

![Paso 10](/images/blog/usar-web-services-de-afip-en-bubble/10.png)
![Paso 11](/images/blog/usar-web-services-de-afip-en-bubble/11.png)


#### 11) Le damos a "Initialize call"

![Paso 12](/images/blog/usar-web-services-de-afip-en-bubble/12.png)

#### 12) Le damo a "Save"

![Paso 13](/images/blog/usar-web-services-de-afip-en-bubble/13.png)


#### 13) Volvemos a nuestra interfaz y en el boton de "Obtener detalles" le damos a "Add workflow"

![Paso 14](/images/blog/usar-web-services-de-afip-en-bubble/14.png)


#### 14) En el menu de la izquierda clickeamos el icono de "Workflows"

![Paso 15](/images/blog/usar-web-services-de-afip-en-bubble/15.png)


#### 15) Clickeamos en "Click here to add an action"

![Paso 16](/images/blog/usar-web-services-de-afip-en-bubble/16.png)


#### 16) Clickeamos en "Plugins" > "Afip SDK - Auth Create"

![Paso 17](/images/blog/usar-web-services-de-afip-en-bubble/17.png)


#### 17) Clickeamos nuevamente en "Click here to add an action"

![Paso 18](/images/blog/usar-web-services-de-afip-en-bubble/18.png)


#### 18) Clickeamos en "Plugins" > "Afip SDK - Get details"

![Paso 19](/images/blog/usar-web-services-de-afip-en-bubble/19.png)


#### 19) Clickeamos en "(body) token" > "Result of step 1"
Si nos le aparece alguno de los campos "(body) ..." es porque en el paso 10 olvidaron destildar el campo "Private".

![Paso 20](/images/blog/usar-web-services-de-afip-en-bubble/20.png)


#### 20) Elegimos "'s token"

Hacemos lo mismo con "(body) sign" > "Result of step 1" > "'s sign".

![Paso 21](/images/blog/usar-web-services-de-afip-en-bubble/21.png)


#### 21) En "(body) CbreNro" elegimo "Input Numero de comprobante"
"Input Numero de comprobante" es el input que creamos en nuestro formulario inicial.

![Paso 22](/images/blog/usar-web-services-de-afip-en-bubble/22.png)


#### 22) Elegimos "'s value"
Hacemos los mismo para "(body) ProVta" y "(body) CbteTipo" eligiendo los inputs correspondientes.

![Paso 23](/images/blog/usar-web-services-de-afip-en-bubble/23.png)


#### 23) Volvemos anuestro formulario y agregamos dos textos para mostrar los detalles
"Total:" que mostrara el importe total del comprobante y "CAE:" que mostrara el CAE asignado al comprobante

![Paso 24](/images/blog/usar-web-services-de-afip-en-bubble/24.png)

#### 24) Volvemos a "Workflows"

![Paso 25](/images/blog/usar-web-services-de-afip-en-bubble/25.png)

#### 25) Clickeamos en "Click here to add an action"

![Paso 26](/images/blog/usar-web-services-de-afip-en-bubble/26.png)

#### 26) Clickeamos en "Elements Actions" > "Set state"

![Paso 27](/images/blog/usar-web-services-de-afip-en-bubble/27.png)

#### 27) En "Element" elegimos "Text Total:"

![Paso 28](/images/blog/usar-web-services-de-afip-en-bubble/28.png)

#### 28) En custom state elegimos "Create new custom state"

![Paso 29](/images/blog/usar-web-services-de-afip-en-bubble/29.png)

#### 29) Rellenamos los datos y clickeamos en "Create"
- State name: total
- State type: number


![Paso 30](/images/blog/usar-web-services-de-afip-en-bubble/30.png)

#### 30) En "Value" elegimos "Result of step 2"

![Paso 31](/images/blog/usar-web-services-de-afip-en-bubble/31.png)

#### 31) Elegimos "FeCompConsultarResult ResultGet ImpTotal"

![Paso 32](/images/blog/usar-web-services-de-afip-en-bubble/32.png)

#### 32) En el workflow Clickeamos nuevamente en "Click here to add an action" > "Elements Actions" > "Set state"

![Paso 33](/images/blog/usar-web-services-de-afip-en-bubble/33.png)

#### 33) Hacemos lo mismo que para el "Total" pero ahroa para el "CAE"
Esta vez el "State type"  es "text"

![Paso 34](/images/blog/usar-web-services-de-afip-en-bubble/34.png)

#### 34) En "Value" elegimos "Result of step 2" > "FeCompConsultarResult ResultGet CodAutorizacion"

![Paso 35](/images/blog/usar-web-services-de-afip-en-bubble/35.png)

#### 35) Vovlemos al formulario y vamos el texto "Total:" 

![Paso 36](/images/blog/usar-web-services-de-afip-en-bubble/36.png)

#### 36) Clickeamos para editar el texto

![Paso 37](/images/blog/usar-web-services-de-afip-en-bubble/37.png)

#### 37) En la lista elegimos "Text Total:" 

![Paso 38](/images/blog/usar-web-services-de-afip-en-bubble/38.png)

#### 38) Vamos debajo de "Custom states" y elegimos "'s total"
Este state es el que creamos anteriormente en el workflow

![Paso 39](/images/blog/usar-web-services-de-afip-en-bubble/39.png)

#### 39) Hacemos lo miso para el CAE

![Paso 40](/images/blog/usar-web-services-de-afip-en-bubble/40.png)

#### 40) Arriba a la derecha clickeamos en "Preview"

![Paso 41](/images/blog/usar-web-services-de-afip-en-bubble/41.png)

#### 41) Rellenamos los datos y clickeamos en "Obtener detalles"

![Paso 42](/images/blog/usar-web-services-de-afip-en-bubble/42.png)


Ya deberemos poder ver el total del comprobante y el CAE en nuestra pantalla.

Con esto ya podemos conectarnos a cualquier web service de AFIP a través de la API.

Lo único que nos queda es pasar a modo producción, para más información de cómo hacerlo pueden dirigirse a la documentación de la librería https://docs.afipsdk.com/