import React, { useEffect } from "react";
import "./App.css";
import useCalendar from "./hooks/useCalendar";
import SelectYear from "./components/SelectYear";
import SelectMonth from "./components/SelectMonth";
import SelectCountry from "./components/SelectCountry";
import UnitCellCalender from "./components/UnitCellCalender";
import CalenderDays from "./components/CalenderDays";
import { countries } from "./constants/countries";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App: React.FC = () => {
  const {
    yearChangeHandlerSelecter,
    monthChangeHandlerSelecter,
    countryChangeHandlerSelecter,
    darkModeToggle,
    todayClickHandler,
    prevYearHandlerSelecter,
    previousMonthSelectedHandler,
    nextMonthHandlerSelecter,
    nextYearHandlerSelecter,
    calendarMatrix,
    selectedDate,
    cellClickHandler,
    selectedYear,
    selectedMonth,
    selectedCountry,
    isDarkMode,
    holidays,
    loading,
  } = useCalendar();
  useEffect(() => {
    document.title = `Calendar - ${selectedYear}, ${selectedMonth}`;
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    if (loading) {
      toast.info("Loading holidays...", { autoClose: 1000 });
    }
  }, [loading]);

  return (
    <div
      className={`flex flex-col items-center justify-center ${
        isDarkMode
          ? "bg-primaryDark text-white dark-mode-scroll"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`flex justify-between items-center text-lg font-semibold w-full px-4 py-3 ${
          isDarkMode ? "bg-darkStroke text-white" : "bg-primary text-white"
        }`}
      >
        <div>Calender Assignment</div>
        <button
          onClick={darkModeToggle}
          className={`h-min px-4 py-2 ${
            isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"
          } flex items-center justify-center transition duration-300`}
        >
          {isDarkMode ? <RiSunFill /> : <RiMoonFill />}
        </button>
      </div>

      <div className="mb-2 w-full flex flex-col sm:flex-row p-4 justify-evenly items-center font-light text-[9px] sm:text-[11px] md:text-[13px] lg:text-sm xl:text-[16px]">
        <SelectYear
          selectedYear={selectedYear}
          onYearChange={yearChangeHandlerSelecter}
          isDarkMode={isDarkMode}
        />
        <SelectMonth
          selectedMonth={selectedMonth}
          onMonthChange={monthChangeHandlerSelecter}
          isDarkMode={isDarkMode}
        />
        <button
          onClick={todayClickHandler}
          className={`h-min px-4 py-2 max-sm:mb-2 ${
            isDarkMode
              ? "bg-darktableheader text-white"
              : "bg-orange text-white border border-primary "
          } rounded-lg font-medium hover:shadow-lg transition `}
        >
          Today
        </button>
      </div>

      <div
        className={`text-center mb-12 p-4 rounded-lg shadow-lg ${
          isDarkMode ? "bg-darkStroke" : "bg-white"
        }`}
      >
        <div className="flex items-center justify-between mb-4 flex-wrap">
          <h2
            className={`text-[18px] sm:text-[18px] md:text-[20px] lg:text-[22px] w-full sm:w-fit text-left mb-4 sm:mb-0 xl:text-[24px] font-semibold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {new Date(selectedYear, selectedMonth).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>

          <SelectCountry
            selectedCountry={selectedCountry}
            onCountryChange={countryChangeHandlerSelecter}
            countries={countries}
            isDarkMode={isDarkMode}
          />

          <div>
            <button
              onClick={previousMonthSelectedHandler}
              className={`py-1 px-2 pr-4 mx-1 font-bold rounded-lg hover:shadow-lg ${
                isDarkMode
                  ? "hover:bg-gray-700 text-white"
                  : "hover:bg-gray-200 text-gray-900"
              }  transition duration-300`}
            >
              &#12296;
            </button>
            <button
              onClick={nextMonthHandlerSelecter}
              className={`py-1 px-2 pl font-bold-4 mx-1 font-bold rounded-lg hover:shadow-lg ${
                isDarkMode
                  ? "hover:bg-gray-700 text-white"
                  : "hover:bg-gray-200 text-gray-900"
              }  transition duration-300`}
            >
              &#12297;
            </button>
          </div>
        </div>
        <table>
          <CalenderDays isDarkMode={isDarkMode} />
          <tbody>
            {calendarMatrix.map((week, weekIndex) => (
              <tr key={weekIndex}>
                {week.map((day, dayIndex) => (
                  <UnitCellCalender
                    key={dayIndex}
                    day={day}
                    selectedYear={selectedYear}
                    selectedMonth={selectedMonth}
                    holidays={holidays}
                    isDarkMode={isDarkMode}
                    selectedDate={selectedDate}
                    onCellClick={cellClickHandler}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
