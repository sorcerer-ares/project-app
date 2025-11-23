import { useEffect, useState } from "react";

export default function StorageCard({ userId }) {
  const [usage, setUsage] = useState({ used_bytes: 0, limit_bytes: 0 });

  // Convert bytes to human-readable format
  const formatBytes = (bytes) => {
    if (bytes >= 1024 ** 3) {
      return (bytes / (1024 ** 3)).toFixed(2) + " GB";
    } else if (bytes >= 1024 ** 2) {
      return (bytes / (1024 ** 2)).toFixed(2) + " MB";
    } else if (bytes >= 1024) {
      return (bytes / 1024).toFixed(2) + " KB";
    } else {
      return bytes + " B";
    }
  };

  const fetchUsage = async () => {
    try {
      const res = await fetch(`http://localhost/cloud-drive/get_storage.php?user_id=${userId}`);
      const data = await res.json();
      setUsage({
        used_bytes: data.used_bytes,
        limit_bytes: data.limit_bytes,
      });
    } catch (err) {
      console.error("Error fetching storage:", err);
    }
  };

  useEffect(() => {
    fetchUsage();
    const interval = setInterval(fetchUsage, 3000); // Realtime-ish updates
    return () => clearInterval(interval);
  }, []);

  const usedBytes = usage.used_bytes || 0;
  const limitBytes = usage.limit_bytes || 100 * 1024 * 1024; // fallback 100MB
  const percent = limitBytes ? Math.round((usedBytes / limitBytes) * 100) : 0;

  return (
    <div className="px-4 py-2">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        Storage
      </h3>

      <div className="mt-2">
        {/* Top numbers */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            {formatBytes(usedBytes)} of {formatBytes(limitBytes)} used
          </span>
          <span className="text-gray-600">{percent}%</span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
          <div
            className="h-full bg-primary-500 rounded-full transition-all duration-300"
            style={{ width: `${percent}%` }}
          ></div>
        </div>

        {/* Button */}
        <button className="mt-3 w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
          Upgrade Storage
        </button>
      </div>
    </div>
  );
}
