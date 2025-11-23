import React from 'react';

/**
 * Renders the top navigation bar, including the logo, search, and user actions.
 */
function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo/Title */}
        <div className="flex items-center space-x-2">
          <span className="material-symbols-outlined text-primary-600 text-3xl transform hover:rotate-12 transition-transform duration-300">cloud</span>
          <h1 className="text-2xl font-bold text-gray-900">CloudVault</h1>
        </div>

        {/* Actions/User */}
        <div className="flex items-center space-x-6">
          {/* Search Bar - Daisy UI input styling */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search files..."
              className="pl-10 pr-4 input input-bordered input-primary rounded-full w-64 h-10 transition-all duration-300 hover:shadow-sm"
            />
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">search</span>
          </div>
          
          {/* Notifications Button - Daisy UI button styling */}
          <button className="btn btn-ghost btn-circle">
            <span className="material-symbols-outlined text-gray-700">notifications</span>
          </button>
          
          {/* Profile Button - Daisy UI button styling with custom colors */}
          <div className="relative">
            <button
              className="btn btn-circle bg-primary-100 text-primary-700 font-semibold hover:bg-primary-200"
            >
              JD
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
