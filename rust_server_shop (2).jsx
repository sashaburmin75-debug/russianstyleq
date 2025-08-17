<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rust Server Shop</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
  <style>
    body, html {
      margin: 0;
      padding: 0;
      overflow-x: hidden;
      color: white;
    }
    .card {
      background: rgba(17, 24, 39, 0.8);
      border: 1px solid #1f2937;
      border-radius: 1rem;
      padding: 1.5rem;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .card:hover {
      transform: scale(1.05);
      box-shadow: 0 0 25px rgba(255, 69, 0, 0.7);
    }
  </style>
</head>
<body class="relative min-h-screen bg-black">
  <video class="absolute inset-0 w-full h-full object-cover" autoplay loop muted playsinline>
    <source src="/rust-bg.webm" type="video/webm">
  </video>
  <div class="absolute inset-0 bg-black bg-opacity-70"></div>

  <header class="relative z-10 text-left p-6">
    <h1 class="text-5xl font-extrabold tracking-widest">РУССКИЙ СТИЛЬ</h1>
    <p class="text-gray-400 mt-2 max-w-2xl">
      «Русский Стиль» — это не просто донат-магазин, а часть настоящей атмосферы Rust. Наш сервер создан для тех, кто ценит суровое выживание, честные правила и живое общение.
    </p>
    <nav class="flex gap-6 mt-6">
      <button class="text-white hover:text-red-500">Магазин</button>
      <button class="text-white hover:text-red-500">Корзина</button>
      <button class="text-white hover:text-red-500">О сервере</button>
      <button class="text-white hover:text-red-500">Контакты</button>
    </nav>
  </header>

  <main class="relative z-10 p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
    <div class="card">
      <img src="/stickers/vip7.gif" class="w-24 h-24 mx-auto mb-4 rounded-xl">
      <h2 class="text-xl font-semibold mb-2">VIP 7 дней</h2>
      <p class="text-gray-400 mb-4">Привилегии на неделю</p>
      <p class="text-lg font-bold mb-4">149 ₽</p>
      <button class="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg">В корзину</button>
    </div>

    <div class="card">
      <img src="/stickers/raider.gif" class="w-24 h-24 mx-auto mb-4 rounded-xl">
      <h2 class="text-xl font-semibold mb-2">Набор Raider</h2>
      <p class="text-gray-400 mb-4">Стартовый донат-набор</p>
      <ul class="text-sm text-gray-300 mb-4 list-disc list-inside">
        <li>Калаш x1</li>
        <li>Патроны 5.56 x150</li>
        <li>Медицинские шприцы x10</li>
        <li>Дерево x2000</li>
      </ul>
      <p class="text-lg font-bold mb-4">249 ₽</p>
      <button class="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg">В корзину</button>
    </div>

    <div class="card">
      <img src="/stickers/warlord.gif" class="w-24 h-24 mx-auto mb-4 rounded-xl">
      <h2 class="text-xl font-semibold mb-2">Набор Warlord</h2>
      <p class="text-gray-400 mb-4">Максимальный набор</p>
      <ul class="text-sm text-gray-300 mb-4 list-disc list-inside">
        <li>Калаш x2</li>
        <li>Бронежилет x1</li>
        <li>Патроны 5.56 x300</li>
        <li>Сера x1000</li>
        <li>Металл x1000</li>
      </ul>
      <p class="text-lg font-bold mb-4">599 ₽</p>
      <button class="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg">В корзину</button>
    </div>
  </main>
</body>
</html>
