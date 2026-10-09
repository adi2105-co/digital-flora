const mongoose = require('mongoose');
require('dotenv').config();
const Plant = require('./models/Plant');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/digital_flora';

const samplePlants = [
  {
    commonName: 'Tulsi (Holy Basil)',
    botanicalName: 'Ocimum sanctum',
    family: 'Lamiaceae',
    type: 'Herb',
    habitat: 'Tropical and subtropical regions',
    region: 'India, Southeast Asia',
    ayushCategory: 'Ayurveda',
    culturalSignificance: 'Sacred plant in Indian traditions, widely used in daily household remedies.',
    medicinalUses: ['Cough', 'Cold', 'Immunity Boost', 'Stress Relief'],
    chemicalConstituents: ['Eugenol', 'Caryophyllene', 'Ursolic acid'],
    precautions: 'May lower blood sugar levels; consult a physician if on diabetes medication.',
    images: {
      thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGJbrjjIOM3FBcbDKjiZ-_TLvqXlrKN01ss_qbyhVM4CZx4qbdEGbU8gzH&s=10',
      leaf: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500',
      stem: '',
      root: ''
    },
    model3DUrl:'/models/tulsi.glb'
  },
  {
    commonName: 'Neem',
    botanicalName: 'Azadirachta indica',
    family: 'Meliaceae',
    type: 'Tree',
    habitat: 'Arid and semi-arid regions',
    region: 'Indian Subcontinent',
    ayushCategory: 'Ayurveda',
    culturalSignificance: 'Known as the "Village Pharmacy" due to its multi-purpose medicinal properties.',
    medicinalUses: ['Skin inflammation', 'Acne', 'Dental hygiene', 'Blood purification'],
    chemicalConstituents: ['Azadirachtin', 'Nimbin', 'Nimbidin'],
    precautions: 'Excessive consumption may affect liver/kidney function in long-term usage.',
    images: {
      thumbnail: 'https://www.shutterstock.com/image-photo/fresh-green-neem-leaves-isolated-260nw-2721270085.jpg',
      leaf: 'https://images.unsplash.com/photo-1600718374662-0483d2b9da44?w=500',
      stem: '',
      root: ''
    },
    model3DUrl:'/models/neem.glb'
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding...');
    
    // Clear existing plants
    await Plant.deleteMany({});
    console.log('Cleared existing plant records.');

    // Insert new sample records
    await Plant.insertMany(samplePlants);
    console.log('Successfully seeded Digital Flora plant database!');

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();