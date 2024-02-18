interface SelectYearBaseInterface {
  selectedYear: number;
  onYearChange: (year: number) => void;
  isDarkMode: boolean;
}

const SelectYear: React.FC<SelectYearBaseInterface> = ({
  selectedYear,
  onYearChange,
  isDarkMode,
}) => {
  const startYear = 1930;
  const endYear = 2030;

  return (
    <div className="max-sm:mb-2">
      <label
        htmlFor="year"
        className={`mr-2 font-medium text-lg ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Year:
      </label>
      <select
        id="year"
        onChange={(e) => onYearChange(parseInt(e.target.value, 10))}
        value={selectedYear}
        className={`p-2 px-3 rounded-md ${
          isDarkMode
            ? "bg-gray-800 text-white dark-mode-scroll"
            : "bg-stroke text-black border border-primary"
        }`}
      >
        {Array.from({ length: endYear - startYear + 1 }, (_, index) => (
          <option key={index} value={startYear + index}>
            {startYear + index}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectYear;
