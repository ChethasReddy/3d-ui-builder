"use client";

import { Text } from "@react-three/drei";
import DraggableBox from "@/components/DraggableBox";
import { UIElement } from "@/components/BuilderCanvas";

interface ElementMeshProps {
  element: UIElement;
  onUpdatePosition: (pos: [number, number, number]) => void;
  onDelete: () => void;
}

export default function ElementMesh({
  element,
  onUpdatePosition,
  onDelete,
}: ElementMeshProps) {
  const { type, position } = element;

  const colorMap: Record<string, string> = {
    button: "blue",
    input: "white",
    select: "lightgreen",
    textarea: "#E6E6FA",
  };

  const sizeMap: Record<string, [number, number, number]> = {
    button: [0.5, 0.2, 0.1],
    input: [1, 0.2, 0.05],
    select: [1, 0.2, 0.05],
    textarea: [1.5, 0.8, 0.05],
  };

  return (
    <DraggableBox position={position} onDrag={onUpdatePosition}>
      <>
        <Text
          position={[0, 0.3, 0]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="bottom"
        >
          {type.toUpperCase()}
        </Text>

        <mesh onDoubleClick={onDelete}>
          <boxGeometry args={sizeMap[type]} />
          <meshStandardMaterial color={colorMap[type]} />
        </mesh>
      </>
    </DraggableBox>
  );
}
