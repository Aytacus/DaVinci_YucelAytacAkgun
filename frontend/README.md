# DaVinci Frontend



## Proje Hakkında

Kullanıcı ve gönderi yönetimi için geliştirilmiş web arayüzü. Kullanıcılar üzerinde CRUD işlemleri yapmanıza ve gönderileri yönetmenize olanak sağlar.

### Özellikler

- Kullanıcı yönetimi (ekleme, düzenleme, silme, listeleme)
- Gönderi yönetimi (ekleme, düzenleme, silme, listeleme)
- Responsive tasarım
- React Router ile sayfa yönlendirme

### Teknoloji Stack

- React 19.1.1
- TypeScript
- React Router DOM 7.8.2
- Vite 7.1.2

## Kurulum ve Çalıştırma

### Gereksinimler

- Node.js (v16 veya üzeri)
- npm

### Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Backend'in çalıştığından emin ol (http://localhost:3001)
cd ../backend
npm install
npm run start:dev

# Frontend'i çalıştır
cd ../frontend
npm run dev
```

Uygulama `http://localhost:5173` adresinde açılır.

## Proje Yapısı

```
src/
├── pages/
│   ├── Homepage.tsx              # Ana sayfa
│   └── UsersAndPostsPage.tsx     # Kullanıcı ve gönderi yönetimi
├── App.tsx                       # Ana component ve routing
├── main.tsx                      # Entry point
└── index.css                     # Stiller
```

## Kullanım

### Ana Sayfa
- `/` veya `/homepage` - Proje bilgileri

### Kullanıcı ve Gönderi Yönetimi
- `/users-posts` - Ana yönetim sayfası

#### Kullanıcı İşlemleri:
1. "Add User" ile yeni kullanıcı ekle
2. Kullanıcı kartındaki düzenleme butonuyla güncelle
3. Silme butonuyla kullanıcıyı sil
4. Kullanıcıya tıklayarak gönderilerini görüntüle

#### Gönderi İşlemleri:
1. Kullanıcı seçtikten sonra "Add Post" ile gönderi ekle
2. Düzenleme butonuyla gönderiyi güncelle
3. Silme butonuyla gönderiyi sil

## Available Scripts

```bash
npm run dev        # Development server
npm run build      # Production build
npm run lint       # Code linting
npm run preview    # Preview production build
```

## API Endpoints

Frontend aşağıdaki backend endpoint'lerini kullanır:

### Users API
- `GET /users` - Tüm kullanıcıları getir
- `POST /users` - Yeni kullanıcı oluştur
- `PUT /users/:id` - Kullanıcı güncelle
- `DELETE /users/:id` - Kullanıcı sil

### Posts API
- `GET /posts` - Tüm gönderileri getir
- `POST /posts` - Yeni gönderi oluştur
- `PUT /posts/:id` - Gönderi güncelle
- `DELETE /posts/:id` - Gönderi sil

## Troubleshooting

### Backend Bağlantı Problemi
- Backend'in `http://localhost:3001` adresinde çalıştığından emin olun
- Browser console'da hataları kontrol edin

### Port Çakışması
- Vite otomatik olarak başka bir port seçecektir
- Terminal çıktısında doğru URL'yi kontrol edin

## Notlar

- Frontend, backend API'sine tam olarak bağımlıdır
- Backend port: 3001, Frontend port: 5173
- Kullanıcı silindiğinde o kullanıcıya ait gönderiler otomatik silinir