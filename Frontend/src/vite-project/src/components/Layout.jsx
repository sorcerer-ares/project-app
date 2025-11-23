import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

/**
 * Layout Component
 * ----------------
 * Wraps pages with Header, Sidebar, and layout structure.
 * Usage:
 *   <Layout>
 *     <YourPageContent />
 *   </Layout>
 */
const Layout = ({ children }) => {
  return (
    <div id="webcrumbs">
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-1 flex overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
