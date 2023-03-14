import {useContext, useState, useEffect, useCallback} from "react";
import {Box, Grid} from "@mui/material";
import client from "../../feathers";
import {ObjectContext, UserContext} from "../../context";
import FilterMenu from "../../components/utilities/FilterMenu";
import {FormsHeaderText} from "../../components/texts";
import CustomTable from "../../components/customtable";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import dayjs from "dayjs";
import {useForm} from "react-hook-form";
import {
  beneficiaryColumns,
  providersColumns,
  organizationColumns,
} from "./columns";
import Input from "../../components/inputs/basic/Input";
import MuiCustomDatePicker from "../../components/inputs/Date/MuiDatePicker";

const CorporatePolicy = () => {
  const [view, setView] = useState("lists");

  return (
    <Box>
      {view === "lists" && (
        <Box>
          <CorporatePolicyList showDetail={() => setView("details")} />
        </Box>
      )}

      {view === "details" && (
        <Box>
          <CorporatePolicyDetails goBack={() => setView("lists")} />
        </Box>
      )}
    </Box>
  );
};

export default CorporatePolicy;

const CorporatePolicyList = ({showDetail}) => {
  const policyServer = client.service("policy");
  const {state, setState} = useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [policyType, setPolicyType] = useState("Approved");

  const getPolicies = useCallback(async () => {
    setLoading(true);
    const organizationId = user.currentEmployee.facilityDetail._id;
    const resp = await policyServer.find({
      query: {
        //organizationId: user.currentEmployee.facilityDetail._id,
        approved: policyType.toLowerCase() === "approved" ? true : false,
        $sort: {
          createdAt: -1,
        },
      },
    });
    const allPolicies = resp.data;

    const corporatePolocies = allPolicies.filter(
      item =>
        item?.sponsor?.organization === organizationId ||
        item?.providers?.some(
          provider => provider?.organization === organizationId
        )
    );
    setLoading(false);
    setPolicies(corporatePolocies);
  }, [user.currentEmployee.facilityDetail, policyType]);

  useEffect(() => {
    getPolicies();
  }, [getPolicies]);

  const handleSearch = val => {};

  const handleRow = policy => {
    setState(prev => ({
      ...prev,
      CorporateModule: {
        ...prev.CorporateModule,
        selectedPolicy: policy,
      },
    }));
    showDetail();
  };

  const policyColumns = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row, i) => i + 1,
      sortable: true,
      inputType: "HIDDEN",
      width: "60px",
    },
    {
      name: "Date Created",
      key: "createdAt",
      description: "Date Created",
      selector: row => dayjs(row.createdAt).format("DD-MM-YYYY"),
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "First Name",
      key: "firstname",
      description: "First Name",
      selector: row => row.principal.firstname,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },
    // {
    //   name: "Middle Name",
    //   key: "middlename",
    //   description: "Middle Name",
    //   selector: row =>
    //     row.principal.middlename ? row.principal.middlename : "_______",
    //   sortable: true,
    //   required: true,
    //   inputType: "TEXT",
    //   style: {
    //     textTransform: "capitalize",
    //   },
    // },

    {
      name: "Last Name",
      key: "principal",
      description: "Principal Last Name",
      selector: row => row.principal.lastname,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },

    {
      name: "Phone",
      key: "phone",
      description: "Phone Number",
      selector: row => row.principal.phone,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },

    {
      name: "Email",
      key: "email",
      description: "simpa@email.com",
      selector: row => row.principal.email,
      sortable: true,
      required: true,
      inputType: "EMAIL",
    },

    {
      name: "Policy Number",
      key: "policyNo",
      description: "Phone Number",
      selector: row => row.policyNo,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
    {
      name: "Sponsor Type",
      key: "sponsorshipType",
      description: "Sponsorship Type",
      selector: row => row.sponsorshipType,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Plan",
      key: "plan",
      description: "Plan",
      selector: row => row?.plan?.planName,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Premium",
      key: "premium",
      description: "Premium",
      selector: row =>
        row?.plan?.premiums?.map(p => {
          if (row?.planType === "Individual" && p.planType === "Individual") {
            return p?.premiumAmount;
          } else if (row?.planType === "Family" && p.planType === "Family") {
            return p?.premiumAmount;
          }
        }),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Paid",
      key: "isPaid",
      description: "Paid",
      selector: row => (row.isPaid ? "Yes" : "No"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Active",
      key: "active",
      description: "Active",
      selector: row => (row.active ? "Yes" : "No"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
      }}
      p={2}
    >
      <Box
        mb={2}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <FilterMenu onSearch={handleSearch} />
          <FormsHeaderText text={`List of Your ${policyType} Policies`} />
        </Box>

        <Box>
          {policyType.toLowerCase() === "approved" ? (
            <GlobalCustomButton
              color="warning"
              onClick={() => setPolicyType("Pending")}
            >
              View Pending Policies
            </GlobalCustomButton>
          ) : (
            <GlobalCustomButton
              color="success"
              onClick={() => setPolicyType("Approved")}
            >
              View Approved Policies
            </GlobalCustomButton>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 180px)",
          overflowY: "auto",
        }}
      >
        <CustomTable
          title={""}
          columns={policyColumns}
          data={policies}
          pointerOnHover
          highlightOnHover
          striped
          onRowClicked={handleRow}
          progressPending={loading}
          //conditionalRowStyles={conditionalRowStyles}
        />
      </Box>
    </Box>
  );
};

const CorporatePolicyDetails = ({goBack}) => {
  const {reset, register, control, setValue} = useForm();
  const {state, setState} = useContext(ObjectContext);
  const selectedPolicy = state.CorporateModule.selectedPolicy;

  useEffect(() => {
    const initFormValue = {
      policyNo: selectedPolicy?.policyNo,
      phone: selectedPolicy?.principal?.phone,
      start_date: selectedPolicy?.validitystarts,
      end_date: selectedPolicy?.validityEnds,
      approval_date: selectedPolicy?.approvalDate,
      approved_by: selectedPolicy?.approvedby?.employeename,
      status: selectedPolicy?.approved ? "Approved" : "Pending",
      sponsorship_type: selectedPolicy?.sponsorshipType,
      plan_type: selectedPolicy?.plan?.planName,
      policy_tag: selectedPolicy?.principal?.clientTags,
      familyPremium: selectedPolicy?.plan?.premiums?.[0]?.familyPremium,
      individualPremium: selectedPolicy?.plan?.premiums?.[0]?.individualPremium,
      sponsor_name: selectedPolicy.sponsor?.organizationDetail?.facilityName,
      sponsor_phone:
        selectedPolicy.sponsor?.organizationDetail?.facilityContactPhone,
      sponsor_email: selectedPolicy.sponsor?.organizationDetail?.facilityEmail,
      sponsor_address:
        selectedPolicy.sponsor?.organizationDetail?.facilityAddress,
    };
    reset(initFormValue);
  }, [state.CorporateModule.selectedPolicy]);

  return (
    <Box
      sx={{
        overflowY: "scroll",
        width: "100%",
        height: "calc(100vh - 80px)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          //justifyContent: "space-between",
          borderBottom: "1px solid #f8f8f8",
          backgroundColor: "#f8f8f8",
          position: "sticky",
          zIndex: 99,
          top: 0,
          left: 0,
        }}
        gap={1}
        p={2}
      >
        <GlobalCustomButton onClick={goBack}>
          <ArrowBackIcon />
          Go Back
        </GlobalCustomButton>

        <FormsHeaderText
          text={` Policy details for ${selectedPolicy?.principal?.firstname} ${selectedPolicy?.principal?.lastname}`}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
        p={2}
      >
        <Grid container spacing={2}>
          <Grid item md={3}>
            <Input
              register={register("policyNo", {required: true})}
              label="Policy No."
              disabled
            />
          </Grid>

          <Grid item md={3}>
            <Input
              register={register("phone", {required: true})}
              label="Phone"
              disabled
            />
          </Grid>
          <Grid item md={3}>
            <Input
              register={register("sponsorship_type", {required: true})}
              label="Sponsorship Type"
              disabled
            />
          </Grid>

          <Grid item md={3}>
            <Input
              register={register("status", {required: true})}
              label="Status"
              disabled
              important
              //placeholder="Enter customer name"
            />
          </Grid>

          <Grid item md={3}>
            <Input
              register={register("policy_tag")}
              label="Policy Tag"
              disabled
              // placeholder="Enter customer name"
            />
          </Grid>
          {selectedPolicy?.planType === "Family" ? (
            <Grid item md={3}>
              <Input
                label="Family Premium"
                disabled
                value={selectedPolicy?.plan?.premiums?.map(p => {
                  if (p.planType === "Family") {
                    return p.premiumAmount;
                  }
                })}
              />
            </Grid>
          ) : (
            <Grid item md={3}>
              <Input
                label="Individual Premium"
                disabled
                value={selectedPolicy?.plan?.premiums?.map(p => {
                  if (p.planType === "Individual") {
                    return p.premiumAmount;
                  }
                })}
              />
            </Grid>
          )}

          <Grid item md={3}>
            <MuiCustomDatePicker
              label="Start Date"
              name="start_date"
              control={control}
              disabled={true}
            />
          </Grid>
          <Grid item md={3}>
            <MuiCustomDatePicker
              label="End Date"
              name="end_date"
              control={control}
              disabled={true}
            />
          </Grid>
          {selectedPolicy?.approved && (
            <Grid item md={3}>
              <Input
                register={register("approved_by")}
                label="Approved By"
                disabled
                //placeholder="Enter customer name"
              />
            </Grid>
          )}
          {selectedPolicy?.approved && (
            <Grid item md={3}>
              <MuiCustomDatePicker
                label="Approval Date"
                name="approval_date"
                control={control}
                disabled
              />
            </Grid>
          )}
        </Grid>

        {selectedPolicy?.sponsorshipType === "Company" && (
          <>
            <FormsHeaderText text="Sponsor Details" />
            <Grid container spacing={1}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Input
                  register={register("sponsor_name")}
                  label="Sponsor Name"
                  disabled
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Input
                  register={register("sponsor_phone")}
                  label="Sponsor Phone"
                  disabled
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Input
                  register={register("sponsor_email")}
                  label="Sponsor Email"
                  disabled
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Input
                  register={register("sponsor_address")}
                  label="Sponsor Address"
                  disabled
                />
              </Grid>
            </Grid>
          </>
        )}

        <Box>
          <FormsHeaderText text="Principal Details" />
          <CustomTable
            title={""}
            columns={beneficiaryColumns}
            data={[selectedPolicy?.principal]}
            pointerOnHover
            highlightOnHover
            striped
            onRowClicked={() => {}}
            progressPending={false}
            CustomEmptyData="No Principal for this Policy."
          />
        </Box>

        <Box>
          <FormsHeaderText text="Dependant Details" />
          <CustomTable
            title={""}
            columns={beneficiaryColumns}
            data={selectedPolicy?.dependantBeneficiaries}
            pointerOnHover
            highlightOnHover
            striped
            onRowClicked={() => {}}
            progressPending={false}
            CustomEmptyData="There are no Dependent(s) for this Policy."
          />
        </Box>

        <Box>
          <FormsHeaderText text="HMO" />
          <CustomTable
            title={""}
            columns={organizationColumns}
            data={[selectedPolicy?.organization]}
            pointerOnHover
            highlightOnHover
            striped
            onRowClicked={() => {}}
            progressPending={false}
            CustomEmptyData="There are no HMO(s) for this Policy."
          />
        </Box>

        <Box>
          <FormsHeaderText text="Provider List" />
          <CustomTable
            title={""}
            columns={providersColumns}
            data={selectedPolicy?.providers}
            pointerOnHover
            highlightOnHover
            striped
            onRowClicked={() => {}}
            progressPending={false}
            CustomEmptyData="There are no Provider(s) for this Policy."
          />
        </Box>
      </Box>
    </Box>
  );
};
