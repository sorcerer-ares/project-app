import React, { useState } from "react";
import { useFiles } from "../hooks/fetchFiles";
import UploadButton from "../components/UploadButton";
import FileCard from "../components/FileCard";
import FilesTable from "../components/FilesTable";
import EmptyState from "../components/EmptyState";
import { useAuthStore } from "../store/authStore";
import { useFileDownload } from "../hooks/useFileDownload";
import { useDeleteFile } from "../hooks/useDeleteFile";
import StorageCard from "../components/LiveUsage";
import Sidebar from "../components/Sidebar";
import { useToggleStar } from "../hooks/useToggleStar";

const HomePage = () => {

  const authUser = useAuthStore((state) => state.authUser);
  const [open, setOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const { files, loading, fetchFiles } = useFiles();

 const recentFiles = files.slice(-4).reverse();
 const { downloadFile } = useFileDownload();
 const deleteFile = useDeleteFile(fetchFiles);
 const { toggleStar, loading: togglingStar } = useToggleStar(fetchFiles);

  return (
    <div id="webcrumbs">
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
            <div className="flex items-center space-x-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search files..."
                  className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64 transition-all duration-300 hover:shadow-sm"
                />
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">
                  search
                </span>
              </div>
              <button className="rounded-full w-10 h-10 bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors duration-300">
                <span className="material-symbols-outlined text-gray-700">notifications</span>
              </button>
              <div className="relative">
              {/* Profile Button */}
              <button
                onClick={() => setOpen(!open)}
                className="rounded-full w-10 h-10 bg-primary-100 flex items-center justify-center text-primary-700 font-semibold hover:bg-primary-200 transition-colors duration-300"
              >
                JD
              </button>
                {open && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow">
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* ---------------- MAIN LAYOUT ---------------- */}
        <div className="flex-1 flex overflow-hidden">
          {/* ---------------- SIDEBAR ---------------- */}
          <Sidebar authUser={authUser}/>

          {/* ---------------- MAIN CONTENT ---------------- */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">

            {/* 👇 CONDITIONAL RENDERING FOR EMPTY STATE */}
            {files.length === 0 ? (
              <EmptyState/>
            ) : (
              <>
                {/* ---------------- NORMAL HOME UI ---------------- */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">My Files</h2>
                  <p className="text-sm text-gray-500 mt-1">Access and manage your files</p>
                </div>

                {/* ----  existing “Recent files” and “All Files” sections go here ---- */}
                
                {/* ---------------- RECENT FILES ---------------- */}
                <section className="mb-8">
                  <h3 className="text-lg font-medium text-gray-700 mb-4">
                    Recent Files
                  </h3>
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
                          onDownload={()=>downloadFile(file)}
                          onRename={() => console.log("Rename", file.OriginalName)}
                          onDelete={() => deleteFile(file)}
                          starred={file.Starred===1}
                          onToggleStar={() => toggleStar(file.id)}
                        />
                      );
                    })}
                  </div>
                </section>

                {/* ---------------- ALL FILES TABLE ---------------- */}
                <FilesTable files={files} onToggleStar={toggleStar}/>
              </>
            )}
          </main>
        </div>

        {/* ---------------- UPLOAD BUTTON ---------------- */}
        <UploadButton onUploadSuccess={fetchFiles}/>
      </div>
    </div>
  );
};

export default HomePage;