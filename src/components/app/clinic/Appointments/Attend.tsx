import { Box, Menu, MenuItem, Tab, Tabs, Typography } from '@mui/material';
import Portal from '@mui/material/Portal';
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

import {
  AttendWrapper,
  ButtonGroup,
  CustomTab,
  FlexBox,
  ImageBox,
  TableMenu,
} from '../../../../styles/global';
import Button from '../../../buttons/Button';
import CustomTable from '../../../customtable';
import Input from '../../../inputs/basic/Input';
import CustomSelect from '../../../inputs/basic/Select';
import ModalBox from '../../../modal';
import FilterMenu from '../../../utilities/FilterMenu';
import {
  DetailsWrapper,
  FullDetailsWrapper,
  GrayWrapper,
  GridWrapper,
  PageWrapper,
} from '../../styles';
import { columnsAppointment } from '../data';
import { columnLab, labData, recentData } from './data';

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

const Attend: React.FC<Props> = ({ row, backClick }) => {
  const [doc, setDoc] = React.useState('');
  const [tab, setTab] = React.useState('0');
  const [values, setValues] = useState({});
  const [valueTab, setValueTab] = useState(0);

  const [open, setOpen] = useState(false);
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

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const handleCreate = () => {};

  const handleClose = () => {
    setOpen(false);
  };

  const LabOrder = () => {
    return (
      <div>
        <TableMenu style={{ marginTop: '0.6rem' }}>
          <div className="inner-table">
            <Input placeholder="Search here" label="Search here" size="small" />
            <FilterMenu />
          </div>

          <Button label="Add new" onClick={() => setOpen(true)} />
        </TableMenu>
        <CustomTable
          columns={columnLab}
          data={labData}
          pointerOnHover
          highlightOnHover
          striped
        />
        <Portal>
          <ModalBox open={open} onClose={handleClose}>
            <FullDetailsWrapper className="small">
              <h2>Add Lab Order</h2>
              <GridWrapper style={{ alignItems: 'center' }}>
                <Input
                  label="Add Test"
                  name="addTest"
                  onChange={(e) =>
                    setValues({
                      ...values,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                <CustomSelect
                  label="Select Type"
                  name="selectType"
                  onChange={(e) =>
                    setValues({
                      ...values,
                      [e.target.name]: e.target.value,
                    })
                  }
                  options={['In-house', 'External']}
                />
                <button
                  style={{
                    borderRadius: '32px',
                    background: '#f3f3f3',
                    border: 'none',
                    width: '32px',
                    height: '32px',
                    cursor: 'pointer',
                  }}
                  type="submit"
                  onClick={() => setOpen(false)}
                >
                  +
                </button>
              </GridWrapper>
            </FullDetailsWrapper>
          </ModalBox>
        </Portal>
      </div>
    );
  };
  const Prescription = () => {
    return (
      <div>
        <TableMenu style={{ marginTop: '0.6rem' }}>
          <div className="inner-table">
            <Input placeholder="Search here" label="Search here" size="small" />
            <FilterMenu />
          </div>

          <Button label="Add new" onClick={() => setOpen(true)} />
        </TableMenu>
        <CustomTable
          columns={columnLab}
          data={labData}
          pointerOnHover
          highlightOnHover
          striped
        />
        <Portal>
          <ModalBox open={open} onClose={handleClose}>
            <FullDetailsWrapper className="small">
              <h2>Create Prescription</h2>
              <GridWrapper style={{ alignItems: 'center' }}>
                <Input
                  label="Search Order"
                  name="search"
                  onChange={(e) =>
                    setValues({
                      ...values,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                <Input
                  label="Note"
                  name="note"
                  onChange={(e) =>
                    setValues({
                      ...values,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                <CustomSelect
                  label="Select Type"
                  name="selectType"
                  onChange={(e) =>
                    setValues({
                      ...values,
                      [e.target.name]: e.target.value,
                    })
                  }
                  options={['In-house', 'External']}
                />
                <button
                  style={{
                    borderRadius: '32px',
                    background: '#f3f3f3',
                    border: 'none',
                    width: '32px',
                    height: '32px',
                    cursor: 'pointer',
                  }}
                  type="submit"
                  onClick={() => setOpen(false)}
                >
                  +
                </button>
              </GridWrapper>
            </FullDetailsWrapper>
          </ModalBox>
        </Portal>
      </div>
    );
  };

  const TestData = [
    {
      documentName: 'Clinical Note',
      form: [
        { title: 'Search Order', type: 'text' },
        { type: 'text', title: 'Note' },
        { type: 'select', options: ['In-house', 'External'] },
        { type: 'radio' },
        { type: 'checkbox' },
      ],
    },
    {
      documentName: 'Lab Result',
      form: [
        { title: 'Search Order', type: 'text' },
        { type: 'text', title: 'Note' },
        { type: 'select', options: ['In-house', 'External'] },
        { type: 'radio' },
        { type: 'checkbox' },
      ],
    },
    {
      documentName: 'Doctor Note',
      form: [
        { title: 'Search Order', type: 'text' },
        { type: 'text', title: 'Note' },
        { type: 'select', options: ['In-house', 'External'] },
        { type: 'radio' },
        { type: 'checkbox' },
      ],
    },
    {
      documentName: 'Nursing Note',
      form: [
        { title: 'Search Order', type: 'text' },
        { type: 'text', title: 'Note' },
        { type: 'select', options: ['In-house', 'External'] },
        { type: 'radio' },
        { type: 'checkbox' },
      ],
    },
    {
      documentName: 'Vital Signs',
      form: [
        { title: 'Search Order', type: 'text' },
        { type: 'text', title: 'Note' },
        { type: 'select', options: ['In-house', 'External'] },
        { type: 'radio' },
        { type: 'checkbox' },
      ],
    },
    {
      documentName: 'Progress Note',
      form: [
        { title: 'Search Order', type: 'text' },
        { type: 'text', title: 'Note' },
        { type: 'select', options: ['In-house', 'External'] },
        { type: 'radio' },
        { type: 'checkbox' },
      ],
    },
  ];

  const Document = () => {
    let docName = doc;
    const data = TestData.filter(function (TestData) {
      return TestData.documentName === docName;
    });

    console.log(docName, data);

    return (
      <>
        <Portal>
          <ModalBox open={open} onClose={handleClose}>
            <h2>{doc}</h2>

            <FullDetailsWrapper className="small">
              <GridWrapper style={{ alignItems: 'center' }}>
                {TestData.map((data, index) => {
                  if (data.documentName == docName) {
                    return (
                      <>
                        {data.form.map((formData) => {
                          if (formData.type === 'text') {
                            return (
                              <Input
                                label={formData.title}
                                name={formData.title}
                                onChange={(e) =>
                                  setValues({
                                    ...values,
                                    [e.target.name]: e.target.value,
                                  })
                                }
                              />
                            );
                          }
                          if (formData.type === 'select') {
                            return (
                              <CustomSelect
                                label={formData.title}
                                name={formData.title}
                                onChange={(e) =>
                                  setValues({
                                    ...values,
                                    [e.target.name]: e.target.value,
                                  })
                                }
                                options={formData.options}
                              />
                            );
                          }
                        })}
                      </>
                    );
                  }
                })}

                <button
                  style={{
                    borderRadius: '32px',
                    background: '#f3f3f3',
                    border: 'none',
                    width: '32px',
                    height: '32px',
                    cursor: 'pointer',
                    margin: '1rem 0',
                  }}
                  type="submit"
                  onClick={() => setOpen(false)}
                >
                  +
                </button>
              </GridWrapper>
              <CustomTable
                columns={columnLab}
                data={labData}
                pointerOnHover
                highlightOnHover
                striped
              />
            </FullDetailsWrapper>
          </ModalBox>
        </Portal>
      </>
    );
  };

  return (
    <PageWrapper>
      {open && <Document />}
      <Button
        label="Back to List"
        background="#fdfdfd"
        color="#333"
        onClick={backClick}
      />
      <FullDetailsWrapper className="small">
        <FlexBox>
          <ImageBox src="https://via.placeholder.com/150" />

          <div>
            <h1>Adam Mike Olu</h1>
            <p>Cash</p>
            <p>HMO: Avon HMO</p>
            <ButtonGroup>
              <label
                style={{
                  fontWeight: 'regular',
                  background: '#fdfdfd',
                  color: '#333',
                  padding: '8px 8px 8px 0',
                }}
              >
                Allergies
              </label>
              <label
                style={{
                  fontWeight: 'regular',
                  background: '#ECF3FF',
                  color: '#0364FF',
                  padding: '8px',
                }}
              >
                Billing Alert
              </label>
            </ButtonGroup>
            <p>Description: 32 years Male Married Christian IT professional</p>
            <p>Geneotype: AA</p>
            <p>Blood Group: O</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <AttendWrapper background="#FFE9E9">
              <h4> Specific Information</h4>
              <small>null</small>
            </AttendWrapper>
            <AttendWrapper background={'#ECF3FF'}>
              <h4>Allergies</h4>
              <small>null</small>
            </AttendWrapper>
            <AttendWrapper background="#f6ffdb">
              <h4>Morbidities</h4>
              <small>null</small>
            </AttendWrapper>
            <AttendWrapper background="#ffdbf8">
              <h4>Disabilities</h4>
              <small>null</small>
            </AttendWrapper>
          </div>
        </FlexBox>
      </FullDetailsWrapper>
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
          <Tabs
            value={valueTab}
            onChange={onChange}
            aria-label="basic tabs example"
          >
            <CustomTab label="History" {...a11yProps(0)} />
            <CustomTab label="Lab Orders" {...a11yProps(1)} />
            <CustomTab label="Prescriptions" {...a11yProps(2)} />
          </Tabs>
        </div>
        <ButtonGroup>
          <Button label="Bill Client" />

          <Button
            label={'New Document'}
            background="#Fafafa"
            color="#222"
            showicon={true}
            onClick={handleClick}
          />
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
            {documents.map((doc, i) => (
              <MenuItem
                onClick={() => {
                  setOpen(true);
                  setDoc(doc);
                }}
                key={i}
              >
                {doc}
              </MenuItem>
            ))}
          </Menu>
        </ButtonGroup>
      </div>
      <GrayWrapper style={{ marginTop: '10px' }}>
        <TabPanel value={valueTab} index={0}>
          <div>
            {recentData.map((recent, index) => (
              <DetailsWrapper title={recent.description} key={index}>
                <CustomTable
                  columns={columnLab}
                  data={recent.data}
                  pointerOnHover
                  highlightOnHover
                  striped
                />
              </DetailsWrapper>
            ))}
          </div>
        </TabPanel>
        <TabPanel value={valueTab} index={1}>
          <LabOrder />
        </TabPanel>
        <TabPanel value={valueTab} index={2}>
          <Prescription />
        </TabPanel>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default Attend;
