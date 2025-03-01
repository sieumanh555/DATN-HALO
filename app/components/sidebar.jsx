// components/Layout.js
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown

  return (
    <div>
      {/* Sidebar */}
      <aside
        id="sidebar-multi-level-sidebar"
        className={`z-40 w--full min-h-auto transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium text-[24px]">
            {/* Dashboard Link */}
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-900 font-medium hover:bg-gray-100 dark:hover:bg-gradient-to-r from-cyan-500 via-gray-800/50 to-blue-400 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Dashboard</span>
              </a>
            </li>

            {/* Dropdown */}
            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 font-medium transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-gray-900 dark:hover:bg-gradient-to-r from-cyan-500 via-gray-800/50 to-blue-400"
                aria-controls="dropdown-example"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown
              >
                <svg
                  className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 21"
                >
                  <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                </svg>
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-[24px]">
                  E-commerce
                </span>
                <svg
                  className={`w-3 h-3 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {/* Dropdown Items */}
              <ul
                id="dropdown-example"
                className={`${
                  isDropdownOpen ? "block" : "hidden"
                } py-2 space-y-2`}
              >
                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 gap-5 text-gray-900 font-medium transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-gray-900 dark:hover:bg-gradient-to-r from-cyan-500 via-gray-800/50 to-blue-400"
                  >
                    <FontAwesomeIcon className="text-[12px] text-gray-950" icon={faCircle}/>
                    <span>Products</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
