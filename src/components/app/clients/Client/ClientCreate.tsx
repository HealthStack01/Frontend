import React, { useState } from 'react';

import Button from '../../../buttons/Button';
import { GrayWrapper, HeadWrapper, PageWrapper } from '../../styles';

import ClientQuickForm from './ClientQuickForm'
// import ClientFullForm from './ClientFullForm'


interface Props {
  backClick: () => void;
  onSubmit: (_) => void;
}


const ClientCreate: React.FC<Props> = ({ backClick, onSubmit }) => {
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Create Client</h2>
            <span>
              Create a New Client by filling out the form below to get started.
            </span>
          </div>
          <Button
            label='Back to List'
            background='#fdfdfd'
            color='#333'
            onClick={backClick}
          />
        </HeadWrapper>
        <ClientQuickForm backClick ={backClick} onSubmit ={onSubmit} />
        {/* <ClientFullForm backClick ={backClick} onSubmit ={onSubmit} /> */}
      </GrayWrapper>
    </PageWrapper>
  );
};

export default ClientCreate;
