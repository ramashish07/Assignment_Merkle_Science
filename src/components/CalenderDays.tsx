import React from "react";
interface CalenderDaysBaseClass {
  isDarkMode: boolean;
}

const CalenderDays: React.FC<CalenderDaysBaseClass> = ({ isDarkMode }) => {
  return (
    <thead>
      <tr
        className={`w-[50px] max-w-[50px] h-[50px] sm:w-[75px] sm:max-w-[75px] sm:h-[50px] 
      md:w-[100px] md:max-w-[100px]
      lg:w-[125px] lg:max-w-[125px]
      xl:w-[150px] xl:max-w-[150px]
      ${isDarkMode ? "bg-darktableheader" : "bg-primary"}`}
      >
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <th
            key={index}
            className={`text-[10px] sm:text-[12px] md:text-[14px] lg:text-sm xl:text-[16px] font-medium border border-gray-600 ${
              isDarkMode ? "text-white" : "text-white"
            }`}
          >
            {day}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default CalenderDays;
