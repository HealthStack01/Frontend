import {Box, Typography} from "@mui/material";
import {useContext, useState, useCallback, useEffect, useMemo} from "react";
import GlobalCustomButton from "../../../components/buttons/CustomButton";
import FilterMenu from "../../../components/utilities/FilterMenu";
import {ObjectContext, UserContext} from "../../../context";
import CustomTable from "../../../components/customtable";
import client from "../../../feathers";
import dayjs from "dayjs";
import ModalBox from "../../../components/modal";
import ProviderPaymentClaimsStatus from "./UpdateClaimsStatus";
import Checkbox from "@mui/material/Checkbox";

const options = [
  {
    name: "Queued",
    value: "Queued for Payment",
    type: "warning",
  },
  {
    name: "Instructions",
    value: "Payment Instruction Sent",
    type: "info",
  },
  {
    name: "Paid",
    value: "Paid",
    type: "success",
  },
];

const groupClaimsByDateAndId = data => {
  const groupedData = [];

  data.forEach(obj => {
    const date = new Date(obj.updatedAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const key = `${year}-${month}`;
    const providerId = obj.provider._id;

    // Check if the group already exists in the result array
    const existingGroup = groupedData.find(
      group => group.key === key && group.providerId === providerId
    );

    if (existingGroup) {
      existingGroup.data.push(obj);
    } else {
      // Create a new group if it doesn't exist
      groupedData.push({key, providerId, data: [obj]});
    }
  });

  //const groupedClaims = Object.values(groupedData);

  return groupedData;
};

const ProvidersPaymentList = ({showClaimsDetail}) => {
  const claimsServer = client.service("claims");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("Queued for Payment");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [claims, setClaims] = useState([]);
  const [rendered, setRendered] = useState(false);
  const [selectedProviders, setSelectedProviders] = useState([]);
  const [selectedClaims, setSelectedClaims] = useState([]);
  const [statusModal, setStatusModal] = useState(false);

  const title = `${type} List`;

  const fetchProviderPayments = useCallback(async () => {
    if (rendered) {
      showActionLoader();
    } else {
      setLoading(true);
    }
    //setLoading(true);

    let query = {
      status: type,
      $or: [
        {"provider._id": user.currentEmployee.facilityDetail._id},
        {"hmopayer._id": user.currentEmployee.facilityDetail._id},
      ],
      $sort: {
        createdAt: -1,
      },
    };

    const resp = await claimsServer.find({query: query});

    const claims = resp.data;

    setClaims(claims);

    const claimsGroupedByDate = groupClaimsByDateAndId(claims);

    const groupedClaimsData = claimsGroupedByDate.map(item => item.data);

    const finalData = groupedClaimsData.map(item => {
      const totalAmounts = item.reduce(
        (sum, obj) => sum + obj.totalamount || 0,
        0
      );
      return {
        id: item[0]._id,
        claimsId: item[0].claimid,
        dateCreated: item[0].createdAt,
        provider: item[0].provider.facilityName,
        providerId: item[0].provider._id,
        aggAmount: totalAmounts,
        status: item[0].status,
        claims: item,
      };
    });

    const isPresent = selectedPayment
      ? finalData.some(obj => obj._id === selectedPayment._id)
      : false;

    if (!isPresent) {
      setSelectedPayment(null);
    }

    setPayments(finalData);
    if (rendered) {
      hideActionLoader();
    } else {
      setLoading(false);
    }

    setRendered(true);
  }, [type, user]);

  useEffect(() => {
    fetchProviderPayments();

    claimsServer.on("created", obj => {
      fetchProviderPayments();
    });
    claimsServer.on("updated", obj => {
      // const newClaims = updateOnUpdated(claims, obj);

      // setClaims(newClaims);
      fetchProviderPayments();
    });
    claimsServer.on("patched", obj => {
      fetchProviderPayments();
    });
    claimsServer.on("removed", obj => {
      fetchProviderPayments();
    });
  }, [fetchProviderPayments]);

  const handleSearch = () => {};

  const paymentColumns = [
    {
      name: "S/N",
      inputType: "HIDDEN",
      sortable: true,
      selector: (row, i) => i + 1,
      width: "60px",
    },
    {
      name: "Provider",
      inputType: "HIDDEN",
      selector: row => row.provider,
      sortable: true,
    },
    {
      name: "Month",
      inputType: "HIDDEN",
      selector: row => dayjs(row.dateCreated).format("MMM, YYYY"),
      sortable: true,
    },
    {
      name: "Claims",
      inputType: "HIDDEN",
      selector: row => row?.claims?.length,
      sortable: true,
    },

    {
      name: "Aggregated Amount",
      inputType: "HIDDEN",
      selector: row => row.aggAmount,
      sortable: true,
    },
    {
      name: "Status",
      inputType: "HIDDEN",
      selector: row => row.status,
      sortable: true,
    },
  ];

  const handleRow = payment => {
    setToggleCleared(!toggleCleared);
    if (selectedPayment && selectedPayment.id === payment.id) {
      setSelectedPayment(null);
    } else {
      setSelectedPayment(payment);
    }
  };

  const onClaimsRowClick = claim => {
    setState(prev => ({
      ...prev,
      ClaimsModule: {
        ...prev.ClaimsModule,
        selectedClaim: claim,
      },
      ClientModule: {
        ...prev.ClientModule,
        selectedClient: claim.beneficiary,
      },
    }));

    showClaimsDetail();
  };

  const conditionalRowStyles = [
    {
      when: row => row.id === selectedPayment?.id,
      style: {
        backgroundColor: "#4cc9f0",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];

  const changeType = type => {
    setType(type);
    setSelectedPayment(null);
  };

  const handleRowSelected = useCallback(state => {
    //console.log(state);
    setSelectedProviders(state.selectedRows);
  }, []);

  const contextActions = useMemo(() => {
    const handleAction = () => {
      setStatusModal(true);
      //console.log(selectedClaims);
    };

    return (
      <Box sx={{display: "flex", gap: "10px"}}>
        <GlobalCustomButton
          key="delete"
          onClick={handleAction}
          //style={{backgroundColor: 'red'}}
        >
          Update Selected Provider Claims
        </GlobalCustomButton>
      </Box>
    );
  }, [selectedClaims, payments, toggleCleared]);

  return (
    <Box p={2}>
      <ModalBox
        open={statusModal}
        onClose={() => setStatusModal(false)}
        header={`Update Status for ${selectedClaims?.length} Claim(s)`}
      >
        <ProviderPaymentClaimsStatus
          closeModal={() => setStatusModal(false)}
          setToggleCleared={setToggleCleared}
          claims={selectedClaims}
          selectedClaims={selectedClaims}
        />
      </ModalBox>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        mb={2}
      >
        <Box
          sx={{
            display: "flex",
            minWidth: "200px",
            gap: 1.5,
            alignItems: "center",
          }}
        >
          <FilterMenu onSearch={handleSearch} />
          <Typography>{title}</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            alignItems: "center",
          }}
        >
          {options.map(item => (
            <GlobalCustomButton
              key={item.name}
              onClick={() => {
                changeType(item.value);
                setToggleCleared(prev => !prev);
                setSelectedClaims([]);
                setSelectedProviders([]);
              }}
              color={item.type}
              sx={
                type === item.value
                  ? {
                      backgroundColor: "#ffffff",
                      color: "#000000",
                      "&:hover": {
                        backgroundColor: "#ffffff",
                      },
                    }
                  : {}
              }
            >
              {item.name}
            </GlobalCustomButton>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: "24px",
        }}
      >
        <Box
          sx={{
            width: selectedPayment ? "40%" : "100%",
            height: "calc(100vh - 140px)",
            transition: "width 0.5s ease-in",
            overflowY: "auto",
          }}
        >
          <CustomTable
            title={"Providers List"}
            columns={paymentColumns}
            data={payments || []}
            pointerOnHover
            highlightOnHover
            striped
            onRowClicked={handleRow}
            progressPending={loading}
            conditionalRowStyles={conditionalRowStyles}
            selectable
            noHeader={false}
            contextActions={contextActions}
            onSelectedRowsChange={handleRowSelected}
            clearSelectedRows={toggleCleared}
          />
        </Box>

        {selectedPayment && (
          <Box
            sx={{
              width: "60%",
              height: "calc(100vh - 140px)",
              overflowY: "auto",
            }}
          >
            <ClaimsTableComoponent
              claims={selectedPayment ? selectedPayment.claims : []}
              onRowClicked={onClaimsRowClick}
              toggleCleared={toggleCleared}
              setToggleCleared={setToggleCleared}
              selectedClaims={selectedClaims}
              setSelectedClaims={setSelectedClaims}
              providers={selectedProviders}
              selectedProvdier={selectedPayment}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProvidersPaymentList;

const ClaimsTableComoponent = ({
  claims,
  onRowClicked,
  toggleCleared,
  setToggleCleared,
  selectedClaims,
  setSelectedClaims,
  providers,
  selectedProvdier,
}) => {
  const [statusModal, setStatusModal] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [hidden, setHidden] = useState(false);
  // const [selectedClaims, setSelectedClaims] = useState([]);

  const providerSelectedClaims = selectedClaims.filter(
    item => item.provider._id === selectedProvdier.providerId
  );

  const handleParentChange = e => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedClaims(prev => [...claims, ...prev]);
      console.log(claims);
      setSelectAll(true);
    } else {
      claims.map(claim => {
        setSelectedClaims(prev => prev.filter(item => item._id !== claim._id));
      });
      // setSelectedClaims([]);
      setSelectAll(false);
    }
  };

  useEffect(() => {
    if (providers.length > 0) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  }, [providers]);

  const handleChildChange = (e, claim) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedClaims(prev => [claim, ...prev]);
    } else {
      setSelectedClaims(prev => prev.filter(item => item._id !== claim._id));
    }
  };

  const claimsColumns = [
    {
      name: (
        <Checkbox
          size="small"
          color="success"
          checked={providerSelectedClaims.length === claims.length}
          indeterminate={
            providerSelectedClaims.length > 0 &&
            providerSelectedClaims.length !== claims.length
          }
          onChange={handleParentChange}
          sx={{
            transform: "scale(0.8)",
            padding: 0,
            marginLeft: "13px",
          }}
        />
      ),
      key: "healthcare plan",
      description: "Enter name of Healthcare Plan",
      cell: (row, i) => (
        <Checkbox
          size="small"
          checked={selectedClaims.some(obj => {
            return obj._id === row._id;
          })}
          onChange={e => handleChildChange(e, row)}
          sx={{
            transform: "scale(0.8)",
            padding: 0,
            marginLeft: "10px",
          }}
        />
      ),
      sortable: false,
      required: true,
      inputType: "HIDDEN",
      width: "60px",
      omit: hidden,
    },
    {
      name: "S/N",
      key: "healthcare plan",
      description: "Enter name of Healthcare Plan",
      cell: (row, i) => i + 1,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      width: "60px",
    },
    {
      name: "Date",
      key: "healthcare plan",
      description: "Enter name of Healthcare Plan",
      cell: row => dayjs(row.createdAt).format("DD/MM/YYYY"),
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      width: "100px",
      selector: "createdAt",
    },
    {
      name: "Patient Name",
      key: "healthcare plan",
      description: "Enter name of Healthcare Plan",
      cell: row => (
        <Typography
          sx={{fontSize: "0.8rem", whiteSpace: "normal"}}
          data-tag="allowRowEvents"
        >
          {row.beneficiary.firstname} {row.beneficiary.lastname}
        </Typography>
      ),
      style: {
        color: "#1976d2",
        textTransform: "capitalize",
      },
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      //selector: "beneficiary",
    },
    {
      name: "State",
      key: "healthcare plan",
      description: "Enter name of Healthcare Plan",
      cell: row => row.patientstate,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      width: "100px",
      style: {
        textTransform: "capitalize",
      },
      //selector: "patientstate",
    },

    {
      name: "Num of Services",
      key: "healthcare plan",
      description: "Enter name of Healthcare Plan",
      cell: row => row.services.length,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      //selector: "services",
    },

    {
      name: "Total Amount",
      key: "bills",
      description: "Enter bills",
      cell: row => `₦${row?.totalamount}`,
      sortable: true,
      required: true,
      inputType: "TEXT",
      //selector: "totalamount",
    },
  ];

  const handleRowSelected = useCallback(state => {
    console.log("providers");
    if (providers.length > 0) {
      setSelectedClaims(prev => [...state.selectedRows, ...prev]);
    } else {
      setSelectedClaims(state.selectedRows);
    }
  }, []);

  const contextActions = useMemo(() => {
    const handleAction = () => {
      setStatusModal(true);
    };

    return (
      <Box sx={{display: "flex", gap: "10px"}}>
        <GlobalCustomButton
          key="delete"
          onClick={handleAction}
          //style={{backgroundColor: 'red'}}
        >
          Update Status
        </GlobalCustomButton>
      </Box>
    );
  }, [selectedClaims, claims, toggleCleared]);

  return (
    <>
      <ModalBox
        open={statusModal}
        onClose={() => setStatusModal(false)}
        header={`Update Status for ${selectedClaims?.length} Claim(s)`}
      >
        <ProviderPaymentClaimsStatus
          closeModal={() => setStatusModal(false)}
          setToggleCleared={setToggleCleared}
          claims={selectedClaims}
        />
      </ModalBox>

      <CustomTable
        title={`Showing Claims for ${selectedProvdier.provider}`}
        columns={claimsColumns}
        data={claims || []}
        pointerOnHover
        highlightOnHover
        striped
        onRowClicked={onRowClicked}
        progressPending={false}
        selectable={hidden}
        contextActions={contextActions}
        clearSelectedRows={toggleCleared}
        noHeader={false}
        selectableRowsHighlight
        onSelectedRowsChange={handleRowSelected}
        //selectableRowSelected={rowSelectCritera}
      />
    </>
  );
};
