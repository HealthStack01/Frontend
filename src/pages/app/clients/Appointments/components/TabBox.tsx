import { Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';

import Button from '../../../../../components/buttons/Button';
import DnDBox from '../../../../../components/dnd';
import { ButtonGroup, ContentWrapper, CustomTab, CustomTabs } from '../../../../../ui/styled/global';
import { LaboratorySchema, PrescriptionSchema } from '../../../schema';
import { GrayWrapper } from '../../../styles';
import Orders from './Orders';
import TabOverview from './TabOverview';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TabBox = ({
  handleClick,
  anchorEl,
  openBtn,
  handleCloseMenu,
  handleMenuClick,
  documentTypes,
  documentations,
  prescriptions,
  tests,
  onNewDocument,
  onOpenTelemedicine,
  onEndEncounter,
}) => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <>
      <ContentWrapper>
        <div>
          <CustomTabs value={currentTab} onChange={handleChangeTab} aria-label="basic tabs example">
            <CustomTab label="Overview" {...a11yProps(0)} />
            <CustomTab label="Lab Orders" {...a11yProps(1)} />
            <CustomTab label="Prescriptions" {...a11yProps(2)} />
            <CustomTab label="Radiology" {...a11yProps(3)} />
          </CustomTabs>
        </div>
        <ButtonGroup>
          <Button label="End Encounter" background="#FFE9E9" color="#ED0423" onClick={onEndEncounter} />
          <Button
            label={'Start or Join Teleconsultation'}
            background={'#04ed7c'}
            color={'#fff'}
            onClick={onOpenTelemedicine}
          />

          <Button label={'New Documentation'} background="#Fafafa" color="#222" showicon={true} onClick={handleClick} />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            aria-haspopup="true"
            aria-expanded={openBtn ? 'true' : undefined}
            open={openBtn}
            onClose={handleCloseMenu}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            sx={{ boxShadow: '10px 10px 0 rgba(0,0,0,0.08)' }}
          >
            {documentTypes.map((doc, i) => {
              const docName = doc;
              return (
                <li key={i} onClick={handleMenuClick}>
                  <MenuItem onClick={() => onNewDocument(docName)} key={i}>
                    {docName}
                  </MenuItem>
                </li>
              );
            })}
          </Menu>
        </ButtonGroup>
      </ContentWrapper>
      <GrayWrapper style={{}}>
        <TabPanel value={currentTab} index={0}>
          <TabOverview
            documentations={documentations}
            onNewLabOrder={() => onNewDocument('Lab Order')}
            onNewPrescription={() => onNewDocument('Prescription')}
          />
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <Orders onAddNew={() => onNewDocument('Lab Order')} schema={LaboratorySchema} data={tests} />
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
          <Orders onAddNew={() => onNewDocument('Prescription')} schema={PrescriptionSchema} data={prescriptions} />
        </TabPanel>
        <TabPanel value={currentTab} index={3}>
          <DnDBox questions={[]} onChange={() => {}} />
        </TabPanel>
      </GrayWrapper>
    </>
  );
};

export default TabBox;
