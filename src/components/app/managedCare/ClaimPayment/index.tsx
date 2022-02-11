import { useObjectState } from '../../../../context/context';
import ClaimPaymentDetails from './ClaimPaymentDetail';
import ClaimPayments from './ClaimPaymentList';

const AppClaimPayments = () => {
  const { resource, setResource } = useObjectState();

  return (
    <>
      {resource.employeeResource.show === 'lists' && (
        <ClaimPayments
          handleCreate={() =>
            setResource(prevState => ({
              ...prevState,
              employeeResource: {
                ...prevState.employeeResource,
                show: 'create',
              },
            }))
          }
          onRowClicked={(row, _event) => {
            setResource(prevState => ({
              ...prevState,
              employeeResource: {
                show: 'details',
                selectedEmployee: row,
              },
            }));
          }}
        />
      )}

      {resource.employeeResource.show === 'details' && (
        <ClaimPaymentDetails
          row={resource.employeeResource.selectedEmployee}
          backClick={() =>
            setResource(prevState => ({
              ...prevState,
              employeeResource: {
                ...prevState.employeeResource,
                show: 'lists',
              },
            }))
          }
        />
      )}
    </>
  );
};

export default AppClaimPayments;
