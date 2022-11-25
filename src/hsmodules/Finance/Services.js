/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "react-toastify";
import {FacilitySearch} from "../helpers/FacilitySearch";
import CategorySearch from "../helpers/CategorySearch";
import CustomTable from "../../components/customtable";
import {PageWrapper} from "../../ui/styled/styles";
import {TableMenu} from "../../ui/styled/global";
import FilterMenu from "../../components/utilities/FilterMenu";
import AddIcon from "@mui/icons-material/Add";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

// Demo styles, see 'Styles' section below for some notes on use.

import {StoreModify} from "../inventory/Store";
import ModalBox from "../../components/modal";
import Input from "../../components/inputs/basic/Input";
import {
  Box,
  Button as MuiButton,
  Card,
  Collapse,
  Divider,
  Grid,
  Grow,
  Typography,
} from "@mui/material";
import CheckboxInput from "../../components/inputs/basic/Checkbox";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import {FormsHeaderText} from "../../components/texts";
// eslint-disable-next-line
const searchfacility = {};

export default function FinanceServices() {
  const {state} = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedServices, setSelectedServices] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail
  const [createModal, setCreateModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [modifyModal, setModifyModal] = useState(false);

  const handleOpenCreateModal = () => {
    setCreateModal(true);
  };
  const handleCloseCreateModal = () => {
    setCreateModal(false);
  };

  const handleOpenDetailModal = () => {
    setDetailModal(true);
  };
  const handleCloseDetailModal = () => {
    setDetailModal(false);
  };

  const handleOpenModifyModal = () => {
    setModifyModal(true);
    setDetailModal(false);
  };
  const handleCloseModifyModal = () => {
    setModifyModal(false);
  };

  return (
    <section className="section remPadTop">
      {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">Services  Module</span></div>
            </div> */}

      <ServicesList
        openCreateModal={handleOpenCreateModal}
        openDetallModal={handleOpenDetailModal}
      />

      <ModalBox
        open={createModal}
        onClose={handleCloseCreateModal}
        header="Create Finance"
      >
        <ServicesCreate closeModal={handleCloseCreateModal} />
      </ModalBox>

      <ModalBox
        open={detailModal}
        onClose={handleCloseDetailModal}
        header="Service Detail"
      >
        <ServicesDetail
          openModifyModal={handleOpenModifyModal}
          closeModal={handleCloseDetailModal}
        />
      </ModalBox>

      <ModalBox
        open={modifyModal}
        onClose={handleCloseModifyModal}
        header="Modify Service"
      >
        <ServicesModify
          Services={selectedServices}
          closeModal={handleCloseModifyModal}
        />
      </ModalBox>

      {/*   
          {state.ServicesModule.show === "create" && <ServicesCreate />}
          {state.ServicesModule.show === "detail" && <ServicesDetail />}
          {state.ServicesModule.show === "modify" && (
            <ServicesModify Services={selectedServices} />
          )} */}
    </section>
  );
}

export function ServicesCreate({closeModal}) {
  // const { register, handleSubmit,setValue} = useForm(); //, watch, errors, reset
  const [categoryname, setCategoryName] = useState("");
  const [success, setSuccess] = useState(false);
  const [success2, setSuccess2] = useState(false);
  const [cash, setCash] = useState("Cash");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ServicesServ = client.service("billing");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [facilityId, setFacilityId] = useState("");
  const [source, setSource] = useState("");
  const [panel, setPanel] = useState(false);
  const [name, setName] = useState("");
  const [benefittingplans, setBenefittingPlans] = useState([]);
  const [quantity, setQuantity] = useState();
  const [costprice, setCostprice] = useState("");
  const [orgType, setOrgType] = useState("");
  const [productItem, setProductItem] = useState([]);
  const [plan, setPlan] = useState("");
  const [service, setService] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [panelList, setPanelList] = useState([]);
  const [successService, setSuccessService] = useState(false);
  const {state} = useContext(ObjectContext);
  const [chosen2, setChosen2] = useState();
  const [hasError, setHasError] = useState(false);

  const [Services, setServices] = useState({
    productitems: [],
    panel,
    source,
  });

  let productItemI = {
    facilityId,
    name,
    quantity,
    costprice,
  };
  // consider batchformat{batchno,expirydate,qtty,baseunit}
  //consider baseunoit conversions
  const getSearchfacility = obj => {
    setFacilityId(obj._id);
    setName(obj.facilityName);
    setOrgType(obj.facilityType);
    if (!obj) {
      setName("");
      setOrgType("");
      setFacilityId("");
      setCostprice("");
    }

    /*  setValue("facility", obj._id,  {
            shouldValidate: true,
            shouldDirty: true
        }) */
  };
  const getSearchfacility2 = obj => {
    setCategoryName(obj.categoryname);
    setChosen2(obj);

    if (!obj) {
      //"clear stuff"
      setCategoryName("");
      setChosen2();
    }
  };

  const getSearchService = obj => {
    setService(obj);
    if (!obj) {
      setService("");
    }
    setSuccessService(false);
  };

  useEffect(() => {
    setCurrentUser(user);
    ////console.log(currentUser)
    return () => {};
  }, [user]);

  const handleClickProd = async () => {
    const isError = await handleCheck();

    if (isError) return;

    if (productItem.length > 0) {
      if (!costprice || !name) {
        toast.error("You need to enter organization name and price ");
        return;
      }
    } else {
      if (!costprice || !cash) {
        toast.error("You need to enter organization name and price ");
        return;
      }
    }
    if (cash === "Cash") {
      productItemI = {
        source_org: user.currentEmployee.facilityDetail._id,
        source_org_name: user.currentEmployee.facilityDetail.facilityName,
        dest_org: user.currentEmployee.facilityDetail._id,
        dest_org_name: user.currentEmployee.facilityDetail.facilityName,
        price: costprice,
        billing_type: "Cash",
        plans: benefittingplans,
      };
      await setCash("");
    } else {
      productItemI = {
        source_org: facilityId,
        source_org_name: name,
        dest_org: user.currentEmployee.facilityDetail._id,
        dest_org_name: user.currentEmployee.facilityDetail.facilityName,
        price: costprice,
        billing_type: orgType === "HMO" ? "HMO" : "Company",
        plans: benefittingplans,
      };
      await setCash("Cash");
    }

    await setSuccess(false);
    setProductItem(prevProd => prevProd.concat(productItemI));
    setName("");
    setOrgType("");
    setFacilityId("");
    setCostprice("");
    await setSuccess(true);
  };

  const resetform = () => {
    setFacilityId("");
    setSource("");
    setPanel(false);
    setName("");

    setCostprice("");
    setProductItem([]);
    setCategoryName("");
    setService("");
    setPanelList([]);
    setPlan("");
    setBenefittingPlans([]);
    setCash("Cash");
    setOrgType("");
  };

  const onSubmit = async () => {
    // e.preventDefault();
    if (panel && panelList.length === 0) {
      toast.error(
        "Please choose services that make up panel or uncheck panel "
      );
      return;
    }

    setSuccess(false);
    let data = {
      name: source,
      category: categoryname,
      facility: user.currentEmployee.facilityDetail._id,
      facilityname: user.currentEmployee.facilityDetail.facilityName,
      panel: panel,
      panelServices: panelList,
      contracts: productItem,
      createdBy: user._id,
    };

    ServicesServ.create(data)
      .then(res => {
        ////console.log(JSON.stringify(res))
        resetform();
        /*  setMessage("Created Services successfully") */
        setSuccess(true);
        setSuccess2(true);
        toast.success("Service created succesfully");
        setSuccess(false);
        setSuccess2(false);
        setProductItem([]);
        setPanelList([]);
      })
      .catch(err => {
        toast.error("Error creating Services " + err);
      });
  };

  const handleBenefit = e => {
    setBenefittingPlans(prevstate => prevstate.concat(plan));
    setPlan("");
  };

  const handleRemove = (index, contract) => {
    ////console.log(index)
    if (contract.billing_type === "Cash") {
      toast({
        message: "You cannot remove cash billing",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }

    //setProductItem(prevstate=> prevstate.splice(i,1))
    setProductItem(prevstate =>
      prevstate.filter((ProductionItem, i) => i !== index)
    );

    /*  const newProductitem = [...productItem]
   newProductitem.splice(i,1)
   setProductItem(newProductitem) */
  };
  const handleAddPanel = () => {
    // setSuccessService(false)
    let newService = {
      serviceId: service._id,
      service_name: service.name,
      panel: service.panel,
    };
    setPanelList(prevstate => prevstate.concat(newService));
    setSuccessService(true);
    newService = {};
    setService("");
    //console.log("something added");
  };
  const handleCheck = async () => {
    // alert();
    setHasError(false);
    let error = false;

    if (!categoryname) {
      toast.error("Enter Category!");
      error = true;
      setHasError(true);
      return;
    }
    await ServicesServ.find({
      query: {
        name: source,
        facility: user.currentEmployee.facilityDetail._id,
        category: categoryname,
      },
    })
      .then(resp => {
        //console.log(resp);
        if (resp.data.length > 0) {
          error = true;
          setHasError(true);
          toast.error("Service already exist. Kindly modify it " + resp.data);
          return;
        }
      })
      .catch(err => {
        //error = true;
        toast.error("Error checking services  " + err);
      });

    return error;
  };

  const productItemSchema = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: row => row.sn,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Organization",
      key: "row_source_org_name",
      description: "Enter Organization",
      selector: row => row.source_org_name,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Amount",
      key: "Price",
      description: "Enter Price",
      selector: row => row.price,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Billing Type",
      key: "billing_type",
      description: "Enter Billing type",
      selector: row => row.billing_type,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Plans",
      key: "fromName",
      description: "Enter Plans",
      selector: row => {
        row.plans.map((plan, i) => (
          <span key={i} className="ml-1">
            {plan};
          </span>
        ));
      },
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Actions",
      key: "fromName",
      description: "Enter Category name",
      selector: row => <p style={{color: "red", fontSize: "0.7rem"}}>Remove</p>,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  return (
    <>
      <div
        style={{
          width: "800px",
          maxHeight: "80vh",
        }}
      >
        <div
          style={{
            width: "100%",
          }}
        >
          <Box
            container
            sx={{
              width: "100%",
              paddingTop: "10px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <input
                  className="input is-small"
                  value={categoryname}
                  name="categoryname"
                  type="text"
                  onChange={e => setCategoryName(e.target.value)}
                  style={{display: "none"}}
                  placeholder="Category of Service"
                />

                <Input
                  //onBlur={handleCheck}
                  name="source"
                  type="text"
                  onChange={e => setSource(e.target.value)}
                  label="Name of Service"
                  autoComplete={false}
                />
              </Grid>
              <Grid item xs={7}>
                <CategorySearch
                  getSearchfacility={getSearchfacility2}
                  clear={success2}
                />
              </Grid>
            </Grid>
          </Box>

          <Box
            container
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "10px 0",
            }}
          >
            <FormsHeaderText text="Add Pricing Info" />
            <GlobalCustomButton onClick={handleClickProd}>
              <AddCircleOutline sx={{marginRight: "5px"}} fontSize="small" />
              Add
            </GlobalCustomButton>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Input
                disabled
                name="cash"
                value={cash}
                type="text"
                onChange={e => setCash(e.target.value)}
                label="Billing Type"
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                name="costprice"
                value={costprice}
                type="text"
                onChange={e => setCostprice(e.target.value)}
                label="Price"
                style={{
                  margin: "0 !important",
                }}
              />
            </Grid>
          </Grid>

          {productItem.length > 0 && (
            <div style={{width: "100%", maxHeight: "250px"}}>
              <CustomTable
                title={""}
                columns={productItemSchema}
                data={productItem}
                pointerOnHover
                highlightOnHover
                striped
                //onRowClicked={handleRow}
                progressPending={false}
              />
            </div>
          )}

          <Box
            container
            sx={{
              display: "flex",
              aligntItems: "center",
            }}
            mt={2}
          >
            <GlobalCustomButton
              disabled={!productItem.length > 0}
              onClick={onSubmit}
              style={{
                marginRight: "15px",
              }}
            >
              Create Service
            </GlobalCustomButton>

            <GlobalCustomButton
              variant="outlined"
              color="warning"
              onClick={closeModal}
            >
              Cancel
            </GlobalCustomButton>
          </Box>
        </div>
        {/* 
        <div className="field is-horizontal">
          <div className="field-body">
            {panel && (
              <>
                <div className="field">
                  <div
                    className="field is-expanded"
                  >
                    <ServiceSearch
                      getSearchService={getSearchService}
                      clearService={successService}
                    />
                    <p
                      className="control has-icons-left "
                      style={{display: "none"}}
                    >
                      <input
                        className="input is-small" 
                      />
                      <span className="icon is-small is-left">
                        <i className="fas  fa-map-marker-alt"></i>
                      </span>
                    </p>
                  </div>
                </div>
                <p className="control">
                  <button className="button is-info is-small  is-pulled-right selectadd">
                    <span className="is-small" onClick={() => handleAddPanel()}>
               
                      +
                    </span>
                  </button>
                </p>
              </>
            )}
          </div>
        </div> */}
        {/* 
        {panelList.length > 0 && (
          <div>
            <strong> Panel Items:</strong>{" "}
            {panelList.map((plan, i) => (
              <span key={i} className="ml-1">
                {plan.service_name};
              </span>
            ))}
          </div>
        )} */}
      </div>
    </>
  );
}

export function ServicesList({openCreateModal, openDetallModal}) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const ServicesServ = client.service("billing");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedServices, setSelectedServices] = useState(); //
  // eslint-disable-next-line
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  // const [selectedService, setSelectedService] = useState(false)

  const handleCreateNew = async () => {
    const newServicesModule = {
      selectedServices: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      ServicesModule: newServicesModule,
    }));
    ////console.log(state)
    openCreateModal();
  };

  const handleRow = async Service => {
    ////console.log("b4",state)

    ////console.log("handlerow",Services)

    await setSelectedServices(Service.services);
    ////console.log(Service.services);

    // const newServicesModule = {
    //   selectedServices: Service.services,
    //   show: "detail",
    // };
    // await setState(prevstate => ({
    //   ...prevstate,
    //   ServicesModule: newServicesModule,
    // }));
    ////console.log(state)
  };

  const handleSecondRow = async Service => {
    ////console.log("b4",state)

    ////console.log("handlerow",Services)

    //await setSelectedServices(Service.services);
    ////console.log(Service.services);

    const newServicesModule = {
      selectedServices: Service,
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      ServicesModule: newServicesModule,
    }));
    ////console.log(state)
    openDetallModal();
  };

  const handleSearch = val => {
    const field = "name";
    //console.log(val);
    ServicesServ.find({
      query: {
        [field]: {
          $regex: val,
          $options: "i",
        },
        // storeId:state.StoreModule.selectedStore._id,
        facility: user.currentEmployee.facilityDetail._id,
        $limit: 20,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then(res => {
        //console.log(res);
        setFacilities(res.groupedOrder);
      })
      .catch(err => {
        //console.log(err);
        toast.error("Error during search " + err);
      });
  };

  const getFacilities = async () => {
    if (user.currentEmployee) {
      const findServices = await ServicesServ.find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          // storeId:state.StoreModule.selectedStore._id,
          // $limit:20,
          //   paginate:false,
          $sort: {
            category: 1,
          },
        },
      });
      ////console.log(findServices);
      await setFacilities(findServices.groupedOrder);
      ////console.log(findServices.groupedOrder);
    } else {
      if (user.stacker) {
        toast.error("You do not qualify to view this");
        return;
      }
    }
  };

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    getFacilities();

    ServicesServ.on("created", obj => getFacilities());
    ServicesServ.on("updated", obj => getFacilities());
    ServicesServ.on("patched", obj => getFacilities());
    ServicesServ.on("removed", obj => getFacilities());
    return () => {};
  }, []);

  /*    useEffect(() => {
                getFacilities()
                //console.log("store changed")
                return () => {
                   
                }
            }, [state.StoreModule.selectedStore]) */
  //todo: pagination and vertical scroll bar

  const ServiceSchema = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: row => row.sn,
      sortable: true,
      inputType: "HIDDEN",
      width: "100px",
      center: true,
    },
    {
      name: "categoryname",
      key: "fromName",
      description: "Enter Category name",
      selector: row => (row.categoryname ? row.categoryname : "-----------"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  const selectedServiceSchema = [
    {
      name: "S/NO",
      key: "sn",
      description: "Enter name of Disease",
      selector: row => row.sn,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      width: "80px",
    },
    {
      name: "Name",
      key: "name",
      description: "Enter Name",
      selector: row => (row.name ? row.name : "-----------"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Panel?",
      key: "panel",
      description: "Enter Panel",
      selector: row => (row.panel ? "YES" : "NO"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Cash Price?",
      key: "fromName",
      description: "Enter Category name",
      selector: row =>
        row.contracts.map(
          (el, i) => el.source_org === el.dest_org && `${el.price}`
        ),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  return (
    <>
      {state.StoreModule.selectedStore ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "20px",
              width: "100%",
              flex: "1",
            }}
          >
            <TableMenu>
              <div style={{display: "flex", alignItems: "center"}}>
                {handleSearch && (
                  <div className="inner-table">
                    <FilterMenu onSearch={handleSearch} />
                  </div>
                )}
                <h2 style={{marginLeft: "10px", fontSize: "0.95rem"}}>
                  Services
                </h2>
              </div>

              {handleCreateNew && (
                <GlobalCustomButton onClick={handleCreateNew}>
                  <AddCircleOutline
                    fontSize="small"
                    sx={{marginRight: "5px"}}
                  />
                  Add New
                </GlobalCustomButton>
              )}
            </TableMenu>

            <div
              //className="columns"
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  height: "calc(100% - 70px)",
                  transition: "width 0.5s ease-in",
                  width: selectedServices ? "35%" : "100%",
                }}
              >
                <CustomTable
                  title={""}
                  columns={ServiceSchema}
                  data={facilities}
                  pointerOnHover
                  highlightOnHover
                  striped
                  onRowClicked={handleRow}
                  progressPending={false}
                />
              </div>

              {selectedServices && (
                <>
                  <div
                    style={{
                      height: "calc(100% - 70px)",
                      width: "64%",
                    }}
                  >
                    <CustomTable
                      title={""}
                      columns={selectedServiceSchema}
                      data={selectedServices}
                      pointerOnHover
                      highlightOnHover
                      striped
                      onRowClicked={handleSecondRow}
                      progressPending={false}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <div>loading... Choose a Store</div>
      )}
    </>
  );
}

export function ServicesDetail({openModifyModal, closeModal}) {
  //const { register, handleSubmit, watch, setValue } = useForm(); //errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false); //,
  //const [success, setSuccess] =useState(false)
  // eslint-disable-next-line
  const [message, setMessage] = useState(""); //,
  //const ServicesServ=client.service('/Services')
  //const navigate=useNavigate()
  //const {user,setUser} = useContext(UserContext)
  const {state, setState} = useContext(ObjectContext);

  const Services = state.ServicesModule.selectedServices;
  /* //console.log(Services) */

  ////console.log(Services);

  const handleEdit = async () => {
    const newServicesModule = {
      selectedServices: Services,
      show: "modify",
    };
    await setState(prevstate => ({
      ...prevstate,
      ServicesModule: newServicesModule,
    }));
    ////console.log(state)
    openModifyModal();
  };

  const pricingInfoSchema = [
    {
      name: "S/NO",
      key: "sn",
      description: "Enter name of Disease",
      selector: row => row.sn,
      width: "80px",

      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
    {
      name: "Organization",
      key: "source_org_name",
      description: "Enter Date",
      selector: row => row.source_org_name,
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Amount",
      key: "price",
      description: "Enter Category",
      selector: row => row.price,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Billing Type",
      key: "billing_type",
      description: "Enter Category",
      selector: row => row.billing_type,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Plans",
      key: "plans",
      description: "Enter Category",
      selector: row => (row.panel ? "Yes" : "----------"),
      sortable: true,
      required: true,
      inputType: "SELECT",
    },
  ];

  return (
    <>
      <Box
        container
        sx={{
          width: "750px",
          maxHeight: "500px",
          overflowY: "auto",
        }}
      >
        <Grid container spacing={1} pt={1}>
          <Grid item xs={5}>
            <Input label="Category" value={Services.category} disabled />
          </Grid>
          <Grid item xs={5}>
            {" "}
            <Input label="Name" value={Services.name} disabled />
          </Grid>
          <Grid item xs={2}>
            <Input
              label="Panel"
              value={Services.panel ? "Yes" : "No"}
              disabled
            />
          </Grid>
        </Grid>
      </Box>

      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Services Details</p>
        </div>
        <div className="card-content vscrollable">
          <table>
            <tbody>
              <tr>
                <td>
                  {Services.panel && (
                    <p className="is-size-7 padleft" name="ServicesType">
                      {Services.panelServices.length > 0 && (
                        <p>
                          {Services.panelServices.map((plan, i) => (
                            <span key={i} className="ml-1">
                              {plan.name};
                            </span>
                          ))}
                        </p>
                      )}{" "}
                    </p>
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          <Box
            style={{
              width: "100%",
              maxHeight: "300px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* <p>Pricing Info</p> */}
            <CustomTable
              title={"Pricing Info"}
              columns={pricingInfoSchema}
              data={Services.contracts}
              pointerOnHover
              highlightOnHover
              striped
              //onRowClicked={row => onRowClicked(row)}
              progressPending={false}
            />
          </Box>

          <Box
            container
            sx={{
              display: "flex",
              aligntItems: "center",
            }}
            mt={2}
          >
            <GlobalCustomButton
              onClick={handleEdit}
              style={{
                marginRight: "15px",
              }}
            >
              Edit Service
            </GlobalCustomButton>

            <GlobalCustomButton
              variant="outlined"
              color="warning"
              onClick={closeModal}
            >
              Close
            </GlobalCustomButton>
          </Box>
        </div>
      </div>
    </>
  );
}

export function ServicesModify({closeModal}) {
  const {register, handleSubmit, setValue, reset, errors} = useForm(); //watch, errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  const [success2, setSuccess2] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const ServicesServ = client.service("billing");
  //const navigate=useNavigate()
  // eslint-disable-next-line
  const {user} = useContext(UserContext);
  const {state, setState} = useContext(ObjectContext);

  const [facilityId, setFacilityId] = useState("");
  const [source, setSource] = useState("");
  const [panel, setPanel] = useState(false);
  const [name, setName] = useState("");
  const [benefittingplans, setBenefittingPlans] = useState([]);
  const [quantity, setQuantity] = useState();
  const [costprice, setCostprice] = useState("");
  const [orgType, setOrgType] = useState("");
  const [productItem, setProductItem] = useState([]);
  const [plan, setPlan] = useState("");
  const [service, setService] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [panelList, setPanelList] = useState([]);
  const [successService, setSuccessService] = useState(false);
  //  const {state}=useContext(ObjectContext)
  const [cash, setCash] = useState("Cash");
  const [categoryname, setCategoryName] = useState("");
  const [facility, setFacility] = useState();
  const [modcon, setModCon] = useState("");
  const [yam, setYam] = useState(false);
  const [pos, setPos] = useState("");
  const [chosen2, setChosen2] = useState();

  let Services = state.ServicesModule.selectedServices;
  let productItemI;

  /*  useEffect(() => {
            /* setValue("name", Services.name,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("category", Services.category,  {
                shouldValidate: true,
                shouldDirty: true
            })
         setValue("panel", Services.panel,  {
                shouldValidate: true,
                shouldDirty: true
            }) */
  /*  setValue("phone", Services.phone,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("email", Services.email,  {
                shouldValidate: true,
                shouldDirty: true
            })
              setValue("department", Services.department,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("deptunit", Services.deptunit,  {
                shouldValidate: true,
                shouldDirty: true
            }) */
  /*   setValue("ServicesCategory", Services.ServicesCategory,  {
                shouldValidate: true,
                shouldDirty: true
            }) */
  /*  
            return () => {
                
            }
        })
 */

  useEffect(() => {
    setFacilityId(modcon.source_org);
    setName(modcon.source_org_name);
    setCostprice(modcon.price);
    setOrgType(modcon.billing_type);
    setBenefittingPlans(modcon.plans);
    setYam(true);
    return () => {};
  }, [modcon]);

  useEffect(() => {
    //Services
    setFacilityId("");
    setSource(Services.name);
    setPanel(Services.panel);
    setName("");

    setCostprice("");
    setProductItem(Services.contracts);
    setCategoryName(Services.category);
    setService("");
    setPanelList(Services.panelServices);
    setPlan("");
    setBenefittingPlans([]);
    setCash("");
    setOrgType("");

    return () => {};
  }, []);
  const handleCheck = async () => {
    if (!categoryname) {
      toast({
        message: "Enter Category!",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }
    await ServicesServ.find({
      query: {
        name: source,
        facility: user.currentEmployee.facilityDetail._id,
        category: categoryname,
      },
    })
      .then(resp => {
        //console.log(resp);
        if (resp.data.length > 0) {
          toast({
            message: "Service already exist. Kindly modify it " + resp.data,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
          return;
        }
      })
      .catch(err => {
        toast({
          message: "Error checking services  " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  const handleClickProd = async () => {
    if (productItem.length > 0) {
      if (!costprice || !name) {
        toast({
          message: "You need to enter organization name and price ",
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
        return;
      }
    } else {
      if (!costprice || !cash) {
        toast({
          message: "You need to enter organization name and price ",
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
        return;
      }
    }
    if (!yam) {
      if (cash === "Cash") {
        productItemI = {
          source_org: user.currentEmployee.facilityDetail._id,
          source_org_name: user.currentEmployee.facilityDetail.facilityName,
          dest_org: user.currentEmployee.facilityDetail._id,
          dest_org_name: user.currentEmployee.facilityDetail.facilityName,
          price: costprice,
          billing_type: "Cash",
          plans: benefittingplans,
        };
        await setCash("");
      } else {
        productItemI = {
          source_org: facilityId,
          source_org_name: name,
          dest_org: user.currentEmployee.facilityDetail._id,
          dest_org_name: user.currentEmployee.facilityDetail.facilityName,
          price: costprice,
          billing_type: orgType === "HMO" ? "HMO" : "Company",
          plans: benefittingplans,
        };
        await setCash("");
      }

      await setSuccess(false);
      setProductItem(prevProd => prevProd.concat(productItemI));
    } else {
      productItemI = {
        source_org: facilityId,
        source_org_name: name,
        dest_org: user.currentEmployee.facilityDetail._id,
        dest_org_name: user.currentEmployee.facilityDetail.facilityName,
        price: costprice,
        billing_type: orgType,
        plans: benefittingplans,
      };
      const newProductitem = [...productItem];
      newProductitem.splice(pos, 1, productItemI);
      setProductItem(newProductitem);
    }
    setModCon("");
    setYam(false);
    setPos("");
    setName("");
    setOrgType("");
    setFacilityId("");
    setCostprice("");
    await setSuccess(true);
  };
  const resetform = () => {
    setFacilityId("");
    setSource("");
    setPanel(false);
    setName("");

    setCostprice("");
    setProductItem([]);
    setCategoryName("");
    setService("");
    setPanelList([]);
    setPlan("");
    setBenefittingPlans([]);
    setCash("Cash");
    setOrgType("");
  };

  const getSearchService = obj => {
    setService(obj);
    if (!obj) {
      setService("");
    }
    setSuccessService(false);
  };

  const getSearchfacility2 = obj => {
    setCategoryName(obj.categoryname);
    setChosen2(obj);

    if (!obj) {
      //"clear stuff"
      setCategoryName("");
      setChosen2();
    }
  };
  const getSearchfacility = obj => {
    setFacilityId(obj._id);
    setName(obj.facilityName);
    setOrgType(obj.facilityType);
    if (!obj) {
      setName("");
      setOrgType("");
      setFacilityId("");
      setCostprice("");
    }

    /*  setValue("facility", obj._id,  {
                shouldValidate: true,
                shouldDirty: true
            }) */
  };
  const handleBenefit = e => {
    setBenefittingPlans(prevstate => prevstate.concat(plan));
    setPlan("");
  };

  const handleRemove = (index, contract) => {
    ////console.log(index)
    if (contract.billing_type === "Cash") {
      toast({
        message: "You cannot remove cash billing",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }

    //setProductItem(prevstate=> prevstate.splice(i,1))
    setProductItem(prevstate =>
      prevstate.filter((ProductionItem, i) => i !== index)
    );

    /*  const newProductitem = [...productItem]
           newProductitem.splice(i,1)
           setProductItem(newProductitem) */
  };
  const handleAddPanel = () => {
    // setSuccessService(false)
    let newService = {
      serviceId: service._id,
      service_name: service.name,
      panel: service.panel,
    };
    setPanelList(prevstate => prevstate.concat(newService));
    setSuccessService(true);
    newService = {};
    setService("");
    //console.log("something added");
  };
  const handleCancel = async () => {
    const newServicesModule = {
      selectedServices: Services,
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      ServicesModule: newServicesModule,
    }));
    ////console.log(state)
    closeModal();
  };

  const changeState = resp => {
    const newServicesModule = {
      selectedServices: resp,
      show: "detail",
    };
    setState(prevstate => ({
      ...prevstate,
      ServicesModule: newServicesModule,
    }));
  };
  const handleDelete = async () => {
    let conf = window.confirm("Are you sure you want to delete this data?");

    const dleteId = Services._id;
    if (conf) {
      ServicesServ.remove(dleteId)
        .then(res => {
          ////console.log(JSON.stringify(res))
          reset();
          /*  setMessage("Deleted Services successfully")
                setSuccess(true)
                changeState()
               setTimeout(() => {
                setSuccess(false)
                }, 200); */
          toast({
            message: "Services deleted succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          changeState();
        })
        .catch(err => {
          // setMessage("Error deleting Services, probable network issues "+ err )
          // setError(true)
          toast({
            message:
              "Error deleting Services, probable network issues or " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
  };

  /* ()=> setValue("firstName", "Bill", , {
            shouldValidate: true,
            shouldDirty: true
          })) */
  const onSubmit = () => {
    // e.preventDefault();
    if (panel && panelList.length === 0) {
      toast({
        message: "Please choose services that make up panel or uncheck panel ",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }

    setSuccess(false);
    let data = {
      name: source,
      category: categoryname,
      facility: user.currentEmployee.facilityDetail._id,
      facilityname: user.currentEmployee.facilityDetail.facilityName,
      panel: panel,
      panelServices: panelList,
      contracts: productItem,
      updatedBy: user._id,
    };
    //console.log(Services);
    //console.log(data);
    //data.facility=Services.facility
    ////console.log(data);

    ServicesServ.patch(Services._id, data)
      .then(res => {
        //console.log(JSON.stringify(res));
        // e.target.reset();
        // setMessage("updated Services successfully")
        toast({
          message: "Services updated succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });

        changeState(res);
      })
      .catch(err => {
        //setMessage("Error creating Services, probable network issues "+ err )
        // setError(true)
        toast({
          message: "Error updating Services, probable network issues or " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };
  const handleModCon = async (contract, i) => {
    setModCon(contract);
    setYam(true);
    setPos(i);
  };

  const pricesSchema = [
    {
      name: "S/NO",
      width: "70px",
      key: "sn",
      description: "Enter name of Disease",
      selector: (row, i) => i + 1,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },

    {
      name: "Organization",
      key: "source_org_name",
      description: "Enter Organization",
      selector: row => row.source_org_name,
      sortable: true,
      required: true,
      inputType: "DATE",
    },

    {
      name: "Amount",
      key: "price",
      description: "Enter Price",
      selector: row => row.price,
      sortable: true,
      required: true,
      inputType: "SELECT",
    },

    {
      name: "Billing Type",
      key: "billing_type",
      description: "Enter Billing Type",
      selector: row => row.billing_type,
      sortable: true,
      required: true,
      inputType: "SELECT",
    },

    {
      name: "Plans",
      key: "category",
      description: "Enter Category",
      selector: row => {
        row.plan && row.plans.map((plan, i) => <span key={i}>{plan};</span>);
      },
      sortable: true,
      required: true,
      inputType: "SELECT",
    },

    {
      name: "Action",
      key: "category",
      description: "Enter Category",
      selector: (row, i) => (
        <p style={{color: "red"}} onClick={() => handleRemove(i, row)}>
          Delete
        </p>
      ),
      sortable: true,
      required: true,
      inputType: "SELECT",
    },
  ];

  return (
    <>
      <Box
        container
        sx={{
          width: "800px",
          maxHeight: "80vh",
        }}
      >
        <Grid container spacing={1} pt={1}>
          <Grid item xs={6}>
            <CategorySearch
              id={Services.category}
              getSearchfacility={getSearchfacility2}
              clear={success2}
              disable={true}
            />
          </Grid>

          <Grid item xs={6}>
            <Input
              className="input is-small"
              register={register("source", {required: true})}
              value={source}
              name="source"
              type="text"
              onChange={e => setSource(e.target.value)}
              onBlur={handleCheck}
              placeholder="Name of Service"
              autoComplete="false"
              disabled
            />
          </Grid>
        </Grid>

        <Box container>
          <Box sx={{width: "100px"}}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={panel}
                    name="panel"
                    onChange={e => setPanel(e.target.checked)}
                    //{...register("panel", {required: true})}
                  />
                }
                label="Label"
              />
            </FormGroup>
          </Box>
        </Box>

        <Collapse in={panel}>
          <Grid container spacing={1}>
            <Grid item xs={10}>
              <ServiceSearch
                getSearchService={getSearchService}
                clearService={successService}
                disable={!panel}
              />
            </Grid>

            <Grid item xs={2}>
              <GlobalCustomButton
                sx={{
                  width: "100%",
                  height: "38px",
                }}
                onClick={handleAddPanel}
              >
                <AddCircleOutline sx={{marginRight: "5px"}} fontSize="small" />
                Add
              </GlobalCustomButton>
            </Grid>
          </Grid>
        </Collapse>

        <Box>
          {panel && panelList.length > 0 && (
            <div>
              <strong> Panel Items:</strong>{" "}
              {panelList.map((plan, i) => (
                <span key={i} className="ml-1">
                  {plan.service_name};
                </span>
              ))}
            </div>
          )}
        </Box>

        <FormsHeaderText text="Add Pricing Info" />

        {productItem.length > 0 ? (
          <Box container>
            <Grid container spacing={1} mb={1}>
              <Grid item xs={7}>
                <FacilitySearch
                  getSearchfacility={getSearchfacility}
                  clear={success}
                />
                <p
                  className="control has-icons-left "
                  style={{display: "none"}}
                >
                  <input
                    className="input is-small"
                    /* ref={register ({ required: true }) }  */ /* add array no */ value={
                      facilityId
                    }
                    name="facilityId"
                    type="text"
                    onChange={e => setFacilityId(e.target.value)}
                    placeholder="Product Id"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas  fa-map-marker-alt"></i>
                  </span>
                </p>
              </Grid>

              <Grid item xs={3}>
                <Input
                  //register={register("costprice", {required: true})}
                  name="costprice"
                  value={costprice}
                  type="text"
                  onChange={e => setCostprice(e.target.value)}
                  label="Price"
                />
              </Grid>

              <Grid item xs={2}>
                <GlobalCustomButton
                  sx={{
                    width: "100%",
                    height: "38px",
                  }}
                  onClick={handleClickProd}
                >
                  <AddCircleOutline
                    sx={{marginRight: "5px"}}
                    fontSize="small"
                  />
                  Add
                </GlobalCustomButton>
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              <Grid item xs={10}>
                <Input
                  type="text"
                  name="plan"
                  value={plan}
                  onChange={e => setPlan(e.target.value)}
                  label="Benefitting Plans"
                />
              </Grid>
              <Grid item xs={2}>
                <GlobalCustomButton
                  sx={{
                    width: "100%",
                    height: "38px",
                  }}
                  onClick={e => handleBenefit(e)}
                >
                  <AddCircleOutline
                    sx={{marginRight: "5px"}}
                    fontSize="small"
                  />
                  Add
                </GlobalCustomButton>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Box container>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <Input
                  {...register("cash", {required: true})}
                  disabled
                  name="cash"
                  value={cash}
                  type="text"
                  onChange={e => setCash(e.target.value)}
                  label="Cost Price"
                />
              </Grid>

              <Grid item xs={5}>
                <Input
                  {...register("costprice", {required: true})}
                  name="costprice"
                  value={costprice}
                  type="text"
                  onChange={e => setCostprice(e.target.value)}
                  label="Price"
                />
              </Grid>

              <Grid item xs={2}>
                <MuiButton
                  variant="outlined"
                  sx={{
                    width: "100%",
                    height: "48px",
                    margin: "0.75rem 0",
                    textTransform: "capitalize",
                  }}
                  onClick={handleClickProd}
                >
                  <AddCircleOutline
                    sx={{marginRight: "5px"}}
                    fontSize="small"
                  />
                  Add
                </MuiButton>
              </Grid>
            </Grid>
          </Box>
        )}

        <Box sx={{width: "100%", overflowY: "auto"}}>
          <CustomTable
            title={"Prices"}
            columns={pricesSchema}
            data={productItem}
            pointerOnHover
            highlightOnHover
            striped
            //onRowClicked={row => onRowClicked(row)}
            progressPending={false}
          />
        </Box>

        <Box
          container
          sx={{
            display: "flex",
            aligntItems: "center",
          }}
          mt={2}
        >
          <GlobalCustomButton
            onClick={onSubmit}
            style={{
              marginRight: "15px",
            }}
          >
            Save
          </GlobalCustomButton>

          <GlobalCustomButton
            variant="outlined"
            color="error"
            onClick={handleCancel}
          >
            Cancel
          </GlobalCustomButton>
        </Box>
      </Box>
    </>
  );
}

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = event => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export function ServiceSearch({
  getSearchService,
  clearService,
  disable = false,
}) {
  const productServ = client.service("billing");
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [searchError, setSearchError] = useState(false);
  // eslint-disable-next-line
  const [showPanel, setShowPanel] = useState(false);
  // eslint-disable-next-line
  const [searchMessage, setSearchMessage] = useState("");
  // eslint-disable-next-line
  const [simpa, setSimpa] = useState("");
  // eslint-disable-next-line
  const [chosen, setChosen] = useState(false);
  // eslint-disable-next-line
  const [count, setCount] = useState(0);
  const inputEl = useRef(null);
  const [val, setVal] = useState("");
  const [productModal, setProductModal] = useState(false);

  const dropDownRef = useRef(null);

  const handleRow = async obj => {
    await setChosen(true);
    //alert("something is chaning")
    getSearchService(obj);

    await setSimpa(obj.name);

    // setSelectedFacility(obj)
    setShowPanel(false);
    await setCount(2);
    /* const    newfacilityModule={
            selectedFacility:facility,
            show :'detail'
        }
   await setState((prevstate)=>({...prevstate, facilityModule:newfacilityModule})) */
    ////console.log(state)
  };
  const handleBlur = async e => {
    if (count === 2) {
      //console.log("stuff was chosen");
    }

    /*  //console.log("blur")
         setShowPanel(false)
        //console.log(JSON.stringify(simpa))
        if (simpa===""){
            //console.log(facilities.length)
            setSimpa("abc")
            setSimpa("")
            setFacilities([])
            inputEl.current.setValue=""
        }
        //console.log(facilities.length)
        //console.log(inputEl.current) */
  };
  const handleSearch = async value => {
    setVal(value);
    if (value === "") {
      setShowPanel(false);
      getSearchService(false);
      await setFacilities([]);
      return;
    }
    const field = "name"; //field variable

    if (value.length >= 3) {
      productServ
        .find({
          query: {
            //service
            [field]: {
              $regex: value,
              $options: "i",
            },
            $limit: 10,
            $sort: {
              createdAt: -1,
            },
          },
        })
        .then(res => {
          // //console.log("product  fetched successfully")
          ////console.log(res.data)
          setFacilities(res.data);
          setSearchMessage(" product  fetched successfully");
          setShowPanel(true);
        })
        .catch(err => {
          toast({
            message: "Error creating Services " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    } else {
      // //console.log("less than 3 ")
      ////console.log(val)
      setShowPanel(false);
      await setFacilities([]);
      ////console.log(facilities)
    }
  };

  const handleAddproduct = () => {
    setProductModal(true);
  };
  const handlecloseModal = () => {
    setProductModal(false);
    handleSearch(val);
  };
  useEffect(() => {
    if (clearService) {
      //console.log("success has changed", clearService);
      setSimpa("");
    }
    return () => {};
  }, [clearService]);

  useOnClickOutside(dropDownRef, () => setShowPanel(false));

  return (
    <div>
      <div className="field">
        <div className="control has-icons-left  ">
          <div
            className="dropdown-trigger"
            style={{width: "100%", position: "relative"}}
          >
            <DebounceInput
              className="input is-small "
              type="text"
              label="Search Services"
              value={simpa}
              minLength={3}
              debounceTimeout={400}
              onBlur={e => handleBlur(e)}
              onChange={e => handleSearch(e.target.value)}
              inputRef={inputEl}
              element={Input}
              disabled={disable}
            />

            <Grow in={showPanel}>
              <Card>
                <Box
                  ref={dropDownRef}
                  container
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    maxHeight: "150px",
                    overflowY: "scroll",
                    zIndex: "5",
                    position: "absolute",
                    background: "#ffffff",
                    width: "100%",
                    border: "1px solid lightgray",
                    zIndex: "500",
                  }}
                >
                  {facilities.length > 0 ? (
                    facilities.map((facility, i) => (
                      <Box
                        item
                        key={i}
                        onClick={() => handleRow(facility)}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          padding: "0 8px",
                          width: "100%",
                          minHeight: "50px",
                          borderTop: i !== 0 ? "1px solid gray" : "",
                          cursor: "pointer",
                          zIndex: "100",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.75rem",
                          }}
                        >
                          {facility.name} - {facility.category}
                        </span>
                      </Box>
                    ))
                  ) : (
                    <Box
                      className="dropdown-item"
                      onClick={handleAddproduct}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0 8px",
                        width: "100%",
                        minHeight: "50px",
                        borderTop: "1px solid gray",
                        cursor: "pointer",
                        zIndex: "100",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.75rem",
                        }}
                      >
                        Service {val} does not currently exist
                      </span>{" "}
                    </Box>
                  )}
                </Box>
              </Card>
            </Grow>
          </div>

          {/* <div className="dropdown-menu" style={{width: "100%"}}>
            <div className="dropdown-content">
              {facilities.length > 0 ? (
                ""
              ) : (
                <div className="dropdown-item" onClick={handleAddproduct}>
                  {" "}
                  <span>Service does not current exist</span>{" "}
                </div>
              )}

              {facilities.map((facility, i) => (
                <div
                  className="dropdown-item"
                  key={facility._id}
                  onClick={() => handleRow(facility)}
                >
                  <span>{facility.name}</span>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
