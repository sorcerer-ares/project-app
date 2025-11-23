// src/components/EmptyState.jsx
import React from "react";
import UploadButton from "./UploadButton";

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center text-center mt-32">
    <span className="text-9xxl material-symbols-outlined text-black-300 mb-4">
      cloud_upload
    </span>
    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
      Your CloudVault is empty
    </h2>
    <p className="text-gray-500 mb-4">
      Start by uploading your first file using the upload button below 👇
    </p>
    <UploadButton />
  </div>
);

export default EmptyState;
