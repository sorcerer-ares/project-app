import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";

export const useFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const authUser = useAuthStore((state) => state.authUser);

  const fetchFiles = async () => {
    try {
      if (!authUser || !authUser._id) {
        console.warn("No user found in auth store");
        setFiles([]);
        setLoading(false);
        return;
      }

      const res = await fetch(
        `http://localhost/cloud-drive/get_files.php?user_id=${authUser._id}`
      );
      const data = await res.json();

      if (data.status === "success" && Array.isArray(data.files)) {
        setFiles(data.files);
      } else {
        setFiles([]);
      }
    } catch (err) {
      console.error("Error fetching files:", err);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [authUser]);

  return { files, loading, fetchFiles };
};
