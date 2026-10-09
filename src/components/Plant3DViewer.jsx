import React, { useEffect } from 'react';

const Plant3DViewer = ({ modelUrl, modelPath, plantName, plant }) => {
  useEffect(() => {
    import('aframe');
  }, []);

  // Normalize prop values regardless of how they are passed in
  const activeModelUrl = modelUrl || modelPath || plant?.model3DUrl || plant?.modelUrl;
  const activePlantName = plantName || plant?.commonName || 'Plant';

  return (
    <div className="w-full h-80 bg-slate-900 rounded-xl overflow-hidden relative shadow-inner">
      {/* Badge Overlay */}
      <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur text-white text-xs px-3 py-1 rounded-full border border-gray-700">
        3D/VR View: {activePlantName}
      </div>

      <a-scene embedded style={{ width: '100%', height: '100%' }}>
        <a-sky color="#0f172a"></a-sky>

        {/* Environmental Lighting */}
        <a-light type="ambient" color="#ffffff" intensity="1.4"></a-light>
        <a-light type="directional" position="-2 4 2" intensity="1.2" cast-shadow="true"></a-light>

        {/* Continuous Rotating 3D Object Group */}
        <a-entity
          position="0 -0.6 -2"
          animation="property: rotation; to: 0 360 0; loop: true; dur: 16000; easing: linear"
        >
          {activeModelUrl ? (
            /* Render actual custom .glb model if model URL is available */
            <a-entity 
              gltf-model={activeModelUrl} 
              scale="1 1 1"
              position="0 0 0"
            ></a-entity>
          ) : (
            /* Fallback if model URL is missing */
            <a-entity>
              <a-cylinder position="0 0 0" radius-top="0.3" radius-bottom="0.2" height="0.4" color="#8b5cf6"></a-cylinder>
              <a-cylinder position="0 0.2 0" radius="0.31" height="0.05" color="#7c3aed"></a-cylinder>
              <a-cylinder position="0 0.5 0" radius="0.03" height="0.6" color="#15803d"></a-cylinder>
              <a-sphere position="0.2 0.6 0" radius="0.15" scale="1 0.2 2" rotation="0 30 30" color="#22c55e"></a-sphere>
              <a-sphere position="-0.2 0.5 0" radius="0.15" scale="1 0.2 2" rotation="0 -30 -30" color="#16a34a"></a-sphere>
            </a-entity>
          )}
        </a-entity>

        <a-camera position="0 0.5 0">
          <a-cursor color="#22c55e"></a-cursor>
        </a-camera>
      </a-scene>
    </div>
  );
};

export default Plant3DViewer;