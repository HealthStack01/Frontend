export const userDetails = () => {
  const userDetails = localStorage.getItem("user");

  const parse = JSON.parse(userDetails); // ok

  const userFullName = `${parse.firstname} ${parse.lastname}`;

  const facilityId = JSON.parse(userDetails).employeeData[0].facility;

  const facilityFullName = parse.employeeData[0].facilityDetail.facilityName;

  return {userFullName, facilityFullName, facilityId};
};
