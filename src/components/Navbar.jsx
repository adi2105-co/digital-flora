import React from 'react';
import { Leaf, Search, HeartPulse } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="bg-emerald-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveTab('explore')}>
          <Leaf className="w-8 h-8 text-emerald-300" />
          <span className="text-xl font-bold tracking-wide">Digital Flora</span>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('explore')}
            className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition ${
              activeTab === 'explore' ? 'bg-emerald-700 font-semibold' : 'hover:bg-emerald-700/50'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Explore Plants</span>
          </button>
          <button
            onClick={() => setActiveTab('advisor')}
            className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition ${
              activeTab === 'advisor' ? 'bg-emerald-700 font-semibold' : 'hover:bg-emerald-700/50'
            }`}
          >
            <HeartPulse className="w-4 h-4" />
            <span>Symptom Advisor</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;