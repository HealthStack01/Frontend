import {useState, useContext, useEffect, useCallback} from "react";

import {UserContext, ObjectContext} from "../../../../context";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import CustomTable from "../../../../components/customtable";
import FilterMenu from "../../../../components/utilities/FilterMenu";
import {TableMenu} from "../../../../ui/styled/global";
import {PageWrapper} from "../../../app/styles";
import client from "../../../../feathers";
import {toast} from "react-toastify";
import {Box} from "@mui/material";
import dayjs from "dayjs";

const PremiumnsListComponent = ({showDetailView}) => {
  const policyServer = client.service("policy");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);

  const {user, setUser} = useContext(UserContext);
  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [premiums, setPremiums] = useState([]);

  const getPremiums = useCallback(async () => {
    let query = {
      organizationId: user.currentEmployee.facilityDetail._id,
      approved: true,
      invRenwgen: {
        $ne: true,
      },
      validityEnds: {
        $lte: dayjs(),
      },
      $sort: {
        createdAt: -1,
      },
    };

    policyServer
      .find({
        query: query,
      })
      .then(resp => {
        const data = resp.data;
        const premiums = data.map(item => {
          const planType = item?.planType || "Family";
          const planPremiums = item?.plan?.premiums;

          const activePremiun = planPremiums.find(
            item => item.planType.toLowerCase() === planType.toLowerCase()
          );

          return {
            ...item,
            premium: activePremiun,
          };
        });
        // console.log(premiums[0]);
        setPremiums(premiums);
      })
      .catch(err => {
        toast.error(`Something went wrong! ${err}`);
      });
  }, []);

  useEffect(() => {
    getPremiums();
  }, [getPremiums]);

  const handleRow = async data => {};

  const handleSearch = () => {};

  const returnSponsorName = row => {
    const type = row.sponsorshipType;
    const companyName = row?.sponsor?.organizationDetail?.facilityName
      ? row?.sponsor?.organizationDetail?.facilityName
      : row?.sponsor?.facilityName;
    const principalName = `${row?.principal?.firstname} ${row?.principal?.lastname}`;

    const sponsorName = type === "Self" ? principalName : companyName;

    return sponsorName;
  };

  const premiumColumns = [
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
      name: "Date Joined",
      key: "createdAt",
      description: "Date Created",
      selector: row => dayjs(row?.createdAt).format("DD-MM-YYYY"),
      sortable: true,
      required: true,
      inputType: "DATE",
    },

    {
      name: "Principal's Name",
      key: "principal",
      description: "Principal Last Name",
      selector: row =>
        `${row?.principal?.firstname} - ${row?.principal?.lastname}`,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },

    {
      name: "Dependents",
      key: "principal",
      description: "No of dependents",
      selector: row => row?.dependantBeneficiaries?.length,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },

    {
      name: "Policy Number",
      key: "policyNo",
      description: "Phone Number",
      selector: row => row?.policyNo,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
    {
      name: "Sponsor Type",
      key: "sponsorshipType",
      description: "Sponsorship Type",
      selector: row => row?.sponsorshipType,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Sponsor Name",
      key: "sponsor",
      description: "Sponsor name",
      selector: row => returnSponsorName(row),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Plan",
      key: "sponsorshipType",
      description: "Sponsorship Type",
      selector: row => row?.plan?.planName,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Plan Type",
      key: "plan",
      description: "Plan",
      selector: row => row?.planType,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Premium Amount",
      key: "premiumAmount",
      description: "Sponsorship Type",
      selector: row => row?.premium?.premiumAmount,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Premium Duration",
      key: "premiumAmount",
      description: "Sponsorship Type",
      selector: row => row?.premium?.premiumDuration,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    // {
    //   name: "Providers",
    //   key: "provider",
    //   description: "Provider",
    //   selector: row => row?.providers?.length,
    //   sortable: true,
    //   required: true,
    //   inputType: "TEXT",
    // },
  ];

  return (
    <>
      <div className="level">
        <PageWrapper style={{flexDirection: "column", padding: "0.6rem 1rem"}}>
          <TableMenu>
            <div style={{display: "flex", alignItems: "center"}}>
              {handleSearch && (
                <div className="inner-table">
                  <FilterMenu onSearch={handleSearch} />
                </div>
              )}
              <h2 style={{margin: "0 10px", fontSize: "0.95rem"}}>
                List of Paid Premiums
              </h2>
            </div>

            <Box>
              <GlobalCustomButton onClick={() => console.log()}>
                <AddCircleOutlineOutlined
                  fontSize="small"
                  sx={{marginRight: "5px"}}
                />
                Unpaid Premiums
              </GlobalCustomButton>
            </Box>
          </TableMenu>
          <div style={{width: "100%", overflow: "auto"}}>
            <CustomTable
              title={""}
              columns={premiumColumns}
              data={premiums}
              pointerOnHover
              highlightOnHover
              striped
              onRowClicked={handleRow}
              progressPending={loading}
            />
          </div>
        </PageWrapper>
      </div>
    </>
  );
};

export default PremiumnsListComponent;
