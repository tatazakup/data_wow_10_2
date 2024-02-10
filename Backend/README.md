## Instructions

Install dependencies

```bash
$ yarn
```

Start Server

```bash
$ yarn start
```

Also when doing requests, its good to know that
- If you make POST, PUT, PATCH or DELETE requests, changes will be automatically and safely saved to `db.json` using [lowdb](https://github.com/typicode/lowdb).
- Your request body JSON should be object enclosed, just like the GET output. (for example ` {"title": "test", "completed": true,}`)
- Id values are not mutable. Any `id` value in the body of your PUT or PATCH request wil be ignored. Only a value set in a POST request wil be respected, but only if not already taken.
- A POST, PUT or PATCH request should include a `Content-Type: application/json` header to use the JSON in the request body. Otherwise it will result in a 200 OK but without changes being made to the data.


## Routes

Based on the `db.json` file, here are all the default routes. 

```
GET    /todos
GET    /todos/1
PUT    /todos/1
PATCH  /todos/1
DELETE /todos/1
```

Full documentation please see [https://github.com/typicode/json-server#routes](https://github.com/typicode/json-server#routes)

