import React from 'react'
import "./HomePage.css";
import DropDown from '../components/DropDown';
import UploadButton from '../components/UploadButton';
import FileActionsMenu from '../components/vanillaDropDown';



const HomePage = () => {
const files =[]
  return (
    <div id="webcrumbs">
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="material-symbols-outlined text-primary-600 text-3xl transform hover:rotate-12 transition-transform duration-300">
                cloud
              </span>
              <h1 className="text-2xl font-bold text-gray-900">CloudVault</h1>
            </div>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search files..."
                  className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64 transition-all duration-300 hover:shadow-sm"
                />
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">
                  search
                </span>
              </div>
              <button className="rounded-full w-10 h-10 bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors duration-300">
                <span className="material-symbols-outlined text-gray-700">notifications</span>
              </button>
              <div className="relative">
                <button className="rounded-full w-10 h-10 bg-primary-100 flex items-center justify-center text-primary-700 font-semibold hover:bg-primary-200 transition-colors duration-300">
                  JD
                </button>
              </div>
            </div>
          </div>
        </header>
        <div className="flex-1 flex overflow-hidden">
          <aside className="w-64 bg-white shadow-sm md:block">
            <nav className="p-4 space-y-1">
              <a
                href="#"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg bg-gray-100">
                <span className="material-symbols-outlined">folder</span>
                <span>My Files</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <span className="material-symbols-outlined">star</span>
                <span>Starred</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <span className="material-symbols-outlined">people</span>
                <span>Shared</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <span className="material-symbols-outlined">history</span>
                <span>Recent</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <span className="material-symbols-outlined">delete</span>
                <span>Trash</span>
              </a>
              <hr className="my-4" />
              <div className="px-4 py-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Storage
                </h3>
                <div className="mt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">6.5 GB of 15 GB used</span>
                    <span className="text-gray-600">43%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                    <div className="h-full bg-primary-500 rounded-full"
                      style={{ width: '43%' }}
                    ></div>
                  </div>
                  <button className="mt-3 w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                    Upgrade Storage
                  </button>
                </div>
              </div>
            </nav>
          </aside>
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800">My Files</h2>
              <p className="text-sm text-gray-500 mt-1">Access and manage your files</p>
            </div>




<section className="mb-8">
  <h3 className="text-lg font-medium text-gray-700 mb-4">Recent files</h3>

  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">

  {/* Card 1 */}

<div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-md transition-shadow duration-300 group relative">
  <div className="flex items-start justify-between mb-4">
    <span className="material-symbols-outlined text-4xl text-red-500">
      slideshow
    </span>
    <div className="p-10">
    <div className="mt-4 space-y-4">
    </div>
    </div>

    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute top-3 right-3">
      <FileActionsMenu
        onRename={() => console.log("Rename Presentation.pptx")}
        onDownload={() => console.log("Download Presentation.pptx")}
        onDelete={() => console.log("Delete Presentation.pptx")}
      />
    </div>
  </div>

  <h4 className="font-medium text-gray-800">Presentation.pptx</h4>
  <p className="text-sm text-gray-500 mt-1">Modified 3 days ago</p>
</div>


  {/* Card 2 */}
 
<div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-md transition-shadow duration-300 group relative">
  <div className="flex items-start justify-between mb-4">
    <span className="material-symbols-outlined text-4xl text-red-500">
      slideshow
    </span>
    <div className="p-10">
    <div className="mt-4 space-y-4">
    </div>
    </div>

    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute top-3 right-3">
      <FileActionsMenu
        onRename={() => console.log("Rename Presentation.pptx")}
        onDownload={() => console.log("Download Presentation.pptx")}
        onDelete={() => console.log("Delete Presentation.pptx")}
      />
    </div>
  </div>

  <h4 className="font-medium text-gray-800">Presentation.pptx</h4>
  <p className="text-sm text-gray-500 mt-1">Modified 3 days ago</p>
</div>


  {/* Card 3 */}

<div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-md transition-shadow duration-300 group relative">
  <div className="flex items-start justify-between mb-4">
    <span className="material-symbols-outlined text-4xl text-red-500">
      slideshow
    </span>
    <div className="p-10">
    <div className="mt-4 space-y-4">
    </div>
    </div>

    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute top-3 right-3">
      <FileActionsMenu
        onRename={() => console.log("Rename Presentation.pptx")}
        onDownload={() => console.log("Download Presentation.pptx")}
        onDelete={() => console.log("Delete Presentation.pptx")}
      />
    </div>
  </div>

  <h4 className="font-medium text-gray-800">Presentation.pptx</h4>
  <p className="text-sm text-gray-500 mt-1">Modified 3 days ago</p>
</div>



  {/* Card 4 */}
  
<div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-md transition-shadow duration-300 group relative">
  <div className="flex items-start justify-between mb-4">
    <span className="material-symbols-outlined text-4xl text-red-500">
      slideshow
    </span>
    <div className="p-10">
    <div className="mt-4 space-y-4">
    </div>
    </div>

    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute top-3 right-3">
      <FileActionsMenu
        onRename={() => console.log("Rename Presentation.pptx")}
        onDownload={() => console.log("Download Presentation.pptx")}
        onDelete={() => console.log("Delete Presentation.pptx")}
      />
    </div>
  </div>

  <h4 className="font-medium text-gray-800">Presentation.pptx</h4>
  <p className="text-sm text-gray-500 mt-1">Modified 3 days ago</p>
</div>

</div>

</section>

            <section className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-700">All Files</h3>
                <div className="flex space-x-2">
                  <button
                    className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="material-symbols-outlined text-sm mr-1">sort</span>
                    Sort
                  </button>
                  <button
                    className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="material-symbols-outlined text-sm mr-1">filter_list</span>
                    Filter
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div
                  className="grid grid-cols-12 text-sm font-medium text-gray-500 border-b border-gray-200 bg-gray-50 py-3 px-4"
                >
                  <div className="col-span-5 md:col-span-6">Name</div>
                  <div className="col-span-4 md:col-span-3">Last Modified</div>
                  <div className="col-span-2 md:col-span-2">Size</div>
                  <div className="col-span-1">Actions</div>
                </div>
                <div className="divide-y divide-gray-200">
                  <div
                    className="grid grid-cols-12 items-center py-3 px-4 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="col-span-5 md:col-span-6 flex items-center">
                      <span className="material-symbols-outlined text-blue-500 mr-3">
                        description
                      </span>
                      <span className="font-medium text-gray-800">Project Proposal.docx</span>
                    </div>
                    <div className="col-span-4 md:col-span-3 text-gray-500 text-sm">
                      2 hours ago
                    </div>
                    <div className="col-span-2 md:col-span-2 text-gray-500 text-sm">
                      256 KB
                    </div>
                    <div className="col-span-1">
                      <button
                        className="rounded-full w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-100"
                      >
                        <span className="material-symbols-outlined text-sm">more_vert</span>
                      </button>
                    </div>
                  </div>
                  <div
                    className="grid grid-cols-12 items-center py-3 px-4 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="col-span-5 md:col-span-6 flex items-center">
                      <span className="material-symbols-outlined text-green-500 mr-3">
                        calculate
                      </span>
                      <span className="font-medium text-gray-800">Budget 2023.xlsx</span>
                    </div>
                    <div className="col-span-4 md:col-span-3 text-gray-500 text-sm">
                      Yesterday
                    </div>
                    <div className="col-span-2 md:col-span-2 text-gray-500 text-sm">
                      1.2 MB
                    </div>
                    <div className="col-span-1">
                      <button
                        className="rounded-full w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-100"
                      >
                        <span className="material-symbols-outlined text-sm">more_vert</span>
                      </button>
                    </div>
                  </div>
                  <div
                    className="grid grid-cols-12 items-center py-3 px-4 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="col-span-5 md:col-span-6 flex items-center">
                      <span className="material-symbols-outlined text-blue-500 mr-3">
                        slideshow
                      </span>
                      <span className="font-medium text-gray-800">Presentation.pptx</span>
                    </div>
                    <div className="col-span-4 md:col-span-3 text-gray-500 text-sm">
                      3 days ago
                    </div>
                    <div className="col-span-2 md:col-span-2 text-gray-500 text-sm">
                      4.5 MB
                    </div>
                    <div className="col-span-1">
                      <button
                        className="rounded-full w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-100"
                      >
                        <span className="material-symbols-outlined text-sm">more_vert</span>
                      </button>
                    </div>
                  </div>
                  <div
                    className="grid grid-cols-12 items-center py-3 px-4 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="col-span-5 md:col-span-6 flex items-center">
                      <span className="material-symbols-outlined text-purple-500 mr-3">
                        image
                      </span>
                      <span className="font-medium text-gray-800">Team Photo.jpg</span>
                    </div>
                    <div className="col-span-4 md:col-span-3 text-gray-500 text-sm">
                      1 week ago
                    </div>
                    <div className="col-span-2 md:col-span-2 text-gray-500 text-sm">
                      2.3 MB
                    </div>
                    <div className="col-span-1">
                      <button
                        className="rounded-full w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-100"
                      >
                        <span className="material-symbols-outlined text-sm">more_vert</span>
                      </button>
                    </div>
                  </div>
                  <div
                    className="grid grid-cols-12 items-center py-3 px-4 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="col-span-5 md:col-span-6 flex items-center">
                      <span className="material-symbols-outlined text-yellow-500 mr-3">
                        folder
                      </span>
                      <span className="font-medium text-gray-800">Project Assets</span>
                    </div>
                    <div className="col-span-4 md:col-span-3 text-gray-500 text-sm">
                      2 weeks ago
                    </div>
                    <div className="col-span-2 md:col-span-2 text-gray-500 text-sm">
                      Folder
                    </div>
                    <div className="col-span-1">
                      <button
                        className="rounded-full w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-100"
                      >
                        <span className="material-symbols-outlined text-sm">more_vert</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      <div>

</div>
  <UploadButton/>


      </div>
    </div>
  );
};

export default HomePage


// import React from 'react';
// import Sidebar from '../components/Sidebar'; // Import the new Sidebar component
// import QuickAccessCard from '../components/QuickAccessCard'; // Import the new Card component
// import RecentFilesTable from '../components/RecentFilesTable'; // Import the new Table component
// import "./Homepage.css"; // Your original CSS import
// import Header from '../components/Header';

// // Mock data for Quick Access
// const quickAccessData = [
//   { name: 'Project Proposal.docx', modified: '2 hours ago', icon: 'description', color: 'blue' },
//   { name: 'Budget 2023.xlsx', modified: 'yesterday', icon: 'calculate', color: 'green' },
//   { name: 'Presentation.pptx', modified: '3 days ago', icon: 'slideshow', color: 'red' },
//   { name: 'Team Photo.jpg', modified: '1 week ago', icon: 'image', color: 'purple' },
// ];

// const HomePage = () => {
//   return (
//     // The top-level container structure remains the same
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       {/* 1. Header Component */}
//       <Header />
      
//       <div className="flex-1 flex overflow-hidden">
//         {/* 2. Sidebar Component */}
//         <Sidebar />
        
//         {/* Main Content Area */}
//         <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
          
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold text-gray-800">My Files</h2>
//             <p className="text-sm text-gray-500 mt-1">Access and manage your files</p>
//           </div>
          
//           {/* Quick Access Section */}
//           <section className="mb-8">
//             <h3 className="text-lg font-medium text-gray-700 mb-4">Quick Access</h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
//               {/* 3. Quick Access Cards (map over data) */}
//               {quickAccessData.map((item, index) => (
//                 <QuickAccessCard 
//                   key={index}
//                   name={item.name}
//                   modified={item.modified}
//                   icon={item.icon}
//                   color={item.color}
//                 />
//               ))}
//             </div>
//           </section>
          
//           {/* 4. Recent Files Table Component */}
//           <RecentFilesTable />
          
//         </main>
//       </div> 
      
//       {/* Fixed Upload Button */}
//       <button className="fixed bottom-8 right-8 bg-primary-600 text-white rounded-full shadow-lg p-4 hover:bg-primary-700 transition-colors duration-300 flex items-center justify-center group">
//         <span className="material-symbols-outlined">upload</span> 
//         <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-in-out whitespace-nowrap">Upload</span>
//       </button>
      
//     </div>
//   )
// }

// export default HomePage