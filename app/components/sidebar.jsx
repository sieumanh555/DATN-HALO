// components/Layout.js
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";


export default function Sidebar({ }) {
    const [isSidebarOpen] = useState(false);
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
                    <ul className="space-y-2 font-medium text-sm">
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gradient-to-r from-cyan-500 via-gray-800/50 to-blue-400 group"
                            >
                                <span className="ms-3">Nổi bật</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gradient-to-r from-cyan-500 via-gray-800/50 to-blue-400 group"
                            >
                                <span className="ms-3">Bán chạy</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gradient-to-r from-cyan-500 via-gray-800/50 to-blue-400 group"
                            >
                                <span className="ms-3">Ưu đãi</span>
                            </a>
                        </li>
                    </ul>

                </div>
            </aside>
        </div>
    );
}