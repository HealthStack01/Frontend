import { useObjectState } from '../../../../context/context';
import useRepository from '../../../hooks';
import { Models, Views } from '../../Constants';
import AppointmentCreate from './AppointmentCreate';
import AppointmentDetails from './AppointmentDetail';
import Appointments from './AppointmentList';
import AppointmentModify from './AppointmentModify';

const AppClinic = () => {
  const { resource, setResource } = useObjectState();
  const {
    appointmentResource: { show, selectedAppointment },
  } = resource;

  const navigate = (show: string) => (selectedAppointment?: any) =>
    setResource({
      ...resource,
      appointmentResource: {
        ...resource.appointmentResource,
        show,
        selectedAppointment:
          selectedAppointment ||
          resource.appointmentResource.selectedAppointment,
      },
    });

  const {
    list: appointments,
    find: getAppointments,
    submit: handleSubmit,
  } = useRepository(Models.APPOINTMENT, navigate);

  return (
    <>
      {show === Views.LIST && (
        <Appointments
          handleCreate={navigate(Views.CREATE)}
          onRowClicked={(row) => navigate(Views.DETAIL)(row)}
          handleSearch={getAppointments}
          items={appointments}
        />
      )}
      {show === Views.CREATE && (
        <AppointmentCreate
          backClick={navigate(Views.LIST)}
          onSubmit={handleSubmit}
        />
      )}
      {show === Views.DETAIL && (
        <AppointmentDetails
          row={selectedAppointment}
          backClick={navigate(Views.LIST)}
          editBtnClicked={() => navigate(Views.EDIT)(selectedAppointment)}
        />
      )}
      {show === Views.EDIT && (
        <AppointmentModify
          row={selectedAppointment}
          backClick={navigate(Views.LIST)}
          cancelEditClicked={navigate(Views.DETAIL)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default AppClinic;
