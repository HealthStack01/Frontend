import React, { useState } from 'react';

import Document from '../../../utilities/AttendContent/FormBox';
import InfoBox from '../../../utilities/AttendContent/InfoBox';
import TabBox from '../../../utilities/AttendContent/TabBox';
import UserBox from '../../../utilities/AttendContent/UserBox';
import { FullDetailsWrapper, PageWrapper } from '../../styles';
import { recentData } from './data';

interface Props {
  editBtnClicked?: () => void;
  backClick: () => void;
  row?: any;
}

const documents = [
  'Clinical Note',
  'Lab Result',
  'Doctor Note',
  'Nursing Note',
  'Vital Signs',
  'Progress Note',
];

const Attend: React.FC<Props> = ({ row, backClick }) => {
  const [valueTab, setValueTab] = useState(0);

  const [open, setOpen] = useState(false);
  const [openTel, setOpenTel] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openBtn = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const onChange = (event: React.SyntheticEvent, newValue: number) => {
    setValueTab(newValue);
  };

  return (
    <PageWrapper className="attend-wrapper">
      <UserBox />
      <FullDetailsWrapper className="attend attend-large">
        {openTel && <iframe width="100%" />}
        <TabBox
          valueTab={valueTab}
          onChange={onChange}
          handleClick={handleClick}
          anchorEl={anchorEl}
          openBtn={openBtn}
          handleCloseMenu={handleCloseMenu}
          recentData={recentData}
          handleMenuClick={() => {
            setOpen(true);
          }}
          onNewPrescription={() => {
            setOpen(true);
          }}
          onNewLabOrder={() => {
            setOpen(true);
          }}
          documents={documents}
          onOpenTelemedicine={() => setOpenTel(!openTel)}
        />
      </FullDetailsWrapper>
      {open && (
        <FullDetailsWrapper className="attend attend-medium">
          <Document onClick={() => setOpen(false)} />
        </FullDetailsWrapper>
      )}
    </PageWrapper>
  );
};

export default Attend;
