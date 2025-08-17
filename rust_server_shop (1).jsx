import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { SiSteam } from "react-icons/si";

const products = [
  { id: 1, name: "VIP 7 дней", price: 149, description: "Привилегии на неделю", category: "privileges", img: "/stickers/vip7.gif" },
  { id: 2, name: "VIP 30 дней", price: 399, description: "Привилегии на месяц", category: "privileges", img: "/stickers/vip30.gif" },
  {
    id: 3,
    name: "Набор Raider",
    price: 249,
    description: "Стартовый донат-набор",
    category: "packs",
    items: ["Калаш x1", "Патроны 5.56 x150", "Медицинские шприцы x10", "Дерево x2000"],
    img: "/stickers/raider.gif"
  },
  {
    id: 4,
    name: "Набор Warlord",
    price: 599,
    description: "Максимальный набор",
    category: "packs",
    items: ["Калаш x2", "Бронежилет x1", "Патроны 5.56 x300", "Сера x1000", "Металл x1000"],
    img: "/stickers/warlord.gif"
  },
  {
    id: 9,
    name: "Набор Builder",
    price: 349,
    description: "Для строителей и фермеров",
    category: "packs",
    items: ["Камень x5000", "Дерево x5000", "Металл x2000", "Сера x500"],
    img: "/stickers/builder.gif"
  },
  {
    id: 10,
    name: "Набор Sniper",
    price: 449,
    description: "Для охотников и рейдеров издалека",
    category: "packs",
    items: ["Снайперская винтовка x1", "Патроны 7.62 x100", "Медицинские наборы x5"],
    img: "/stickers/sniper.gif"
  },
  { id: 5, name: "Дерево x1000", price: 50, description: "Материалы для крафта", category: "materials", img: "/stickers/wood.gif" },
  { id: 6, name: "Камень x1000", price: 70, description: "Материалы для крафта", category: "materials", img: "/stickers/stone.gif" },
  { id: 7, name: "Сера x500", price: 120, description: "Редкий ресурс для взрывчатки", category: "materials", img: "/stickers/sulfur.gif" },
  { id: 8, name: "Металл x500", price: 100, description: "Металл для оружия и инструментов", category: "materials", img: "/stickers/metal.gif" },
];

export default function RustShop() {
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("shop");
  const [particles, setParticles] = useState([]);
  const [smoke, setSmoke] = useState([]);
  const [soundOn, setSoundOn] = useState(false);
  const [user, setUser] = useState(null);
  const [category, setCategory] = useState("privileges");
  const audioRef = useRef(null);
  const ambientRef = useRef(null);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handlePayment = () => {
    window.location.href = `https://www.donationalerts.com/r/rustserver?amount=${total}`;
  };

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 5,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const newSmoke = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + Math.random() * 200,
      size: Math.random() * 80 + 50,
      duration: Math.random() * 25 + 20,
    }));
    setSmoke(newSmoke);
  }, []);

  useEffect(() => {
    if (audioRef.current && ambientRef.current) {
      if (soundOn) {
        audioRef.current.play().catch(() => {});
        ambientRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
        ambientRef.current.pause();
      }
    }
  }, [soundOn]);

  return (
    <div className="relative min-h-screen text-white p-6 overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/rust-bg.webm" type="video/webm" />
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-70" />

      {smoke.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-gray-400 opacity-20 blur-2xl"
          style={{ width: s.size, height: s.size, left: s.x, top: s.y }}
          animate={{ y: [s.y, -200], opacity: [0.2, 0] }}
          transition={{ duration: s.duration, repeat: Infinity, ease: "easeOut" }}
        />
      ))}

      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-orange-400 opacity-70"
          style={{ width: p.size, height: p.size, left: p.x, top: p.y }}
          animate={{ y: [p.y, -50], opacity: [0.7, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
        />
      ))}

      <audio ref={audioRef} loop>
        <source src="https://www.fesliyanstudios.com/play-mp3/387" type="audio/mpeg" />
      </audio>
      <audio ref={ambientRef} loop>
        <source src="https://www.fesliyanstudios.com/play-mp3/4384" type="audio/mpeg" />
      </audio>

      <div className="fixed bottom-4 right-4 z-20 flex flex-col items-end gap-2">
        <Button
          className="bg-yellow-600 hover:bg-yellow-700 p-2 rounded-full"
          onClick={() => setSoundOn(!soundOn)}
        >
          {soundOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </Button>
      </div>

      <div className="fixed top-4 right-4 z-20">
        {!user ? (
          <Button
            className="bg-green-600 hover:bg-green-700 p-2 rounded-full flex items-center gap-2"
            onClick={() => (window.location.href = "/auth/steam")}
          >
            <SiSteam className="w-5 h-5" />
          </Button>
        ) : (
          <div className="flex items-center gap-2 bg-gray-800 bg-opacity-80 px-3 py-1 rounded-full">
            <p className="text-sm">👤 {user.name}</p>
          </div>
        )}
      </div>

      <div className="relative z-10">
        <header className="text-left mb-10">
          <motion.h1
            className="text-5xl font-extrabold tracking-widest"
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            whileHover={{ scale: 1.05, textShadow: "0px 0px 10px #ff4500" }}
         >
            РУССКИЙ СТИЛЬ
          </motion.h1>
          <motion.p
            className="text-gray-400 mt-2 max-w-2xl"
            initial={{ opacity: 0, x: -150 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            «Русский Стиль» — это не просто донат-магазин, а часть настоящей атмосферы Rust. Наш сервер создан для тех, кто ценит суровое выживание, честные правила и живое общение. Вас ждёт особая экономика, крафтовые наборы, события и эвенты, где каждый сможет проявить характер. Мы объединяем игроков в сильное и дружное комьюнити, где царит дух борьбы и уважения. Присоединяйся и почувствуй себя частью настоящего русского стиля выживания!
          </motion.p>
          <nav className="flex justify-center gap-6 mt-6">
            {[
              { key: "shop", label: "Магазин" },
              { key: "cart", label: `Корзина (${cart.length})` },
              { key: "about", label: "О сервере" },
              { key: "contacts", label: "Контакты" },
            ].map((item) => (
              <motion.div
                key={item.key}
                whileHover={{
                  scale: 1.1,
                  textShadow: "0px 0px 8px #ff4500, 0px 0px 16px #ff6347",
                  color: "#ff6347",
                }}
                transition={{ duration: 0.3 }}
              >
                <Button variant="ghost" onClick={() => setPage(item.key)}>
                  {item.label}
                </Button>
              </motion.div>
            ))}
          </nav>
        </header>

        {page === "shop" && (
          <>
            <div className="flex justify-center gap-4 mb-6">
              <Button variant={category === "privileges" ? "default" : "ghost"} onClick={() => setCategory("privileges")}>Привилегии</Button>
              <Button variant={category === "materials" ? "default" : "ghost"} onClick={() => setCategory("materials")}>Материалы</Button>
              <Button variant={category === "packs" ? "default" : "ghost"} onClick={() => setCategory("packs")}>Пакеты</Button>
            </div>

            <main className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {products.filter(p => p.category === category).map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: [
                      "0px 0px 15px 5px rgba(255,69,0,0.6)",
                      "0px 0px 25px 10px rgba(255,99,71,0.8)",
                      "0px 0px 15px 5px rgba(255,69,0,0.6)",
                    ],
                    borderColor: "#ff4500",
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                >
                  <Card className="bg-gray-900 bg-opacity-80 border border-gray-800 rounded-2xl shadow-lg">
                    <CardContent className="p-6">
                      {product.img && (
                        <motion.img
                          src={product.img}
                          alt={product.name}
                          className="w-24 h-24 mx-auto mb-4 rounded-xl shadow-lg"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.6 }}
                          whileHover={{ scale: 1.1, rotate: 2 }}
                        />
                      )}
                      <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                      <p className="text-gray-400 mb-4">{product.description}</p>
                      {product.items && (
                        <ul className="text-sm text-gray-300 mb-4 list-disc list-inside">
                          {product.items.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      )}
                      <p className="text-lg font-bold mb-4">{product.price} ₽</p>
                      <Button
                        className="w-full bg-red-600 hover:bg-red-700"
                        onClick={() => addToCart(product)}
                      >
                        В корзину
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </main>
          </>
        )}

        {page === "cart" && (
          <section className="max-w-3xl mx-auto text-center">
            <motion.h2
              className="text-3xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Ваша корзина
            </motion.h2>

            {cart.length === 0 ? (
              <p className="text-gray-400">Корзина пуста</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-900 bg-opacity-80 p-4 rounded-xl border border-gray-800"
                  >
                    <div className="text-left">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-gray-400">{item.price} ₽</p>
                    </div>
                    <Button variant="destructive" onClick={() => removeFromCart(index)}>Удалить</Button>
                  </div>
                ))}
                <div className="mt-6 text-xl font-bold">Итого: {total} ₽</div>
                <Button className="w-full bg-green-600 hover:bg-green-700 mt-4" onClick={handlePayment}>Оплатить</Button>
              </div>
            )}
          </section>
        )}

        {page === "about" && (
          <section className="max-w-3xl mx-auto text-center">
            <motion.h2
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              О нашем сервере
            </motion.h2>
            <p className="text-gray-300 leading-relaxed">
              Наш сервер «Русский Стиль» — это место, где каждый игрок может проявить себя: будь ты фермер, рейдер или воин. Мы предлагаем честный донат, дружное сообщество и регулярные события. У нас нет места токсичности — только дух соперничества и уважение к игрокам. Погрузись в атмосферу настоящего выживания и стань частью нашей истории!
            </p>
          </section>
        )}

        {page === "contacts
