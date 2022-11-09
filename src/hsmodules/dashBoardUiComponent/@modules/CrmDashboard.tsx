import React, {useEffect, useState} from 'react'
import { userDetails } from "../utils/fetchUserDetails";
import {
    DashboardContainer,
    DashboardPageWrapper,
    StartCardWapper,
  } from "../core-ui/styles";

const CrmDashboard = () => {
    const [userName, setUserName] = useState("");
    const [facilityName, setFacilityName] = useState("");
    // const { monthNameForCurrentYear, newClientLineSeriesData } = clientLineData(clientService);
  
    useEffect(() => {
      const { userFullName, facilityFullName } = userDetails();
      setUserName(userFullName);
      setFacilityName(facilityFullName);
    }, []);
        return (
            <DashboardPageWrapper>
            
            </DashboardPageWrapper>
  )
}

export default CrmDashboard
