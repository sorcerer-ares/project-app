import axios from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";

export default function UploadButton({ onUploadSuccess }) {
  const authUser = useAuthStore((state) => state.authUser);
  console.log(authUser);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", authUser._id);

    const loadingToast = toast.loading("Uploading file...");

    try {
      const res = await axios.post(
        "http://localhost/cloud-drive/add_file.php",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.dismiss(loadingToast);

      if (res.data.status === "success") {
        toast.success("✅ File uploaded successfully!");
        console.log("File data:", res.data.file);

        // 🔹 Notify parent to refresh the file list
        if (onUploadSuccess) {
          onUploadSuccess(res.data.file);
        }

      } else {
        toast.error("❌ Upload failed: " + res.data.message);
        console.error("PHP error:", res.data);
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("❌ Upload failed (network error).");
      console.error("Axios/network error:", err);
    } finally {
      e.target.value = ""; // Reset input so the same file can be uploaded again
    }
  };

  return (
    <label
      htmlFor="file-upload"
      className="fixed bottom-8 right-8 bg-primary-600 text-white rounded-full shadow-lg p-4 hover:bg-primary-700 transition-colors duration-300 flex items-center justify-center group cursor-pointer"
    >
      <span className="material-symbols-outlined">upload</span>
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-in-out whitespace-nowrap">
        Upload
      </span>

      <input
        id="file-upload"
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />
    </label>
  );
}
