// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {

  const logins = context.result;
  const loginCounts = {};
  const countsPerDay = {};

logins.forEach((login) => {
  //console.log(login.facility._id)
  const loginDate = login.createdAt.toISOString().split('T')[0]; // Extract the date portion
  const userId=login.user._id.toString()
  let organization=""
  if (!!login.facility){
    organization = login.facility._id.toString(); 
    
  }else{
    //console.log(login.facility.facilityName)
    return
    
  }
  
  

  // Count logins
  if (!countsPerDay[loginDate]) {
    countsPerDay[loginDate] = {
      loginCount: 1,
      uniqueOrganizationCount: 0,
    };
  } else {
    countsPerDay[loginDate].loginCount++;
  }

  // Count unique organizations
  if (!countsPerDay[loginDate].organizations) {
    countsPerDay[loginDate].organizations = new Set();
  }
  countsPerDay[loginDate].organizations.add(organization);

   // Count unique organizations
   if (!countsPerDay[loginDate].users) {
    countsPerDay[loginDate].users = new Set();
  }
  countsPerDay[loginDate].users.add(userId);


});

// Calculate unique organization and users count
Object.keys(countsPerDay).forEach((date) => {
  countsPerDay[date].uniqueOrganizationCount = countsPerDay[date].organizations.size;
  delete countsPerDay[date].organizations; // Remove the set to clean up the result object
  countsPerDay[date].uniqueUserCount = countsPerDay[date].users.size;
  delete countsPerDay[date].users;
});



// Optional: Convert countsPerDay to an array if needed
const countsArray = Object.keys(countsPerDay).map((date) => ({
  date,
  loginCount: countsPerDay[date].loginCount,
  uniqueOrganizationCount: countsPerDay[date].uniqueOrganizationCount,
  uniqueUserCount: countsPerDay[date].uniqueUserCount,
}));


context.result = countsArray; // Set the context result to the final array
    return context;
  };
};





