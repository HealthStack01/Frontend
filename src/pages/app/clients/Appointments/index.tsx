import { useEffect, useState } from 'react';

import useRepository from '../../../../components/hooks/repository';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import FormView from '../../generic/FormView';
import { getAppointmentSchema } from '../schema';
import AppointmentDetails from './AppointmentDetail';
import Appointments from './AppointmentList';
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
        selectedAppointment: selectedAppointment?._id
          ? selectedAppointment
          : resource.appointmentResource.selectedAppointment,
      },
    });

  const {
    list: appointments,
    submit: handleSubmit,
    setFindQuery,
    facility,
    remove,
  } = useRepository<any>(Models.APPOINTMENT, handleNavigation);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setFindQuery(
      queryAppointments(undefined, undefined, searchText || undefined),
    );
  }, [searchText]);

  const schema = getAppointmentSchema(facility?._id);
  return (
    <>
      {show === Views.LIST && (
        <Appointments
          handleCreate={handleNavigation(Views.CREATE)}
          onRowClicked={(row) => handleNavigation(Views.DETAIL)(row)}
          onSearch={setSearchText}
          items={appointments}
          schema={schema}
        />
      )}
      {(show === Views.CREATE || show === Views.EDIT) && (
        <FormView
          title="Appointment"
          backClick={handleNavigation(Views.LIST)}
          onSubmit={handleSubmit}
          selectedData={selectedAppointment}
          schema={schema}
          submitBtnCaption="Create Appointment"

        />
      )}
      {show === Views.DETAIL && (
        <AppointmentDetails
          row={selectedAppointment}
          backClick={handleNavigation(Views.LIST)}
          editBtnClicked={() =>
            handleNavigation(Views.EDIT)(selectedAppointment)
          }
          deleteBtnClicked={remove}
          schema={schema}
        />
      )}
    </>
  );
};

export default AppClientAppointment;
