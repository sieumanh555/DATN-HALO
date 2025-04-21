"use client";

import {useCallback, useState} from "react";
import debounce from "lodash.debounce";

export default function SearchComponent({onSearch, initialQuery = ""}) {
    const [searchQuery, setSearchQuery] = useState(initialQuery);

    const debouncedSearch = useCallback(
        debounce((query) => onSearch(query), 300),
        [onSearch]
    );

    const handleChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        debouncedSearch(query);
    };

    return (
        <form className="w-full">
            <div className="relative">
                <input
                    type="text"
                    aria-label="Tìm kiếm sản phẩm"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full ps-10 py-2.5"
                    placeholder="Tìm sản phẩm"
                    value={searchQuery}
                    onChange={handleChange}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                        className="w-5 h-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <circle cx="11" cy="11" r="8"/>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                </div>
            </div>
        </form>
    );
}