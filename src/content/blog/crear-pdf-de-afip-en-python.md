---
title: "Crear PDF de AFIP en Python"
description: "Con pocas líneas de código"
pubDate: "Mar 1 2024"
cover: "/images/blog/python.png"
category: "Python"
---

Luego de [obtener el CAE](/blog/crear-factura-electronica-de-afip-en-python/) vamos a generar la factura o un ticket en PDF para nuestro cliente.

**HTML de la factura**

https://gist.githubusercontent.com/AfipSDK/9d724172eec0233eb9bef7ab58113ce0/raw/c06464791172b511f35ff0f9ef8cdf594f7f7279/bill_jinja.html


![Factura de AFIP](/images/blog/invoice.png)


**HTML del ticket**

https://gist.githubusercontent.com/AfipSDK/9d724172eec0233eb9bef7ab58113ce0/raw/c06464791172b511f35ff0f9ef8cdf594f7f7279/ticket_jinja.html


![Ticket de AFIP](/images/blog/ticket.png)


## Preparamos los datos para el PDF

Aqui debemos cambiar los datos por los del comprobante que estamos generando

```python
# Datos de la empresa
business_data = {
	'business_name': 'Empresa imaginaria S.A.', # Nombre / Razon social
	'address': 'Calle falsa 123', # Direccion
	'tax_id': 12345678912, # CUIL/CUIT
	'gross_income_id': 12345432, # Ingresos brutos
	'start_date': '25/10/2017', # Fecha inicio de actividades
	'vat_condition': 'Responsable inscripto' # Condicion frente al IVA
}

# Datos del comprobante
bill = {
	'number': '000000032', # Numero de comprobante
	'point_of_sale': '0001', # Numero del punto de venta
	'date': '25/10/2017', # Fecha de emision del comprobante
	'since': '25/10/2017', # Fecha de comienzo
	'until': '25/10/2017', # Fecha de fin
	'expiration': '25/10/2017', # Fecha de expiracion del comprobante
	'type': 'B', # Tipo de comprobante
	'code': '6', # Codigo de tipo del comprobante
	'concept': 'Productos', # Concepto del comprobante (Productos / Servicios / Productos y servicios)
	'CAE': 12345678912345, # CAE
	'CAE_expiration': '05/11/2017' # Fecha de expiracion del CAE
}

# Items del comprobante
items = [
	{
		'code': '321', # Codigo
		'name': 'Cafe Americano', # Nombre
		'quantity': '1,00', # Cantidad
		'measurement_unit': 'Unidad', # Unidad de medida
		'price': '1500,00', # Precio
		'tax_percent': '21%', # Precio
		'percent_subsidized': '0,00', # Precio subsidiado
		'impost_subsidized': '0,00', # Impuestos subsidiado
		'subtotal': '1500,00' # Subtotal
	}
]

# Datos de a quien va emitido del comprobante
billing_data = {
	'tax_id': 12345678912, # Document/CUIT/CUIL
	'name': 'Pepe perez', # Nombre / Razon social
	'vat_condition': 'Consumidor final', # Condicion frente al iva
	'address': 'Calle falsa 123', # Direccion
	'payment_method': 'Efectivo' # Forma de pago
}

# Resumen
overall = {
	'subtotal': '150,00', # Subtotal
	'impost_tax': '0,00', # Tributos
	'total': '150,00', # Total
}
```


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


# Preparamos el texto para el qr en base a https://www.afip.gob.ar/fe/qr/especificaciones.asp
qr_code_text = 'https://www.afip.gob.ar/fe/qr/?p=' + base64.urlsafe_b64encode(json.dumps(qr_code_data).encode('utf-8')).decode('utf-8')


qrcode = segno.make_qr(qr_code_text)

qr_code_image = qrcode.png_data_uri(scale=4)
```

## Generamos el HTML 

Debemos descargar el HTML de la [factura](https://gist.githubusercontent.com/AfipSDK/9d724172eec0233eb9bef7ab58113ce0/raw/c06464791172b511f35ff0f9ef8cdf594f7f7279/bill_jinja.html) o [ticket](https://gist.githubusercontent.com/AfipSDK/9d724172eec0233eb9bef7ab58113ce0/raw/c06464791172b511f35ff0f9ef8cdf594f7f7279/ticket_jinja.html) de ejemplo y guardarlo como **bill.html**


Para agregar nuestros datos al HTML descargado vamos a utilizar [jinja](https://github.com/pallets/jinja/)

```bash
pip install Jinja2
```

Y ahora debemos llamar a jinja con el HTML que descargamos previamente.

```python
from jinja2 import Template

# Leemos el HTML descargado
html = open("./bill.html").read()

# Iniciamos el template con el HTML
template = Template(html)

# Generamos el HTML con los datos de nuestro comprobante
template_html = template.render(
    business_data= business_data,
    bill= bill,
    items= items,
    billing_data= billing_data,
    overall= overall,
    qr_code_image=qr_code_image
)

```

## Creamos el PDF con pdfkit

Y finalmente lo que nos queda es generar el PDF, para esto vamos a utilizar [pdfkit](https://github.com/JazzCore/python-pdfkit)


```bash
pip install pdfkit
```

Luego debemos instalar **wkhtmltopdf** siguiendo las siguientes [instrucciones](https://github.com/JazzCore/python-pdfkit/wiki/Installing-wkhtmltopdf) 

Una vez instalado wkhtmltopdf procedemos a generar el PDF

```python
import pdfkit

# Guardamos el PDF como Comprobante.pdf
res = pdfkit.from_string(template_html, 'Comprobante.pdf')
```

Ya tenemos el PDF listo para enviarle al cliente.


## (Opcional) Usar Afip SDK

Si se complica la instalacion al usar **pdfkit** podemos opcionalmente utilizar [Afip.py](https://github.com/AfipSDK/afip.py)

```bash
pip install afip.py
```

Creamos una instancia de la clase Afip

```python
from afip import Afip

# CUIT que emitio la factura
#
# Podes usar 20409378472 para desarrollo
# sin necesidad de key o cert
# Para mas info https://docs.afipsdk.com/paso-a-paso/instalacion
CUIT = 20409378472

afip = Afip({ "CUIT": CUIT })
```

Generamos el PDF

```python
# Nombre para el archivo (sin .pdf)
name = "PDF de prueba"

# Opciones para el archivo
options = {
  "width": 8, # Ancho de pagina en pulgadas. Usar 3.1 para ticket
  "marginLeft": 0.4, # Margen izquierdo en pulgadas. Usar 0.1 para ticket 
  "marginRight": 0.4, # Margen derecho en pulgadas. Usar 0.1 para ticket 
  "marginTop": 0.4, # Margen superior en pulgadas. Usar 0.1 para ticket 
  "marginBottom": 0.4 # Margen inferior en pulgadas. Usar 0.1 para ticket 
}

# Creamos el PDF
res = afip.ElectronicBilling.createPDF({
  "html": template_html,
  "file_name": name,
  "options": options
})

# Mostramos la url del archivo creado
print(res["file"])

# Los PDFs creados con el SDK duran 24hs. 
# Debes descargar el archivo antes de que expire la URL
```

Ahora descargamos y guardamos el PDF. Para esto vamos a utilizar la libreria [requests](https://github.com/psf/requests)

```bash
pip install requests
```

Descargamos el PDF

```python
import requests

# Descargamos el PDF
response = requests.get(res['file'])

# Guardamos el PDF como Comprobante.pdf
open("./Comprobante.pdf", 'wb').write(response.content)
```


Ya tenemos el PDF listo para enviarle al cliente.

Lo único que nos queda es pasar a modo producción, para más información de cómo hacerlo pueden dirigirse a la documentación de la librería https://docs.afipsdk.com/