import React from 'react';

import Button from '../../../buttons/Button';
import { LocationSchema } from '../../schema/ModelSchema';
import {
  FullDetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';

interface Props {
  editBtnClicked?: () => void;
  backClick: () => void;
  handleDelete: (_event) => void;
  row?: any;
}

const LocationDetails: React.FC<Props> = ({
  editBtnClicked,
  row,
  backClick,
  handleDelete,
}) => (
  <PageWrapper>
    <GrayWrapper>
      <HeadWrapper>
        <div>
          <h2>Location Details</h2>
          <span>Below are your Location details</span>
        </div>
        <div>
          <Button
            label="Back to List"
            background="#fdfdfd"
            color="#333"
            onClick={backClick}
          />
          <Button
            label="Delete"
            background="#FFE9E9"
            color="#ED0423"
            showicon
            icon="bi bi-pen-fill"
            onClick={handleDelete}
          />
          <Button
            label="Edit Details"
            background="#ECF3FF"
            color="#0364FF"
            showicon
            icon="bi bi-pen-fill"
            onClick={editBtnClicked}
          />
        </div>
      </HeadWrapper>
      <FullDetailsWrapper>
        <GridWrapper>
          {LocationSchema.map((schema) => (
            <div>
              <label>{schema.name}</label>
              <p>{schema.selector(row)}</p>
            </div>
          ))}
        </GridWrapper>
      </FullDetailsWrapper>
    </GrayWrapper>
  </PageWrapper>
);

export default LocationDetails;
