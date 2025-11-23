import React from "react";
import FileActionsMenu from "./vanillaDropDown";

const FilesTable = ({ files, onToggleStar }) => {
  const getFileIcon = (type) => {
    const map = {
      jpg: "image",
      jpeg: "image",
      png: "image",
      pdf: "picture_as_pdf",
      docx: "description",
      pptx: "slideshow",
      xlsx: "calculate",
      default: "insert_drive_file",
    };
    return map[type.toLowerCase()] || map.default;
  };

  return (
    <section className="mb-8">
      <h3 className="text-lg font-medium text-gray-700 mb-4">All Files</h3>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">

        {/* ---- Header ---- */}
        <div className="grid grid-cols-12 bg-gray-50 text-sm text-gray-500 font-medium border-b py-3 px-4">
          <div className="col-span-6">Name</div>
          <div className="col-span-1 text-center">Star</div>
          <div className="col-span-2">Uploaded</div>
          <div className="col-span-2">Size</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        <div className="divide-y">
          {files.map((file) => {
            const type = file.OriginalName.split(".").pop();

            return (
              <div
                key={file.id}
                className="grid grid-cols-12 items-center py-3 px-4 hover:bg-gray-50 transition"
              >
                {/* Name column */}
                <div className="col-span-6 flex items-center space-x-3">
                  <span className="material-symbols-outlined text-gray-400">
                    {getFileIcon(type)}
                  </span>
                  <span className="text-gray-800 font-medium truncate">
                    {file.OriginalName}
                  </span>
                </div>

                {/* Star column */}
                <div className="col-span-1 flex justify-center">
                  <button
                    onClick={() => onToggleStar(file.id)}
                    className={`text-2xl ${
                      file.Starred ? "text-yellow-400" : "text-gray-300"
                    } hover:text-yellow-500 transition`}
                  >
                    <span className="material-symbols-outlined">
                      {file.Starred ? "star" : "star_outline"}
                    </span>
                  </button>
                </div>

                {/* Uploaded column */}
                <div className="col-span-2 text-gray-500 text-sm">
                  {new Date(file.UploadedAt).toLocaleString()}
                </div>

                {/* Size column */}
                <div className="col-span-2 text-gray-500 text-sm">
                  {(file.Size / 1024 / 1024).toFixed(2)} MB
                </div>

                {/* Actions column */}
                <div className="col-span-1 flex justify-end">
                  <FileActionsMenu file={file} />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FilesTable;
