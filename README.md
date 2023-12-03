
# CRUD Users & Send Email using RabbitMQ

Repo ini dibuat untuk bertujuan untuk test penyelesaian masalah
yaitu membuat proses Create, Read update,delete


## Requirement

- Node js
- express js
## Run Locally

Clone the project

```bash
  git clone https://github.com/aziz8009/express-crud.git
```

Go to the project directory

```bash
  cd express-crud
```

Install dependencies

```bash
  npm install
```

Start the compailer

```bash
  npx tsc
```

Start the server

```bash
  
  npm run start:dev 

  npm run start
```


## Running consumer

```bash
npm run start:consumer
```


## Running Tests

To run tests and coverage, run the following command

```bash
  npm test
```


## API Reference

#### Get data users

```http
  GET /users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |


#### Response
```http
  {
    "status": true,
    "message": "Berhasil, mengabil data users",
    "data": [
        {
            "nama": "aziz tes",
            "email": "aziz8009@gmail.com",
            "no_handphone": "087771786725",
            "alamat": "depok",
            "_id": "6562df22e3c508671e519777",
            "createdAt": "2023-11-26T06:01:06.967Z",
            "updatedAt": "2023-11-26T06:01:06.967Z",
            "__v": 0
        }
    ]
}
```

#### Send Email

```http
  POST /send-email
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `to` | `string` | **Required**. Your API key |
| `subject` | `string` | **Required**. Your API key |
| `message` | `string` | **Required**. Your API key |

#### Response Success
```http
  {
    "status": true,
    "message": "Email sent successfully"
}
```

#### Get Users by ID

```http
  Get /users/{id}
```

#### Response Success
```http
  {
    "status": true,
    "message": "Berhasil, mengambil data users",
    "data": {
        "_id": "6562cc8efcca116fb9e65d20",
        "nama": "aziz tes barus",
        "email": "test@gmail.com",
        "no_handphone": "087771786725",
        "alamat": "depok",
        "createdAt": "2023-11-26T04:41:50.761Z",
        "updatedAt": "2023-11-26T04:41:50.761Z",
        "__v": 0
    },
}
```

#### Create Users

```http
  POST /users
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `nama` | `string` | **Required**. Your API key |
| `email` | `string` | **Required**. Your API key |
| `no_handphone` | `string` | **Required**. Your API key |
| `alamat` | `string` | **Required**. Your API key |

#### Response Success
```http
  {
    "status": true,
    "message": "Berhasil, data users berhasil dibuat",
    "data": {
        "_id": "6562cc8efcca116fb9e65d20",
        "nama": "aziz tes barus",
        "email": "test@gmail.com",
        "no_handphone": "087771786725",
        "alamat": "depok",
        "createdAt": "2023-11-26T04:41:50.761Z",
        "updatedAt": "2023-11-26T04:41:50.761Z",
        "__v": 0
    },
}
```

#### Response Error
```http
  {
    "status": false,
    "message": "Gagal, menambahkan data user",
    "data": null,
}
```

#### update Users

```http
  PUT /users/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `nama` | `string` | **Required**. Your API key |
| `email` | `string` | **Required**. Your API key |
| `no_handphone` | `string` | **Required**. Your API key |
| `alamat` | `string` | **Required**. Your API key |

#### Response Success
```http
  {
    "status": true,
    "message": "Berhasil, merubah data users",
    "data": {
        "_id": "6562cc8efcca116fb9e65d20",
        "nama": "aziz tes barus",
        "email": "test@gmail.com",
        "no_handphone": "087771786725",
        "alamat": "depok",
        "createdAt": "2023-11-26T04:41:50.761Z",
        "updatedAt": "2023-11-26T04:41:50.761Z",
        "__v": 0
    },
}
```

#### Response Error
```http
  {
    "status": false,
    "message": "Gagal, merubah data user",
    "data": null,
}
```

#### Delete Users

```http
  delete /users/{id}
```

#### Response Error
```http
  {
    "status": false,
    "message": "Gagal, get data user",
    "data": null,
}
```

#### Send email Users

```http
  post /send-email
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `to` | `string` | **Required**. Your API key |
| `subject` | `string` | **Required**. Your API key |
| `message` | `string` | **Required**. Your API key |

#### Response Success
```http
  {
    "status": true,
    "message": "Email sent successfully",
}
```

#### Response Error
```http
  {
    "message": "Missing required parameters",
    "status": false,
    "data": null
}
```

