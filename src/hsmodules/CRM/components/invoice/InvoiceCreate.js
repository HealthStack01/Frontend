import {useState} from "react";
import {Button, Grid} from "@mui/material";
import {Box} from "@mui/system";
import Input from "../../../../components/inputs/basic/Input";
import {useForm} from "react-hook-form";
var random = require("random-string-generator");

import {FormsHeaderText} from "../../../../components/texts";
import CustomSelect from "../../../../components/inputs/basic/Select";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import CustomTable from "../../../../components/customtable";
import moment from "moment";
import {CustomerView} from "../lead/LeadDetailView";

const InvoiceCreate = ({closeModal}) => {
  const [plans, setPlans] = useState([]);

  const {register} = useForm();

  const planColumns = [];

  return (
    <>
      <Box
        sx={{
          width: "85vw",
          maxHeight: "80vw",
        }}
      >
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} sm={6}>
            <CustomerView />
            {/* <Box>
              <Box mb={1}>
                <FormsHeaderText text="Customer Detail" />
              </Box>

              <Grid container spacing={1}>
                <Grid item lg={6} md={6} sm={6}>
                  <Input
                    register={register("customer_name", {required: true})}
                    label="Customer Name"
                    //placeholder="Enter customer name"
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6}>
                  <Input
                    register={register("phone_number", {required: true})}
                    label="Phone Number"
                    //placeholder="Enter customer number"
                  />
                </Grid>

                <Grid item lg={8} md={8} sm={12}>
                  <Input
                    register={register("address", {required: true})}
                    label="Residential Address"
                    //placeholder="Enter customer name"
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={6}>
                  <Input
                    register={register("local_govt", {required: true})}
                    label="LGA"
                    //placeholder="Enter customer number"
                  />
                </Grid>

                <Grid item lg={4} md={4} sm={6}>
                  <Input
                    register={register("city", {required: true})}
                    label="City"
                    // placeholder="Enter customer name"
                  />
                </Grid>

                <Grid item lg={4} md={4} sm={6}>
                  <Input
                    register={register("state", {required: true})}
                    label="State"
                    //placeholder="Enter customer number"
                  />
                </Grid>

                <Grid item lg={4} md={4} sm={6}>
                  <Input
                    register={register("country", {required: true})}
                    label="Country"
                    //placeholder="Enter customer number"
                  />
                </Grid>
              </Grid>
            </Box> */}
          </Grid>

          <Grid item lg={6} md={6} sm={6}>
            <Box mb={1} sx={{display: "flex", justifyContent: "space-between"}}>
              <FormsHeaderText text="Invoice Information" />
            </Box>

            <Grid container spacing={1} mb={1.5}>
              <Grid item xs={4}>
                <Input
                  label="Date"
                  value={moment(moment.now()).format("L")}
                  register={register("date", {required: true})}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={4}>
                <Input
                  label="Invoice Number"
                  value={random(12, "uppernumeric")}
                  register={register("invoice_number", {required: true})}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={4}>
                <Input
                  label="Total Amount"
                  value={"100000"}
                  register={register("total_amount", {required: true})}
                  disabled={true}
                />
              </Grid>
            </Grid>

            <Box mb={1} sx={{display: "flex", justifyContent: "space-between"}}>
              <FormsHeaderText text="Plans" />

              <GlobalCustomButton>
                <AddCircleOutline fontSize="small" sx={{marginRight: "5px"}} />
                Add Plan
              </GlobalCustomButton>
            </Box>

            <Grid container spacing={1}>
              <Grid item xs={4}>
                <CustomSelect
                  register={register("plan", {required: true})}
                  label="Plan Type"
                  options={["Family", "HMO", "Free", "Personal"]}
                  //placeholder="Enter customer number"
                />
              </Grid>
              <Grid item xs={4}>
                <Input
                  register={register("no_month", {required: true})}
                  label="No of Months"
                  type="text"
                  //placeholder="Enter customer number"
                />
              </Grid>

              <Grid item xs={4}>
                <Input
                  register={register("amount", {required: true})}
                  label="Amount"
                  type="NUMBER"
                  //placeholder="Enter customer number"
                />
              </Grid>
            </Grid>

            <Box mt={1} mb={1}>
              <CustomTable
                title={"Contact List"}
                columns={planColumns}
                data={plans}
                pointerOnHover
                highlightOnHover
                striped
                //onRowClicked={handleRow}
                CustomEmptyData="You haven't added any Plan yet..."
                progressPending={false}
              />
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
          mt={2}
        >
          <GlobalCustomButton
            variant="outlined"
            color="error"
            sx={{
              marginRight: "15px",
            }}
            onClick={closeModal}
          >
            Cancel
          </GlobalCustomButton>

          <GlobalCustomButton>Create Invoice</GlobalCustomButton>
        </Box>
      </Box>
    </>
  );
};

export default InvoiceCreate;
