import React from 'react';

/**
 * A reusable card component for displaying a file in the Quick Access section.
 * @param {object} props - Component props
 * @param {string} props.name - File name
 * @param {string} props.icon - Material Symbols icon name
 * @param {string} props.color - Tailwind color class for the icon
 * @param {string} props.modifiedTime - Last modified timestamp
 */
function QuickAccessCard({ name, icon, color, modifiedTime }) {
  return (
    <div
      // Daisy UI 'card' and 'card-compact' replace many utility classes
      className="card card-compact bg-white shadow-sm hover:shadow-md border border-gray-200 group"
    >
      <div className="card-body p-4">
        <div className="flex justify-between items-start mb-4">
          <span className={`material-symbols-outlined text-4xl ${color}`}>{icon}</span> 
          
          {/* Daisy UI 'dropdown' for context menu */}
          <div className="dropdown dropdown-end">
            <button tabIndex={0} role="button" 
                    className="btn btn-ghost btn-sm btn-circle opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-sm">more_vert</span>
            </button>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Download</a></li>
                <li><a>Share</a></li>
                <li><a>Delete</a></li>
            </ul>
          </div>
        </div>
        <h4 className="font-medium text-gray-800">{name}</h4>
        <p className="text-sm text-gray-500 mt-1">Modified {modifiedTime}</p>
      </div>
    </div>
  );
}

export default QuickAccessCard;
