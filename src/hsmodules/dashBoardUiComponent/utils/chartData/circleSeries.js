import { TotalNumOfAllGender } from "./queryHandler";
export const CircleSeriesData = (service) => {
  const { totalMaleClient, totalFemaleClient, totalOtherClient } =
    TotalNumOfAllGender(service);

  let circleSeriesArray = [
    totalMaleClient,
    totalFemaleClient,
    totalOtherClient,
  ];

  return { circleSeriesArray };
};
