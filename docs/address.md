# Address API Spec

## Create Address API
Endpoint : POST /api/contacts/:id/addresses

Headers : 
- Authorization : token

Request Body : 
```json
{
  "street" : "jalan jalan",
  "city" : "bandung",
  "province" : "jawa barat",
  "country" : "indonesia",
  "postal_code" : "kode pos"
}
```

Response Body Success : 
```json
{
  "data" : {
    "id" : 1,
    "street" : "jalan jalan",
    "city" : "bandung",
    "province" : "jawa barat",
    "country" : "indonesia",
    "postal_code" : "kode pos"
  }
}
```
Response Body Failed : 
```json
{
  "errors" : "messages failed to create"
}
```
## Update Address API
Endpoint : PUT /api/contacts/:contact_id/addresses/:address_id

Headers : 
- Authorization : token

Request Body : 
```json
{
  "street" : "jalan jalan",
  "city" : "bandung",
  "province" : "jawa barat",
  "country" : "indonesia",
  "postal_code" : "kode pos"
}
```

Response Body Success : 
```json
{
  "data" : {
    "id" : 1,
    "street" : "jalan jalan",
    "city" : "bandung",
    "province" : "jawa barat",
    "country" : "indonesia",
    "postal_code" : "kode pos"
  }
}
```

Response Body Failed : 
```json
{
  "errors" : "messages failed to update"
}
```

## List Address API
Endpoint : POST /api/contacts/:contact_id/addresses

Headers : 
- Authorization : token

Response Body Success :
```json
{
  "data" : [
    {
      "id" : 1,
      "street" : "jalan jalan",
      "city" : "bandung",
      "province" : "jawa barat",
      "country" : "indonesia",
      "postal_code" : "kode pos"
    },
    {
      "id" : 1,
      "street" : "jalan jalan",
      "city" : "bandung",
      "province" : "jawa barat",
      "country" : "indonesia",
      "postal_code" : "kode pos"
    }
  ]
}
``` 

Response Body Failed : 
```json
{
  "errors" : "message failed to get data"
}
```

## Get Address API
Endpoint : GET /api/contacts/:contact_id/addresses/:address_id

Headers : 
- Authorization : token

Response Body Success : 
```json
{
  "data" : {
      "id" : 1,
      "street" : "jalan jalan",
      "city" : "bandung",
      "province" : "jawa barat",
      "country" : "indonesia",
      "postal_code" : "kode pos"
  }
}
```
Response Body Failed : 
```json
{
  "errors" : "messages failed to get data"
}
```
## Remove Address API
Endpoint : DELETE /api/contacts/:contact_id/addresses/:address_id

Headers : 
- Authorization : token

Response Body Success : 
```json
{
  "data" : {
    "message" : "ok"
  }
}
```

Response Body Failed : 
```json
{
  "errors" : "messages failed delete data"
}
```