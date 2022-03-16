import { useObjectState } from '../../../../context/context';
import InputFields from './InputList';

const AppInput = () => {
  const { resource } = useObjectState();

  return <>{resource.employeeResource.show === 'lists' && <InputFields />}</>;
};

export default AppInput;
