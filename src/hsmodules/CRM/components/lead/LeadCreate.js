import {forwardRef, useState} from "react";
import {Button, Grid, Typography} from "@mui/material";
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

import {getContactColumns, getStaffColumns} from "../colums/columns";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import AdditionalInformationCard, {
  CreateAdditionalInfo,
} from "./AdditionalInfo";

const LeadsCreate = ({closeModal}) => {
  const {register, handleSubmit, control} = useForm();
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

  return (
    <>
      <Box
        sx={{
          width: "85vw",
          maxHeight: "80vh",
        }}
      >
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} sm={12}>
            <Box item>
              <FormsHeaderText text="Customer Details" />

              <Grid container spacing={2} mt={0.5}>
                <Grid item xs={6}>
                  <Input
                    register={register("customer_name", {required: true})}
                    label="Customer Name"
                    //placeholder="Enter customer name"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input
                    register={register("customer_number", {required: true})}
                    label="Customer Number"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Input
                    register={register("address", {required: true})}
                    label="Residential Address"
                    //placeholder="Enter customer name"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Input
                    register={register("local_govt", {required: true})}
                    label="LGA"
                    //placeholder="Enter customer number"
                  />
                </Grid>

                <Grid item xs={4}>
                  <Input
                    register={register("city", {required: true})}
                    label="City"
                    // placeholder="Enter customer name"
                  />
                </Grid>

                <Grid item xs={4}>
                  <Input
                    register={register("state", {required: true})}
                    label="State"
                    //placeholder="Enter customer number"
                  />
                </Grid>
              </Grid>
            </Box>

            <Box>
              <FormsHeaderText text="Lead Details" />
              <Grid container spacing={1} mt={0.5}>
                <Grid item lg={3} md={4} sm={6}>
                  <Input
                    register={register("deal_probability", {required: true})}
                    label="Probability"
                    //placeholder="Enter customer name"
                  />
                </Grid>
                <Grid item lg={3} md={4} sm={6}>
                  <Input
                    register={register("deal_size", {required: true})}
                    label="Size"
                    //placeholder="Enter customer number"
                  />
                </Grid>

                <Grid item lg={3} md={4} sm={6}>
                  <CustomSelect
                    register={register("deal_status", {required: true})}
                    label="Status"
                    options={["Open", "Closed", "Pending"]}
                    defaultValue="Open"
                    // placeholder="Enter customer name"
                  />
                </Grid>

                <Grid item lg={3} md={4} sm={6}>
                  <CustomSelect
                    register={register("deal_next_action", {required: true})}
                    label="Next Action"
                    options={["First", "Second", "Third", "Fourth"]}
                    defaultValue="First"
                    //placeholder="Enter customer number"
                  />
                </Grid>

                <Grid item lg={3} md={4} sm={6}>
                  <Input
                    register={register("weight_forcast", {required: true})}
                    label="Weight Forcast"
                    //placeholder="Enter customer number"
                  />
                </Grid>
                <Grid item lg={3} md={4} sm={6}>
                  <MuiCustomDatePicker
                    label="Closing Date"
                    name="closing_date"
                    control={control}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Textarea
                    label="Additional Information"
                    placeholder="Write here..."
                    register={register("additional_info")}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* ****************************************************************************************** */}

          <Grid item lg={6} md={6} sm={12}>
            <Box>
              <Box sx={{display: "flex", justifyContent: "space-between"}}>
                <FormsHeaderText text="Additional Information" />
                <GlobalCustomButton onClick={() => setInfoModal(true)}>
                  <AddCircleOutlineOutlinedIcon
                    fontSize="small"
                    sx={{marginRight: "5px"}}
                  />
                  Add Information
                </GlobalCustomButton>
              </Box>

              <Box mt={1}>
                {informations.length > 0 ? (
                  informations.map((info, index) => (
                    <Box sx={{mb: 2}}>
                      <AdditionalInformationCard
                        data={info}
                        action={() => removeAdditionalInfo(info)}
                        key={index}
                      />
                    </Box>
                  ))
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography sx={{fontSize: "0.7rem", color: "#000000"}}>
                      You haven't added any information yet..
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>

            <Box mb={2}>
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
                  <AddCircleOutlineOutlinedIcon fontSize="small" /> Add Contact
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

            <Box container>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                mb={1.6}
              >
                <FormsHeaderText text="Staff Details" />
                <Button
                  sx={{textTransform: "capitalize"}}
                  variant="contained"
                  onClick={handleAddStaff}
                  size="small"
                  disabled={!selectedStaff}
                >
                  <AddCircleOutlineOutlinedIcon
                    fontSize="small"
                    sx={{marginRight: "3px"}}
                  />
                  Add Staff
                </Button>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <EmployeeSearch getSearchfacility={handleSelectedStaff} />
                </Grid>
              </Grid>

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

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="outlined"
            color="error"
            size="small"
            sx={{
              textTransform: "capitalize",
              marginRight: "15px",
            }}
            onClick={closeModal}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            sx={{textTransform: "capitalize"}}
            onClick={handleSubmit(onSubmit)}
            size="small"
          >
            Create Lead
          </Button>
        </Box>

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
