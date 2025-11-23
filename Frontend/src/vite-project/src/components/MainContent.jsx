import React from 'react';
import QuickAccessCard from './QuickAccessCard';
import RecentFilesTable from './RecentFilesTable';

// Mock data for Quick Access
const quickAccessFiles = [
  { name: 'Project Proposal.docx', icon: 'description', color: 'text-blue-500', modifiedTime: '2 hours ago' },
  { name: 'Budget 2023.xlsx', icon: 'calculate', color: 'text-green-500', modifiedTime: 'yesterday' },
  { name: 'Presentation.pptx', icon: 'slideshow', color: 'text-red-500', modifiedTime: '3 days ago' },
  { name: 'Team Photo.jpg', icon: 'image', color: 'text-purple-500', modifiedTime: '1 week ago' },
];

/**
 * Renders the main dashboard area, containing Quick Access cards and the Recent Files table.
 */
function MainContent() {
  return (
    <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">My Files</h2>
        <p className="text-sm text-gray-500 mt-1">Access and manage your files</p>
      </div>

      {/* Quick Access Section */}
      <section className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Quick Access</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {quickAccessFiles.map((file) => (
            <QuickAccessCard key={file.name} {...file} />
          ))}
        </div>
      </section>

      {/* Recent Files Table Section */}
      <RecentFilesTable />
    </main>
  );
}

export default MainContent;
