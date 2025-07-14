"use client";

import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { OrbitControls } from "@react-three/drei";

type UIElement = {
  type: string;
  id: number;
};

export default function UIBuilder() {
  const [elements, setElements] = useState<UIElement[]>([]);

  const addButton = () => {
    setElements([...elements, { type: "button", id: Date.now() }]);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar Controls */}
      <div className="w-1/4 p-4 bg-gray-800 text-white">
        <h2 className="text-lg font-bold">UI Elements</h2>
        <button onClick={addButton} className="mt-2 p-2 bg-blue-500 rounded">
          Add Button
        </button>
      </div>

      {/* 3D Workspace */}
      <div className="w-3/4 h-full bg-gray-900">
        <Canvas>
          <OrbitControls />
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 2]} />
          {elements.map((el) => (
            <mesh
              key={el.id}
              position={[Math.random() * 4 - 2, Math.random() * 4 - 2, 0]}
            >
              <boxGeometry args={[0.5, 0.2, 0.1]} />
              <meshStandardMaterial color="blue" />
            </mesh>
          ))}
        </Canvas>
      </div>
    </div>
  );
}
