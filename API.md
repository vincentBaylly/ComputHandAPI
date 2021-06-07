# API Documentation

Mapping of the API for the community mapper and a description of each service

TODO define Output

TODO specified required fields

## User
```
  /user/register
    Input: name, email, password
  /user/login
    Input: email, password
```

## Organisation

```
  /organisation/list
    Input: token
  /organisation/add
    Input: name, token
  /organisation/get
    Input: id, token
  /organisation/update
    Input: id, name, token
  /organisation/delete
    Input: id, token
```
