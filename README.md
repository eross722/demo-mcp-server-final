# Swagger Petstore API

## API Célja
Ez az API a Swagger Petstore mintájára készült, lehetővé téve a felhasználók számára, hogy állatokat adjanak hozzá, frissítsenek, töröljenek és keressenek az állatok között. Az API a petstore rendeléseivel és felhasználóival kapcsolatos műveleteket is támogat.

## Végpontok Leírása

### 1. /pet (POST)
#### Leírás
Új állat hozzáadása a boltba.

#### Példa kérés
```json
{
  "name": "doggie",
  "photoUrls": ["http://example.com/photo.jpg"],
  "status": "available"
}
```

#### Példa válasz
```json
{
  "id": 10,
  "name": "doggie",
  "photoUrls": ["http://example.com/photo.jpg"],
  "status": "available"
}
```

#### Paraméterek
- `pet`: Az új állat objektuma, amely tartalmazza a nevét, fényképeit és státuszát.

#### HTTP státuszok
- `200`: Sikeres művelet

---

### 2. /pet (PUT)
#### Leírás
Egy meglévő állat frissítése az azonosítója alapján.

#### Példa kérés
```json
{
  "name": "doggie",
  "photoUrls": ["http://example.com/photo-updated.jpg"],
  "status": "sold"
}
```

#### Példa válasz
```json
{
  "id": 10,
  "name": "doggie",
  "photoUrls": ["http://example.com/photo-updated.jpg"],
  "status": "sold"
}
```

#### Paraméterek
- `petId`: Az állat azonosítója, amelyet frissíteni szeretnénk.
- `pet`: Az állat frissített objektuma.

#### HTTP státuszok
- `200`: Sikeres művelet

---

### 3. /pet/findByStatus (GET)
#### Leírás
Állatok keresése státusz alapján.

#### Példa kérés
```
GET /pet/findByStatus?status=available
```

#### Példa válasz
```json
[
  {
    "id": 10,
    "name": "doggie",
    "photoUrls": ["http://example.com/photo.jpg"],
    "status": "available"
  }
]
```

#### Paraméterek
- `status`: A keresett állatok státusza (pl. available, pending, sold).

#### HTTP státuszok
- `200`: Sikeres művelet

---

### 4. /pet/{petId} (GET)
#### Leírás
Egy állat lekérdezése az azonosítója alapján.

#### Példa kérés
```
GET /pet/10
```

#### Példa válasz
```json
{
  "id": 10,
  "name": "doggie",
  "photoUrls": ["http://example.com/photo.jpg"],
  "status": "available"
}
```

#### Paraméterek
- `petId`: Az állat azonosítója, amelyet le szeretnénk kérdezni.

#### HTTP státuszok
- `200`: Sikeres művelet

---

### 5. /pet/{petId} (DELETE)
#### Leírás
Egy állat törlése az azonosítója alapján.

#### Példa kérés
```
DELETE /pet/10
```

#### Példa válasz
```json
{
  "message": "Pet with ID 10 deleted successfully."
}
```

#### Paraméterek
- `petId`: Az állat azonosítója, amelyet törölni szeretnénk.

#### HTTP státuszok
- `200`: Sikeres művelet

---

### 6. /pet/{petId}/uploadImage (POST)
#### Leírás
Kép feltöltése az állathoz.

#### Példa kérés
```
POST /pet/10/uploadImage
```

#### Példa válasz
```json
{
  "code": 200,
  "type": "success",
  "message": "Image uploaded successfully."
}
```

#### Paraméterek
- `petId`: Az állat azonosítója, amelyhez a képet feltöltjük.
- `additionalMetadata`: Opcionális kiegészítő metaadatok.

#### HTTP státuszok
- `200`: Sikeres művelet

---

### 7. /store/order (POST)
#### Leírás
Rendelés létrehozása egy állatra.

#### Példa kérés
```json
{
  "petId": 198772,
  "quantity": 7,
  "shipDate": "2023-10-10T00:00:00Z",
  "status": "placed",
  "complete": true
}
```

#### Példa válasz
```json
{
  "id": 10,
  "petId": 198772,
  "quantity": 7,
  "shipDate": "2023-10-10T00:00:00Z",
  "status": "placed",
  "complete": true
}
```

#### Paraméterek
- `order`: A rendelés objektuma, amely tartalmazza az állat azonosítóját, mennyiségét és egyéb részleteket.

#### HTTP státuszok
- `200`: Sikeres művelet

---

### 8. /store/order/{orderId} (GET)
#### Leírás
Rendelés lekérdezése az azonosítója alapján.

#### Példa kérés
```
GET /store/order/10
```

#### Példa válasz
```json
{
  "id": 10,
  "petId": 198772,
  "quantity": 7,
  "shipDate": "2023-10-10T00:00:00Z",
  "status": "placed",
  "complete": true
}
```

#### Paraméterek
- `orderId`: A rendelés azonosítója, amelyet le szeretnénk kérdezni.

#### HTTP státuszok
- `200`: Sikeres művelet

---

### 9. /store/order/{orderId} (DELETE)
#### Leírás
Rendelés törlése az azonosítója alapján.

#### Példa kérés
```
DELETE /store/order/10
```

#### Példa válasz
```json
{
  "message": "Order with ID 10 deleted successfully."
}
```

#### Paraméterek
- `orderId`: A rendelés azonosítója, amelyet törölni szeretnénk.

#### HTTP státuszok
- `200`: Sikeres művelet

---

### 10. /user (POST)
#### Leírás
Felhasználó létrehozása.

#### Példa kérés
```json
{
  "username": "theUser",
  "firstName": "John",
  "lastName": "James",
  "email": "john@email.com",
  "password": "12345",
  "phone": "12345"
}
```

#### Példa válasz
```json
{
  "id": 10,
  "username": "theUser",
  "firstName": "John",
  "lastName": "James",
  "email": "john@email.com",
  "password": "12345",
  "phone": "12345"
}
```

#### Paraméterek
- `user`: A létrehozandó felhasználó objektuma.

#### HTTP státuszok
- `200`: Sikeres művelet

---

### 11. /user/{username} (GET)
#### Leírás
Felhasználó lekérdezése a felhasználónév alapján.

#### Példa kérés
```
GET /user/theUser
```

#### Példa válasz
```json
{
  "id": 10,
  "username": "theUser",
  "firstName": "John",
  "lastName": "James",
  "email": "john@email.com",
  "password": "12345",
  "phone": "12345"
}
```

#### Paraméterek
- `username`: A felhasználó neve, amelyet le szeretnénk kérdezni.

#### HTTP státuszok
- `200`: Sikeres művelet

---

### 12. /user/{username} (DELETE)
#### Leírás
Felhasználó törlése a felhasználónév alapján.

#### Példa kérés
```
DELETE /user/theUser
```

#### Példa válasz
```json
{
  "message": "User theUser deleted successfully."
}
```

#### Paraméterek
- `username`: A felhasználó neve, amelyet törölni szeretnénk.

#### HTTP státuszok
- `200`: Sikeres művelet

---

### 13. /user/login (GET)
#### Leírás
Felhasználó bejelentkezése a rendszerbe.

#### Példa kérés
```
GET /user/login?username=theUser&password=12345
```

#### Példa válasz
```json
"token"
```

#### Paraméterek
- `username`: A felhasználó neve a bejelentkezéshez.
- `password`: A felhasználó jelszava.

#### HTTP státuszok
- `200`: Sikeres bejelentkezés

---

### 14. /user/logout (GET)
#### Leírás
Felhasználó kijelentkezése a rendszerből.

#### Példa kérés
```
GET /user/logout
```

#### Példa válasz
```json
{
  "message": "Successfully logged out."
}
```

#### HTTP státuszok
- `200`: Sikeres kijelentkezés
