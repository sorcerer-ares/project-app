// src/components/FileCard.jsx
import React from "react";
import FileActionsMenu from "./vanillaDropDown";

const FileCard = ({
  name,
  type,
  size,
  lastModified,
  starred,
  onToggleStar,
  onDownload,
  onRename,
  onDelete
}) => {
  const iconMap = {
    jpg: "image",
    jpeg: "image",
    png: "image",
    pdf: "picture_as_pdf",
    docx: "description",
    pptx: "slideshow",
    xlsx: "calculate",
    default: "insert_drive_file",
  };

  const colorMap = {
    jpg: "text-pink-500",
    jpeg: "text-pink-500",
    png: "text-pink-500",
    pdf: "text-red-500",
    docx: "text-blue-500",
    pptx: "text-orange-500",
    xlsx: "text-green-500",
    default: "text-gray-400",
  };

  const icon = iconMap[type.toLowerCase()] || iconMap.default;
  const color = colorMap[type.toLowerCase()] || colorMap.default;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-md transition-shadow duration-300 group relative">
      <div className="flex items-start justify-between mb-4">
        <span className={`material-symbols-outlined text-4xl ${color}`}>
          {icon}
        </span>

        {/* Actions menu (top-right) */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute top-3 right-3">
          <FileActionsMenu
            onRename={onRename}
            onDownload={onDownload}
            onDelete={onDelete}
          />
        </div>
      </div>

      <h4 className="font-medium text-gray-800 truncate">{name}</h4>
      <p className="text-sm text-gray-500">{size}</p>
      <p className="text-xs text-gray-400 mt-1">Modified {lastModified}</p>

      {/* Star button (bottom-right) */}
      <button
        onClick={onToggleStar}
        className={`absolute bottom-3 right-3 text-2xl ${
          starred ? "text-yellow-400" : "text-gray-300"
        } hover:text-yellow-500 transition-colors duration-200`}
      >
        <span className="material-symbols-outlined">
          {starred ? "star" : "star_outline"}
        </span>
      </button>
    </div>
  );
};

export default FileCard;
