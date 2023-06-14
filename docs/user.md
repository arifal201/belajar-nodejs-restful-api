# User Spec API

## Register User API

Endpoint : POST /api/users

Request Body : 
```json
{
  "username": "arifal@example.com",
  "password": "password",
  "name" : "name"
}
```

Response Success : 

```json
{
  "data" : {
    "name" : "name"
  }
}
```

Response Failed : 

```json
{
  "errors" : "message-error"
}
```

## Login User API

Endpoint : POST /api/users/current

Response Body

```json
{
  "username" : "example@example.com",
  "password" : "secret"
}
```

Response Body Success : 

```json
{
  "data" : {
    "token" : "unique-token"
  }
}
```

Response Body Failed : 

```json
{
  "errors" : "username or password wrong"
}
```

## Update User API

Endpoint : PATCH /api/user/current

Headers
- Authorization : token

Response Body : 
```json
{
  "name" : "data updated",
  "password" : "new password"
}
```

Response Body Success : 

```json
{
  "data" : {
    "username" : "example@example new",
    "name" : "new name"
  }
}
```

Response Body Failed : 

```json
{
  "errors" : "message error"
}
```
## Get User API
Endpoint : GET /api/user/current

Headers
- Authorization : token

Response Success : 

```json
{
  "data" : {
    "username" : "example",
    "name" : "name example"
  }
}
```

Response Failed : 

```json
{
  "errors" : "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/user/logout

Headers
- Authorization : token

Response Body : 

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
  "errors" : "failed to logout"
}
```