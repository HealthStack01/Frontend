import React, { useState } from 'react';

import Button from '../../../buttons/Button';
import Input from '../../../inputs/basic/Input';
import CustomSelect from '../../../inputs/basic/Select';
import Textarea from '../../../inputs/basic/Textarea';
import {
  BottomWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';

interface Props {
  cancelEditClicked?: () => void;
  row?: any;
  backClick: () => void;
}

const ClientModify: React.FC<Props> = ({
  cancelEditClicked,
  row,
  backClick,
}) => {
  const [values, setValue] = useState({});

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Client Details</h2>
            <span>Below are your Client’s details</span>
          </div>
          <div>
            <Button
              label='Back to List'
              background='#fdfdfd'
              color='#333'
              onClick={backClick}
            />
            <Button
              label={'Cancel Editing'}
              background={'#f2f2f2'}
              color={'#333'}
              showicon={true}
              icon='bi bi-pen-fill'
              onClick={cancelEditClicked}
            />
          </div>
        </HeadWrapper>
        <GridWrapper>
          <Input label='ID' value={row.id} disabled />

          <Input
            label='First Name'
            value={row.fname}
            onChange={e =>
              setValue({ ...values, [e.target.name]: e.target.value })
            }
          />
          <Input
            label='Last Name'
            value={row.lname}
            onChange={e =>
              setValue({ ...values, [e.target.name]: e.target.value })
            }
          />
          <Input
            label='Middle Name'
            value={row.lname}
            onChange={e =>
              setValue({ ...values, [e.target.name]: e.target.value })
            }
          />
          <Input
            label='Age'
            value={row.age}
            onChange={e =>
              setValue({ ...values, [e.target.name]: e.target.value })
            }
          />
          <CustomSelect
            label='Gender'
            value={row.gender}
            onChange={e =>
              setValue({ ...values, [e.target.name]: e.target.value })
            }
            options={['Male', 'Female']}
          />
          <Input
            label='Phone'
            value={row.phone}
            onChange={e =>
              setValue({ ...values, [e.target.name]: e.target.value })
            }
          />
          <Input
            label='Email'
            value={row.email}
            onChange={e =>
              setValue({ ...values, [e.target.name]: e.target.value })
            }
          />
          <Input
            label='Marital Status'
            value={row.maritalStatus}
            onChange={e =>
              setValue({ ...values, [e.target.name]: e.target.value })
            }
          />
          <Input
            label='Religion'
            value={row.religion}
            onChange={e =>
              setValue({ ...values, [e.target.name]: e.target.value })
            }
          />
          <Input
            label='Medical Records'
            value={row.medicalRecord}
            onChange={e =>
              setValue({ ...values, [e.target.name]: e.target.value })
            }
          />
          <Input
            label='Profession'
            value={row.profession}
            onChange={e =>
              setValue({ ...values, [e.target.name]: e.target.value })
            }
          />
          <Input
            label='Country'
            value={row.country}
            onChange={e =>
              setValue({ ...values, [e.target.name]: e.target.value })
            }
          />
          <Input
            label='State'
            value={row.state}
            onChange={e =>
              setValue({ ...values, [e.target.name]: e.target.value })
            }
          />
          <Input
            label='Local Government Area'
            value={row.LGA}
            onChange={e =>
              setValue({ ...values, [e.target.name]: e.target.value })
            }
          />
          <Input
            label='Town/City'
            value={row.townCity}
            onChange={e =>
              setValue({ ...values, [e.target.name]: e.target.value })
            }
          />
          <Textarea
            label='Description'
            value={row.specificDetails}
            onChange={e =>
              setValue({ ...values, [e.target.name]: e.target.value })
            }
          />
        </GridWrapper>

        <BottomWrapper>
          <Button label='Delete Band' background='#FFE9E9' color='#ED0423' />
          <Button label='Save Band' />
        </BottomWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default ClientModify;
