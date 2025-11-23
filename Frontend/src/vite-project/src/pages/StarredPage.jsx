// src/pages/StarredPage.jsx
import React from "react";
import { useFiles } from "../hooks/fetchFiles";
import FileCard from "../components/FileCard";
import FilesTable from "../components/FilesTable";
import EmptyState from "../components/EmptyState";
import Sidebar from "../components/Sidebar";
import { useFileDownload } from "../hooks/useFileDownload";
import { useDeleteFile } from "../hooks/useDeleteFile";
import { useAuthStore } from "../store/authStore";
import UploadButton from "../components/UploadButton";

const StarredPage = () => {
  const authUser = useAuthStore((state) => state.authUser);
  const { files, fetchFiles } = useFiles(); // Fetch all files
  const starredFiles = files.filter((file) => file.Starred); // Only starred
  const { downloadFile } = useFileDownload();
  const deleteFile = useDeleteFile(fetchFiles);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ---------------- HEADER ---------------- */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-primary-600 text-3xl transform hover:rotate-12 transition-transform duration-300">
              cloud
            </span>
            <h1 className="text-2xl font-bold text-gray-900">CloudVault</h1>
          </div>
        </div>
      </header>

      {/* ---------------- MAIN LAYOUT ---------------- */}
      <div className="flex-1 flex overflow-hidden">
        {/* ---------------- SIDEBAR ---------------- */}
        <Sidebar authUser={authUser} />

        {/* ---------------- MAIN CONTENT ---------------- */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Starred Files</h2>
            <p className="text-sm text-gray-500 mt-1">
              Your important files saved here for quick access
            </p>
          </div>

          {starredFiles.length === 0 ? (
            <EmptyState message="No starred files yet!" />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {starredFiles.map((file) => {
                  const ext = file.OriginalName.split(".").pop();
                  return (
                    <FileCard
                      key={file.id}
                      name={file.OriginalName}
                      type={ext}
                      size={`${(file.Size / 1024 / 1024).toFixed(2)} MB`}
                      lastModified={new Date(file.UploadedAt).toLocaleString()}
                      starred={file.Starred}
                      onToggleStar={() => {
                        // you can call your hook for toggling star
                        toggleStar(file.id);
                      }}
                      onDownload={() => downloadFile(file)}
                      onRename={() => console.log("Rename", file.OriginalName)}
                      onDelete={() => deleteFile(file)}
                    />
                  );
                })}
              </div>

              {/* Optional table view */}
              {/* <FilesTable files={starredFiles} /> */}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default StarredPage;
