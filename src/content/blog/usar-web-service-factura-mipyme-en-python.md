---
title: "Usar web service factura MiPyME en Python"
description: "Con pocas líneas de código"
pubDate: "Mar 5 2024"
cover: "/images/blog/python.png"
category: "Python"
---

En este tutorial vamos a ver como utilizar los web services SOAP de AFIP con ayuda de una librería que nos facilita el acceso al mismo, encargándose de la autorización con el WSAA, y conexión SOAP por nosotros.

## Instalación

Lo primero es instalar la librería [Afip.py](https://github.com/AfipSDK/afip.py)

**PyPI**

```bash
pip install afip.py
```

## Creamos una instancia de la clase Afip

```python
from afip import Afip

# CUIT vinculado al certificado
#
# Podes usar 20409378472 para desarrollo
# sin necesidad de key o cert
CUIT = 20409378472

afip = Afip({ "CUIT": CUIT })
```

## Creamos una instancia del web service

```python
ws = afip.webService("wsfecred")
```

## Preparamos lo datos para la solicitud

En el [manual del web service](https://servicioscf.afip.gob.ar/facturadecreditoelectronica/documentos/Manual-Desarrollador-WSFECRED.pdf) pueden encontrar los métodos disponibles.

En este ejemplo vamos a usar los datos para el método **consultarMontoObligadoRecepcion**

```python
# Obtenemos el TA
ta = ws.getTokenAuthorization()

# Preparamos los datos
data = {
  "authRequest": {
    "token": ta["token"],
    "sign": ta["sign"],
    "cuitRepresentada": afip.CUIT
  },
  "cuitConsultada": "20409378472",
  "fechaEmision": "2024-03-03"
}
```

## Ejecutamos la solicitud

```python
res = ws.executeRequest("consultarMontoObligadoRecepcion", data)

print(res)
```

Esto es todo, ya podemos trabajar con la respuesta del web service de AFIP.

Lo único que nos queda es pasar a modo producción, para más información de cómo hacerlo pueden dirigirse a la documentación de la librería https://docs.afipsdk.com/