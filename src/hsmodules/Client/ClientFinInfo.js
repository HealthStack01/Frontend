/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from "react";
import client from "../../feathers";
import { DebounceInput } from "react-debounce-input";
import { UserContext, ObjectContext } from "../../context";
import { toast } from "bulma-toast";
import { FacilitySearch } from "../helpers/FacilitySearch";
import { ClientSearch } from "../helpers/ClientSearch";
import { Box, Button, Collapse, Grid } from "@mui/material";
import CustomSelect from "../../components/inputs/basic/Select";
import Input from "../../components/inputs/basic/Input";
import CheckboxInput from "../../components/inputs/basic/Checkbox";

export default function ClientFinInfo({ closeModal }) {
  const { user } = useContext(UserContext);
  const [organizationId, setOrganizationId] = useState(null);
  const [principalId, setPrincipalId] = useState("");
  const [clientId, setClientId] = useState("");
  const [principalName, setPrincipalName] = useState("");
  const [organization, setOrganization] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [principal, setPrincipal] = useState(null);
  const [plan, setPlan] = useState("");
  const [planHMO, setPlanHMO] = useState("");
  const [chosenHMO, setChosenHMO] = useState("");
  const ServicesServ = client.service("billing");
  const [active, setActive] = useState(false);
  const [success, setSuccess] = useState(false);
  const [success1, setSuccess1] = useState(false);
  const [paymentmode, setPaymentMode] = useState("HMO");
  const [productItem, setProductItem] = useState([]);
  const [obj, setObj] = useState("");
  const [benefittingPlans1, setBenefittingPlans1] = useState([]);
  const [benefittingHMO, setBenefittingHMO] = useState([]);
  const { state, setState } = useContext(ObjectContext);
  const ClientServ = client.service("client");
  const HMOServ = client.service("organizationclient");
  //  const [productEntry,setProductEntry]=useState({

  //})

  let medication = state.ClientModule.selectedClient;

  //console.log(state.financeModule.state)

  const handleChangeMode = async (value) => {
    await setPaymentMode(value);
    setOrganizationId(null);
    setOrganizationName("");
    setOrganization(null);
    setPlan("");
    setPlanHMO("");
    setActive(false);
    setClientId("");
    setPrincipalId("");
    setPrincipal(null);
    setPrincipalName("");
    setSuccess(true);
  };

  const productItemI = {
    paymentmode,
    organizationName,
    organizationId,
    clientId,
    principal,
    principalId,
    principalName,
    plan,
    active,
    agent: planHMO ? planHMO.organizationDetail._id : null,
    organizationType: organization?.facilityType,
    agentName: planHMO ? planHMO.organizationDetail.facilityName : "",
  };

  const getSearchfacility1 = async (obj) => {
    //setPrincipalId(obj._id)
    setPrincipalName(obj.firstname + " " + obj.lastname);
    setPrincipal(obj._id);

    if (!obj) {
      //"clear stuff"
      setPrincipalId("");
      setPrincipalName("");
      setPrincipal(null);
      setPlanHMO("");
    }
  };

  const getSearchfacility = async (obj) => {
    console.log(obj);
    await setOrganization(obj);
    await setOrganizationId(obj._id);
    await setOrganizationName(obj.facilityName);
    getBenfittingPlans(obj);
    getBenfittingHMO(obj);
    // setOrgType(obj.facilityType)
    if (!obj) {
      setOrganizationId(null);
      setOrganizationName("");
      setOrganization(null);
    }
  };

  useEffect(() => {
    // console.log("success", success)
    if (success) {
      setSuccess(false);
    }
  }, [success]);

  useEffect(() => {
    // console.log("success", success)
    if (success1) {
      setSuccess1(false);
    }
  }, [success1]);

  const resetform = () => {
    setOrganizationId(null);
    setOrganizationName("");
    setOrganization(null);
    setPlan("");
    setActive(false);
    setClientId("");
    setPrincipalId("");
    setPrincipal(null);
    setPrincipalName("");
    setSuccess(true);
    setPaymentMode("HMO");
    setPlanHMO("");
    //setSuccess(false)
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  };

  const handleAdd = async () => {
    //setSuccess(false)
    console.log(productItemI);
    setProductItem((prev) => prev.concat(productItemI));
    resetform();
    //
  };

  const handlePayment = async () => {
    // console.log(productItem)
    console.log(productItem);
    ClientServ.patch(medication._id, {
      paymentinfo: productItem,
    })
      .then((resp) => {
        resetform();
        let client = resp;
        console.log(client);
        medication = resp;
        // setProductItem([])
        toast({
          message: "Client financial info updated succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });
        closeModal();
      })
      .catch((err) => {
        console.log(err);
        toast({
          message: "Error creating Client " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };
  useEffect(() => {
    setProductItem(medication.paymentinfo);

    return () => {};
  }, []);

  useEffect(() => {
    setProductItem(medication.paymentinfo);
    return () => {};
  }, [medication]);

  const getBenfittingHMO = async (obj) => {
    await setBenefittingHMO([]);
    await HMOServ.find({
      query: {
        facility: obj._id,
        relationshiptype: "managedcare",
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then((res) => {
        console.log(res);
        setBenefittingHMO(res.data);
        /*   toast({
                message: 'Client financial info updated succesfully',
                type: 'is-success',
                dismissible: true,
                pauseOnHover: true,
              }) */
      })
      .catch((err) => {
        console.log(err);
        toast({
          message: "Error fetching HMO " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  const getBenfittingPlans = async (obj) => {
    await setBenefittingPlans1([]);
    if (user.currentEmployee) {
      console.log(obj._id, organizationId);

      const findServices = await ServicesServ.find({
        query: {
          //facility: obj._id, // user.currentEmployee.facilityDetail._id,
          "contracts.source_org": obj._id, // user.currentEmployee.facilityDetail._id ,
          "contracts.dest_org": obj._id, //user.currentEmployee.facilityDetail._id ,
          category: "Managed Care",
          // storeId:state.StoreModule.selectedStore._id,
          // $limit:20,
          //   paginate:false,
          $sort: {
            category: 1,
          },
        },
      });

      findServices.groupedOrder[0].services.forEach(async (c) => {
        const newPlan = {
          name: c.name,
          checked: false,
        };
        await setBenefittingPlans1((prev) => prev.concat(c));
      });
      console.log(findServices.groupedOrder[0]);
    }
  };

  const handleChange = async (e) => {
    setPlan(e.target.value);
  };
  const handleHMO = async (e) => {
    const abc = e.target.value;
    const hmo = benefittingHMO.find((el) => el._id === abc);

    /*  if (e.target.value===undefined||e.target.value===""){
                toast({
                    message: 'Kindly select Agent HMO ',
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                  return
             }else{ */
    console.log(e.target.value);
    if (!!hmo) {
      await setPlanHMO(hmo);
    }

    //console.log(benefittingHMO[e.target.value].organizationDetail.facilityName)
    /*  } */
  };

  const options = [
    {
      label: "HMO Cover",
      value: "HMO",
    },
    {
      label: "Family Cover",
      value: "Family",
    },

    {
      label: "Company Cover",
      value: "Company",
    },
  ];

  return (
    <>
      <Box sx={{ width: "500px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomSelect
              name="paymentmode"
              defaultValue={paymentmode}
              options={options}
              onChange={(e) => handleChangeMode(e.target.value)}
              label="Payment Mode"
            />
          </Grid>
        </Grid>

        <Collapse in={paymentmode !== "Family"}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FacilitySearch
                getSearchfacility={getSearchfacility}
                clear={success}
              />
              <input
                className="input is-small"
                name="clientid"
                value={clientId}
                type="text"
                onChange={(e) => setClientId(e.target.value)}
                style={{ display: "none" }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Input
                name="principalname"
                value={principalName}
                type="text"
                onChange={(e) => setPrincipalName(e.target.value)}
                label="Principal Name"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Input
                name="principalid"
                value={principalId}
                type="text"
                onChange={(e) => setPrincipalId(e.target.value)}
                label="Organization's Principal ID"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={7}>
              <CustomSelect
                label="Choose plan"
                options={benefittingPlans1.map((item) => item.name)}
                name="bandType"
                defaultValue={plan}
                onChange={(e) => handleChange(e)}
              />
            </Grid>

            {organization?.facilityType === "State HIA" ? (
              <Grid item xs={5}>
                <CustomSelect
                  options={benefittingHMO.map((item) => {
                    return {
                      label: item.organizationDetail.facilityName,
                      value: item._id,
                    };
                  })}
                  name="bandType"
                  value={planHMO?._id}
                  onChange={(e) => handleHMO(e)}
                />
              </Grid>
            ) : (
              <>
                <Grid item xs={2}>
                  <CheckboxInput
                    label="Active"
                    options={["Active"]}
                    name="order"
                    checked={active}
                    type="checkbox"
                    onChange={(e) => setActive(e.target.checked)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button
                    variant="outlined"
                    sx={{ width: "100%" }}
                    onClick={handleAdd}
                  >
                    Add
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Collapse>

        <Collapse in={paymentmode === "Family"}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FacilitySearch
                getSearchfacility={getSearchfacility}
                clear={success}
              />
              <input
                className="input is-small"
                name="clientid"
                value={clientId}
                type="text"
                onChange={(e) => setClientId(e.target.value)}
                style={{ display: "none" }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={7}>
              <Input
                name="plan"
                value={plan}
                type="text"
                onChange={(e) => setPlan(e.target.value)}
                label="Plan"
              />
            </Grid>
            <Grid item xs={2}>
              <CheckboxInput
                label="Active"
                options={["Active"]}
                name="order"
                checked={active}
                type="checkbox"
                onChange={(e) => setActive(e.target.checked)}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="outlined"
                sx={{ width: "100%" }}
                onClick={handleAdd}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Collapse>
      </Box>

      <div className="card card-overflow">
        <div className="card-content ">
          {productItem.length > 0 && (
            <>
              <label>Payment Options:</label>
              <div className="vscrollable-acc">
                <table className="table is-striped  is-hoverable is-fullwidth is-scrollable ">
                  <thead>
                    <tr>
                      <th>
                        <abbr title="Serial No">S/No</abbr>
                      </th>
                      <th>
                        <abbr title="Type">Type</abbr>
                      </th>
                      <th>
                        <abbr title="Principal">Principal</abbr>
                      </th>
                      <th>
                        <abbr title="Organization">Organization</abbr>
                      </th>
                      <th>
                        <abbr title="HMO">HMO Agent</abbr>
                      </th>
                      <th>
                        <abbr title="Plan">Plan</abbr>
                      </th>
                      <th>
                        <abbr title="Active">Active</abbr>
                      </th>
                      {/*  */}
                      {/* <th><abbr title="Actions">Actions</abbr></th> */}
                    </tr>
                  </thead>
                  <tfoot></tfoot>
                  <tbody>
                    {productItem.map((ProductEntry, i) => (
                      <tr key={i}>
                        <th>{i + 1}</th>
                        <th>{ProductEntry.paymentmode}</th>
                        <td>{ProductEntry.principalName}</td>
                        <td>{ProductEntry.organizationName}</td>
                        <td>{ProductEntry.agentName}</td>
                        <td>{ProductEntry.plan}</td>
                        <td>{ProductEntry.active ? "Yes" : "No"}</td>

                        {/* <td>{ProductEntry.amount}</td> */}
                        {/*  <td><span className="showAction"  >x</span></td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="field mt-2 is-grouped">
                <p className="control">
                  <button
                    className="button is-success is-small"
                    disabled={!productItem.length > 0}
                    onClick={handlePayment}
                  >
                    Update
                  </button>
                </p>
                <p className="control">
                  <button
                    className="button is-warning is-small"
                    disabled={!productItem.length > 0}
                    onClick={onSubmit}
                  >
                    Cancel
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
