import React from 'react';

import Button from '../../../../components/buttons/Button';
import DynamicFieldView from '../../../../components/inputs/DynamicFieldView';
import {
  FullDetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';
import { SubmissionSchema } from '../schema';
import SubmissionLine from './SubmissionLine';

const SubmissionDetails = ({ onEdit, onDelete, row, backClick }) => {
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Submission Details</h2>
            <span>Below are your Submission’s details</span>
          </div>
          <div>
            <Button
              label="Back to List"
              background="#fdfdfd"
              color="#333"
              onClick={backClick}
            />
            <Button
              label={'Delete'}
              background="#FFE9E9"
              color="#ED0423"
              showicon={true}
              icon="bi bi-pen-fill"
              onClick={onDelete}
            />
            <Button
              label={'Edit Details'}
              background={'#ECF3FF'}
              color="#0364FF"
              showicon={true}
              icon="bi bi-pen-fill"
              onClick={onEdit}
            />
          </div>
        </HeadWrapper>
        <FullDetailsWrapper>
          <GridWrapper>
            {SubmissionSchema.map((field) => (
              <DynamicFieldView field={field} data={row} />
            ))}
          </GridWrapper>
          {'Submitted Fields'}
          <GridWrapper>
            {row.interactions.map((interaction) => (
              <SubmissionLine control={undefined} interaction={interaction} />
            ))}
          </GridWrapper>
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default SubmissionDetails;
