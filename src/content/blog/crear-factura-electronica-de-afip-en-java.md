---
title: "Crear factura electrónica de AFIP en Java"
description: "Con pocas líneas de código"
pubDate: "Oct 7 2024"
cover: "/images/blog/java-create-invoice.png"
category: "Java"
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

```java
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;
import java.util.Date;

public class AfipInvoiceCreator {

    public static void main(String[] args) {
        try {
            // Paso 1: Obtener el Token Authorization
            HttpClient client = HttpClient.newBuilder()
                    .connectTimeout(Duration.ofSeconds(15))
                    .build();

            // JSON creado manualmente para el request
            String authRequestBody = "{"
            + "\"environment\": \"dev\","
            + "\"tax_id\": \"20409378472\","
            + "\"wsid\": \"wsfe\""
            + "}";

            HttpRequest authRequest = HttpRequest.newBuilder()
                    .uri(new URI("https://app.afipsdk.com/api/v1/afip/auth"))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(authRequestBody))
                    .build();

            HttpResponse<String> authResponse = client.send(authRequest, HttpResponse.BodyHandlers.ofString());

            if (authResponse.statusCode() >= 400) {
                System.out.println("Error in auth request: " + authResponse.body());
                return;
            }

            // Parsear respuesta para extraer el sign y token
            Map<String, String> authData = parseJson(authResponse.body());
            String token = authData.get("token");
            String sign = authData.get("sign");

            System.out.println("Token: " + token);
            System.out.println("Sign: " + sign);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Simple method to parse a flat JSON string into a Map without using any libraries
    public static Map<String, String> parseJson(String json) {
        Map<String, String> map = new HashMap<>();

        // Remove outer braces and split by commas
        String[] entries = json.replaceAll("\\{", "")
                               .replaceAll("}", "")
                               .split(",");

        for (String entry : entries) {
            // Split by colon to separate key and value
            String[] keyValue = entry.split(":");

            // Remove quotes and trim whitespace
            String key = keyValue[0].trim().replaceAll("\"", "");
            String value = keyValue[1].trim().replaceAll("\"", "");

            map.put(key, value);
        }

        return map;
    }
}
```

Ahora tenemos **token** y **sign** que nos dio AFIP para usar el web service. No es necesario que lo guardemos, Afip SDK se encarga de esto por nosotros, debemos solicitarlo antes de cada llamada a los métodos del web service.


## Crear la factura

Vamos a crear una Factura B por un importe de $121. En el main de nuestra clase añadimos el siguiente codigo:

Debemos ejecutar una solicitud **POST** al endpoint

```bash
https://app.afipsdk.com/api/v1/afip/requests
```

```java
// Obtener la fecha actual en formato yyyyMMdd
SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
String fechaActual = formatter.format(new Date());

// Paso 2: Preparar los datos de la factura
String invoiceRequestBody = "{"
+ "\"environment\": \"dev\","
+ "\"method\": \"FECAESolicitar\","
+ "\"wsid\": \"wsfe\","
+ "\"params\": {"
+ "  \"Auth\": {"
+ "    \"Token\": \"" + token + "\","
+ "    \"Sign\": \"" + sign + "\","
+ "    \"Cuit\": \"20409378472\""
+ "  },"
+ "  \"FeCAEReq\": {"
+ "    \"FeCabReq\": {"
+ "      \"CantReg\": 1,"
+ "      \"PtoVta\": 1,"
+ "      \"CbteTipo\": 6"
+ "    },"
+ "    \"FeDetReq\": {"
+ "      \"FECAEDetRequest\": {"
+ "        \"Concepto\": 1,"
+ "        \"DocTipo\": 99,"
+ "        \"DocNro\": 0,"
+ "        \"CbteDesde\": 1,"
+ "        \"CbteHasta\": 1,"
+ "        \"CbteFch\": \"" + fechaActual + "\","
+ "        \"ImpTotal\": 121,"
+ "        \"ImpTotConc\": 0,"
+ "        \"ImpNeto\": 100,"
+ "        \"ImpOpEx\": 0,"
+ "        \"ImpIVA\": 21,"
+ "        \"ImpTrib\": 0,"
+ "        \"MonId\": \"PES\","
+ "        \"MonCotiz\": 1,"
+ "        \"Iva\": {"
+ "          \"AlicIva\": [{"
+ "            \"Id\": 5,"
+ "            \"BaseImp\": 100,"
+ "            \"Importe\": 21"
+ "          }]"
+ "        }"
+ "      }"
+ "    }"
+ "  }"
+ "}}";

HttpRequest invoiceRequest = HttpRequest.newBuilder()
        .uri(new URI("https://app.afipsdk.com/api/v1/afip/requests"))
        .header("Content-Type", "application/json")
        .POST(HttpRequest.BodyPublishers.ofString(invoiceRequestBody))
        .build();

HttpResponse<String> invoiceResponse = client.send(invoiceRequest, HttpResponse.BodyHandlers.ofString());

if (invoiceResponse.statusCode() >= 400) {
    System.out.println("Error in invoice request: " + invoiceResponse.body());
    return;
}

Map<String, String> invoiceData = parseJson(invoiceResponse.body());
System.out.println("Invoice Response: " + invoiceData);
```

En **invoiceData** tenemos el CAE y vencimiento correspondientes a la factura que acabamos de crear.


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