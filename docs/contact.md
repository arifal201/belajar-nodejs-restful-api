# Contact API Spec

## Create Contact API
Endpoint : POST /api/contacts

Headers : 
- Authorization : token

Request Body :
```json
{
  "fisrt_name" : "arifal",
  "last_name" : "hidayat",
  "phone" : "982392873",
  "email" : "arifal@example.com
}
```

Response Success :
```json
{
  "data" : {
            "id" : 1,
            "fisrt_name" : "arifal",
            "last_name" : "hidayat",
            "phone" : "982392873",
            "email" : "arifal@example.com"
          }
}
```

Response Failed : 
```json
{
  "errors" : "messages failed to create"
}
```

## Update Contact API

Endpoint : PUT /api/contacts/:id

Headers : 
- Authorization : token

Request Body :
```json
{
  "fisrt_name" : "arifal",
  "last_name" : "hidayat",
  "phone" : "982392873",
  "email" : "arifal@example.com
}
```

Response Success :
```json
{
    "data" : {
                "id" : 1,
                "fisrt_name" : "arifal",
                "last_name" : "hidayat",
                "phone" : "982392873",
                "email" : "arifal@example.com"
              }
}
```

Response Failed : 
```json
{
  "errors" : "messages failed updated"
}
```

## Get Contact API

Endpoint : GET /api/contacts/:id

Headers : 
- Authorization : token

Response Success :
```json
{
  "data" : {
          "id" : 1,
          "fisrt_name" : "arifal",
          "last_name" : "hidayat",
          "phone" : "982392873",
          "email" : "arifal@example.com"
        }
}
```

Response Failed : 
```json
{
  "errors" : "messages not found"  
}
```

## Search Contact API

Endpoint : GET /api/contacts

Headers : 
- Authorization : token

Query Params : 
- name : search by fisrt_name or last_name, optional
- email : search by email, optional 
- phone : search by phone, optional
- page : number of page, default 1
- size : size per page, default 10

Response Success :
```json
{
  "data" : [
    {
      "id" : 1,
      "fisrt_name" : "arifal",
      "last_name" : "hidayat",
      "phone" : "982392873",
      "email" : "arifal@example.com"
    },
    {
      "id" : 1,
      "fisrt_name" : "arifal",
      "last_name" : "hidayat",
      "phone" : "982392873",
      "email" : "arifal@example.com"
    }
  ],
  "paging" : {
    "page" : 1,
    "per_page" : 10,
    "total_page" : 10,
    "total_data" : 100  
  }
}
```

Response Failed : 
```json
{
  "error" : "messages error search"
}
```

## Remove Contact API
Endpoint : DELETE /api/contacts/:id

Headers : 
- Authorization : token


Response Success :
```json
{
  "data" : {
    "message" : "ok"
  }
}
```

Response Failed : 
```json
{
  "errors" : "failed to delete"
}
```