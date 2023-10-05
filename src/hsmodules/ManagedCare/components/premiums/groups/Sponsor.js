import {useState, useContext, useEffect, useCallback, useMemo} from "react";

import GlobalCustomButton from "../../../../../components/buttons/CustomButton";
import {Box, Typography} from "@mui/material";
import dayjs from "dayjs";

const groupPremiumBySponsor = premiums => {
  const grouped = premiums.reduce((result, item) => {
    item.providers.forEach(option => {
      const optionId = option.facilityDetail
        ? option.facilityDetail?._id
        : option._id;

      // Check if the optionId already exists in the result object
      if (!result[optionId]) {
        result[optionId] = {
          id: optionId,
          ...option,
          policies: [],
          // names: [],
        };
      }

      // Push the value and name to the corresponding option group
      const obj = {
        ...item,
      };
      result[optionId].policies.push(JSON.stringify(obj));
      //result[optionId].names.push(option.name);
    });

    return result;
  }, {});

  return grouped;
};

const SponsorGroupedPremiumnsListComponent = ({premiums, loading}) => {
  // const [loading, setLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [toggleCleared, setToggleCleared] = useState(false);

  const handleRow = provider => {
    setToggleCleared(!toggleCleared);
    if (selectedProvider && selectedProvider.id === provider.id) {
      setSelectedProvider(null);
    } else {
      setSelectedProvider(provider);
    }
  };

  const groupedPremiums = groupPremiumBySponsor(premiums);
  const finalPremiums = Object.values(groupedPremiums);

  const providerColumns = [
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
      name: "Provider",
      key: "createdAt",
      description: "Date Created",
      selector: row => (
        <Typography
          sx={{fontSize: "0.8rem", whiteSpace: "normal"}}
          data-tag="allowRowEvents"
        >
          {row?.facilityName}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "DATE",
      style: {
        color: "#1976d2",
        textTransform: "capitalize",
        fontWeight: "bold",
      },
    },

    {
      name: "Email",
      key: "createdAt",
      description: "Date Created",
      selector: row => row?.facilityEmail,
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Phone Number",
      key: "createdAt",
      description: "Date Created",
      selector: row => row?.facilityContactPhone,
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Premiums",
      key: "createdAt",
      description: "Date Created",
      selector: row => row?.policies?.length,
      sortable: true,
      required: true,
      inputType: "DATE",
    },
  ];

  const conditionalRowStyles = [
    {
      when: row => row.id === selectedProvider?.id,
      style: {
        backgroundColor: "#4cc9f0",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];

  const onPolicyRowClicked = () => {};

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        gap: "24px",
      }}
    >
      <Box
        sx={{
          width: selectedProvider ? "35%" : "100%",
          height: "calc(100vh - 160px)",
          transition: "width 0.5s ease-in",
          overflowY: "auto",
        }}
      >
        <CustomTable
          title={""}
          columns={providerColumns}
          data={finalPremiums || []}
          pointerOnHover
          highlightOnHover
          striped
          onRowClicked={handleRow}
          progressPending={loading}
          conditionalRowStyles={conditionalRowStyles}
        />
      </Box>

      {selectedProvider && (
        <Box
          sx={{
            width: "65%",
            height: "calc(100vh - 180px)",
            overflowY: "auto",
          }}
        >
          <PoliciesListTableComponent
            policies={selectedProvider ? selectedProvider.policies : []}
            onRowClicked={onPolicyRowClicked}
            toggleCleared={toggleCleared}
            setToggleCleared={setToggleCleared}
          />
        </Box>
      )}
    </Box>
  );
};

export default SponsorGroupedPremiumnsListComponent;

const PoliciesListTableComponent = ({
  policies,
  onRowClicked,
  toggleCleared,
  setToggleCleared,
}) => {
  const [selectedPolicies, setSelectedPolicies] = useState([]);

  const returnSponsorName = row => {
    const type = row.sponsorshipType;
    const companyName = row?.sponsor?.organizationDetail?.facilityName
      ? row?.sponsor?.organizationDetail?.facilityName
      : row?.sponsor?.facilityName;
    const principalName = `${row?.principal?.firstname} ${row?.principal?.lastname}`;

    const sponsorName = type === "Self" ? principalName : companyName;

    return sponsorName;
  };

  const dateIsExpired = date => {
    const newDate = dayjs(date);
    const currentTime = dayjs();

    if (newDate.isBefore(currentTime)) {
      return true;
    } else {
      return false;
    }
  };

  const returnString = row => {
    const expired = dateIsExpired(row.validityEnds);

    const string = expired
      ? `${dayjs(row?.validityEnds).format("DD-MM-YYYY")}(Expired)`
      : dayjs(row?.validityEnds).format("DD-MM-YYYY");

    return string;
  };

  const handleRow = () => {};

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
      name: "Start Date",
      key: "createdAt",
      description: "Date Created",
      selector: row => dayjs(row?.validitystarts).format("DD-MM-YYYY"),
      sortable: true,
      required: true,
      inputType: "DATE",
    },

    {
      name: "End Date",
      key: "createdAt",
      description: "Date Created",
      selector: row => returnString(row),
      sortable: true,
      required: true,
      inputType: "DATE",
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
  ];

  const conditionalRowStyles = [
    {
      when: row => dateIsExpired(row?.validityEnds),
      style: {
        backgroundColor: "#ffc2d1",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];

  const contextActions = useMemo(() => {
    const handleAction = () => {
      console.log("new-action");
    };

    return (
      <Box sx={{display: "flex", gap: "10px"}}>
        <GlobalCustomButton
          key="action"
          onClick={handleAction}
          //style={{backgroundColor: 'red'}}
        >
          Action
        </GlobalCustomButton>
      </Box>
    );
  }, [selectedPolicies, policies, toggleCleared]);

  const handleRowSelected = useCallback(state => {
    setSelectedPolicies(state.selectedRows);
  }, []);

  const parsedPolicies = policies.map(item => JSON.parse(item));

  return (
    <>
      <CustomTable
        title={"Policies"}
        columns={policyColumns}
        data={parsedPolicies || []}
        pointerOnHover
        highlightOnHover
        striped
        onRowClicked={onRowClicked}
        progressPending={false}
        selectable
        conditionalRowStyles={conditionalRowStyles}
        contextActions={contextActions}
        clearSelectedRows={toggleCleared}
        noHeader={false}
        onSelectedRowsChange={handleRowSelected}
      />
    </>
  );
};
