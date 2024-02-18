import daysInParticularMonth from "./daysInParticularMonth";

const calendarForMonth = (month: number, year: number): number[][] => {
  const days = daysInParticularMonth(month, year);
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const calendarMatrix: number[][] = [[]];
  let currentWeekIndex = 0;

  for (let i = 1; i <= days; i++) {
    if (i === 1) {
      for (let j = 0; j < firstDayOfMonth; j++) {
        calendarMatrix[currentWeekIndex].push(0);
      }
    }

    calendarMatrix[currentWeekIndex].push(i);

    if ((i + firstDayOfMonth) % 7 === 0 && i < days) {
      calendarMatrix.push([]);
      currentWeekIndex++;
    }
  }

  return calendarMatrix;
};

export default calendarForMonth;
