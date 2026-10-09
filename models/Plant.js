const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  commonName: { 
    type: String, 
    required: true, 
    trim: true 
  },
  botanicalName: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  },
  family: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, // e.g., Herb, Shrub, Tree, Succulent
    required: true 
  },
  habitat: { 
    type: String 
  },
  region: { 
    type: String 
  },
  ayushCategory: { 
    type: String, 
    enum: ['Ayurveda', 'Yoga', 'Unani', 'Siddha', 'Homeopathy'],
    required: true 
  },
  culturalSignificance: { 
    type: String 
  },
  medicinalUses: [{ 
    type: String 
  }],
  chemicalConstituents: [{ 
    type: String 
  }],
  precautions: { 
    type: String 
  },
  images: {
    thumbnail: { type: String },
    leaf: { type: String },
    stem: { type: String },
    root: { type: String }
  },
  model3DUrl: { 
    type: String, 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Plant', plantSchema);