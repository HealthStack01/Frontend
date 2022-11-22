/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Route, useNavigate, Link, NavLink } from 'react-router-dom';
import client from '../../feathers';
import { DebounceInput } from 'react-debounce-input';
import { useForm } from 'react-hook-form';
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
import { Box, Grid } from '@mui/material';
import DebouncedInput from '../Appointment/ui-components/inputs/DebouncedInput';
import { MdCancel } from 'react-icons/md';
import { ClientSearch } from '../helpers/ClientSearch';
const searchfacility = {};

export default function TarrifList() {
  const { state } = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail
  const [showModal, setShowModal] = useState(false);

  return (
    <section className='section remPadTop'>
      <TariffsList />
    </section>
  );
}

export function TariffCreate({ showModal, setShowModal }) {
  const { state, setState } = useContext(ObjectContext);
  const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [facility, setFacility] = useState();
  const ClientServ = client.service('appointments');
  const { user } = useContext(UserContext); //,setUser
  const [currentUser, setCurrentUser] = useState();
  const [clientId, setClientId] = useState();
  const [chosen, setChosen] = useState();

  const ServicesServ = client.service('billing');
  const BandsServ = client.service('bands');

  useEffect(() => {
    setCurrentUser(user);
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeClient.FacilityId)//
    if (!user.stacker) {
    }
  });

  const submit = async (data, e) => {
    await ServicesServ.create(data)
      .then(res => {
        toast.success(`Tariff successfully created`);

        setLoading(false);
      })
      .catch(err => {
        toast.error(`Sorry, You weren't able to create an tariff. ${err}`);
        setLoading(false);
      });
    setOpen(false);
    setLoading(false);
  };
  const getSearchfacility = obj => {
    setClientId(obj._id);
    setChosen(obj);
    //handleRow(obj)
    if (!obj) {
      //"clear stuff"
      setClientId();
      setChosen();
    }

    /*  setValue("facility", obj._id,  {
            shouldValidate: true,
            shouldDirty: true
        }) */
  };

  useEffect(() => {
    getSearchfacility(state.ClientModule.selectedClient);

    /* appointee=state.ClientModule.selectedClient 
        console.log(appointee.firstname) */
    return () => {};
  }, [state.ClientModule.selectedClient]);

  return (
    <>
      <div className='card '>
        <form onSubmit={handleSubmit(submit)}>
          <ServiceSearch
            getSearchfacility={getSearchfacility}
            clear={success}
          />
          <ServiceSearch
            getSearchfacility={getSearchfacility}
            clear={success}
          />
        </form>
      </div>
    </>
  );
}

export function TariffsList() {
  // const { state, setState } = useContext(ObjectContext);
  // const { user, setUser } = useContext(UserContext);
  // const [showModal, setShowModal] = useState(false);

  const dummyData = [
    {
      SN: '1',
      description: 'Private word per diem',
      category: 'family',
      price: '16,000',
    },
    {
      SN: '1',
      description: 'Private word per diem',
      category: 'family',
      price: '16,000',
    },
    {
      SN: '1',
      description: 'Private word per diem',
      category: 'family',
      price: '16,000',
    },
    {
      SN: '1',
      description: 'Private word per diem',
      category: 'family',
      price: '16,000',
    },
    {
      SN: '1',
      description: 'Private word per diem',
      category: 'family',
      price: '16,000',
    },
    {
      SN: '1',
      description: 'Private word per diem',
      category: 'family',
      price: '16,000',
    },
    {
      SN: '1',
      description: 'Private word per diem',
      category: 'family',
      price: '16,000',
    },
    {
      SN: '1',
      description: 'Private word per diem',
      category: 'family',
      price: '16,000',
    },
  ];

  const preAuthSchema = [
    {
      name: 'S/N',
      key: 'sn',
      description: 'Enter Serial Number',
      selector: (row, i) => i + 1,
      sortable: true,
      required: true,
      inputType: 'HIDDEN',
    },
    {
      name: 'Description',
      key: 'description',
      description: 'Description',
      selector: row => row.description,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Categories',
      key: 'categories',
      description: 'Categories',
      selector: row => row.category,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Price',
      key: 'price',
      description: 'price',
      selector: (row, i) => row.price,
      sortable: true,
      required: true,
      inputType: 'NUMBER',
    },
  ];

  return (
    <>
      {/* <ModalBox
        open={showModal}
        onClose={() => setShowModal(false)}
        width='50vw'
      >
        <TariffCreate />
      </ModalBox> */}
      <div className='level'>
        <PageWrapper
          style={{ flexDirection: 'column', padding: '0.6rem 1rem' }}
        >
          <TableMenu>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h2 style={{ marginLeft: '10px', fontSize: '0.95rem' }}>
                List of Tariffs
              </h2>
            </div>

            <Button
              style={{ fontSize: '14px', fontWeight: '600' }}
              label='Add new '
              onClick={() => setShowModal(true)}
              showicon={true}
            />
          </TableMenu>

          {/* <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
            <CustomTable
              title={''}
              columns={preAuthSchema}
              data={dummyData}
              pointerOnHover
              highlightOnHover
              striped
              // onRowClicked={handleRow}
              // progressPending={loading}
              //conditionalRowStyles={conditionalRowStyles}
            />
          </div> */}
        </PageWrapper>
      </div>
    </>
  );
}
