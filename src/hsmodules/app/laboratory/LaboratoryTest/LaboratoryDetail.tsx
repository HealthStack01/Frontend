import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../../../components/buttons/Button';
import useRepository from '../../../../components/hooks/repository';
import DynamicInput from '../../../../components/inputs/DynamicInput';
import { Models } from '../../Constants';
import {
  BottomWrapper,
  FullDetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';
import { LabResultDetailSchema } from '../schema';

const LaboratoryDetails = ({ row, backClick, onSubmit: _ }) => {
  const [labNote, setLabNote] = useState([]);
  const { user, submit: submitLabNote } = useRepository(Models.LABNOTE);
  const { handleSubmit, control } = useForm({
    defaultValues: row,
  });
  const addNote = (data) => {
    const Id = row.resultDetail._id;
    setLabNote(data);
    let document: any = {};
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName;
    }
    document.documentdetail = labNote;
    submitLabNote({ Id, document });
  };

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Laboratory Details</h2>
            <span>Below are your Laboratory’s details</span>
          </div>
          <div>
            <Button
              label="Back to List"
              background="#fdfdfd"
              color="#333"
              onClick={backClick}
            />
          </div>
        </HeadWrapper>

        <FullDetailsWrapper>
          <form onSubmit={handleSubmit(addNote)}>
            <GridWrapper className="two-columns">
              {LabResultDetailSchema.map((client, index) => (
                <DynamicInput
                  key={index}
                  name={client.key}
                  control={control}
                  label={client.name}
                  inputType={client.inputType}
                  options={client.options || []}
                  data={row}
                />
              ))}
            </GridWrapper>
            <BottomWrapper>
              <Button label="Save" />
            </BottomWrapper>
          </form>
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default LaboratoryDetails;
