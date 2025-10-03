# Swagger Petstore API

## API Purpose
This API allows users to manage pets, orders, and user accounts in a pet store environment. It provides endpoints to create, update, retrieve, and delete pets and orders, as well as user management functionalities.

## Endpoints Description

### 1. Update an Existing Pet
**Endpoint:** `/pet` (PUT)

**Description:** Updates an existing pet by ID.

**Example Request:**
```json
{
  "id": 10,
  "name": "doggie",
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "photoUrls": ["url1", "url2"],
  "tags": [{"id": 1, "name": "tag1"}],
  "status": "available"
}
```

**Example Response:**
```json
{
  "id": 10,
  "name": "doggie",
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "photoUrls": ["url1", "url2"],
  "tags": [{"id": 1, "name": "tag1"}],
  "status": "available"
}
```

**HTTP Status Codes:**
- `200`: Successful operation
- `400`: Invalid ID supplied
- `404`: Pet not found
- `422`: Validation exception

### 2. Add a New Pet
**Endpoint:** `/pet` (POST)

**Description:** Adds a new pet to the store.

**Example Request:**
```json
{
  "name": "doggie",
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "photoUrls": ["url1", "url2"],
  "tags": [{"id": 1, "name": "tag1"}],
  "status": "available"
}
```

**Example Response:**
```json
{
  "id": 10,
  "name": "doggie",
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "photoUrls": ["url1", "url2"],
  "tags": [{"id": 1, "name": "tag1"}],
  "status": "available"
}
```

**HTTP Status Codes:**
- `200`: Successful operation
- `400`: Invalid input
- `422`: Validation exception

### 3. Find Pets by Status
**Endpoint:** `/pet/findByStatus` (GET)

**Description:** Finds pets by their status.

**Example Request:**
```
GET /pet/findByStatus?status=available
```

**Example Response:**
```json
[
  {
    "id": 10,
    "name": "doggie",
    "category": {
      "id": 1,
      "name": "Dogs"
    },
    "photoUrls": ["url1", "url2"],
    "tags": [{"id": 1, "name": "tag1"}],
    "status": "available"
  }
]
```

**HTTP Status Codes:**
- `200`: Successful operation
- `400`: Invalid status value

### 4. Find Pets by Tags
**Endpoint:** `/pet/findByTags` (GET)

**Description:** Finds pets by their tags.

**Example Request:**
```
GET /pet/findByTags?tags=tag1,tag2
```

**Example Response:**
```json
[
  {
    "id": 10,
    "name": "doggie",
    "category": {
      "id": 1,
      "name": "Dogs"
    },
    "photoUrls": ["url1", "url2"],
    "tags": [{"id": 1, "name": "tag1"}],
    "status": "available"
  }
]
```

**HTTP Status Codes:**
- `200`: Successful operation
- `400`: Invalid tag value

### 5. Get Pet by ID
**Endpoint:** `/pet/{petId}` (GET)

**Description:** Returns a single pet by its ID.

**Example Request:**
```
GET /pet/10
```

**Example Response:**
```json
{
  "id": 10,
  "name": "doggie",
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "photoUrls": ["url1", "url2"],
  "tags": [{"id": 1, "name": "tag1"}],
  "status": "available"
}
```

**HTTP Status Codes:**
- `200`: Successful operation
- `400`: Invalid ID supplied
- `404`: Pet not found

### 6. Update Pet with Form Data
**Endpoint:** `/pet/{petId}` (POST)

**Description:** Updates a pet resource based on form data.

**Example Request:**
```
POST /pet/10?name=newDog&status=sold
```

**Example Response:**
```json
{
  "id": 10,
  "name": "newDog",
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "photoUrls": ["url1", "url2"],
  "tags": [{"id": 1, "name": "tag1"}],
  "status": "sold"
}
```

**HTTP Status Codes:**
- `200`: Successful operation
- `400`: Invalid input

### 7. Delete a Pet
**Endpoint:** `/pet/{petId}` (DELETE)

**Description:** Deletes a pet by its ID.

**Example Request:**
```
DELETE /pet/10
```

**Example Response:**
```json
{
  "message": "Pet deleted successfully"
}
```

**HTTP Status Codes:**
- `200`: Pet deleted
- `400`: Invalid pet value

### 8. Upload an Image
**Endpoint:** `/pet/{petId}/uploadImage` (POST)

**Description:** Uploads an image of the pet.

**Example Request:**
```
POST /pet/10/uploadImage
Content-Type: application/octet-stream

[Binary data]
```

**Example Response:**
```json
{
  "code": 200,
  "type": "success",
  "message": "Image uploaded successfully"
}
```

**HTTP Status Codes:**
- `200`: Successful operation
- `400`: No file uploaded
- `404`: Pet not found

### 9. Get Inventory
**Endpoint:** `/store/inventory` (GET)

**Description:** Returns pet inventories by status.

**Example Request:**
```
GET /store/inventory
```

**Example Response:**
```json
{
  "available": 10,
  "pending": 5,
  "sold": 2
}
```

**HTTP Status Codes:**
- `200`: Successful operation

### 10. Place an Order
**Endpoint:** `/store/order` (POST)

**Description:** Places a new order in the store.

**Example Request:**
```json
{
  "petId": 198772,
  "quantity": 7,
  "shipDate": "2023-10-01T00:00:00Z",
  "status": "placed",
  "complete": true
}
```

**Example Response:**
```json
{
  "id": 10,
  "petId": 198772,
  "quantity": 7,
  "shipDate": "2023-10-01T00:00:00Z",
  "status": "placed",
  "complete": true
}
```

**HTTP Status Codes:**
- `200`: Successful operation
- `400`: Invalid input
- `422`: Validation exception

### 11. Get Order by ID
**Endpoint:** `/store/order/{orderId}` (GET)

**Description:** Finds a purchase order by ID.

**Example Request:**
```
GET /store/order/10
```

**Example Response:**
```json
{
  "id": 10,
  "petId": 198772,
  "quantity": 7,
  "shipDate": "2023-10-01T00:00:00Z",
  "status": "placed",
  "complete": true
}
```

**HTTP Status Codes:**
- `200`: Successful operation
- `400`: Invalid ID supplied
- `404`: Order not found

### 12. Delete Order
**Endpoint:** `/store/order/{orderId}` (DELETE)

**Description:** Deletes a purchase order by identifier.

**Example Request:**
```
DELETE /store/order/10
```

**Example Response:**
```json
{
  "message": "Order deleted successfully"
}
```

**HTTP Status Codes:**
- `200`: Order deleted
- `400`: Invalid ID supplied
- `404`: Order not found

### 13. Create User
**Endpoint:** `/user` (POST)

**Description:** Creates a new user.

**Example Request:**
```json
{
  "username": "theUser",
  "firstName": "John",
  "lastName": "James",
  "email": "john@email.com",
  "password": "12345",
  "phone": "12345",
  "userStatus": 1
}
```

**Example Response:**
```json
{
  "id": 10,
  "username": "theUser",
  "firstName": "John",
  "lastName": "James",
  "email": "john@email.com",
  "password": "12345",
  "phone": "12345",
  "userStatus": 1
}
```

**HTTP Status Codes:**
- `200`: Successful operation

### 14. Create Users with List
**Endpoint:** `/user/createWithList` (POST)

**Description:** Creates a list of users with the given input array.

**Example Request:**
```json
[
  {
    "username": "theUser",
    "firstName": "John",
    "lastName": "James",
    "email": "john@email.com",
    "password": "12345",
    "phone": "12345",
    "userStatus": 1
  }
]
```

**Example Response:**
```json
[
  {
    "id": 10,
    "username": "theUser",
    "firstName": "John",
    "lastName": "James",
    "email": "john@email.com",
    "password": "12345",
    "phone": "12345",
    "userStatus": 1
  }
]
```

**HTTP Status Codes:**
- `200`: Successful operation

### 15. Login User
**Endpoint:** `/user/login` (GET)

**Description:** Logs user into the system.

**Example Request:**
```
GET /user/login?username=theUser&password=12345
```

**Example Response:**
```json
"logged in successfully"
```

**HTTP Status Codes:**
- `200`: Successful operation
- `400`: Invalid username/password supplied

### 16. Logout User
**Endpoint:** `/user/logout` (GET)

**Description:** Logs out the current logged-in user session.

**Example Request:**
```
GET /user/logout
```

**Example Response:**
```json
"logged out successfully"
```

**HTTP Status Codes:**
- `200`: Successful operation

### 17. Get User by Username
**Endpoint:** `/user/{username}` (GET)

**Description:** Gets user details based on username.

**Example Request:**
```
GET /user/theUser
```

**Example Response:**
```json
{
  "id": 10,
  "username": "theUser",
  "firstName": "John",
  "lastName": "James",
  "email": "john@email.com",
  "password": "12345",
  "phone": "12345",
  "userStatus": 1
}
```

**HTTP Status Codes:**
- `200`: Successful operation
- `400`: Invalid username supplied
- `404`: User not found

### 18. Update User
**Endpoint:** `/user/{username}` (PUT)

**Description:** Updates a user resource.

**Example Request:**
```json
{
  "username": "theUser",
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@email.com",
  "password": "54321",
  "phone": "54321",
  "userStatus": 1
}
```

**Example Response:**
```json
"User updated successfully"
```

**HTTP Status Codes:**
- `200`: Successful operation
- `400`: Bad request
- `404`: User not found

### 19. Delete User
**Endpoint:** `/user/{username}` (DELETE)

**Description:** Deletes a user resource.

**Example Request:**
```
DELETE /user/theUser
```

**Example Response:**
```json
"User deleted successfully"
```

**HTTP Status Codes:**
- `200`: User deleted
- `400`: Invalid username supplied
- `404`: User not found
