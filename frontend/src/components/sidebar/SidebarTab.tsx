"use client";

interface SidebarTabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export default function SidebarTab({ label, isActive, onClick }: SidebarTabProps) {
  return (
    <button 
      onClick={onClick}
      className={`flex-1 py-3 text-sm font-medium 
        ${isActive 
          ? "text-blue-600 border-b-2 border-blue-600" 
          : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
        }`}
    >
      {label}
    </button>
  );
}
