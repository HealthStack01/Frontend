import React, { useContext, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { UserContext } from '../../../../context/context';
import client from '../../../../feathers';
import Button from '../../../buttons/Button';
import Input from '../../../inputs/basic/Input';
import CustomSelect from '../../../inputs/basic/Select';
import {
  BottomWrapper,
  FullDetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';

const clientFormData = [
  {
    title: 'Name of Band',
    name: 'name',
    description: 'Enter name of band',
    required: true,
  },
  {
    title: 'Description of Band',
    name: 'description',
    description: 'Enter description of band',
    required: false,
  },
];

const bandTypes = ['Provider', 'Company', 'Patient', 'Plan'];
interface Props {
  backClick: () => void;
}

const BandCreate: React.FC<Props> = ({ backClick }) => {
  const { handleSubmit, control } = useForm();

  const { user } = useContext(UserContext);
  let BandServ = null;

  const onSubmit = (data) => {
    if (data.bandType === '') {
      alert('Kindly choose band type');
      return;
    }

    if (user.currentEmployee) {
      data.facility = user.currentEmployee.facilityDetail._id; // or from facility dropdown
    }
    BandServ.create(data)
      .then((_) => {
        toast({
          message: 'Band created succesfully',
          type: 'is-success',
          dismissible: true,
          pauseOnHover: true,
        });
        // backClick();
      })
      .catch((err) => {
        backClick();
        toast({
          message: `Error creating Band ${err}`,
          type: 'is-danger',
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  useEffect(() => {
    BandServ = client.service('bands');
    return () => {
      BandServ = null;
    };
  }, [user]);

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Create Band</h2>
            <span>
              Create a New band by filling out the form below to get started.
            </span>
          </div>
          <Button
            label="Back to List"
            background="#fdfdfd"
            color="#333"
            onClick={backClick}
          />
        </HeadWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FullDetailsWrapper title="Create Band">
            <GridWrapper>
              <Controller
                key="bandType"
                name="bandType"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    label="Choose a Band Type"
                    options={bandTypes}
                  />
                )}
              />
              {clientFormData.map((client, index) => (
                <Controller
                  key={index}
                  name={client.name}
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              ))}
            </GridWrapper>
          </FullDetailsWrapper>

          <BottomWrapper>
            <Button label="Clear Form" background="#FFE9E9" color="#ED0423" />
            <Button label="Save Form" type="submit" />
          </BottomWrapper>
        </form>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default BandCreate;
