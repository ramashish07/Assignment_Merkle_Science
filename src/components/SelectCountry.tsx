import React from "react";
import Select from "react-select";
import blackLocation from "../assets/blackLocation.svg";
import whiteLocation from "../assets/whiteLocation.svg";

interface CountrySelected {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  countries: { name: string; code: string }[];
  isDarkMode: boolean;
}
const SelectCountry: React.FC<CountrySelected> = ({
  selectedCountry,
  onCountryChange,
  countries,
  isDarkMode,
}) => {
  const countryOptions = countries.map((country) => ({
    value: country.code,
    label: country.name,
  }));

  const customStyles = {
    input: (provided: any) => ({
      ...provided,
      width: "100%",
      color: isDarkMode ? "#D1D5DB" : "#111827",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      // width: "200px",
      backgroundColor: state.isSelected
        ? isDarkMode
          ? "#1E3A8A"
          : "#60A5FA"
        : provided.backgroundColor,
      color: state.isSelected ? "#FFFFFF" : isDarkMode ? "#D1D5DB" : "#111827",
      ":hover": {
        backgroundColor: state.isSelected
          ? isDarkMode
            ? "#1E3A8A"
            : "#60A5FA"
          : isDarkMode
          ? "#718096"
          : "#E5E7EB",
      },
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      width: "100%",
      backgroundColor: isDarkMode ? "#374151" : "#F3F4F6",
      borderColor: state.isFocused
        ? isDarkMode
          ? "#60A5FA"
          : "#1E3A8A"
        : provided.borderColor,
      boxShadow: state.isFocused
        ? isDarkMode
          ? "0 0 0 1px #60A5FA"
          : "0 0 0 1px #1E3A8A"
        : provided.boxShadow,
    }),
    singleValue: (provided: any) => ({
      ...provided,
      width: "100%",
      textAlign: "left",
      color: isDarkMode ? "#D1D5DB" : "#111827",
    }),
    menu: (provided: any) => ({
      ...provided,
      width: "100%",
      textAlign: "left",
      backgroundColor: isDarkMode ? "#4B5563" : "#E5E7EB",
    }),
   
  };

  return (
    <div className="max-sm:mb-2 flex items-center w-[200px] text-xs sm:text-md ">
      <label
        htmlFor="country"
        className={`mr-2 font-normal ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        <img src={isDarkMode ? whiteLocation : blackLocation} />
      </label>
      <Select
        id="country"
        value={countryOptions.find(
          (option) => option.value === selectedCountry
        )}
        options={countryOptions}
        onChange={(selectedOption) =>
          onCountryChange(selectedOption?.value || "")
        }
        styles={customStyles}
        isSearchable
        className="w-full"
      />
    </div>
  );
};

export default SelectCountry;
