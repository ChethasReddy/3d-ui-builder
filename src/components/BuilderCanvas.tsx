import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ElementMesh from "@/components/ElementMesh";
import { UIElementType } from "@/pages/UIBuilder";

export type UIElement = {
  id: number;
  type: UIElementType;
  position: [number, number, number];
};

interface BuilderCanvasProps {
  selectedTool: UIElementType | null;
  setSelectedTool: (tool: UIElementType | null) => void;
}

export default function BuilderCanvas({
  selectedTool,
  setSelectedTool,
}: BuilderCanvasProps) {
  const [elements, setElements] = useState<UIElement[]>([]);

  const handlePlaceElement = (
    type: UIElementType,
    point: [number, number, number]
  ) => {
    setElements((prev) => [
      ...prev,
      {
        id: Date.now(),
        type,
        position: point,
      },
    ]);
    setSelectedTool(null);
  };

  const updateElementPosition = (
    id: number,
    newPos: [number, number, number]
  ) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, position: newPos } : el))
    );
  };

  const deleteElement = (id: number) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
  };

  return (
    <div className="w-3/4 h-full bg-gray-900">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <OrbitControls enableRotate enablePan enableZoom />
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />

        {/* Click-to-place layer */}
        <mesh
          onClick={(e) => {
            if (!selectedTool) return;
            const point = e.point;
            handlePlaceElement(selectedTool, [point.x, point.y, point.z]);
          }}
        >
          <planeGeometry args={[20, 20]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>

        {/* Render elements */}
        {elements.map((el) => (
          <ElementMesh
            key={el.id}
            element={el}
            onUpdatePosition={(pos) => updateElementPosition(el.id, pos)}
            onDelete={() => deleteElement(el.id)}
          />
        ))}
      </Canvas>
    </div>
  );
}
