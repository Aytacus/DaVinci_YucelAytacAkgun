# DaVinci Full-Stack Application

**Geliştirici**: Yücel Aytaç Akgün  
**Teknoloji**: React + NestJS + TypeScript

## Proje Hakkında

Modern web teknolojileri kullanılarak geliştirilmiş full-stack kullanıcı ve gönderi yönetim sistemi.

### Ana Özellikler

- Full-Stack Architecture: React frontend + NestJS backend
- TypeScript ile tip güvenliği
- RESTful API
- Responsive UI
- Event-driven architecture

## Sistem Mimarisi

```
DaVinci_YucelAytacAkgun/
├── frontend/           # React + TypeScript + Vite
├── backend/            # NestJS + TypeScript
└── README.md
```

## Hızlı Başlangıç

### Gereksinimler

- Node.js (v16 veya üzeri)
- npm

### Kurulum

```bash
# Projeyi clone et
git clone <repository-url>
cd DaVinci_YucelAytacAkgun
```

### Backend'i Çalıştır

```bash
cd backend
npm install
npm run start:dev
```

Backend `http://localhost:3001` adresinde çalışır.

### Frontend'i Çalıştır

```bash
cd frontend
npm install
npm run dev
```

Frontend `http://localhost:5173` adresinde çalışır.

## Detaylı Dokümantasyon

- [Frontend README](./frontend/README.md) - React uygulaması
- [Backend README](./backend/README.md) - NestJS API

## Teknoloji Stack

### Frontend
- React 19.1.1
- TypeScript
- React Router DOM 7.8.2
- Vite 7.1.2

### Backend
- NestJS 11.0.1
- TypeScript 5.7.3
- RxJS 7.8.1
- Jest 30.0.0

## API Endpoints

### Users
- `GET /users` - Kullanıcıları listele
- `POST /users` - Yeni kullanıcı oluştur
- `PUT /users/:id` - Kullanıcı güncelle
- `DELETE /users/:id` - Kullanıcı sil

### Posts
- `GET /posts` - Gönderileri listele
- `POST /posts` - Yeni gönderi oluştur
- `PUT /posts/:id` - Gönderi güncelle
- `DELETE /posts/:id` - Gönderi sil

## Testing

### Backend
```bash
cd backend
npm run test          # Unit tests
npm run test:e2e      # End-to-end tests
```

### Frontend
```bash
cd frontend
npm run lint          # ESLint check
```

## Development Workflow

```bash
# Backend terminal
cd backend && npm run start:dev

# Frontend terminal  
cd frontend && npm run dev
```

## Troubleshooting

### Yaygın Sorunlar

1. **Backend bağlantı hatası**
   - Backend'in port 3001'de çalıştığından emin olun

2. **Frontend çalışmıyor**
   - `rm -rf node_modules && npm install`

3. **Port çakışması**
   - Vite otomatik olarak başka port kullanır

## Notlar

- Backend port: 3001
- Frontend port: 5173
- Veriler JSON dosyalarında saklanır
- Kullanıcı silindiğinde gönderileri de silinir