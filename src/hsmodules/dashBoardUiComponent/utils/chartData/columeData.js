import { TotalServiceData } from "./chartDataHandler";

const GenderPatientColumnData = (
  service,
  genderOne,
  genderTwo,
  genderThree,
  genderFour,
  genderFive,
  serieName
) => {
  const { totalServiceData } = TotalServiceData(service, "client");

  const genderPatient = totalServiceData.filter((result) => {
    return (
      (result.client.gender === genderOne) |
      (result.client.gender === genderTwo) |
      (result.client.gender === genderThree) |
      (result.client.gender === genderFour) |
      (result.client.gender === genderFive)
    );
  });

  const xAxisLabel = [
    {
      min: 0,
      max: 2,
      total: 0,
    },
    {
      min: 3,
      max: 10,
      total: 0,
    },
    {
      min: 11,
      max: 20,
      total: 0,
    },
    {
      min: 21,
      max: 30,
      total: 0,
    },
    {
      min: 31,
      max: 40,
      total: 0,
    },
    {
      min: 41,
      max: 50,
      total: 0,
    },
    {
      min: 51,
      max: 60,
      total: 0,
    },
    {
      min: 61,
      max: 70,
      total: 0,
    },
    {
      min: 71,
      max: 200,
      total: 0,
    },
  ];

  genderPatient.map((result) => {
    const currentDate_MS = new Date().getTime();
    let dob_MS = new Date(result.client.dob).getTime();
    let oneYear_MS = 24 * 60 * 60 * 1000 * 365;
    let yearOld = Math.floor((currentDate_MS - dob_MS) / oneYear_MS);
    xAxisLabel.map((p) => {
      if (p.min <= yearOld && p.max >= yearOld) {
        p.total += 1;
        return p;
      }
      return p.total;
    });

    return yearOld;
  });

  var genderPatientAgeColumnData = xAxisLabel.map((result) => {
    return result.total;
  });

  var genderPatientXAxisLabel = xAxisLabel.map((result) => {
    var obj = `${result.min}-${result.max}`;
    return obj;
  });

  // console.log("genderYearOld", {
  //   result: genderYearOld,
  //   genderPatient: genderPatient,
  // });
  var genderPatientAgeColumnSeriesData = {
    name: serieName,
    data: genderPatientAgeColumnData,
  };
  return { genderPatientXAxisLabel, genderPatientAgeColumnSeriesData };
};

export const MaleAndFemaleColumnSeriesData = (service) => {
  const {
    genderPatientXAxisLabel,
    genderPatientAgeColumnSeriesData: malePatientAgeColumnSeriesData,
  } = GenderPatientColumnData(
    service,
    "Male",
    "MALE",
    "M",
    "m",
    "male",
    "Male Patient"
  );
  const { genderPatientAgeColumnSeriesData: femalePatientAgeColumnSeriesData } =
    GenderPatientColumnData(
      service,
      "Female",
      "FEMALE",
      "F",
      "f",
      "female",
      "Female Patient"
    );

  var maleAndFemaleColumnSeriesData = [
    malePatientAgeColumnSeriesData,
    femalePatientAgeColumnSeriesData,
  ];

  return { genderPatientXAxisLabel, maleAndFemaleColumnSeriesData };
};
