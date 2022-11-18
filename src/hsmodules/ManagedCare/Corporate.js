/* eslint-disable */
import React, { useState, useContext, useEffect } from 'react';
import client from '../../feathers';
import { DebounceInput } from 'react-debounce-input';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from '../../context';
import { FacilitySearch } from '../helpers/FacilitySearch';
import { PageWrapper } from '../../ui/styled/styles';
import { TableMenu } from '../../ui/styled/global';
import Button from '../../components/buttons/Button';
import CustomTable from '../../components/customtable';
import FilterMenu from '../../components/utilities/FilterMenu';
import { Box, Grid, Button as MuiButton } from '@mui/material';
import ModalBox from '../../components/modal';
import { FaHospital, FaAddressCard, FaUserAlt } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import { BsFillTelephoneFill, BsHouseDoorFill } from 'react-icons/bs';
import { MdEmail, MdLocalHospital } from 'react-icons/md';
import ModalHeader from '../Appointment/ui-components/Heading/modalHeader';
import Input from '../../components/inputs/basic/Input';

export default function OrganizationClient() {
  const { state } = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedFacility, setSelectedFacility] = useState();
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(0);

  //const [showState,setShowState]=useState() //create|modify|detail

  //console.log("Organization parent", state)

  return (
    <section className="section remPadTop">
      <OrganizationList showModal={showModal} setShowModal={setShowModal} />

      {showModal === 1 && (
        <ModalBox
          open={state.facilityModule.show === 'create'}
          onClose={() => setShowModal(0)}
        >
          <OrganizationCreate />
        </ModalBox>
      )}
      {showModal === 2 && (
        <ModalBox
          open={state.facilityModule.show === 'detail'}
          onClose={() => setShowModal(0)}
        >
          <OrganizationDetail
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </ModalBox>
      )}
      {showModal === 3 && (
        <ModalBox
          open={state.facilityModule.show === 'modify'}
          onClose={() => setShowModal(0)}
        >
          <OrganizationModify
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </ModalBox>
      )}
      {/* {state.facilityModule.show === 'modify' && (
        <OrganizationModify facility={selectedFacility} />
      )} */}
    </section>
  );
}

export function OrganizationCreate() {
  const { register, handleSubmit } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const facilityServ = client.service('facility');
  const orgServ = client.service('organizationclient');
  const [chosen, setChosen] = useState('');
  const [band, setBand] = useState('');
  const BandsServ = client.service('bands');
  const [providerBand, setProviderBand] = useState([]);
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser

  const handleChangeMode = async (e) => {
    await setBand(e.target.value);
  };
  /* const onSubmit = (data,e) =>{
        e.preventDefault();
        setMessage("")
        setError(false)
        setSuccess(false)
          data.createdby=user._id
          //console.log(data);
          
        facilityServ.create(data)
        .then((res)=>{
                //console.log(JSON.stringify(res))
                e.target.reset();
                setMessage("Created Organization successfully")
                setSuccess(true)
            })
            .catch((err)=>{
                setMessage("Error creating facility, probable network issues "+ err )
                setError(true)
            })

      }  */
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

  const handleClick = () => {
    //check band selected
    if (band === '') {
      toast({
        message: 'Band not selected, Please select band',
        type: 'is-danger',
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }

    console.log(chosen);
    let stuff = {
      facility: user.currentEmployee.facilityDetail._id,
      organization: chosen._id,
      relationshiptype: 'managedcare',
      band,
    };
    orgServ
      .create(stuff)
      .then((res) => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        setSuccess(true);
        toast({
          message: 'Organization added succesfully',
          type: 'is-success',
          dismissible: true,
          pauseOnHover: true,
        });
        setSuccess(false);
        setBand('');
      })
      .catch((err) => {
        toast({
          message: 'Error adding organization ' + err,
          type: 'is-danger',
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  useEffect(() => {
    // console.log("starting...")
    getProviderBand();
    return () => {};
  }, []);
  const getSearchfacility = (obj) => {
    setChosen(obj);

    /*  setCategoryName(obj.categoryname)
        setChosen2(obj) */

    if (!obj) {
      //"clear stuff"
      /*  setCategoryName("")
             setChosen2() */
    }
  };

  return (
    <>
      <ModalHeader text={'Add Corporate'} />
      <FacilitySearch getSearchfacility={getSearchfacility} clear={success} />
      <select
        name="bandType"
        value={band}
        onChange={(e) => handleChangeMode(e)}
        className="selectadd"
        style={{
          width: '100%',
          padding: '1rem',
          margin: '1rem 0',
          borderRadius: '4px',
          cursor: 'pointer',
          border: '1px solid rgba(0, 0, 0, 0.6)',
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
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={12}>
          <Button label="Add" type="submit" onClick={handleClick} />
        </Grid>
      </Grid>
    </>
  );
}

export function OrganizationList({ showModal, setShowModal }) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState('');
  const facilityServ = client.service('facility');
  const orgServ = client.service('organizationclient');
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedFacility, setSelectedFacility] = useState(); //
  // eslint-disable-next-line
  const { state, setState } = useContext(ObjectContext);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleCreateNew = async () => {
    const newfacilityModule = {
      selectedFacility: {},
      show: 'create',
    };
    await setState((prevstate) => ({
      ...prevstate,
      facilityModule: newfacilityModule,
    }));
    //console.log(state)
    setShowModal(1);
  };
  const handleRow = async (facility) => {
    //console.log("b4",state)

    //console.log("handlerow",facility)

    await setSelectedFacility(facility?.organizationDetail);

    const newfacilityModule = {
      selectedFacility: facility?.organizationDetail,
      show: 'detail',
    };
    await setState((prevstate) => ({
      ...prevstate,
      facilityModule: newfacilityModule,
    }));
    //console.log(state)
    setShowModal(2);
  };

  const handleSearch = (val) => {
    const field = 'facilityName';
    console.log(val);
    if (val.length > 0) {
      orgServ
        .find({
          query: {
            /* [field]: {
                    $regex:val,
                    $options:'i'
                   
                }, */
            $search: val,
            $limit: 10,
            $sort: {
              createdAt: -1,
            },
          },
        })
        .then((res) => {
          console.log(res);
          setFacilities(res.data);
          setMessage(' Organization  fetched successfully');
          setSuccess(true);
        })
        .catch((err) => {
          console.log(err);
          setMessage('Error creating facility, probable network issues ' + err);
          setError(true);
        });
    } else {
      getFacilities();
    }
  };

  /*  if (val.length>2){
                console.log("in")
               
            }

        }
     */
  const getFacilities = () => {
    orgServ
      .find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          $limit: 100,
          $sort: {
            createdAt: -1,
          },
        },
      })
      .then((res) => {
        console.log(res);
        setFacilities(res.data);
        setMessage(' Organization  fetched successfully');
        setSuccess(true);
      })
      .catch((err) => {
        setMessage('Error creating facility, probable network issues ' + err);
        setError(true);
      });
  };

  useEffect(() => {
    getFacilities();

    orgServ.on('created', (obj) => getFacilities());
    orgServ.on('updated', (obj) => getFacilities());
    orgServ.on('patched', (obj) => getFacilities());
    orgServ.on('removed', (obj) => getFacilities());
    return () => {};
  }, []);
  const OrganizationClientSchema = [
    {
      name: 'S/N',
      key: 'sn',
      description: 'SN',
      selector: (row) => row.sn,
      sortable: true,
      inputType: 'HIDDEN',
    },
    {
      name: 'Organization',
      key: 'facilityName',
      description: 'Organization',
      selector: (row) => row?.organizationDetail?.facilityName,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Band',
      key: 'band',
      description: 'Band',
      selector: (row) => row.Band,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },

    {
      name: 'Address',
      key: 'facilityAddress',
      description: 'Address',
      selector: (row) => row?.organizationDetail?.facilityAddress,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },

    {
      name: 'City',
      key: 'facilityCity',
      description: 'City',
      selector: (row) => row?.organizationDetail?.facilityCity,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },

    {
      name: 'Phone',
      key: 'phone',
      description: 'Phone',
      selector: (row) => row?.organizationDetail?.facilityContactPhone,
      sortable: true,
      required: true,
      inputType: 'PHONE',
    },

    {
      name: 'Email',
      key: 'facilityEmail',
      description: 'simpa@gmail.com',
      selector: (row) => row?.organizationDetail?.facilityEmail,
      sortable: true,
      required: true,
      inputType: 'EMAIL',
    },

    {
      name: 'Type',
      key: 'facilityType',
      description: 'Facility Type',
      selector: (row) => row?.organizationDetail?.facilityType,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },

    {
      name: 'Category',
      key: 'facilityCategory',
      description: 'Category',
      selector: (row) => row?.organizationDetail?.facilityCategory,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
  ];

  return (
    <>
      {' '}
      {/* <OrganizationCreate /> */}
      <div className="level" style={{ padding: '1rem' }}>
        <PageWrapper
          style={{ flexDirection: 'column', padding: '0.6rem,1rem' }}
        >
          <TableMenu>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {handleSearch && (
                <div className="inner-table">
                  <FilterMenu onSearch={handleSearch} />
                </div>
              )}
              <h2 style={{ marginLeft: '10px', fontSize: '0.95rem' }}>
                List of Corporates
              </h2>
            </div>
            {handleCreateNew && (
              <Button
                style={{ fontSize: '14px', fontWeight: '600px' }}
                label="Add New"
                onClick={handleCreateNew}
              />
            )}
          </TableMenu>

          <CustomTable
            title={''}
            columns={OrganizationClientSchema}
            data={facilities}
            pointerOnHover
            highlightOnHover
            striped
            onRowClicked={handleRow}
            progressPending={loading}
          />
        </PageWrapper>
      </div>
    </>
  );
}

export function OrganizationDetail({ showModal, setShowModal }) {
  //const { register, handleSubmit, watch, setValue } = useForm(); //errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false); //,
  //const [success, setSuccess] =useState(false)
  // eslint-disable-next-line
  const [message, setMessage] = useState(''); //,
  //const facilityServ=client.service('/facility')
  //const navigate=useNavigate()
  const { user, setUser } = useContext(UserContext);
  const { state, setState } = useContext(ObjectContext);

  const facility = state.facilityModule.selectedFacility;

  console.log('Facility', facility);

  const handleEdit = async () => {
    const newfacilityModule = {
      selectedFacility: facility,
      show: 'modify',
    };
    await setState((prevstate) => ({
      ...prevstate,
      facilityModule: newfacilityModule,
    }));
    //console.log(state)
    setShowModal(3);
  };
  const closeForm = async () => {
    const newfacilityModule = {
      selectedFacility: facility,
      show: 'create',
    };
    await setState((prevstate) => ({
      ...prevstate,
      facilityModule: newfacilityModule,
    }));
    console.log('close form');
  };
  // const corporateSchema = [
  //   {
  //     name: 'S/N',
  //     key: 'sn',
  //     description: 'SN',
  //     selector: (row) => row.sn,
  //     sortable: true,
  //     inputType: 'HIDDEN',
  //   },
  //   {
  //     name: 'Name',
  //     key: 'facilityName',
  //     description: 'Organization Name',
  //     selector: (row) =>
  //       row.hasOwnProperty === 'organizationDetail'
  //         ? row.organizationDetail.facilityName
  //         : '',
  //     sortable: true,
  //     inputType: 'TEXT',
  //   },
  //   {
  //     name: 'Band',
  //     key: 'facilityBand',
  //     description: 'Band',
  //     selector: (row) =>
  //       row.hasOwnProperty === 'organizationDetail' ? row.Band : '',
  //     sortable: true,
  //     inputType: 'TEXT',
  //   },
  //   {
  //     name: 'Address',
  //     key: 'facilityAddress',
  //     description: 'Address',
  //     selector: (row) =>
  //       row.hasOwnProperty === 'organizationDetail'
  //         ? row.organizationDetail.facilityAddress
  //         : '',
  //     sortable: true,
  //     inputType: 'TEXT',
  //   },
  //   {
  //     name: 'City',
  //     key: 'facilityCity',
  //     description: 'City',
  //     selector: (row) =>
  //       row.hasOwnProperty === 'organizationDetail'
  //         ? row.organizationDetail.facilityCity
  //         : '',
  //     sortable: true,
  //     inputType: 'TEXT',
  //   },
  //   {
  //     name: 'Phone',
  //     key: 'facilityContactPhone',
  //     description: 'Phone',
  //     selector: (row) =>
  //       row.hasOwnProperty === 'organizationDetail'
  //         ? row.organizationDetail.facilityContactPhone
  //         : '',
  //     sortable: true,
  //     inputType: 'TEXT',
  //   },
  //   {
  //     name: 'Email',
  //     key: 'facilityEmail',
  //     description: 'Email',
  //     selector: (row) =>
  //       row.hasOwnProperty === 'organizationDetail'
  //         ? row.organizationDetail.facilityEmail
  //         : '',
  //     sortable: true,
  //     inputType: 'TEXT',
  //   },
  //   {
  //     name: 'Type',
  //     key: 'facilityType',
  //     description: 'Type',
  //     selector: (row) =>
  //       row.hasOwnProperty === 'organizationDetail'
  //         ? row.organizationDetail.facilityType
  //         : '',
  //     sortable: true,
  //     inputType: 'TEXT',
  //   },
  //   {
  //     name: 'Category',
  //     key: 'facilityCategory',
  //     description: 'Category',
  //     selector: (row) =>
  //       row.hasOwnProperty === 'organizationDetail'
  //         ? row.organizationDetail.facilityCategory
  //         : '',
  //     sortable: true,
  //     inputType: 'TEXT',
  //   },
  // ];

  return (
    <>
      <ModalHeader text={'Corporate Details'} />
      <div>
        <p style={{ margin: '1rem 0' }}>
          {' '}
          <FaHospital /> Name: {facility?.facilityName}
        </p>
        <p style={{ margin: '1rem 0' }}>
          {' '}
          <FaAddressCard /> Address: {facility?.facilityAddress}{' '}
        </p>
        <p style={{ margin: '1rem 0' }}>
          {' '}
          <IoLocationSharp /> City: {facility?.facilityCity}{' '}
        </p>
        <p style={{ margin: '1rem 0' }}>
          {' '}
          <BsFillTelephoneFill /> Phone: {facility?.facilityContactPhone}{' '}
        </p>
        <p style={{ margin: '1rem 0' }}>
          {' '}
          <MdEmail /> Email: {facility?.facilityEmail}{' '}
        </p>
        <p style={{ margin: '1rem 0' }}>
          {' '}
          <FaUserAlt /> CEO: {facility?.facilityOwner}{' '}
        </p>
        <p style={{ margin: '1rem 0' }}>
          {' '}
          <MdLocalHospital /> Type: {facility?.facilityType}{' '}
        </p>
        <p style={{ margin: '1rem 0' }}>
          {' '}
          <BsHouseDoorFill />
          Category: {facility?.facilityCategory}
        </p>
      </div>
      <div>
        {/* <CustomTable
          title={''}
          columns={corporateSchema}
          data={facility}
          pointerOnHover
          highlightOnHover
          striped
        /> */}
        <div style={{ display: 'flex' }}>
          <Button label="Edit" onClick={handleEdit} />
          <Button label="Close" onClick={closeForm} />
        </div>
      </div>
    </>
  );
}

export function OrganizationModify() {
  const { register, handleSubmit, setValue, reset } = useForm(); //watch, errors,
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const facilityServ = client.service('/facility');
  //const navigate=useNavigate()
  // eslint-disable-next-line
  const { user } = useContext(UserContext);
  const { state, setState } = useContext(ObjectContext);

  const facility = state.facilityModule.selectedFacility;

  useEffect(() => {
    setValue('facilityName', facility.facilityName, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('facilityAddress', facility.facilityAddress, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('facilityCity', facility.facilityCity, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('facilityContactPhone', facility.facilityContactPhone, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('facilityEmail', facility.facilityEmail, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('facilityOwner', facility.facilityOwner, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('facilityType', facility.facilityType, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('facilityCategory', facility.facilityCategory, {
      shouldValidate: true,
      shouldDirty: true,
    });

    return () => {};
  });

  const handleCancel = async () => {
    const newfacilityModule = {
      selectedFacility: {},
      show: 'create',
    };
    await setState((prevstate) => ({
      ...prevstate,
      facilityModule: newfacilityModule,
    }));
    //console.log(state)
  };

  const changeState = () => {
    const newfacilityModule = {
      selectedFacility: {},
      show: 'create',
    };
    setState((prevstate) => ({
      ...prevstate,
      facilityModule: newfacilityModule,
    }));
  };
  const handleDelete = async () => {
    let conf = window.confirm('Are you sure you want to delete this data?');

    const dleteId = facility._id;
    if (conf) {
      facilityServ
        .remove(dleteId)
        .then((res) => {
          //console.log(JSON.stringify(res))
          reset();
          setMessage('Deleted Organization successfully');
          setSuccess(true);
          changeState();
          setTimeout(() => {
            setSuccess(false);
          }, 200);
          changeState();
        })
        .catch((err) => {
          setMessage('Error deleting facility, probable network issues ' + err);
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 200);
        });
    }
  };

  /* ()=> setValue("firstName", "Bill", , {
            shouldValidate: true,
            shouldDirty: true
          })) */
  const onSubmit = (data, e) => {
    e.preventDefault();
    setMessage('');
    setError(false);
    setSuccess(false);
    console.log(data);
    //data.createdby=user._id
    //console.log(data);

    facilityServ
      .update(facility._id, data)
      .then((res) => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        setMessage('updated Organization successfully');
        toast.success('updated Organization successfully');
        setSuccess(true);
        changeState();
      })
      .catch((err) => {
        toast.error('Error updating facility, probable network issues ' + err);
        setMessage('Error creating facility, probable network issues ' + err);
        setError(true);
      });
  };

  return (
    <>
      <ModalHeader text={'Modify Corporate'} />
      {success && <div className="message"> {message}</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6}>
            <Input
              name="facilityName"
              label="Name"
              register={register('facilityName')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Input
              name="facilityAddress"
              label="Address"
              register={register('facilityAddress')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Input
              name="facilityCity"
              label="City"
              register={register('facilityCity')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Input
              name="facilityContactPhone"
              label="Phone"
              register={register('facilityContactPhone')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Input
              name="facilityEmail"
              label="Email"
              register={register('facilityEmail')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Input
              name="facilityOwner"
              label="CEO"
              register={register('facilityOwner')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Input
              name="facilityType"
              label="Type"
              register={register('facilityType')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Input
              name="facilityCategory"
              label="Category"
              register={register('facilityCategory')}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} style={{ display: 'flex' }}>
            <Button type="submit" label="Save" />
            <Button type="button" label="Cancel" onClick={handleCancel} />
            <Button type="button" label="Delete" onClick={handleDelete} />
          </Grid>
        </Grid>
        {error && <div className="message"> {message}</div>}
      </form>
    </>
  );
}
