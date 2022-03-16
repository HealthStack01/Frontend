import { useObjectState } from '../../../../context/context';
import InputFields from './InputList';

const AppInput = () => {
  const { resource, setResource } = useObjectState();

  return (
    <>
      {resource.employeeResource.show === 'lists' && (
        <InputFields
          handleCreate={() =>
            setResource((prevState) => ({
              ...prevState,
              employeeResource: {
                ...prevState.employeeResource,
                show: 'create',
              },
            }))
          }
          onRowClicked={(row) => {
            setResource((prevState) => ({
              ...prevState,
              employeeResource: {
                show: 'details',
                selectedEmployee: row,
              },
            }));
          }}
        />
      )}
    </>
  );
};

export default AppInput;
