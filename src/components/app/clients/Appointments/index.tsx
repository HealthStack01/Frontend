import { useObjectState } from '../../../../context/context';
import useModelManager from '../../../hooks';
import { Views } from '../../Constants';
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

  const [appointments, getAppointments, handleDelete, handleSubmit] =
    useModelManager('appointments', navigate);

  return (
    <>
      {resource.appointmentResource.show === Views.LIST && (
        <Appointments
          handleCreate={navigate(Views.CREATE)}
          onRowClicked={(row) => navigate(Views.DETAIL)(row)}
          handleSearch={getAppointments}
          items={appointments}
        />
      )}
      {resource.appointmentResource.show === Views.CREATE && (
        <AppointmentCreate
          backClick={navigate(Views.LIST)}
          onSubmit={handleSubmit}
        />
      )}
      {resource.appointmentResource.show === Views.DETAIL && (
        <AppointmentDetails
          row={selectedAppointment}
          backClick={navigate(Views.LIST)}
          editBtnClicked={() => navigate(Views.EDIT)(selectedAppointment)}
          handleDelete={() => handleDelete(selectedAppointment)}
        />
      )}
      {resource.appointmentResource.show === Views.EDIT && (
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
