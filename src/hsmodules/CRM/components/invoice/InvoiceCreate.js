import {useState} from "react";
import {Button, Grid} from "@mui/material";
import {Box} from "@mui/system";
import Input from "../../../../components/inputs/basic/Input";
import {useForm} from "react-hook-form";
import DatePicker from "react-datepicker";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import {FileUploader} from "react-drag-drop-files";

import {FormsHeaderText} from "../../../../components/texts";
import CustomSelect from "../../../../components/inputs/basic/Select";
import BasicDatePicker from "../../../../components/inputs/Date";
import MuiCustomDatePicker from "../../../../components/inputs/Date/MuiDatePicker";
import Textarea from "../../../../components/inputs/basic/Textarea";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import CustomTable from "../../../../components/customtable";

const UploadComponent = ({}) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "150px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        border: "1px dashed gray",
        cursor: "pointer",
        borderRadius: "7.5px",
      }}
    >
      <CloudUploadOutlinedIcon fontSize="large" />
      <GlobalCustomButton variant="outlined">Search Device</GlobalCustomButton>
    </Box>
  );
};

const InvoiceCreate = ({closeModal}) => {
  const [plans, setPlans] = useState([]);

  const {register} = useForm();

  const planColumns = [];

  const handleSlaChange = () => {};

  const handleIntentChange = () => {};

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
            <Box>
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
              {/* 
              <Box sx={{display: "flex", width: "100%"}} mt={2}>
                <Grid container spacing={2}>
                  <Grid item lg={4} md={4} sm={6}>
                    <FormsHeaderText text="Signed SLA" />
                    <Box>
                      <FileUploader
                        multiple={false}
                        handleChange={handleSlaChange}
                        name="upload"
                        types={["jpeg", "jpg"]}
                        children={<UploadComponent />}
                      />
                    </Box>
                  </Grid>

                  <Grid item lg={4} md={4} sm={6}>
                    <FormsHeaderText text="Letter of Intent" />
                    <Box>
                      <FileUploader
                        multiple={false}
                        handleChange={handleIntentChange}
                        name="upload"
                        types={["jpeg", "jpg"]}
                        children={<UploadComponent />}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box> */}
            </Box>
          </Grid>

          <Grid item lg={6} md={6} sm={6}>
            <Box mb={1} sx={{display: "flex", justifyContent: "space-between"}}>
              <FormsHeaderText text="Plan" />

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
