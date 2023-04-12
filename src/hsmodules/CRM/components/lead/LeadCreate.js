import {forwardRef, useState, useContext, useEffect, useCallback} from "react";
import {Button, Collapse, Grid, Typography} from "@mui/material";
import {Box} from "@mui/system";
import Input from "../../../../components/inputs/basic/Input";
import {useForm} from "react-hook-form";

import {FormsHeaderText} from "../../../../components/texts";
import CustomSelect from "../../../../components/inputs/basic/Select";
import MuiCustomDatePicker from "../../../../components/inputs/Date/MuiDatePicker";
import Textarea from "../../../../components/inputs/basic/Textarea";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ModalBox from "../../../../components/modal";
import CustomTable from "../../../../components/customtable";
import EmployeeSearch from "../../../helpers/EmployeeSearch";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useNavigate, useLocation} from "react-router-dom";

import {getContactColumns, getStaffColumns} from "../colums/columns";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";

import {toast} from "react-toastify";
import ContactCreate from "../contact/ContactCreate";
import {ObjectContext, UserContext} from "../../../../context";
import dayjs from "dayjs";
import client from "../../../../feathers";
import GoogleAddressInput from "../../../../components/google-autocomplete";

const LeadsCreate = ({closeModal, handleGoBack}) => {
  const dealServer = client.service("deal");
  const notificationsServer = client.service("notification");

  const {register, handleSubmit, control, watch, reset, setValue} = useForm({
    defaultValues: {customer_type: ""},
  });
  const [contactModal, setContactModal] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [success, setSuccess] = useState(false);
  const [informations, setInformations] = useState([]);
  const [infoModal, setInfoModal] = useState(false);

  const {user} = useContext(UserContext);
  const {showActionLoader, hideActionLoader} = useContext(ObjectContext);

  const location = useLocation();

  const handleAddContact = contact => {
    setContacts(prev => [contact, ...prev]);
  };

  const handleRemoveContact = contact => {
    setContacts(prev =>
      prev.filter(item => item.contact_name !== contact.contact_name)
    );
  };

  const handleSelectedStaff = staff => {
    console.log(staff);
    //setSuccess(true);
    setSelectedStaff(staff);
  };

  const handleAddStaff = () => {
    if (selectedStaff === null) return toast.error("Please select a staff");
    const staffDetail = {
      name: `${selectedStaff.firstname} ${selectedStaff.lastname}`,
      position: selectedStaff.position,
      profession: selectedStaff.profession,
      phoneno: selectedStaff.phone,
      email: selectedStaff.email,
      active: selectedStaff.active || true,
      employeeId: selectedStaff._id,
    };
    setStaffs(prev => [staffDetail, ...prev]);
    setSelectedStaff(null);
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 100);
  };

  const handleRemoveStaff = staff => {
    setStaffs(prev => prev.filter(item => item._id !== staff._id));
  };

  const staffColumns = getStaffColumns(handleRemoveStaff);

  const contactColumns = getContactColumns(handleRemoveContact);

  // useEffect(() => {
  //   hideActionLoader();
  // }, []);

  const onSubmit = async data => {
    // console.log("Data", data), console.log(user);
    showActionLoader();
    const employee = user.currentEmployee;

    const additionalInfo = {
      info: data.additional_info,
      date: new Date(),
      employeename: `${employee.firstname} ${employee.lastname}`,
    };

    const dealInfo = {
      probability: data.probability,
      size: data.size,
      currStatus: data.status,
      nextAction: data.nextAction,
      weightForecast: data.weightForecast,
      closingDate: data.closingDate,
    };

    const statusHistory = {
      date: new Date(),
      employeename: `${employee.firstname} ${employee.lastname}`,
      employeeId: employee.userId,
      status: data.status,
    };

    let document = {};

    document.contacts = contacts;
    document.assignStaff = staffs;
    document.additionalInfo = additionalInfo;
    document.dealinfo = dealInfo;
    document.statushx = statusHistory;
    document.createdbyName = `${employee.firstname} ${employee.lastname}`;
    document.createdby = employee.userId;
    document.type = data.type;
    document.name = data.name;
    document.phone = data.phone;
    document.email = data.email;
    document.address = data.address;
    document.city = data.city;
    document.lga = data.lga;
    document.state = data.state;
    document.country = data.country;
    document.orgbranch = data.orgbranch;
    document.clientclass = data.clientclass;
    document.facilityId = employee.facilityDetail._id;
    document.facilityName = employee.facilityDetail.facilityName;

    const notificationObj = {
      type: "CRM",
      title: "New Lead Created in CRM",
      description: `${employee.firstname} ${employee.lastname} Created a new Lead with ${data.type} ${data.name} in CRM`,
      facilityId: employee.facilityDetail._id,
      sender: `${employee.firstname} ${employee.lastname}`,
      senderId: employee._id,
      pageUrl: location.pathname,
      priority: "normal",
    };

    const assingedStaffNotificationObj = {
      type: "CRM",
      title: "You were assinged to a Lead",
      description: `You were assigned to the following Lead ${data.type} ${data.name} in CRM`,
      facilityId: employee.facilityDetail._id,
      sender: `${employee.firstname} ${employee.lastname}`,
      senderId: employee._id,
      pageUrl: location.pathname,
      priority: "normal",
      dest_userId: staffs.map(item => item.employeeId),
    };

    // console.log("user userId", employee.userId);
    // console.log("user id", employee._id);
    // return console.log(staffs);

    await dealServer
      .create(document)
      .then(async res => {
        Object.keys(data).forEach(key => {
          data[key] = null;
        });

        await notificationsServer.create(notificationObj);
        await notificationsServer.create(assingedStaffNotificationObj);

        hideActionLoader();
        reset(data);
        setStaffs([]);
        setContacts([]);
        toast.success(`Lead successfully created`);

        //setLoading(false);
      })
      .catch(err => {
        hideActionLoader();
        toast.error(`Sorry, You weren't able to create a Lead. ${err}`);
        //setLoading(false);
      });
  };

  // const onDelete = () => {
  //   const id = "63a3537c3cb3d60016544527";

  //   dealServer
  //     .remove(id)
  //     .then(res => {
  //       toast.success(`Client successfully deleted!`);
  //       setOpen(false);
  //     })
  //     .catch(err => {
  //       toast.error(`Sorry, Unable to delete client. ${err}`);
  //     });
  // };

  const customerType = watch("type", "corporate");
  const probability = watch("probability");
  const size = watch("size");

  const calculateWeightForcast = useCallback(() => {
    console.log("Hello");
    const weightForecast = Number(probability) * Number(size);
    console.log(weightForecast);
    setValue("weightForecast", weightForecast);
  }, [probability, size]);

  useEffect(() => {
    calculateWeightForcast();
  }, [calculateWeightForcast]);

  const handleGoogleAddressSelect = obj => {
    //console.log(obj);
    setValue("address", obj.address);
    setValue("state", obj.state);
    setValue("city", obj.lga);
    setValue("lga", obj.lga);
    setValue("country", obj.country);
  };

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
                    options={["Individual", "Corporate"]}
                    label="Customer Type"
                    control={control}
                    name="type"
                    required
                    important
                  />
                </Grid>

                <Grid item lg={4} md={4} sm={6} xs={6}>
                  <Input
                    register={register("name", {required: true})}
                    label="Customer Name"
                    important
                    //placeholder="Enter customer name"
                  />
                </Grid>

                <Grid item lg={3} md={3} sm={6} xs={6}>
                  <Input
                    register={register("phone", {required: true})}
                    label="Phone Number"
                    important
                  />
                </Grid>

                <Grid item lg={3} md={3} sm={6} xs={6}>
                  <Input
                    register={register("email", {required: true})}
                    label="Email Address"
                    important
                  />
                </Grid>

                <Grid item lg={4} md={6} sm={8}>
                  <GoogleAddressInput
                    register={register("address", {required: true})}
                    getSelectedAddress={handleGoogleAddressSelect}
                    label={
                      customerType === "corporate"
                        ? "Organization Address"
                        : "Residential Address"
                    }
                    //placeholder="Enter customer name"
                  />
                </Grid>

                <Grid item lg={2} md={3} sm={4}>
                  <Input
                    register={register("lga", {required: true})}
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
                  <Input
                    register={register("clientclass", {required: true})}
                    label="Customer Class"
                    //placeholder="Enter customer number"
                  />
                </Grid>

                <Grid item lg={4} md={4} sm={6}>
                  <Collapse in={customerType === "corporate"}>
                    <Input
                      register={register("orgbranch", {
                        required: customerType === "corporate" ? true : false,
                      })}
                      label="Organization Branch"
                      //placeholder="Enter customer number"
                    />
                  </Collapse>
                </Grid>
              </Grid>
            </Box>

            <Box>
              <FormsHeaderText text="Deal Details" />
              <Grid container spacing={1} mt={0.5}>
                <Grid item lg={2} md={3} sm={6}>
                  <Input
                    register={register("probability", {required: true})}
                    label="Probability"
                    type="number"
                    //placeholder="Enter customer name"
                  />
                </Grid>
                <Grid item lg={2} md={3} sm={6}>
                  <Input
                    register={register("size", {required: true})}
                    label="Size"
                    type="number"
                    //placeholder="Enter customer number"
                  />
                </Grid>

                <Grid item lg={2} md={3} sm={6}>
                  <CustomSelect
                    label="Status"
                    options={["Open", "Suspended", "Closed"]}
                    name="status"
                    control={control}
                    important
                    required
                  />
                </Grid>

                <Grid item lg={2} md={3} sm={6}>
                  <Input
                    label="Next Action"
                    register={register("nextAction", {required: true})}

                    //placeholder="Enter customer number"
                  />
                </Grid>

                <Grid item lg={2} md={3} sm={6}>
                  <Input
                    register={register("weightForecast", {required: true})}
                    label="Weight Forecast"
                    disabled
                    //placeholder="Enter customer number"
                  />
                </Grid>
                <Grid item lg={2} md={3} sm={6}>
                  <MuiCustomDatePicker
                    label="Closing Date"
                    name="closingDate"
                    control={control}
                  />
                </Grid>

                <Grid item lg={12} md={12} sm={12}>
                  <Textarea
                    label="Additional Information"
                    placeholder="Write here..."
                    register={register("additional_info")}
                  />
                </Grid>
                {/* 
                <Grid item lg={6} md={6} sm={6}>
                  <Textarea
                    label="More Additional Information"
                    placeholder="Write here..."
                    register={register("more_additional_info")}
                  />
                </Grid> */}
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
                    <ContactCreate
                      closeModal={() => setContactModal(false)}
                      createContact={handleAddContact}
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
                        clear={success}
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

        {/* <ModalBox
          open={infoModal}
          onClose={() => setInfoModal(false)}
          header="Add New Information"
        >
          <CreateAdditionalInfo
            closeModal={() => setInfoModal(false)}
            addInfo={addNewInfo}
          />
        </ModalBox> */}
      </Box>
    </>
  );
};

export default LeadsCreate;
