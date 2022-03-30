import { useEffect, useState } from 'react';

import useRepository from '../../../../components/hooks/repository';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import AppointmentCreate from './AppointmentCreate';
import AppointmentDetails from './AppointmentDetail';
import Appointments from './AppointmentList';
import AppointmentModify from './AppointmentModify';
import { queryAppointments } from './query';

const AppClientAppointment = () => {
  const { resource, setResource } = useObjectState();
  const {
    appointmentResource: { show, selectedAppointment },
  } = resource;

  const handleNavigation = (show: string) => (selectedAppointment?: any) =>
    setResource({
      ...resource,
      appointmentResource: {
        ...resource.appointmentResource,
        show,
        selectedAppointment: selectedAppointment || resource.appointmentResource.selectedAppointment,
      },
    });

  const {
    list: appointments,
    submit: handleSubmit,
    setFindQuery,
  } = useRepository(Models.APPOINTMENT, handleNavigation);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setFindQuery(queryAppointments(undefined, undefined, searchText || undefined));
  }, [searchText]);

  return (
    <>
      {show === Views.LIST && (
        <Appointments
          handleCreate={handleNavigation(Views.CREATE)}
          onRowClicked={(row) => handleNavigation(Views.DETAIL)(row)}
          onSearch={setSearchText}
          items={appointments}
        />
      )}
      {show === Views.CREATE && <AppointmentCreate backClick={handleNavigation(Views.LIST)} onSubmit={handleSubmit} />}
      {show === Views.DETAIL && (
        <AppointmentDetails
          row={selectedAppointment}
          backClick={handleNavigation(Views.LIST)}
          editBtnClicked={() => handleNavigation(Views.EDIT)(selectedAppointment)}
          deleteBtnClicked={() => {}}
        />
      )}
      {show === Views.EDIT && (
        <AppointmentModify
          row={selectedAppointment}
          backClick={handleNavigation(Views.LIST)}
          cancelEditClicked={handleNavigation(Views.DETAIL)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default AppClientAppointment;
