import {forwardRef, useState} from "react";
import {Button, Collapse, Grid, Typography} from "@mui/material";
import {Box} from "@mui/system";
import Input from "../../../../components/inputs/basic/Input";
import {useForm} from "react-hook-form";
import DatePicker from "react-datepicker";
import DeleteIcon from "@mui/icons-material/Delete";

import {FormsHeaderText} from "../../../../components/texts";
import CustomSelect from "../../../../components/inputs/basic/Select";
import BasicDatePicker from "../../../../components/inputs/Date";
import MuiCustomDatePicker from "../../../../components/inputs/Date/MuiDatePicker";
import Textarea from "../../../../components/inputs/basic/Textarea";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ModalBox from "../../../../components/modal";
import LeadAddContact from "./AddContact";
import CustomTable from "../../../../components/customtable";
import EmployeeSearch from "../../../helpers/EmployeeSearch";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {getContactColumns, getStaffColumns} from "../colums/columns";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import AdditionalInformationCard, {
  CreateAdditionalInfo,
} from "./AdditionalInfo";
import RadioButton from "../../../../components/inputs/basic/Radio";

const LeadsCreate = ({closeModal, handleGoBack}) => {
  const {register, handleSubmit, control, watch} = useForm({
    defaultValues: {customer_type: "Individual"},
  });
  const [contactModal, setContactModal] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [informations, setInformations] = useState([]);
  const [infoModal, setInfoModal] = useState(false);

  const handleAddContact = contact => {
    setContacts(prev => [contact, ...prev]);
  };

  const handleRemoveContact = contact => {
    setContacts(prev =>
      prev.filter(item => item.contact_name !== contact.contact_name)
    );
  };

  const handleSelectedStaff = staff => {
    setSelectedStaff(staff);
  };

  const handleAddStaff = () => {
    setStaffs(prev => [selectedStaff, ...prev]);
    setSelectedStaff(null);
  };

  const handleRemoveStaff = staff => {
    setStaffs(prev => prev.filter(item => item._id !== staff._id));
  };

  const staffColumns = getStaffColumns(handleRemoveStaff);

  const contactColumns = getContactColumns(handleRemoveContact);

  const removeAdditionalInfo = info => {
    setInformations(prev => prev.filter(item => item._id !== info._id));
  };

  const addNewInfo = data => {
    setInformations(prev => [data, ...prev]);
  };

  const onSubmit = data => {
    console.log(data);
  };

  const customerType = watch("customer_type", "Organization");

  return (
    <>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #f8f8f8",
            backgroundColor: "#f8f8f8",
          }}
          mb={2}
          p={2}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
            gap={1}
          >
            <GlobalCustomButton onClick={handleGoBack}>
              <ArrowBackIcon fontSize="small" sx={{marginRight: "3px"}} />
              Go Back
            </GlobalCustomButton>

            <Typography
              sx={{
                fontSize: "0.95rem",
                fontWeight: "600",
              }}
            >
              Create New Lead
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <GlobalCustomButton onClick={handleSubmit(onSubmit)}>
              Create Lead
            </GlobalCustomButton>
          </Box>
        </Box>

        <Grid container spacing={2} pr={2} pl={2}>
          <Grid item lg={12} md={12} sm={12}>
            <Box item>
              <FormsHeaderText text="Customer Details" />

              <Grid container spacing={1} mt={0.5}>
                <Grid item lg={2} md={2} sm={6} xs={6}>
                  <CustomSelect
                    options={["Individual", "Organization"]}
                    label="Customer Type"
                    control={control}
                    name="customer_type"
                    //placeholder="Enter customer name"
                  />
                </Grid>

                <Grid item lg={4} md={4} sm={6} xs={6}>
                  <Input
                    register={register("customer_name", {required: true})}
                    label="Customer Name"
                    //placeholder="Enter customer name"
                  />
                </Grid>

                <Grid item lg={3} md={3} sm={6} xs={6}>
                  <Input
                    register={register("customer_number", {required: true})}
                    label="Customer Number"
                  />
                </Grid>

                <Grid item lg={3} md={3} sm={6} xs={6}>
                  <Input
                    register={register("customer_email", {required: true})}
                    label="Customer Email"
                  />
                </Grid>

                <Grid item lg={4} md={6} sm={8}>
                  <Input
                    register={register("address", {required: true})}
                    label={
                      customerType === "Organization"
                        ? "Oraganization Address"
                        : "Residential Address"
                    }
                    //placeholder="Enter customer name"
                  />
                </Grid>

                <Grid item lg={2} md={3} sm={4}>
                  <Input
                    register={register("local_govt", {required: true})}
                    label="LGA"
                    //placeholder="Enter customer number"
                  />
                </Grid>

                <Grid item lg={2} md={3} sm={4}>
                  <Input
                    register={register("city", {required: true})}
                    label="City"
                    // placeholder="Enter customer name"
                  />
                </Grid>

                <Grid item lg={2} md={3} sm={4}>
                  <Input
                    register={register("state", {required: true})}
                    label="State"
                    //placeholder="Enter customer number"
                  />
                </Grid>

                <Grid item lg={2} md={3} sm={4}>
                  <Input
                    register={register("country", {required: true})}
                    label="Country"
                    //placeholder="Enter customer number"
                  />
                </Grid>

                <Grid item lg={4} md={4} sm={6}>
                  <Collapse in={customerType === "Organization"}>
                    <Input
                      register={register("organization_branch", {
                        required: true,
                      })}
                      label="Organization Branch"
                      //placeholder="Enter customer number"
                    />
                  </Collapse>
                </Grid>
              </Grid>
            </Box>

            <Box>
              <FormsHeaderText text="Lead Details" />
              <Grid container spacing={1} mt={0.5}>
                <Grid item lg={2} md={3} sm={6}>
                  <Input
                    register={register("deal_probability", {required: true})}
                    label="Probability"
                    //placeholder="Enter customer name"
                  />
                </Grid>
                <Grid item lg={2} md={3} sm={6}>
                  <Input
                    register={register("deal_size", {required: true})}
                    label="Size"
                    //placeholder="Enter customer number"
                  />
                </Grid>

                <Grid item lg={2} md={3} sm={6}>
                  <CustomSelect
                    register={register("deal_status", {required: true})}
                    label="Status"
                    options={["Open", "Closed", "Pending"]}
                    defaultValue="Open"
                    // placeholder="Enter customer name"
                  />
                </Grid>

                <Grid item lg={2} md={3} sm={6}>
                  <CustomSelect
                    register={register("deal_next_action", {required: true})}
                    label="Next Action"
                    options={["First", "Second", "Third", "Fourth"]}
                    defaultValue="First"
                    //placeholder="Enter customer number"
                  />
                </Grid>

                <Grid item lg={2} md={3} sm={6}>
                  <Input
                    register={register("weight_forcast", {required: true})}
                    label="Weight Forcast"
                    //placeholder="Enter customer number"
                  />
                </Grid>
                <Grid item lg={2} md={3} sm={6}>
                  <MuiCustomDatePicker
                    label="Closing Date"
                    name="closing_date"
                    control={control}
                  />
                </Grid>

                <Grid item lg={6} md={6} sm={6}>
                  <Textarea
                    label="Additional Information"
                    placeholder="Write here..."
                    register={register("additional_info")}
                  />
                </Grid>

                <Grid item lg={6} md={6} sm={6}>
                  <Textarea
                    label="More Additional Information"
                    placeholder="Write here..."
                    register={register("more_additional_info")}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* ****************************************************************************************** */}

          <Grid item lg={12} md={12} sm={12}>
            <Grid container spacing={1}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Box>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    mb={1.6}
                  >
                    <FormsHeaderText text="Contact Details" />
                    <Button
                      sx={{textTransform: "capitalize"}}
                      variant="contained"
                      onClick={() => setContactModal(true)}
                      size="small"
                    >
                      <AddCircleOutlineOutlinedIcon
                        fontSize="small"
                        sx={{marginRight: "5px"}}
                      />{" "}
                      Add Contact
                    </Button>
                  </Box>

                  <Box mt={1} mb={1}>
                    <CustomTable
                      title={"Contact List"}
                      columns={contactColumns}
                      data={contacts}
                      pointerOnHover
                      highlightOnHover
                      striped
                      //onRowClicked={handleRow}
                      CustomEmptyData="You haven't added any contact yet..."
                      progressPending={false}
                    />
                  </Box>
                  <ModalBox
                    open={contactModal}
                    onClose={() => setContactModal(false)}
                    header="Add Contact"
                  >
                    <LeadAddContact
                      closeModal={() => setContactModal(false)}
                      addContact={handleAddContact}
                    />
                  </ModalBox>
                </Box>
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Box container>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    gap={1.5}
                  >
                    <FormsHeaderText text="Assign Staffs" />

                    <Box sx={{width: "calc(100% - 250px)"}}>
                      <EmployeeSearch
                        getSearchfacility={handleSelectedStaff}
                        label="Search for Staff"
                      />
                    </Box>

                    <Button
                      sx={{textTransform: "capitalize"}}
                      variant="contained"
                      onClick={handleAddStaff}
                      size="small"
                      //disabled={!selectedStaff}
                    >
                      <AddCircleOutlineOutlinedIcon
                        fontSize="small"
                        sx={{marginRight: "3px"}}
                      />
                      Add Staff
                    </Button>
                  </Box>

                  <Box mt={1} mb={1}>
                    <CustomTable
                      title={"Contact List"}
                      columns={staffColumns}
                      data={staffs}
                      pointerOnHover
                      highlightOnHover
                      striped
                      //onRowClicked={handleRow}
                      CustomEmptyData="You haven't added any Staffs yet..."
                      progressPending={false}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <ModalBox
          open={infoModal}
          onClose={() => setInfoModal(false)}
          header="Add New Information"
        >
          <CreateAdditionalInfo
            closeModal={() => setInfoModal(false)}
            addInfo={addNewInfo}
          />
        </ModalBox>
      </Box>
    </>
  );
};

export default LeadsCreate;
