import { Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';

import Button from '../../../../../components/buttons/Button';
import {
  ButtonGroup,
  ContentWrapper,
  CustomTab,
  CustomTabs,
} from '../../../../../ui/styled/global';
import {
  LaboratorySchema,
  PrescriptionSchema,
  RadiologySchema,
} from '../../../clinic/schema';
import { GrayWrapper } from '../../../styles';
import EndEncounter from './EndEncounter';
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
  documentTypes,
  documentations,
  prescriptions,
  radiologyTests,
  laboratoryTests,
  onNewDocument,
  onOpenTelemedicine,
  onEndEncounter,
}) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [openMenu, setOpenMenu] = useState<any>(null);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleCloseMenu = () => {
    setOpenMenu(null);
  };

  return (
    <>
      <ContentWrapper>
        <div>
          <CustomTabs
            value={currentTab}
            onChange={handleChangeTab}
            aria-label="basic tabs example"
          >
            <CustomTab label="Documentations" {...a11yProps(0)} />
            <CustomTab label="Lab Orders" {...a11yProps(1)} />
            <CustomTab label="Prescriptions" {...a11yProps(2)} />
            <CustomTab label="Radiology" {...a11yProps(3)} />
          </CustomTabs>
        </div>
        <ButtonGroup>
          <EndEncounter onEndEncounter={onEndEncounter} />
          <Button
            label={'Start or Join Teleconsultation'}
            background={'#04ed7c'}
            color={'#fff'}
            onClick={onOpenTelemedicine}
          />
          <Button
            label={'New Documentation'}
            background="#Fafafa"
            color="#222"
            showicon={true}
            onClick={(e) => setOpenMenu(e.currentTarget)}
          />
          <Menu
            id="basic-menu"
            anchorEl={openMenu}
            aria-haspopup="true"
            aria-expanded={openMenu ? 'true' : undefined}
            open={!!openMenu}
            onClose={handleCloseMenu}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            sx={{ boxShadow: '10px 10px 0 rgba(0,0,0,0.08)' }}
          >
            {documentTypes.map((doc, i) => {
              const docName = doc;
              return (
                <MenuItem
                  onClick={() => {
                    onNewDocument(docName);
                    setOpenMenu(null);
                  }}
                  key={i}
                >
                  {docName}
                </MenuItem>
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
          <Orders
            onAddNew={() => onNewDocument('Lab Order')}
            schema={LaboratorySchema}
            data={laboratoryTests}
          />
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
          <Orders
            onAddNew={() => onNewDocument('Prescription')}
            schema={PrescriptionSchema}
            data={prescriptions}
          />
        </TabPanel>
        <TabPanel value={currentTab} index={3}>
          <Orders
            onAddNew={() => onNewDocument('Radiology')}
            schema={RadiologySchema}
            data={radiologyTests}
          />
        </TabPanel>
      </GrayWrapper>
    </>
  );
};

export default TabBox;
