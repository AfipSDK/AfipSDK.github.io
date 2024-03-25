---
title: "Consultar constancia de Inscripción de AFIP en Python"
description: "Con pocas líneas de código"
pubDate: "Feb 26 2024"
cover: "/images/blog/python.png"
category: "Python"
---

## Instalación

Lo primero es instalar la librería [Afip.py](https://github.com/AfipSDK/afip.py)

**PyPI**

```bash
pip install afip.py
```

## Creamos una instancia de la clase Afip

```python
from afip import Afip

## 
# CUIT Vinculado al certificado
# 
# Podes usar 20409378472 para desarrollo
# sin necesidad de cert y key
## 
CUIT = 20409378472

afip = Afip({ "CUIT": CUIT })
```

## Obtenemos los datos

```python
# CUIT del contribuyente
tax_id = 20111111111

taxpayer_details = afip.RegisterInscriptionProof.getTaxpayerDetails(tax_id)
```

Con esto ya tenemos los datos del contribuyente. También podes usar el [padrón de alcance 13](https://docs.afipsdk.com/paso-a-paso/web-services/padron-alcance-13) o el [padrón de alcance 10](https://docs.afipsdk.com/paso-a-paso/web-services/padron-alcance-10).


Lo único que nos queda es pasar a modo producción, para más información de cómo hacerlo pueden dirigirse a la documentación de la librería https://docs.afipsdk.com/