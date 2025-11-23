import React from "react";
import { useFiles } from "../hooks/fetchFiles";
import FileCard from "../components/FileCard";
import EmptyState from "../components/EmptyState";
import { useFileDownload } from "../hooks/useFileDownload";
import { useDeleteFile } from "../hooks/useDeleteFile";
import Sidebar from "../components/Sidebar";
import { useAuthStore } from "../store/authStore";

const RecentPage = () => {
  const authUser = useAuthStore((state) => state.authUser);
  const { files, fetchFiles } = useFiles();
  const recentFiles = files.slice(-4).reverse();
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
          {/* Optional: search, notifications, profile as in HomePage */}
        </div>
      </header>

      {/* ---------------- MAIN LAYOUT ---------------- */}
      <div className="flex-1 flex overflow-hidden">
        {/* ---------------- SIDEBAR ---------------- */}
        <Sidebar authUser={authUser} />

        {/* ---------------- MAIN CONTENT ---------------- */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
          {recentFiles.length === 0 ? (
            <EmptyState message="No recent files" />
          ) : (
            <>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Recent Files
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {recentFiles.map((file) => {
                  const ext = file.OriginalName.split(".").pop();
                  return (
                    <FileCard
                      key={file.id}
                      name={file.OriginalName}
                      type={ext}
                      size={`${(file.Size / 1024 / 1024).toFixed(2)} MB`}
                      lastModified={new Date(file.UploadedAt).toLocaleString()}
                      onDownload={() => downloadFile(file)}
                      onRename={() => console.log("Rename", file.OriginalName)}
                      onDelete={() => deleteFile(file)}
                    />
                  );
                })}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default RecentPage;
