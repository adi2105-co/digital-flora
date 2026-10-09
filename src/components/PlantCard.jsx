import React, { useState } from 'react';
import Plant3DViewer from './Plant3DViewer';

const PlantCard = ({ plant }) => {
  const [show3DModal, setShow3DModal] = useState(false);

  // Get image URL or use a high-quality default fallback
  const imageSrc =
    plant?.imageUrl ||
    plant?.images?.thumbnail ||
    'https://images.unsplash.com/photo-1545241047-6083a3684587?w=500&q=80';

  // Check model3DUrl first, then fallbacks
  const getModelPath = () => {
    if (plant?.model3DUrl) return plant.model3DUrl;
    if (plant?.modelUrl) return plant.modelUrl;
    if (plant?.modelPath) return plant.modelPath;

    const name = plant?.commonName?.toLowerCase() || '';
    if (name.includes('tulsi')) return '/models/tulsi.glb';
    if (name.includes('neem')) return '/models/neem.glb';

    return null;
  };

  const modelPath = getModelPath();

  return (
    <>
      {/* Plant Card Container */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex flex-col justify-between border border-gray-100">
        <div>
          {/* Plant Image Container */}
          <div className="h-48 w-full bg-gray-100 overflow-hidden relative">
            <img
              src={imageSrc}
              alt={plant?.commonName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  'https://images.unsplash.com/photo-1545241047-6083a3684587?w=500&q=80';
              }}
            />
            {plant?.ayushCategory && (
              <span className="absolute top-2 right-2 bg-emerald-800 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-md">
                {plant.ayushCategory}
              </span>
            )}
          </div>

          <div className="p-4">
            <h3 className="text-xl font-bold text-gray-800">{plant?.commonName}</h3>
            <p className="text-sm italic text-emerald-700 font-medium mb-3">
              {plant?.botanicalName}
            </p>

            {plant?.medicinalUses && (
              <div className="flex flex-wrap gap-1 mb-2">
                {(Array.isArray(plant.medicinalUses)
                  ? plant.medicinalUses
                  : [plant.medicinalUses]
                )
                  .slice(0, 3)
                  .map((use, index) => (
                    <span
                      key={index}
                      className="bg-emerald-50 text-emerald-800 text-xs px-2 py-0.5 rounded font-medium border border-emerald-100"
                    >
                      {use}
                    </span>
                  ))}
              </div>
            )}
          </div>
        </div>

        <div className="p-4 pt-0">
          <button
            onClick={() => setShow3DModal(true)}
            className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-medium py-2 rounded-lg transition text-sm flex items-center justify-center gap-2"
          >
            <span>View Details & 3D Model</span>
          </button>
        </div>
      </div>

      {/* Modal View */}
      {show3DModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl">
            <div className="p-4 bg-emerald-900 text-white flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">{plant?.commonName}</h2>
                <p className="text-xs italic text-emerald-200">{plant?.botanicalName}</p>
              </div>
              <button
                onClick={() => setShow3DModal(false)}
                className="text-white hover:bg-emerald-800 rounded-full w-8 h-8 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-4">
              <div className="h-80 bg-gray-900 rounded-xl overflow-hidden relative">
                {modelPath ? (
                  <Plant3DViewer
                    modelUrl={modelPath}
                    plantName={plant?.commonName}
                    plant={plant}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    3D Model not available for this plant.
                  </div>
                )}
              </div>

              {plant?.medicinalUses && (
                <div className="mt-4">
                  <h4 className="font-semibold text-emerald-900 text-sm mb-1.5">
                    Medicinal Uses & Properties:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(plant.medicinalUses)
                      ? plant.medicinalUses
                      : [plant.medicinalUses]
                    ).map((use, i) => (
                      <span
                        key={i}
                        className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-md font-medium"
                      >
                        {use}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlantCard;