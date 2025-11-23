import { useState } from "react";

export const useToggleStar = (refreshFiles) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleStar = async (fileId) => {
    if (!fileId) {
      console.error("toggleStar called without fileId");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file_id", fileId);

      const response = await fetch("http://localhost/cloud-drive/star_file.php", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();

      if (data.status !== "success") {
        throw new Error(data.message || "Unable to toggle star.");
      }

      if (refreshFiles) refreshFiles(); // refresh parent list

      return true;
    } catch (err) {
      console.error("Error toggling star:", err);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { toggleStar, loading, error };
};
