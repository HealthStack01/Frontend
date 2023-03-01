import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import ViewCard from "./@sections/ViewCard";
import LineChart from "../charts/LineChart";
import PieChart from "../charts/PieChat";
import CircleChart from "../charts/CircleChart";
import { clientLineData } from "../utils/chartData/LineData";
import Checkbox from "@material-ui/core/Checkbox";
import ManagedCareDashboardPolicyCard from "./@sections/ManagedCareDashboardPolicyCard";
import ManagedCareDashboardTariffCard from "./@sections/ManagedCareDashboardTariffCard";
import CheckBoxCard from "./@sections/ChecKBoxForThreeValue";
import ManagedCareDashboardCardTwo from "./@sections/ManagedCareDashboardCardTwo";
import MCDComplaintsCard from "./@sections/MCDComplaintsCard";
import client from "../../../feathers";
import { CircleSeriesData } from "../utils/chartData/circleSeries";

import {
  ModelResult,
  TotalHealthPlan,
  TotalTariff,
  TariffCheckBoxValue,
  TotalAccreditation,
} from "../utils/chartData/chartDataHandler";
import { PolicyCheckBoxValue } from "../utils/chartData/queryHandler";

import {
  DashboardContainer,
  DashboardPageWrapper,
  StartCardWapper,
} from "../core-ui/styles";
import { userDetails } from "../utils/fetchUserDetails";

const ManagedCareFrontDashboard = () => {
  const [userName, setUserName] = useState("");
  const [facilityName, setFacilityName] = useState("");
  const clientService = client.service("/client");
  const policyService = client.service("/policy");
  const healthPlanService = client.service("/healthplan");
  const claimsService = client.service("/claims");
  const complaintsService = client.service("/complaints");
  const tariffService = client.service("tariff");
  const accreditationSevice = client.service("accreditation");
  const organizationclientService = client.service("organizationclient");

  const { circleSeriesArray } = CircleSeriesData(clientService);

  const { policyCheckBoxValue, isPending } = PolicyCheckBoxValue(policyService);
  const { totalHealthPlan } = TotalHealthPlan(healthPlanService);
  const { totalTariff } = TotalTariff(tariffService);
  const { tariffCheckBoxValue } = TariffCheckBoxValue(tariffService);
  const { totalAccreditation } = TotalAccreditation(accreditationSevice);

  // const domeArray = [1, 2, 3, 5, 6];

  const { modelResult, facilityId } = ModelResult(organizationclientService);

  // console.log('model data ===>', {
  // 	modelResult: modelResult,
  // 	facilityId: facilityId,
  // });

  useEffect(() => {
    const { userFullName, facilityFullName } = userDetails();
    setUserName(userFullName);
    setFacilityName(facilityFullName);
  }, []);

  return (
    <DashboardPageWrapper>
      <Box>
        <Box>
          <Typography variant="h2">
            Hello <span>{userName}</span>👋
          </Typography>
          <Typography variant="body1">
            Welcome to your Managed Care <span>Dashboard</span>
          </Typography>
        </Box>

        <StartCardWapper>
          <ViewCard
            count={totalHealthPlan ? totalHealthPlan : 0}
            title="Total Health Plan"
          />
          {/* <ViewCard
						count={totalTariff}
						title='Total Tariff'
					/> */}
          <ViewCard count={totalAccreditation} title="Total Accreditation" />
          {/*	<ViewCard
						count={12}
						title='No. Of HMO Tariff'
					/> */}
        </StartCardWapper>

        <DashboardContainer>
          <Box
            sx={{
              display: "grid",
              width: "100%",
              gridGap: "10px",
              gridTemplateColumns: { lg: "repeat(3, 1fr)", xs: "1fr" },
            }}
          >
            {/* <Box
							sx={{
								p: 4,
								background: '#f9f9f9',
								boxShadow: '0',
								borderRadius: 4,
								width: { xs: '100%' },
								textAlign: 'center',
								mr: 1,
								mb: { xs: 1 },
								alignItems: 'center',
							}}>
							<Typography sx={{ fontWeight: 'bold', fontSize: '22px' }}>
								Check-in Overview
							</Typography>
							<Box style={{ marginBottom: '3rem', marginTop: '5rem' }}>
								{/* <CircleChart title="" series={domeArray}/> //}
								<PieChart />
							</Box>
							<Typography sx={{ fontWeight: 'bold' }}>
								300{' '}
								<span style={{ fontWeight: 'normal', fontSize: '0.8rem' }}>
									- Time Btw Check-In/Out
								</span>
							</Typography>
							<Typography sx={{ fontWeight: 'bold' }}>
								180{' '}
								<span style={{ fontWeight: 'normal', fontSize: '0.8rem' }}>
									- Pending Check-in
								</span>
							</Typography>
							<Typography sx={{ fontWeight: 'bold' }}>
								20{' '}
								<span style={{ fontWeight: 'normal', fontSize: '0.8rem' }}>
									- Check-in Overdue
								</span>
							</Typography>
						</Box> */}

            <Box sx={{ width: "100%", pt: 2, pb: 0 }}>
              {/* <LineChart title='Tariff' /> */}
              <Box
                sx={{
                  p: 1,
                  background: "#f9f9f9",
                  boxShadow: "0",
                  borderRadius: 4,
                  width: { xs: "100%" },
                  textAlign: "center",
                  mr: 1,
                  mb: { xs: 1 },
                  alignItems: "center",
                }}
              >
                <ManagedCareDashboardPolicyCard
                  count={0}
                  title="Policy"
                  dataSource={policyCheckBoxValue}
                  isLoading={isPending}
                />
                <Typography
                  style={{
                    color: "#444444",
                    fontWeight: "700",
                    fontSize: "16px",
                  }}
                >
                  Policy Overview
                </Typography>
              </Box>
            </Box>

            {/* <Box sx={{ width: '100%', pt: 2, pb: 0 }}>
							 <LineChart title='Tariff' /> 
							<Box
								sx={{
									p: 1,
									background: '#f9f9f9',
									boxShadow: '0',
									borderRadius: 4,
									width: { xs: '100%' },
									textAlign: 'center',
									mr: 1,
									mb: { xs: 1 },
									alignItems: 'center',
								}}>
								<MCDComplaintsCard
									count={0}
									title='Tariff'
									// dataSource={}
									isLoading={isPending}
								/>
								<Typography
									style={{
										color: '#444444',
										fontWeight: '700',
										fontSize: '16px',
									}}>
									Complaints Overview
								</Typography>
							</Box>
						</Box> */}
            <Box sx={{ width: "100%", pt: 2, pb: 0 }}>
              {/* <LineChart title='Tariff' /> */}
              <Box
                sx={{
                  p: 1,
                  background: "#f9f9f9",
                  boxShadow: "0",
                  borderRadius: 4,
                  width: { xs: "100%" },
                  textAlign: "center",
                  mr: 1,
                  mb: { xs: 1 },
                  alignItems: "center",
                }}
              >
                <ManagedCareDashboardTariffCard
                  count={0}
                  title="Tariff"
                  dataSource={tariffCheckBoxValue}
                  isLoading={isPending}
                />
                <Typography
                  style={{
                    color: "#444444",
                    fontWeight: "700",
                    fontSize: "16px",
                  }}
                >
                  Tariff Overview
                </Typography>
              </Box>
            </Box>
            {/* <Box sx={{ width: '100%', pt: 0.5, pb: 0 }}>
							<Box
								sx={{
									p: 1,
									background: '#f9f9f9',
									boxShadow: '0',
									borderRadius: 4,
									width: { xs: '100%' },
									textAlign: 'center',
									mr: 1,
									mb: { xs: 1 },
									alignItems: 'center',
								}}>
								<ManagedCareDashboardTariffCard
									count={0}
									title='Tariff'
									dataSource={tariffCheckBoxValue}
									isLoading={isPending}
								/>
								<Typography
									style={{
										color: '#444444',
										fontWeight: '700',
										fontSize: '16px',
									}}>
									Tariff Overview
								</Typography>
							</Box>
						</Box> */}
            <Box>
              {/*<Box
							  sx={{
									p: 4,
									background: '#f9f9f9',
									boxShadow: '0',
									borderRadius: 4,
									width: { xs: '100%' },
									height: '40vh',
									textAlign: 'center',
									mr: 1,
									mb: { xs: 1 },
									alignItems: 'center',
									display: 'spacearound',
								}}>
								<Typography
									sx={{
										fontWeight: 'bold',
										fontSize: '22px',
										marginTop: '4rem',
										marginBottom: '1rem',
									}}>
									250
								</Typography>
								<Typography>Beneficiaries</Typography>
							</Box> */}
              {/* <Box
								sx={{
									p: 4,
									background: '#f9f9f9',
									boxShadow: '0',
									borderRadius: 4,
									width: { xs: '100%' },
									textAlign: 'center',
									mr: 1,
									mb: { xs: 1 },
									alignItems: 'center',
									display: 'spacearound',
								}}>
								<Box style={{ display: 'flex' }}
									<Box
										style={{
											position: 'relative',
											left: '12rem',
											padding: '0',
										}}>
										<ManagedCareDashboardCardTwo
											count={0}
											title='80k'
											hasFilter={true}
											dataSource={''}
											isLoading={false}
										/>
									</Box>
								</Box>
								<Typography
									style={{
										color: '#444444',
										fontWeight: '700',
										fontSize: '16 px',
									}}>
									Claims Overview
								</Typography>
							</Box> */}
            </Box>
          </Box>
        </DashboardContainer>
        {/* <DashboardContainer>
					<Box
						sx={{
							display: 'grid',
							width: '100%',
							gridGap: '10px',
							gridTemplateColumns: { lg: 'repeat(3, 1fr)', xs: '1fr' },
						}}>
						<Box sx={{ width: '100%', pt: 2, pb: 2 }}>
							<Box
								sx={{
									p: 1,
									background: '#f9f9f9',
									boxShadow: '0',
									borderRadius: 4,
									width: { xs: '100%' },
									textAlign: 'center',
									mr: 1,
									mb: { xs: 1 },
									alignItems: 'center',
								}}>
								<ManagedCareDashboardTariffCard
									count={0}
									title='Tariff'
									dataSource={tariffCheckBoxValue}
									isLoading={isPending}
								/>
								<Typography
									style={{
										color: '#444444',
										fontWeight: '700',
										fontSize: '16px',
									}}>
									Tariff Overview
								</Typography>
							</Box>
						</Box>
					</Box>
				</DashboardContainer> */}
      </Box>
    </DashboardPageWrapper>
  );
};

export default ManagedCareFrontDashboard;
