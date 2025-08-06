# Swagger Petstore API

## API Célja
Ez az API a Swagger Petstore mintapéldánya, amely lehetővé teszi a felhasználók számára, hogy háziállatokat kezeljenek, rendeléseket helyezzenek el, és felhasználói fiókokat kezeljenek.

## Végpontok Leírása

### /pet (POST)
- **Leírás**: Új háziállat hozzáadása a boltba.
- **Példa kérés**:
```json
{
  "name": "doggie",
  "photoUrls": ["url1", "url2"]
}
```
- **Példa válasz**:
```json
{
  "id": 10,
  "name": "doggie",
  "photoUrls": ["url1", "url2"]
}
```
- **HTTP státuszok**:
  - 200: Sikeres művelet
  - 400: Hibás bemenet
  - 422: Érvénytelen bemenet

### /pet (PUT)
- **Leírás**: Meglévő háziállat frissítése az ID alapján.
- **Példa kérés**:
```json
{
  "id": 10,
  "name": "doggie",
  "photoUrls": ["url1", "url2"]
}
```
- **Példa válasz**:
```json
{
  "id": 10,
  "name": "doggie",
  "photoUrls": ["url1", "url2"]
}
```
- **HTTP státuszok**:
  - 200: Sikeres művelet
  - 400: Hibás ID
  - 404: Háziállat nem található
  - 422: Validációs hiba

### /pet/findByStatus (GET)
- **Leírás**: Háziállatok keresése státusz alapján.
- **Példa kérés**: `/pet/findByStatus?status=available`
- **Példa válasz**:
```json
[
  {
    "id": 10,
    "name": "doggie"
  }
]
```
- **HTTP státuszok**:
  - 200: Sikeres művelet
  - 400: Érvénytelen státusz érték

### /pet/findByTags (GET)
- **Leírás**: Háziállatok keresése címkék alapján.
- **Példa kérés**: `/pet/findByTags?tags=tag1,tag2`
- **Példa válasz**:
```json
[
  {
    "id": 10,
    "name": "doggie"
  }
]
```
- **HTTP státuszok**:
  - 200: Sikeres művelet
  - 400: Érvénytelen címke érték

### /pet/{petId} (GET)
- **Leírás**: Háziállat keresése ID alapján.
- **Példa kérés**: `/pet/10`
- **Példa válasz**:
```json
{
  "id": 10,
  "name": "doggie"
}
```
- **HTTP státuszok**:
  - 200: Sikeres művelet
  - 400: Hibás ID
  - 404: Háziállat nem található

### /pet/{petId} (DELETE)
- **Leírás**: Háziállat törlése.
- **Példa kérés**: `/pet/10`
- **Példa válasz**:
```json
{
  "message": "Pet deleted successfully"
}
```
- **HTTP státuszok**:
  - 200: Háziállat törölve
  - 400: Hibás háziállat érték

### /store/inventory (GET)
- **Leírás**: Háziállatok készletének visszaadása státusz szerint.
- **Példa kérés**: `/store/inventory`
- **Példa válasz**:
```json
{
  "available": 10,
  "pending": 5
}
```
- **HTTP státuszok**:
  - 200: Sikeres művelet

### /store/order (POST)
- **Leírás**: Rendelés elhelyezése egy háziállatra.
- **Példa kérés**:
```json
{
  "petId": 198772,
  "quantity": 7
}
```
- **Példa válasz**:
```json
{
  "id": 10,
  "petId": 198772,
  "quantity": 7
}
```
- **HTTP státuszok**:
  - 200: Sikeres művelet
  - 400: Hibás bemenet

### /store/order/{orderId} (GET)
- **Leírás**: Rendelés keresése ID alapján.
- **Példa kérés**: `/store/order/10`
- **Példa válasz**:
```json
{
  "id": 10,
  "petId": 198772,
  "quantity": 7
}
```
- **HTTP státuszok**:
  - 200: Sikeres művelet
  - 404: Rendelés nem található

### /user (POST)
- **Leírás**: Felhasználó létrehozása.
- **Példa kérés**:
```json
{
  "username": "theUser",
  "password": "12345",
  "email": "john@email.com"
}
```
- **Példa válasz**:
```json
{
  "id": 10,
  "username": "theUser"
}
```
- **HTTP státuszok**:
  - 200: Sikeres művelet

### /user/login (GET)
- **Leírás**: Felhasználó bejelentkezése.
- **Példa kérés**: `/user/login?username=theUser&password=12345`
- **Példa válasz**:
```json
"logged in successfully"
```
- **HTTP státuszok**:
  - 200: Sikeres művelet
  - 400: Hibás felhasználónév/jelszó

### /user/{username} (GET)
- **Leírás**: Felhasználó keresése felhasználónév alapján.
- **Példa kérés**: `/user/theUser`
- **Példa válasz**:
```json
{
  "id": 10,
  "username": "theUser"
}
```
- **HTTP státuszok**:
  - 200: Sikeres művelet
  - 404: Felhasználó nem található

### /user/{username} (DELETE)
- **Leírás**: Felhasználó törlése.
- **Példa kérés**: `/user/theUser`
- **Példa válasz**:
```json
{
  "message": "User deleted successfully"
}
```
- **HTTP státuszok**:
  - 200: Felhasználó törölve
  - 404: Felhasználó nem található
