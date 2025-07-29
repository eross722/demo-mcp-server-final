# Felhasználói Kézikönyv a Swagger Petstore API-hoz

## API Célja
Ez az API lehetővé teszi a felhasználók számára, hogy háziállatokat kezeljenek, beleértve azok hozzáadását, frissítését, törlését és keresését különböző paraméterek alapján.

## Végpontok Leírása

### 1. Pet Végpontok
- **`POST /pet`**: Új háziállat hozzáadása a boltba.
- **`PUT /pet`**: Meglévő háziállat frissítése.
- **`GET /pet/findByStatus`**: Háziállatok keresése státusz alapján.
- **`GET /pet/findByTags`**: Háziállatok keresése címkék alapján.
- **`GET /pet/{petId}`**: Háziállat keresése ID alapján.
- **`DELETE /pet/{petId}`**: Háziállat törlése ID alapján.

### 2. Store Végpontok
- **`POST /store/order`**: Új rendelés leadása.
- **`GET /store/order/{orderId}`**: Rendelés keresése ID alapján.

### 3. User Végpontok
- **`POST /user`**: Felhasználó létrehozása.
- **`GET /user/login`**: Felhasználó bejelentkezése.

## Használati Esetek
- **Új háziállat hozzáadása**: A felhasználó a `/pet` végponton keresztül küldheti el a háziállat adatait JSON formátumban.
- **Háziállat frissítése**: A meglévő háziállat adatai frissíthetők a `/pet` végponton keresztül.
- **Háziállatok keresése státusz alapján**: A felhasználó a `/pet/findByStatus` végponton keresztül kereshet háziállatokat különböző státuszok szerint.

## Hibakezelés
A válaszok mindig tartalmaznak egy hibaüzenetet, ha a kérés nem sikerült. A hibák a következő formátumban érkeznek:
```json
{
  "code": "error_code",
  "message": "Error message"
}
```

## Jogosultságok
A legtöbb végpont OAuth2 alapú jogosultságokat igényel, mint például a `write:pets` és `read:pets`.

## Példa Kérések
- **Új háziállat hozzáadása**:
```bash
curl -X POST https://petstore3.swagger.io/api/v3/pet -H 'Content-Type: application/json' -d '{"name": "doggie", "photoUrls": ["http://example.com/photo.jpg"]}'
```
- **Háziállat keresése ID alapján**:
```bash
curl -X GET https://petstore3.swagger.io/api/v3/pet/10
```