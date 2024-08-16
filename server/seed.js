const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://seksikoleg5:se4HivNRYKdydnzc@cluster0.pdc2rrh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });


const ItemProduct = mongoose.model('ItemProduct', new mongoose.Schema({
  id: String,
  img: String,
  cost: String,
  name: String,
  species: String,
  category: String,
  subcategory: String,
}));

const Filter = mongoose.model('Filter', new mongoose.Schema({
  id: String,
  name: String,
  category: String,
  subfilters: [
    {
      id: String,
      filterName: String,
      name: String,
    },
  ],
}));

const seedData = async () => {
  await ItemProduct.deleteMany({});
  await Filter.deleteMany({});

  const itemProducts = [
    { id: "1", img: "https://cdn1.vectorstock.com/i/1000x1000/09/05/green-electric-lamp-neon-sign-vector-28270905.jpg", cost: "543", name: "Lamp", species: "best", category: "lamp", subcategory: "lamp_neon" },
    { id: "2", img: "/src/resources/img/img.jpg", cost: "143", name: "Light", species: "", category: "light", subcategory: "light_neon" },
    { id: "3", img: "/src/resources/img/img.png", cost: "500", name: "Blue Lamp", species: "best", category: "lamp", subcategory: "lamp_diod" },
    { id: "4", img: "/src/resources/img/img.png", cost: "233", name: "Lamp", species: "novetly", category: "lamp", subcategory: "lamp_diod" },
    { id: "5", img: "/src/resources/img/img.png", cost: "742", name: "Blue Light", species: "best", category: "light", subcategory: "light_neon" },
    { id: "6", img: "/src/resources/img/img.png", cost: "761", name: "Red Light", species: "novetly", category: "light", subcategory: "light_diod" },
    { id: "7", img: "/src/resources/img/img.png", cost: "444", name: "White Light", species: "best", category: "light", subcategory: "light_neon" },
    { id: "8", img: "/src/resources/img/img.png", cost: "987", name: "White Lamp", species: "novetly", category: "lamp", subcategory: "lamp_neon" },
  ];

  const filters = [
    { id: "1", name: "Всі товари", category: "", subfilters: [] },
    { id: "2", name: "Лампи", category: "lamp", subfilters: [
        { id: "1-1", filterName: "Неонові лампи", name: "lamp_neon" },
        { id: "1-2", filterName: "Діодні лампи", name: "lamp_diod" },
      ]
    },
    { id: "3", name: "Світильники", category: "light", subfilters: [
        { id: "3-1", name: "light_neon", filterName: "Неонові світильники" },
        { id: "3-2", name: "light_diod", filterName: "Діодні світильники" },
      ]
    },
    { id: "4", name: "М'які іграшки", category: "light", subfilters: [
        { id: "4-1", name: "Звірятка" },
        { id: "4-2", name: "Машинки" },
      ]
    },
    { id: "5", name: "Одяг для тваринок", category: "light", subfilters: [
        { id: "5-1", name: "Собачки" },
        { id: "5-2", name: "Кошенята" },
      ]
    },
    { id: "6", name: "Подарункові бокси", category: "light", subfilters: [
        { id: "6-1", name: "До дня народження" },
        { id: "6-2", name: "До весілля" },
      ]
    },
  ];

  await ItemProduct.insertMany(itemProducts);
  await Filter.insertMany(filters);

  mongoose.disconnect();
};

seedData().catch(err => console.log(err));
