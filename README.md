# Pet Store API Felhasználói Kézikönyv

## API Célja
Ez az API a Pet Store szolgáltatások kezelésére szolgál, lehetővé téve a felhasználók számára, hogy háziállatokat adjanak hozzá, frissítsenek, töröljenek, és lekérdezzék azokat különböző szűrők alapján.

## Végpontok Leírása

### 1. Végpont: `/pet` (POST)
#### Leírás
Új háziállat hozzáadása a boltba.
#### Példa kérés
```json
{
  "name": "Doggie",
  "photoUrls": ["http://example.com/photo.jpg"],
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "tags": [
    { "id": 1, "name": "tag1" }
  ],
  "status": "available"
}
```
#### Példa válasz
```json
{
  "id": 10,
  "name": "Doggie",
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "photoUrls": ["http://example.com/photo.jpg"],
  "tags": [
    { "id": 1, "name": "tag1" }
  ],
  "status": "available"
}
```
#### Paraméterek
- `pet`: A háziállat objektum, amelyet hozzá kíván adni.
#### HTTP státuszok
- `200`: Sikeres művelet
- `400`: Érvénytelen bemenet

### 2. Végpont: `/pet/{petId}` (PUT)
#### Leírás
Egy meglévő háziállat frissítése az azonosítója alapján.
#### Példa kérés
```json
{
  "name": "Updated Doggie",
  "photoUrls": ["http://example.com/updated_photo.jpg"]
}
```
#### Példa válasz
```json
{
  "id": 10,
  "name": "Updated Doggie",
  "photoUrls": ["http://example.com/updated_photo.jpg"]
}
```
#### Paraméterek
- `petId`: A frissítendő háziállat azonosítója.
- `pet`: A frissített háziállat objektum.
#### HTTP státuszok
- `200`: Sikeres művelet
- `404`: Háziállat nem található

### 3. Végpont: `/pet/findByStatus` (GET)
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
    "name": "Doggie",
    "status": "available"
  }
]
```
#### Paraméterek
- `status`: A keresett háziállatok státusza (pl. available, pending, sold).
#### HTTP státuszok
- `200`: Sikeres művelet
- `400`: Érvénytelen státusz érték

### 4. Végpont: `/pet/{petId}` (GET)
#### Leírás
Egy háziállat lekérdezése az azonosítója alapján.
#### Példa kérés
```
GET /pet/10
```
#### Példa válasz
```json
{
  "id": 10,
  "name": "Doggie",
  "status": "available"
}
```
#### Paraméterek
- `petId`: A lekérdezendő háziállat azonosítója.
#### HTTP státuszok
- `200`: Sikeres művelet
- `404`: Háziállat nem található

### 5. Végpont: `/pet/{petId}` (DELETE)
#### Leírás
Egy háziállat törlése az azonosítója alapján.
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
- `petId`: A törlendő háziállat azonosítója.
#### HTTP státuszok
- `200`: Háziállat törölve
- `404`: Háziállat nem található

## Záró megjegyzés
Ez az API lehetővé teszi a felhasználók számára, hogy hatékonyan kezeljék a háziállatokat a boltban, különböző műveletek végrehajtásával.