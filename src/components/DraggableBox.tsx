"use client";

import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

export interface DraggableBoxProps {
  children: React.ReactNode;
  position: [number, number, number];
  onDrag: (newPos: [number, number, number]) => void;
}

export default function DraggableBox({
  children,
  position,
  onDrag,
}: DraggableBoxProps) {
  const ref = useRef<THREE.Group>(null);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState<[number, number, number]>([0, 0, 0]);

  useEffect(() => {
    if (ref.current) {
      ref.current.position.set(...position);
    }
  }, [position]);

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    setDragging(true);
    e.target.setPointerCapture(e.pointerId);

    const point = e.point;
    const pos = ref.current?.position;
    if (pos) {
      setOffset([point.x - pos.x, point.y - pos.y, point.z - pos.z]);
    }
  };

  const handlePointerMove = (e: any) => {
    if (!dragging || !ref.current) return;
    e.stopPropagation();
    const point = e.point;
    const newPos: [number, number, number] = [
      point.x - offset[0],
      point.y - offset[1],
      point.z - offset[2],
    ];
    ref.current.position.set(...newPos);
    onDrag(newPos);
  };

  const handlePointerUp = (e: any) => {
    e.stopPropagation();
    setDragging(false);
    e.target.releasePointerCapture(e.pointerId);
  };

  return (
    <group
      ref={ref}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {children}
    </group>
  );
}
