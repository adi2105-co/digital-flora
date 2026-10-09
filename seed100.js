const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Plant = require('./models/Plant.js');

dotenv.config();

const hundredPlants = [
  // 1-10 Initial detailed seeds
  {
    commonName: 'Tulsi',
    botanicalName: 'Ocimum sanctum',
    ayushCategory: 'Ayurveda',
    family: 'Lamiaceae',
    type: 'Herb',
    medicinalUses: ['Respiratory health', 'Immunity booster', 'Stress relief'],
    habitat: 'Tropical regions',
    region: 'Indian Subcontinent',
    precautions: 'May lower blood sugar levels.',
    images: { thumbnail: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&q=80' },
    model3DUrl: '/models/tulsi.glb'
  },
  {
    commonName: 'Neem',
    botanicalName: 'Azadirachta indica',
    ayushCategory: 'Ayurveda',
    family: 'Meliaceae',
    type: 'Tree',
    medicinalUses: ['Skin inflammation', 'Acne', 'Dental hygiene', 'Blood purification'],
    habitat: 'Arid and semi-arid regions',
    region: 'Indian Subcontinent',
    precautions: 'Avoid excessive intake during pregnancy.',
    images: { thumbnail: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=500&q=80' },
    model3DUrl: '/models/neem.glb'
  },
  {
    commonName: 'Ashwagandha',
    botanicalName: 'Withania somnifera',
    ayushCategory: 'Ayurveda',
    family: 'Solanaceae',
    type: 'Shrub',
    medicinalUses: ['Stress reduction', 'Vitality', 'Sleep support'],
    habitat: 'Dry regions',
    region: 'India, Middle East',
    precautions: 'Consult doctor if suffering from thyroid disorders.',
    images: { thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80' },
    model3DUrl: '/models/tulsi.glb'
  },
  {
    commonName: 'Aloe Vera',
    botanicalName: 'Aloe barbadensis miller',
    ayushCategory: 'Ayurveda',
    family: 'Asphodelaceae',
    type: 'Succulent',
    medicinalUses: ['Skin hydration', 'Wound healing', 'Digestive health'],
    habitat: 'Tropical and arid regions',
    region: 'Global',
    precautions: 'Oral consumption of aloe latex can cause abdominal cramps.',
    images: { thumbnail: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=500&q=80' },
    model3DUrl: '/models/tulsi.glb'
  },
  {
    commonName: 'Amla',
    botanicalName: 'Phyllanthus emblica',
    ayushCategory: 'Ayurveda',
    family: 'Phyllanthaceae',
    type: 'Tree',
    medicinalUses: ['Vitamin C source', 'Hair growth', 'Immunity'],
    habitat: 'Subtropical forests',
    region: 'India, Southeast Asia',
    precautions: 'May increase bleeding risk if taken with blood thinners.',
    images: { thumbnail: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500&q=80' },
    model3DUrl: '/models/neem.glb'
  },
  {
    commonName: 'Turmeric',
    botanicalName: 'Curcuma longa',
    ayushCategory: 'Ayurveda',
    family: 'Zingiberaceae',
    type: 'Herb',
    medicinalUses: ['Anti-inflammatory', 'Antioxidant', 'Joint health'],
    habitat: 'Tropical climate',
    region: 'South Asia',
    precautions: 'High doses may cause stomach upset.',
    images: { thumbnail: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&q=80' },
    model3DUrl: '/models/tulsi.glb'
  },
  {
    commonName: 'Ginger',
    botanicalName: 'Zingiber officinale',
    ayushCategory: 'Ayurveda',
    family: 'Zingiberaceae',
    type: 'Herb',
    medicinalUses: ['Nausea relief', 'Digestion', 'Cold & cough'],
    habitat: 'Humid tropical regions',
    region: 'South Asia',
    precautions: 'May interact with blood thinner medications.',
    images: { thumbnail: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&q=80' },
    model3DUrl: '/models/tulsi.glb'
  },
  {
    commonName: 'Brahmi',
    botanicalName: 'Bacopa monnieri',
    ayushCategory: 'Ayurveda',
    family: 'Plantaginaceae',
    type: 'Herb',
    medicinalUses: ['Memory enhancement', 'Cognitive function', 'Anxiety reduction'],
    habitat: 'Wetlands and marshy areas',
    region: 'India, Australia',
    precautions: 'May slow heart rate in sensitive individuals.',
    images: { thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80' },
    model3DUrl: '/models/tulsi.glb'
  },
  {
    commonName: 'Giloy',
    botanicalName: 'Tinospora cordifolia',
    ayushCategory: 'Ayurveda',
    family: 'Menispermaceae',
    type: 'Climber',
    medicinalUses: ['Fever reducer', 'Immunity', 'Platelet count booster'],
    habitat: 'Tropical forests',
    region: 'Indian Subcontinent',
    precautions: 'Autoimmune disease patients should consult a physician.',
    images: { thumbnail: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=500&q=80' },
    model3DUrl: '/models/neem.glb'
  },
  {
    commonName: 'Shatavari',
    botanicalName: 'Asparagus racemosus',
    ayushCategory: 'Ayurveda',
    family: 'Asparagaceae',
    type: 'Climber',
    medicinalUses: ['Hormonal balance', 'Reproductive health', 'Vitality'],
    habitat: 'Tropical and subtropical areas',
    region: 'India, Himalayas',
    precautions: 'Avoid if sensitive to asparagus family plants.',
    images: { thumbnail: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=500&q=80' },
    model3DUrl: '/models/tulsi.glb'
  }
];

const additionalPlantNames = [
  ['Bael', 'Aegle marmelos', 'Rutaceae', 'Digestive health, dysentery', 'Tree'],
  ['Haritaki', 'Terminalia chebula', 'Combretaceae', 'Detoxification, constipation relief', 'Tree'],
  ['Bibhitaki', 'Terminalia bellirica', 'Combretaceae', 'Respiratory support, hair strength', 'Tree'],
  ['Arjuna', 'Terminalia arjuna', 'Combretaceae', 'Cardiovascular health, blood pressure', 'Tree'],
  ['Guggulu', 'Commiphora mukul', 'Burseraceae', 'Cholesterol management, joint pain', 'Shrub'],
  ['Licorice (Mulethi)', 'Glycyrrhiza glabra', 'Fabaceae', 'Sore throat, acidity relief', 'Herb'],
  ['Gotu Kola', 'Centella asiatica', 'Apiaceae', 'Skin repair, mental focus', 'Herb'],
  ['Bhringraj', 'Eclipta alba', 'Asteraceae', 'Hair follicle growth, liver health', 'Herb'],
  ['Pudina (Mint)', 'Mentha indica', 'Lamiaceae', 'Digestion, cooling agent', 'Herb'],
  ['Cardamom (Elaichi)', 'Elettaria cardamomum', 'Zingiberaceae', 'Oral health, digestion', 'Herb'],
  ['Cinnamon (Dalchini)', 'Cinnamomum verum', 'Lauraceae', 'Metabolism, blood sugar control', 'Tree'],
  ['Clove (Laung)', 'Syzygium aromaticum', 'Myrtaceae', 'Toothache relief, antimicrobial', 'Tree'],
  ['Fenugreek (Methi)', 'Trigonella foenum-graecum', 'Fabaceae', 'Glucose control, lactation', 'Herb'],
  ['Cumin (Jeera)', 'Cuminum cyminum', 'Apiaceae', 'Digestive enzyme stimulant', 'Herb'],
  ['Fennel (Saunf)', 'Foeniculum vulgare', 'Apiaceae', 'Bloating reduction, eye health', 'Herb'],
  ['Ajwain', 'Trachyspermum ammi', 'Apiaceae', 'Gas relief, stomach pain', 'Herb'],
  ['Eucalyptus', 'Eucalyptus globulus', 'Myrtaceae', 'Decongestant, sinus relief', 'Tree'],
  ['Lemongrass', 'Cymbopogon citratus', 'Poaceae', 'Calming tea, antibacterial', 'Herb'],
  ['Curry Leaves', 'Murraya koenigii', 'Rutaceae', 'Hair growth, diabetes management', 'Shrub'],
  ['Vaska (Vasaka)', 'Justicia adhatoda', 'Acanthaceae', 'Bronchial support, asthma', 'Shrub'],
  ['Kalmegh', 'Andrographis paniculata', 'Acanthaceae', 'Liver detox, viral fevers', 'Herb'],
  ['Nirgundi', 'Vitex negundo', 'Lamiaceae', 'Arthritis relief, muscle relaxation', 'Shrub'],
  ['Punarnava', 'Boerhavia diffusa', 'Nyctaginaceae', 'Kidney care, water retention', 'Herb'],
  ['Manjistha', 'Rubia cordifolia', 'Rubiaceae', 'Blood purification, radiant skin', 'Climber'],
  ['Shankhpushpi', 'Convolvulus pluricaulis', 'Convolvulaceae', 'Brain tonic, sleep enhancer', 'Herb'],
  ['Kutki', 'Picrorhiza kurroa', 'Plantaginaceae', 'Liver enzyme regulation', 'Herb'],
  ['Gokshura', 'Tribulus terrestris', 'Zygophyllaceae', 'Urinary tract health, stamina', 'Herb'],
  ['Vidanga', 'Embelia ribes', 'Primulaceae', 'Deworming, digestive cleaning', 'Shrub'],
  ['Musta (Nagarmotha)', 'Cyperus rotundus', 'Cyperaceae', 'Digestive disorders, fever', 'Herb'],
  ['Brahmi Bot', 'Bacopa caroliniana', 'Plantaginaceae', 'Neurological support', 'Herb'],
  ['Nagkesar', 'Mesua ferrea', 'Calophyllaceae', 'Bleeding disorders, skin glow', 'Tree'],
  ['Devdaru', 'Cedrus deodara', 'Pinaceae', 'Skin infections, joint stiffness', 'Tree'],
  ['Pippali (Long Pepper)', 'Piper longum', 'Piperaceae', 'Metabolic support, cough', 'Climber'],
  ['Kanthakari', 'Solanum virginianum', 'Solanaceae', 'Respiratory inflammation', 'Herb'],
  ['Lodhra', 'Symplocos racemosa', 'Symplocaceae', 'Uterine health, acne clearance', 'Tree'],
  ['Sariva (Anantmula)', 'Hemidesmus indicus', 'Apocynaceae', 'Body cooling, skin care', 'Shrub'],
  ['Chitrak', 'Plumbago zeylanica', 'Plumbaginaceae', 'Digestive fire activation', 'Shrub'],
  ['Jatamansi', 'Nardostachys jatamansi', 'Caprifoliaceae', 'Calming mind, insomnia', 'Herb'],
  ['Karela (Bitter Gourd)', 'Momordica charantia', 'Cucurbitaceae', 'Blood glucose regulation', 'Climber'],
  ['Jamun', 'Syzygium cumini', 'Myrtaceae', 'Diabetic care, pancreatic health', 'Tree'],
  ['Cassia Tora', 'Senna tora', 'Fabaceae', 'Skin diseases, laxative', 'Herb'],
  ['Chirata', 'Swertia chirata', 'Gentianaceae', 'Fever management, skin purity', 'Herb'],
  ['Dhamasa', 'Fagonia cretica', 'Zygophyllaceae', 'Blood purifier, anti-allergy', 'Shrub'],
  ['Apamarga', 'Achyranthes aspera', 'Amaranthaceae', 'Digestive issues, weight control', 'Herb'],
  ['Dhataki', 'Woodfordia fruticosa', 'Lythraceae', 'Fermentation agent in Ayurveda', 'Shrub'],
  ['Kutaja', 'Holarrhena antidysenterica', 'Apocynaceae', 'IBS support, diarrhea relief', 'Tree'],
  ['Madhuca (Mahua)', 'Madhuca longifolia', 'Sapotaceae', 'Nerve strength, tonic', 'Tree'],
  ['Pashanbheda', 'Bergenia ligulata', 'Saxifragaceae', 'Kidney stone dissolution', 'Herb'],
  ['Shallaki', 'Boswellia serrata', 'Burseraceae', 'Joint mobility, osteoarthritis', 'Tree'],
  ['Varuna', 'Crateva religiosa', 'Capparaceae', 'Prostate and urinary care', 'Tree'],
  ['Patha', 'Cissampelos pareira', 'Menispermaceae', 'Abdominal pain, wound healing', 'Climber'],
  ['Bakuchi', 'Psoralea corylifolia', 'Fabaceae', 'Vitiligo, skin pigmentation', 'Herb'],
  ['Tagara', 'Valeriana wallichii', 'Caprifoliaceae', 'Sedative, anxiety relief', 'Herb'],
  ['Bhumyamalaki', 'Phyllanthus niruri', 'Phyllanthaceae', 'Hepatitis support, liver detox', 'Herb'],
  ['Ativisha', 'Aconitum heterophyllum', 'Ranunculaceae', 'Pediatric digestive care', 'Herb'],
  ['Dravanti', 'Jatropha curcas', 'Euphorbiaceae', 'Purgative properties', 'Shrub'],
  ['Erand (Castor)', 'Ricinus communis', 'Euphorbiaceae', 'Constipation relief, joint pain', 'Shrub'],
  ['Ghanera', 'Premna serratifolia', 'Lamiaceae', 'Anti-inflammatory formulation', 'Shrub'],
  ['Indrayava', 'Holarrhena pubescens', 'Apocynaceae', 'Intestinal parasite removal', 'Tree'],
  ['Kampillaka', 'Mallotus philippensis', 'Euphorbiaceae', 'Skin parasite management', 'Tree'],
  ['Karanja', 'Pongamia pinnata', 'Fabaceae', 'Topical antiseptic for wounds', 'Tree'],
  ['Kasani (Chicory)', 'Cichorium intybus', 'Asteraceae', 'Liver enlargement support', 'Herb'],
  ['Khadir', 'Acacia catechu', 'Fabaceae', 'Oral cavity wounds, skin care', 'Tree'],
  ['Latakaranj', 'Caesalpinia bonduc', 'Fabaceae', 'Malaria symptom management', 'Shrub'],
  ['Madanaphala', 'Randia dumetorum', 'Rubiaceae', 'Vamana therapy in Ayurveda', 'Shrub'],
  ['Mayaphala', 'Quercus infectoria', 'Fagaceae', 'Tissue tightening, bleeding control', 'Tree'],
  ['Methi Leaf', 'Trigonella foenum', 'Fabaceae', 'Blood sugar regulation', 'Herb'],
  ['Murva', 'Marsdenia tenacissima', 'Apocynaceae', 'Fever and toxicity relief', 'Climber'],
  ['Parijata (Night Jasmine)', 'Nyctanthes arbor-tristis', 'Oleaceae', 'Sciatica pain, chronic fever', 'Shrub'],
  ['Patala', 'Stereospermum suaveolens', 'Bignoniaceae', 'Edema and inflammation', 'Tree'],
  ['Prishniparni', 'Uraria picta', 'Fabaceae', 'Bone healing support', 'Herb'],
  ['Rakta Chandan', 'Pterocarpus santalinus', 'Fabaceae', 'Skin cooling, hyperpigmentation', 'Tree'],
  ['Rasna', 'Pluchea lanceolata', 'Asteraceae', 'Rheumatoid arthritis support', 'Herb'],
  ['Sahjan (Moringa)', 'Moringa oleifera', 'Moringaceae', 'Multivitamin, joint health', 'Tree'],
  ['Saptaparna', 'Alstonia scholaris', 'Apocynaceae', 'Skin disorders, respiratory care', 'Tree'],
  ['Shalparni', 'Desmodium gangeticum', 'Fabaceae', 'Post-fever debility tonic', 'Shrub'],
  ['Shigru', 'Moringa concanensis', 'Moringaceae', 'Analgesic, anti-swelling', 'Tree'],
  ['Sirisha', 'Albizia lebbeck', 'Fabaceae', 'Anti-allergy, neutralizer', 'Tree'],
  ['Tejpatta (Bay Leaf)', 'Cinnamomum tamala', 'Lauraceae', 'Glucose processing support', 'Tree'],
  ['Trivrit', 'Operculina turpethum', 'Convolvulaceae', 'Purgative detoxification', 'Climber'],
  ['Tulsi Purple', 'Ocimum gratissimum', 'Lamiaceae', 'Adaptogenic immunity booster', 'Herb'],
  ['Usheer (Khas)', 'Vetiveria zizanioides', 'Poaceae', 'Body heat balance, sweat care', 'Herb'],
  ['Vacha', 'Acorus calamus', 'Acoraceae', 'Speech clarity, memory retention', 'Herb'],
  ['Varahi', 'Dioscorea bulbifera', 'Dioscoreaceae', 'Rejuvenating anti-aging tonic', 'Climber'],
  ['Vatsanabha', 'Aconitum ferox', 'Ranunculaceae', 'Purified pyrexia controller', 'Herb'],
  ['Vidari', 'Pueraria tuberosa', 'Fabaceae', 'Strength building, weight gain', 'Climber'],
  ['Vikankata', 'Flacourtia indica', 'Salicaceae', 'Jaundice and spleen care', 'Shrub'],
  ['Vishnukranthi', 'Evolvulus alsinoides', 'Convolvulaceae', 'Nervine tonic, fevers', 'Herb'],
  ['Yavanika', 'Trachyspermum ammi var', 'Apiaceae', 'Digestive gas relief', 'Herb'],
  ['Zedoary (Kachur)', 'Curcuma zedoaria', 'Zingiberaceae', 'Blood circulation, stomachic', 'Herb']
];

additionalPlantNames.forEach(([name, botName, fam, uses, plantType], index) => {
  hundredPlants.push({
    commonName: name,
    botanicalName: botName,
    ayushCategory: 'Ayurveda',
    family: fam,
    type: plantType || 'Herb',
    medicinalUses: uses.split(', '),
    habitat: 'Tropical / Subtropical',
    region: 'Indian Subcontinent',
    precautions: 'Use under guidance of a qualified practitioner.',
    images: {
      thumbnail: `https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=500&q=80`
    },
    model3DUrl: (index % 2 === 0) ? '/models/tulsi.glb' : '/models/neem.glb'
  });
});

const seed100 = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Plant.deleteMany({});
    await Plant.insertMany(hundredPlants);
    console.log(`Successfully seeded ${hundredPlants.length} plants into MongoDB!`);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seed100();