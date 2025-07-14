import { UIElementType } from "@/pages/UIBuilder";

interface SidebarProps {
  selectedTool: UIElementType | null;
  setSelectedTool: (tool: UIElementType | null) => void;
}

export default function Sidebar({
  selectedTool,
  setSelectedTool,
}: SidebarProps) {
  return (
    <div className="w-1/4 p-4 bg-gray-800 text-white space-y-3">
      <h2 className="text-lg font-bold mb-2">UI Elements</h2>
      {(["button", "input", "select", "textarea"] as UIElementType[]).map(
        (type) => (
          <button
            key={type}
            onClick={() => setSelectedTool(type)}
            className={`w-full p-2 rounded ${
              selectedTool === type ? "bg-yellow-400 text-black" : "bg-blue-500"
            }`}
          >
            {selectedTool === type ? `Placing ${type}` : `Add ${type}`}
          </button>
        )
      )}
    </div>
  );
}
