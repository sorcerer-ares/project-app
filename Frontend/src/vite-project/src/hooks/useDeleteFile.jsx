import { useAuthStore } from "../store/authStore";

export const useDeleteFile = (refreshFiles) => {
  const authUser = useAuthStore(state => state.authUser);

  const deleteFile = async (file) => {
    if (!file) return;
    if (!confirm(`Are you sure you want to delete "${file.OriginalName}"?`)) return;

    try {
      const res = await fetch("http://localhost/cloud-drive/delete_file.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file_id: file.id, user_id: authUser._id })
      });

      const data = await res.json();

      if (data.status === "success") {
        alert(data.message);
        refreshFiles(); // this calls the fetchFiles from HomePage
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting file");
    }
  };

  return deleteFile;
};
