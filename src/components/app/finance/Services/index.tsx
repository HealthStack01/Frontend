import { useObjectState } from '../../../../context/context';
import ServiceCreate from './ServiceCreate';
import ServiceDetails from './ServiceDetail';
import Servicess from './ServiceList';
import ServiceModify from './ServiceModify';

const AppServices = () => {
  const { resource, setResource } = useObjectState();

  return (
    <>
      {resource.servicesResource.show === 'lists' && (
        <Servicess
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
        <ServiceCreate
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
        <ServiceDetails
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
        <ServiceModify
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

export default AppServices;
