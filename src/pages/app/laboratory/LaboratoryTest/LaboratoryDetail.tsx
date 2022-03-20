import React from 'react';

import Button from '../../../../components/buttons/Button';
import RadioButton from '../../../../components/inputs/basic/Radio';
import Textarea from '../../../../components/inputs/basic/Textarea';
import { BottomWrapper, FullDetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';

interface Props {
  editBtnClicked?: () => void;
  backClick: () => void;
  row?: any;
}

const LaboratoryDetails: React.FC<Props> = ({ row, backClick }) => {
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Laboratory Details</h2>
            <span>Below are your Laboratory’s details</span>
          </div>
          <div>
            <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
          </div>
        </HeadWrapper>
        <FullDetailsWrapper>
          <GridWrapper className="two-columns">
            <div>
              <label>Client</label>
              <p>{row.client}</p>
            </div>
            <div>
              <label>Test</label>
              <p>{row.test}</p>
            </div>

            <RadioButton
              title="Appointment Schedule"
              options={[
                {
                  value: 'Draft',
                  label: 'draft',
                },
                {
                  value: 'Finals',
                  label: 'final',
                },
              ]}
            />
            <Textarea label="Findings" />
            <Textarea label="Recommendations" />
          </GridWrapper>
          <BottomWrapper>
            <Button label="Save" />
          </BottomWrapper>
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default LaboratoryDetails;
