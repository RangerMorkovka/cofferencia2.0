

export const menuData = [
  {
    name: "Кофе",
    id: 1,
    subMenu: true,
    
  },
  {
    name: "Напитки",
    id: 2,
    subMenu: true,
  },
  {
      id:3,
    name: "Завтраки",
    
  },
  {
      id:4,
    name: "Закуски",
    
  },
  {
      id:5,
    name: "Первые блюда",
    
  },
  {
      id:6,
    name: "Вторые блюда",
    
  },
  {
      id:7,
    name: "Салаты",
   
  },
  
  {id:8,
    name: "Дополнительно",
  },
];
export const submenuData = [
  {
    name: "Классика",
    id: 1,
    url: '/#classic',
  },
  {
    name: "Авторский кофе",
    id: 2,
    url: '/#author',
  },
  {
    name: "Сезонный Кофе",
    id: 3,
    url: '/#season',
  },
  {
    name: "Матча",
    id: 4,
     url: '/#matcha',
  },
  {
    name: "Чай",
    id: 5,
     url: '/#tea',
  },
  {
    name: "Горячие напитки",
    id: 6,
     url: '/#hot_drinks',
  },
  {
    name: "Холодные напитки",
    id: 7,
     url: '/#cold_drinks',
  },
  
];
export const productsDataCoffee = [
  
    {
            id:1,
            img : '#',
            name:'Эспрессо', 
            volume:'35 мл',
            price:"160 ₽",

    },
    
     
     {      id:2,
            img : '#',
            name:'Американо', 
            volume:["200 мл", '300мл', '400мл'],
            price:["160 ₽", '210 ₽', '270 ₽'],
      },
      
     
     {      id:3,
            img : '#',
            name:'Флэт уайт', 
            volume:"200 мл",
            price:"200 ₽",
      },
      
     {      id:4,
            img : '#',
            name:'Капучино', 
            volume:["200 мл", '300мл', '400мл'],
            price:["200 ₽", '230 ₽', '250 ₽'],
      },
       {     id:5, 
            img : '#',
            name:'Латте', 
            volume:['300мл', '400мл'],
            price:['230 ₽', '270 ₽'],
      },
       {    id:6,  
            img : '#',
            name:'Раф', 
            volume:["200 мл", '300мл', '400мл'],
            price:["260 ₽", '290 ₽', '330 ₽'],
      },
      
     {      id:7,
            img : '#',
            name:'V60', 
            volume:"200 мл",
            price:"220 ₽",
      },
      {      id:8,
            img : './images/coffee/Latte strawberry banana.png',
            name:'Латте клубника-банан', 
            volume:["300 мл", '400 мл'],
            price:["280 ₽", '340 ₽'],
      },
        {      id:9,
            img : '#',
            name:'Розовый латте малина-персик', 
            volume:["300 мл", '400 мл'],
            price:["280 ₽", '340 ₽'],
      },
        {      id:10,
            img : '#',
            name:'Латте фисташка', 
            volume:["300 мл", '400 мл'],
            price:["300 ₽", '350 ₽'],
      },
        {      id:11,
            img : '#',
            name:'Ореховый латте', 
            volume:["300 мл", '400 мл'],
            price:["280 ₽", '340 ₽'],
      },
        {      id:12,
            img : '#',
            name:'Раф шоколад-вишня', 
            volume:["300 мл", '400 мл'],
            price:["340 ₽", '390 ₽'],
      },
        {      id:13,
            img : '#',
            name:'Раф взрывная карамель', 
            volume:["300 мл", '400 мл'],
            price:["340 ₽", '390 ₽'],
      },
        {      id:14,
            img : '#',
            name:'Раф ежевика-мята', 
            volume:["300 мл", '400 мл'],
            price:["340 ₽", '390 ₽'],
      },
        {      id:15,
            img : '#',
            name:'Арахисовый раф', 
            volume:["300 мл", '400 мл'],
            price:["340 ₽", '390 ₽'],
      },
      {      id:16,
            img : '#',
            name:'Эспрессо-тоник', 
            volume:["300 мл", '400 мл'],
            price:["260 ₽", '300 ₽'],
      },
      {      id:17,
            img : '#',
            name:'Ice американо', 
            volume:["300 мл", '400 мл'],
            price:["210 ₽", '270 ₽'],
      },
      {      id:18,
            img : './images/coffee/Ice americano lemon honey.png',
            name:'Ice американо лимон-мед', 
            volume:["300 мл", '400 мл'],
            price:["240 ₽", '320 ₽'],
      },
      {      id:19,
            img : '#',
            name:'Ice латте', 
            volume:["300 мл", '400 мл'],
            price:["230 ₽", '250 ₽'],
      },
      {      id:20,
            img : './images/coffee/Ice latte popping candy.png',
            name:'Ice латте взрывная карамель', 
            volume:["300 мл", '400 мл'],
            price:["300 ₽", '340 ₽'],
      },
      {      id:21,
            img : './images/coffee/Ice Pistachio and raspberry.png',
            name:'Ice латте фисташка-малина', 
            volume:["300 мл", '400 мл'],
            price:["320 ₽", '360 ₽'],
      },
      {      id:22,
            img : './images/coffee/Ice latte Mint chocolate.png',
            name:'Ice латте шоколад-мята', 
            volume:["300 мл", '400 мл'],
            price:["280 ₽", '310 ₽'],
      },
      {      id:23,
            img : './images/coffee/Raspberry ice-cream.png',
            name:'Ice латте малиновый пломбир', 
            volume:["300 мл", '400 мл'],
            price:["350 ₽", '390 ₽'],
      },
      {      id:24,
            img : './images/coffee/Ice latte snikers with cheese foam.png',
            name:'Ice латте сникерс с сырной пенкой', 
            volume:["300 мл", '400 мл'],
            price:["390 ₽", '450 ₽'],
      },
      {      id:25,
            img : './images/coffee/Ice latte Strawberry with cheese foam.png',
            name:'Ice латте клубничный с сырной пенкой', 
            volume:["300 мл", '400 мл'],
            price:["420 ₽", '470 ₽'],
      },
      {      id:26,
            img : '#',
            name:'Фраппе', 
            volume:["300 мл", '400 мл'],
            price:["260 ₽", '300 ₽'],
      },
      {      id:27,
            img : '#',
            name:'Фраппе арахис-макадамия', 
            volume:["300 мл", '400 мл'],
            price:["310 ₽", '370 ₽'],
      },
      {      id:28,
            img : '#',
            name:'Ice капучино', 
            volume:["300 мл", '400 мл'],
            price:["230 ₽", '250 ₽'],
      },
      {      id:29,
            img : '#',
            name:'Ice раф', 
            volume:["300 мл", '400 мл'],
            price:["290 ₽", '330 ₽'],
      },
      {      id:30,
            img : '#',
            name:'Ice раф мята-ягоды', 
            volume:["300 мл", '400 мл'],
            price:["340 ₽", '380 ₽'],
      },
      {      id:31,
            img : '#',
            name:'Апельсиновый бамбл на фрэше', 
            volume:["300 мл", '400 мл'],
            price:["390 ₽", '420 ₽'],
      },
      {      id:32,
            img : '#',
            name:'Апельсиновый бамбл на соке', 
            volume:["300 мл", '400 мл'],
            price:["260 ₽", '290 ₽'],
      },
       {      id:33,
            img : '#',
            name:'Вишневый бамбл', 
            volume:["300 мл", '400 мл'],
            price:["240 ₽", '270 ₽'],
      },

  ]
export const productsDataDrinks = [
  {
            id:1,
            img : '#',
            name:'Матча', 
            volume:['300 мл',"400мл"],
            price:["220 ₽", "260 ₽"],

  },
   {
            id:2,
            img : '#',
            name:'Розовая матча', 
            volume:['300 мл',"400мл"],
            price:["220 ₽", "260 ₽"],

  },
   {
            id:3,
            img : '#',
            name:'Ice матча', 
            volume:['300 мл',"400мл"],
            price:["220 ₽", "260 ₽"],

  },
   {
            id:4,
            img : '#',
            name:'Матча-тоник', 
            volume:['300 мл',"400мл"],
            price:["220 ₽", "260 ₽"],

  },
   {
            id:5,
            img : './images/drinks/Ice matcha orange.png',
            name:'Ice матча апельсин', 
            volume:['300 мл',"400мл"],
            price:["250 ₽", "270 ₽"],

  },
   {
            id:6,
            img : './images/drinks/Ice matcha mango.png',
            name:'Ice матча манго', 
            volume:['300 мл',"400мл"],
            price:["290 ₽", "350 ₽"],

  },
   {
            id:7,
            img : './images/drinks/Ice matcha Raspberry‑blackberry.png',
            name:'Ice матча duo малина-бузина с сырной пенкой', 
            volume:['300 мл',"400мл"],
            price:["380 ₽", "420 ₽"],

  },
   {
            id:8,
            img : './images/drinks/Ice matcha Cherry and macadamia.png',
            name:'Ice матча duo вишня-макадамия с сырной пенкой', 
            volume:['300 мл',"400мл"],
            price:["380 ₽", "420 ₽"],

  },
  {
            id:9,
            img : '#',
            name:'Листовой чай', 
            volume:['300 мл',"600мл"],
            price:["150 ₽", "300 ₽"],

  },

  {
            id:10,
            img : '#',
            name:'Авторский чай "облепиховый"', 
            volume:['300 мл',"600мл"],
            price:["260 ₽", "400 ₽"],

  },
  {
            id:11,
            img : './images/drinks/Aloe citrus tea.png',
            name:'Авторский чай "алоэ-цитрус"', 
            volume:['300 мл',"600мл"],
            price:["260 ₽", "450 ₽"],

  },
  {
            id:12,
            img : './images/drinks/Raspberry tea.png',
            name:'Авторский чай "малиновый"', 
            volume:['300 мл',"600мл"],
            price:["260 ₽", "450 ₽"],

  },
  {
            id:13,
            img : '#',
            name:'Авторский чай "манго-маракуйя"', 
            volume:['300 мл',"600мл"],
            price:["260 ₽", "470 ₽"],

  },
  {
            id:14,
            img : '#',
            name:'Анчан', 
            volume:['300 мл',"400мл"],
            price:["220 ₽", "260 ₽"],

  },
  {
            id:15,
            img : '#',
            name:'Какао', 
            volume:["200мл",'300 мл',"400мл"],
            price:["190 ₽","210 ₽", "260 ₽"],

  },
  {
            id:16,
            img : '#',
            name:'Горячий шоколад', 
            volume:"200 мл",
            price:"270 ₽",

  },
  {
            id:17,
            img : '#',
            name:'Гляссе', 
            volume:"200 мл",
            price:"200 ₽",

  },
  {
            id:18,
            img : './images/drinks/Lemonade classic.png',
            name:'Лимонад "Классический"', 
            volume:"400 мл",
            price:"250 ₽",

  },
  {
            id:19,
            img : './images/drinks/Lemonade orange.png',
            name:'Лимонад "Апельсиновый"', 
            volume:"400 мл",
            price:"280 ₽",

  },
  {
            id:20,
            img : './images/drinks/Lemonade pink aloe.png',
            name:'Лимонад "Розовый алоэ"', 
            volume:"400 мл",
            price:"320 ₽",

  },
  {
            id:21,
            img : './images/drinks/Lemonade Strawberry.png',
            name:'Лимонад "Клубчничный"', 
            volume:"400 мл",
            price:"280 ₽",

  },
  {
            id:22,
            img : './images/drinks/Lemonade mango maracuia.png',
            name:'Лимонад "Манго-Маракуйя"', 
            volume:"400 мл",
            price:"280 ₽",

  },
  {
            id:23,
            img : '#',
            name:'Лимонад "Цитрусовый микс Bubble"', 
            volume:"400 мл",
            price:"360 ₽",

  },
  {
            id:24,
            img : '#',
            name:'Лимонад "Ягодный микс Bubble"', 
            volume:"400 мл",
            price:"260 ₽",

  },
  {
            id:25,
            img : './images/drinks/Lemonade mohito.png',
            name:'Лимонад "Мохито"', 
            volume:"400 мл",
            price:"250 ₽",

  },
  {
            id:26,
            img : './images/drinks/Lemonade Raspberry mojito.png',
            name:'Лимонад "Мохито малиновый"', 
            volume:"400 мл",
            price:"300 ₽",

  },
  {
            id:27,
            img : '#',
            name:'Милкшейк "Ванильный"', 
            volume:"300 мл",
            price:"260 ₽",

  },
   {
            id:28,
            img : '#',
            name:'Милкшейк "Клубничный"', 
            volume:"300 мл",
            price:"280 ₽",

  },
   {
            id:29,
            img : '#',
            name:'Милкшейк "Шоколадный"', 
            volume:"300 мл",
            price:"280 ₽",

  },
   {
            id:30,
            img : '#',
            name:'Смузи "Ягодный микс"', 
            volume:"300 мл",
            price:"290 ₽",

  },
   {
            id:31,
            img : '#',
            name:'Смузи "Клубника-Банан"', 
            volume:"300 мл",
            price:"290 ₽",

  },
  
   {
            id:32,
            img : '#',
            name:'Смузи "Манго-Маракуйя"', 
            volume:"300 мл",
            price:"390 ₽",

  },
  
   {
            id:33,
            img : '#',
            name:'Зеленый смузи', 
            volume:"300 мл",
            price:"320 ₽",

  },
   {
            id:34,
            img : '#',
            name:'Фрэш апельсин', 
            volume:"300 мл",
            price:"380 ₽",

  },
 
  




]
export const productsDataBF = [
  {
            id:1,
            img : '#',
            name:'Овсяная каша с фисташкой и клубничным соусом',
            
            price:'270 ₽',

  },
  {
            id:2,
            img : './images/breakfast/Oatmeal with banana and caramel.png',
            name:'Овсяная каша с бананом и соленой карамелью', 
            price:'250 ₽',

  },
  {
            id:3,
            img : './images/breakfast/Oatmeal with berries and almond flakes.png',
            name:'Овсяная каша с ягодами и миндальными лепестками', 
            price:'250 ₽',

  },
  {
            id:4,
            img : './images/breakfast/Rice porridge with raspberry sauce.png',
            name:'Рисовая каша с малиновым соусом', 
            price:'250 ₽',

  },
    {
            id:5,
            img : './images/breakfast/Cofferencia breakfast.png',
            name:'Завтрак Cofferencia', 
            ingredients :'яйца, лосось, микс салата с черри, круассан, сыр креметте',
            price:'510 ₽',

  },
  {
            id:6,
            img : './images/breakfast/Bavarian breakfast.png',
            name:'Завтрак по-баварски', 
            ingredients :'яйца, сосиски, микс салата с черри, фасоль, тост, кетчуп',
            price:'370 ₽',

  },
  {
            id:7,
            img : './images/breakfast/English breakfast.png',
            name:'Английский завтрак', 
            ingredients :'яйца, бекон, микс салата, помидор, тост, горчичный соус',
            price:'380 ₽',

  },
{
            id:8,
            img : './images/breakfast/Shrimp scramble.png',
            name:'Скрэмбл с креветками', 
            ingredients :'скрэмбл, креветки, микс салата с черри, чиабатта',
            price:'510 ₽',

  },
  {
            id:9,
            img : '#',
            name:'Омлет с курицей и грибами', 
            price:'390 ₽',

  },
  {
            id:10,
            img : './images/breakfast/Ham and Parmesan omelette.png',
            name:'Омлет с ветчиной и пармезаном', 
            price:'350 ₽',

  },
  {
            id:11,
            img : '#',
            name:'Омлет с лососем и творожным сыром', 
            price:'410 ₽',

  },
 
]
export const productsDataSnacks = [
     {
            id:1,
            img : './images/snacks/Bruschetta with avocado and shrimp.png',
            name:'Брускетта с креветками и авокадо', 
            price:'400 ₽',

  }, 
   {
            id:2,
            img : './images/snacks/Bruschetta with salmon and poached egg.png',
            name:'Брускетта с лососем и яйцом пашот', 
            price:'470 ₽',

  }, 
   {
            id:3,
            img : './images/snacks/Chicken sandwich.png',
            name:'Сэндвич с курицей', 
            price:'230 ₽',

  }, 
   {
            id:4,
            img : '#',
            name:'Сэндвич с лососем', 
            price:'320 ₽',

  }, 
   {
            id:5,
            img : './images/snacks/Ham and egg sandwich.png',
            name:'Сэндвич с ветчиной и яйцом', 
            price:'230 ₽',

  }, 
  {
            id:6,
            img : './images/snacks/Green pancakes with bacon and cream cheese.png',
            name:'Зеленые драники с беконом и творожным сыром', 
            price:'390 ₽',

  }, 
  {
            id:7,
            img : './images/snacks/Green potato pancakes with salmon and poached egg.png',
            name:'Зеленые драники с лососем и яйцом пашот', 
            price:'230 ₽',

  }, 
   {
            id:8,
            img : './images/snacks/Cheese pancakes with sour cream, condensed milk, and salted caramel.png',
            name:'Сырники со сметаной/ сгущенкой/ соленой карамелью', 
            price:'180 ₽',

  }, 
  {
            id:9,
            img : '#',
            name:'Круассан с ветчиной', 
            price:'320 ₽',

  },
  {
            id:10,
            img : '#',
            name:'Круассан с курицей', 
            price:'340 ₽',

  },
  {
            id:11,
            img : './images/snacks/Croissant with shrimp and avocado.png',
            name:'Круассан с креветкой и авокадо', 
            price:'440 ₽',

  },
  {
            id:12,
            img : '#',
            name:'Круассан с лососем и рукколой', 
            price:'450 ₽',

  },
   
]
export const productsDataSoup = [
  {
            id:1,
            img : '#',
            name:'Грибной крем-суп', 
            price:'320 ₽',

  }, 
  {
            id:2,
            img : '#',
            name:'Куриный бульон с яйцом и зеленью', 
            price:'320 ₽',

  }, 
 
]
export const productsDataMaincourse = [
    {
            id:1,
            img : '#',
            name:'Боул с курицей', 
            price:'490 ₽',

  }, 
    {
            id:2,
            img : './images/maincourse/Shrimp bowl.png',
            name:'Боул с тигровыми креветками', 
            price:'550 ₽',

  }, 
    {
            id:3,
            img : './images/maincourse/Salmon bowl.png',
            name:'Боул с лососем', 
            price:'550 ₽',

  }, 
    {
            id:4,
            img : '#',
            name:'Рис с курицей и овощами', 
            price:'380 ₽',

  }, 
    {
            id:5,
            img : '#',
            name:'Рис с креветками и овощами', 
            price:'470 ₽',

  }, 
    {
            id:6,
            img : './images/maincourse/Udon noodles with chicken and vegetables.png',
            name:'Удон с курицей и овощами', 
            price:'380 ₽',

  }, 
    {
            id:7,
            img : '#',
            name:'Удон с креветками и овощами', 
            price:'470 ₽',

  }, 
    {
            id:8,
            img : '#',
            name:'Паста с курицей и грибами', 
            price:'360 ₽',

  }, 
    {
            id:9,
            img : './images/maincourse/Pasta carbonara.png',
            name:'Паста карбонара', 
            price:'350 ₽',

  }, 
    {
            id:10,
            img : './images/maincourse/Shrimp pasta with cherry tomatoes.png',
            name:'Паста с креветками и черри', 
            price:'440 ₽',

  }, 
]
export const productsDataSalad = [
  {
            id:1,
            img : './images/salad/Caesar salad with chicken.png',
            name:'Цезарь с курицей', 
            price:'340 ₽',

  }, 
  {
            id:2,
            img : './images/salad/Caesar salad with salmon.png',
            name:'Цезарь с лососем', 
            price:'420 ₽',

  }, 
]
export const productsDataOthers =[
    {
            id:1,
            img : '#',
            name:'Альтернативное молоко', 
            price:'70/80/90 ₽',

  },
    {
            id:2,
            img : '#',
            name:'Дополнительный шот Эспрессо', 
            price:'70 ₽',

  },
    {
            id:3,
            img : '#',
            name:'Сироп', 
            price:'50 ₽',

  },
    {
            id:4,
            img : '#',
            name:'Джус боллы', 
            price:'90 ₽',

  },
]
