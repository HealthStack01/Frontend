import React from 'react';

import Button from '../../../components/buttons/Button';
import { ButtonGroup } from '../../../ui/styled/global';
import {
  FullDetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../styles';
import ItemsInput from './ItemsInput';

interface Props {
  title: string;
  onEdit: () => void;
  onDelete: () => void;
  backClick: () => void;
  schema: any;
  value?: any;
  children?: React.ReactNode | undefined;
}

const DetailView: React.FC<Props> = ({
  title,
  onEdit,
  onDelete,
  schema,
  value,
  backClick,
  children,
}) => {
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>{title} Details</h2>
            <span>Below are your {title}’s details</span>
          </div>
          <ButtonGroup>
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
          </ButtonGroup>
        </HeadWrapper>
        <FullDetailsWrapper>
          {schema.map((schema) =>
            schema.schema && schema.selector ? (
              <ItemsInput
                label={schema.name}
                readonly={true}
                schema={schema}
                defaultValue={schema.selector(value, true)}
                name={schema.key}
                onChange={() => {}}
              />
            ) : (
              <GridWrapper>
                <div key={schema.key}>
                  <label>{schema.name}</label>
                  <p>
                    {schema.selector
                      ? schema.selector(value)
                      : value[schema.key]}
                  </p>
                </div>
              </GridWrapper>
            ),
          )}
          {children}
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default DetailView;
