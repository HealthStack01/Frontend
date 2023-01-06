/* eslint-disable */
import React, { useState, useContext, useEffect} from 'react';
import client from '../../feathers';
import moment from "moment";
import { useForm } from 'react-hook-form';
import { UserContext, ObjectContext } from '../../context';
import 'react-datepicker/dist/react-datepicker.css';
import { PageWrapper } from '../../ui/styled/styles';
import { TableMenu } from '../../ui/styled/global';
import FilterMenu from '../../components/utilities/FilterMenu';
import CustomTable from '../../components/customtable';
import CalendarGrid from '../../components/calender';
import { Box, Grid } from '@mui/material';
import GlobalCustomButton from '../../components/buttons/CustomButton';
import {FormsHeaderText} from "../../components/texts";
import EditIcon from "@mui/icons-material/Edit";
import MuiCustomDatePicker from "../../components/inputs/Date/MuiDatePicker";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomSelect from "../../components/inputs/basic/Select";
import Input from "../../components/inputs/basic/Input";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import { Stack } from '@mui/system';
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import { PageCustomerDetail } from '../CRM/components/global/CustomerDetail';

export default function Premium({isTab}) {
  const [currentView, setCurrentView] = useState("lists");

  
  const handleGoBack = () => {
    setCurrentView("lists");
  };
  return (
    <Stack>
      {currentView === "lists" && (
        <PremiumList
          showDetailView={() => setCurrentView("details")}
          isTab={isTab}
        />
      )}

      {currentView === "details" && (
        <PremiumDetails handleGoBack={handleGoBack} />
      )}
    </Stack>
  );
}



export function PremiumList({showDetailView, isTab}) {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('list');
  const [isPaid, setIsPaid] = useState(true);
  const { user} = useContext(UserContext);

  const handleRow = async () => {
   if(isTab){
   
   } 
   showDetailView()
  };


  const dummyData = [
    {
      name: 'Sulaiman Olaniran',
      plan: 'Family Plan',
      amount: '10000:00',
      quantity: '50',
      date: '11/11/2022',
      status: 'Paid',
    },
    {
      name: 'Albert Sulaiman Olaniran',
      plan: 'Family Plan',
      amount: '10000:00',
      quantity: '50',
      date: '11/11/2022',
      status: 'Paid',
    },
    {
      name: 'Sulaiman Olaniran',
      plan: 'Family Plan',
      amount: '10000:00',
      quantity: '50',
      date: '11/11/2022',
      status: 'Paid',
    },

    {
      name: 'Sulaiman Olaniran',
      plan: 'Family Plan',
      amount: '10000:00',
      quantity: '50',
      date: '11/11/2022',
      status: 'Paid',
    },
  ];
  const dummyUnpaidData = [
    {
      name: 'Sulaiman Olaniran',
      plan: 'Family Plan',
      amount: '10000:00',
      quantity: '50',
      date: '11/11/2022',
      status: 'Unpaid',
    },
    {
      name: 'Albert Sulaiman Olaniran',
      plan: 'Family Plan',
      amount: '10000:00',
      quantity: '50',
      date: '11/11/2022',
      status: 'Unpaid',
    },
    {
      name: 'Sulaiman Olaniran',
      plan: 'Family Plan',
      amount: '10000:00',
      quantity: '50',
      date: '11/11/2022',
      status: 'Unpaid',
    },

    {
      name: 'Sulaiman Olaniran',
      plan: 'Family Plan',
      amount: '10000:00',
      quantity: '50',
      date: '11/11/2022',
      status: 'Unpaid',
    },
  ];

  const returnCell = (status) => {
    // if (status === "approved") {
    //   return <span style={{color: "green"}}>{status}</span>;
    // }
    // else if
    switch (status.toLowerCase()) {
      case 'paid':
        return <span style={{ color: '#17935C' }}>{status}</span>;

      case 'unpaid':
        return <span style={{ color: 'crimson' }}>{status}</span>;

      default:
        break;
    }
  };

  const PremiumSchema = [
    {
      name: 'S/N',
      key: 'sn',
      description: 'SN',
      selector: (row, i) => i + 1,
      sortable: true,
      inputType: 'HIDDEN',
      width: '80px',
    },
    {
      name: 'Customer Name',
      key: 'name',
      description: 'Enter Customer Name',
      selector: (row) => row.name,
      sortable: true,
      required: true,
      inputType: 'HIDDEN',
    },
    {
      name: 'Plan Type',
      key: 'plan',
      description: 'Enter Plan Type',
      selector: (row) => row.plan,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Total Amount',
      key: 'amount',
      description: 'Enter Total Amount',
      selector: (row) => row.amount,
      sortable: true,
      required: true,
      inputType: 'NUMBER',
    },
    {
      name: 'Date of Payment',
      key: 'date',
      description: 'Enter name of Disease',
      selector: (row, i) => row.date,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Status',
      key: 'status',
      description: 'Enter bills',
      selector: 'status',
      cell: (row) => returnCell(row.status),
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
  ];
  console.log(isPaid);

  return (
    <>
      {user ? (
        <>
          {isPaid ? (
            <>
              <div className="level">
                <PageWrapper
                  style={{ flexDirection: 'column', padding: '0.6rem 1rem' }}
                >
                  <TableMenu>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {/* {handleSearch && ( */}
                        <div className="inner-table">
                          <FilterMenu  />
                        </div>
                      {/* )} */}
                      <h2 style={{ margin: '0 10px', fontSize: '0.95rem' }}>
                        {isPaid ? 'Paid List' : 'Unpaid List'}
                      </h2>
                    </div>

                      <GlobalCustomButton
                        text={isPaid ? 'Unpaid List' : 'Paid List'}
                        onClick={() => setIsPaid(!isPaid)}
                      />
                  
                  </TableMenu>

                  {value === 'list' ? (
                    <CustomTable
                      title={''}
                      columns={PremiumSchema}
                      data={dummyData}
                      pointerOnHover
                      highlightOnHover
                      striped
                      onRowClicked={handleRow}
                      progressPending={loading}
                      //conditionalRowStyles={conditionalRowStyles}
                    />
                  ) : (
                    <CalendarGrid appointments={mapFacilities()} />
                  )}
                </PageWrapper>
              </div>
            </>
          ) : (
            <>
              <div className="level">
                <PageWrapper
                  style={{ flexDirection: 'column', padding: '0.6rem 1rem' }}
                >
                  <TableMenu>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {/* {handleSearch && ( */}
                        <div className="inner-table">
                          <FilterMenu  />
                        </div>
                      {/* )} */}
                      <h2 style={{ margin: '0 10px', fontSize: '0.95rem' }}>
                        {isPaid ? 'Paid List' : 'Unpaid List'}
                      </h2>
                    </div>

                    
                      <GlobalCustomButton
                        text={isPaid ? 'Unpaid List' : 'Paid List'}
                        onClick={() => setIsPaid(true)}
                      />
                   
                  </TableMenu>

                  {value === 'list' ? (
                    <CustomTable
                      title={''}
                      columns={PremiumSchema}
                      data={dummyUnpaidData}
                      pointerOnHover
                      highlightOnHover
                      striped
                      onRowClicked={handleRow}
                      progressPending={loading}
                      //conditionalRowStyles={conditionalRowStyles}
                    />
                  ) : (
                    <CalendarGrid appointments={mapFacilities()} />
                  )}
                </PageWrapper>
              </div>
            </>
          )}
        </>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}

export function PremiumDetails({handleGoBack}){
  const [edit, setEdit] = useState(false);
  const {register,control} = useForm();

  const premiumState = [
    {

    }
  ]

 return (
  <Box
  mb={2}
  p={2}
  >
     <GlobalCustomButton onClick={handleGoBack}>
            <ArrowBackIcon fontSize="small" sx={{marginRight: "5px"}} />
            Back
          </GlobalCustomButton>
  
  <Grid container spacing={2} p={2}>
    <Grid item lg={12} md={12} sm={12}>
      <PageCustomerDetail />
    </Grid>
  <Grid item lg={12} md={12} sm={12}>
  <Box sx={{display: "flex", justifyContent: "space-between", my:"1rem"}}>
      <FormsHeaderText text="Premium Details" />

      <Box sx={{display: "flex"}} gap={2}>
        {edit ? (
          <>
            <GlobalCustomButton
              onClick={() => setEdit(false)}
              color="warning"
            >
              <EditIcon fontSize="small" sx={{marginRight: "3px"}} />
              Cancel
            </GlobalCustomButton>

            <GlobalCustomButton
              // onClick={handleSubmit(handleUpdateInvoiceDetail)}
              color="success"
            >
              <SystemUpdateAltIcon
                fontSize="small"
                sx={{marginRight: "3px"}}
              />
              Update
            </GlobalCustomButton>
          </>
        ) : (
          <GlobalCustomButton onClick={() => setEdit(true)}>
            <EditIcon fontSize="small" sx={{marginRight: "3px"}} /> Edit
          </GlobalCustomButton>
        )}
      </Box>
    </Box>
  <Grid container spacing={1}>  
   <Grid item lg={3} md={3} sm={6}>
        <MuiCustomDatePicker
          label="Date"
          value={moment(moment.now()).format("L")}
          disabled={!edit}
          name="date"
          control={control}
        />
        </Grid>
        <Grid item lg={2} md={2} sm={6} xs={6}>
          <CustomSelect
            options={["Family Plan", "Corporate Plan"]}
            label="Plan Type"
            disabled={!edit}
            control={control}
            name="type"
            defaultValue="Family Plan"
          />
        </Grid>

        <Grid item lg={3} md={3} sm={6} xs={6}>
          <Input
            register={register("amount", {required: true})}
            label="Total Amount"
            disabled={!edit}
            defaultValue="7000"
            //placeholder="Enter customer number"
          />
        </Grid>
        <Grid item lg={3} md={3} sm={6}>
        <CustomSelect
            options={["Paid", "Unpaid"]}
            label="Status"
            disabled={!edit}
            control={control}
            name="type"
            defaultValue='Paid'
          />
        </Grid>
   </Grid>     
   </Grid>  
{/* 
  <Grid item xs={12}>
    <Box sx={{display: "flex", justifyContent: "space-between"}}>
      <FormsHeaderText text="Premium Staus" />
    </Box>
    <Box sx={{zIndex: "999999"}}>
      <CustomTable
        title={""}
        columns={dummyData}
        data={statusHistory}
        pointerOnHover
        highlightOnHover
        striped
        onRowClicked={handleRow}
        progressPending={false}
        CustomEmptyData={"No Status History for this invoice yet..."}
      />
    </Box>
  </Grid> */}
</Grid>
</Box>
 )
}