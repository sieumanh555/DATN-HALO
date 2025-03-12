import { useState } from "react";

export default function CategoryPro() {
    const [selectedOption, setSelectedOption] = useState("");

    // Handle option change
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <select
            value={selectedOption}
            onChange={handleChange}
            className="text-gray-900 bg-gray-50 border-2 border-gray-900/40 focus:ring-4 focus:ring-blue-300
      font-medium rounded-lg text-sm px-4 py-3 dark:bg-gray-50 dark:focus:ring-gray-800"
        >
            <option value="" disabled hidden>Tùy chọn</option>
            <option value="lowToHigh">Tùy chọn</option>
            <option value="settings">Giày Nam</option>
            <option value="earnings">Giày Nữ</option>
            <option value="earnings">Phụ kiện</option>
        </select>
    );
}