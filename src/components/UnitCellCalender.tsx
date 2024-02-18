import { escape } from "querystring";
import React from "react";
import { useState } from "react";
interface Holiday {
  name: string;
  description: string;
  type: string[];
  date: {
    iso: string;
  };
}

interface DetailsPopupProps {
  holiday: Holiday;
  onClose: () => void;
  isDark: Boolean;
}

const DetailsPopup: React.FC<DetailsPopupProps> = ({
  holiday,
  onClose,
  isDark,
}) => {
  const { name, description, type, date } = holiday;

  return (
    <div className="absolute bg-gray-300/70 inset-0 ">
      <section
        className={` w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] shadow-3xl rounded-lg border-darkinactive p-4 ${
          isDark ? "bg-primaryDark" : "bg-white"
        } `}
      >
        <div className="flex justify-between">
          <h2 className="text-2xl font-medium">{name}</h2>
          <button
            onClick={onClose}
            className="border rounded-lg p-1 px-2 hover:shadow-lg"
          >
            Close
          </button>
        </div>
        <h3 className="text-left font-lium mb-3" > { date.iso } </h3>
        <p className="text-lg text-left my-3" >
       
          {description}
        </p>
        <div className="text-left">
          Tags:{" "}
          {type.map((tag) => (
            <span key={tag} className="border rounded-lg p-1 mx-2" >{tag}</span>
          ))}
        </div>
      </section>
    </div>
  );
};

interface CalenderCellPropvalues {
  holidays: any[];
  isDarkMode: boolean;
  selectedDate: Date | null;
  onCellClick: (date: Date) => void;
  day: number;
  selectedYear: number;
  selectedMonth: number;
}

const UnitCellCalender: React.FC<CalenderCellPropvalues> = ({
  isDarkMode,
  selectedDate,
  onCellClick,
  day,
  selectedYear,
  selectedMonth,
  holidays,
}) => {
  const currentdate = new Date();
  const date = new Date(selectedYear, selectedMonth, day, 6);
  const matchingHolidays = holidays.filter(
    (h) => h.date.iso === date.toISOString().split("T")[0]
  );
  const holidaysUnique = Array.from(
    new Set(matchingHolidays.map((h) => h.name))
  ).map((name) => {
    return matchingHolidays.find((h) => h.name === name);
  });
  const cellStyle = {
    backgroundColor:
      selectedDate && selectedDate.toDateString() === date.toDateString()
        ? isDarkMode
          ? "#0353A4"
          : "#2EC4B6"
        : currentdate.toDateString() === date.toDateString()
        ? isDarkMode
          ? "#006DAA" // Dark mode current date color
          : "#CBF3F0" // Light mode current date color
        : "", // Default background color
    color:
      selectedDate && selectedDate.toDateString() === date.toDateString()
        ? isDarkMode
          ? ""
          : "white"
        : currentdate.toDateString() === date.toDateString()
        ? ""
        : "",
  };

  const selectDate = () => {
    if (day !== 0) {
      onCellClick(date);
    }
  };

  const [showDetails, setShowDetails] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);

  // const DetailsPopup = ({ holiday:any }) => {
  //   const { name, description, type, date } = holiday;
  //  return <div className="fixed bg-gray-300" >
  //     <section className="bg-white" >
  //       <h2> {name} </h2>
  //       <button onClick={() => setShowDetails(false)} > X </button>
  //       <h3> Date: { date.iso }</h3>
  //       <p> Description: {description} </p>
  //       <div> Tags: {
  //         type.map( tag:any => <span> {tag} </span> )
  //         } </div>
  //     </section>
  //   </div>
  // }

  // const handleHolidayClick = holiday:any => {
  //   setShowDetails(true);

  //   setSelectedHoliday(holiday);
  // }
  const handleHolidayClick = (holiday: Holiday) => {
    setShowDetails(true);
    setSelectedHoliday(holiday);
  };

  const closePopup = () => {
    setShowDetails(false);
    setSelectedHoliday(null);
  };

  return (
    <>
      {showDetails && selectedHoliday && (
        <DetailsPopup
          holiday={selectedHoliday}
          onClose={closePopup}
          isDark={isDarkMode}
        />
      )}
      <td
        style={cellStyle}
        onClick={selectDate}
        className={`  md:w-[100px] md:max-w-[100px] md:h-[100px] cursor-pointer border border-gray-600 w-[50px] max-w-[50px] h-[50px] sm:w-[75px] sm:max-w-[75px] sm:h-[75px] 
      xl:w-[150px] xl:max-w-[150px] xl:h-[100px]
      lg:w-[125px] lg:max-w-[125px] lg:h-[100px]  
    ${day === 0 && isDarkMode ? "bg-darkinactive" : ""}
    ${day === 0 && !isDarkMode ? "bg-inactive" : ""}
     
     ${isDarkMode ? "text-white" : "text-gray-900"}`}
      >
        {day !== 0 ? (
          <div className="md:text-[14px] lg:text-md xl:text-[16px] font-medium text-[10px] sm:text-[12px]  ">
            <span className="text-center">{day}</span>
            {holidaysUnique.length > 0 && (
              <div>
                {holidaysUnique.map((holiday, index) => (
                  <p
                    onClick={() => handleHolidayClick(holiday)}
                    key={index}
                    className={`whitespace-nowrap overflow-hidden my-1 text-ellipsis border p-1  rounded-md font-normal mx-1  ${
                      isDarkMode
                        ? "bg-darktableheader border-darkinactive"
                        : "bg-inactive border-orange text-black"
                    } `}
                  >
                    {holiday?.name}
                  </p>
                ))}
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </td>
    </>
  );
};

export default UnitCellCalender;
