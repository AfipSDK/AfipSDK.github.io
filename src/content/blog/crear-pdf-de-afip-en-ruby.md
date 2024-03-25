---
title: "Crear PDF de AFIP en Ruby"
description: "Con pocas líneas de código"
pubDate: "Mar 1 2024"
cover: "/images/blog/ruby.png"
category: "Ruby"
---

Podemos usar Afip SDK para crear los PDF de comprobantes de AFIP luego de [obtener el CAE](/blog/crear-factura-electronica-de-afip-en-ruby/)

## Instalación

Lo primero es instalar la librería [Afip.rb](https://github.com/AfipSDK/afip.rb)

**Gemfile**

```ruby
gem 'afip.rb', '~> 1.0', '>= 1.0.1'
```

**Gem**

```bash
gem install afip.rb
```

## Creamos una instancia de la clase Afip

```ruby
require "afip"

# CUIT vinculado al certificado
#
# Podes usar 20409378472 para desarrollo
# sin necesidad de key o cert
CUIT = 20409378472

afip = Afip.new({ "CUIT": CUIT })
```

## Creamos el PDF

Para este tutorial podemos optar por crear una factura o un ticket

**HTML de la factura**

[https://gist.github.com/AfipSDK/60604af781826b0d0438042ae807cc91](https://gist.github.com/AfipSDK/60604af781826b0d0438042ae807cc91)


![Factura de AFIP](/images/blog/invoice.png)


**HTML del ticket**

[https://gist.github.com/AfipSDK/fb05e5bfd059e9bf7fc6045de426ae7f](https://gist.github.com/AfipSDK/fb05e5bfd059e9bf7fc6045de426ae7f)


![Ticket de AFIP](/images/blog/ticket.png)


Ahora nos queda cambiar las variables en nuestro código.

```ruby
# Descargamos el HTML de ejemplo (ver mas arriba)
# y lo guardamos como bill.html
html = File.read("./bill.html")

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
  "html": html,
  "file_name": name,
  "options": options
})

# Mostramos la url del archivo creado
puts res["file"]

# Los PDFs creados con el SDK duran 24hs. 
# Debes descargar el archivo antes de que expire la URL
```

Ya tenemos el PDF listo para enviarle al cliente.

Lo único que nos queda es pasar a modo producción, para más información de cómo hacerlo pueden dirigirse a la documentación de la librería https://docs.afipsdk.com/