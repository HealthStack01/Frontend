import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../../../components/buttons/Button';
import CustomTable from '../../../../components/customtable';
import useRepository from '../../../../components/hooks/repository';
import Input from '../../../../components/inputs/basic/Input';
import CustomSelect from '../../../../components/inputs/basic/Select';
import DynamicInput from '../../../../components/inputs/DynamicInput';
import { FlexBox, ImageBox } from '../../../../ui/styled/global';
import { Models } from '../../Constants';
import { Schema } from '../../schema/util';
import { BillCreateDetailSchema, BillPrescriptionSentDetailsSchema } from '../../shared/bill';
import { BottomWrapper, FullDetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';

const BillLabSentDetail = ({ row, backClick, onSubmit: _ }) => {
  const { submit } = useRepository(Models.ORDER);
  const [values, setValues] = useState({});
  const [tab, setTab] = useState('0');
  const [clientBills, setClientBills] = useState([]);

  submit; //TODO: remove

  const addNewBill = (data) => {
    setClientBills([...clientBills, data]);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };
  const plan = row.client.paymentinfo.map((child) => {
    return child.plan;
  });

  const { handleSubmit, control } = useForm({
    defaultValues: {
      client: '',
    },
  });

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Bill Prescription Sent Details</h2>
            <span>Below are your bill’s details</span>
          </div>
          <div>
            <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
          </div>
        </HeadWrapper>
        <FullDetailsWrapper>
          <FlexBox>
            <ImageBox src="https://via.placeholder.com/150" />

            <div>
              <h1>{row.clientname}</h1>
              <p>{row.client.paymentinfo[0].plan}</p>
              <p>HMO: Avon HMO</p>
            </div>

            <div>
              <p>Description: 32 years Male Married Christian IT professional</p>
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
              <p>{row.clientname}</p>
            </div>

            <CustomSelect label="HMO" name="hmo" options={plan} />
          </GridWrapper>
          <GridWrapper style={{ alignItems: 'end' }}>
            <Input label="Date" name="date" value={new Date().toLocaleString()} />
            <Input label="Invoice" name="phone" value="#456ghn" disabled />
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
            <Input label="medication" value={row.order} disabled />
          </div>

          <br />

          <h2>Instructions:</h2>
          <h2>Billing Status: {row.mode}</h2>
          <br />

          <form onSubmit={handleSubmit(addNewBill)}>
            <FullDetailsWrapper title="Create Employee">
              {BillPrescriptionSentDetailsSchema.map((obj, index) => {
                if (obj['length']) {
                  const schemas = obj as Schema[];

                  return (
                    <GridWrapper key={index}>
                      {schemas.map((schema) => (
                        <DynamicInput
                          key={index}
                          name={schema.key}
                          control={control}
                          label={schema.description}
                          inputType={schema.inputType}
                          options={schema.options || []}
                        />
                      ))}
                    </GridWrapper>
                  );
                } else {
                  const schema = obj as Schema;
                  return (
                    <DynamicInput
                      key={index}
                      name={schema.key}
                      control={control}
                      label={schema.description}
                      inputType={schema.inputType}
                      options={schema.options || []}
                    />
                  );
                }
              })}
              <CustomTable
                title="Service Items"
                columns={BillCreateDetailSchema}
                data={clientBills}
                pointerOnHover
                highlightOnHover
                striped
              />
              <button
                style={{
                  borderRadius: '32px',
                  background: '#0000FF',
                  border: 'none',
                  color: '#fff',
                  width: '44px',
                  height: '44px',
                }}
                type="submit"
              >
                +
              </button>

              <BottomWrapper>
                <Button label="Adjust" type="submit" />
              </BottomWrapper>
            </FullDetailsWrapper>
          </form>
        </FullDetailsWrapper>

        <FullDetailsWrapper>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={tab}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="Client Information Tabs">
                  <Tab label="Last Visit" value="1" sx={{ fontWeight: 'bolder' }} />
                  <Tab label="Drug Tolerance" value="2" sx={{ fontWeight: 'bolder' }} />
                  <Tab label="Medications" value="3" sx={{ fontWeight: 'bolder' }} />
                  <Tab label="History" value="4" sx={{ fontWeight: 'bolder' }} />
                  <Tab label="Problem List" value="5" sx={{ fontWeight: 'bolder' }} />
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

export default BillLabSentDetail;
