/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Route, useNavigate, Link, NavLink } from 'react-router-dom';
import client from '../../feathers';
import { DebounceInput } from 'react-debounce-input';
import { useForm } from 'react-hook-form';
import {
  Box,
  Grid,
  Button as MuiButton,
  IconButton,
  Badge,
} from '@mui/material';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from '../../context';
import { toast } from 'bulma-toast';
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
import DebouncedInput from '../Appointment/ui-components/inputs/DebouncedInput';
import { McText } from './text';
import Input from '../../components/inputs/basic/Input/index';
import ToggleButton from '../../components/toggleButton';
import RadioButton from '../../components/inputs/basic/Radio';
import BasicDatePicker from '../../components/inputs/Date';
import BasicDateTimePicker from '../../components/inputs/DateTime';
import CustomSelect from '../../components/inputs/basic/Select';
import Textarea from '../../components/inputs/basic/Textarea';
import { MdCancel, MdAddCircle } from 'react-icons/md';
import ModalHeader from '../Appointment/ui-components/Heading/modalHeader';
import PatientProfile from '../Client/PatientProfile';
import { FormsHeaderText } from '../../components/texts';
import GlobalCustomButton from '../../components/buttons/CustomButton';
import Drawer from '@mui/material/Drawer';
import ChatInterface from '../../components/chat/ChatInterface';
import CloseIcon from '@mui/icons-material/Close';
import CRMTasks from '../CRM/Tasks';

// eslint-disable-next-line
const searchfacility = {};

export default function ClaimsDetails({ standAlone }) {
  const { state } = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {!standAlone && (
        <>
          <section className="section remPadTop">
            <Details />
          </section>
        </>
      )}
    </>
  );
}

export function Details() {
  const [deny, setDeny] = useState(false);
  const [approve, setApprove] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openClaims, setOpenClaims] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const [unitPrice, setUnitPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedService, setSelectedService] = useState();
  const [showServiceDetails, setShowServiceDetails] = useState(false);
  const navigate = useNavigate();
  const dummyData = [
    {
      item: 'Today',
      submittedQuantity: 1,
      submittedBill: 1000,
      payableQuantity: 1,
      payableBill: 1000,
      comments: 'Inline with agreement',
    },
  ];

  const serviceSchema = [
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
      name: 'item',
      key: 'item',
      description: 'Item',
      selector: (row) => row.item,
      sortable: true,
      inputType: 'TEXT',
    },
    {
      name: 'QTY',
      key: 'submittedQuantity',
      description: 'Submitted QTY',
      selector: (row) => row.submittedQuantity,
      sortable: true,
      inputType: 'TEXT',
    },
    {
      name: 'Submitted Amount',
      key: 'submittedBill',
      description: 'Submitted Bill',
      selector: (row) => row.submittedBill,
      sortable: true,
      inputType: 'TEXT',
    },
    {
      name: 'Payable QTY',
      key: 'payableQuantity',
      description: 'Payable QTY',
      selector: (row) => row.payableQuantity,
      sortable: true,
      inputType: 'TEXT',
    },
    {
      name: 'Payable Amount',
      key: 'payableBill',
      description: 'Payable Bill',
      selector: (row) => row.payableBill,
      sortable: true,
      inputType: 'TEXT',
    },
    {
      name: 'Comments',
      key: 'comments',
      description: 'Comments',
      selector: (row) => row.comments,
      sortable: true,
      inputType: 'TEXT',
    },
    // {
    //   name: '',
    //   key: 'bills',
    //   description: 'Enter Grand Total',
    //   selector: (row) => (
    //     <>
    //       <GlobalCustomButton
    //         sx={{ marginRight: '15px' }}
    //         onClick={() => setOpenReview(true)}
    //       >
    //         Review
    //       </GlobalCustomButton>
    //     </>
    //   ),
    //   sortable: true,
    //   required: true,
    //   inputType: 'BUTTON',
    // },
    // {
    //   name: '',
    //   key: 'bills',
    //   description: 'Enter Grand Total',
    //   selector: (row) => (
    //     <>
    //       <GlobalCustomButton
    //         sx={{ marginRight: '15px' }}
    //         color="error"
    //         onClick={() => setDeny(true)}
    //       >
    //         Reject
    //       </GlobalCustomButton>
    //     </>
    //   ),
    //   sortable: true,
    //   required: true,
    //   inputType: 'BUTTON',
    // },
  ];
  const handleRow = (row) => {
    setSelectedService(row);
    setShowServiceDetails(true);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={3}>
          <PatientProfile />
        </Grid>
        <Grid item md={9}>
          <div
            style={{
              width: '100%',
              height: 'calc(100vh - 90px)',
              overflow: 'scroll',
              paddingRight: '1rem',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box>
                <FormsHeaderText text={'Claim Details - 13322BA'} />
              </Box>
              <Box sx={{ display: 'flex', marginTop: '1rem' }}>
                <GlobalCustomButton
                  onClick={() => setApprove(true)}
                  text="Approve"
                  color="success"
                  customStyles={{ marginRight: '.8rem' }}
                />
                <GlobalCustomButton
                  onClick={() => {}}
                  text="On Hold"
                  color="secondary"
                  customStyles={{ marginRight: '.8rem' }}
                />
                <GlobalCustomButton
                  onClick={() => setDeny(true)}
                  text="Reject"
                  color="error"
                  customStyles={{ marginRight: '.8rem' }}
                />
                <GlobalCustomButton
                  onClick={
                    currentPage === 1
                      ? () => setCurrentPage(2)
                      : () => setCurrentPage(1)
                  }
                  text={currentPage === 1 ? 'Task' : 'Details'}
                  variant="outlined"
                  customStyles={{ marginRight: '.8rem' }}
                />
                <GlobalCustomButton
                  onClick={() => setOpenClaims(true)}
                  text="Assign Claim"
                  color="primary"
                  variant="outlined"
                  customStyles={{ marginRight: '.8rem' }}
                />
                <Badge
                  badgeContent={4}
                  color="success"
                  sx={{ marginRight: '10px' }}
                >
                  <GlobalCustomButton
                    onClick={() => setOpenDrawer(true)}
                    text="Chat"
                    color="primary"
                  />
                </Badge>
                <GlobalCustomButton
                  onClick={() => navigate('/app/managed-care/claims')}
                  text="Back"
                  color="warning"
                />
              </Box>
            </Box>
            {currentPage === 1 && (
              <>
                <p>Request Sent 08/05/2022 9:45pm</p>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <p>Hospital Name: Lagos State Clinic </p>
                  </Grid>
                  <Grid item xs={6}>
                    <p>Health Plan: Former sector plan</p>
                  </Grid>
                  <Grid item xs={6}>
                    <p>Date of Admission: 23/06/2022</p>
                  </Grid>
                  <Grid item xs={6}>
                    <p>Date of Discharge: 23/06/2022</p>
                  </Grid>
                  <Grid item xs={6}>
                    <p>Capitation: Filed</p>
                  </Grid>
                  <Grid item xs={6}>
                    <p>Fee for Service: Applicable</p>
                  </Grid>
                </Grid>
                <McText txt={'Clinical Information'} />
                <Grid container spacing={2} mb={1}>
                  <Grid item xs={12}>
                    <p style={{ fontWeight: 'bold' }}>Presenting Complaints:</p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt
                    </p>
                  </Grid>
                </Grid>

                <McText txt={'Clinical Findings'} />
                <Grid container spacing={2} mb={1}>
                  <Grid item xs={12}>
                    <p style={{ fontWeight: 'bold' }}>Examination Findings:</p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt
                    </p>

                    <p style={{ fontWeight: 'bold' }}>Diagonsis:</p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt
                    </p>
                    <p style={{ fontWeight: 'bold' }}>Investigations:</p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt
                    </p>
                  </Grid>
                  <Grid item xs={4}>
                    <FormsHeaderText text={'Amount'} />
                    <Input value={'10,000'} disabled />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <FormsHeaderText text={'Services / Products'} />
                    <CustomTable
                      title={''}
                      columns={serviceSchema}
                      data={dummyData}
                      pointerOnHover
                      highlightOnHover
                      striped
                      onRowClicked={handleRow}
                      //conditionalRowStyles={conditionalRowStyles}
                    />
                  </Grid>
                </Grid>
              </>
            )}
            {currentPage === 2 && (
              <div style={{ marginTop: '1rem' }}>
                <CRMTasks />
              </div>
            )}
          </div>
        </Grid>
      </Grid>
      {showServiceDetails && (
        <ModalBox
          open={showServiceDetails}
          onClose={() => setShowServiceDetails(false)}
        >
          <Box sx={{ width: '60vw' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
              mb={2}
            >
              <GlobalCustomButton
                sx={{ marginRight: '15px' }}
                onClick={() => setOpenReview(true)}
              >
                Review
              </GlobalCustomButton>
              <GlobalCustomButton
                color="error"
                onClick={() => setDeny(true)}
                sx={{ marginRight: '15px' }}
              >
                Reject
              </GlobalCustomButton>
              <GlobalCustomButton color="success" text={'Save'} />
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Input label={'Item'} value={selectedService?.item} disabled />
              </Grid>
              <Grid item xs={3}>
                <Input
                  label={'QTY'}
                  value={selectedService?.submittedQuantity}
                  disabled
                />
              </Grid>
              <Grid item xs={3}>
                <Input
                  label={'Submitted Amount'}
                  value={selectedService?.submittedBill}
                  disabled
                />
              </Grid>
              <Grid item xs={3}>
                <Input
                  label={'Payable QTY'}
                  value={selectedService?.payableQuantity}
                  disabled
                />
              </Grid>
              <Grid item xs={3}>
                <Input
                  label={'Payable Amount'}
                  value={selectedService?.payableBill}
                  disabled
                />
              </Grid>
              <Grid item xs={3}>
                <Input label={'Comment'} />
              </Grid>
            </Grid>
          </Box>
        </ModalBox>
      )}
      {approve && (
        <>
          <ModalBox open={approve} onClose={() => setApprove(false)}>
            <form>
              <ModalHeader text={`Approve Claim  13229-BA`} />
              <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                  <Textarea label={'Comment'} />
                </Grid>
                <Grid item xs={12}>
                  <GlobalCustomButton text={'Approve'} color="success" />
                </Grid>
              </Grid>
            </form>
          </ModalBox>
        </>
      )}
      {deny && (
        <>
          <ModalBox open={deny} onClose={() => setDeny(false)}>
            <form>
              <ModalHeader text={`Deny Claim  13229-BA`} />

              <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                  <Textarea label={'Comment'} />
                </Grid>
                <Grid item xs={12}>
                  <GlobalCustomButton text={'Reject'} color="error" />
                </Grid>
              </Grid>
            </form>
          </ModalBox>
        </>
      )}
      {openClaims && (
        <>
          <ModalBox open={openClaims} onClose={() => setOpenClaims(false)}>
            <form>
              <FormsHeaderText text={'Assign'} />
              <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                  <RadioButton
                    title="Select User to Assign selected Claim"
                    options={[
                      { label: 'Vetting', value: 'Vetting' },
                      { label: 'Auditing', value: 'AUditing' },
                    ]}
                  />
                </Grid>
                <Grid item xs={12} mb={1}>
                  <CustomSelect
                    label="Select User"
                    options={[
                      { label: 'User 1', value: 'User 1' },
                      { label: 'User 2', value: 'User 2' },
                      { label: 'User 3', value: 'User 3' },
                    ]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ width: '100%' }}>
                    <GlobalCustomButton
                      text={'Assign'}
                      color="success"
                      customStyles={{ marginRight: '.8rem' }}
                    />
                    <GlobalCustomButton text={'Cancel'} color="error" />
                  </Box>
                </Grid>
              </Grid>
            </form>
          </ModalBox>
        </>
      )}
      {openReview && (
        <ModalBox open={openReview} onClose={() => setOpenReview(false)}>
          <FormsHeaderText text={'Review Service / Product'} />
          <Grid container spacing={2} mt={1}>
            <Grid item xs={6}>
              <Input
                label="Unit Price"
                type="number"
                onChange={(e) => {
                  setUnitPrice(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                label="Quantity"
                type="number"
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                label="Total Amount"
                type="number"
                value={unitPrice * quantity}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <GlobalCustomButton
                text={'Save'}
                color="success"
                customStyles={{ marginRight: '.8rem' }}
              />
              <GlobalCustomButton text={'Cancel'} color="error" />
            </Grid>
          </Grid>
        </ModalBox>
      )}
      <Drawer
        open={openDrawer}
        sx={{
          width: 'fit-content',
          height: 'fit-content',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 'fit-content',
            height: 'fit-content',
          },
        }}
        variant="persistent"
        anchor="right"
      >
        <Box
          sx={{
            width: '25vw',
            height: '100vh',
            overflowY: 'hidden',
          }}
        >
          <ChatInterface closeChat={() => setOpenDrawer(false)} />
        </Box>
      </Drawer>
    </>
  );
}
