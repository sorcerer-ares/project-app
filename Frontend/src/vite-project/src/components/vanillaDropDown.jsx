import { useState, useRef, useEffect } from "react";

export default function FileActionsMenu({ onRename, onDownload, onDelete }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // Close menu when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Three dots button */}
      <button onClick={() => setOpen(!open)} className="p-2 hover:bg-gray-100 rounded-full transition">
        ⋮
      </button>

      {/* Dropdown */}
      <div style={{zIndex: 9999}}
      className={`absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border transform transition-all duration-2 origin-top-right ${open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none z-index"}`}>
        <button onClick={onRename} className="w-full text-left px-4 py-2 hover:bg-gray-100 transition">
            Rename
        </button>
        <button onClick={onDownload} className="w-full text-left px-4 py-2 hover:bg-gray-100 transition">
           Download
        </button>
        <button onClick={onDelete} className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 transition">
           Delete
        </button>
      </div>
    </div>
  );
}
