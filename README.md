# API Célja
Ez az API a Swagger Petstore szolgáltatásait biztosítja, lehetővé téve a felhasználók számára, hogy állatokat keressenek és új állatokat adjanak hozzá az áruházhoz.

## Végpontok Leírása

### 1. Végpont: `/pet/findByStatus`
**HTTP Metódus**: GET  
**Leírás**: Az állatok keresése státusz alapján. Több státusz érték is megadható vesszővel elválasztva.

**Példa kérés**:
```http
GET /pet/findByStatus?status=available,pending
```

**Példa válasz**:
```json
[
    {
        "id": 1,
        "category": {
            "id": 1,
            "name": "cat"
        },
        "name": "fluffy",
        "photoUrls": [
            "http://example.com/path/to/cat/1.jpg",
            "http://example.com/path/to/cat/2.jpg"
        ],
        "tags": [
            {
                "id": 1,
                "name": "cat"
            }
        ],
        "status": "available"
    },
    {
        "id": 2,
        "category": {
            "id": 2,
            "name": "dog"
        },
        "name": "puppy",
        "photoUrls": [
            "http://example.com/path/to/dog/1.jpg"
        ],
        "tags": [
            {
                "id": 2,
                "name": "dog"
            }
        ],
        "status": "available"
    }
]
```

**Paraméterek**:
- `status`: A szűrni kívánt státusz értékek (pl. `available`, `pending`, `sold`).

**HTTP Státuszok**:
- `200`: Sikeres művelet, az állatok listája.
- `400`: Érvénytelen státusz érték.

### 2. Végpont: `/pet`
**HTTP Metódus**: POST  
**Leírás**: Új állat hozzáadása az áruházhoz.

**Példa kérés**:
```http
POST /pet
Content-Type: application/json

{
    "name": "doggie",
    "photoUrls": ["http://example.com/path/to/dog/1.jpg"],
    "category": {
        "id": 2,
        "name": "dog"
    },
    "tags": [{"id": 2, "name": "dog"}],
    "status": "available"
}
```

**Példa válasz**:
```json
{
    "id": 3,
    "category": {
        "id": 2,
        "name": "dog"
    },
    "name": "doggie",
    "photoUrls": ["http://example.com/path/to/dog/1.jpg"],
    "tags": [{"id": 2, "name": "dog"}],
    "status": "available"
}
```

**Paraméterek**:
- `pet`: Az állat objektum, amely tartalmazza a szükséges adatokat (pl. `name`, `photoUrls`, `category`, `tags`, `status`).

**HTTP Státuszok**:
- `200`: Sikeres művelet, az új állat adatai.
- `405`: Érvénytelen bemenet.