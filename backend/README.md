# DaVinci Backend API


## Proje Hakkında

Kullanıcı ve gönderi yönetimi için tasarlanmış RESTful web servisi. NestJS framework'ü ve TypeScript kullanılarak geliştirilmiştir.

### Özellikler

- RESTful API ile CRUD operasyonları
- TypeScript ile tip güvenliği
- JSON dosyalarında veri saklama
- Event-driven architecture
- CORS desteği

### Teknoloji Stack

- NestJS 11.0.1
- TypeScript 5.7.3
- RxJS 7.8.1
- Jest 30.0.0

## Kurulum ve Çalıştırma

### Gereksinimler

- Node.js (v16 veya üzeri)
- npm

### Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Development modunda çalıştır
npm run start:dev
```

API `http://localhost:3001` adresinde çalışır.

### Production

```bash
npm run build
npm run start:prod
```

## Proje Yapısı

```
src/
├── users/
│   ├── users.controller.ts      # Users HTTP endpoints
│   ├── users.service.ts         # Users business logic
│   ├── users.interface.ts       # User type definitions
│   └── users.module.ts          # Users module
├── posts/
│   ├── posts.controller.ts      # Posts HTTP endpoints
│   ├── posts.service.ts         # Posts business logic
│   ├── posts.interface.ts       # Post type definitions
│   └── posts.module.ts          # Posts module
├── app.module.ts                # Main app module
└── main.ts                      # Application entry point

data/                            # JSON veri dosyaları (otomatik oluşur)
├── users.json                   # Kullanıcı verileri
└── posts.json                   # Gönderi verileri
```

## API Endpoints

### Base URL
```
http://localhost:3001
```

### Users API

#### Tüm kullanıcıları getir
```http
GET /users
```

#### Tek kullanıcı getir
```http
GET /users/{id}
```

#### Yeni kullanıcı oluştur
```http
POST /users
Content-Type: application/json

{
  "name": "Jane Smith",
  "username": "janesmith",
  "email": "jane@example.com"
}
```

#### Kullanıcı güncelle
```http
PUT /users/{id}
Content-Type: application/json

{
  "name": "Jane Smith Updated",
  "email": "jane.updated@example.com"
}
```

#### Kullanıcı sil
```http
DELETE /users/{id}
```

### Posts API

#### Tüm gönderileri getir
```http
GET /posts
```

#### Tek gönderi getir
```http
GET /posts/{id}
```

#### Yeni gönderi oluştur
```http
POST /posts
Content-Type: application/json

{
  "userId": 1640995200000,
  "title": "New Post Title",
  "body": "Post content here..."
}
```

#### Gönderi güncelle
```http
PUT /posts/{id}
Content-Type: application/json

{
  "title": "Updated Post Title",
  "body": "Updated content..."
}
```

#### Gönderi sil
```http
DELETE /posts/{id}
```

## Testing

```bash
npm run test          # Unit tests
npm run test:cov      # Coverage report
npm run test:e2e      # End-to-end tests
npm run test:watch    # Watch mode
```

## Available Scripts

```bash
# Development
npm run start:dev      # Development mode with watch
npm run start:debug    # Debug mode

# Production
npm run build          # Build the application
npm run start:prod     # Production mode

# Code Quality
npm run lint          # ESLint check and fix
npm run format        # Prettier formatting

# Testing
npm run test          # Run unit tests
npm run test:e2e      # End-to-end tests
```

## Veri Modelleri

### User Object
```typescript
interface User {
  id: number;        // Timestamp-based unique ID
  name: string;      // Full name
  username: string;  // Unique username
  email: string;     // Email address
}
```

### Post Object
```typescript
interface Post {
  id: number;        // Timestamp-based unique ID
  userId: number;    // Foreign key to User
  title: string;     // Post title
  body?: string;     // Optional post content
}
```

## Event System

Kullanıcı silindiğinde `user.deleted` eventi yayınlanır ve Posts service bu eventi dinleyerek ilgili gönderileri otomatik siler.

## Error Handling

- `200 OK` - Başarılı işlemler
- `201 Created` - Yeni kaynak oluşturuldu
- `400 Bad Request` - Geçersiz istek
- `404 Not Found` - Kaynak bulunamadı
- `500 Internal Server Error` - Sunucu hatası

## Configuration

### CORS
Frontend `http://localhost:5173` adresinden gelen isteklere izin verilir.

### Port
Uygulama varsayılan olarak `3001` portunda çalışır.

## Troubleshooting

### Port zaten kullanılıyor
```bash
lsof -ti:3001 | xargs kill -9
```

### Veri dosyası bozuldu
```bash
rm -rf data/  # Otomatik yeniden oluşturulacak
```

## Notlar

- Veriler `data/` klasöründe JSON dosyaları olarak saklanır
- Kullanıcı silindiğinde o kullanıcıya ait gönderiler otomatik silinir
- Memory-based veri erişimi ile hızlı performans