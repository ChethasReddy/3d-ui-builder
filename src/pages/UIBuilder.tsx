"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import BuilderCanvas from "@/components/BuilderCanvas";

export type UIElementType = "button" | "input" | "select" | "textarea";

export default function UIBuilderPage() {
  const [selectedTool, setSelectedTool] = useState<UIElementType | null>(null);

  return (
    <div className="flex h-screen">
      <Sidebar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
      <BuilderCanvas
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
      />
    </div>
  );
}
