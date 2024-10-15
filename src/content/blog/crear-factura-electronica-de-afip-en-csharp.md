---
title: "Crear factura electrónica de AFIP en C#"
description: "Con pocas líneas de código"
pubDate: "Oct 15 2024"
cover: "/images/blog/csharp-create-invoice.png"
category: ".NET"
---

El primer paso para crear una factura electrónica de AFIP en C# es obtener el Código de Autorización Electrónico o CAE. 

Esto lo vamos a hacer utilizando Afip SDK que nos permite conectarnos a los web services de AFIP sin complicarnos con el uso de SOAP y la autenticación.

## Obtener la autorización

Lo primero que tenemos hacer es obtener el “Token authorization”, que seria la autorización en AFIP.

Para usar los web services de AFIP necesitamos un [certificado y key](https://docs.afipsdk.com/paso-a-paso/instalacion#opcional-si-queres-usar-tu-propio-certificado-para-desarrollo) pero Afip SDK nos deja utilizar el CUIT 20409378472 en modo testing para integrarnos rápidamente.


Debemos ejecutar una solicitud **POST** al endpoint

```bash
https://app.afipsdk.com/api/v1/afip/auth
```

```C#
using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Newtonsoft.Json;


var client = new HttpClient();

// Paso 1: Obtener el Token y Sign
var authUrl = "https://app.afipsdk.com/api/v1/afip/auth";
var authData = new
{
    environment = "dev",
    tax_id = "20409378472", // CUIT a utilizar
    wsid = "wsfe"
};

var authJsonContent = JsonConvert.SerializeObject(authData);
var authContent = new StringContent(authJsonContent, Encoding.UTF8, "application/json");

var authResponse = await client.PostAsync(authUrl, authContent);

if (!authResponse.IsSuccessStatusCode)
{
    Console.WriteLine($"Error en la autorización: {authResponse.StatusCode}");
    return;
}

var authResponseBody = await authResponse.Content.ReadAsStringAsync();
dynamic auth = JsonConvert.DeserializeObject(authResponseBody);

string token = auth.token;
string sign = auth.sign;

Console.WriteLine($"Token: {token}");
Console.WriteLine($"Sign: {sign}");
```

Ahora tenemos **token** y **sign** que nos dio AFIP para usar el web service. No es necesario que lo guardemos, Afip SDK se encarga de esto por nosotros, debemos solicitarlo antes de cada llamada a los métodos del web service.


## Crear la factura

Vamos a crear una Factura B por un importe de $121. En el main de nuestra clase añadimos el siguiente codigo:

Debemos ejecutar una solicitud **POST** al endpoint

```bash
https://app.afipsdk.com/api/v1/afip/requests
```

```C#
// Paso 2: Crear la factura con el Token y Sign obtenidos
var invoiceUrl = "https://app.afipsdk.com/api/v1/afip/requests";
var invoiceData = new
{
    environment = "dev",
    method = "FECAESolicitar",
    wsid = "wsfe",
    @params = new
    {
        Auth = new
        {
            Token = token, // Token obtenido previamente
            Sign = sign,   // Sign obtenido previamente
            Cuit = "20409378472" // CUIT que estamos utilizando
        },
        FeCAEReq = new
        {
            FeCabReq = new
            {
                CantReg = 1,    // Cantidad de comprobantes a registrar
                PtoVta = 1,     // Punto de venta
                CbteTipo = 6    // Tipo de comprobante
            },
            FeDetReq = new
            {
                FECAEDetRequest = new
                {
                    Concepto = 1,     // Concepto del Comprobante: (1)Productos, (2)Servicios, (3)Productos y Servicios
                    DocTipo = 99,     // Tipo de documento del comprador (99 consumidor final)
                    DocNro = 0,       // Número de documento del comprador (0 consumidor final)
                    CbteDesde = 1,    // Número de comprobante
                    CbteHasta = 1,    // Número de comprobante
                    CbteFch = DateTime.Now.ToString("yyyyMMdd"), // Fecha del comprobante (yyyyMMdd)
                    ImpTotal = 121,   // Importe total del comprobante
                    ImpTotConc = 0,   // Importe neto no gravado
                    ImpNeto = 100,    // Importe neto gravado
                    ImpOpEx = 0,      // Importe exento de IVA
                    ImpIVA = 21,      // Importe total de IVA
                    ImpTrib = 0,      // Importe total de tributos
                    MonId = "PES",    // Tipo de moneda usada en el comprobante
                    MonCotiz = 1,     // Cotización de la moneda usada
                    Iva = new[]
                    {
                        new { Id = 5, BaseImp = 100, Importe = 21 } // Alícuota de IVA (5 para 21%)
                    }
                }
            }
        }
    }
};

var invoiceJsonContent = JsonConvert.SerializeObject(invoiceData);
var invoiceContent = new StringContent(invoiceJsonContent, Encoding.UTF8, "application/json");

var invoiceResponse = await client.PostAsync(invoiceUrl, invoiceContent);

if (!invoiceResponse.IsSuccessStatusCode)
{
    Console.WriteLine($"Error al crear la factura: {invoiceResponse.StatusCode}");
    return;
}

var invoiceResponseBody = await invoiceResponse.Content.ReadAsStringAsync();
dynamic invoice = JsonConvert.DeserializeObject(invoiceResponseBody);

Console.WriteLine($"Invoice: {invoice}");
```

En **invoice** tenemos el CAE y vencimiento correspondientes a la factura que acabamos de crear.


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