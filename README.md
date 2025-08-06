# Swagger Petstore API

## API Célja
Ez az API lehetővé teszi a felhasználók számára, hogy háziállatokat kezeljenek, beleértve az állatok hozzáadását, frissítését, törlését, és az állatok státuszának lekérdezését.

## Végpontok Leírása

### 1. `/pet` (POST)
#### Leírás
Új háziállat hozzáadása a boltba.
#### Példa kérés
```json
{
    "name": "doggie",
    "category": {
        "id": 1,
        "name": "Dogs"
    },
    "photoUrls": ["http://example.com/photo.jpg"],
    "tags": [{"id": 1, "name": "tag1"}],
    "status": "available"
}
```
#### Példa válasz
```json
{
    "id": 10,
    "name": "doggie",
    "category": {
        "id": 1,
        "name": "Dogs"
    },
    "photoUrls": ["http://example.com/photo.jpg"],
    "tags": [{"id": 1, "name": "tag1"}],
    "status": "available"
}
```
#### Paraméterek
Nincs.
#### HTTP státuszok
- `200`: Sikeres művelet
- `400`: Érvénytelen bemenet

### 2. `/pet` (PUT)
#### Leírás
Meglévő háziállat frissítése.
#### Példa kérés
```json
{
    "id": 10,
    "name": "doggie",
    "category": {
        "id": 1,
        "name": "Dogs"
    },
    "photoUrls": ["http://example.com/photo.jpg"],
    "tags": [{"id": 1, "name": "tag1"}],
    "status": "available"
}
```
#### Példa válasz
```json
{
    "id": 10,
    "name": "doggie",
    "category": {
        "id": 1,
        "name": "Dogs"
    },
    "photoUrls": ["http://example.com/photo.jpg"],
    "tags": [{"id": 1, "name": "tag1"}],
    "status": "available"
}
```
#### Paraméterek
Nincs.
#### HTTP státuszok
- `200`: Sikeres művelet
- `400`: Érvénytelen ID
- `404`: Háziállat nem található

### 3. `/pet/findByStatus` (GET)
#### Leírás
Háziállatok keresése státusz alapján.
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
        "category": {
            "id": 1,
            "name": "Dogs"
        },
        "photoUrls": ["http://example.com/photo.jpg"],
        "tags": [{"id": 1, "name": "tag1"}],
        "status": "available"
    }
]
```
#### Paraméterek
- `status`: A keresett státusz.
#### HTTP státuszok
- `200`: Sikeres művelet
- `400`: Érvénytelen státusz

### 4. `/pet/findByTags` (GET)
#### Leírás
Háziállatok keresése címkék alapján.
#### Példa kérés
```
GET /pet/findByTags?tags=tag1,tag2
```
#### Példa válasz
```json
[
    {
        "id": 10,
        "name": "doggie",
        "category": {
            "id": 1,
            "name": "Dogs"
        },
        "photoUrls": ["http://example.com/photo.jpg"],
        "tags": [{"id": 1, "name": "tag1"}],
        "status": "available"
    }
]
```
#### Paraméterek
- `tags`: A keresett címkék.
#### HTTP státuszok
- `200`: Sikeres művelet
- `400`: Érvénytelen címke

### 5. `/pet/{petId}` (GET)
#### Leírás
Háziállat keresése az ID alapján.
#### Példa kérés
```
GET /pet/10
```
#### Példa válasz
```json
{
    "id": 10,
    "name": "doggie",
    "category": {
        "id": 1,
        "name": "Dogs"
    },
    "photoUrls": ["http://example.com/photo.jpg"],
    "tags": [{"id": 1, "name": "tag1"}],
    "status": "available"
}
```
#### Paraméterek
- `petId`: A keresett háziállat ID-ja.
#### HTTP státuszok
- `200`: Sikeres művelet
- `400`: Érvénytelen ID
- `404`: Háziállat nem található

### 6. `/pet/{petId}` (DELETE)
#### Leírás
Háziállat törlése az ID alapján.
#### Példa kérés
```
DELETE /pet/10
```
#### Példa válasz
```json
{
    "message": "Pet deleted"
}
```
#### Paraméterek
- `petId`: A törlendő háziállat ID-ja.
#### HTTP státuszok
- `200`: Háziállat törölve
- `400`: Érvénytelen háziállat érték

### 7. `/pet/{petId}/uploadImage` (POST)
#### Leírás
Kép feltöltése a háziállathoz.
#### Példa kérés
```
POST /pet/10/uploadImage
```
#### Példa válasz
```json
{
    "code": 200,
    "type": "string",
    "message": "Image uploaded"
}
```
#### Paraméterek
- `petId`: A háziállat ID-ja.
- `additionalMetadata`: További metaadatok (opcionális).
#### HTTP státuszok
- `200`: Sikeres művelet
- `400`: Nincs fájl feltöltve
- `404`: Háziállat nem található

### 8. `/store/inventory` (GET)
#### Leírás
A boltban található háziállatok készletének lekérdezése.
#### Példa kérés
```
GET /store/inventory
```
#### Példa válasz
```json
{
    "available": 5,
    "pending": 2,
    "sold": 1
}
```
#### Paraméterek
Nincs.
#### HTTP státuszok
- `200`: Sikeres művelet

### 9. `/store/order` (POST)
#### Leírás
Megrendelés leadása egy háziállatra.
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
Nincs.
#### HTTP státuszok
- `200`: Sikeres művelet
- `400`: Érvénytelen bemenet

### 10. `/store/order/{orderId}` (GET)
#### Leírás
Megrendelés keresése az ID alapján.
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
- `orderId`: A keresett megrendelés ID-ja.
#### HTTP státuszok
- `200`: Sikeres művelet
- `400`: Érvénytelen ID
- `404`: Megrendelés nem található

### 11. `/store/order/{orderId}` (DELETE)
#### Leírás
Megrendelés törlése az ID alapján.
#### Példa kérés
```
DELETE /store/order/10
```
#### Példa válasz
```json
{
    "message": "Order deleted"
}
```
#### Paraméterek
- `orderId`: A törlendő megrendelés ID-ja.
#### HTTP státuszok
- `200`: Megrendelés törölve
- `400`: Érvénytelen ID
- `404`: Megrendelés nem található

### 12. `/user` (POST)
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
Nincs.
#### HTTP státuszok
- `200`: Sikeres művelet

### 13. `/user/createWithList` (POST)
#### Leírás
Felhasználók listájának létrehozása.
#### Példa kérés
```json
[
    {
        "username": "theUser",
        "firstName": "John",
        "lastName": "James",
        "email": "john@email.com",
        "password": "12345",
        "phone": "12345"
    }
]
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
Nincs.
#### HTTP státuszok
- `200`: Sikeres művelet

### 14. `/user/login` (GET)
#### Leírás
Felhasználó bejelentkezése a rendszerbe.
#### Példa kérés
```
GET /user/login?username=theUser&password=12345
```
#### Példa válasz
```json
"logged in"
```
#### Paraméterek
- `username`: Bejelentkezési név.
- `password`: Jelszó.
#### HTTP státuszok
- `200`: Sikeres bejelentkezés
- `400`: Érvénytelen felhasználónév/jelszó

### 15. `/user/logout` (GET)
#### Leírás
Felhasználó kijelentkezése a rendszerből.
#### Példa kérés
```
GET /user/logout
```
#### Példa válasz
```json
"logged out"
```
#### Paraméterek
Nincs.
#### HTTP státuszok
- `200`: Sikeres kijelentkezés

### 16. `/user/{username}` (GET)
#### Leírás
Felhasználó adatainak lekérdezése a felhasználónév alapján.
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
- `username`: A keresett felhasználó neve.
#### HTTP státuszok
- `200`: Sikeres művelet
- `400`: Érvénytelen felhasználónév
- `404`: Felhasználó nem található

### 17. `/user/{username}` (PUT)
#### Leírás
Felhasználó adatainak frissítése a felhasználónév alapján.
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
"User updated"
```
#### Paraméterek
- `username`: A frissítendő felhasználó neve.
#### HTTP státuszok
- `200`: Sikeres művelet
- `400`: Hibás kérés
- `404`: Felhasználó nem található

### 18. `/user/{username}` (DELETE)
#### Leírás
Felhasználó törlése a felhasználónév alapján.
#### Példa kérés
```
DELETE /user/theUser
```
#### Példa válasz
```json
"User deleted"
```
#### Paraméterek
- `username`: A törlendő felhasználó neve.
#### HTTP státuszok
- `200`: Felhasználó törölve
- `400`: Érvénytelen felhasználónév
- `404`: Felhasználó nem található
