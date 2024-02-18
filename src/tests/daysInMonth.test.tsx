import daysInParticularMonth from "../utils/daysInParticularMonth";

test("daysInParticularMonth returns correct number of days for January 2023 (non-leap year)", () => {
  const month = 0;
  const year = 2023;
  const result = daysInParticularMonth(month, year);

  expect(result).toBe(31);
});

test("daysInParticularMonth returns correct number of days for February 2022 (non-leap year)", () => {
  const month = 1;
  const year = 2022;
  const result = daysInParticularMonth(month, year);

  expect(result).toBe(28);
});

test("daysInParticularMonth returns correct number of days for July 2024 (leap year)", () => {
  const month = 6;
  const year = 2024;
  const result = daysInParticularMonth(month, year);

  expect(result).toBe(31);
});
