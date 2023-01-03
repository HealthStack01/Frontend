import React, { useState, useContext, useEffect, useRef } from 'react';
import { Route, useNavigate, Link, NavLink } from 'react-router-dom';
import client from '../../feathers';
import { DebounceInput } from 'react-debounce-input';
import { useForm } from 'react-hook-form';
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from '../../context';
import { toast } from 'react-toastify';
import { formatDistanceToNowStrict, format, subDays, addDays } from 'date-fns';
import DatePicker from 'react-datepicker';
import LocationSearch from '../helpers/LocationSearch';
import EmployeeSearch from '../helpers/EmployeeSearch';
import BillServiceCreate from '../Finance/BillServiceCreate';
import 'react-datepicker/dist/react-datepicker.css';
import { PageWrapper } from '../../ui/styled/styles';
import { TableMenu } from '../../ui/styled/global';
import FilterMenu from '../../components/utilities/FilterMenu';
import Button from '../../components/buttons/Button';
import CustomTable from '../../components/customtable';
import Switch from '../../components/switch';
import { BsFillGridFill, BsList } from 'react-icons/bs';
import CalendarGrid from '../../components/calender';
import ModalBox from '../../components/modal';
import { Box, Grid, Button as MuiButton, TextField } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DebouncedInput from '../Appointment/ui-components/inputs/DebouncedInput';
import Input from '../../components/inputs/basic/Input/index';
import { MdCancel } from 'react-icons/md';
import { FacilitySearch } from '../helpers/FacilitySearch';
import { McText } from './text';
import CustomSelect from '../../components/inputs/basic/Select';
import BasicDatePicker from '../../components/inputs/Date';
import { FaHospital, FaAddressCard, FaUserAlt } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import { BsFillTelephoneFill, BsHouseDoorFill } from 'react-icons/bs';
import { MdEmail, MdLocalHospital } from 'react-icons/md';
import { FormsHeaderText } from '../../components/texts';
import GlobalCustomButton from '../../components/buttons/CustomButton';
import { G } from '@react-pdf/renderer';
import { Modal } from 'semantic-ui-react';
import {
  generalData,
  frontdeskData,
  casualityData,
  pharmacyData,
  laboratoryData,
  wardData,
  labourData,
  theatreData,
  additionalData,
  adminData,
  QualityData,
  otherData,
  staffData,
  nonMedStaff,
  specialistData,
} from './accData';

const searchfacility = {};

export default function Accreditation({ standAlone }) {
  const { state } = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail
  const [showModal, setShowModal] = useState(0);
  return (
    <>
      <section className="section remPadTop">
        {showModal === 0 && (
          <AccreditationList
            showModal={showModal}
            setShowModal={setShowModal}
            standAlone={standAlone}
          />
        )}
        {showModal === 1 && (
          <ModalBox open={showModal} onClose={() => setShowModal(0)}>
            {/* <OrganizationCreate /> */}
            {/* *********** Fix Error : OrganizationCreate is not defined ************ */}
          </ModalBox>
        )}

        {showModal === 2 && (
          <ModalBox open={showModal} onClose={() => setShowModal(0)}>
            <NewOrganizationCreate
              showModal={showModal}
              setShowModal={setShowModal}
            />
          </ModalBox>
        )}
      </section>
    </>
  );
}

export function AccreditationList({ showModal, setShowModal, standAlone }) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState('');
  const facilityServ = client.service('facility');
  const orgServ = client.service('organizationclient');
  //const history = useHistory()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedFacility, setSelectedFacility] = useState(); //
  // eslint-disable-next-line
  const { state, setState } = useContext(ObjectContext);
  const { user } = useContext(UserContext);
  const facility = state.facilityModule.selectedFacility;
  const handleCreateNew = async () => {
    const newfacilityModule = {
      selectedFacility: {},
      show: 'create',
    };
    await setState((prevstate) => ({
      ...prevstate,
      facilityModule: newfacilityModule,
    }));
    setShowModal(1);
  };
  const handleRow = async (facility) => {
    await setSelectedFacility(facility.organizationDetail);
    const newfacilityModule = {
      selectedFacility: facility,
      show: 'detail',
    };
    await setState((prevstate) => ({
      ...prevstate,
      facilityModule: newfacilityModule,
    }));
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
            facility: user.currentEmployee.facilityDetail._id,
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

  const providerSchema = [
    {
      name: 'S/N',
      key: 'sn',
      description: 'SN',
      selector: (row) => row.sn,
      sortable: true,
      inputType: 'HIDDEN',
      width: '50px',
    },
    {
      name: 'Organization Name',
      key: 'organizationName',
      description: 'Organization Name',
      selector: (row) =>
        row?.hasOwnProperty('organizationDetail') &&
        row?.organizationDetail?.facilityName,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },

    {
      name: 'Band',
      key: 'band',
      description: 'Band',
      selector: (row) => row?.hasOwnProperty('organizationDetail') && row?.band,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Address',
      key: 'address',
      description: 'Address',
      selector: (row) =>
        row?.hasOwnProperty('organizationDetail') &&
        row?.organizationDetail?.facilityAddress,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'City',
      key: 'city',
      description: 'City',
      selector: (row) =>
        row?.hasOwnProperty('organizationDetail') &&
        row?.organizationDetail.facilityCity,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },

    {
      name: 'Phone',
      key: 'phone',
      description: 'Phone',
      selector: (row) =>
        row?.hasOwnProperty('organizationDetail') &&
        row?.organizationDetail.facilityContactPhone,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Email',
      key: 'email',
      description: 'Email',
      selector: (row) =>
        row?.hasOwnProperty('organizationDetail') &&
        row?.organizationDetail.facilityEmail,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Type',
      key: 'type',
      description: 'Type',
      selector: (row) =>
        row?.hasOwnProperty('organizationDetail') &&
        row?.organizationDetail.facilityType,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Category',
      key: 'category',
      description: 'Category',
      selector: (row) =>
        row?.hasOwnProperty('organizationDetail') &&
        row?.organizationDetail.facilityCategory,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
  ];
  console.log('Facilities', facilities);
  return (
    <>
      {user ? (
        <>
          <div className="level">
            <PageWrapper
              style={{ flexDirection: 'column', padding: '0.6rem 1rem' }}
            >
              <TableMenu>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {handleSearch && (
                    <div className="inner-table">
                      <FilterMenu onSearch={handleSearch} />
                    </div>
                  )}
                </div>

                {/* <div>
                  <MuiButton
                    variant="contained"
                    sx={{
                      widh: 'fit',
                      textTransform: 'capitalize',
                      fontSize: '14px',
                      fontWeight: '600',
                    }}
                    onClick={handleCreateNew}
                  >
                    <AddCircleOutlineIcon
                      sx={{ marginRight: '5px' }}
                      fontSize="small"
                    />
                    Register Provider
                  </MuiButton>
                </div> */}
              </TableMenu>
              <CustomTable
                title={''}
                columns={providerSchema}
                data={
                  !standAlone
                    ? facilities.filter((item) => item.organizationDetail)
                    : facilities.filter(
                        (item) =>
                          item.organizationDetail && item._id === facility._id
                      )
                }
                pointerOnHover
                highlightOnHover
                striped
                onRowClicked={handleRow}
                //conditionalRowStyles={conditionalRowStyles}
              />
            </PageWrapper>
          </div>
        </>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}

export function NewOrganizationCreate({ showModal, setShowModal }) {
  const { register, handleSubmit, reset } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const facilityServ = client.service('facility');
  const orgServ = client.service('organizationclient');
  const { user, setUser } = useContext(UserContext);
  const { state, setState } = useContext(ObjectContext);
  const [loading, setLoading] = useState(false);
  const [chosen, setChosen] = useState('');
  const [band, setBand] = useState('');
  const BandsServ = client.service('bands');
  const [providerBand, setProviderBand] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showScore, setShowScore] = useState(0);
  const [showArray, setShowArray] = useState([]);
  const [nonMedDiv, setNonMedDiv] = useState([{ selectValue: '' }]);
  const [nonMedDiv2, setNonMedDiv2] = useState([{ selectValue: '' }]);
  const [nonMedDiv3, setNonMedDiv3] = useState([{ selectValue: '' }]);
  const [nonMedDiv4, setNonMedDiv4] = useState([{ selectValue: '' }]);
  const [nonMedDiv5, setNonMedDiv5] = useState([{ selectValue: '' }]);
  const [nonMedDiv6, setNonMedDiv6] = useState([{ selectValue: '' }]);
  const [nonMedDiv7, setNonMedDiv7] = useState([{ selectValue: '' }]);
  const [nonMedDiv8, setNonMedDiv8] = useState([{ selectValue: '' }]);
  const facility = state.facilityModule.selectedFacility;
  //const history = useHistory()

  const getProviderBand = async () => {
    if (user.currentEmployee) {
      const findServices = await BandsServ.find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          bandType:
            user.currentEmployee.facilityDetail.facilityType === 'HMO'
              ? 'Provider'
              : 'Company',
          $sort: {
            category: 1,
          },
        },
      });
      await setProviderBand(findServices.data);
    }
  };

  useEffect(() => {
    let facility = state.facilityModule.selectedFacility;
    //  setFacility(facility);

    const initFormValue = {
      nameofmd: facility?.accreditation[0]?.personalDetails?.mdName,
      mcdnNo: facility?.accreditation[0]?.personalDetails?.Mcdn,
      mdPhone: facility?.accreditation[0]?.personalDetails?.mdPhone,
      specialization:
        facility?.accreditation[0]?.personalDetails?.specialiazation,
      mdEmail: facility?.accreditation[0]?.personalDetails?.mdEmail,
      nameofChiefMatron:
        facility?.accreditation[0]?.personalDetails?.chiefMatron,
      chiefMatronPhone:
        facility?.accreditation[0]?.personalDetails?.chiefMatronPhone,
      nameofHmoOfficer: facility?.accreditation[0]?.personalDetails?.hmoOfficer,
      hmoOfficerPhone:
        facility?.accreditation[0]?.personalDetails?.hmoOfficerPhone,
      locScore: facility?.accreditation[0]?.generalOutlookDetails?.location,
      cleanScore: facility?.accreditation[0]?.generalOutlookDetails?.cleaniness,
      detachedScore:
        facility?.accreditation[0]?.generalOutlookDetails?.detachedPremise,
      parkingScore: facility?.accreditation[0]?.generalOutlookDetails?.Parking,
      exitScore:
        facility?.accreditation[0]?.generalOutlookDetails?.emergencyExit,
      signScore:
        facility?.accreditation[0]?.generalOutlookDetails?.directionalSign,
      commScore:
        facility?.accreditation[0]?.generalOutlookDetails?.communication,
      refuseScore: facility?.accreditation[0]?.generalOutlookDetails?.refuse,
      waterScore: facility?.accreditation[0]?.generalOutlookDetails?.water,
      securityScore:
        facility?.accreditation[0]?.generalOutlookDetails?.security,
      cateringScore:
        facility?.accreditation[0]?.generalOutlookDetails?.catering,
      laundryScore: facility?.accreditation[0]?.generalOutlookDetails?.laundry,
      fireScore:
        facility?.accreditation[0]?.generalOutlookDetails?.fireExtinguisher,
      ambulanceScore:
        facility?.accreditation[0]?.generalOutlookDetails?.ambulance,
    };
    reset(initFormValue);
  }, []);

  const handleClick = async (data) => {
    setLoading(true);
    const userId = state.facilityModule.selectedFacility._id;
    const accreditationDetails = {
      personalDetails: {
        mdName: data.nameofmd,
        Mcdn: data.mcdnNo,
        mdPhone: data.mdPhone,
        specialiazation: data.specialization,
        mdEmail: data.mdEmail,
        chiefMatron: data.nameofChiefMatron,
        chiefMatronPhone: data.chiefMatronPhone,
        hmoOfficer: data.nameofHmoOfficer,
        hmoOfficerPhone: data.hmoOfficerPhone,
      },
      generalOutlookDetails: {
        location: data.locScore,
        cleaniness: data.cleanScore,
        detachedPremise: data.detachedScore,
        Parking: data.parkingScore,
        emergencyExit: data.exitScore,
        directionalSign: data.signScore,
        communication: data.commScore,
        refuse: data.refuseScore,
        water: data.waterScore,
        security: data.securityScore,
        catering: data.cateringScore,
        laundry: data.laundryScore,
        fireExtinguisher: data.fireScore,
        ambulance: data.ambulanceScore,
      },
    };
    const allData = {
      facility: facility?.facilityDetail,
      organization: facility?.organizationDetail,
      relationshiptype: 'managedcare',
      band: facility?.band,
      accreditation: [accreditationDetails],
    };

    await orgServ
      .patch(userId, allData)
      .then((resp) => {
        setLoading(false);
        setShowModal(0);
        setState((prev) => ({
          ...prev,
          facilityModule: {
            ...prev.facilityModule,
            selectedFacility: resp,
          },
        }));
        toast.success("You've succesfully uploaded a document");
      })
      .catch((error) => {
        setLoading(false);
        setShowModal(0);
        toast.error(`An error occured whilst uploading Document ${error}`);
        console.error(error);
      });
  };

  useEffect(() => {
    getProviderBand();
    return () => {};
  }, []);

  const selectdata = [
    { value: 'test', label: 'test' },
    { value: 'test2', label: 'test2' },
  ];

  const generalOutlook = [
    { value: 1, label: '1. GENERAL OUTLOOK & INFRASTRUCTURE' },
    { value: 2, label: '2. OPD / FRONT DESK' },
    { value: 3, label: '3. CASUALTY AND EMERGENCY' },
    { value: 4, label: '4. PHARMACY' },
    { value: 5, label: '5. LABORATORY/ RADIOLOGICAL EQUIPMENTS' },
    { value: 6, label: '6. WARD' },
    { value: 7, label: '7. LABOUR ROOM' },
    { value: 8, label: '8. THEATRE' },
    { value: 9, label: '9. ADDITIONAL FACILITIES' },
    { value: 10, label: '10. ADMINISTRATION' },
    { value: 11, label: '11. QUALITY MANAGEMENT PROCESSES' },
    { value: 12, label: '12. OTHER PARAMETERS' },
    { value: 13, label: '13. MEDICAL PERSONNEL /STAFF' },
    { value: 14, label: '14. NON-MEDICAL STAFF' },
    { value: 15, label: '15. SPECIALISTS /FELLOWS' },
  ];

  const handleFormToDisplay = (number) => {
    switch (number) {
      case 1:
        setShowArray(generalData);
        break;
      case 2:
        setShowArray(frontdeskData);
        break;
      case 3:
        setShowArray(casualityData);
        break;
      case 4:
        setShowArray(pharmacyData);
        break;
      case 5:
        setShowArray(laboratoryData);
        break;
      case 6:
        setShowArray(wardData);
        break;
      case 7:
        setShowArray(labourData);
        break;
      case 8:
        setShowArray(theatreData);
        break;
      case 9:
        setShowArray(additionalData);
        break;
      case 10:
        setShowArray(adminData);
        break;
      case 11:
        setShowArray(QualityData);
        break;
      case 12:
        setShowArray(otherData);
        break;
      case 13:
        setShowArray(staffData);
        break;
      case 14:
        setShowArray(nonMedStaff);
        break;
      case 15:
        setShowArray(specialistData);
        break;
      default:
        setShowArray([]);
    }
  };
  console.log(facility);
  return (
    <>
      {currentPage === 1 && (
        <>
          <p style={{ fontWeight: '700' }}>
            HCI HEALTHCARE LIMITED ASSESSMENT / CREDENTIALLING FORM (NO..)
          </p>
          <p style={{ fontWeight: '700', marginBottom: '.5rem' }}>
            (PRIVATE SCHEME)
          </p>
          <McText txt={'PERSONAL DATA'} type={'p'} bold={700} />
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={12}>
              <Input
                label={'NAME OF MEDICAL DIRECTOR (MD)'}
                register={register('nameofmd')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input label={'MCDN NO'} register={register('mcdnNo')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input label={'MD PHONE NO'} register={register('mdPhone')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                label={'SPECIALIZATION'}
                register={register('specialization')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input label={'MD EMAIL'} register={register('mdEmail')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                label={'NAME OF CHIEF MATRON'}
                register={register('nameofChiefMatron')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input label={'TEL'} register={register('chiefMatronPhone')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                label={'NAME OF HMO OFFICER'}
                register={register('nameofHmoOfficer')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input label={'TEL'} register={register('hmoOfficerPhone')} />
            </Grid>
          </Grid>
          <Box display="flex" mt={1}>
            <GlobalCustomButton
              text={'Cancel'}
              onClick={() => setCurrentPage(0)}
              color="secondary"
              customStyles={{ marginRight: '.8rem' }}
            />
            <GlobalCustomButton
              text={'Next'}
              onClick={() => setCurrentPage(2)}
              color="primary"
            />
          </Box>
        </>
      )}
      {currentPage === 2 && (
        <>
          <div
            style={{
              height: '80vh',
              overflowY: 'scroll',
              width: '40vw',
              margin: '0 auto',
            }}
          >
            <p style={{ fontWeight: '700' }}>
              HCI HEALTHCARE LIMITED ASSESSMENT / CREDENTIALLING FORM (NO..)
            </p>
            <p style={{ fontWeight: '700', marginBottom: '2rem' }}>
              (PRIVATE SCHEME)
            </p>
            {generalOutlook
              .filter((item) => item.value <= 13)
              .map((item, index) => (
                <>
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      margin: '.5rem 0',
                    }}
                  >
                    <FormsHeaderText text={item.label} />
                    <GlobalCustomButton
                      text={'Add'}
                      onClick={() => {
                        setShowScore(index + 1);
                        handleFormToDisplay(item.value);
                      }}
                    />
                  </Box>
                  {showScore === item.value && (
                    <ModalBox open onClose={() => setShowScore(0)} header>
                      <Box
                        sx={{
                          width: '90vw',
                        }}
                      >
                        <Grid container spacing={2} mt={1}>
                          <Grid item xs={12} sm={4}>
                            <FormsHeaderText text="FINDINGS" />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <FormsHeaderText text="INSPECTION PARAMETERS " />
                          </Grid>
                          {/* <Grid
                            item
                            xs={12}
                            sm={2}
                            sx={{ textAlign: 'center' }}
                          >
                            <FormsHeaderText text="IF PRESENT, THICK" />
                          </Grid> */}
                          <Grid item xs={12} sm={2}>
                            <FormsHeaderText text="1 = Low, 5 = High" />
                          </Grid>
                        </Grid>
                        {showArray.map((item, index) => (
                          <>
                            <Grid container spacing={2} my={1} key={index}>
                              <Grid item xs={12} sm={4}>
                                <Input value={item.finding} disabled />
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <Input value={item.parameter} disabled />
                              </Grid>
                              {/* <Grid
                                item
                                xs={12}
                                sm={2}
                                sx={{ textAlign: 'center' }}
                              >
                                <input
                                  type="checkbox"
                                  // {...register(`${item.present}`)}
                                />
                              </Grid> */}
                              <Grid item xs={12} sm={2}>
                                <Input
                                  label={'Score'}
                                  register={register(`${item.name}`)}
                                />
                              </Grid>
                            </Grid>
                          </>
                        ))}
                        <GlobalCustomButton
                          text={'Save'}
                          onClick={() => {
                            setShowScore(0);
                            toast.success('Saved');
                          }}
                        />
                      </Box>
                    </ModalBox>
                  )}
                </>
              ))}
            <GlobalCustomButton
              text={'Back'}
              onClick={() => setCurrentPage(1)}
              color="secondary"
              customStyles={{ marginRight: '.8rem' }}
            />
            <GlobalCustomButton
              text={'Next'}
              onClick={() => setCurrentPage(3)}
            />
          </div>
        </>
      )}
      {currentPage === 3 && (
        <>
          <div
            style={{
              height: 'auto',
              overflowY: 'scroll',
              width: '40vw',
              margin: '0 auto',
            }}
          >
            <p style={{ fontWeight: '700' }}>
              HCI HEALTHCARE LIMITED ASSESSMENT / CREDENTIALLING FORM (NO..)
            </p>
            <p style={{ fontWeight: '700', marginBottom: '2rem' }}>
              (PRIVATE SCHEME)
            </p>

            {generalOutlook
              .filter((item) => item.value > 13)
              .map((item) => (
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      margin: '.5rem 0',
                    }}
                  >
                    <FormsHeaderText text={item.label} />
                    <GlobalCustomButton
                      text={'Add'}
                      onClick={() => {
                        setShowScore(item.value);
                        handleFormToDisplay(item.value);
                      }}
                    />
                  </Box>

                  {showScore === item.value && (
                    <ModalBox open onClose={() => setShowScore(0)} header>
                      <Box
                        sx={{
                          width: '90vw',
                        }}
                      >
                        <Grid container spacing={2} mt={1}>
                          <Grid item xs={12} sm={4}>
                            <FormsHeaderText text="FINDINGS" />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <FormsHeaderText text="INSPECTION PARAMETERS " />
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={2}
                            sx={{ textAlign: 'center' }}
                          >
                            <FormsHeaderText text="IF PRESENT, THICK" />
                          </Grid>
                          <Grid item xs={12} sm={2}>
                            <FormsHeaderText text="1 = Low, 5 = High" />
                          </Grid>
                        </Grid>
                        {showArray.map((item, index) => (
                          <>
                            <Grid container spacing={2} my={1} key={index}>
                              <Grid item xs={12} sm={4}>
                                <Input value={item.finding} disabled />
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <Input value={item.parameter} disabled />
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sm={2}
                                sx={{
                                  textAlign: 'center',
                                  display: 'flex',
                                  justifyContent: 'center',
                                }}
                              >
                                <Box sx={{ marginRight: '.8rem' }}>
                                  <input type="radio" />
                                  <label>Yes</label>
                                </Box>
                                <Box>
                                  <input type="radio" />
                                  <label>No</label>
                                </Box>
                              </Grid>
                              <Grid item xs={12} sm={2}>
                                <Input label={'Number'} />
                              </Grid>
                            </Grid>
                          </>
                        ))}

                        {/* -------------------------------------- */}
                        {showScore === 15 && (
                          <>
                            <Grid container spacing={3} mt={2}>
                              <Grid item xs={12} sm={6} md={12}>
                                <McText
                                  txt={'FOR OFFICIAL USE'}
                                  type={'p'}
                                  bold={700}
                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={3} my={1}>
                              <Grid item xs={12} sm={6} md={6}>
                                <Input
                                  label={'REVIEW OF CREDEINTIALS'}
                                  register={register('name')}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6} md={6} mt={1.5}>
                                <BasicDatePicker
                                  label={'DATE OF REVIEW'}
                                  register={register('date')}
                                />
                              </Grid>
                            </Grid>

                            <Grid container spacing={3} mb={1}>
                              <Grid item xs={12} sm={6} md={12}>
                                <McText
                                  txt={'RECOMMENDATION SUMMARY'}
                                  type={'p'}
                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                              <Grid item xs={12} sm={6} md={6}>
                                <Input
                                  label={'A APRROVE'}
                                  register={register('name')}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6} md={6}>
                                <Input
                                  label={'B. DENY OUTRIGHTLY'}
                                  register={register('name')}
                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                              <Grid item xs={12} sm={6} md={6}>
                                <McText
                                  txt={'C. GIVE PROBATION FOR'}
                                  type={'p'}
                                />
                                <CustomSelect
                                  options={selectdata}
                                  register={register('inspectionParameters')}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6} md={6} mt={1.5}>
                                <BasicDatePicker
                                  label={'DATE'}
                                  register={register('date')}
                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={3} mb={1}>
                              <Grid item xs={12} sm={6} md={6}>
                                <McText txt={'SIGNATURE'} type={'p'} />
                                <div
                                  style={{
                                    width: '100%',
                                    height: '40px',
                                    border: '1px solid #D2D2D2',
                                    borderRadius: '5px',
                                    padding: '.8rem',
                                  }}
                                ></div>
                              </Grid>
                            </Grid>
                          </>
                        )}
                        <GlobalCustomButton text={'Save'} onClick={() => {}} />
                      </Box>
                    </ModalBox>
                  )}
                </>
              ))}
            <GlobalCustomButton
              text={'Back'}
              onClick={() => setCurrentPage(2)}
              color={'secondary'}
              customStyles={{ marginRight: '.8rem' }}
            />
            <GlobalCustomButton
              text={'Next'}
              onClick={() => setCurrentPage(4)}
            />
          </div>
        </>
      )}
      {currentPage === 4 && (
        <>
          <div
            style={{
              height: '80vh',
              overflowY: 'scroll',
              width: '80vw',
              margin: '0 auto',
            }}
          >
            <p style={{ fontWeight: '700' }}>
              HCI HEALTHCARE LIMITED ASSESSMENT / CREDENTIALLING FORM (NO..)
            </p>
            <p style={{ fontWeight: '700', marginBottom: '2rem' }}>
              (PRIVATE SCHEME)
            </p>
            <McText
              txt={
                'GENERAL OBSERVATIONS BY HMO REPRESENTATIVE / ASSESSMENT OFFICER'
              }
              type={'p'}
              bold={700}
            />
            <Grid container spacing={3} mt={1}>
              <Grid item xs={12} sm={6} md={12}>
                <Input
                  label={'Observations'}
                  register={register('observations')}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <Input label={'Name'} register={register('name')} />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <Input
                  label={'Designation'}
                  register={register('designation')}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <Input label={'Date'} register={register('date')} />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input
                  label={'Provider Representative Name'}
                  register={register('name')}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input
                  label={'Designation'}
                  register={register('designation')}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <Input label={'Phone'} register={register('phone')} />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <BasicDatePicker label={'Date'} register={register('date')} />
              </Grid>
              <Grid item xs={12} sm={4} md={6}>
                <Input register={register('signature')} />
              </Grid>
            </Grid>
            <Grid container spacing={3} mt={1}>
              <Grid item xs={12} sm={4} md={12}>
                <McText txt={'FOR OFFICIAL USE'} type={'p'} bold={700} />
              </Grid>
            </Grid>
            <Grid container spacing={3} mt={1}>
              <Grid item xs={12} sm={4} md={12}>
                <Input
                  label={`Med. Officer's Review of Credentials`}
                  register={register('name')}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={6}>
                <Input
                  label={'Name of Reviewing Officer'}
                  register={register('name')}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={6}>
                <BasicDatePicker
                  label={'Date of Review'}
                  register={register('date')}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3} mt={1}>
              <Grid item xs={12} sm={4} md={12}>
                <McText txt={'RECOMMENDATION SUMMARY'} type={'p'} bold={700} />
              </Grid>
            </Grid>
            <Grid container spacing={3} mt={1}>
              <Grid item xs={12} sm={4} md={6}>
                <Input label={'A Approve'} register={register('name')} />
              </Grid>
              <Grid item xs={12} sm={4} md={6}>
                <Input
                  label={'B Deny Outrightly'}
                  register={register('name')}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={6}>
                <Input
                  label={'C Give Probation For'}
                  register={register('name')}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={6}>
                <BasicDatePicker label={'Date'} register={register('date')} />
              </Grid>
            </Grid>
            <Grid container spacing={3} my={1}>
              <Grid item xs={12} sm={4} md={6}>
                <McText txt={'Signature'} type={'p'} />
                <Input register={register('signature')} />
              </Grid>
            </Grid>
            <GlobalCustomButton
              text={'Cancel'}
              onClick={() => setCurrentPage(0)}
              color={'error'}
              customStyles={{ marginRight: '.8rem' }}
            />
            <GlobalCustomButton
              type={'submit'}
              text={'Submit'}
              onClick={handleSubmit(handleClick)}
              color={'primary'}
              disabled={loading}
            />
          </div>
        </>
      )}

      {/* <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={12}>
          <Button label="Add" type="submit" onClick={handleClick} />
        </Grid>
      </Grid> */}
    </>
  );
}
