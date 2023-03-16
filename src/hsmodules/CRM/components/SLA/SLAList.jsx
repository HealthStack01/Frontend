import {useContext, useState, useEffect, useCallback} from "react";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import {Box} from "@mui/material";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import CustomTable from "../../../../components/customtable";
import FilterMenu from "../../../../components/utilities/FilterMenu";
import {TableMenu} from "../../../../ui/styled/global";
import {PageWrapper} from "../../../../ui/styled/styles";
import {ObjectContext, UserContext} from "../../../../context";
import dayjs from "dayjs";
import client from "../../../../feathers";
import {toast} from "react-toastify";

export function SLAList({showDetail, showCreate, isTab}) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const dealServer = client.service("deal");
  const [loading, setLoading] = useState(false);
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const [slaList, setSLAList] = useState([]);
  const [deal, setDeal] = useState({});

  const getSLAForPage = useCallback(async () => {
    const testId = "60203e1c1ec8a00015baa357";
    const facId = user.currentEmployee.facilityDetail._id;
    setLoading(true);

    const res = await dealServer.find({
      query: {
        facilityId: facId,
      },
    });

    const deals = res.data;

    // console.log(deals);

    const promises = deals.map(async deal => deal.sla || []);

    const sla = await Promise.all(promises);

    const finalSLA = sla.flat(1).map(item => {
      const deal = deals.find(deal => deal._id === item.dealId);
      return {
        ...item,
        dealinfo: deal.dealinfo,
      };
    });

    // const resultingSla = finalSLA.map(item => {
    //   const deal = deals.find(deal => deal._id === item.dealId);
    //   return {
    //     ...item,
    //     dealInfo: deal.dealinfo,
    //   };
    // });

    // console.log(resultingSla);

    // const currentDeal = deals.find(item => item._id === finalSLA[0].dealId);

    // setDeal(currentDeal.dealinfo);

    await setSLAList(finalSLA || []);

    setLoading(false);
  }, []);

  useEffect(() => {
    if (isTab) {
      const currentDeal = state.DealModule.selectedDeal;
      setDeal(currentDeal.dealinfo);
      setSLAList(currentDeal.sla || []);
    } else {
      getSLAForPage();
    }
  }, [state.DealModule, getSLAForPage, isTab]);

  const handleCreateNew = () => {
    showCreate();
  };

  const handleRow2 = data => {
    setState(prev => ({
      ...prev,
      SLAModule: {...prev.SLAModule, selectedSLA: data},
    }));

    if (data.status === "Draft") {
      showCreate();
    } else {
      showDetail();
    }
  };

  const handleRow = async data => {
    if (isTab) {
      setState(prev => ({
        ...prev,
        SLAModule: {...prev.SLAModule, selectedSLA: data},
      }));

      if (data.status === "Draft") {
        showCreate();
      } else {
        showDetail();
      }
    } else {
      const id = data.dealId;
      await dealServer
        .get(id)
        .then(resp => {
          setState(prev => ({
            ...prev,
            DealModule: {...prev.DealModule, selectedDeal: resp},
            SLAModule: {...prev.SLAModule, selectedSLA: data},
          }));
          if (data.status === "Draft") {
            showCreate();
          } else {
            showDetail();
          }
        })
        .catch(err => {
          toast.error("An error occured trying to view details of SLA");
          console.log(err);
        });
    }
  };

  const handleSearch = () => {};

  const returnCell = status => {
    switch (status.toLowerCase()) {
      case "active":
        return <span style={{color: "#17935C"}}>{status}</span>;

      case "inactive":
        return <span style={{color: "#0364FF"}}>{status}</span>;

      default:
        break;
    }
  };

  // const deal = state.DealModule.selectedDeal.dealinfo;

  const returnStatus = status => {
    switch (status?.toLowerCase()) {
      case "open":
        return <span style={{color: "#004b23"}}>{status}</span>;

      case "suspended":
        return <span style={{color: "orange"}}>{status}</span>;

      case "closed":
        return <span style={{color: "red"}}>{status}</span>;

      default:
        break;
    }
  };

  const SLAColumns = [
    {
      name: "SN",
      key: "sn",
      description: "Enter name of Company",
      selector: (row, i) => i + 1,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      width: "50px",
    },

    {
      name: "Customer Name",
      key: "company_name",
      description: "Enter name of Company",
      selector: row => row.customerName,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
    {
      name: "Customer Email",
      key: "contact_person",
      description: "Enter Telestaff name",
      selector: row => row.customerEmail,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Customer Phone",
      key: "contact_position",
      description: "Enter bills",
      selector: row => row.customerPhone,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Deal Probability",
      key: "contact_position",
      description: "Enter bills",
      selector: row => (!isTab ? row.dealinfo.probability : deal?.probability),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Deal Status",
      key: "phone_No",
      description: "Enter name of Disease",
      selector: "currStatus",
      cell: row =>
        returnStatus(!isTab ? row.dealinfo.currStatus : deal?.currStatus),
      // selector: (row, i) =>
      //   !isTab ? row.dealinfo.currStatus : deal?.currStatus,
      sortable: true,
      required: true,
      inputType: "DATE",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Date",
      key: "contact_position",
      description: "Enter bills",
      selector: row => dayjs(row.createdAt).format("DD/MM/YYYY hh:mm A"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Creator",
      key: "contact_position",
      description: "Enter bills",
      selector: row => row.createdByName,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },

    {
      name: "Status",
      key: "status",
      description: "Enter bills",
      selector: "status",
      cell: row => row.status,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  const conditionalRowStyles = [
    {
      when: row => row.status === "Sent",
      style: {
        backgroundColor: "#d8f3dc",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
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
              <h2 style={{margin: "0 10px", fontSize: "0.95rem"}}>SLA</h2>
            </div>

            {isTab && (
              <GlobalCustomButton onClick={handleCreateNew}>
                <AddCircleOutline fontSize="small" sx={{marginRight: "5px"}} />
                Create New SLA
              </GlobalCustomButton>
            )}
          </TableMenu>

          <Box style={{width: "100%", overflow: "auto"}}>
            <CustomTable
              title={""}
              columns={SLAColumns}
              data={slaList}
              pointerOnHover
              highlightOnHover
              striped
              onRowClicked={handleRow}
              progressPending={loading}
              conditionalRowStyles={conditionalRowStyles}
            />
          </Box>
        </PageWrapper>
      </div>
    </>
  );
}
