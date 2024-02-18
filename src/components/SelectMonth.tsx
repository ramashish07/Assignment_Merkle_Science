import React from "react";

interface SelectMonthProps {
  selectedMonth: number;
  onMonthChange: (month: number) => void;
  isDarkMode: boolean;
}

const SelectMonth: React.FC<SelectMonthProps> = ({
  selectedMonth,
  onMonthChange,
  isDarkMode,
}) => {
  return (
    <div className="max-sm:mb-2">
      <label
        htmlFor="month"
        className={`mr-2 font-medium text-lg ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Month:
      </label>
      <select
        id="month"
        onChange={(e) => onMonthChange(parseInt(e.target.value, 10))}
        value={selectedMonth}
        className={`p-2 rounded-md ${
          isDarkMode
            ? "bg-gray-800 text-white dark-mode-scroll"
            : "bg-stroke text-black border border-primary"
        }`}
      >
        {Array.from({ length: 12 }, (_, index) => (
          <option key={index} value={index}>
            {new Date(2000, index, 1).toLocaleString("default", {
              month: "long",
            })}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectMonth;
