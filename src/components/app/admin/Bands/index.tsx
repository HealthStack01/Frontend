import { useObjectState } from '../../../../context/context';
import useModelManager from '../../../hooks';
import { Views } from '../../Constants';
import BandCreate from './BandCreate';
import BandDetails from './BandDetail';
import BandList from './BandList';
import BandModify from './BandModify';

function AppBands() {
  const { resource, setResource } = useObjectState();
  const {
    bandResource: { show, selectedBand },
  } = resource;

  const navigate = (show: string) => (selectedBand?: any) =>
    setResource({
      ...resource,
      bandResource: {
        ...resource.bandResource,
        show,
        selectedBand: selectedBand || resource.bandResource.selectedBand,
      },
    });

  const [bands, getBands, handleDelete, handleSubmit] = useModelManager(
    'bands',
    navigate
  );

  return (
    <>
      {show === Views.LIST && (
        <BandList
          handleCreate={navigate(Views.CREATE)}
          onRowClicked={(row) => navigate(Views.DETAIL)(row)}
          handleSearch={getBands}
          items={bands}
        />
      )}
      {show === Views.CREATE && (
        <BandCreate backClick={navigate(Views.LIST)} onSubmit={handleSubmit} />
      )}
      {show === Views.DETAIL && (
        <BandDetails
          row={selectedBand}
          backClick={navigate(Views.LIST)}
          editBtnClicked={() => navigate(Views.EDIT)(selectedBand)}
          handleDelete={() => handleDelete(selectedBand)}
        />
      )}
      {resource.bandResource.show === Views.EDIT && (
        <BandModify
          row={selectedBand}
          backClick={navigate(Views.LIST)}
          cancelEditClicked={navigate(Views.DETAIL)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}

export default AppBands;
