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

  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={3}>
          <div
            style={{
              backgroundColor: '#EBEBEB',
              height: 'auto',
              borderRadius: '8px',
              marginLeft: '5px',
            }}
          >
            <Grid container spacing={2} mt={1} px={2}>
              <Grid item xs={12} style={{ width: 'fit-content' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{
                      maxWidth: '100px',
                      height: '100px',
                    }}
                  >
                    <img
                      src="/img_avatar.png"
                      alt="avatar"
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </div>
                  <div style={{ marginLeft: '10px' }}>
                    <p style={{ fontWeight: 'bold', margin: 0 }}>
                      Tejiri Tabor
                    </p>
                    <p style={{ fontWeight: 'bold', margin: 0 }}>
                      +2348123456789
                    </p>
                  </div>
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={2} mt={1} px={2}>
              <Grid item xs={12}>
                <p style={{ fontWeight: 'bold' }}>DOB: 23/06/2022</p>
              </Grid>
              <Grid item xs={12}>
                <p style={{ fontWeight: 'bold' }}>Age: 52</p>
              </Grid>
              <Grid item xs={12}>
                <p style={{ fontWeight: 'bold' }}>Gender: Male</p>
              </Grid>
              <Grid item xs={12}>
                <p style={{ fontWeight: 'bold' }}>
                  Hospital Name: Lagos State Clinic{' '}
                </p>
              </Grid>
              <Grid item xs={12}>
                <p style={{ fontWeight: 'bold' }}>
                  Health Plan: Former sector plan
                </p>
              </Grid>
              <Grid item xs={12}>
                <p style={{ fontWeight: 'bold' }}>
                  Date of Admission: 23/06/2022
                </p>
              </Grid>
              <Grid item xs={12}>
                <p style={{ fontWeight: 'bold' }}>
                  Date of Discharge: 23/06/2022
                </p>
              </Grid>
              <Grid item xs={12}>
                <p style={{ fontWeight: 'bold' }}>Capitation: Filed</p>
              </Grid>
              <Grid item xs={12}>
                <p style={{ fontWeight: 'bold' }}>Fee of Service: Filed</p>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item md={9}>
          <div
            style={{
              width: '100%',
              height: 'calc(100vh - 90px)',
              overflow: 'auto',
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
              </Box>
            </Box>

            <p>Request Sent 08/05/2022 9:45pm</p>
            <McText txt={'Clinical Information'} />
            <Grid container spacing={2} mb={1}>
              <Grid item xs={12}>
                <p style={{ fontWeight: 'bold' }}>Presenting Complaints:</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt
                </p>
              </Grid>
            </Grid>

            <McText txt={'Clinical Findings'} />
            <Grid container spacing={2} mb={1}>
              <Grid item xs={12}>
                <p style={{ fontWeight: 'bold' }}>Examination Findings:</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt
                </p>

                <p style={{ fontWeight: 'bold' }}>Diagonsis:</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt
                </p>
                <p style={{ fontWeight: 'bold' }}>Investigations:</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt
                </p>
              </Grid>
            </Grid>

            <McText txt={'Amount'} />
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Input />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <p style={{ fontWeight: 'bold' }}>Reason for Request:</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt
                </p>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <p style={{ fontWeight: 'bold' }}>Physician Name:</p>
                <p>Dr. John Doe</p>
                <p>Lagos State Hospital</p>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
      {approve && (
        <>
          <ModalBox open={approve} onClose={() => setApprove(false)}>
            <form>
              <ModalHeader text={`Approve Claim  13229-BA`} />
              <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                  <Input label={'Name of Referral'} />
                </Grid>
                <Grid item xs={12}>
                  <Input label={'Institution'} />
                </Grid>
                <Grid item xs={12}>
                  <Input label={'Reason'} />
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
                  <Input label={'Name of Referral'} />
                </Grid>
                <Grid item xs={12}>
                  <Input label={'Institution'} />
                </Grid>
                <Grid item xs={12}>
                  <Input label={'Reason'} />
                </Grid>
                <Grid item xs={12}>
                  <GlobalCustomButton text={'Reject'} color="error" />
                </Grid>
              </Grid>
            </form>
          </ModalBox>
        </>
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
