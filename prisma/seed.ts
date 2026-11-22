import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.setItem.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productSet.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.settings.deleteMany();

  const wine = await prisma.category.create({ data: { name: "Вино", slug: "wine", sortOrder: 1 } });
  const champagne = await prisma.category.create({ data: { name: "Шампанское и игристое", slug: "champagne", sortOrder: 2 } });
  const vodka = await prisma.category.create({ data: { name: "Водка", slug: "vodka", sortOrder: 3 } });
  const whiskey = await prisma.category.create({ data: { name: "Виски", slug: "whiskey", sortOrder: 4 } });
  const cognac = await prisma.category.create({ data: { name: "Коньяк и бренди", slug: "cognac", sortOrder: 5 } });
  const gin = await prisma.category.create({ data: { name: "Джин и мартини", slug: "gin", sortOrder: 6 } });
  const rum = await prisma.category.create({ data: { name: "Ром и текила", slug: "rum", sortOrder: 7 } });
  const beer = await prisma.category.create({ data: { name: "Пиво и сидр", slug: "beer", sortOrder: 8 } });
  const snacks = await prisma.category.create({ data: { name: "Закуски", slug: "snacks", sortOrder: 9 } });
  const extra = await prisma.category.create({ data: { name: "К заказу", slug: "extras", sortOrder: 10 } });

  const img = (name: string) => `/uploads/products/${name}.webp`;

  const p = (name: string, slug: string, desc: string, price: number, catId: number, volume: string, abv: string, imgFile: string) =>
    prisma.product.create({ data: { name, slug, description: desc, price, image: img(imgFile), categoryId: catId, volume, abv } });

  // === ВИНО ===
  const chianti = await p("Chianti Classico Riserva DOCG", "chianti-classico", "Тосканское красное с нотами вишни и фиалки.", 2400, wine.id, "0.75 л", "13.5%", "chianti");
  const prosecco = await p("Prosecco Superiore DOCG Brut", "prosecco-superiore", "Итальянское игристое. Зелёное яблоко и белые цветы.", 1800, champagne.id, "0.75 л", "11.5%", "prosecco");
  await p("Sauvignon Blanc Marlborough", "sauvignon-blanc", "Новозеландское белое. Маракуйя, грейпфрут, крыжовник.", 1900, wine.id, "0.75 л", "12.5%", "sauvignon");
  await p("Malbec Reserva Mendoza", "malbec-mendoza", "Аргентинский мальбек. Ежевика, чернослив, шоколад.", 2200, wine.id, "0.75 л", "14.5%", "malbec");
  await p("Pinot Noir Bourgogne", "pinot-noir-bourgogne", "Бургундский пино нуар. Красные ягоды, шёлковая текстура.", 3200, wine.id, "0.75 л", "13%", "pinot");
  await p("Cabernet Sauvignon Chile", "cabernet-chile", "Чилийский каберне. Чёрная смородина, перец, кедр.", 1500, wine.id, "0.75 л", "13.5%", "cabernet");
  await p("Riesling Mosel", "riesling-mosel", "Немецкий рислинг. Яблоко, персик, минеральность.", 1800, wine.id, "0.75 л", "11%", "mosel");

  // === ШАМПАНСКОЕ ===
  await p("Moet & Chandon Imperial Brut", "moet-chandon", "Культовое шампанское. Цитрус и бриошь.", 6500, champagne.id, "0.75 л", "12%", "moet");
  await p("Veuve Clicquot Yellow Label", "veuve-clicquot", "Шампанское в жёлтой этикетке. Фрукты, ваниль.", 7800, champagne.id, "0.75 л", "12%", "veuve");
  await p("Asti Martini", "asti-martini", "Сладкое игристое. Персик, мёд, мускат.", 900, champagne.id, "0.75 л", "7.5%", "asti");
  await p("Советское шампанское полусладкое", "sovetskoe-champagne", "Классика. Полусладкое игристое.", 450, champagne.id, "0.75 л", "10.5%", "советское");

  // === ВОДКА ===
  await p("Beluga Noble", "beluga-noble", "Премиальная водка тройной дистилляции.", 2200, vodka.id, "0.7 л", "40%", "beluga");
  await p("Absolut", "absolut-vodka", "Шведская водка. Чистый вкус.", 1500, vodka.id, "0.7 л", "40%", "absolute");
  await p("Grey Goose", "grey-goose", "Французская водка. Ноты миндаля.", 3500, vodka.id, "0.7 л", "40%", "grey-goose");
  await p("Finlandia", "finlandia", "Финская водка из ледниковой воды.", 1200, vodka.id, "0.7 л", "40%", "finlandia");
  await p("Столичная", "stolichnaya", "Классическая водка. Мягкий вкус.", 700, vodka.id, "0.5 л", "40%", "столичная");
  await p("Хортица", "khortytsa", "Мягкая водка. Хлебный аромат.", 600, vodka.id, "0.5 л", "40%", "хортица");

  // === ВИСКИ ===
  await p("Jack Daniel's Single Barrel", "jack-daniels", "Теннессийский виски. Карамель, дуб, специи.", 4500, whiskey.id, "0.7 л", "45%", "jack-daniels");
  await p("Jameson Irish Whiskey", "jameson", "Ирландский виски. Ваниль, дерево.", 2200, whiskey.id, "0.7 л", "40%", "jameson");
  await p("Johnnie Walker Black Label", "johnnie-walker-black", "Шотландский 12 лет. Дым, фрукты, ваниль.", 3500, whiskey.id, "0.7 л", "40%", "johnnie");
  await p("Johnnie Walker Red Label", "johnnie-walker-red", "Шотландский купаж. Пряности и дым.", 1800, whiskey.id, "0.7 л", "40%", "red-johhnie");
  await p("Chivas Regal 12", "chivas-regal-12", "Шотландский 12 лет. Мёд, яблоки, ваниль.", 3200, whiskey.id, "0.7 л", "40%", "chivas");
  await p("Jim Beam", "jim-beam", "Бурбон из Кентукки. Кукуруза, карамель.", 1600, whiskey.id, "0.7 л", "40%", "jim");

  // === КОНЬЯК ===
  await p("Hennessy VS", "hennessy-vs", "Французский коньяк. Фрукты, дуб, ваниль.", 3800, cognac.id, "0.7 л", "40%", "hennessy-vs");
  await p("Hennessy VSOP", "hennessy-vsop", "Коньяк 4+ лет. Насыщенный, шелковистый.", 5500, cognac.id, "0.7 л", "40%", "hennessy-vsop");
  await p("Courvoisier VS", "courvoisier-vs", "Французский коньяк. Цветочный, элегантный.", 2800, cognac.id, "0.7 л", "40%", "courvoisier");
  await p("Арарат 5 звёзд", "ararat-5", "Армянский коньяк 5 лет. Чернослив, ваниль.", 1800, cognac.id, "0.5 л", "40%", "ararat");

  // === ДЖИН И МАРТИНИ ===
  await p("Hendrick's Gin", "hendricks-gin", "Шотландский джин с розой и огурцом.", 3500, gin.id, "0.7 л", "41.4%", "hendricks");
  await p("Beefeater London Dry", "beefeater", "Лондонский сухой джин. Можжевельник, цитрус.", 1800, gin.id, "0.7 л", "40%", "beefeater");
  await p("Bombay Sapphire", "bombay-sapphire", "Джин с 10 ботаникалами. Цитрусовый.", 2200, gin.id, "0.7 л", "40%", "bombay");
  await p("Martini Bianco", "martini-bianco", "Вермут. Сладкий, ваниль, пряности.", 900, gin.id, "1 л", "15%", "martini");
  await p("Martini Rosso", "martini-rosso", "Красный вермут. Горьковато-сладкий.", 900, gin.id, "1 л", "15%", "martini-rosso");
  await p("Martini Extra Dry", "martini-extra-dry", "Сухой вермут. Для коктейлей.", 900, gin.id, "1 л", "18%", "martini-extra-dry");

  // === РОМ И ТЕКИЛА ===
  await p("Bacardi Carta Blanca", "bacardi-blanca", "Белый ром. Для мохито и дайкири.", 1400, rum.id, "0.7 л", "40%", "carta-blanca");
  await p("Captain Morgan Spiced Gold", "captain-morgan", "Пряный ром. Ваниль, карамель.", 1600, rum.id, "0.7 л", "35%", "captain-morgan");
  await p("Havana Club Añejo 3", "havana-club-3", "Кубинский ром 3 года. Тропические фрукты.", 1500, rum.id, "0.7 л", "40%", "havana-club");
  await p("Jose Cuervo Especial Silver", "jose-cuervo-silver", "Мексиканская текила. Агава, цитрус.", 2000, rum.id, "0.7 л", "38%", "jose-cuervo");
  await p("Olmeca Gold", "olmeca-gold", "Золотая текила. Карамельно-перечная.", 1800, rum.id, "0.7 л", "38%", "olmeca");
  await p("Sierra Silver", "sierra-silver", "Текила. Свежий вкус агавы.", 1500, rum.id, "0.7 л", "38%", "sierra");

  // === ПИВО ===
  await p("Guinness Draught Stout", "guinness-stout", "Ирландский стаут. Кофе, шоколад.", 380, beer.id, "0.44 л", "4.2%", "guinness");
  await p("Hoegaarden Witbier", "hoegaarden", "Бельгийское пшеничное. Кориандр, цедра.", 320, beer.id, "0.5 л", "4.9%", "hoegaarden");
  await p("Stella Artois", "stella-artois", "Бельгийский лагер. Лёгкий, хмелевой.", 250, beer.id, "0.5 л", "5%", "stella");
  await p("Corona Extra", "corona-extra", "Мексиканский лагер. С лаймом — идеал.", 300, beer.id, "0.355 л", "4.5%", "corona");
  await p("Балтика 7", "baltika-7", "Российский лагер. Классика.", 150, beer.id, "0.5 л", "5.4%", "балтика");

  // === ЗАКУСКИ ===
  const candy = await p("Lindt Lindor Assorted", "lindt-lindor", "Швейцарские трюфели. Молочный, тёмный, белый шоколад.", 1200, snacks.id, "200 г", "", "lindor");
  await p("Чипсы Pringles Original", "pringles-original", "Классические чипсы в тубе.", 350, snacks.id, "165 г", "", "pringles");
  await p("Орехи микс Premium", "nuts-mix", "Кешью, миндаль, фундук. Жареные, солёные.", 600, snacks.id, "250 г", "", "nuts-mix");
  await p("Фисташки солёные", "pistachios", "Иранские фисташки. Крупные, солёные.", 500, snacks.id, "200 г", "", "pistachios");

  // === К ЗАКАЗУ ===
  await p("Презервативы Durex Elite", "durex-elite", "Тонкие. 12 шт.", 800, extra.id, "12 шт.", "", "durex-elite");
  await p("Презервативы Durex Classic", "durex-classic", "Классические. 3 шт.", 350, extra.id, "3 шт.", "", "durex-classic");
  await p("Parliament Aqua Blue", "parliament-aqua", "Сигареты Parliament с капсулой.", 300, extra.id, "1 пачка", "", "parlament");
  await p("Marlboro Red", "marlboro-red", "Сигареты Marlboro.", 280, extra.id, "1 пачка", "", "malboro");
  await p("IQOS HEETS Amber", "heets-amber", "Стики для IQOS.", 200, extra.id, "1 пачка", "", "iqos");
  await p("Угли Coconara", "coconara-coals", "Кокосовые угли для кальяна. 72 шт.", 500, extra.id, "1 кг", "", "coconara");
  await p("Лёд пищевой", "ice-pack", "Кубики льда для коктейлей.", 200, extra.id, "1 кг", "", "лед");
  await p("Стаканы для виски", "whiskey-cups", "Пластиковые Old Fashioned. 6 шт.", 250, extra.id, "6 шт.", "", "бокалы-виски");
  await p("Бокалы для вина", "wine-glasses", "Пластиковые на ножке. 4 шт.", 300, extra.id, "4 шт.", "", "бокалы");
  await p("Зажигалка", "lighter", "Газовая зажигалка.", 150, extra.id, "1 шт.", "", "зажигалка");
  await p("Сок Rich апельсиновый", "juice-orange", "Апельсиновый сок для миксов.", 200, extra.id, "1 л", "", "rich");
  await p("Coca-Cola", "coca-cola", "Классика для виски-колы.", 150, extra.id, "1 л", "", "cola");
  await p("Тоник Schweppes", "schweppes-tonic", "Тоник для джин-тоника.", 150, extra.id, "1 л", "", "швепес");
  await p("Red Bull", "red-bull", "Энергетик для коктейлей.", 200, extra.id, "0.25 л", "", "redbull");

  // === СЕТЫ ===
  await prisma.productSet.create({
    data: {
      name: "Романтический вечер", slug: "romantic-evening", price: 5900, image: "/uploads/products/romantic.webp",
      description: "Два вина, бокалы, трюфели и приятный бонус.",
      items: { create: [
        { productId: chianti.id, quantity: 1 },
        { productId: prosecco.id, quantity: 1 },
        { customName: "Бокалы для вина (2 шт.)", quantity: 1 },
        { productId: candy.id, quantity: 1 },
        { customName: "Презервативы Durex Elite (3 шт.)", quantity: 1 },
      ] },
    },
  });

  await prisma.productSet.create({
    data: {
      name: "Вечер с друзьями", slug: "friends-night", price: 5500, image: "/uploads/products/friends.webp",
      description: "Виски, стаканы, закуски и камни для виски.",
      items: { create: [
        { customName: "Jack Daniel's Single Barrel 0.7 л", quantity: 1 },
        { customName: "Стаканы Old Fashioned (4 шт.)", quantity: 1 },
        { customName: "Чипсы Pringles Original", quantity: 2 },
        { customName: "Орехи микс (250 г)", quantity: 1 },
      ] },
    },
  });

  await prisma.productSet.create({
    data: {
      name: "Винная дегустация", slug: "wine-tasting", price: 8500, image: "/uploads/products/wine-tasting.webp",
      description: "Три вина из разных стран, бокалы и закуски.",
      items: { create: [
        { customName: "Chianti Classico Riserva", quantity: 1 },
        { customName: "Sauvignon Blanc Marlborough", quantity: 1 },
        { customName: "Malbec Reserva Mendoza", quantity: 1 },
        { customName: "Бокалы для дегустации (4 шт.)", quantity: 1 },
      ] },
    },
  });

  await prisma.settings.createMany({
    data: [
      { key: "payment_method", value: "Оплата при получении" },
      { key: "delivery_price", value: "300" },
      { key: "free_delivery_from", value: "3000" },
      { key: "phone", value: "+7 (999) 123-45-67" },
      { key: "address", value: "Москва. За МКАД — по предоплате" },
      { key: "work_hours", value: "24/7" },
    ],
  });

  console.log("Seed completed!");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
