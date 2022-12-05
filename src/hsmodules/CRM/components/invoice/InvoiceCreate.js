import {useState} from "react";
import {Button, Grid} from "@mui/material";
import {Box} from "@mui/system";
import Input from "../../../../components/inputs/basic/Input";
import {useForm} from "react-hook-form";

import {FormsHeaderText} from "../../../../components/texts";
import CustomSelect from "../../../../components/inputs/basic/Select";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import CustomTable from "../../../../components/customtable";
import moment from "moment";
import {CustomerView} from "../lead/LeadDetailView";
import CustomerDetail from "../global/CustomerDetail";

const random = require("random-string-generator");

const InvoiceCreate = ({closeModal}) => {
  const [plans, setPlans] = useState([]);

  const {register} = useForm();

  const planColumns = [];

  return (
    <>
      <Box
        sx={{
          width: "800px",
          maxHeight: "80vw",
        }}
      >
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12}>
            <CustomerDetail />
          </Grid>

          <Grid item lg={12} md={12} sm={12}>
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
              <Grid item xs={3}>
                <CustomSelect
                  register={register("plan", {required: true})}
                  label="Plan Type"
                  options={["Family", "HMO", "Free", "Personal"]}
                  //placeholder="Enter customer number"
                />
              </Grid>

              <Grid item xs={3}>
                <Input
                  register={register("premium", {required: true})}
                  label="Premium"
                  type="number"
                />
              </Grid>

              <Grid item xs={3}>
                <Input
                  register={register("no_month", {required: true})}
                  label="No of Plans"
                  type="text"
                  //placeholder="Enter customer number"
                />
              </Grid>

              <Grid item xs={3}>
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
