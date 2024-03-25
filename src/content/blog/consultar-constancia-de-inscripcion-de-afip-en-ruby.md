---
title: "Consultar constancia de Inscripción de AFIP en Ruby"
description: "Con pocas líneas de código"
pubDate: "Feb 26 2024"
cover: "/images/blog/ruby.png"
category: "Ruby"
---

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

## Obtenemos los datos

```ruby
# CUIT del contribuyente
tax_id = 20111111111

taxpayer_details = afip.RegisterInscriptionProof.getTaxpayerDetails(tax_id)
```

Con esto ya tenemos los datos del contribuyente. También podes usar el [padrón de alcance 13](https://docs.afipsdk.com/paso-a-paso/web-services/padron-alcance-13) o el [padrón de alcance 10](https://docs.afipsdk.com/paso-a-paso/web-services/padron-alcance-10).


Lo único que nos queda es pasar a modo producción, para más información de cómo hacerlo pueden dirigirse a la documentación de la librería https://docs.afipsdk.com/