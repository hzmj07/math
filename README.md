# Math Visual Tool 📐

Temel matematik işlemlerini görsel olarak keşfeden sade ve modern bir web uygulaması.

## Özellikler

| Modül | Açıklama |
|---|---|
| EBOB / EKOK | Öklid algoritması adım adım, bar grafik görseli |
| Daire | Alan & çevre hesabı, Canvas ile çizim |
| Üçgen | Alan hesabı (½ × b × h), Canvas ile çizim |
| Fonksiyonlar | f(x) = ax + b grafiği, koordinat sistemi |
| Mutlak Değer | Sayı doğrusu üzerinde mesafe görselleştirme |

## Teknolojiler

- **HTML5** — Semantik yapı, ARIA rolleri
- **CSS3** — Dark mode, CSS değişkenleri, animasyonlar
- **JavaScript (Vanilla)** — Hesaplama mantığı, DOM işlemleri
- **Canvas API** — Dinamik geometri çizimleri
- **Lucide Icons** — Modern ve temiz ikon seti

## Nasıl Çalıştırılır

1. Projeyi klonla / indir
2. `index.html` dosyasını herhangi bir tarayıcıda aç
3. Sunucu gerekmez — tamamen istemci taraflıdır

```bash
# ya da Python ile basit sunucu başlat
python3 -m http.server 8080
# → http://localhost:8080
```

## Dosya Yapısı

```
math-project/
├── index.html   ← Ana sayfa ve sekme yapısı
├── style.css    ← Dark tema, CSS değişkenleri
├── app.js       ← Hesaplama ve Canvas çizim mantığı
└── README.md    ← Bu dosya
```

## Formüller

| İşlem | Formül |
|---|---|
| EBOB | `GCD(a, b) = GCD(b, a mod b)` |
| EKOK | `LCM(a, b) = \|a × b\| / GCD(a, b)` |
| Daire Alanı | `A = π × r²` |
| Daire Çevresi | `C = 2 × π × r` |
| Üçgen Alanı | `A = ½ × b × h` |

## Lisans

Kullanıma açık bir açık kaynak projedir. İstediğin gibi kullanabilir, değiştirebilirsin. 