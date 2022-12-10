import React, { useContext, useState, useEffect } from 'react';
import Button from '../../components/buttons/Button';
import { ObjectContext, UserContext } from '../../context';
import { PageWrapper } from '../../ui/styled/styles';
import { TableMenu } from '../dashBoardUiComponent/core-ui/styles';
import client from '../../feathers';
import CustomTable from '../../components/customtable';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Portal,
  Radio,
  RadioGroup,
  Grid,
} from '@mui/material';
import ModalBox from '../../components/modal';
import ServiceSearch from '../helpers/ServiceSearch';
import { BottomWrapper, GridBox } from '../app/styles';
import ViewText from '../../components/viewtext';
import { useForm } from 'react-hook-form';
import Input from '../../components/inputs/basic/Input';
import Textarea from '../../components/inputs/basic/Textarea';
import CustomSelect from '../../components/inputs/basic/Select';
import SearchSelect from '../helpers/SearchSelect';
import { toast, ToastContainer } from 'react-toastify';
import GlobalCustomButton from '../../components/buttons/CustomButton';
import { FormsHeaderText } from '../../components/texts';
import FilterMenu from '../../components/utilities/FilterMenu';

const tariffSchema = [
  {
    name: 'S/N',
    key: 'sn',
    description: 'Enter Serial Number',
    selector: (row, i) => i + 1,
    sortable: true,
    required: true,
    inputType: 'HIDDEN',
    width: '50px',
  },
  {
    name: 'Categories',
    key: 'categories',
    description: 'Categories',
    selector: (row) => row.categoryname,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
];

const ServiceSchema = [
  {
    name: 'S/N',
    key: 'sn',
    description: 'S/N',
    selector: (row, i) => i + 1,
    sortable: true,
    required: true,
    inputType: 'HIDDEN',
    width: '50px',
  },
  {
    name: 'Service Name',
    key: 'servicename',
    description: 'Service Name',
    selector: (row) => row?.name,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
  {
    name: 'Panel',
    key: 'panel',
    description: 'Panel',
    selector: (row) => (row?.panel ? 'Yes' : 'No'),
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
  {
    name: 'Price',
    key: 'price',
    description: 'Price',
    selector: (row) =>
      row?.contracts?.map((item) =>
        item?.source_org === item?.dest_org ? item?.price : null
      ),
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
];

const TarrifList = () => {
  const [showModal, setShowModal] = useState(false);
  const [showView, setShowView] = useState(false);
  const [tariffs, setTariffs] = useState([]);
  const [tariff, setTariff] = useState();
  const { state, setState } = useContext(ObjectContext);
  const { user } = useContext(UserContext);
  const ServicesServ = client.service('billing');
  const BandsServ = client.service('bands');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [facilities, setFacilities] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  const handleCreateNew = async () => {
    const newServicesModule = {
      selectedServices: {},
      show: 'create',
    };
    await setState((prevstate) => ({
      ...prevstate,
      ServicesModule: newServicesModule,
    }));
  };
  const handleRow = async (Service) => {
    console.log(Service);
    setSelectedServices(Service?.services);
    const newServicesModule = {
      selectedServices: Service,
      show: 'detail',
    };
    await setState((prevstate) => ({
      ...prevstate,
      ServicesModule: newServicesModule,
    }));
    // setShowView(true);
    // setTariff(Service);
  };
  const handleService = async (Service) => {
    setSelectedCategory(Service);
    setShowView(true);
  };

  const handleSearch = (val) => {
    const field = 'name';
    console.log(val);
    ServicesServ.find({
      query: {
        [field]: {
          $regex: val,
          $options: 'i',
        },
        facility: user.currentEmployee.facilityDetail._id,
        $limit: 20,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then((res) => {
        console.log(res);
        setFacilities(res.groupedOrder);
      })
      .catch((err) => {
        console.log(err);
        toast({
          message: 'Error during search ' + err,
          type: 'is-danger',
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  const getFacilities = async () => {
    if (user.currentEmployee) {
      const findServices = await ServicesServ.find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          'contracts.source_org': state.facilityModule.selectedFacility._id,
          $sort: {
            category: 1,
          },
        },
      });
      console.log(findServices);
      await setFacilities(findServices.groupedOrder).then(() => {
        console.log(facilities);
      });
    } else {
      if (user.stacker) {
        toast({
          message: 'You do not qualify to view this',
          type: 'is-danger',
          dismissible: true,
          pauseOnHover: true,
        });
        return;
      }
    }
  };

  useEffect(() => {
    getFacilities();

    ServicesServ.on('created', (obj) => getFacilities());
    ServicesServ.on('updated', (obj) => getFacilities());
    ServicesServ.on('patched', (obj) => getFacilities());
    ServicesServ.on('removed', (obj) => getFacilities());
    return () => {};
  }, [state.facilityModule.selectedFacility]);

  return (
    <>
      <Portal>
        <ModalBox
          open={showModal}
          onClose={() => setShowModal(false)}
          width="50vw"
        >
          <TariffCreate />
        </ModalBox>
      </Portal>
      <Portal>
        <ModalBox
          open={showView}
          onClose={() => setShowView(false)}
          width="50vw"
        >
          <TariffView tariff={selectedCategory} />
        </ModalBox>
      </Portal>

      <PageWrapper>
        <Box sx={{ width: '98%', margin: '0 auto' }}>
          <TableMenu>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h2 style={{ marginLeft: '10px', fontSize: '0.95rem' }}>
                List of Tariffs
              </h2>
              {handleSearch && (
                <div className="inner-table">
                  <FilterMenu onSearch={handleSearch} />
                </div>
              )}
            </div>

            <GlobalCustomButton
              text="Add new "
              onClick={() => setShowModal(true)}
            />
          </TableMenu>
          <div
            className="columns"
            style={{
              display: 'flex',
              width: '100%',
              //flex: "1",
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                width: selectedServices.length === 0 ? '49.5%%' : '100%',
                height: 'calc(100vh - 120px)',
                overflow: 'auto',
                transition: 'width 0.5s ease-in',
              }}
            >
              <CustomTable
                title={''}
                columns={tariffSchema}
                data={facilities}
                pointerOnHover
                highlightOnHover
                striped
                onRowClicked={(row) => handleRow(row)}
              />
            </div>
            {/* {selectedServices && ( */}
            {selectedServices.length > 1 && (
              <div
                style={{
                  width: '49.5%',
                  height: 'calc(100vh - 120px)',
                  overflow: 'auto',
                  transition: 'width 0.5s ease-in',
                  margin: '0 1rem',
                }}
              >
                <CustomTable
                  title={''}
                  columns={ServiceSchema}
                  data={selectedServices}
                  pointerOnHover
                  highlightOnHover
                  striped
                  onRowClicked={(row) => handleService(row)}
                />
              </div>
            )}
          </div>
          {/* )} */}
        </Box>
      </PageWrapper>
    </>
  );
};

const TariffCreate = () => {
  const [, setPriceState] = useState({
    bronze: false,
    gold: false,
    silver: false,
    platinium: false,
  });
  const [loading, setLoading] = useState(false);
  const [bands, setBands] = useState([]);
  const [data, setData] = useState(null);
  const [catergory, setCategory] = useState(null);
  const [categoryname, setCategoryName] = useState('');
  const [success, setSuccess] = useState(false);
  const [success2, setSuccess2] = useState(false);
  const [cash, setCash] = useState('Cash');
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const [providerBand, setProviderBand] = useState([]);
  const [benefittingPlans1, setBenefittingPlans1] = useState([]);
  const ServicesServ = client.service('billing');
  const BandsServ = client.service('bands');
  //const history = useHistory()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [facilityId, setFacilityId] = useState('');
  const [source, setSource] = useState('');
  const [panel, setPanel] = useState(false);
  const [name, setName] = useState('');
  const [benefittingplans, setBenefittingPlans] = useState([]);
  const [quantity, setQuantity] = useState();
  const [costprice, setCostprice] = useState('');
  const [orgType, setOrgType] = useState('');
  const [comments, setComments] = useState('');
  const [productItem, setProductItem] = useState([]);
  const [plan, setPlan] = useState('');
  const [service, setService] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [panelList, setPanelList] = useState([]);
  const [successService, setSuccessService] = useState(false);
  const { state } = useContext(ObjectContext);
  const [chosen2, setChosen2] = useState();
  const [modifier, setModifier] = useState([]);
  const [subplan, setSubplan] = useState({});
  const [band, setBand] = useState('');
  const [serviceUnavailable, setServiceUnavailable] = useState({
    status: false,
    name: '',
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
  } = useForm({
    defaultValues: {
      facility: user.currentEmployee.facility,
    },
  });
  const onSubmit = async (data, e) => {
    setLoading(true);
    e.preventDefault();

    await setServices
      .create(data)
      .then((res) => {
        toast.success(`Client successfully created`);

        setLoading(false);
      })
      .catch((err) => {
        toast.error(`Sorry, You weren't able to create an client. ${err}`);
        setLoading(false);
      });
    setLoading(false);
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const findServices = await ServicesServ.find();
        const findBands = await BandsServ.find();
        setServices(findServices?.data);
        setBands(findBands?.data);
      } catch (err) {}
      setLoading(false);
    };

    getData();
  }, []);

  const handleChange = (event) => {
    setPriceState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };
  const updateObjectInArray = (array, child) => {
    array.map((item, index) => {
      if (item.name !== child.name) {
        // This isn't the item we care about - keep it as-is
        return item;
      }
      // Otherwise, this is the one we want - return an updated value
      //console.log(child)
      return {
        ...child,
      };
    });
    return array;
  };

  const handleChangeMode = async (e) => {
    let existingBand = productItem.filter((el) => el.band === e.target.value);
    if (!existingBand.length > 0) {
      await setBand(e.target.value);
    } else {
      toast({
        message: ' This band already exist! Please choose another band ',
        type: 'is-danger',
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }
  };

  const handleServType = async (e, i, c) => {
    let currentPlan = benefittingplans.filter((el) => el.name == c.name)[0];
    currentPlan.serviceClass = e.target.value;
    currentPlan.capitation = e.target.value === 'Capitation' ? true : false;
    currentPlan.feeforService =
      e.target.value === 'Fee for Service' ? true : false;
    const updatedplan = updateObjectInArray(benefittingplans, currentPlan);
    await setBenefittingPlans(updatedplan);
  };

  const handleCopay = async (e, i, c) => {
    let currentPlan = benefittingplans.filter((el) => el.name == c.name)[0];
    currentPlan.copay = e.target.value;
    currentPlan.reqCopay = currentPlan.copay === '' ? false : true;
    const updatedplan = updateObjectInArray(benefittingplans, currentPlan);
    await setBenefittingPlans(updatedplan);
  };

  const handleAuthCode = async (e, i, c) => {
    let currentPlan = benefittingplans.filter((el) => el.name == c.name)[0];
    currentPlan.reqAuthCode = e.target.checked;
    const updatedplan = updateObjectInArray(benefittingplans, currentPlan);
    await setBenefittingPlans(updatedplan);
  };

  useEffect(() => {
    return () => {};
  }, [benefittingplans]);

  const [Services, setServices] = useState({
    productitems: [],
    panel,
    source,
  });

  // consider batchformat{batchno,expirydate,qtty,baseunit}
  //consider baseunoit conversions
  const getSearchfacility = (obj) => {
    setFacilityId(obj._id);
    setName(obj.facilityName);
    setOrgType(obj.facilityType);

    if (!obj) {
      // setName("")
      setOrgType('');
      setFacilityId('');
      setCostprice('');
    }

    /*  setValue("facility", obj._id,  {
            shouldValidate: true,
            shouldDirty: true
        }) */
  };
  const getSearchfacility2 = (obj) => {
    setCategoryName(obj.categoryname);
    setChosen2(obj);

    if (!obj) {
      //"clear stuff"
      setCategoryName('');
      setChosen2();
    }
  };

  const getSearchService = (obj) => {
    setService(obj);
    if (!obj) {
      setService('');
    }
    setSuccessService(false);
  };

  const notfound = async (obj) => {
    //alert(obj)
    await setServiceUnavailable(obj);
    await setSuccessService(true);
    if (!obj) {
      await setServiceUnavailable('');
    }
    // console.log(obj)
    //here
  };

  useEffect(() => {
    setCurrentUser(user);

    //console.log(currentUser)
    return () => {};
  }, [user]);

  const getBenfittingPlans = async () => {
    setBenefittingPlans1([]);
    if (user.currentEmployee) {
      const findServices = await ServicesServ.find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          'contracts.source_org': user.currentEmployee.facilityDetail._id,
          'contracts.dest_org': user.currentEmployee.facilityDetail._id,
          category: 'Managed Care',
          // storeId:state.StoreModule.selectedStore._id,
          // $limit:20,
          //   paginate:false,
          $sort: {
            category: 1,
          },
        },
      });
      console.log(findServices);
      if (findServices.total > 0) {
        findServices.groupedOrder[0].services.forEach(async (c) => {
          const newPlan = {
            name: c.name,
            checked: false,
          };
          await setBenefittingPlans1((prev) => prev.concat(c));
        });
      }
    }
  };
  const getProviderBand = async () => {
    if (user.currentEmployee) {
      const findServices = await BandsServ.find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          bandType:
            user.currentEmployee.facilityDetail.facilityType === 'HMO'
              ? 'Provider'
              : 'Company',

          // storeId:state.StoreModule.selectedStore._id,
          // $limit:20,
          //   paginate:false,
          $sort: {
            category: 1,
          },
        },
      });
      // console.log(findServices)
      await setProviderBand(findServices.data);
      // console.log(findServices)
    }
  };

  useEffect(() => {
    // console.log("starting...")
    setBenefittingPlans1([]);
    setFacilityId(user.currentEmployee.facilityDetail._id);
    setName(user.currentEmployee.facilityDetail.facilityName);
    setOrgType(user.currentEmployee.facilityDetail.facilityType);
    getProviderBand();
    getBenfittingPlans();
    return () => {};
  }, []);

  const handleClickProd = async () => {
    let pricingInfo = {
      band,
      costprice,
      benefittingplans, //=array of planx
    };

    let productItemI = {
      /* facilityId,
            name,
            quantity,
            costprice, */
      name: service.name,
      categoryname,
      comments,
      pricingInfo,
    };
    //  if (productItem.length>0){
    //Check that fields are filled appropriately
    if (!costprice) {
      toast({
        message: 'You need to enter price ',
        type: 'is-danger',
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }

    if (!service.name && !serviceUnavailable.name) {
      toast({
        message: 'You need to enter service name ',
        type: 'is-danger',
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }
    if (!categoryname) {
      toast({
        message: 'You need to enter category ',
        type: 'is-danger',
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }
    if (band === '') {
      toast({
        message: 'You need to choose provider band ',
        type: 'is-danger',
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }
    if (!benefittingplans.length > 0) {
      toast({
        message: 'You need to add benefiting plan ',
        type: 'is-danger',
        dismissible: true,
        pauseOnHover: true,
      });

      return;
    }
    let check = await handleCheck();
    if (check) {
      return;
    }
    productItemI = {
      source_org: facilityId,
      source_org_name: name,
      dest_org: user.currentEmployee.facilityDetail._id,
      dest_org_name: user.currentEmployee.facilityDetail.facilityName,
      price: costprice,
      billing_type: orgType === 'HMO' ? 'HMO' : 'Company',
      plans: benefittingplans,
      comments: comments,

      band: band,
    };
    console.log(productItemI);
    await setCash('');

    await setSuccess(false);
    setProductItem((prevProd) => prevProd.concat(productItemI));

    setCostprice('');
    setBand('');
    setBenefittingPlans([]);
    setBenefittingPlans1([]);
    getBenfittingPlans();

    await setSuccess(true);
  };

  const resetform = () => {
    //setFacilityId("")
    setSource('');
    setPanel(false);
    //setName("")
    setComments('');
    setCostprice('');
    setProductItem([]);
    setCategoryName('');
    setService('');
    setPanelList([]);
    setPlan('');
    setBenefittingPlans([]);
    setCash('Cash');
    setOrgType('');
    setServiceUnavailable('');
    setServices('');
  };
  const handleClear = () => {
    resetform();
    /*  setMessage("Created Services successfully") */
    setSuccess(true);
    setSuccess2(true);
    setSuccessService(true);
    toast({
      message: 'Data entry cleared succesfully',
      type: 'is-success',
      dismissible: true,
      pauseOnHover: true,
    });
    setSuccess(false);
    setSuccess2(false);
    setSuccessService(false);
    setProductItem([]);
    setPanelList([]);
  };

  const handleBenefit = (e) => {
    setBenefittingPlans((prevstate) => prevstate.concat(plan));
    setPlan('');
  };

  const handleRemove = (index, contract) => {
    //console.log(index)
    if (contract.billing_type === 'Cash') {
      toast({
        message: 'You cannot remove cash billing',
        type: 'is-danger',
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }

    //setProductItem(prevstate=> prevstate.splice(i,1))
    setProductItem((prevstate) =>
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
    setPanelList((prevstate) => prevstate.concat(newService));
    setSuccessService(true);
    newService = {};
    setService('');
    console.log('something added');
  };
  const handleCheck = async () => {
    if (!categoryname) {
      toast({
        message: 'Enter Category!',
        type: 'is-danger',
        dismissible: true,
        pauseOnHover: true,
      });
      return true;
    }
    console.log('unavailb:', serviceUnavailable.name);
    console.log('availb:', service.name);
    const resp = await ServicesServ.find({
      query: {
        name: serviceUnavailable.name || service.name, //source
        facility: user.currentEmployee.facilityDetail._id,
        category: categoryname,
      },
    });
    console.log(resp);
    //.
    /*then((resp)=>{
        console.log(resp)*/
    if (resp.data.length > 0) {
      toast({
        message: 'Service already exist. Kindly modify it ', //+ resp.data ,
        type: 'is-danger',
        dismissible: true,
        pauseOnHover: true,
      });
      return true;
    } else {
      return false;
    }
    // })
    /*  .catch((err)=>{
        toast({
            message: 'Error checking services  '+ err ,
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          })  */
    //  })
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <FormsHeaderText text="Create Tariff" />
        <GlobalCustomButton
          text="Create Tariff"
          type="submit"
          color="success"
        />
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={6}>
            <Input label="Tariff Name" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SearchSelect
              service={ServicesServ}
              data={data}
              setData={setData}
              placeholder="Search Services"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SearchSelect
              service={ServicesServ}
              data={catergory}
              setData={setCategory}
              placeholder="Search Services Category"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Textarea label="Comments" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <select
              name="bandType"
              value={band}
              onChange={(e) => handleChangeMode(e)}
              className="selectadd"
              style={{
                border: '1px solid #b6b6b6',
                height: '2.2rem',
                borderRadius: '4px',
                width: '100%',
              }}
            >
              <option value="">
                {user.currentEmployee.facilityDetail.facilityType === 'HMO'
                  ? 'Choose Provider Band'
                  : 'Choose Company Band'}{' '}
              </option>
              {providerBand.map((option, i) => (
                <option key={i} value={option.name}>
                  {' '}
                  {option.name}
                </option>
              ))}
            </select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input label="Price" />
          </Grid>
        </Grid>
        {/* <CustomSelect label='Company Band' options={reformedBands} /> */}

        <Box>
          <h2>Benefiting Plans</h2>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox onChange={handleChange} />}
              label="Bronze"
              name="bronze"
            />
            {state.bronze && (
              <Box>
                <Input placeholder="Co-pay payout" label="Co-pay payout" />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="capitation"
                    name="radio-buttons-group"
                    sx={{
                      display: 'flex !important',
                      justifyContent: 'space-between',
                      flexDirection: 'row !important',
                    }}
                  >
                    <FormControlLabel
                      value="capitation"
                      control={<Radio />}
                      label="Capitation"
                    />
                    <FormControlLabel
                      value="feeForService"
                      control={<Radio />}
                      label="Fee for Service"
                    />
                  </RadioGroup>

                  <FormControlLabel
                    control={<Checkbox onChange={handleChange} />}
                    label="Requires Pre-Authorization Code"
                  />
                </Box>
              </Box>
            )}
            <FormControlLabel
              control={<Checkbox onChange={handleChange} />}
              label="Gold"
              name="gold"
            />
            {state.gold && (
              <Box>
                <Input placeholder="Co-pay payout" label="Co-pay payout" />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="capitation"
                    name="radio-buttons-group"
                    sx={{
                      display: 'flex !important',
                      justifyContent: 'space-between',
                      flexDirection: 'row !important',
                    }}
                  >
                    <FormControlLabel
                      value="capitation"
                      control={<Radio />}
                      label="Capitation"
                    />
                    <FormControlLabel
                      value="feeForService"
                      control={<Radio />}
                      label="Fee for Service"
                    />
                  </RadioGroup>

                  <FormControlLabel
                    control={<Checkbox onChange={handleChange} />}
                    label="Requires Pre-Authorization Code"
                  />
                </Box>
              </Box>
            )}
            <FormControlLabel
              control={<Checkbox onChange={handleChange} />}
              label="Silver"
              name="silver"
            />
            {state.silver && (
              <Box>
                <Input placeholder="Co-pay payout" label="Co-pay payout" />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="capitation"
                    name="radio-buttons-group"
                    sx={{
                      display: 'flex !important',
                      justifyContent: 'space-between',
                      flexDirection: 'row !important',
                    }}
                  >
                    <FormControlLabel
                      value="capitation"
                      control={<Radio />}
                      label="Capitation"
                    />
                    <FormControlLabel
                      value="feeForService"
                      control={<Radio />}
                      label="Fee for Service"
                    />
                  </RadioGroup>

                  <FormControlLabel
                    control={<Checkbox onChange={handleChange} />}
                    label="Requires Pre-Authorization Code"
                  />
                </Box>
              </Box>
            )}
            <FormControlLabel
              control={<Checkbox onChange={handleChange} />}
              label="Platinium"
              name="platinium"
            />
            {state.platinium && (
              <Box>
                <Input placeholder="Co-pay payout" label="Co-pay payout" />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="capitation"
                    name="radio-buttons-group"
                    sx={{
                      display: 'flex !important',
                      justifyContent: 'space-between',
                      flexDirection: 'row !important',
                    }}
                  >
                    <FormControlLabel
                      value="capitation"
                      control={<Radio />}
                      label="Capitation"
                    />
                    <FormControlLabel
                      value="feeForService"
                      control={<Radio />}
                      label="Fee for Service"
                    />
                  </RadioGroup>

                  <FormControlLabel
                    control={<Checkbox onChange={handleChange} />}
                    label="Requires Pre-Authorization Code"
                  />
                </Box>
              </Box>
            )}
          </FormGroup>
        </Box>
      </form>
    </Box>
  );
};

const TariffView = (tariff) => {
  const [editing, setEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: tariff?.tariff?.name,
      category: tariff.tariff.category,
    },
  });
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <FormsHeaderText text={tariff?.tariff?.name} />
        <Box>
          {!editing && (
            <GlobalCustomButton text="Edit" onClick={() => setEditing(true)} />
          )}
          {editing && (
            <GlobalCustomButton
              text="Save Form"
              type="submit"
              color="success"
            />
          )}
        </Box>
      </Box>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} sm={6}>
          {!editing ? (
            <Input label="Name" value={tariff?.tariff?.name} disabled />
          ) : (
            <Input label="Name" register={register('name')} />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {!editing ? (
            <Input label="Category" value={tariff?.tariff?.category} disabled />
          ) : (
            <Input label="Category" register={register('categoryname')} />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {!editing ? (
            <Input
              label="Facility Name"
              value={tariff?.tariff?.facilityname}
              disabled
            />
          ) : (
            <Input label="Facility Name" register={register('bandType')} />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {!editing ? (
            <Input
              label="Price"
              value={`₦${tariff?.tariff?.contracts[0]?.price}`}
              disabled
            />
          ) : (
            <Input label="Price" register={register('costprice')} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default TarrifList;
