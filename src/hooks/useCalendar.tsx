import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import calenderForMonth from "../utils/calenderForMonth";
const API_URL = "https://calendarific.com/api/v2/holidays";

const API_KEY = "v9TtReWUfpqSmLj273HsGLnUHfzJqEek";


const useCalendar = () => {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );
  const [selectedCountry, setSelectedCountry] = useState<string>("IN");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [cachedHolidays, setCachedHolidays] = useState<{ [key: string]: any }>(
    {}
  );

  const previousMonthSelectedHandler = () =>
    setSelectedMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));

  const nextMonthHandlerSelecter = () =>
    setSelectedMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));

  const nextYearHandlerSelecter = () =>
    setSelectedYear((prevYear) => (prevYear < 2030 ? prevYear + 1 : prevYear));

  const monthChangeHandlerSelecter = (month: number) => setSelectedMonth(month);

  const countryChangeHandlerSelecter = (country: string) =>
    setSelectedCountry(country);

  const darkModeToggle = () => setIsDarkMode(!isDarkMode);

  const cellClickHandler = (date: Date) => setSelectedDate(date);

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return function (...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const yearChangeHandlerSelecter = debounce((year: number) => {
    setSelectedYear(year);
  }, 1000);

  const todayClickHandler = () => {
    const today = new Date();
    setSelectedYear(today.getFullYear());
    setSelectedMonth(today.getMonth());
  };

  const prevYearHandlerSelecter = () => {
    setSelectedYear((prevYear) => (prevYear > 1930 ? prevYear - 1 : prevYear));
  };

  const fetchHolidays = async () => {
    try {
      setLoading(true);
      const cacheKey = `${selectedCountry}-${selectedYear}`;
      if (cachedHolidays[cacheKey]) {
        setCachedHolidays((prevCachedHolidays) => ({
          ...prevCachedHolidays,
          [cacheKey]: prevCachedHolidays[cacheKey],
        }));
      } else {
        const response = await axios.get(API_URL, {
          params: {
            api_key: API_KEY,
            country: selectedCountry,
            year: selectedYear,
          },
        });

        if (response.status === 200) {
          const holidaysData = response.data.response.holidays;
          setCachedHolidays((prevCachedHolidays) => ({
            ...prevCachedHolidays,
            [cacheKey]: holidaysData,
          }));
        } else {
          console.error("Error fetching holidays:", response.status);
        }
      }
    } catch (error) {
      console.error("Error fetching holidays:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, [selectedYear, selectedCountry]);

  const holidays = useMemo(() => {
    return cachedHolidays[`${selectedCountry}-${selectedYear}`] || [];
  }, [cachedHolidays, selectedCountry, selectedYear]);

  const calendarMatrix = calenderForMonth(selectedMonth, selectedYear);

  return {
    monthChangeHandlerSelecter,
    countryChangeHandlerSelecter,
    darkModeToggle,
    todayClickHandler,
    prevYearHandlerSelecter,
    previousMonthSelectedHandler,
    nextMonthHandlerSelecter,
    nextYearHandlerSelecter,
    yearChangeHandlerSelecter,
    cellClickHandler,
    selectedYear,
    selectedMonth,
    selectedCountry,
    isDarkMode,
    holidays,
    calendarMatrix,
    selectedDate,
    loading,
  };
};

export default useCalendar;
