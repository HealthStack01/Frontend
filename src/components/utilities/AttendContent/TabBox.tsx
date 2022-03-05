import { Menu, MenuItem } from '@mui/material';
import React from 'react';

import { useObjectState } from '../../../context/context';
import { ButtonGroup, CustomTab, CustomTabs, TableMenu } from '../../../styles/global';
import { columnLab, labData } from '../../app/clients/Appointments/data';
import { DetailsWrapper, GrayWrapper } from '../../app/styles';
import Button from '../../buttons/Button';
import CustomTable from '../../customtable';
import DnDBox from '../../dnd';
import Input from '../../inputs/basic/Input';
import Orders from './Orders';

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
  valueTab,
  onChange,
  handleClick,
  anchorEl,
  openBtn,
  handleCloseMenu,
  recentData,
  handleMenuClick,
  documents,
  onNewPrescription,
  onNewLabOrder,
}) => {
  const { setResource } = useObjectState();
  return (
    <>
      <div
        style={{
          background: '#fff',
          border: ' 0.1px solid #eee',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <CustomTabs value={valueTab} onChange={onChange} aria-label="basic tabs example">
            <CustomTab label="Overview" {...a11yProps(0)} />
            <CustomTab label="Lab Orders" {...a11yProps(1)} />
            <CustomTab label="Prescriptions" {...a11yProps(2)} />
            <CustomTab label="Radiology" {...a11yProps(3)} />
          </CustomTabs>
        </div>
        <ButtonGroup>
          <Button label="End Encounter" background="#FFE9E9" color="#ED0423" />

          <Button label={'Documentation'} background="#Fafafa" color="#222" showicon={true} onClick={handleClick} />
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
            {documents.map((doc, i) => {
              const docName = doc;
              return (
                <>
                  <li onClick={handleMenuClick}>
                    <MenuItem
                      onClick={() => {
                        setResource((prevState) => ({
                          ...prevState,
                          selectedDocumentation: docName,
                        }));
                      }}
                      key={i}
                    >
                      {docName}
                    </MenuItem>
                  </li>
                </>
              );
            })}
          </Menu>
        </ButtonGroup>
      </div>
      <GrayWrapper style={{ marginTop: '10px' }}>
        <TabPanel value={valueTab} index={0}>
          <TableMenu>
            <div
              className="inner-table"
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '40px',
              }}
            >
              <Input placeholder="Search here" label="Search here" size="small" />
            </div>
            <ButtonGroup>
              <Button
                background="#Fafafa"
                color="#222"
                showicon={true}
                onClick={() => {
                  setResource((prevState) => ({
                    ...prevState,
                    selectedDocumentation: 'Prescription',
                  }));
                  onNewPrescription();
                }}
              >
                <i className="bi bi-plus-circle"></i> New Prescription
              </Button>
              <Button
                background="#Fafafa"
                color="#222"
                showicon={true}
                onClick={() => {
                  setResource((prevState) => ({
                    ...prevState,
                    selectedDocumentation: 'Lab Order',
                  }));
                  onNewLabOrder();
                }}
              >
                <i className="bi bi-plus-circle"></i> New Lab Order
              </Button>
            </ButtonGroup>
          </TableMenu>
          <div>
            {recentData.map((recent, index) => (
              <DetailsWrapper title={recent.description} key={index}>
                <CustomTable columns={columnLab} data={recent.data} pointerOnHover highlightOnHover striped />
              </DetailsWrapper>
            ))}
          </div>
        </TabPanel>
        <TabPanel value={valueTab} index={1}>
          <Orders
            onClick={() => {
              setResource((prevState) => ({
                ...prevState,
                selectedDocumentation: 'Lab Order',
              }));
              onNewLabOrder();
            }}
            columns={columnLab}
            data={labData}
          />
        </TabPanel>
        <TabPanel value={valueTab} index={2}>
          <Orders
            onClick={() => {
              setResource((prevState) => ({
                ...prevState,
                selectedDocumentation: 'Prescription',
              }));
              onNewPrescription();
            }}
            columns={columnLab}
            data={labData}
          />
        </TabPanel>
        <TabPanel value={valueTab} index={3}>
          <DnDBox />
        </TabPanel>
      </GrayWrapper>
    </>
  );
};

export default TabBox;
