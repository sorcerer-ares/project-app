// src/hooks/useFileDownload.js
import { useAuthStore } from "../store/authStore";

export const useFileDownload = () => {
  const authUser = useAuthStore((state) => state.authUser);

  const downloadFile = (file) => {
    if (!authUser || !authUser._id) {
      console.warn("No user logged in");
      return;
    }

    const url = `http://localhost/cloud-drive/download.php?file_id=${file.id}&user_id=${authUser._id}`;

    // Create a temporary link to trigger download
    const link = document.createElement("a");
    link.href = url;
    link.download = file.OriginalName; // Suggested filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return { downloadFile };
};
