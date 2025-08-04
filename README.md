# API Célja
Ez az API a Swagger Petstore szolgáltatását biztosítja, amely lehetővé teszi a felhasználók számára, hogy kisállatokat adjanak hozzá, frissítsenek, töröljenek és keressenek az állatok között. Az API különböző funkciókat kínál a felhasználók kezelésére is.

# Végpontok Leírása

## /pet
### POST
**Leírás:** Új kisállat hozzáadása a boltba.
**Példa kérés:**
```json
{
  "name": "doggie",
  "photoUrls": ["http://example.com/photo.jpg"],
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
**Példa válasz:**
```json
{
  "id": 10,
  "name": "doggie",
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "photoUrls": ["http://example.com/photo.jpg"],
  "tags": [
    {
      "id": 1,
      "name": "tag1"
    }
  ],
  "status": "available"
}
```
**HTTP státuszok:**
- 200: Sikeres művelet
- 400: Érvénytelen bemenet
- 422: Validációs kivétel

### PUT
**Leírás:** Meglévő kisállat frissítése.
**Példa kérés:**
```json
{
  "id": 10,
  "name": "doggie",
  "photoUrls": ["http://example.com/photo_updated.jpg"],
  "status": "sold"
}
```
**Példa válasz:**
```json
{
  "id": 10,
  "name": "doggie",
  "photoUrls": ["http://example.com/photo_updated.jpg"],
  "status": "sold"
}
```
**HTTP státuszok:**
- 200: Sikeres művelet
- 400: Érvénytelen ID
- 404: Kisállat nem található
- 422: Validációs kivétel

## /pet/findByStatus
### GET
**Leírás:** Kisállatok keresése státusz alapján.
**Példa kérés:**
```
GET /pet/findByStatus?status=available
```
**Példa válasz:**
```json
[
  {
    "id": 10,
    "name": "doggie",
    "status": "available"
  }
]
```
**HTTP státuszok:**
- 200: Sikeres művelet
- 400: Érvénytelen státusz érték

## /pet/{petId}
### GET
**Leírás:** Kisállat keresése ID alapján.
**Példa kérés:**
```
GET /pet/10
```
**Példa válasz:**
```json
{
  "id": 10,
  "name": "doggie"
}
```
**HTTP státuszok:**
- 200: Sikeres művelet
- 400: Érvénytelen ID
- 404: Kisállat nem található

### DELETE
**Leírás:** Kisállat törlése.
**Példa kérés:**
```
DELETE /pet/10
```
**Példa válasz:**
```json
{
  "message": "Pet deleted"
}
```
**HTTP státuszok:**
- 200: Kisállat törölve
- 400: Érvénytelen kisállat érték

## /store/order
### POST
**Leírás:** Megrendelés leadása egy kisállatra.
**Példa kérés:**
```json
{
  "petId": 198772,
  "quantity": 7,
  "status": "placed"
}
```
**Példa válasz:**
```json
{
  "id": 10,
  "petId": 198772,
  "quantity": 7,
  "status": "placed"
}
```
**HTTP státuszok:**
- 200: Sikeres művelet
- 400: Érvénytelen bemenet

## /user
### POST
**Leírás:** Felhasználó létrehozása.
**Példa kérés:**
```json
{
  "username": "theUser",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "12345"
}
```
**Példa válasz:**
```json
{
  "id": 10,
  "username": "theUser"
}
```
**HTTP státuszok:**
- 200: Sikeres művelet

## /user/login
### GET
**Leírás:** Felhasználó bejelentkezése.
**Példa kérés:**
```
GET /user/login?username=theUser&password=12345
```
**Példa válasz:**
```json
"logged in"
```
**HTTP státuszok:**
- 200: Sikeres művelet
- 400: Érvénytelen felhasználónév/jelszó

## /user/logout
### GET
**Leírás:** Felhasználó kijelentkezése.
**Példa kérés:**
```
GET /user/logout
```
**Példa válasz:**
```json
"logged out"
```
**HTTP státuszok:**
- 200: Sikeres művelet
