"use client";

import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

export type UIElement = {
  id: number;
  type: "button" | "slider" | "text";
  position: [number, number, number];
};

export default function DraggableBox({
  element,
  onDrag,
}: {
  element: UIElement;
  onDrag: (id: number, position: [number, number, number]) => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const { camera, mouse } = useThree();
  const plane = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
  const offset = useRef(new THREE.Vector3());
  const raycaster = new THREE.Raycaster();
  const isDragging = useRef(false);

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    const intersect = new THREE.Vector3();
    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(plane.current, intersect);
    offset.current.subVectors(ref.current!.position, intersect);
    isDragging.current = true;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  useFrame(({ mouse }) => {
    if (isDragging.current) {
      const intersect = new THREE.Vector3();
      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(plane.current, intersect);
      const newPos = intersect.add(offset.current);
      ref.current!.position.copy(newPos);
      onDrag(element.id, [newPos.x, newPos.y, 0]);
    }
  });

  const geometry = {
    button: <boxGeometry args={[0.5, 0.2, 0.1]} />,
    slider: <boxGeometry args={[0.8, 0.1, 0.1]} />,
    text: <boxGeometry args={[0.6, 0.3, 0.1]} />,
  }[element.type];

  const color = {
    button: "blue",
    slider: "green",
    text: "red",
  }[element.type];

  return (
    <mesh
      ref={ref}
      position={element.position}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {geometry}
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
