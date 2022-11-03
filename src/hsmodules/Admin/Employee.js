/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from 'react';
import client from '../../feathers';
import { DebounceInput } from 'react-debounce-input';
import { useForm } from 'react-hook-form';
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from '../../context';
import ModuleList from './ModuleList';
import { toast } from 'bulma-toast';
import * as yup from 'yup';
import { PageWrapper } from '../../ui/styled/styles';
import { TableMenu } from '../../ui/styled/global';
import FilterMenu from '../../components/utilities/FilterMenu';
import Button from '../../components/buttons/Button';
import CustomTable from '../../components/customtable';
import Input from './ui-components/inputs/basic/Input';
import Grid from '@mui/system/Unstable_Grid/Grid';
import 'react-datepicker/dist/react-datepicker.css';
import ModalBox from '../../components/modal';
import { BottomWrapper, GridWrapper } from '../app/styles';
// eslint-disable-next-line
const searchfacility = {};

export default function Employee() {
  const { state } = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [createModal, setCreateModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [modifyModal, setModifyModal] = useState(false);

  //const [showState,setShowState]=useState() //create|modify|detail

  const handleShowDetailModal = () => {
    setDetailModal(true);
  };

  const handleHideDetailModal = () => {
    setDetailModal(false);
  };
  const handleCreateModal = () => {
    setCreateModal(true);
  };

  const handleHideCreateModal = () => {
    setCreateModal(false);
  };
  const handleModifyModal = () => {
    setModifyModal(true);
  };

  const handleHideModifyModal = () => {
    setModifyModal(false);
  };

  return (
    <>
      <ModalBox open={createModal} onClose={handleHideCreateModal} width='100%'>
        <EmployeeCreate />
      </ModalBox>

      <ModalBox open={detailModal} onClose={handleHideDetailModal}>
        <div style={{ width: '60vw' }}>
          <EmployeeDetail showModifyModal={handleModifyModal} />
        </div>
      </ModalBox>

      <ModalBox open={modifyModal} onClose={handleHideModifyModal}>
        <EmployeeModify />
      </ModalBox>
      <section className='section remPadTop'>
        {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">Employee  Module</span></div>
            </div> */}
        <div className='columns '>
          <div className='column is-8 '>
            <EmployeeList
              showCreateModal={handleCreateModal}
              showDetailModal={handleShowDetailModal}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export function EmployeeCreate() {
  const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const EmployeeServ = client.service('employee');
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();

  const getSearchfacility = obj => {
    setValue('facility', obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeEmployee.FacilityId)//
    if (!user.stacker) {
      setValue('facility', user.currentEmployee.facilityDetail._id, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [user]);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setMessage('');
    setError(false);
    setSuccess(false);
    data.createdby = user._id;
    if (user.currentEmployee) {
    }

    setLoading(true);
    await sEmployeeServ
      .create(data)
      .then(res => {
        e.target.reset();
        setSuccess(true);
        toast({
          message: 'Employee created succesfully',
          type: 'is-success',
          dismissible: true,
          pauseOnHover: true,
        });

        setSuccess(false);
      })
      .catch(err => {
        toast({
          message: 'Error creating employee ' + err,
          type: 'is-danger',
          dismissible: true,
          pauseOnHover: true,
        });
      });

    setLoading(false);
  };

  return (
    <>
      <p className='card-header-title'>Create Employee</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('firstname', { required: true })}
          name='firstname'
          type='text'
          placeholder='First Name'
        />
        <Input
          {...register('lastname', { required: true })}
          name='lastname'
          type='text'
          placeholder='Last Name'
        />
        <Input
          {...register('profession', { required: true })}
          name='profession'
          type='text'
          placeholder='Profession'
        />
        <Input
          {...register('phone', { required: true })}
          name='phone'
          type='text'
          placeholder='Phone No'
        />
        <Input
          {...register('email', { required: true })}
          name='email'
          type='text'
          placeholder='Email'
        />
        <div className='field' style={user.stacker ? { display: 'none' } : {}}>
          <InputSearch getSearchfacility={getSearchfacility} clear={success} />
          <p className='control has-icons-left ' style={{ display: 'none' }}>
            <Input
              {...register('facility', { required: true })}
              name='facility'
              type='text'
              placeholder='Facility'
            />
          </p>
        </div>
        <Input
          {...register('department', { required: true })}
          name='department'
          type='text'
          placeholder='Department'
        />
        <Input
          {...register('depunit', { required: true })}
          name='depunit'
          type='text'
          placeholder='Department Unit'
        />
        <Input
          {...register('password', { required: true })}
          name='password'
          type='text'
          placeholder='Password'
        />

        <BottomWrapper>
          <Button type='submit'>Create</Button>
        </BottomWrapper>
      </form>
    </>
  );
}

export function EmployeeList({ showCreateModal, showDetailModal }) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState('');
  const EmployeeServ = client.service('employee');
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [selectedEmployee, setSelectedEmployee] = useState(); //
  // eslint-disable-next-line
  const { state, setState } = useContext(ObjectContext);
  // eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);

  const handleCreateNew = async () => {
    const newEmployeeModule = {
      selectedEmployee: {},
      show: 'create',
    };
    await setState(prevstate => ({
      ...prevstate,
      EmployeeModule: newEmployeeModule,
    }));
    //console.log(state)
  };
  const handleRow = async Employee => {
    //console.log("b4",state)

    //console.log("handlerow",Employee)

    await setSelectedEmployee(Employee);

    const newEmployeeModule = {
      selectedEmployee: Employee,
      show: 'detail',
    };
    await setState(prevstate => ({
      ...prevstate,
      EmployeeModule: newEmployeeModule,
    }));
    //console.log(state)
    showDetailModal();
  };

  const handleSearch = val => {
    const field = 'firstname';
    console.log(val);
    EmployeeServ.find({
      query: {
        [field]: {
          $regex: val,
          $options: 'i',
        },
        facility: user.currentEmployee.facilityDetail._id || '',
        $limit: 1000,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then(res => {
        console.log(res);
        setFacilities(res.data);
        setMessage(' Employee  fetched successfully');
        setSuccess(true);
      })
      .catch(err => {
        console.log(err);
        setMessage('Error fetching Employee, probable network issues ' + err);
        setError(true);
      });
  };

  const getFacilities = async () => {
    if (user.currentEmployee) {
      const findEmployee = await EmployeeServ.find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          $limit: 200,
          $sort: {
            createdAt: -1,
          },
        },
      });

      await setFacilities(findEmployee.data);
      console.log('facilities', facilities);
    } else {
      if (user.stacker) {
        const findEmployee = await EmployeeServ.find({
          query: {
            $limit: 100,
            $sort: {
              facility: -1,
            },
          },
        });

        await setFacilities(findEmployee.data);
      }
    }
  };

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    if (user) {
      getFacilities();
    } else {
      /* const localUser= localStorage.getItem("user")
                    const user1=JSON.parse(localUser)
                    console.log(localUser)
                    console.log(user1)
                    fetchUser(user1)
                    console.log(user)
                    getFacilities(user) */
    }
    EmployeeServ.on('created', obj => getFacilities());
    EmployeeServ.on('updated', obj => getFacilities());
    EmployeeServ.on('patched', obj => {
      getFacilities();

      //console.log(facilities.filter(el=>(el._id=selectedEmployee._id)))
    });
    EmployeeServ.on('removed', obj => getFacilities());
    return () => {};
  }, []);

  //todo: pagination and vertical scroll bar

  const getEmployeeSchema = [
    {
      name: 'S/N',
      key: 'sn',
      description: 'Enter name of employee',
      selector: row => row.sn,
      sortable: true,
      inputType: 'HIDDEN',
    },
    {
      name: 'Firstname',
      key: 'firstname',
      description: 'Enter firstname',
      selector: row => row.firstname,
      sortable: true,
      required: true,
      inputType: 'TEXT',
      validator: yup.string().required('Enter your Firstname'),
    },
    {
      name: 'Last Name',
      key: 'lastname',
      description: 'Enter lastname',
      selector: row => row.lastname,
      sortable: true,
      required: true,
      inputType: 'TEXT',
      validator: yup.string().required('Enter your Lastname'),
    },
    {
      name: 'Profession',
      key: 'profession',
      description: 'Enter profession',
      selector: row => row.profession,
      sortable: true,
      required: true,
      inputType: 'TEXT',
      validator: yup.string().required('Enter your Profession'),
    },
    {
      name: 'Phone number',
      key: 'phone',
      description: 'Enter phone number',
      selector: row => row.phone,
      sortable: true,
      required: true,
      inputType: 'TEXT',
      validator: yup.string().required('Enter your Phone number'),
    },
    {
      name: 'Email',
      key: 'email',
      description: 'Enter Email',
      selector: row => row.email,
      sortable: true,
      required: true,
      inputType: 'TEXT',
      validator: yup.string().required('Enter your valid Email'),
    },
    {
      name: 'Facility',
      key: 'facility',
      description: 'Select facility',
      selector: row => row.department,
      sortable: true,
      required: true,
      inputType: 'HIDDEN',
      //   defaultValue: facilityId,
      validator: yup.string().required('Facility not available'),
    },
    {
      name: 'Department',
      key: 'department',
      description: 'Enter department',
      selector: row => row.department,
      sortable: true,
      required: true,
      inputType: 'TEXT',
      validator: yup.string().required('Enter your Department'),
    },
    {
      name: 'Department Unit',
      key: 'deptunit',
      description: 'Enter department',
      selector: row => row.deptunit,
      sortable: true,
      required: true,
      inputType: 'TEXT',
      validator: yup.string().required('Enter your Departmental Unit'),
    },
  ];

  return (
    <>
      {user ? (
        <>
          <PageWrapper
            style={{ flexDirection: 'column', padding: '0.6rem 1rem' }}
          >
            <TableMenu>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {handleSearch && (
                  <div className='inner-table'>
                    <FilterMenu onSearch={handleSearch} />
                  </div>
                )}
                <h2 style={{ marginLeft: '10px', fontSize: '0.95rem' }}>
                  List of Employees
                </h2>
              </div>

              {handleCreateNew && (
                <Button
                  style={{ fontSize: '14px', fontWeight: '600' }}
                  label='Add new '
                  onClick={showCreateModal}
                />
              )}
            </TableMenu>

            <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
              <CustomTable
                title={''}
                columns={getEmployeeSchema}
                data={facilities}
                pointerOnHover
                highlightOnHover
                striped
                onRowClicked={handleRow}
                progressPending={loading}
              />
            </div>
          </PageWrapper>
        </>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}

export function EmployeeDetail({ showModifyModal }) {
  //const { register, handleSubmit, watch, setValue } = useForm(); //errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false); //,
  //const [success, setSuccess] =useState(false)
  // eslint-disable-next-line
  const [message, setMessage] = useState(''); //,
  //const EmployeeServ=client.service('/Employee')
  //const navigate=useNavigate()
  //const {user,setUser} = useContext(UserContext)
  const { state, setState } = useContext(ObjectContext);
  const [showRoles, setShowRoles] = useState('');

  const Employee = state.EmployeeModule.selectedEmployee;

  const handleEdit = async () => {
    const newEmployeeModule = {
      selectedEmployee: Employee,
      show: 'modify',
    };
    await setState(prevstate => ({
      ...prevstate,
      EmployeeModule: newEmployeeModule,
    }));
    //console.log(state)
    showModifyModal();
  };
  const handleRoles = () => {
    setShowRoles(true);
  };
  const handlecloseModal = () => {
    setShowRoles(false);
  };

  return (
    <>
      <div className='card '>
        <div className='card-header'>
          <p className='card-header-title' style={{ fontWeight: 'bold' }}>
            Employee Details
          </p>
        </div>

        <div className='card-content vscrollable'>
          <Grid container spacing={2} mt={4}>
            <Grid item xs={12} sm={3} md={4}>
              <span
                style={{
                  color: ' #0364FF',
                  fontSize: '20px',
                  marginRight: '.8rem',
                }}
              >
                Name:
              </span>
              <span
                className='is-size-7 padleft'
                name='name'
                style={{ fontWeight: 'lighter', fontSize: '20px' }}
              >
                {' '}
                {Employee?.firstname}{' '}
              </span>
            </Grid>
            <Grid item xs={12} sm={3} md={4}>
              <span
                style={{
                  color: ' #0364FF',
                  fontSize: '20px',
                  marginRight: '.8rem',
                }}
              >
                Last Name:
              </span>
              <span style={{ color: ' #000000', fontSize: '20px' }}>
                {Employee?.lastname}
              </span>
            </Grid>
            <Grid item xs={12} sm={3} md={4}>
              <span
                style={{
                  color: ' #0364FF',
                  fontSize: '20px',
                  marginRight: '.8rem',
                }}
              >
                Profession:
              </span>
              <span style={{ color: ' #000000', fontSize: '20px' }}>
                {Employee?.profession}
              </span>
            </Grid>
            <Grid item xs={12} sm={3} md={4}>
              <span
                style={{
                  color: ' #0364FF',
                  fontSize: '20px',
                  marginRight: '.8rem',
                }}
              >
                Phone:
              </span>
              <span style={{ color: ' #000000', fontSize: '20px' }}>
                {Employee?.phone}
              </span>
            </Grid>
            <Grid item xs={12} sm={3} md={4}>
              <span
                style={{
                  color: ' #0364FF',
                  fontSize: '20px',
                  marginRight: '.8rem',
                }}
              >
                Email:
              </span>
              <span style={{ color: ' #000000', fontSize: '20px' }}>
                {Employee?.email}
              </span>
            </Grid>
            <Grid item xs={12} sm={3} md={4}>
              <span
                style={{
                  color: ' #0364FF',
                  fontSize: '20px',
                  marginRight: '.8rem',
                }}
              >
                Department:
              </span>
              <span style={{ color: ' #000000', fontSize: '20px' }}>
                {Employee?.department}
              </span>
            </Grid>
            <Grid item xs={12} sm={3} md={4}>
              <span
                style={{
                  color: ' #0364FF',
                  fontSize: '20px',
                  marginRight: '.8rem',
                }}
              >
                Department Unit:
              </span>
              <span style={{ color: ' #000000', fontSize: '20px' }}>
                {Employee?.deptunit}
              </span>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={4}>
            <Grid item xs={12} sm={3} md={4}>
              <Button
                type='submit'
                onClick={handleEdit}
                style={{
                  backgroundColor: '#17935C',
                  width: '100px',
                  fontSize: '18px',
                  cursor: 'pointer',
                }}
              >
                Edit
              </Button>
            </Grid>
            <Grid item xs={12} sm={3} md={3}>
              <Button
                type='submit'
                onClick={handleRoles}
                style={{
                  backgroundColor: '#0364FF',
                  width: '100px',
                  fontSize: '18px',
                  cursor: 'pointer',
                }}
              >
                Set Roles
              </Button>
            </Grid>
          </Grid>
          {error && <div className='message'> {message}</div>}
        </div>
      </div>
      <ModalBox
        open={showRoles}
        onClose={handlecloseModal}
        header='Employee Roles'
      >
        <ModuleList handlecloseModal={handlecloseModal} />
      </ModalBox>
    </>
  );
}

export function EmployeeModify() {
  const { register, handleSubmit, setValue, reset, errors } = useForm(); //watch, errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState('');
  // eslint-disable-next-line
  const EmployeeServ = client.service('employee');
  //const navigate=useNavigate()
  // eslint-disable-next-line
  const { user } = useContext(UserContext);
  const { state, setState } = useContext(ObjectContext);

  const Employee = state.EmployeeModule.selectedEmployee;

  useEffect(() => {
    setValue('firstname', Employee.firstname, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('lastname', Employee.lastname, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('profession', Employee.profession, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('phone', Employee.phone, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('email', Employee.email, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('department', Employee.department, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('deptunit', Employee.deptunit, {
      shouldValidate: true,
      shouldDirty: true,
    });
    /*   setValue("EmployeeCategory", Employee.EmployeeCategory,  {
                shouldValidate: true,
                shouldDirty: true
            }) */

    return () => {};
  });

  const handleCancel = async () => {
    const newEmployeeModule = {
      selectedEmployee: {},
      show: 'create',
    };
    await setState(prevstate => ({
      ...prevstate,
      EmployeeModule: newEmployeeModule,
    }));
    //console.log(state)
  };

  const changeState = () => {
    const newEmployeeModule = {
      selectedEmployee: {},
      show: 'create',
    };
    setState(prevstate => ({
      ...prevstate,
      EmployeeModule: newEmployeeModule,
    }));
  };
  const handleDelete = async () => {
    let conf = window.confirm('Are you sure you want to delete this data?');

    const dleteId = Employee._id;
    if (conf) {
      EmployeeServ.remove(dleteId)
        .then(res => {
          //console.log(JSON.stringify(res))
          reset();
          /*  setMessage("Deleted Employee successfully")
                setSuccess(true)
                changeState()
               setTimeout(() => {
                setSuccess(false)
                }, 200); */
          toast({
            message: 'Employee deleted succesfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
          });
          changeState();
        })
        .catch(err => {
          // setMessage("Error deleting Employee, probable network issues "+ err )
          // setError(true)
          toast({
            message:
              'Error deleting Employee, probable network issues or ' + err,
            type: 'is-danger',
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
  const onSubmit = (data, e) => {
    e.preventDefault();

    setSuccess(false);
    console.log(data);
    data.facility = Employee.facility;
    //console.log(data);

    EmployeeServ.patch(Employee._id, data)
      .then(res => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        // setMessage("updated Employee successfully")
        toast({
          message: 'Employee updated succesfully',
          type: 'is-success',
          dismissible: true,
          pauseOnHover: true,
        });

        changeState();
      })
      .catch(err => {
        //setMessage("Error creating Employee, probable network issues "+ err )
        // setError(true)
        toast({
          message: 'Error updating Employee, probable network issues or ' + err,
          type: 'is-danger',
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  return (
    <>
      <div className='card '>
        <div className='card-header'>
          <p className='card-header-title'>Employee Details-Modify</p>
        </div>
        <div className='card-content vscrollable'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              style={{
                width: '50px',
              }}
              {...register('firstname', { required: true })}
              name='firstname'
              type='text'
              placeholder='First Name'
            />

            <Input
              style={{
                width: '50px',
              }}
              {...register('lastname', { required: true })}
              name='lastname'
              type='text'
              placeholder='Last Name'
            />

            <Input
              style={{
                width: '50px',
              }}
              {...register('profession', { required: true })}
              name='profession'
              type='text'
              placeholder='Profession'
            />

            <Input
              style={{
                width: '50px',
              }}
              {...register('phone', { required: true })}
              name='phone'
              type='text'
              placeholder='Phone No'
            />
            <Input
              style={{
                width: '50px',
              }}
              {...register('email', { required: true })}
              name='email'
              type='text'
              placeholder='Email'
            />
            <Input
              style={{
                width: '50px',
              }}
              {...register('department', { required: true })}
              name='department'
              type='text'
              placeholder='Department'
            />
            {errors && errors.department && <span>This field is required</span>}
            <Input
              style={{
                width: '50px',
              }}
              {...register('depunit', { required: true })}
              name='depunit'
              type='text'
              placeholder='Department'
            />
          </form>
          <div className='block'>
            <div style={{ display: 'flex' }}>
              <Button
                type='submit'
                onClick={handleSubmit(onSubmit)}
                style={{
                  backgroundColor: '#48c774',
                  width: '100px',
                  position: 'relative',
                  cursor: 'pointer',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                Save
              </Button>

              <Button
                type='submit'
                onClick={handleDelete}
                style={{
                  backgroundColor: '#f14668',
                  width: '100px',
                  position: 'relative',
                  cursor: 'pointer',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function InputSearch({ getSearchfacility, clear }) {
  const facilityServ = client.service('facility');
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [searchError, setSearchError] = useState(false);
  // eslint-disable-next-line
  const [showPanel, setShowPanel] = useState(false);
  // eslint-disable-next-line
  const [searchMessage, setSearchMessage] = useState('');
  // eslint-disable-next-line
  const [simpa, setSimpa] = useState('');
  // eslint-disable-next-line
  const [chosen, setChosen] = useState(false);
  // eslint-disable-next-line
  const [count, setCount] = useState(0);
  const inputEl = useRef(null);

  const handleRow = async obj => {
    await setChosen(true);
    //alert("something is chaning")
    getSearchfacility(obj);

    await setSimpa(obj.facilityName);

    // setSelectedFacility(obj)
    setShowPanel(false);
    await setCount(2);
    /* const    newfacilityModule={
            selectedFacility:facility,
            show :'detail'
        }
   await setState((prevstate)=>({...prevstate, facilityModule:newfacilityModule})) */
    //console.log(state)
  };
  const handleBlur = async e => {
    if (count === 2) {
      console.log('stuff was chosen');
    }

    /*  console.log("blur")
         setShowPanel(false)
        console.log(JSON.stringify(simpa))
        if (simpa===""){
            console.log(facilities.length)
            setSimpa("abc")
            setSimpa("")
            setFacilities([])
            inputEl.current.setValue=""
        }
        console.log(facilities.length)
        console.log(inputEl.current) */
  };
  const handleSearch = async val => {
    const field = 'facilityName'; //field variable

    if (val.length >= 3) {
      facilityServ
        .find({
          query: {
            //service
            [field]: {
              $regex: val,
              $options: 'i',
            },
            $limit: 10,
            $sort: {
              createdAt: -1,
            },
          },
        })
        .then(res => {
          console.log('facility  fetched successfully');
          setFacilities(res.data);
          setSearchMessage(' facility  fetched successfully');
          setShowPanel(true);
        })
        .catch(err => {
          console.log(err);
          setSearchMessage(
            'Error searching facility, probable network issues ' + err
          );
          setSearchError(true);
        });
    } else {
      console.log('less than 3 ');
      console.log(val);
      setShowPanel(false);
      await setFacilities([]);
      console.log(facilities);
    }
  };
  useEffect(() => {
    if (clear) {
      setSimpa('');
    }
    return () => {};
  }, [clear]);
  return (
    <div>
      <div className='field'>
        <div className='control has-icons-left  '>
          <div className={`dropdown ${showPanel ? 'is-active' : ''}`}>
            <div className='dropdown-trigger'>
              <DebounceInput
                className='input is-small '
                type='text'
                placeholder='Search Facilities'
                value={simpa}
                minLength={1}
                debounceTimeout={400}
                onBlur={e => handleBlur(e)}
                onChange={e => handleSearch(e.target.value)}
                inputRef={inputEl}
              />
              <span className='icon is-small is-left'>
                <i className='fas fa-search'></i>
              </span>
            </div>
            {searchError && <div>{searchMessage}</div>}
            <div className='dropdown-menu'>
              <div className='dropdown-content'>
                {facilities.map((facility, i) => (
                  <div
                    className='dropdown-item'
                    key={facility._id}
                    onClick={() => handleRow(facility)}
                  >
                    <span>{facility.facilityName}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
