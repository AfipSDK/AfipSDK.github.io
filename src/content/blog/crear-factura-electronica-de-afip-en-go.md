---
title: "Crear factura electrónica de AFIP en Go"
description: "Con pocas líneas de código"
pubDate: "Apr 17 2024"
cover: "/images/blog/go.png"
category: "Go"
---

El primer paso para crear una factura electrónica de AFIP es obtener el Código de Autorización Electrónico o CAE. 

Esto lo vamos a hacer utilizando Afip SDK que nos permite conectarnos a los web services de AFIP sin complicarnos con el uso de SOAP y la autenticación.

## Obtener la autorización

Lo primero que tenemos hacer es obtener el “Token authorization”, que seria la autorización en AFIP.

Para usar los web services de AFIP necesitamos un [certificado y key](https://docs.afipsdk.com/paso-a-paso/instalacion#opcional-si-queres-usar-tu-propio-certificado-para-desarrollo) pero Afip SDK nos deja utilizar el CUIT 20409378472 en modo testing para integrarnos rápidamente.


Debemos ejecutar una solicitud **POST** al endpoint

```bash
https://app.afipsdk.com/api/v1/afip/auth
```

```go
import (
    "fmt"
    "strings"
    "net/http"
    "io/ioutil"
    "time"
)

url := "https://app.afipsdk.com/api/v1/afip/auth"
method := "POST"

authData, err := json.Marshal(map[string]string{
    "environment": "dev",
    "tax_id": "20409378472", // CUIT a utilizar
    "wsid": "wsfe",
})

payload := strings.NewReader(string(authData))

client := &http.Client {}

req, err := http.NewRequest(method, url, payload)

if err != nil {
    fmt.Println(err)
    return
}

req.Header.Add("Content-Type", "application/json")

res, err := client.Do(req)

if err != nil {
    fmt.Println(err)
    return
}

defer res.Body.Close()

body, err := ioutil.ReadAll(res.Body)

if res.StatusCode >= 400 {
    fmt.Println(string(body))
    return
}

var auth any

json.Unmarshal([]byte(string(body)), &auth)
```

En **auth["token"]** y **auth["sign"]** tenemos el token y sign que nos dio AFIP para usar el web service. No es necesario que lo guardemos, Afip SDK se encarga de esto por nosotros, debemos solicitarlo antes de cada llamada a los métodos del web service.


## Crear la factura

Vamos a crear una Factura B por un importe de $121

Debemos ejecutar una solicitud **POST** al endpoint

```bash
https://app.afipsdk.com/api/v1/afip/requests
```

```go
urlRequest := "https://app.afipsdk.com/api/v1/afip/requests"
methodRequest := "POST"

requestData, err := json.Marshal(map[string]any{
    "environment": "dev",
    "method": "FECAESolicitar",
    "wsid": "wsfe",
    "params": map[string]any{
        "Auth" : map[string]any{ 
            "Token": auth["token"], // Token obtenido previamente
            "Sign": auth["sign"], // Sign obtenido previamente
            "Cuit": "20409378472", // CUIT que estamos utilizando
        },
        "FeCAEReq" : map[string]any{
            "FeCabReq" : map[string]any{
                "CantReg" 	: 1, // Cantidad de comprobantes a registrar
                "PtoVta" 	: 1, // Punto de venta
                "CbteTipo" 	: 6, // Tipo de comprobante (ver tipos disponibles) 
            },
            "FeDetReq" : map[string]any{ 
                "FECAEDetRequest" : map[string]any{
                    "Concepto" : 1, // Concepto del Comprobante: (1)Productos, (2)Servicios, (3)Productos y Servicios
                    "DocTipo" : 99, // Tipo de documento del comprador (99 consumidor final, ver tipos disponibles)
                    "DocNro" : 0, // Número de documento del comprador (0 consumidor final)
                    "CbteDesde" : 1, // Número de comprobante o numero del primer comprobante en caso de ser mas de uno
                    "CbteHasta" : 1, // Número de comprobante o numero del último comprobante en caso de ser mas de uno
                    "CbteFch" : time.Now().Format("20060102"), // (Opcional) Fecha del comprobante (yyyyMMdd) o fecha actual si es nulo
                    "ImpTotal" : 121, // Importe total del comprobante
                    "ImpTotConc" : 0, // Importe neto no gravado
                    "ImpNeto" : 100, // Importe neto gravado
                    "ImpOpEx" : 0, // Importe exento de IVA
                    "ImpIVA" : 21, //Importe total de IVA
                    "ImpTrib" : 0, //Importe total de tributos
                    "MonId" : "PES", //Tipo de moneda usada en el comprobante (ver tipos disponibles)('PES' para pesos argentinos) 
                    "MonCotiz" : 1, // Cotización de la moneda usada (1 para pesos argentinos)  
                    "Iva" : map[string]any{ // (Opcional) Alícuotas asociadas al comprobante
                        "AlicIva": [1]any{map[string]any{
                                "Id" : 5, // Id del tipo de IVA (5 para 21%)(ver tipos disponibles) 
                                "BaseImp" : 100, // Base imponible
                                "Importe" : 21, // Importe 
                        }},
                    },
                },
            },
        },
    },
})

fmt.Println(string(requestData))

payloadRequest := strings.NewReader(string(requestData))

clientRequest := &http.Client {}

reqRequest, err := http.NewRequest(methodRequest, urlRequest, payloadRequest)

if err != nil {
    fmt.Println(err)
    return
}

reqRequest.Header.Add("Content-Type", "application/json")

resRequest, err := clientRequest.Do(reqRequest)

if err != nil {
    fmt.Println(err)
    return
}

defer resRequest.Body.Close()

bodyRequest, err := ioutil.ReadAll(resRequest.Body)

if resRequest.StatusCode >= 400 {
    fmt.Println(string(bodyRequest))
    return
}

var data map[string]any

json.Unmarshal([]byte(string(bodyRequest)), &data)

fmt.Println(data)
```

En **data** tenemos el CAE y vencimiento correspondientes a la factura que acabamos de crear.


```json
{
...
  "CAE": "12345678987654",
  "CAEFchVto": "20240327"
...
}
```

Con la autorizacion creada ya podemos proceder a crear el PDF para presentarle a nuestro cliente. Podes usar como base esta [factura](https://gist.githubusercontent.com/AfipSDK/60604af781826b0d0438042ae807cc91/raw/87d7eff8ab2ad180319eecef9caa47fd0ae8ec1a/bill.html) o [ticket](https://gist.githubusercontent.com/AfipSDK/fb05e5bfd059e9bf7fc6045de426ae7f/raw/0bbda8e8e456de768e3a2fb464e4899258146ea2/ticket.html) de ejemplo.

Luego, lo único que nos queda es pasar a modo producción, para más información de cómo hacerlo pueden dirigirse a la documentación de la librería https://docs.afipsdk.com/