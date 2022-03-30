import React from 'react';

import Button from '../../../components/buttons/Button';
import { ButtonGroup } from '../../../ui/styled/global';
import { PageWrapper } from '../../../ui/styled/styles';
import { FullDetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper } from '../styles';

interface Props {
  title: string;
  onEdit: () => void;
  onDelete: () => void;
  backClick: () => void;
  schema: any;
  value?: any;
}

const DetailView: React.FC<Props> = ({ title, onEdit, onDelete, schema, value, backClick }) => {
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>{title} Details</h2>
            <span>Below are your {title}’s details</span>
          </div>
          <ButtonGroup>
            <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
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
          </ButtonGroup>
        </HeadWrapper>
        <FullDetailsWrapper>
          <GridWrapper>
            {schema.map((schema) => (
              <div key={schema.key}>
                <label>{schema.name}</label>
                <p>{schema.selector(value)}</p>
              </div>
            ))}
          </GridWrapper>
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default DetailView;
