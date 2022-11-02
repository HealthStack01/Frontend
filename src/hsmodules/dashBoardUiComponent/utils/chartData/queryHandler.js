import {
  TotalServiceData,
  FetchLocationWard,
  FetchDataWithInARange,
  FetchDataWithInAYear,
  // FetchDataWithInPresentYear,
  FetchTotalDataWithInPresentRange,
  FetchTotalDataForDischargedPatient,
  FetchTotalQuantity,
} from "./chartDataHandler";

import { getDayIntheOtherMonth } from "../getNameAndNumOfDaysArray.js";

export const paymentTotal = (queryResults) => {
  var paymentModeObject = {
    totalCash: 0,
    totalHMO: 0,
    totalComp: 0,
    totalFamilyPlan: 0,
    totalAll: 0,
  };

  paymentModeObject.totalAll += queryResults.length;
  queryResults.forEach((result) => {
    const totalCash = result.paymentinfo.filter((paymentinfoArr) => {
      return paymentinfoArr.paymentmode === "Cash";
    });

    const totalHMO = result.paymentinfo.filter((paymentinfoArr) => {
      return paymentinfoArr.paymentmode === "HMO";
    });

    const totalComp = result.paymentinfo.filter((paymentinfoArr) => {
      return paymentinfoArr.paymentmode === "Comp";
    });

    const totalFamilyPlan = result.paymentinfo.filter((paymentinfoArr) => {
      return paymentinfoArr.paymentmode === "Family plan";
    });

    paymentModeObject.totalCash += totalCash.length;
    paymentModeObject.totalHMO += totalHMO.length;
    paymentModeObject.totalComp += totalComp.length;
    paymentModeObject.totalFamilyPlan += totalFamilyPlan.length;
    return paymentModeObject;
  });
  const paymentModeData = [
    paymentModeObject.totalCash,
    paymentModeObject.totalHMO,
    paymentModeObject.totalComp,
    paymentModeObject.totalFamilyPlan,
    paymentModeObject.totalAll,
  ];
  return { paymentModeData };
};

export const PendingAdmission = (service) => {
  const { totalServiceData } = TotalServiceData(service, "order");

  const pendingAdmission = totalServiceData.filter((result) => {
    return result.order.order_status === "Pending";
  });

  const totalPendingAdmissions = pendingAdmission.length;
  return { totalPendingAdmissions };
};

export const TotalBedSpaces = (service) => {
  const { fetchLocationWard } = FetchLocationWard(service);
  var totalBedSpaces = 0;

  const wardDataArray = fetchLocationWard.map((result) => {
    const totalBedInSubLocation = result.sublocations.filter((subResult) => {
      return subResult.type === "Bed";
    });

    totalBedSpaces += totalBedInSubLocation.length;
    return totalBedInSubLocation.length;
  });

  return { wardDataArray, totalBedSpaces };
};

export const TotalModeltDataForPrevious = (service) => {
  const currentTime = new Date();
  const { numOfDayInmonthForCurrentYear } = getDayIntheOtherMonth();
  const { totalDataWithInARange: totalInPreviousDay } = FetchDataWithInARange(
    service,
    1,
    0
  );

  //for previous week
  const getDay = currentTime.getDay();
  const gtWeek = 7 + getDay;
  const { totalDataWithInARange: totalInPreviousWeek } = FetchDataWithInARange(
    service,
    gtWeek,
    getDay
  );

  //for previous month
  const getDate = currentTime.getDate();
  const gtMonth =
    numOfDayInmonthForCurrentYear[numOfDayInmonthForCurrentYear.length - 2] +
    getDate;
  const { totalDataWithInARange: totalInPreviousMonth } = FetchDataWithInARange(
    service,
    gtMonth,
    getDate
  );

  //for previous Quarter
  const currentMonth = currentTime.getMonth();
  const currentMonth_Int = Math.ceil(currentMonth / 3);
  const quarterList = [1, 2, 3, 4];

  const currentQuarter = quarterList.filter((result) => {
    return result === currentMonth_Int;
  });

  const prevQuarter = currentQuarter[0] - 1;
  var totalDaysInPreviousQuarter = 0;
  var startIndex = quarterList[0] + (prevQuarter - quarterList[0]) * 3 - 1;
  var lastMonthInPreviousQuarter = startIndex + 2;
  for (let i = startIndex; i < startIndex + 3; i++) {
    totalDaysInPreviousQuarter += numOfDayInmonthForCurrentYear[i];
  }

  var totalDaysBtwPrevAndCurrentQuarter = 0;

  for (let i = currentMonth; i > lastMonthInPreviousQuarter; i--) {
    totalDaysBtwPrevAndCurrentQuarter += numOfDayInmonthForCurrentYear[i];
  }

  const gtQuarter =
    totalDaysInPreviousQuarter + totalDaysBtwPrevAndCurrentQuarter;
  const ltQuarter = totalDaysBtwPrevAndCurrentQuarter;
  const { totalDataWithInARange: totalInPreviousQuarter } =
    FetchDataWithInARange(service, gtQuarter, ltQuarter);

  //for previous year
  const currentYear = currentTime.getFullYear();
  const prevYear = currentYear - 1;
  const ltCurrentYear_MS = new Date(currentYear).getTime();
  const gtPreviousYear_MS = new Date(prevYear).getTime();
  const { totalDataWithInAYear: totalInPreviousYear, isPending: isLoading } =
    FetchDataWithInAYear(service, gtPreviousYear_MS, ltCurrentYear_MS);

  const totalPreviousDataObject = {
    totalInPreviousDay: totalInPreviousDay,
    totalInPreviousWeek: totalInPreviousWeek,
    totalInPreviousMonth: totalInPreviousMonth,
    totalInPreviousQuarter: totalInPreviousQuarter,
    totalInPreviousYear: totalInPreviousYear,
  };

  return {
    totalPreviousDataObject,
    isLoading: isLoading,
  };
};

export const TotalNumOfAllGender = (service) => {
  const { totalServiceData: totalClient } = TotalServiceData(service, "gender");

  const totalMaleClient = totalClient.filter((result) => {
    return (
      (result.gender === "Male") |
      (result.gender === "male") |
      (result.gender === "MALE") |
      (result.gender === "M") |
      (result.gender === "m")
    );
  }).length;

  const totalFemaleClient = totalClient.filter((result) => {
    return (
      (result.gender === "Female") |
      (result.gender === "female") |
      (result.gender === "FEMALE") |
      (result.gender === "F") |
      (result.gender === "f")
    );
  }).length;

  const totalOtherClient =
    totalClient.length - totalMaleClient - totalFemaleClient;

  return { totalMaleClient, totalFemaleClient, totalOtherClient };
};

export const TotalModeltDataForPresent = (
  service,
  FetchTotalWithInPresentRange
) => {
  const currentTime = new Date();
  const gt_HR = currentTime.getHours();
  const gt_Days = currentTime.getDay();

  // for present day
  const { totalDataWithInARange: totalInPresentDay } =
    FetchTotalWithInPresentRange(service, gt_HR, 1);

  //for present week
  const { totalDataWithInARange: totalInPresentWeek } =
    FetchTotalWithInPresentRange(service, gt_HR, gt_Days);

  //for present month
  const getDate = currentTime.getDate();
  const { totalDataWithInARange: totalInPresentMonth } =
    FetchTotalWithInPresentRange(service, gt_HR, getDate);

  //for present Quarter
  const totalDaysInPresentQuarter = getTotalDayInCurrentQuarter();

  const { totalDataWithInARange: totalInPresentQuarter } =
    FetchTotalWithInPresentRange(service, gt_HR, totalDaysInPresentQuarter);

  //for present year
  const currentYear = currentTime.getFullYear();
  const aDay_ms = 24 * 60 * 60 * 1000 * 1;
  const gtCurrentYear_MS = new Date(`${currentYear}`).getTime();
  const currentTime_MS = currentTime.getTime();
  const numOfDaysInPresentYear = Math.ceil(
    (currentTime_MS - gtCurrentYear_MS) / aDay_ms
  );

  const { totalDataWithInARange: totalInPresentY, isPending: isLoading } =
    FetchTotalWithInPresentRange(service, gt_HR, numOfDaysInPresentYear);

  const totalPresentDataObject = {
    totalInPresentDay: totalInPresentDay,
    totalInPresentWeek: totalInPresentWeek,
    totalInPresentMonth: totalInPresentMonth,
    totalInPresentQuarter: totalInPresentQuarter,
    totalInPresentYear: totalInPresentY,
  };

  return {
    totalPresentDataObject,
    isLoading: isLoading,
  };
};

/**
 *
 * @returns
 */

export const getTotalDayInCurrentQuarter = () => {
  const currentTime = new Date();
  const gt_Year = currentTime.getFullYear();
  const currentMonth = currentTime.getMonth();
  const daysInCurrentMonth = currentTime.getDate();

  const currentMonth_Int = currentMonth / 3;
  const quarterList = [1, 2, 3, 4];
  const getCurrentQuarter = (currentMonth_Int, quarterList) => {
    var currentQuarter;
    currentMonth_Int < 1
      ? (currentQuarter = quarterList[0])
      : currentMonth_Int > 1 && currentMonth_Int < 2
      ? (currentQuarter = quarterList[1])
      : currentMonth_Int > 2 && currentMonth_Int < 3
      ? (currentQuarter = quarterList[2])
      : (currentQuarter = quarterList[3]);

    return currentQuarter;
  };

  const currentQuarter = getCurrentQuarter(currentMonth_Int, quarterList);

  const presentQuarter = currentQuarter;
  var totalDaysInPresentQuarter = 0;
  var startIndex = (presentQuarter - quarterList[0]) * 3;

  for (let i = startIndex; i <= currentMonth; i++) {
    let numDays;
    if (i === currentMonth) {
      numDays = daysInCurrentMonth;
    } else {
      let dt = new Date(gt_Year, i);
      let month = dt.getMonth();
      let year = dt.getFullYear();
      let daysInMonth = new Date(year, month, 0).getDate();
      numDays = daysInMonth;
    }
    totalDaysInPresentQuarter += numDays;
  }

  return totalDaysInPresentQuarter;
};

//
export const getReAdmissionWithIn30Days = (service) => {
  const currentTime = new Date();
  const gt_HR = currentTime.getHours();
  const { totalDataWithInARange: totalAdmissionWithin30DaysArr } =
    FetchTotalDataWithInPresentRange(service, gt_HR, 30);

  const { totalCount, totalAdmissionWithIn30Days, totalReAdmissionCount } =
    getTotalNumOfId(totalAdmissionWithin30DaysArr);
  const reAdmission = Math.ceil(
    (totalReAdmissionCount / totalAdmissionWithIn30Days) * 100
  );

  const reAdmissionRate = `${reAdmission}%`;

  console.log({
    totalCount: totalCount,
    totalAdmissionWithIn30Days: totalAdmissionWithIn30Days,
    totalReAdmissionCount: totalReAdmissionCount,
    reAdmissionRate: `${reAdmission}%`,
  });

  return { reAdmissionRate };
};

export const getTotalNumOfId = (sampledata) => {
  const totalAdmissionWithIn30Days = sampledata.length;
  const arrId = sampledata.map((ele) => {
    return ele._id;
  });

  function getUniqueId(array) {
    var uniqueArray = [];

    // Loop through array values
    for (let i = 0; i < array.length; i++) {
      if (uniqueArray.indexOf(array[i]) === -1) {
        uniqueArray.push(array[i]);
      }
    }
    return uniqueArray;
  }
  const uniqueIdArr = getUniqueId(arrId);
  var resultArr = [];
  var totalCount = 0;
  var totalReAdmissionCount = 0;

  uniqueIdArr.map((ele) => {
    let count = 0;
    for (let i = 0; i < sampledata.length; i++) {
      if (ele === sampledata[i]._id) {
        console.log(sampledata[i]._id);
        count++;
      }
    }
    let obj = {
      _id: ele,
      total: count,
    };
    totalCount += count;
    totalReAdmissionCount += count - 1;
    resultArr.push(obj);
    return resultArr;
  });
  return {
    totalCount,
    totalAdmissionWithIn30Days,
    totalReAdmissionCount,
  };
};
export const AverageLengthOfStayed = (service) => {
  const { fetchTotalDataForDischargedPatient: averageLengthOfStayedArr } =
    FetchTotalDataForDischargedPatient(service);
  const averageLengthOfStay = (patientAdmittedArr) => {
    var totalDiff = 0;
    const newArr = patientAdmittedArr.map((data) => {
      let start_time_Ms = new Date(data.start_time).getTime();
      let end_time_Ms = new Date(data.end_time).getTime();
      let diff_Ms = end_time_Ms - start_time_Ms;
      totalDiff += diff_Ms;
      return diff_Ms;
    });

    const totalDataInArray = newArr.length;
    const aDay_ms = 24 * 60 * 60 * 1000 * 1;
    const averageDayStayed_ms = totalDiff / totalDataInArray;
    let averageLengthOfStayedResult = Math.ceil(averageDayStayed_ms / aDay_ms);
    // console.log({
    //   result: averageLengthOfStayedResult,
    //   averageLengthOfStay: averageLengthOfStayed,
    // });
    return averageLengthOfStayedResult;
  };

  const averageLengthOfStayed = averageLengthOfStay(averageLengthOfStayedArr);
  return { averageLengthOfStayed };
};

export const FetchTotalStockValue = (service) => {
  const { fetchTotalQuantity } = FetchTotalQuantity(service);
  var fetchTotalStockValue = 0;
  fetchTotalQuantity.map((data) => {
    return (fetchTotalStockValue += data.stockvalue);
  });
  return { fetchTotalStockValue: Math.ceil(fetchTotalStockValue) };
};

export const FetchTotalStockQuantity = (service) => {
  const { fetchTotalQuantity } = FetchTotalQuantity(service);
  var total = 0;
  fetchTotalQuantity.map((data) => {
    return (total += data.quantity);
  });
  const fetchTotalStockQuantity = Math.ceil(total);
  return { fetchTotalStockQuantity };
};
