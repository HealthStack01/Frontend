import { useEffect, useState, useCallback, useContext } from 'react';
import { Box } from '@mui/system';
import client from '../../feathers';
import { ObjectContext, UserContext } from '../../context';
import { Avatar, Grid, IconButton, Typography } from '@mui/material';
import Input from '../../components/inputs/basic/Input';
import { useForm } from 'react-hook-form';
import { FormsHeaderText } from '../../components/texts';
import CustomSelect from '../../components/inputs/basic/Select';
import GlobalCustomButton from '../../components/buttons/CustomButton';
import CustomTable from '../../components/customtable';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import ModalBox from '../../components/modal';
import Textarea from '../../components/inputs/basic/Textarea';
import CheckboxGroup from '../../components/inputs/basic/Checkbox/CheckBoxGroup';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { FileUploader } from 'react-drag-drop-files';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

import BankAccount from './BankAccount';
import axios from 'axios';
import { getBase64 } from '../helpers/getBase64';

const AdminOrganization = () => {
  const facilityServer = client.service('facility');
  const { register, reset, handleSubmit, control } = useForm();
  const { user, setUser } = useContext(UserContext);
  const { state, setState, showActionLoader, hideActionLoader } =
    useContext(ObjectContext);
  const [facility, setFacility] = useState({});
  const [edit, setEdit] = useState(false);
  const [logoAnchorEl, setLogoAnchorEl] = useState(null);
  const [modulesModal, setModulesModal] = useState(false);
  const [logoUploadModal, setLogoUploadModal] = useState(false);

  const navigate = useNavigate();

  const handleCloseLogoOptions = () => {
    setLogoAnchorEl(null);
  };

  const handleOpemLogoOptions = (event) => {
    setLogoAnchorEl(event.currentTarget);
  };

  //const {user}

  const getCurrentFacility = useCallback(async () => {
    showActionLoader();
    //console.log(user);
    const id = user.currentEmployee.facilityDetail._id;
    await facilityServer
      .get(id)
      .then((resp) => {
        //console.log(resp);
        hideActionLoader();
        setFacility(resp);
        reset(resp);
        //console.log(resp);
      })
      .catch((err) => {
        hideActionLoader();
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getCurrentFacility();

    facilityServer.on('created', (obj) => getCurrentFacility());
    facilityServer.on('updated', (obj) => getCurrentFacility());
    facilityServer.on('patched', (obj) => getCurrentFacility());
    facilityServer.on('removed', (obj) => getCurrentFacility());

    return () => {};
  }, [getCurrentFacility]);

  const navigateToEmployees = () => {
    navigate('/app/admin/employees');
  };

  const updateOrganization = async (data) => {
    showActionLoader();
    const employee = user.currentEmployee;
    const prevOrgDetail = user.currentEmployee.facilityDetail;
    //console.log(prevOrgDetail);

    const newOrgDetail = {
      ...prevOrgDetail,
      ...data,
      updatedAt: dayjs(),
      updatedBy: employee.userId,
      updatedByName: `${employee.firstname} ${employee.lastname}`,
    };

    //return console.log(newOrgDetail);

    const documentId = prevOrgDetail._id;

    await facilityServer
      .patch(documentId, { ...newOrgDetail })
      .then((resp) => {
        //console.log(resp);
        reset(resp);
        setFacility(resp);
        hideActionLoader();
        setUser((prev) => ({
          ...prev,
          currentEmployee: {
            ...prev.currentEmployee,
            facilityDetail: newOrgDetail,
          },
        }));
        setEdit(false);
        toast.success("You've succesfully updated your Organization Details");
      })
      .catch((error) => {
        toast.error(`Error Updating your oragnization Details ${error}`);
        hideActionLoader();
        console.error(error);
      });
  };

  const handleRow = (data) => {
    setState((prev) => ({
      ...prev,
      BankAccountModule: {
        ...prev.BankAccountModule,
        selectedBankAccount: data,
      },
    }));
    // setDetailModal(true);
  };

  return (
    <Box p={2}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        mb={1}
      >
        <Box>
          <IconButton onClick={handleOpemLogoOptions}>
            <Avatar sx={{ width: 68, height: 68 }} src={facility?.facilitylogo}>
              LOGO
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={logoAnchorEl}
            id="account-menu"
            open={Boolean(logoAnchorEl)}
            onClose={handleCloseLogoOptions}
            anchorOrigin={{ horizontal: 'right', vertical: 'center' }}
          >
            {/* <MenuItem>View Logo</MenuItem> */}
            <MenuItem>Remove Logo</MenuItem>
            <MenuItem
              onClick={() => {
                setLogoUploadModal(true);
                handleCloseLogoOptions();
              }}
            >
              Change Logo
            </MenuItem>
          </Menu>
        </Box>

        <Box sx={{ display: 'flex' }} gap={2}>
          <GlobalCustomButton
            color="secondary"
            onClick={() => setModulesModal(true)}
          >
            <AutoStoriesIcon sx={{ marginRight: '5px' }} fontSize="small" />
            Organization Modules
          </GlobalCustomButton>

          <GlobalCustomButton onClick={navigateToEmployees} color="info">
            <PeopleAltIcon sx={{ marginRight: '5px' }} fontSize="small" />{' '}
            Organization Employees
          </GlobalCustomButton>
        </Box>
      </Box>

      <Box mb={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <FormsHeaderText text="Organization Details" />

        <Box sx={{ display: 'flex' }} gap={2}>
          {!edit ? (
            <GlobalCustomButton onClick={() => setEdit(true)}>
              <EditIcon fontSize="small" />
              Edit Details
            </GlobalCustomButton>
          ) : (
            <>
              <GlobalCustomButton color="error" onClick={() => setEdit(false)}>
                <EditIcon fontSize="small" />
                Cancel Edit
              </GlobalCustomButton>

              <GlobalCustomButton
                color="success"
                onClick={handleSubmit(updateOrganization)}
              >
                <EditIcon fontSize="small" />
                Update Organaization
              </GlobalCustomButton>
            </>
          )}
        </Box>
      </Box>

      <Grid container spacing={2} mb={2}>
        <Grid item lg={4} md={6} sm={6} xs={12}>
          <Input
            register={register('facilityOwner')}
            label="Organization Owner"
            disabled={!edit}
          />
        </Grid>

        <Grid item lg={4} md={6} sm={6} xs={12}>
          <Input
            register={register('facilityName')}
            label="Organization Name"
            disabled={!edit}
          />
        </Grid>

        <Grid item lg={4} md={6} sm={6} xs={12}>
          <Input
            register={register('facilityContactPhone')}
            label="Phone Number"
            disabled={!edit}
          />
        </Grid>

        <Grid item lg={4} md={6} sm={6} xs={12}>
          <Input
            register={register('facilityEmail')}
            label="Email Address"
            disabled={!edit}
          />
        </Grid>

        <Grid item lg={4} md={6} sm={6} xs={12}>
          <CustomSelect
            control={control}
            name="facilityType"
            options={['Hospital']}
            label="Organization Type"
            disabled={!edit}
          />
        </Grid>

        <Grid item lg={4} md={6} sm={6} xs={12}>
          <CustomSelect
            control={control}
            name="facilityCategory"
            options={['Home']}
            label="Organization Category"
            disabled={!edit}
          />
        </Grid>

        <Grid item lg={8} md={8} sm={12} xs={12}>
          <Input
            register={register('facilityAddress')}
            label="Organization Address"
            disabled={!edit}
          />
        </Grid>

        <Grid item lg={4} md={6} sm={6} xs={12}>
          <Input
            register={register('facilityCity')}
            label="Organization City"
            disabled={!edit}
          />
        </Grid>

        <Grid item lg={4} md={6} sm={6} xs={12}>
          <Input
            register={register('facilityLGA')}
            label="Organization LGA"
            disabled={!edit}
          />
        </Grid>

        <Grid item lg={4} md={6} sm={6} xs={12}>
          <Input
            register={register('facilityState')}
            label="Organization State"
            disabled={!edit}
          />
        </Grid>

        <Grid item lg={4} md={6} sm={6} xs={12}>
          <Input
            register={register('facilityCountry')}
            label="Organization Country"
            disabled={!edit}
          />
        </Grid>
      </Grid>

      <Box>
        <BankAccount />
      </Box>

      <ModalBox
        open={modulesModal}
        onClose={() => setModulesModal(false)}
        header="Organization Modules"
      >
        <OrganizationModules closeModal={() => setModulesModal(false)} />
      </ModalBox>

      <ModalBox
        open={logoUploadModal}
        onClose={() => setLogoUploadModal(false)}
        header="Upload Organization Logo"
      >
        <OrganaizationLogoUpload closeModal={() => setLogoUploadModal(false)} />
      </ModalBox>
    </Box>
  );
};

export default AdminOrganization;

export const OrganizationModules = ({ closeModal }) => {
  const facilityServer = client.service('facility');
  const { control, reset, handleSubmit, setValue } = useForm();
  const { state, setState, showActionLoader, hideActionLoader } =
    useContext(ObjectContext);
  const { user, setUser } = useContext(UserContext);

  const modulelist = [
    'Accounting',
    'Admin',
    'Appointments',
    'Appt. Workflow',
    'Blood Bank',
    'Client',
    'Clinic',
    'Communication',
    'Complaints',
    'CRM',
    'Epidemiology',
    'Finance',
    'Immunization',
    'Inventory',
    'Laboratory',
    'Managed Care',
    'Market Place',
    'Patient Portal',
    'Pharmacy',
    'Radiology',
    'Referral',
    'Theatre',
    'Ward',
  ];

  useEffect(() => {
    //hideActionLoader();
    const prevModules =
      user.currentEmployee.facilityDetail.facilityModules || [];
    setValue('modules', prevModules);
  }, []);

  const updateModules = async (data) => {
    showActionLoader();
    const employee = user.currentEmployee;
    const prevOrgDetail = user.currentEmployee.facilityDetail;
    //console.log(prevOrgDetail);

    const newOrgDetail = {
      ...prevOrgDetail,
      updatedAt: dayjs(),
      updatedBy: employee.userId,
      updatedByName: `${employee.firstname} ${employee.lastname}`,
      facilityModules: data.modules,
    };

    //return console.log(newOrgDetail);

    const documentId = prevOrgDetail._id;

    await facilityServer
      .patch(documentId, { ...newOrgDetail })
      .then((resp) => {
        console.log(resp);
        hideActionLoader();
        setUser((prev) => ({
          ...prev,
          currentEmployee: {
            ...prev.currentEmployee,
            facilityDetail: newOrgDetail,
          },
        }));
        toast.success("You've succesfully updated your Organization Modules");
      })
      .catch((error) => {
        toast.error(`Error Updating your oragnization modules ${error}`);
        hideActionLoader();
        console.error(error);
      });
  };

  return (
    <Box sx={{ width: '60vw' }}>
      <Box>
        <CheckboxGroup
          name="modules"
          control={control}
          options={modulelist}
          row
        />
      </Box>

      <Box sx={{ display: 'flex' }} gap={2}>
        <GlobalCustomButton color="error" onClick={closeModal}>
          Cancel
        </GlobalCustomButton>

        <GlobalCustomButton onClick={handleSubmit(updateModules)}>
          Update Modules
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

const UploadComponent = ({}) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        border: '1px dashed gray',
        cursor: 'pointer',
        borderRadius: '7.5px',
      }}
    >
      <FileUploadOutlinedIcon />
      <Typography>Select Logo Image or Drag and Drop here</Typography>
    </Box>
  );
};

export const OrganaizationLogoUpload = ({ closeModal }) => {
  const facilityServer = client.service('facility');
  const { state, setState, showActionLoader, hideActionLoader } =
    useContext(ObjectContext);
  const { user, setUser } = useContext(UserContext);

  const [file, setFile] = useState('');

  const handleChange = (file) => {
    //console.log(file);
    //setFile(file);

    getBase64(file)
      .then((res) => {
        //console.log(res);
        setFile(res);
        //navigator.clipboard.writeText(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUploadLogo = async () => {
    showActionLoader();
    const token = localStorage.getItem('feathers-jwt');
    axios
      .post(
        'https://healthstack-backend.herokuapp.com/upload',
        { uri: file },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(async (res) => {
        //return console.log(res);
        const logoUrl = res.data.url;
        const employee = user.currentEmployee;
        const prevOrgDetail = user.currentEmployee.facilityDetail;
        //console.log(prevOrgDetail);

        const newOrgDetail = {
          ...prevOrgDetail,
          facilitylogo: logoUrl,
          updatedAt: dayjs(),
          updatedBy: employee.userId,
          updatedByName: `${employee.firstname} ${employee.lastname}`,
        };

        //return console.log(newOrgDetail);
        const documentId = prevOrgDetail._id;

        await facilityServer
          .patch(documentId, { ...newOrgDetail })
          .then((resp) => {
            hideActionLoader();
            setUser((prev) => ({
              ...prev,
              currentEmployee: {
                ...prev.currentEmployee,
                facilityDetail: newOrgDetail,
              },
            }));
            closeModal();
            toast.success("You've succesfully updated your Organization Logo");
          })
          .catch((error) => {
            hideActionLoader();
            toast.error(
              `An error occured whilst updating your Organization Logo ${error}`
            );
            console.error(error);
          });
      })
      .catch((error) => {
        hideActionLoader();
        toast.error(
          `An error occured whilst updating your Organization Logo ${error}`
        );
        console.log(error);
      });
  };

  return (
    <Box sx={{ width: '400px', maxHeight: '80vw' }}>
      {file ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={file}
            alt="logo"
            style={{ width: '200px', height: 'auto', display: 'block' }}
          />
        </Box>
      ) : (
        <FileUploader
          multiple={false}
          handleChange={handleChange}
          name="upload"
          types={['jpeg', 'png', 'jpg']}
          children={<UploadComponent />}
        />
      )}

      <Box sx={{ display: 'flex' }} gap={2} mt={2}>
        <GlobalCustomButton color="error" onClick={closeModal}>
          Cancel
        </GlobalCustomButton>

        <GlobalCustomButton onClick={handleUploadLogo}>
          Upload Logo
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};
