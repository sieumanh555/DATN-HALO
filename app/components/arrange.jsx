import { useState } from "react";

export default function DropDown() {
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
      <option value="settings">Sắp xếp theo giá: từ thấp đến cao</option>
      <option value="earnings">Sắp xếp theo giá: từ cao đến thấp</option>
      <option value="signOut">Sắp xếp theo chữ: từ A-Z</option>
      <option value="signOut">Sắp xếp theo chữ: từ Z-A</option>
    </select>
  );
}
