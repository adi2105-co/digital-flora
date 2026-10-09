import React, { useState } from 'react';
import { getPlantsBySymptom } from '../services/api';
import PlantCard from './PlantCard';

const HealthAdvisor = () => {
  const [symptom, setSymptom] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e?.preventDefault();
    if (!symptom.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const data = await getPlantsBySymptom(symptom);
      setResults(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Health Advisor fetch error:', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const commonSymptoms = ['Skin', 'Cough', 'Acne', 'Immunity', 'Stress', 'Digestion'];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <h2 className="text-2xl font-bold text-emerald-900 mb-2">Symptom & Health Advisor</h2>
        <p className="text-gray-600 mb-6 text-sm">
          Enter a health symptom or condition (e.g., skin inflammation, cough, acne) to find matching AYUSH plants.
        </p>

        <form onSubmit={handleSearch} className="flex gap-3">
          <input
            type="text"
            placeholder="Type symptom (e.g., skin, cough, acne)..."
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="bg-emerald-800 hover:bg-emerald-900 text-white font-medium px-6 py-3 rounded-lg transition"
          >
            Search
          </button>
        </form>

        <div className="mt-4 flex flex-wrap gap-2 items-center">
          <span className="text-xs text-gray-500 font-medium">Quick Suggestions:</span>
          {commonSymptoms.map((item) => (
            <button
              key={item}
              onClick={() => {
                setSymptom(item);
                getPlantsBySymptom(item).then((data) => {
                  setResults(Array.isArray(data) ? data : []);
                  setSearched(true);
                });
              }}
              className="text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-3 py-1 rounded-full font-medium transition"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Searching medicinal database...</div>
      ) : searched && results.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed text-gray-500">
          No plants found matching symptom "{symptom}". Try searching for "skin" or "cough".
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((plant) => (
            <PlantCard key={plant._id || plant.id} plant={plant} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HealthAdvisor;