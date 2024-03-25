---
title: "Autorizar uso de web services de AFIP en Ruby"
description: "Con pocas líneas de código"
pubDate: "Feb 29 2024"
cover: "/images/blog/ruby.png"
category: "Ruby"
---

Podemos usar Afip SDK para autorizar a los certificados que creamos el acceso a los diferentes web services y evitar hacerlo de manera manual, ya que no solo es difícil, sino que puede tener errores humanos.

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

## Creamos la autorización

Ahora nos queda cambiar las variables en nuestro código.

¡Paciencia! Al ejecutarlo toma unos cuantos segundos en crearse la autorización (a veces mas de 30 segundos)

```ruby
# Usuario para ingresar a AFIP.
# Para la mayoria es el mismo CUIT, pero al administrar
# una sociedad el CUIT con el que se ingresa es el del administrador
# de la sociedad.
username = "201111111111"

# Contraseña para ingresar a AFIP.
password = "contraseñadeafip"

# Alias del certificado a autorizar (previamente creado)
cert_alias = "afipsdk"

# Id del web service a autorizar
wsid = "wsfe"

# Creamos la autorizacion (¡Paciencia! Esto toma unos cuantos segundos)
res = afip.createWSAuth(username, password, cert_alias, wsid)

# Mostramos el resultado por pantalla
puts res
```

Ya tenemos la autorización lista para acceder al web service de AFIP.


Lo único que nos queda es pasar a modo producción, para más información de cómo hacerlo pueden dirigirse a la documentación de la librería https://docs.afipsdk.com/