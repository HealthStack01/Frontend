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
import Textarea from '../../components/inputs/basic/Textarea';
import MuiCustomDatePicker from '../../components/inputs/Date/MuiDatePicker';

const searchfacility = {};

export default function Accreditation({ standAlone }) {
  const { state } = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail
  const [showModal, setShowModal] = useState(0);
  const [selectedAccr, setSelectedAccr] = useState([]);
  return (
    <>
      <section className="section remPadTop">
        {showModal === 0 && (
          <AccreditationList
            showModal={showModal}
            setShowModal={setShowModal}
            standAlone={standAlone}
            selectedAccr={setSelectedAccr}
          />
        )}
        {showModal === 1 && (
          <NewOrganizationCreate
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}

        {showModal === 2 && (
          <NewOrganizationView
            showModal={showModal}
            setShowModal={setShowModal}
            selectedAccr={selectedAccr}
          />
        )}
      </section>
    </>
  );
}

export function AccreditationList({
  showModal,
  setShowModal,
  standAlone,
  selectedAccr,
}) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState('');
  const facilityServ = client.service('facility');
  const orgServ = client.service('organizationclient');
  const accreditationServ = client.service('accreditation');
  //const history = useHistory()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedFacility, setSelectedFacility] = useState(); //
  // eslint-disable-next-line
  const { state, setState } = useContext(ObjectContext);
  const { user } = useContext(UserContext);
  const [accreditation, setAccreditation] = useState([]);
  const facility = state.facilityModule.selectedFacility;
  const handleCreateNew = async () => {
    // const newfacilityModule = {
    //   selectedAccr: {},
    //   show: 'create',
    // };
    // await setState((prevstate) => ({
    //   ...prevstate,
    //   accreditationModule: newfacilityModule,
    // }));
    setShowModal(1);
  };
  const handleRow = async (facility) => {
    setShowModal(2);
    selectedAccr(facility);
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
    accreditationServ
      .find({
        query: {
          // createdby: user.currentEmployee.facilityDetail._id,
          $limit: 100,
          $sort: {
            createdAt: -1,
          },
        },
      })
      .then((res) => {
        console.log(res);
        setAccreditation(res.data);
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
      selector: (row) => row?.facilityname,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Assessment Name',
      key: 'assessmentName',
      description: 'Assessment Name',
      selector: (row) => row?.assessmentName,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },

    // {
    //   name: 'Band',
    //   key: 'band',
    //   description: 'Band',
    //   selector: (row) => row?.hasOwnProperty('organizationDetail') && row?.band,
    //   sortable: true,
    //   required: true,
    //   inputType: 'TEXT',
    // },
    // {
    //   name: 'Address',
    //   key: 'address',
    //   description: 'Address',
    //   selector: (row) =>
    //     row?.hasOwnProperty('organizationDetail') &&
    //     row?.organizationDetail?.facilityAddress,
    //   sortable: true,
    //   required: true,
    //   inputType: 'TEXT',
    // },
    // {
    //   name: 'City',
    //   key: 'city',
    //   description: 'City',
    //   selector: (row) =>
    //     row?.hasOwnProperty('organizationDetail') &&
    //     row?.organizationDetail.facilityCity,
    //   sortable: true,
    //   required: true,
    //   inputType: 'TEXT',
    // },

    // {
    //   name: 'Phone',
    //   key: 'phone',
    //   description: 'Phone',
    //   selector: (row) =>
    //     row?.hasOwnProperty('organizationDetail') &&
    //     row?.organizationDetail.facilityContactPhone,
    //   sortable: true,
    //   required: true,
    //   inputType: 'TEXT',
    // },
    // {
    //   name: 'Email',
    //   key: 'email',
    //   description: 'Email',
    //   selector: (row) =>
    //     row?.hasOwnProperty('organizationDetail') &&
    //     row?.organizationDetail.facilityEmail,
    //   sortable: true,
    //   required: true,
    //   inputType: 'TEXT',
    // },
    // {
    //   name: 'Type',
    //   key: 'type',
    //   description: 'Type',
    //   selector: (row) =>
    //     row?.hasOwnProperty('organizationDetail') &&
    //     row?.organizationDetail.facilityType,
    //   sortable: true,
    //   required: true,
    //   inputType: 'TEXT',
    // },
    // {
    //   name: 'Category',
    //   key: 'category',
    //   description: 'Category',
    //   selector: (row) =>
    //     row?.hasOwnProperty('organizationDetail') &&
    //     row?.organizationDetail.facilityCategory,
    //   sortable: true,
    //   required: true,
    //   inputType: 'TEXT',
    // },
  ];
  console.log('Facilities', facilities, 'Accreditation', accreditation);
  return (
    <>
      {user ? (
        <>
          <div className="level">
            <FormsHeaderText text={'Accreditation'} />
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

                <div>
                  {standAlone && (
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
                      Create Accreditation
                    </MuiButton>
                  )}
                </div>
              </TableMenu>
              <CustomTable
                title={''}
                columns={providerSchema}
                data={
                  !standAlone
                    ? accreditation.filter((item) => item)
                    : accreditation.filter(
                        (item) =>
                          item.facilityId === facility.facilityDetail._id
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
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const facilityServ = client.service('facility');
  const orgServ = client.service('organizationclient');
  const accreditationServ = client.service('accreditation');
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
  const [edit, setEdit] = useState(false);
  const [selectedInput, setSelectedInput] = useState('');
  const [getTotal, setGetTotal] = useState(0);
  const [subScore, setSubScore] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [conpleted, setCompleted] = useState(false);
  //const history = useHistory()

  const getProviderBand = async () => {
    if (user?.currentEmployee) {
      const findServices = await BandsServ.find({
        query: {
          facility: user?.currentEmployee?.facilityDetail._id,
          bandType:
            user.currentEmployee?.facilityDetail?.facilityType === 'HMO'
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

  // useEffect(() => {
  //   let facility = state?.facilityModule?.selectedFacility;
  //   const personal = facility?.accreditation[0]?.personalDetails;
  //   const general = facility?.accreditation[0]?.generalOutlookDetails;
  //   const frontDesk = facility?.accreditation[0]?.frontDeskDetails;
  //   const casuality = facility?.accreditation[0]?.casualityDetails;
  //   const pharmacy = facility?.accreditation[0]?.pharmacyDetails;
  //   const laboratory = facility?.accreditation[0]?.laboratoryDetails;
  //   const labour = facility?.accreditation[0]?.labourDetails;
  //   const ward = facility?.accreditation[0]?.wardDetails;
  //   const theatre = facility?.accreditation[0]?.theatreDetails;
  //   const additional = facility?.accreditation[0]?.additionalDetails;
  //   const admin = facility?.accreditation[0]?.adminDetails;
  //   const quality = facility?.accreditation[0]?.qualityDetails;
  //   const otherData = facility?.accreditation[0]?.otherDetails;
  //   const staff = facility?.accreditation[0]?.staffDetails;
  //   const nonMedStaff = facility?.accreditation[0]?.nonMedicalStaffDetails;
  //   const specialist = facility?.accreditation[0]?.specialistDetails;
  //   const assessment = facility?.accreditation[0]?.assessmentDetails;
  //   const initFormValue = {
  //     nameofmd: personal?.mdName,
  //     mcdnNo: personal?.Mcdn,
  //     mdPhone: personal?.mdPhone,
  //     specialization: personal?.specialiazation,
  //     mdEmail: personal?.mdEmail,
  //     nameofChiefMatron: personal?.chiefMatron,
  //     chiefMatronPhone: personal?.chiefMatronPhone,
  //     nameofHmoOfficer: personal?.hmoOfficer,
  //     hmoOfficerPhone: personal?.hmoOfficerPhone,
  //     locScore: general?.location,
  //     cleanScore: general?.cleaniness,
  //     detachedScore: general?.detachedPremise,
  //     parkingScore: general?.Parking,
  //     exitScore: general?.emergencyExit,
  //     signScore: general?.directionalSign,
  //     commScore: general?.communication,
  //     refuseScore: general?.refuse,
  //     waterScore: general?.water,
  //     securityScore: general?.security,
  //     cateringScore: general?.catering,
  //     laundryScore: general?.laundry,
  //     fireScore: general?.fireExtinguisher,
  //     ambulanceScore: general?.ambulance,
  //     receptionScore: frontDesk?.receptionSpace,
  //     receptionCleanScore: frontDesk?.receptioncleaniness,
  //     receptionLightScore: frontDesk?.receptionLightScore,
  //     receptionSitScore: frontDesk?.sittingFacility,
  //     receptionStaffScore: frontDesk?.receptionistAttitude,
  //     receptionRestScore: frontDesk?.restRoom,
  //     receptionWaitScore: frontDesk?.waitingRoom,
  //     receptionNurseScore: frontDesk?.nurseStation,
  //     consultScore: frontDesk?.consultationRoom,
  //     consultLightScore: frontDesk?.consultationRoomLight,
  //     consultFacilityScore: frontDesk?.consultationRoomfac,
  //     treatmentScore: frontDesk?.treatmentRoom,
  //     injectionScore: frontDesk?.injectionSafety,
  //     casualtyScore: casuality?.emergencyCasualty,
  //     casualtyEquipScore: casuality?.emergencyEquipment,
  //     oxygenScore: casuality?.oxygenMask,
  //     drugScore: casuality?.ngTube,
  //     casualtyExamScore: casuality?.examinationCouch,
  //     casualtyLaryScore: casuality?.larynoscope,
  //     pharmacyScore: pharmacy?.pharmacy,
  //     pharmacyQualScore: pharmacy?.pharmasist,
  //     pharmacyStoreScore: pharmacy?.pharmacyStore,
  //     pharmacyRangeScore: pharmacy?.pharmacyRange,
  //     pharmacyRegScore: pharmacy?.pharmacyReg,
  //     laboratory: laboratory?.labScore,
  //     laboratoryTest: laboratory?.labTestScore,
  //     laboratorySpecial: laboratory?.labSpecialScore,
  //     laboratoryUltra: laboratory?.labUltraScore,
  //     laboratoryRad: laboratory?.labRadScore,
  //     laboratoryXray: laboratory?.labContrastScore,
  //     laboratoryAdav: laboratory?.labAdvancedScore,
  //     laboratoryBlood: laboratory?.labBloodScore,
  //     wardScore: ward?.ward,
  //     wardBedScore: ward?.wardbedStrength,
  //     wardPrivateScore: ward?.warbedFac,
  //     wardCleanScore: ward?.wardbedClean,
  //     wardEquipScore: ward?.wardEquipment,
  //     wardFeatureScore: ward?.wardfeatures,
  //     wardSpaceScore: ward?.wardSpace,
  //     labourScore: labour?.labhygiene,
  //     labourFirstScore: labour?.labExamGlove,
  //     labourManScore: labour?.labManPower,
  //     labourEquipScore: labour?.labEquip,
  //     labourUltraScore: labour?.labultrasound,
  //     labourPadiScore: labour?.labPadiatics,
  //     labourDelScore: labour?.labdeliveryPack,
  //     labourBedScore: labour?.labdeliveryBed,
  //     labourSuctionScore: labour?.labsuction,
  //     labourResuscitatorScore: labour?.labresuscitator,
  //     labourOxygenScore: labour?.labOxygen,
  //     labourBabyScore: labour?.labBabyCots,
  //     labourIncubatorScore: labour?.labBabyIncubator,
  //     theatreScore: theatre?.theatre,
  //     theatreEquipScore: theatre?.theatreEquip,
  //     theatreAnesScore: theatre?.theatreAnes,
  //     theatreSuctionScore: theatre?.theatreSuction,
  //     theatreRecoveryScore: theatre?.theatreRecovery,
  //     theatreDrumScore: theatre?.theatreDrum,
  //     theatrePackScore: theatre?.theatrePack,
  //     theatreStretchScore: theatre?.theatreStretch,
  //     theatreOxygenScore: theatre?.theatreOxygen,
  //     theatreLaryngoscopeScore: theatre?.theatreLaryngoscope,
  //     dentalScore: additional?.dental,
  //     opticalScore: additional?.optical,
  //     Physiotherapy: additional?.physiotherapy,
  //     intensiveScore: additional?.intensiveCare,
  //     mortuaryScore: additional?.mortuary,
  //     adminRecordScore: admin?.adminRecord,
  //     adminMedRecordScore: admin?.adminMedRecord,
  //     adminAccountScore: admin?.adminAccount,
  //     adminAccountFlowScore: admin?.adminAccountFlow,
  //     adminInternetScore: admin?.adminInternet,
  //     adminInternetAvalScore: admin?.adminInternetAval,
  //     adminTelecomScore: admin?.adminTelecom,
  //     qualityOfficerScore: quality?.qualityOfficer,
  //     qualityClinicalScore: quality?.qualityClinical,
  //     qualityCaseScore: quality?.qualityCase,
  //     qualityReferralScore: quality?.qualityReferral,
  //     otherHmoScore: otherData?.otherHmo,
  //     otherLivesScore: otherData?.otherLives,
  //     otherIndemnityScore: otherData?.otherIndemnity,
  //     staffMedScore: staff?.staffMedScore,
  //     staffNurseScore: staff?.staffNurseScore,
  //     staffMidwifeScore: staff?.staffMidwifeScore,
  //     staffNurseMidScore: staff?.staffNurseMidScore,
  //     staffChewScore: staff?.staffChewScore,
  //     staffResidencyScore: staff?.staffResidencyScore,
  //     staffAuxScore: staff?.staffAuxScore,
  //     staffPharmScore: staff?.staffPharmScore,
  //     nonMedReceptionScore: nonMedStaff?.nonMedReceptionScore,
  //     nonMedSecretaryScore: nonMedStaff?.nonMedSecretaryScore,
  //     nonMedHmoScore: nonMedStaff?.nonMedHmoScore,
  //     nonMedDomesticScore: nonMedStaff?.nonMedDomesticScore,
  //     nonMedCleanerScore: nonMedStaff?.nonMedCleanerScore,
  //     nonMedCroScore: nonMedStaff?.nonMedCroScore,
  //     specialistOgScore: specialist?.specialistOgScore,
  //     specialistPaedScore: specialist?.specialistPaedScore,
  //     specialistIntScore: specialist?.specialistIntScore,
  //     specialistGenScore: specialist?.specialistGenScore,
  //     specialistOrthoScore: specialist?.specialistOrthoScore,
  //     specialistCardioScore: specialist?.specialistCardioScore,
  //     specialistEntScore: specialist?.specialistEntScore,
  //     specialistNephroScore: specialist?.specialistNephroScore,
  //     specialistNeuroScore: specialist?.specialistNeuroScore,
  //     specialistEndoScore: specialist?.specialistEndoScore,
  //     specialistDermScore: specialist?.specialistDermScore,
  //     specialistPhysioScore: specialist?.specialistPhysioScore,
  //     assessmentName: assessment?.assessmentName,
  //     observation: assessment?.observation,
  //     observername: assessment?.observerName,
  //     observerdesignation: assessment?.observerDesignation,
  //     observerphone: assessment?.observerPhone,
  //     providername: assessment?.providerName,
  //     providerdesignation: assessment?.providerDesignation,
  //     providerphone: assessment?.providerPhone,
  //     observationdate: assessment?.onservationDate,
  //     reviewname: assessment?.ReviewName,
  //     reviewofficername: assessment?.ReviewOfficer,
  //     reviewdate: assessment?.ReviewDate,
  //     approve: assessment?.approve,
  //     deny: assessment?.deny,
  //     probation: assessment?.probation,
  //     summerydate: assessment?.summeryDate,
  //     completed: assessment?.completed,
  //   };
  //   reset(initFormValue);
  // }, []);

  const handleClick = async (data) => {
    setLoading(true);
    const userId = state.facilityModule.selectedFacility._id;
    const employee = user.currentEmployee;
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
        location: parseInt(data.locScore),
        cleaniness: parseInt(data.cleanScore),
        detachedPremise: parseInt(data.detachedScore),
        Parking: parseInt(data.parkingScore),
        emergencyExit: parseInt(data.exitScore),
        directionalSign: parseInt(data.signScore),
        communication: parseInt(data.commScore),
        refuse: parseInt(data.refuseScore),
        water: parseInt(data.waterScore),
        security: parseInt(data.securityScore),
        catering: parseInt(data.cateringScore),
        laundry: parseInt(data.laundryScore),
        fireExtinguisher: parseInt(data.fireScore),
        ambulance: parseInt(data.ambulanceScore),
      },
      frontDeskDetails: {
        receptionSpace: parseInt(data.receptionScore),
        receptioncleaniness: parseInt(data.receptionCleanScore),
        receptionLightScore: parseInt(data.receptionLightScore),
        sittingFacility: parseInt(data.receptionSitScore),
        receptionistAttitude: parseInt(data.receptionStaffScore),
        restRoom: parseInt(data.receptionRestScore),
        waitingRoom: parseInt(data.receptionWaitScore),
        nurseStation: parseInt(data.receptionNurseScore),
        consultationRoom: parseInt(data.consultScore),
        consultationRoomLight: parseInt(data.consultLightScore),
        consultationRoomfac: parseInt(data.consultFacilityScore),
        treatmentRoom: parseInt(data.treatmentScore),
        injectionSafety: parseInt(data.injectionScore),
      },
      casualityDetails: {
        emergencyCasualty: parseInt(data.casualtyScore),
        emergencyEquipment: parseInt(data.casualtyEquipScore),
        oxygenMask: parseInt(data.oxygenScore),
        ngTube: parseInt(data.drugScore),
        examinationCouch: parseInt(data.casualtyExamScore),
        larynoscope: parseInt(data.casualtyLaryScore),
      },
      pharmacyDetails: {
        pharmacy: parseInt(data.pharmacyScore),
        pharmasist: parseInt(data.pharmacyQualScore),
        pharmacyStore: parseInt(data.pharmacyStoreScore),
        pharmacyRange: parseInt(data.pharmacyRangeScore),
        pharmacyReg: parseInt(data.pharmacyRegScore),
      },
      laboratoryDetails: {
        laboratory: parseInt(data.labScore),
        laboratoryTest: parseInt(data.labTestScore),
        laboratorySpecial: parseInt(data.labSpecialScore),
        laboratoryUltra: parseInt(data.labUltraScore),
        laboratoryRad: parseInt(data.labRadScore),
        laboratoryXray: parseInt(data.labContrastScore),
        laboratoryAdav: parseInt(data.labAdvancedScore),
        laboratoryBlood: parseInt(data.labBloodScore),
      },
      wardDetails: {
        ward: parseInt(data.wardScore),
        wardbedStrength: parseInt(data.wardBedScore),
        warbedFac: parseInt(data.wardPrivateScore),
        wardbedClean: parseInt(data.wardCleanScore),
        wardEquipment: parseInt(data.wardEquipScore),
        wardfeatures: parseInt(data.wardFeatureScore),
        wardSpace: parseInt(data.wardSpaceScore),
      },
      labourDetails: {
        labhygiene: parseInt(data.labourScore),
        labExamGlove: parseInt(data.labourFirstScore),
        labManPower: parseInt(data.labourManScore),
        labEquip: parseInt(data.labourEquipScore),
        labultrasound: parseInt(data.labourUltraScore),
        labPadiatics: parseInt(data.labourPadiScore),
        labdeliveryPack: parseInt(data.labourDelScore),
        labdeliveryBed: parseInt(data.labourBedScore),
        labsuction: parseInt(data.labourSuctionScore),
        labresuscitator: parseInt(data.labourResuscitatorScore),
        labOxygen: parseInt(data.labourOxygenScore),
        labBabyCots: parseInt(data.labourBabyScore),
        labBabyIncubator: parseInt(data.labourIncubatorScore),
      },
      theatreDetails: {
        theatre: parseInt(data.theatreScore),
        theatreEquip: parseInt(data.theatreEquipScore),
        theatreAnes: parseInt(data.theatreAnesScore),
        theatreSuction: parseInt(data.theatreSuctionScore),
        theatreRecovery: parseInt(data.theatreRecoveryScore),
        theatreDrum: parseInt(data.theatreDrumScore),
        theatrePack: parseInt(data.theatrePackScore),
        theatreStretch: parseInt(data.theatreStretchScore),
        theatreOxygen: parseInt(data.theatreOxygenScore),
        theatreLaryngoscope: parseInt(data.theatreLaryngoscopeScore),
      },
      additionalDetails: {
        dental: parseInt(data.dentalScore),
        optical: parseInt(data.opticalScore),
        physiotherapy: parseInt(data.Physiotherapy),
        intensiveCare: parseInt(data.intensiveScore),
        mortuary: parseInt(data.mortuaryScore),
      },
      adminDetails: {
        adminRecord: parseInt(data.adminRecordScore),
        adminMedRecord: parseInt(data.adminMedRecordScore),
        adminAccount: parseInt(data.adminAccountScore),
        adminAccountFlow: parseInt(data.adminAccountFlowScore),
        adminInternet: parseInt(data.adminInternetScore),
        adminInternetAval: parseInt(data.adminInternetAvalScore),
        adminTelecom: parseInt(data.adminTelecomScore),
      },
      qualityDetails: {
        qualityOfficer: parseInt(data.qualityOfficerScore),
        qualityClinical: parseInt(data.qualityClinicalScore),
        qualityCase: parseInt(data.qualityCaseScore),
        qualityReferral: parseInt(data.qualityReferralScore),
      },
      otherDetails: {
        otherHmo: parseInt(data.otherHmoScore),
        otherLives: parseInt(data.otherLivesScore),
        otherIndemnity: parseInt(data.otherIndemnityScore),
      },
      staffDetails: {
        staffMedScore: parseInt(data.staffMedScore),
        staffNurseScore: parseInt(data.staffNurseScore),
        staffMidwifeScore: parseInt(data.staffMidwifeScore),
        staffNurseMidScore: parseInt(data.staffNurseMidScore),
        staffChewScore: parseInt(data.staffChewScore),
        staffResidencyScore: parseInt(data.staffResidencyScore),
        staffAuxScore: parseInt(data.staffAuxScore),
        staffPharmScore: parseInt(data.staffPharmScore),
      },
      nonMedicalStaffDetails: {
        nonMedReceptionScore: parseInt(data.nonMedReceptionScore),
        nonMedSecretaryScore: parseInt(data.nonMedSecretaryScore),
        nonMedHmoScore: parseInt(data.nonMedHmoScore),
        nonMedDomesticScore: parseInt(data.nonMedDomesticScore),
        nonMedCleanerScore: parseInt(data.nonMedCleanerScore),
        nonMedCroScore: parseInt(data.nonMedCroScore),
      },
      specialistDetails: {
        specialistOgScore: parseInt(data.specialistOgScore),
        specialistPaedScore: parseInt(data.specialistPaedScore),
        specialistIntScore: parseInt(data.specialistIntScore),
        specialistGenScore: parseInt(data.specialistGenScore),
        specialistOrthoScore: parseInt(data.specialistOrthoScore),
        specialistCardioScore: parseInt(data.specialistCardioScore),
        specialistEntScore: parseInt(data.specialistEntScore),
        specialistNephroScore: parseInt(data.specialistNephroScore),
        specialistNeuroScore: parseInt(data.specialistNeuroScore),
        specialistEndoScore: parseInt(data.specialistEndoScore),
        specialistDermScore: parseInt(data.specialistDermScore),
        specialistPhysioScore: parseInt(data.specialistPhysioScore),
      },
      assessmentDetails: {
        observation: data.observation,
        observerName: data.observername,
        observerDesignation: data.observerdesignation,
        observerPhone: data.observerphone,
        providerName: data.providername,
        providerDesignation: data.providerdesignation,
        providerPhone: data.providerphone,
        observationDate: data.observationdate,
        ReviewName: data.reviewname,
        ReviewOfficer: data.reviewofficername,
        ReviewDate: data.reviewdate,
        approve: data.approve,
        deny: data.deny,
        probation: data.probation,
        summeryDate: data.summerydate,
        completed: data.conpleted,
      },
    };
    const allData = {
      organizationName: facility?.organizationDetail?.facilityName,
      organizationId: facility?.organizationDetail?._id,
      facilityname: facility?.facilityDetail?.facilityName,
      facilityId: facility?.facilityDetail?._id,
      details: [accreditationDetails],
      createdbyName: `${employee.firstname} ${employee.lastname}`,
      createdBy: employee.userId,
      assessmentName: data.assessmentName,
    };

    await accreditationServ
      .create(allData)
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
        toast.success("You've succesfully created a new Assessment");
      })
      .catch((error) => {
        setLoading(false);
        setShowModal(0);
        toast.error(`An error occured whilst creating an Assessment ${error}`);
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
        setGetTotal(1);
        break;
      case 2:
        setShowArray(frontdeskData);
        setGetTotal(2);
        break;
      case 3:
        setShowArray(casualityData);
        setGetTotal(3);
        break;
      case 4:
        setShowArray(pharmacyData);
        setGetTotal(4);
        break;
      case 5:
        setShowArray(laboratoryData);
        setGetTotal(5);
        break;
      case 6:
        setShowArray(wardData);
        setGetTotal(6);
        break;
      case 7:
        setShowArray(labourData);
        setGetTotal(7);
        break;
      case 8:
        setShowArray(theatreData);
        setGetTotal(8);
        break;
      case 9:
        setShowArray(additionalData);
        setGetTotal(9);
        break;
      case 10:
        setShowArray(adminData);
        setGetTotal(10);
        break;
      case 11:
        setShowArray(QualityData);
        setGetTotal(11);
        break;
      case 12:
        setShowArray(otherData);
        setGetTotal(12);
        break;
      case 13:
        setShowArray(staffData);
        setGetTotal(13);
        break;
      case 14:
        setShowArray(nonMedStaff);
        setGetTotal(14);
        break;
      case 15:
        setShowArray(specialistData);
        setGetTotal(15);
        break;
      default:
        setShowArray([]);
    }
  };
  // useEffect(() => {
  //   const generalValue = facility?.accreditation[0]?.generalOutlookDetails;
  //   const frontDeskValue = facility?.accreditation[0]?.frontDeskDetails;
  //   const casualityValue = facility?.accreditation[0]?.casualityDetails;
  //   const pharmacyValue = facility?.accreditation[0]?.pharmacyDetails;
  //   const laboratoryValue = facility?.accreditation[0]?.laboratoryDetails;
  //   const wardValue = facility?.accreditation[0]?.wardDetails;
  //   const labourValue = facility?.accreditation[0]?.labourDetails;
  //   const theatreValue = facility?.accreditation[0]?.theatreDetails;
  //   const additionalValue = facility?.accreditation[0]?.additionalDetails;
  //   const adminValue = facility?.accreditation[0]?.administrationDetails;
  //   const qualityValue = facility?.accreditation[0]?.qualityDetails;
  //   const otherValue = facility?.accreditation[0]?.otherDetails;
  //   const staffValue = facility?.accreditation[0]?.staffDetails;
  //   const nonMedValue = facility?.accreditation[0]?.nonMedicalStaffDetails;
  //   const specialistValue = facility?.accreditation[0]?.specialistDetails;
  //   switch (getTotal) {
  //     case 1:
  //       let subToatal =
  //         generalValue?.location +
  //         generalValue?.cleaniness +
  //         generalValue?.detachedPremise +
  //         generalValue?.Parking +
  //         generalValue?.emergencyExit +
  //         generalValue?.directionalSign +
  //         generalValue?.communication +
  //         generalValue?.refuse +
  //         generalValue?.security +
  //         generalValue?.fireExtinguisher +
  //         generalValue?.ambulance;
  //       setSubScore(isNaN(subToatal) ? 0 : subToatal);
  //       break;
  //     case 2:
  //       let subToatal2 =
  //         frontDeskValue?.receptionSpace +
  //         frontDeskValue?.receptioncleaniness +
  //         frontDeskValue?.receptionLightScore +
  //         frontDeskValue?.sittingFacility +
  //         frontDeskValue?.receptionistAttitude +
  //         frontDeskValue?.restRoom +
  //         frontDeskValue?.waitingRoom +
  //         frontDeskValue?.nurseStation +
  //         frontDeskValue?.consultationRoom +
  //         frontDeskValue?.consultationRoomLight +
  //         frontDeskValue?.consultationRoomfac +
  //         frontDeskValue?.treatmentRoom +
  //         frontDeskValue?.injectionSafety;
  //       setSubScore(isNaN(subToatal2) ? 0 : subToatal2);
  //       break;
  //     case 3:
  //       let subToatal3 =
  //         casualityValue?.emergencyCasualty +
  //         casualityValue?.emergencyEquipment +
  //         casualityValue?.oxygenMask +
  //         casualityValue?.ngTube +
  //         casualityValue?.examinationCouch +
  //         casualityValue?.larynoscope;
  //       setSubScore(isNaN(subToatal3) ? 0 : subToatal3);
  //       break;
  //     case 4:
  //       let subToatal4 =
  //         pharmacyValue?.pharmacy +
  //         pharmacyValue?.pharmasist +
  //         pharmacyValue?.pharmacyStore +
  //         pharmacyValue?.pharmacyRange +
  //         pharmacyValue?.pharmacyReg;
  //       setSubScore(isNaN(subToatal4) ? 0 : subToatal4);
  //       break;
  //     case 5:
  //       let subToatal5 =
  //         laboratoryValue?.laboratory +
  //         laboratoryValue?.laboratoryTest +
  //         laboratoryValue?.laboratorySpecial +
  //         laboratoryValue?.laboratoryUltra +
  //         laboratoryValue?.laboratoryRad +
  //         laboratoryValue?.laboratoryXray +
  //         laboratoryValue?.laboratoryAdav +
  //         laboratoryValue?.laboratoryBlood;
  //       setSubScore(isNaN(subToatal5) ? 0 : subToatal5);
  //       break;
  //     case 6:
  //       let subToatal6 =
  //         wardValue?.ward +
  //         wardValue?.wardbedStrength +
  //         wardValue?.warbedFac +
  //         wardValue?.wardbedClean +
  //         wardValue?.wardEquipment +
  //         wardValue?.wardfeatures +
  //         wardValue?.wardSpace;
  //       setSubScore(isNaN(subToatal6) ? 0 : subToatal6);
  //       break;
  //     case 7:
  //       let subToatal7 =
  //         labourValue?.labhygiene +
  //         labourValue?.labExamGlove +
  //         labourValue?.labManPower +
  //         labourValue?.labEquip +
  //         labourValue?.labultrasound +
  //         labourValue?.labPadiatics +
  //         labourValue?.labdeliveryPack +
  //         labourValue?.labdeliveryBed +
  //         labourValue?.labsuction +
  //         labourValue?.labresuscitator +
  //         labourValue?.labOxygen +
  //         labourValue?.labBabyCots +
  //         labourValue?.labBabyIncubator;
  //       setSubScore(isNaN(subToatal7) ? 0 : subToatal7);
  //       break;
  //     case 8:
  //       let subToatal8 =
  //         theatreValue?.theatre +
  //         theatreValue?.theatreAnes +
  //         theatreValue?.theatreSuction +
  //         theatreValue?.theatreRecovery +
  //         theatreValue?.theatreDrum +
  //         theatreValue?.theatrePack +
  //         theatreValue?.theatreStretch +
  //         theatreValue?.theatreOxygen +
  //         theatreValue?.theatreLaryngoscope;
  //       setSubScore(isNaN(subToatal8) ? 0 : subToatal8);
  //       break;
  //     case 9:
  //       let subToatal9 =
  //         additionalValue?.dental +
  //         additionalValue?.optical +
  //         additionalValue?.physiotherapy +
  //         additionalValue?.intensiveCare +
  //         additionalValue?.mortuary;
  //       setSubScore(isNaN(subToatal9) ? 0 : subToatal9);
  //       break;
  //     case 10:
  //       let subToatal10 =
  //         adminValue?.adminRecord +
  //         adminValue?.adminMedRecord +
  //         adminValue?.adminAccount +
  //         adminValue?.adminAccountFlow +
  //         adminValue?.adminInternet +
  //         adminValue?.adminInternetAval +
  //         adminValue?.adminTelecom;
  //       setSubScore(isNaN(subToatal10) ? 0 : subToatal10);
  //       break;
  //     case 11:
  //       let subToatal11 =
  //         qualityValue?.qualityOfficer +
  //         qualityValue?.qualityClinical +
  //         qualityValue?.qualityCase +
  //         qualityValue?.qualityReferral;
  //       setSubScore(isNaN(subToatal11) ? 0 : subToatal11);
  //       break;
  //     case 12:
  //       let subToatal12 =
  //         otherValue?.otherHmo +
  //         otherValue?.otherLives +
  //         otherValue?.otherIndemnity;
  //       setSubScore(isNaN(subToatal12) ? 0 : subToatal12);
  //       break;
  //     case 13:
  //       let subToatal13 =
  //         staffValue?.staffMedScore +
  //         staffValue?.staffNurseScore +
  //         staffValue?.staffMidwifeScore +
  //         staffValue?.staffNurseMidScore +
  //         staffValue?.staffChewScore +
  //         staffValue?.staffResidencyScore +
  //         staffValue?.staffAuxScore +
  //         staffValue?.staffPharmScore;
  //       setSubScore(isNaN(subToatal13) ? 0 : subToatal13);
  //       break;
  //     case 14:
  //       let subToatal14 =
  //         nonMedValue?.nonMedReceptionScore +
  //         nonMedValue?.nonMedSecretaryScore +
  //         nonMedValue?.nonMedHmoScore +
  //         nonMedValue?.nonMedDomesticScore +
  //         nonMedValue?.nonMedCleanerScore +
  //         nonMedValue?.nonMedCroScore;
  //       setSubScore(isNaN(subToatal14) ? 0 : subToatal14);
  //       break;
  //     case 15:
  //       let subToatal15 =
  //         specialistValue?.specialistOgScore +
  //         specialistValue?.specialistPaedScore +
  //         specialistValue?.specialistIntScore +
  //         specialistValue?.specialistGenScore +
  //         specialistValue?.specialistOrthoScore +
  //         specialistValue?.specialistCardioScore +
  //         specialistValue?.specialistEntScore +
  //         specialistValue?.specialistNephroScore +
  //         specialistValue?.specialistNeuroScore +
  //         specialistValue?.specialistEndoScore +
  //         specialistValue?.specialistDermScore +
  //         specialistValue?.specialistPhysioScore;
  //       setSubScore(isNaN(subToatal15) ? 0 : subToatal15);
  //       break;

  //     default:
  //       setSubScore(0);
  //   }
  // }, [getTotal, facility]);

  // };
  console.log(facility, selectedInput, 'subtotal', subScore);
  return (
    <>
      <div
        className="container"
        style={{
          width: '98%',
          margin: '0 1rem',
        }}
      >
        {currentPage === 1 && (
          <>
            <p style={{ fontWeight: '700' }}>
              {facility?.facilityname?.toUpperCase()} - ASSESSMENT /
              CREDENTIALLING FORM (NO..)
            </p>
            <p style={{ fontWeight: '700', marginBottom: '.5rem' }}>
              (PRIVATE SCHEME)
            </p>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <FormsHeaderText text={'PERSONAL DATA'} />
              <Box display="flex" mt={1}>
                <GlobalCustomButton
                  text={'Cancel'}
                  onClick={() => setShowModal(0)}
                  color="warning"
                  customStyles={{ marginRight: '.8rem' }}
                />
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
            </Box>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} sm={6}>
                <Input
                  label={'ASSESSMENT NAME'}
                  register={register('assessmentName')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
          </>
        )}
        {currentPage === 2 && (
          <>
            <div
              style={{
                height: '80vh',
                overflowY: 'scroll',
                width: '90%',
                margin: '0 auto',
              }}
            >
              <p style={{ fontWeight: '700' }}>
                {facility?.facilityname?.toUpperCase()} - ASSESSMENT /
                CREDENTIALLING FORM (NO..)
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
                      <Box
                        sx={{
                          width: '100%',
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
                                sx={{ textAlign: 'center' }}
                              >
                                <input
                                  type="checkbox"
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setEdit(true);
                                      setSelectedInput(item.name);
                                    } else {
                                      // setEdit(false);
                                      // setSelectedInput('');
                                    }
                                  }}
                                  // checked={
                                  //   selectedInput === item.name ? true : false
                                  // }
                                />
                              </Grid>
                              <Grid item xs={12} sm={2}>
                                <Input
                                  label={'Score'}
                                  register={register(`${item.name}`)}
                                  disabled={
                                    selectedInput === item.name ? false : true
                                  }
                                  type="number"
                                />
                              </Grid>
                            </Grid>
                          </>
                        ))}
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <GlobalCustomButton
                            text={'Save'}
                            onClick={() => {
                              setShowScore(0);
                              toast.success('Saved');
                            }}
                          />
                          <Box sx={{ display: 'flex', alignItems: 'center ' }}>
                            <FormsHeaderText text="TOTAL SCORE" /> &nbsp; =
                            &nbsp;
                            <p style={{ fontWeight: '700', fontSize: '2rem' }}>
                              {subScore}
                            </p>
                          </Box>
                        </Box>
                      </Box>
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
                height: '90vh',
                overflowY: 'scroll',
                width: '89%',
                margin: '0 auto',
              }}
            >
              <p style={{ fontWeight: '700' }}>
                {facility?.facilityname?.toUpperCase()} - ASSESSMENT /
                CREDENTIALLING FORM (NO..)
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
                      <Box
                        sx={{
                          width: '100%',
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
                                <input
                                  type="checkbox"
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setEdit(true);
                                      setSelectedInput(item.name);
                                    } else {
                                      // setEdit(false);
                                      // setSelectedInput('');
                                    }
                                  }}
                                  // checked={
                                  //   selectedInput === item.name ? true : false
                                  // }
                                />
                              </Grid>
                              <Grid item xs={12} sm={2}>
                                <Input
                                  label={'Score'}
                                  register={register(`${item.name}`)}
                                  disabled={
                                    selectedInput === item.name ? false : true
                                  }
                                  type="number"
                                />
                              </Grid>
                            </Grid>
                          </>
                        ))}
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <GlobalCustomButton
                            text={'Save'}
                            onClick={() => {
                              setShowScore(0);
                              toast.success('Saved');
                            }}
                          />
                          <Box sx={{ display: 'flex', alignItems: 'center ' }}>
                            <FormsHeaderText text="TOTAL SCORE" /> &nbsp; =
                            &nbsp;
                            <p style={{ fontWeight: '700', fontSize: '2rem' }}>
                              {subScore}
                            </p>
                          </Box>
                        </Box>
                      </Box>
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

        {/* {showScore === 15 && (
        <>
          <ModalBox open onClose={() => setShowScore(0)} header>
            <Box>
              <Grid container spacing={3} mt={2}>
                <Grid item xs={12} sm={6} md={12}>
                  <McText txt={'FOR OFFICIAL USE'} type={'p'} bold={700} />
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
                  <McText txt={'RECOMMENDATION SUMMARY'} type={'p'} />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={6}>
                  <Input label={'A APRROVE'} register={register('name')} />
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
                  <McText txt={'C. GIVE PROBATION FOR'} type={'p'} />
                  <CustomSelect
                    options={selectdata}
                    register={register('inspectionParameters')}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} mt={1.5}>
                  <BasicDatePicker label={'DATE'} register={register('date')} />
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

              <GlobalCustomButton text={'Save'} onClick={() => {}} />
            </Box>
          </ModalBox>
        </>
      )} */}

        {/* -------------------------------------- */}

        {currentPage === 4 && (
          <>
            <div
              style={{
                height: '80vh',
                overflowY: 'scroll',
                width: '100%',
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
                  <Textarea
                    label={'Observations'}
                    register={register('observation')}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <Input label={'Name'} register={register('observername')} />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <Input
                    label={'Designation'}
                    register={register('observerdesignation')}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <Input label={'Phone'} register={register('observerphone')} />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <Input
                    label={'Provider Representative Name'}
                    register={register('providername')}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <Input
                    label={'Designation'}
                    register={register('providerdesignation')}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <Input label={'Phone'} register={register('providerphone')} />
                </Grid>
                <Grid item xs={12} sm={4} md={6}>
                  <MuiCustomDatePicker
                    label="Date"
                    name="observationdate"
                    control={control}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3} mt={1}>
                <Grid item xs={12} sm={4} md={12}>
                  <McText txt={'FOR OFFICIAL USE'} type={'p'} bold={700} />
                </Grid>
              </Grid>
              <Grid container spacing={3} mt={1}>
                <Grid item xs={12} sm={4} md={12}>
                  <Textarea
                    label={`Med. Officer's Review of Credentials`}
                    register={register('reviewname')}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={6}>
                  <Input
                    label={'Name of Reviewing Officer'}
                    register={register('reviewofficername')}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={6}>
                  <MuiCustomDatePicker
                    label="Date of Review"
                    name="reviewdate"
                    control={control}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={3} mt={1}>
                <Grid item xs={12} sm={4} md={12}>
                  <McText
                    txt={'RECOMMENDATION SUMMARY'}
                    type={'p'}
                    bold={700}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3} mt={1}>
                <Grid item xs={12} sm={4} md={6}>
                  <Input label={'A Approve'} register={register('approve')} />
                </Grid>
                <Grid item xs={12} sm={4} md={6}>
                  <Input
                    label={'B Deny Outrightly'}
                    register={register('deny')}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={6}>
                  <Input
                    label={'C Give Probation For'}
                    register={register('probation')}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={6}>
                  <MuiCustomDatePicker
                    label="Date"
                    name="summerydate"
                    control={control}
                  />
                </Grid>
              </Grid>
              {/* <Box style={{ marginRight: '1rem', fontSize: '.8rem' }}>
                <input
                  type="radio"
                  name="completed"
                  {...register('completed')}
                  onChange={(e) => setCompleted(e.target.checked)}
                  style={{ marginRight: '.5rem' }}
                />
                <label></label>
              </Box> */}
              <GlobalCustomButton
                text={'Cancel'}
                onClick={() => setShowModal(0)}
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
      </div>
    </>
  );
}

export function NewOrganizationView({ showModal, setShowModal, selectedAccr }) {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const facilityServ = client.service('facility');
  const orgServ = client.service('organizationclient');
  const accreditationServ = client.service('accreditation');
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
  const facility = selectedAccr;
  const [edit, setEdit] = useState(false);
  const [selectedInput, setSelectedInput] = useState('');
  const [getTotal, setGetTotal] = useState(0);
  const [subScore, setSubScore] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [conpleted, setCompleted] = useState(false);
  //const history = useHistory()

  const getProviderBand = async () => {
    if (user?.currentEmployee) {
      const findServices = await BandsServ.find({
        query: {
          facility: user?.currentEmployee?.facilityDetail._id,
          bandType:
            user.currentEmployee?.facilityDetail?.facilityType === 'HMO'
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
    let facility = selectedAccr;
    const personal = facility?.details[0]?.personalDetails;
    const general = facility?.details[0]?.generalOutlookDetails;
    const frontDesk = facility?.details[0]?.frontDeskDetails;
    const casuality = facility?.details[0]?.casualityDetails;
    const pharmacy = facility?.details[0]?.pharmacyDetails;
    const laboratory = facility?.details[0]?.laboratoryDetails;
    const labour = facility?.details[0]?.labourDetails;
    const ward = facility?.details[0]?.wardDetails;
    const theatre = facility?.details[0]?.theatreDetails;
    const additional = facility?.details[0]?.additionalDetails;
    const admin = facility?.details[0]?.adminDetails;
    const quality = facility?.details[0]?.qualityDetails;
    const otherData = facility?.details[0]?.otherDetails;
    const staff = facility?.details[0]?.staffDetails;
    const nonMedStaff = facility?.details[0]?.nonMedicalStaffDetails;
    const specialist = facility?.details[0]?.specialistDetails;
    const assessment = facility?.details[0]?.assessmentDetails;
    const initFormValue = {
      nameofmd: personal?.mdName,
      mcdnNo: personal?.Mcdn,
      mdPhone: personal?.mdPhone,
      specialization: personal?.specialiazation,
      mdEmail: personal?.mdEmail,
      nameofChiefMatron: personal?.chiefMatron,
      chiefMatronPhone: personal?.chiefMatronPhone,
      nameofHmoOfficer: personal?.hmoOfficer,
      hmoOfficerPhone: personal?.hmoOfficerPhone,
      locScore: general?.location,
      cleanScore: general?.cleaniness,
      detachedScore: general?.detachedPremise,
      parkingScore: general?.Parking,
      exitScore: general?.emergencyExit,
      signScore: general?.directionalSign,
      commScore: general?.communication,
      refuseScore: general?.refuse,
      waterScore: general?.water,
      securityScore: general?.security,
      cateringScore: general?.catering,
      laundryScore: general?.laundry,
      fireScore: general?.fireExtinguisher,
      ambulanceScore: general?.ambulance,
      receptionScore: frontDesk?.receptionSpace,
      receptionCleanScore: frontDesk?.receptioncleaniness,
      receptionLightScore: frontDesk?.receptionLightScore,
      receptionSitScore: frontDesk?.sittingFacility,
      receptionStaffScore: frontDesk?.receptionistAttitude,
      receptionRestScore: frontDesk?.restRoom,
      receptionWaitScore: frontDesk?.waitingRoom,
      receptionNurseScore: frontDesk?.nurseStation,
      consultScore: frontDesk?.consultationRoom,
      consultLightScore: frontDesk?.consultationRoomLight,
      consultFacilityScore: frontDesk?.consultationRoomfac,
      treatmentScore: frontDesk?.treatmentRoom,
      injectionScore: frontDesk?.injectionSafety,
      casualtyScore: casuality?.emergencyCasualty,
      casualtyEquipScore: casuality?.emergencyEquipment,
      oxygenScore: casuality?.oxygenMask,
      drugScore: casuality?.ngTube,
      casualtyExamScore: casuality?.examinationCouch,
      casualtyLaryScore: casuality?.larynoscope,
      pharmacyScore: pharmacy?.pharmacy,
      pharmacyQualScore: pharmacy?.pharmasist,
      pharmacyStoreScore: pharmacy?.pharmacyStore,
      pharmacyRangeScore: pharmacy?.pharmacyRange,
      pharmacyRegScore: pharmacy?.pharmacyReg,
      laboratory: laboratory?.labScore,
      laboratoryTest: laboratory?.labTestScore,
      laboratorySpecial: laboratory?.labSpecialScore,
      laboratoryUltra: laboratory?.labUltraScore,
      laboratoryRad: laboratory?.labRadScore,
      laboratoryXray: laboratory?.labContrastScore,
      laboratoryAdav: laboratory?.labAdvancedScore,
      laboratoryBlood: laboratory?.labBloodScore,
      wardScore: ward?.ward,
      wardBedScore: ward?.wardbedStrength,
      wardPrivateScore: ward?.warbedFac,
      wardCleanScore: ward?.wardbedClean,
      wardEquipScore: ward?.wardEquipment,
      wardFeatureScore: ward?.wardfeatures,
      wardSpaceScore: ward?.wardSpace,
      labourScore: labour?.labhygiene,
      labourFirstScore: labour?.labExamGlove,
      labourManScore: labour?.labManPower,
      labourEquipScore: labour?.labEquip,
      labourUltraScore: labour?.labultrasound,
      labourPadiScore: labour?.labPadiatics,
      labourDelScore: labour?.labdeliveryPack,
      labourBedScore: labour?.labdeliveryBed,
      labourSuctionScore: labour?.labsuction,
      labourResuscitatorScore: labour?.labresuscitator,
      labourOxygenScore: labour?.labOxygen,
      labourBabyScore: labour?.labBabyCots,
      labourIncubatorScore: labour?.labBabyIncubator,
      theatreScore: theatre?.theatre,
      theatreEquipScore: theatre?.theatreEquip,
      theatreAnesScore: theatre?.theatreAnes,
      theatreSuctionScore: theatre?.theatreSuction,
      theatreRecoveryScore: theatre?.theatreRecovery,
      theatreDrumScore: theatre?.theatreDrum,
      theatrePackScore: theatre?.theatrePack,
      theatreStretchScore: theatre?.theatreStretch,
      theatreOxygenScore: theatre?.theatreOxygen,
      theatreLaryngoscopeScore: theatre?.theatreLaryngoscope,
      dentalScore: additional?.dental,
      opticalScore: additional?.optical,
      Physiotherapy: additional?.physiotherapy,
      intensiveScore: additional?.intensiveCare,
      mortuaryScore: additional?.mortuary,
      adminRecordScore: admin?.adminRecord,
      adminMedRecordScore: admin?.adminMedRecord,
      adminAccountScore: admin?.adminAccount,
      adminAccountFlowScore: admin?.adminAccountFlow,
      adminInternetScore: admin?.adminInternet,
      adminInternetAvalScore: admin?.adminInternetAval,
      adminTelecomScore: admin?.adminTelecom,
      qualityOfficerScore: quality?.qualityOfficer,
      qualityClinicalScore: quality?.qualityClinical,
      qualityCaseScore: quality?.qualityCase,
      qualityReferralScore: quality?.qualityReferral,
      otherHmoScore: otherData?.otherHmo,
      otherLivesScore: otherData?.otherLives,
      otherIndemnityScore: otherData?.otherIndemnity,
      staffMedScore: staff?.staffMedScore,
      staffNurseScore: staff?.staffNurseScore,
      staffMidwifeScore: staff?.staffMidwifeScore,
      staffNurseMidScore: staff?.staffNurseMidScore,
      staffChewScore: staff?.staffChewScore,
      staffResidencyScore: staff?.staffResidencyScore,
      staffAuxScore: staff?.staffAuxScore,
      staffPharmScore: staff?.staffPharmScore,
      nonMedReceptionScore: nonMedStaff?.nonMedReceptionScore,
      nonMedSecretaryScore: nonMedStaff?.nonMedSecretaryScore,
      nonMedHmoScore: nonMedStaff?.nonMedHmoScore,
      nonMedDomesticScore: nonMedStaff?.nonMedDomesticScore,
      nonMedCleanerScore: nonMedStaff?.nonMedCleanerScore,
      nonMedCroScore: nonMedStaff?.nonMedCroScore,
      specialistOgScore: specialist?.specialistOgScore,
      specialistPaedScore: specialist?.specialistPaedScore,
      specialistIntScore: specialist?.specialistIntScore,
      specialistGenScore: specialist?.specialistGenScore,
      specialistOrthoScore: specialist?.specialistOrthoScore,
      specialistCardioScore: specialist?.specialistCardioScore,
      specialistEntScore: specialist?.specialistEntScore,
      specialistNephroScore: specialist?.specialistNephroScore,
      specialistNeuroScore: specialist?.specialistNeuroScore,
      specialistEndoScore: specialist?.specialistEndoScore,
      specialistDermScore: specialist?.specialistDermScore,
      specialistPhysioScore: specialist?.specialistPhysioScore,
      assessmentName: selectedAccr?.assessmentName,
      observation: assessment?.observation,
      observername: assessment?.observerName,
      observerdesignation: assessment?.observerDesignation,
      observerphone: assessment?.observerPhone,
      providername: assessment?.providerName,
      providerdesignation: assessment?.providerDesignation,
      providerphone: assessment?.providerPhone,
      observationdate: assessment?.onservationDate,
      reviewname: assessment?.ReviewName,
      reviewofficername: assessment?.ReviewOfficer,
      reviewdate: assessment?.ReviewDate,
      approve: assessment?.approve,
      deny: assessment?.deny,
      probation: assessment?.probation,
      summerydate: assessment?.summeryDate,
      completed: assessment?.completed,
    };
    reset(initFormValue);
  }, []);

  const handleClick = async (data) => {
    setLoading(true);
    const userId = state.facilityModule.selectedFacility._id;
    const employee = user.currentEmployee;
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
        location: parseInt(data.locScore),
        cleaniness: parseInt(data.cleanScore),
        detachedPremise: parseInt(data.detachedScore),
        Parking: parseInt(data.parkingScore),
        emergencyExit: parseInt(data.exitScore),
        directionalSign: parseInt(data.signScore),
        communication: parseInt(data.commScore),
        refuse: parseInt(data.refuseScore),
        water: parseInt(data.waterScore),
        security: parseInt(data.securityScore),
        catering: parseInt(data.cateringScore),
        laundry: parseInt(data.laundryScore),
        fireExtinguisher: parseInt(data.fireScore),
        ambulance: parseInt(data.ambulanceScore),
      },
      frontDeskDetails: {
        receptionSpace: parseInt(data.receptionScore),
        receptioncleaniness: parseInt(data.receptionCleanScore),
        receptionLightScore: parseInt(data.receptionLightScore),
        sittingFacility: parseInt(data.receptionSitScore),
        receptionistAttitude: parseInt(data.receptionStaffScore),
        restRoom: parseInt(data.receptionRestScore),
        waitingRoom: parseInt(data.receptionWaitScore),
        nurseStation: parseInt(data.receptionNurseScore),
        consultationRoom: parseInt(data.consultScore),
        consultationRoomLight: parseInt(data.consultLightScore),
        consultationRoomfac: parseInt(data.consultFacilityScore),
        treatmentRoom: parseInt(data.treatmentScore),
        injectionSafety: parseInt(data.injectionScore),
      },
      casualityDetails: {
        emergencyCasualty: parseInt(data.casualtyScore),
        emergencyEquipment: parseInt(data.casualtyEquipScore),
        oxygenMask: parseInt(data.oxygenScore),
        ngTube: parseInt(data.drugScore),
        examinationCouch: parseInt(data.casualtyExamScore),
        larynoscope: parseInt(data.casualtyLaryScore),
      },
      pharmacyDetails: {
        pharmacy: parseInt(data.pharmacyScore),
        pharmasist: parseInt(data.pharmacyQualScore),
        pharmacyStore: parseInt(data.pharmacyStoreScore),
        pharmacyRange: parseInt(data.pharmacyRangeScore),
        pharmacyReg: parseInt(data.pharmacyRegScore),
      },
      laboratoryDetails: {
        laboratory: parseInt(data.labScore),
        laboratoryTest: parseInt(data.labTestScore),
        laboratorySpecial: parseInt(data.labSpecialScore),
        laboratoryUltra: parseInt(data.labUltraScore),
        laboratoryRad: parseInt(data.labRadScore),
        laboratoryXray: parseInt(data.labContrastScore),
        laboratoryAdav: parseInt(data.labAdvancedScore),
        laboratoryBlood: parseInt(data.labBloodScore),
      },
      wardDetails: {
        ward: parseInt(data.wardScore),
        wardbedStrength: parseInt(data.wardBedScore),
        warbedFac: parseInt(data.wardPrivateScore),
        wardbedClean: parseInt(data.wardCleanScore),
        wardEquipment: parseInt(data.wardEquipScore),
        wardfeatures: parseInt(data.wardFeatureScore),
        wardSpace: parseInt(data.wardSpaceScore),
      },
      labourDetails: {
        labhygiene: parseInt(data.labourScore),
        labExamGlove: parseInt(data.labourFirstScore),
        labManPower: parseInt(data.labourManScore),
        labEquip: parseInt(data.labourEquipScore),
        labultrasound: parseInt(data.labourUltraScore),
        labPadiatics: parseInt(data.labourPadiScore),
        labdeliveryPack: parseInt(data.labourDelScore),
        labdeliveryBed: parseInt(data.labourBedScore),
        labsuction: parseInt(data.labourSuctionScore),
        labresuscitator: parseInt(data.labourResuscitatorScore),
        labOxygen: parseInt(data.labourOxygenScore),
        labBabyCots: parseInt(data.labourBabyScore),
        labBabyIncubator: parseInt(data.labourIncubatorScore),
      },
      theatreDetails: {
        theatre: parseInt(data.theatreScore),
        theatreEquip: parseInt(data.theatreEquipScore),
        theatreAnes: parseInt(data.theatreAnesScore),
        theatreSuction: parseInt(data.theatreSuctionScore),
        theatreRecovery: parseInt(data.theatreRecoveryScore),
        theatreDrum: parseInt(data.theatreDrumScore),
        theatrePack: parseInt(data.theatrePackScore),
        theatreStretch: parseInt(data.theatreStretchScore),
        theatreOxygen: parseInt(data.theatreOxygenScore),
        theatreLaryngoscope: parseInt(data.theatreLaryngoscopeScore),
      },
      additionalDetails: {
        dental: parseInt(data.dentalScore),
        optical: parseInt(data.opticalScore),
        physiotherapy: parseInt(data.Physiotherapy),
        intensiveCare: parseInt(data.intensiveScore),
        mortuary: parseInt(data.mortuaryScore),
      },
      adminDetails: {
        adminRecord: parseInt(data.adminRecordScore),
        adminMedRecord: parseInt(data.adminMedRecordScore),
        adminAccount: parseInt(data.adminAccountScore),
        adminAccountFlow: parseInt(data.adminAccountFlowScore),
        adminInternet: parseInt(data.adminInternetScore),
        adminInternetAval: parseInt(data.adminInternetAvalScore),
        adminTelecom: parseInt(data.adminTelecomScore),
      },
      qualityDetails: {
        qualityOfficer: parseInt(data.qualityOfficerScore),
        qualityClinical: parseInt(data.qualityClinicalScore),
        qualityCase: parseInt(data.qualityCaseScore),
        qualityReferral: parseInt(data.qualityReferralScore),
      },
      otherDetails: {
        otherHmo: parseInt(data.otherHmoScore),
        otherLives: parseInt(data.otherLivesScore),
        otherIndemnity: parseInt(data.otherIndemnityScore),
      },
      staffDetails: {
        staffMedScore: parseInt(data.staffMedScore),
        staffNurseScore: parseInt(data.staffNurseScore),
        staffMidwifeScore: parseInt(data.staffMidwifeScore),
        staffNurseMidScore: parseInt(data.staffNurseMidScore),
        staffChewScore: parseInt(data.staffChewScore),
        staffResidencyScore: parseInt(data.staffResidencyScore),
        staffAuxScore: parseInt(data.staffAuxScore),
        staffPharmScore: parseInt(data.staffPharmScore),
      },
      nonMedicalStaffDetails: {
        nonMedReceptionScore: parseInt(data.nonMedReceptionScore),
        nonMedSecretaryScore: parseInt(data.nonMedSecretaryScore),
        nonMedHmoScore: parseInt(data.nonMedHmoScore),
        nonMedDomesticScore: parseInt(data.nonMedDomesticScore),
        nonMedCleanerScore: parseInt(data.nonMedCleanerScore),
        nonMedCroScore: parseInt(data.nonMedCroScore),
      },
      specialistDetails: {
        specialistOgScore: parseInt(data.specialistOgScore),
        specialistPaedScore: parseInt(data.specialistPaedScore),
        specialistIntScore: parseInt(data.specialistIntScore),
        specialistGenScore: parseInt(data.specialistGenScore),
        specialistOrthoScore: parseInt(data.specialistOrthoScore),
        specialistCardioScore: parseInt(data.specialistCardioScore),
        specialistEntScore: parseInt(data.specialistEntScore),
        specialistNephroScore: parseInt(data.specialistNephroScore),
        specialistNeuroScore: parseInt(data.specialistNeuroScore),
        specialistEndoScore: parseInt(data.specialistEndoScore),
        specialistDermScore: parseInt(data.specialistDermScore),
        specialistPhysioScore: parseInt(data.specialistPhysioScore),
      },
      assessmentDetails: {
        observation: data.observation,
        observerName: data.observername,
        observerDesignation: data.observerdesignation,
        observerPhone: data.observerphone,
        providerName: data.providername,
        providerDesignation: data.providerdesignation,
        providerPhone: data.providerphone,
        observationDate: data.observationdate,
        ReviewName: data.reviewname,
        ReviewOfficer: data.reviewofficername,
        ReviewDate: data.reviewdate,
        approve: data.approve,
        deny: data.deny,
        probation: data.probation,
        summeryDate: data.summerydate,
        completed: data.conpleted,
      },
    };
    const allData = {
      organizationName: facility?.organizationDetail?.facilityName,
      organizationId: facility?.organizationDetail?._id,
      facilityname: facility?.facilityDetail?.facilityName,
      facilityId: facility?.facilityDetail?._id,
      details: [accreditationDetails],
      createdbyName: `${employee.firstname} ${employee.lastname}`,
      createdBy: employee.userId,
      assessmentName: data.assessmentName,
    };

    await accreditationServ
      .create(allData)
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
        toast.success("You've succesfully created a new Assessment");
      })
      .catch((error) => {
        setLoading(false);
        setShowModal(0);
        toast.error(`An error occured whilst creating an Assessment ${error}`);
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
        setGetTotal(1);
        break;
      case 2:
        setShowArray(frontdeskData);
        setGetTotal(2);
        break;
      case 3:
        setShowArray(casualityData);
        setGetTotal(3);
        break;
      case 4:
        setShowArray(pharmacyData);
        setGetTotal(4);
        break;
      case 5:
        setShowArray(laboratoryData);
        setGetTotal(5);
        break;
      case 6:
        setShowArray(wardData);
        setGetTotal(6);
        break;
      case 7:
        setShowArray(labourData);
        setGetTotal(7);
        break;
      case 8:
        setShowArray(theatreData);
        setGetTotal(8);
        break;
      case 9:
        setShowArray(additionalData);
        setGetTotal(9);
        break;
      case 10:
        setShowArray(adminData);
        setGetTotal(10);
        break;
      case 11:
        setShowArray(QualityData);
        setGetTotal(11);
        break;
      case 12:
        setShowArray(otherData);
        setGetTotal(12);
        break;
      case 13:
        setShowArray(staffData);
        setGetTotal(13);
        break;
      case 14:
        setShowArray(nonMedStaff);
        setGetTotal(14);
        break;
      case 15:
        setShowArray(specialistData);
        setGetTotal(15);
        break;
      default:
        setShowArray([]);
    }
  };
  useEffect(() => {
    const generalValue = facility?.details[0]?.generalOutlookDetails;
    const frontDeskValue = facility?.details[0]?.frontDeskDetails;
    const casualityValue = facility?.details[0]?.casualityDetails;
    const pharmacyValue = facility?.details[0]?.pharmacyDetails;
    const laboratoryValue = facility?.details[0]?.laboratoryDetails;
    const wardValue = facility?.details[0]?.wardDetails;
    const labourValue = facility?.details[0]?.labourDetails;
    const theatreValue = facility?.details[0]?.theatreDetails;
    const additionalValue = facility?.details[0]?.additionalDetails;
    const adminValue = facility?.details[0]?.administrationDetails;
    const qualityValue = facility?.details[0]?.qualityDetails;
    const otherValue = facility?.details[0]?.otherDetails;
    const staffValue = facility?.details[0]?.staffDetails;
    const nonMedValue = facility?.details[0]?.nonMedicalStaffDetails;
    const specialistValue = facility?.details[0]?.specialistDetails;
    switch (getTotal) {
      case 1:
        let subToatal =
          generalValue?.location +
          generalValue?.cleaniness +
          generalValue?.detachedPremise +
          generalValue?.Parking +
          generalValue?.emergencyExit +
          generalValue?.directionalSign +
          generalValue?.communication +
          generalValue?.refuse +
          generalValue?.security +
          generalValue?.fireExtinguisher +
          generalValue?.ambulance;
        setSubScore(isNaN(subToatal) ? 0 : subToatal);
        break;
      case 2:
        let subToatal2 =
          frontDeskValue?.receptionSpace +
          frontDeskValue?.receptioncleaniness +
          frontDeskValue?.receptionLightScore +
          frontDeskValue?.sittingFacility +
          frontDeskValue?.receptionistAttitude +
          frontDeskValue?.restRoom +
          frontDeskValue?.waitingRoom +
          frontDeskValue?.nurseStation +
          frontDeskValue?.consultationRoom +
          frontDeskValue?.consultationRoomLight +
          frontDeskValue?.consultationRoomfac +
          frontDeskValue?.treatmentRoom +
          frontDeskValue?.injectionSafety;
        setSubScore(isNaN(subToatal2) ? 0 : subToatal2);
        break;
      case 3:
        let subToatal3 =
          casualityValue?.emergencyCasualty +
          casualityValue?.emergencyEquipment +
          casualityValue?.oxygenMask +
          casualityValue?.ngTube +
          casualityValue?.examinationCouch +
          casualityValue?.larynoscope;
        setSubScore(isNaN(subToatal3) ? 0 : subToatal3);
        break;
      case 4:
        let subToatal4 =
          pharmacyValue?.pharmacy +
          pharmacyValue?.pharmasist +
          pharmacyValue?.pharmacyStore +
          pharmacyValue?.pharmacyRange +
          pharmacyValue?.pharmacyReg;
        setSubScore(isNaN(subToatal4) ? 0 : subToatal4);
        break;
      case 5:
        let subToatal5 =
          laboratoryValue?.laboratory +
          laboratoryValue?.laboratoryTest +
          laboratoryValue?.laboratorySpecial +
          laboratoryValue?.laboratoryUltra +
          laboratoryValue?.laboratoryRad +
          laboratoryValue?.laboratoryXray +
          laboratoryValue?.laboratoryAdav +
          laboratoryValue?.laboratoryBlood;
        setSubScore(isNaN(subToatal5) ? 0 : subToatal5);
        break;
      case 6:
        let subToatal6 =
          wardValue?.ward +
          wardValue?.wardbedStrength +
          wardValue?.warbedFac +
          wardValue?.wardbedClean +
          wardValue?.wardEquipment +
          wardValue?.wardfeatures +
          wardValue?.wardSpace;
        setSubScore(isNaN(subToatal6) ? 0 : subToatal6);
        break;
      case 7:
        let subToatal7 =
          labourValue?.labhygiene +
          labourValue?.labExamGlove +
          labourValue?.labManPower +
          labourValue?.labEquip +
          labourValue?.labultrasound +
          labourValue?.labPadiatics +
          labourValue?.labdeliveryPack +
          labourValue?.labdeliveryBed +
          labourValue?.labsuction +
          labourValue?.labresuscitator +
          labourValue?.labOxygen +
          labourValue?.labBabyCots +
          labourValue?.labBabyIncubator;
        setSubScore(isNaN(subToatal7) ? 0 : subToatal7);
        break;
      case 8:
        let subToatal8 =
          theatreValue?.theatre +
          theatreValue?.theatreAnes +
          theatreValue?.theatreSuction +
          theatreValue?.theatreRecovery +
          theatreValue?.theatreDrum +
          theatreValue?.theatrePack +
          theatreValue?.theatreStretch +
          theatreValue?.theatreOxygen +
          theatreValue?.theatreLaryngoscope;
        setSubScore(isNaN(subToatal8) ? 0 : subToatal8);
        break;
      case 9:
        let subToatal9 =
          additionalValue?.dental +
          additionalValue?.optical +
          additionalValue?.physiotherapy +
          additionalValue?.intensiveCare +
          additionalValue?.mortuary;
        setSubScore(isNaN(subToatal9) ? 0 : subToatal9);
        break;
      case 10:
        let subToatal10 =
          adminValue?.adminRecord +
          adminValue?.adminMedRecord +
          adminValue?.adminAccount +
          adminValue?.adminAccountFlow +
          adminValue?.adminInternet +
          adminValue?.adminInternetAval +
          adminValue?.adminTelecom;
        setSubScore(isNaN(subToatal10) ? 0 : subToatal10);
        break;
      case 11:
        let subToatal11 =
          qualityValue?.qualityOfficer +
          qualityValue?.qualityClinical +
          qualityValue?.qualityCase +
          qualityValue?.qualityReferral;
        setSubScore(isNaN(subToatal11) ? 0 : subToatal11);
        break;
      case 12:
        let subToatal12 =
          otherValue?.otherHmo +
          otherValue?.otherLives +
          otherValue?.otherIndemnity;
        setSubScore(isNaN(subToatal12) ? 0 : subToatal12);
        break;
      case 13:
        let subToatal13 =
          staffValue?.staffMedScore +
          staffValue?.staffNurseScore +
          staffValue?.staffMidwifeScore +
          staffValue?.staffNurseMidScore +
          staffValue?.staffChewScore +
          staffValue?.staffResidencyScore +
          staffValue?.staffAuxScore +
          staffValue?.staffPharmScore;
        setSubScore(isNaN(subToatal13) ? 0 : subToatal13);
        break;
      case 14:
        let subToatal14 =
          nonMedValue?.nonMedReceptionScore +
          nonMedValue?.nonMedSecretaryScore +
          nonMedValue?.nonMedHmoScore +
          nonMedValue?.nonMedDomesticScore +
          nonMedValue?.nonMedCleanerScore +
          nonMedValue?.nonMedCroScore;
        setSubScore(isNaN(subToatal14) ? 0 : subToatal14);
        break;
      case 15:
        let subToatal15 =
          specialistValue?.specialistOgScore +
          specialistValue?.specialistPaedScore +
          specialistValue?.specialistIntScore +
          specialistValue?.specialistGenScore +
          specialistValue?.specialistOrthoScore +
          specialistValue?.specialistCardioScore +
          specialistValue?.specialistEntScore +
          specialistValue?.specialistNephroScore +
          specialistValue?.specialistNeuroScore +
          specialistValue?.specialistEndoScore +
          specialistValue?.specialistDermScore +
          specialistValue?.specialistPhysioScore;
        setSubScore(isNaN(subToatal15) ? 0 : subToatal15);
        break;

      default:
        setSubScore(0);
    }
  }, [getTotal, facility]);

  // };
  console.log(facility, selectedInput, 'subtotal', subScore);
  return (
    <>
      <div
        className="container"
        style={{
          width: '98%',
          margin: '0 1rem',
        }}
      >
        {currentPage === 1 && (
          <>
            <p style={{ fontWeight: '700' }}>
              {facility?.facilityname?.toUpperCase()} - ASSESSMENT /
              CREDENTIALLING FORM (NO..)
            </p>
            <p style={{ fontWeight: '700', marginBottom: '.5rem' }}>
              (PRIVATE SCHEME)
            </p>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <FormsHeaderText text={'PERSONAL DATA'} />
              <Box display="flex" mt={1}>
                <GlobalCustomButton
                  text={'Back'}
                  onClick={() => setShowModal(0)}
                  color="warning"
                  customStyles={{ marginRight: '.8rem' }}
                />
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
            </Box>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} sm={6}>
                <Input
                  label={'ASSESSMENT NAME'}
                  register={register('assessmentName')}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  label={'NAME OF MEDICAL DIRECTOR (MD)'}
                  register={register('nameofmd')}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  label={'MCDN NO'}
                  register={register('mcdnNo')}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  label={'MD PHONE NO'}
                  register={register('mdPhone')}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  label={'SPECIALIZATION'}
                  register={register('specialization')}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  label={'MD EMAIL'}
                  register={register('mdEmail')}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  label={'NAME OF CHIEF MATRON'}
                  register={register('nameofChiefMatron')}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  label={'TEL'}
                  register={register('chiefMatronPhone')}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  label={'NAME OF HMO OFFICER'}
                  register={register('nameofHmoOfficer')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  label={'TEL'}
                  register={register('hmoOfficerPhone')}
                  disabled
                />
              </Grid>
            </Grid>
          </>
        )}
        {currentPage === 2 && (
          <>
            <div
              style={{
                height: '80vh',
                overflowY: 'scroll',
                width: '90%',
                margin: '0 auto',
              }}
            >
              <p style={{ fontWeight: '700' }}>
                {facility?.facilityname?.toUpperCase()} - ASSESSMENT /
                CREDENTIALLING FORM (NO..)
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
                        text={'View'}
                        onClick={() => {
                          setShowScore(index + 1);
                          handleFormToDisplay(item.value);
                        }}
                      />
                    </Box>
                    {showScore === item.value && (
                      <Box
                        sx={{
                          width: '100%',
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
                                sx={{ textAlign: 'center' }}
                              >
                                <input
                                  type="checkbox"
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setEdit(true);
                                      setSelectedInput(item.name);
                                    } else {
                                      // setEdit(false);
                                      // setSelectedInput('');
                                    }
                                  }}
                                  // checked={
                                  //   selectedInput === item.name ? true : false
                                  // }
                                />
                              </Grid>
                              <Grid item xs={12} sm={2}>
                                <Input
                                  label={'Score'}
                                  register={register(`${item.name}`)}
                                  disabled
                                />
                              </Grid>
                            </Grid>
                          </>
                        ))}
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          {/* <GlobalCustomButton
                            text={'Save'}
                            onClick={() => {
                              setShowScore(0);
                              toast.success('Saved');
                            }}
                          /> */}
                          <Box sx={{ display: 'flex', alignItems: 'center ' }}>
                            <FormsHeaderText text="TOTAL SCORE" /> &nbsp; =
                            &nbsp;
                            <p style={{ fontWeight: '700', fontSize: '2rem' }}>
                              {subScore}
                            </p>
                          </Box>
                        </Box>
                      </Box>
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
                height: '90vh',
                overflowY: 'scroll',
                width: '89%',
                margin: '0 auto',
              }}
            >
              <p style={{ fontWeight: '700' }}>
                {facility?.facilityname?.toUpperCase()} - ASSESSMENT /
                CREDENTIALLING FORM (NO..)
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
                        text={'View'}
                        onClick={() => {
                          setShowScore(item.value);
                          handleFormToDisplay(item.value);
                        }}
                      />
                    </Box>

                    {showScore === item.value && (
                      <Box
                        sx={{
                          width: '100%',
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
                                <input
                                  type="checkbox"
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setEdit(true);
                                      setSelectedInput(item.name);
                                    } else {
                                      // setEdit(false);
                                      // setSelectedInput('');
                                    }
                                  }}
                                  // checked={
                                  //   selectedInput === item.name ? true : false
                                  // }
                                />
                              </Grid>
                              <Grid item xs={12} sm={2}>
                                <Input
                                  label={'Score'}
                                  register={register(`${item.name}`)}
                                  disabled
                                />
                              </Grid>
                            </Grid>
                          </>
                        ))}
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          {/* <GlobalCustomButton
                            text={'Save'}
                            onClick={() => {
                              setShowScore(0);
                              toast.success('Saved');
                            }}
                          /> */}
                          <Box sx={{ display: 'flex', alignItems: 'center ' }}>
                            <FormsHeaderText text="TOTAL SCORE" /> &nbsp; =
                            &nbsp;
                            <p style={{ fontWeight: '700', fontSize: '2rem' }}>
                              {subScore}
                            </p>
                          </Box>
                        </Box>
                      </Box>
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

        {/* {showScore === 15 && (
        <>
          <ModalBox open onClose={() => setShowScore(0)} header>
            <Box>
              <Grid container spacing={3} mt={2}>
                <Grid item xs={12} sm={6} md={12}>
                  <McText txt={'FOR OFFICIAL USE'} type={'p'} bold={700} />
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
                  <McText txt={'RECOMMENDATION SUMMARY'} type={'p'} />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={6}>
                  <Input label={'A APRROVE'} register={register('name')} />
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
                  <McText txt={'C. GIVE PROBATION FOR'} type={'p'} />
                  <CustomSelect
                    options={selectdata}
                    register={register('inspectionParameters')}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} mt={1.5}>
                  <BasicDatePicker label={'DATE'} register={register('date')} />
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

              <GlobalCustomButton text={'Save'} onClick={() => {}} />
            </Box>
          </ModalBox>
        </>
      )} */}

        {/* -------------------------------------- */}

        {currentPage === 4 && (
          <>
            <div
              style={{
                height: '85vh',
                overflowY: 'scroll',
                width: '100%',
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
                  <Textarea
                    label={'Observations'}
                    register={register('observation')}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <Input
                    label={'Name'}
                    register={register('observername')}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <Input
                    label={'Designation'}
                    register={register('observerdesignation')}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <Input
                    label={'Phone'}
                    register={register('observerphone')}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <Input
                    label={'Provider Representative Name'}
                    register={register('providername')}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <Input
                    label={'Designation'}
                    register={register('providerdesignation')}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <Input
                    label={'Phone'}
                    register={register('providerphone')}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={6}>
                  <MuiCustomDatePicker
                    label="Date"
                    name="observationdate"
                    control={control}
                    disabled
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3} mt={1}>
                <Grid item xs={12} sm={4} md={12}>
                  <McText txt={'FOR OFFICIAL USE'} type={'p'} bold={700} />
                </Grid>
              </Grid>
              <Grid container spacing={3} mt={1}>
                <Grid item xs={12} sm={4} md={12}>
                  <Textarea
                    label={`Med. Officer's Review of Credentials`}
                    register={register('reviewname')}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={6}>
                  <Input
                    label={'Name of Reviewing Officer'}
                    register={register('reviewofficername')}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={6}>
                  <MuiCustomDatePicker
                    label="Date of Review"
                    name="reviewdate"
                    control={control}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={3} mt={1}>
                <Grid item xs={12} sm={4} md={12}>
                  <McText
                    txt={'RECOMMENDATION SUMMARY'}
                    type={'p'}
                    bold={700}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3} mt={1}>
                <Grid item xs={12} sm={4} md={6}>
                  <Input
                    label={'A Approve'}
                    register={register('approve')}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={6}>
                  <Input
                    label={'B Deny Outrightly'}
                    register={register('deny')}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={6}>
                  <Input
                    label={'C Give Probation For'}
                    register={register('probation')}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={6}>
                  <MuiCustomDatePicker
                    label="Date"
                    name="summerydate"
                    control={control}
                  />
                </Grid>
              </Grid>
              {/* <Box style={{ marginRight: '1rem', fontSize: '.8rem' }}>
                <input
                  type="radio"
                  name="completed"
                  {...register('completed')}
                  onChange={(e) => setCompleted(e.target.checked)}
                  style={{ marginRight: '.5rem' }}
                />
                <label>Self</label>
              </Box> */}
              <GlobalCustomButton
                text={'Close'}
                onClick={() => setShowModal(0)}
                color={'error'}
                customStyles={{ marginRight: '.8rem', marginTop: '1rem' }}
              />
              {/* <GlobalCustomButton
                type={'submit'}
                text={'Submit'}
                onClick={handleSubmit(handleClick)}
                color={'primary'}
                disabled={loading}
              /> */}
            </div>
          </>
        )}

        {/* <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={12}>
          <Button label="Add" type="submit" onClick={handleClick} />
        </Grid>
      </Grid> */}
      </div>
    </>
  );
}
