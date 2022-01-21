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
  cancelEditClicked?: () => void;
  row?: any;
  backClick: () => void;
}

const BandModify: React.FC<Props> = ({
  cancelEditClicked,
  row: band,
  backClick,
}) => {
  let BandServ = null;
  const { handleSubmit, control } = useForm({
    defaultValues: band,
  });
  const { user } = useContext(UserContext);

  const onSubmit = (data, _) => {
    data.facility = band.facility;
    BandServ.patch(band._id, data)
      .then(() => {
        toast('Band updated succesfully');

        backClick();
      })
      .catch((err) => {
        toast(`Error updating Band, probable network issues or ' + ${err}`);
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
            <h2>Band Details</h2>
            <span>Below are your band’s details</span>
          </div>
          <div>
            <Button
              label="Back to List"
              background="#fdfdfd"
              color="#333"
              onClick={backClick}
            />
            <Button
              label="Cancel Editing"
              background="#f2f2f2"
              color="#333"
              showicon
              icon="bi bi-pen-fill"
              onClick={cancelEditClicked}
            />
          </div>
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

export default BandModify;
