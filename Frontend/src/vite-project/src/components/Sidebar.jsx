
import { NavLink } from "react-router-dom";
import StorageCard from "./LiveUsage";

export default function Sidebar({ authUser }) {
  const links = [
    { name: "My Files", icon: "folder", to: "/" },
    { name: "Starred", icon: "star", to: "/starred" },
    { name: "Shared", icon: "people", to: "/shared" },
    { name: "Recent", icon: "history", to: "/recent" },
    { name: "Trash", icon: "delete", to: "/trash" },
  ];

  return (
    <aside className="w-64 bg-white shadow-sm md:block">
      <nav className="p-4 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 ${
                isActive ? "bg-gray-100 font-semibold" : "hover:bg-gray-100"
              }`
            }
          >
            <span className="material-symbols-outlined">{link.icon}</span>
            <span>{link.name}</span>
          </NavLink>
        ))}
        <hr className="my-4" />
        <StorageCard userId={authUser._id} />
      </nav>
    </aside>
  );
}
