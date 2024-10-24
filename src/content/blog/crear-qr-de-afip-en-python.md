---
title: "Crear QR de AFIP en Python"
description: "Con pocas líneas de código"
pubDate: "Oct 4 2024"
cover: "/images/blog/python-create-qr.png"
category: "Python"
---

Luego de [obtener el CAE](/blog/crear-factura-electronica-de-afip-en-python/) vamos a generar el QR de AFIP para nuestro comprobante.

## Preparamos el QR

Para generar el QR vamos a utilizar [segno](https://github.com/heuer/segno)

```bash
pip install segno
```

Y generamos el codigo QR

```python
import json
import base64
import segno

# Datos para el QR
qr_code_data = {
    'ver': 1, # Versión del formato de los datos (1 por defecto)
    'fecha': '2017-10-25', # Fecha de emisión del comprobante
    'cuit': 12345678912, # Cuit del Emisor del comprobante
    'ptoVta': 1, # Punto de venta utilizado para emitir el comprobante
    'tipoCmp': 6, # Tipo de comprobante
    'nroCmp': 32, # Tipo de comprobante
    'importe': 150, # Importe Total del comprobante (en la moneda en la que fue emitido)
    'moneda': 'ARS', # Moneda del comprobante
    'ctz': 1, # Cotización en pesos argentinos de la moneda utilizada
    'tipoDocRec': 80, # Código del Tipo de documento del receptor
    'nroDocRec': 12345678912, # Número de documento del receptor
    'tipoCodAut': 'E', # “A” para comprobante autorizado por CAEA, “E” para comprobante autorizado por CAE
    'codAut': 12345678912345  # CAE o CAEA, segun corresponda
}


# Preparamos el texto para el qr en base a https://www.afip.gob.ar/fe/qr/documentos/QRespecificaciones.pdf
qr_code_text = 'https://www.afip.gob.ar/fe/qr/?p=' + base64.urlsafe_b64encode(json.dumps(qr_code_data).encode('utf-8')).decode('utf-8')

qrcode = segno.make_qr(qr_code_text)

qr_code_image = qrcode.png_data_uri(scale=4) # Podemos obtenerlo como URL
qrcode.save('qr-afip.png') # o podemos guardarlo como un archivo

```

![QR de AFIP](/images/blog/qr-afip.png)


Ya tenemos el QR listo para nuestro comprobante. Ahora podemos [crear el PDF](/blog/crear-pdf-de-afip-en-python/)
