import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PlantCard from './components/PlantCard';
import HealthAdvisor from './components/HealthAdvisor';
import { getAllPlants } from './services/api';

function App() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [activeTab, setActiveTab] = useState('library'); // 'library' or 'advisor'

  const fetchPlants = async () => {
    setLoading(true);
    try {
      const data = await getAllPlants(search, category);
      setPlants(data);
    } catch (err) {
      console.error('Failed to load plants:', err);
      setPlants([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, [search, category]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'library' ? (
          <>
            {/* Header & Controls */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-emerald-900">Medicinal Plant Library</h1>
              <p className="text-gray-600 mt-1">
                Explore traditional AYUSH plants with 3D models and therapeutic profiles.
              </p>

              <div className="mt-6 flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Search plants by name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="">All Categories</option>
                  <option value="Ayurveda">Ayurveda</option>
                  <option value="Yoga">Yoga</option>
                  <option value="Unani">Unani</option>
                  <option value="Siddha">Siddha</option>
                  <option value="Homeopathy">Homeopathy</option>
                </select>
              </div>
            </div>

            {/* Plants Grid */}
            {loading ? (
              <div className="text-center py-16 text-gray-500">Loading Digital Flora records...</div>
            ) : plants && plants.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {plants.map((plant) => (
                  <PlantCard key={plant._id || plant.id} plant={plant} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border border-dashed border-gray-300 rounded-xl bg-white shadow-sm">
                <p className="text-lg font-medium text-gray-700">No plant records found matching your search.</p>
                <p className="text-sm text-gray-500 mt-1">Make sure your backend server is running on port 5000.</p>
              </div>
            )}
          </>
        ) : (
          <HealthAdvisor />
        )}
      </main>
    </div>
  );
}

export default App;