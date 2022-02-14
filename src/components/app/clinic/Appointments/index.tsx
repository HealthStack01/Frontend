import { useObjectState } from '../../../../context/context';
import AppointmentCreate from './AppointmentCreate';
import AppointmentDetails from './AppointmentDetail';
import Appointments from './AppointmentList';
import AppointmentModify from './AppointmentModify';

const AppAppointment = () => {
  const { resource, setResource } = useObjectState();

  return (
    <>
      {resource.servicesResource.show === 'lists' && (
        <Appointments
          handleCreate={() =>
            setResource((prevState) => ({
              ...prevState,
              servicesResource: {
                ...prevState.servicesResource,
                show: 'create',
              },
            }))
          }
          onRowClicked={(row) => {
            setResource((prevState) => ({
              ...prevState,
              servicesResource: {
                show: 'details',
                selectedService: row,
              },
            }));
          }}
        />
      )}
      {resource.servicesResource.show === 'create' && (
        <AppointmentCreate
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              servicesResource: {
                ...prevState.servicesResource,
                show: 'lists',
              },
            }))
          }
        />
      )}
      {resource.servicesResource.show === 'details' && (
        <AppointmentDetails
          row={resource.servicesResource.selectedService}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              servicesResource: {
                ...prevState.servicesResource,
                show: 'lists',
              },
            }))
          }
          editBtnClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              servicesResource: {
                ...prevState.servicesResource,
                show: 'edit',
              },
            }))
          }
        />
      )}
      {resource.servicesResource.show === 'edit' && (
        <AppointmentModify
          row={resource.servicesResource.selectedService}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              servicesResource: {
                ...prevState.servicesResource,
                show: 'lists',
              },
            }))
          }
          cancelEditClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              servicesResource: {
                ...prevState.servicesResource,
                show: 'details',
              },
            }))
          }
        />
      )}
    </>
  );
};

export default AppAppointment;
