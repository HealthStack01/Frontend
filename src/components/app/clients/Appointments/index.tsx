import { useObjectState } from '../../../../context/context';
import { Views } from '../../Constants';
import AppointmentCreate from './AppointmentCreate';
import AppointmentDetails from './AppointmentDetail';
import Appointments from './AppointmentList';
import AppointmentModify from './AppointmentModify';

const AppClinic = () => {
  const { resource, setResource } = useObjectState();

  const changeView = (show: string, selectedBand?: any) => () =>
    setResource((prevState) => ({
      ...prevState,
      bandResource: {
        ...prevState.bandResource,
        show,
        selectedBand: selectedBand || prevState.bandResource.selectedBand,
      },
    }));

  return (
    <>
      {resource.bandResource.show === Views.LIST && (
        <Appointments
          handleCreate={changeView(Views.CREATE)}
          onRowClicked={(row) => changeView(Views.DETAIL, row)}
        />
      )}
      {resource.bandResource.show === Views.CREATE && (
        <AppointmentCreate backClick={changeView(Views.LIST)} />
      )}
      {resource.bandResource.show === Views.DETAIL && (
        <AppointmentDetails
          row={resource.bandResource.selectedBand}
          backClick={changeView(Views.LIST)}
          editBtnClicked={changeView(Views.EDIT)}
        />
      )}
      {resource.bandResource.show === Views.EDIT && (
        <AppointmentModify
          row={resource.bandResource.selectedBand}
          backClick={changeView(Views.LIST)}
          cancelEditClicked={changeView(Views.DETAIL)}
        />
      )}
    </>
  );
};

export default AppClinic;
