/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from 'react';
import client from '../../feathers';
import { DebounceInput } from 'react-debounce-input';
import { UserContext, ObjectContext } from '../../context';
import { toast } from 'react-toastify';
import { FacilitySearch } from '../helpers/FacilitySearch';
import { ClientSearch } from '../helpers/ClientSearch';
import { Box, Grid } from '@mui/material';
import Input from '../../components/inputs/basic/Input';
import GlobalCustomButton from '../../components/buttons/CustomButton';
import CustomTable from '../../components/customtable';
import { FormsHeaderText } from '../../components/texts';
import { FinInfoSchema } from './schema';

export default function ClientFinInfo({ closeModal }) {
  const { user } = useContext(UserContext);
  const [organizationId, setOrganizationId] = useState(null);
  const [principalId, setPrincipalId] = useState('');
  const [clientId, setClientId] = useState('');
  const [principalName, setPrincipalName] = useState('');
  const [organization, setOrganization] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [principal, setPrincipal] = useState(null);
  const [plan, setPlan] = useState('');
  const [planHMO, setPlanHMO] = useState('');
  const [chosenHMO, setChosenHMO] = useState('');
  const ServicesServ = client.service('billing');
  const [active, setActive] = useState(false);
  const [success, setSuccess] = useState(false);
  const [success1, setSuccess1] = useState(false);
  const [paymentmode, setPaymentMode] = useState('HMO');
  const [productItem, setProductItem] = useState([]);
  const [obj, setObj] = useState('');
  const [benefittingPlans1, setBenefittingPlans1] = useState([]);
  const [benefittingHMO, setBenefittingHMO] = useState([]);
  const { state, setState } = useContext(ObjectContext);
  const ClientServ = client.service('client');
  const HMOServ = client.service('organizationclient');
  //  const [productEntry,setProductEntry]=useState({

  //})

  let medication = state.ClientModule.selectedClient;

  //console.log(state.financeModule.state)

  const handleChangeMode = async (value) => {
    await setPaymentMode(value);
    setOrganizationId(null);
    setOrganizationName('');
    setOrganization(null);
    setPlan('');
    setPlanHMO('');
    setActive(false);
    setClientId('');
    setPrincipalId('');
    setPrincipal(null);
    setPrincipalName('');
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
    agentName: planHMO ? planHMO.organizationDetail.facilityName : '',
  };

  const getSearchfacility1 = async (obj) => {
    //setPrincipalId(obj._id)
    setPrincipalName(obj.firstname + ' ' + obj.lastname);
    setPrincipal(obj._id);

    if (!obj) {
      //"clear stuff"
      setPrincipalId('');
      setPrincipalName('');
      setPrincipal(null);
      setPlanHMO('');
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
      setOrganizationName('');
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
    setOrganizationName('');
    setOrganization(null);
    setPlan('');
    setActive(false);
    setClientId('');
    setPrincipalId('');
    setPrincipal(null);
    setPrincipalName('');
    setSuccess(true);
    setPaymentMode('HMO');
    setPlanHMO('');
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
        toast.success('Client financial info updated succesfully');
        closeModal();
      })
      .catch((err) => {
        console.log(err);
        toast.error('Error creating Client ' + err);
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
        relationshiptype: 'managedcare',
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
        toast.error('Error fetching HMO ' + err);
      });
  };

  const getBenfittingPlans = async (obj) => {
    await setBenefittingPlans1([]);
    if (user.currentEmployee) {
      console.log(obj._id, organizationId);

      const findServices = await ServicesServ.find({
        query: {
          //facility: obj._id, // user.currentEmployee.facilityDetail._id,
          'contracts.source_org': obj._id, // user.currentEmployee.facilityDetail._id ,
          'contracts.dest_org': obj._id, //user.currentEmployee.facilityDetail._id ,
          category: 'Managed Care',
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

  return (
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <select
              name="paymentmode"
              value={paymentmode}
              onChange={(e) => handleChangeMode(e.target.value)}
              className="selectadd"
              style={{
                border: '1px solid #b6b6b6',
                height: '38px',
                borderRadius: '4px',
                width: '100%',
              }}
            >
              <option value="">Payment Mode </option>
              <option value="HMO">HMO Cover</option>
              <option value="Family">Family Cover </option>
              <option value="Company">Company Cover</option>
            </select>
          </Grid>
          {paymentmode !== 'Family' ? (
            <>
              <Grid item md={6}>
                <FacilitySearch
                  getSearchfacility={getSearchfacility}
                  clear={success}
                />
              </Grid>
              <Grid item md={6}>
                <Input
                  placeholder={` Organization's Client Identifier`}
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  label="Client Id"
                />
              </Grid>
              <Grid item md={6}>
                <Input
                  value={principalName}
                  onChange={(e) => setPrincipalName(e.target.value)}
                  label="Principal Name"
                />
              </Grid>
              <Grid item md={6}>
                <Input
                  value={principalId}
                  onChange={(e) => setPrincipal(e.target.value)}
                  label="Principal Id"
                />
              </Grid>
              <Grid item md={6}>
                <select
                  name="bandType"
                  value={plan}
                  onChange={(e) => handleChange(e)}
                  className="selectadd"
                  style={{
                    border: '1px solid #b6b6b6',
                    height: '38px',
                    borderRadius: '4px',
                    width: '100%',
                  }}
                >
                  <option value="">Choose Plan </option>
                  {benefittingPlans1.map((option, i) => (
                    <option key={i} value={option.name}>
                      {' '}
                      {option.name}
                    </option>
                  ))}
                </select>
              </Grid>
              {organization?.facilityType === 'State HIA' && (
                <Grid item md={6}>
                  <>
                    <select
                      name="bandType"
                      value={planHMO?._id}
                      onChange={(e) => handleHMO(e)}
                      className="selectadd"
                      style={{
                        border: '1px solid #b6b6b6',
                        height: '38px',
                        borderRadius: '4px',
                        width: '100%',
                      }}
                    >
                      {benefittingHMO.map((options, i) => (
                        <option key={i} value={options._id}>
                          {' '}
                          {options.organizationDetail.facilityName}
                        </option>
                      ))}
                    </select>
                  </>
                </Grid>
              )}
              <Grid item md={6}>
                <label className="label is-size-7 poslabel">
                  <input
                    className="checkbox is-small"
                    name="order"
                    checked={active}
                    type="checkbox"
                    onChange={(e) => setActive(e.target.checked)}
                    placeholder="Active"
                    style={{
                      border: '1px solid #0364FF',
                      // transform: 'scale(1.5)',
                      color: '#0364FF',
                      margin: '0 .5rem',
                    }}
                  />
                  Active
                </label>
              </Grid>
              <Grid item md={6}>
                <GlobalCustomButton
                  onClick={handleAdd}
                  text="Add"
                  color="success"
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid item md={6}>
                <ClientSearch
                  getSearchfacility={getSearchfacility1}
                  clear={success1}
                />
              </Grid>
              <Grid item md={6}>
                <Input
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  label="Plan"
                />
              </Grid>
              <Grid item md={6}>
                <label className="label is-size-7 poslabel">
                  <input
                    className="checkbox is-small"
                    name="order"
                    checked={active}
                    type="checkbox"
                    onChange={(e) => setActive(e.target.checked)}
                    placeholder="Active"
                    style={{
                      border: '1px solid #0364FF',
                      // transform: 'scale(1.5)',
                      color: '#0364FF',
                      margin: '0 .5rem',
                    }}
                  />
                  Active
                </label>
              </Grid>
              <Grid item md={6}>
                <GlobalCustomButton
                  onClick={handleAdd}
                  text="Add"
                  color="success"
                />
              </Grid>
            </>
          )}
        </Grid>
        {productItem?.length > 0 && (
          <>
            <FormsHeaderText text={`Payment Options:`} />
            <CustomTable
              title={''}
              columns={FinInfoSchema}
              data={productItem}
              pointerOnHover
              highlightOnHover
              striped
            />
          </>
        )}
        <Box sx={{ display: 'flex' }} mt={1}>
          <GlobalCustomButton
            onClick={handlePayment}
            disabled={!productItem?.length > 0}
            text="Update"
            color="info"
            variant="contained"
            customStyles={{ marginRight: '1rem' }}
          />
          <GlobalCustomButton
            onClick={onSubmit}
            text="Cancel"
            color="warning"
            variant="contained"
            disabled={!productItem?.length > 0}
          />
        </Box>
      </Box>
    </>
  );
}
