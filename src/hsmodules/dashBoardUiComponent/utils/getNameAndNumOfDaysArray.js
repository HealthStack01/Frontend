const getDayIntheCurrentMonth = () => {
  var currentDate = new Date();
  var currentMonth = currentDate.getMonth();
  var currentNumDaysSpendInTheCurrentMonth = currentDate.getDate();
  var currentYear = currentDate.getFullYear();

  const currentDetails = {
    currentYear: currentYear,
    currentMonth: currentMonth,
    numOfDays: currentNumDaysSpendInTheCurrentMonth,
  };
  return currentDetails;
};

export const getDayIntheOtherMonth = () => {
  const currentMonthDetails = getDayIntheCurrentMonth();
  const currentMonth = currentMonthDetails.currentMonth;
  const currentYear = currentMonthDetails.currentYear;
  const monthNameForCurrentYear = [];
  const numOfDayInmonthForCurrentYear = [];
  const monthNameArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  for (let index = 0; index < currentMonth; index++) {
    let dt = new Date(currentYear, index);
    let month = dt.getMonth();
    let year = dt.getFullYear();
    let daysInMonth = new Date(year, month, 0).getDate();
    monthNameForCurrentYear.push(monthNameArr[month]);
    numOfDayInmonthForCurrentYear.push(daysInMonth);
  }
  monthNameForCurrentYear.push(monthNameArr[currentMonthDetails.currentMonth]);
  numOfDayInmonthForCurrentYear.push(currentMonthDetails.numOfDays);

  return {
    monthNameForCurrentYear,
    numOfDayInmonthForCurrentYear,
  };
};
