# Swagger Petstore API

## API Célja
Ez az API a Swagger Petstore mintájára készült, amely lehetővé teszi a felhasználók számára, hogy háziállatokat kezeljenek, rendeléseket végezzenek, és felhasználói fiókokat kezeljenek.

## Végpontok Leírása

### 1. /pet (POST)
- **Leírás**: Új háziállat hozzáadása az üzlethez.
- **Példa kérés**:
```json
{
  "name": "doggie",
  "photoUrls": ["http://example.com/photo1.jpg"],
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "tags": [
    {
      "id": 1,
      "name": "tag1"
    }
  ],
  "status": "available"
}
```
- **Példa válasz**:
```json
{
  "id": 10,
  "name": "doggie",
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "photoUrls": ["http://example.com/photo1.jpg"],
  "tags": [
    {
      "id": 1,
      "name": "tag1"
    }
  ],
  "status": "available"
}
```
- **HTTP státuszok**:
  - 200: Sikeres művelet
  - 400: Érvénytelen bemenet
  - 422: Érvényességi kivétel

### 2. /pet (PUT)
- **Leírás**: Egy meglévő háziállat frissítése az azonosítója alapján.
- **Példa kérés**:
```json
{
  "id": 10,
  "name": "doggie",
  "photoUrls": ["http://example.com/photo1.jpg"],
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "tags": [
    {
      "id": 1,
      "name": "tag1"
    }
  ],
  "status": "available"
}
```
- **Példa válasz**:
```json
{
  "id": 10,
  "name": "doggie",
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "photoUrls": ["http://example.com/photo1.jpg"],
  "tags": [
    {
      "id": 1,
      "name": "tag1"
    }
  ],
  "status": "available"
}
```
- **HTTP státuszok**:
  - 200: Sikeres művelet
  - 400: Érvénytelen azonosító
  - 404: Háziállat nem található
  - 422: Érvényességi kivétel

### 3. /pet/findByStatus (GET)
- **Leírás**: Háziállatok keresése státusz alapján.
- **Példa kérés**: `/pet/findByStatus?status=available`
- **Példa válasz**:
```json
[
  {
    "id": 10,
    "name": "doggie",
    "category": {
      "id": 1,
      "name": "Dogs"
    },
    "photoUrls": ["http://example.com/photo1.jpg"],
    "tags": [
      {
        "id": 1,
        "name": "tag1"
      }
    ],
    "status": "available"
  }
]
```
- **HTTP státuszok**:
  - 200: Sikeres művelet
  - 400: Érvénytelen státusz érték

### 4. /pet/findByTags (GET)
- **Leírás**: Háziállatok keresése címkék alapján.
- **Példa kérés**: `/pet/findByTags?tags=tag1,tag2`
- **Példa válasz**:
```json
[
  {
    "id": 10,
    "name": "doggie",
    "category": {
      "id": 1,
      "name": "Dogs"
    },
    "photoUrls": ["http://example.com/photo1.jpg"],
    "tags": [
      {
        "id": 1,
        "name": "tag1"
      }
    ],
    "status": "available"
  }
]
```
- **HTTP státuszok**:
  - 200: Sikeres művelet
  - 400: Érvénytelen címke érték

### 5. /pet/{petId} (GET)
- **Leírás**: Háziállat keresése az azonosítója alapján.
- **Példa kérés**: `/pet/10`
- **Példa válasz**:
```json
{
  "id": 10,
  "name": "doggie",
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "photoUrls": ["http://example.com/photo1.jpg"],
  "tags": [
    {
      "id": 1,
      "name": "tag1"
    }
  ],
  "status": "available"
}
```
- **HTTP státuszok**:
  - 200: Sikeres művelet
  - 400: Érvénytelen azonosító
  - 404: Háziállat nem található

### 6. /pet/{petId} (POST)
- **Leírás**: Háziállat frissítése form adatok alapján.
- **Példa kérés**: `/pet/10?name=newName&status=sold`
- **Példa válasz**:
```json
{
  "id": 10,
  "name": "newName",
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "photoUrls": ["http://example.com/photo1.jpg"],
  "tags": [
    {
      "id": 1,
      "name": "tag1"
    }
  ],
  "status": "sold"
}
```
- **HTTP státuszok**:
  - 200: Sikeres művelet
  - 400: Érvénytelen bemenet

### 7. /pet/{petId} (DELETE)
- **Leírás**: Háziállat törlése az azonosítója alapján.
- **Példa kérés**: `/pet/10`
- **Példa válasz**:
```json
{
  "message": "Pet deleted"
}
```
- **HTTP státuszok**:
  - 200: Háziállat törölve
  - 400: Érvénytelen háziállat érték

### 8. /pet/{petId}/uploadImage (POST)
- **Leírás**: Kép feltöltése a háziállathoz.
- **Példa kérés**: `/pet/10/uploadImage?additionalMetadata=someMetadata`
- **Példa válasz**:
```json
{
  "code": 200,
  "type": "success",
  "message": "Image uploaded successfully"
}
```
- **HTTP státuszok**:
  - 200: Sikeres művelet
  - 400: Nincs feltöltött fájl
  - 404: Háziállat nem található

### 9. /store/inventory (GET)
- **Leírás**: Háziállatok készletének lekérdezése státusz alapján.
- **Példa kérés**: `/store/inventory`
- **Példa válasz**:
```json
{
  "available": 10,
  "pending": 5,
  "sold": 2
}
```
- **HTTP státuszok**:
  - 200: Sikeres művelet

### 10. /store/order (POST)
- **Leírás**: Rendelés leadása egy háziállatra.
- **Példa kérés**:
```json
{
  "petId": 198772,
  "quantity": 7,
  "shipDate": "2023-10-27T10:00:00.000Z",
  "status": "placed",
  "complete": false
}
```
- **Példa válasz**:
```json
{
  "id": 10,
  "petId": 198772,
  "quantity": 7,
  "shipDate": "2023-10-27T10:00:00.000Z",
  "status": "placed",
  "complete": false
}
```
- **HTTP státuszok**:
  - 200: Sikeres művelet
  - 400: Érvénytelen bemenet
  - 422: Érvényességi kivétel

### 11. /store/order/{orderId} (GET)
- **Leírás**: Rendelés lekérdezése az azonosítója alapján.
- **Példa kérés**: `/store/order/10`
- **Példa válasz**:
```json
{
  "id": 10,
  "petId": 198772,
  "quantity": 7,
  "shipDate": "2023-10-27T10:00:00.000Z",
  "status": "placed",
  "complete": false
}
```
- **HTTP státuszok**:
  - 200: Sikeres művelet
  - 400: Érvénytelen azonosító
  - 404: Rendelés nem található

### 12. /store/order/{orderId} (DELETE)
- **Leírás**: Rendelés törlése az azonosítója alapján.
- **Példa kérés**: `/store/order/10`
- **Példa válasz**:
```json
{
  "message": "Order deleted"
}
```
- **HTTP státuszok**:
  - 200: Rendelés törölve
  - 400: Érvénytelen azonosító
  - 404: Rendelés nem található

### 13. /user (POST)
- **Leírás**: Felhasználó létrehozása.
- **Példa kérés**:
```json
{
  "username": "theUser",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "12345",
  "phone": "1234567890",
  "userStatus": 1
}
```
- **Példa válasz**:
```json
{
  "id": 10,
  "username": "theUser",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "12345",
  "phone": "1234567890",
  "userStatus": 1
}
```
- **HTTP státuszok**:
  - 200: Sikeres művelet

### 14. /user/createWithList (POST)
- **Leírás**: Felhasználók listájának létrehozása.
- **Példa kérés**:
```json
[
  {
    "username": "user1",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "12345",
    "phone": "1234567890",
    "userStatus": 1
  },
  {
    "username": "user2",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com",
    "password": "54321",
    "phone": "0987654321",
    "userStatus": 1
  }
]
```
- **Példa válasz**:
```json
[
  {
    "id": 10,
    "username": "user1",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "12345",
    "phone": "1234567890",
    "userStatus": 1
  },
  {
    "id": 11,
    "username": "user2",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com",
    "password": "54321",
    "phone": "0987654321",
    "userStatus": 1
  }
]
```
- **HTTP státuszok**:
  - 200: Sikeres művelet

### 15. /user/login (GET)
- **Leírás**: Felhasználó bejelentkezése a rendszerbe.
- **Példa kérés**: `/user/login?username=user1&password=12345`
- **Példa válasz**:
```json
"logged in"
```
- **HTTP státuszok**:
  - 200: Sikeres művelet
  - 400: Érvénytelen felhasználónév/jelszó

### 16. /user/logout (GET)
- **Leírás**: Jelenlegi felhasználói munkamenet kijelentkezése.
- **Példa kérés**: `/user/logout`
- **Példa válasz**:
```json
"logged out"
```
- **HTTP státuszok**:
  - 200: Sikeres művelet

### 17. /user/{username} (GET)
- **Leírás**: Felhasználó lekérdezése felhasználónév alapján.
- **Példa kérés**: `/user/user1`
- **Példa válasz**:
```json
{
  "id": 10,
  "username": "user1",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "12345",
  "phone": "1234567890",
  "userStatus": 1
}
```
- **HTTP státuszok**:
  - 200: Sikeres művelet
  - 400: Érvénytelen felhasználónév
  - 404: Felhasználó nem található

### 18. /user/{username} (PUT)
- **Leírás**: Felhasználó frissítése.
- **Példa kérés**: `/user/user1`
- **Példa válasz**:
```json
"User updated"
```
- **HTTP státuszok**:
  - 200: Sikeres művelet
  - 400: Érvénytelen kérés
  - 404: Felhasználó nem található

### 19. /user/{username} (DELETE)
- **Leírás**: Felhasználó törlése.
- **Példa kérés**: `/user/user1`
- **Példa válasz**:
```json
"User deleted"
```
- **HTTP státuszok**:
  - 200: Felhasználó törölve
  - 400: Érvénytelen felhasználónév
  - 404: Felhasználó nem található
