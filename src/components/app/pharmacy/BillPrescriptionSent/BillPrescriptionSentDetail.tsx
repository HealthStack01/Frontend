import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import React, { useState } from 'react';

import { FlexBox, ImageBox } from '../../../../styles/global';
import Button from '../../../buttons/Button';
import Input from '../../../inputs/basic/Input';
import CustomSelect from '../../../inputs/basic/Select';
import {
  BottomWrapper,
  FullDetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';

interface Props {
  editBtnClicked?: () => void;
  backClick: () => void;
  row?: any;
}

const BillPrescriptionSentDetails: React.FC<Props> = ({ row, backClick }) => {
  const [values, setValues] = useState({});
  const [tab, setTab] = useState('0');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Bill Prescription Sent Details</h2>
            <span>Below are your bill’s details</span>
          </div>
          <div>
            <Button
              label="Back to List"
              background="#fdfdfd"
              color="#333"
              onClick={backClick}
            />
          </div>
        </HeadWrapper>
        <FullDetailsWrapper>
          <FlexBox>
            <ImageBox src="https://via.placeholder.com/150" />

            <div>
              <h1>Adam Mike Olu</h1>
              <p>Cash</p>
              <p>HMO: Avon HMO</p>
            </div>

            <div>
              <p>
                Description: 32 years Male Married Christian IT professional
              </p>
              <p>Geneotype: AA</p>
              <p>Blood Group: O</p>
            </div>
          </FlexBox>
        </FullDetailsWrapper>
        <FullDetailsWrapper>
          <GridWrapper>
            <div>
              <h2>Specific Information:</h2>
            </div>
            <div>
              <h2>Allergies:</h2>
            </div>
            <div>
              <h2>Moridities:</h2>
            </div>
            <div>
              <h2>Disabilities:</h2>
            </div>
          </GridWrapper>
        </FullDetailsWrapper>
        <FullDetailsWrapper>
          <HeadWrapper>
            <div>
              <h2>Bill Product</h2>
            </div>
            <label
              style={{
                padding: '14px 20px',
                background: '#b3ffed',
                color: '#062e12',
                border: 'none',
                borderRadius: '4px',
              }}
            >
              Documentation
            </label>
          </HeadWrapper>
          <GridWrapper className="two-columns" style={{ alignItems: 'end' }}>
            <div>
              <label>Name</label>
              <p>{row.name}</p>
            </div>

            <CustomSelect
              label="HMO"
              name="hmo"
              onChange={(e) =>
                setValues({
                  ...values,
                  [e.target.name]: e.target.value,
                })
              }
              options={['HMO 1', 'HMO 2']}
            />
          </GridWrapper>
          <GridWrapper style={{ alignItems: 'end' }}>
            <Input
              label="Date"
              name="date"
              type="date"
              onChange={(e) =>
                setValues({
                  ...values,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              onChange={(e) =>
                setValues({
                  ...values,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <Input
              label="Quantity"
              name="quantity"
              onChange={(e) =>
                setValues({
                  ...values,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </GridWrapper>

          <h2>Medication</h2>
          <div>
            <p>Paracetamol</p>
          </div>
          <Input
            label="Price"
            name="price"
            onChange={(e) =>
              setValues({
                ...values,
                [e.target.name]: e.target.value,
              })
            }
          />
          <br />

          <h2>Instructions:</h2>
          <h2>Billing Status: {row.mode}</h2>
          <br />

          <GridWrapper style={{ alignItems: 'center' }} className="two-columns">
            <Input
              label="Seacrh Product"
              name="search"
              onChange={(e) =>
                setValues({
                  ...values,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <Input
              label="Quantity"
              name="quantity"
              onChange={(e) =>
                setValues({
                  ...values,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <Input
              label="Amount"
              name="amount"
              onChange={(e) =>
                setValues({
                  ...values,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <button
              style={{
                borderRadius: '32px',
                background: '#f3f3f3',
                border: 'none',
                width: '32px',
                height: '32px',
              }}
              type="submit"
            >
              +
            </button>{' '}
          </GridWrapper>
          <BottomWrapper>
            <Button label="Adjust" type="submit" />
          </BottomWrapper>
        </FullDetailsWrapper>

        <FullDetailsWrapper>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={tab}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                  onChange={handleChange}
                  aria-label="Client Information Tabs"
                >
                  <Tab
                    label="Last Visit"
                    value="1"
                    sx={{ fontWeight: 'bolder' }}
                  />
                  <Tab
                    label="Drug Tolerance"
                    value="2"
                    sx={{ fontWeight: 'bolder' }}
                  />
                  <Tab
                    label="Medications"
                    value="3"
                    sx={{ fontWeight: 'bolder' }}
                  />
                  <Tab
                    label="History"
                    value="4"
                    sx={{ fontWeight: 'bolder' }}
                  />
                  <Tab
                    label="Problem List"
                    value="5"
                    sx={{ fontWeight: 'bolder' }}
                  />
                  <Tab label="Task" value="6" sx={{ fontWeight: 'bolder' }} />
                </TabList>
              </Box>
              <TabPanel value="1">Item One</TabPanel>
              <TabPanel value="2">Item Two</TabPanel>
              <TabPanel value="3">Item Three</TabPanel>
              <TabPanel value="4">Item One</TabPanel>
              <TabPanel value="5">Item Two</TabPanel>
              <TabPanel value="6">Item Three</TabPanel>
            </TabContext>
          </Box>
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default BillPrescriptionSentDetails;
