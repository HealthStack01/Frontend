import {Box, IconButton, Typography, capitalize} from "@mui/material";
import Slide from "@mui/material/Slide";
import {useContext, useState} from "react";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import LinearProgress from "@mui/material/LinearProgress";

import client from "../../feathers";
import {ObjectContext, UserContext} from "../../context";
import {useForm} from "react-hook-form";
import Input from "../inputs/basic/Input";
import ReactCustomSelectComponent from "../react-custom-select";
import Textarea from "../inputs/basic/Textarea";
import GlobalCustomButton from "../buttons/CustomButton";
import ReactCustomSearchSelectComponent from "../react-custom-select/ReactSearchSelect";
import {toast} from "react-toastify";
import dayjs from "dayjs";

const returnComplaintTo = (object, type) => {
  if (type === "organization") {
    return {
      type: "Organization",
      entity: {
        email: object.facilityEmail,
        name: capitalize(object.facilityName),
        entityId: object._id,
        phone: object.facilityContactPhone,
      },
    };
  } else {
    return {
      type: "Person",
      entity: {
        email: object.email,
        phone: object.phone,
        name: capitalize(`${object.firstname} ${object.lastname}`),
        entityId: object._id,
      },
    };
  }
};

const PopUpComplaintFormComponent = () => {
  const complaintServer = client.service("complaints");
  const facilityServer = client.service("facility");
  const clientServer = client.service("client");
  const [clients, setClients] = useState([]);
  const [fetchingClients, setFetchingClients] = useState(false);
  const [facilities, setFacilities] = useState([]);
  const [fetchingFacilities, setFetchingFacilities] = useState(false);
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const {register, handleSubmit, control, reset, watch} = useForm({});
  const [loading, setLoading] = useState(false);

  const closeForm = () => {
    setState(prev => ({
      ...prev,
      ComplaintModule: {
        ...prev.ComplaintModule,
        popup: false,
      },
    }));
  };

  const handleCreateComplaint = async data => {
    const employee = user.currentEmployee;
    const facility = employee.facilityDetail;

    //return toast.error("Something went wrong!");

    setLoading(true);

    const targetOrg = {
      type: "Organization",
      entity: {
        email: "admin@healthstack.africa",
        name: "Healthstack Implementation",
        entityId: "63d275e3b40a06001641ef71",
        phone: "08036648712",
      },
    };

    const target = targetOrg;

    // const copiedOrgs = data.copied_organizations.map(item => {
    //   return returnComplaintTo(item, "organization");
    // });

    // const copiedClients = data.copied_clients.map(item => {
    //   return returnComplaintTo(item, "person");
    // });

    const copied = []; //[...copiedOrgs, ...copiedClients];

    const from = returnComplaintTo(facility, "organization");

    const document = {
      resolution: false,
      from: from,
      to: target,
      copied: copied,
      submissionby: employee,
      submissiondate: dayjs(),
      createdBy: employee._id,
      subject: data.subject,
      category: data.category.value,
      complaint: data.complaint,
    };

    await complaintServer
      .create(document)
      .then(res => {
        Object.keys(data).forEach(key => {
          data[key] = null;
        });
        closeForm();
        setLoading(false);
        toast.success(
          "Your Complaint was submitted successfully and it will be attended to."
        );
      })
      .catch(err => {
        setLoading(false);
        toast.error(`There was an error submitting your Complaint ${err}`);
        console.log(err);
      });
  };

  const handleClientSearch = val => {
    if (val.length <= 3 && val.trim() === "") return;
    setFetchingClients(true);

    clientServer
      .find({
        query: {
          $or: [
            {
              firstname: {
                $regex: val,
                $options: "i",
              },
            },
            {
              lastname: {
                $regex: val,
                $options: "i",
              },
            },
            {
              middlename: {
                $regex: val,
                $options: "i",
              },
            },
            {
              phone: {
                $regex: val,
                $options: "i",
              },
            },
            {
              clientTags: {
                $regex: val,
                $options: "i",
              },
            },
            {
              mrn: {
                $regex: val,
                $options: "i",
              },
            },
            {
              email: {
                $regex: val,
                $options: "i",
              },
            },
            {
              specificDetails: {
                $regex: val,
                $options: "i",
              },
            },
            {gender: val},
          ],

          "relatedfacilities.facility": user.currentEmployee.facilityDetail._id, // || "",
          $limit: 100,
          $sort: {
            createdAt: -1,
          },
        },
      })
      .then(res => {
        setFetchingClients(false);
        setClients(res.data);
        //console.log("client", res.data[0]);
      })
      .catch(err => {
        setFetchingClients(false);
        toast.error("An error occured, check your network");
      });
  };

  const handleFacilitySearch = val => {
    if (val.length <= 3 && val.trim() === "") return;
    setFetchingFacilities(true);

    facilityServer
      .find({
        query: {
          $or: [
            {
              facilityName: {
                $regex: val,
                $options: "i",
              },
            },
            {
              facilityOwner: {
                $regex: val,
                $options: "i",
              },
            },
            {
              facilityType: {
                $regex: val,
                $options: "i",
              },
            },
            {
              facilityCategory: {
                $regex: val,
                $options: "i",
              },
            },
            {
              facilityContactPhone: {
                $regex: val,
                $options: "i",
              },
            },
            {
              facilityEmail: {
                $regex: val,
                $options: "i",
              },
            },
          ],

          $limit: 100,
          $sort: {
            createdAt: -1,
          },
        },
      })
      .then(res => {
        console.log(res);
        setFacilities(res.data);
        setFetchingFacilities(false);
        //console.log("facility", res.data[0]);
      })
      .catch(err => {
        console.log(err);
        setFetchingFacilities(false);
        toast.error("An error occured, check your network");
      });
  };

  return (
    <Slide in={state.ComplaintModule.popup} direction="up">
      <Box
        sx={{
          width: "400px",
          height: "470px",
          position: "fixed",
          right: 24,
          bottom: 0,
          background: "#fffff",
          zIndex: "999999",
          boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
          padding: "20px",
        }}
      >
        {loading && <LinearProgress sx={{marginBottom: "20px"}} />}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          mb={4}
        >
          <Typography sx={{fontWeight: "600"}}>
            Have Complaints? Let us Know!
          </Typography>
          <IconButton onClick={closeForm}>
            <ExpandCircleDownOutlinedIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "24px",
          }}
        >
          <Input label="Subject" register={register("subject")} />

          <ReactCustomSelectComponent
            control={control}
            name="category"
            placeholder="Select Category"
            options={[
              {
                label: "Basic Complaint",
                value: "Basic Complaint",
              },
              {
                label: "Subordinate Complaint",
                value: "Subordinate Complaint",
              },
              {
                label: "Superordinate Complaint",
                value: "Superordinate Complaint",
              },
            ]}
          />

          {/* <ReactCustomSearchSelectComponent
            control={control}
            multiple
            onInputChange={handleFacilitySearch}
            isLoading={fetchingFacilities}
            name="copied_organizations"
            placeholder="Copy Involved Organizations"
            options={facilities.map(item => {
              return {
                label: item.facilityName,
                value: item._id,
                ...item,
              };
            })}
          /> */}

          {/* <ReactCustomSearchSelectComponent
            control={control}
            onInputChange={handleClientSearch}
            isLoading={fetchingClients}
            name="copied_clients"
            multiple
            placeholder="Copy Involved Clients"
            options={clients.map(item => {
              return {
                label: `${item.firstname} ${item.lastname}`,
                value: item._id,
                ...item,
              };
            })}
          /> */}

          <Textarea
            label="Description"
            placeholder="write here..."
            register={register("complaint", {
              required: "Please enter complaint",
            })}
          />
        </Box>

        <Box mt={6}>
          <GlobalCustomButton
            variant="outlined"
            sx={{
              width: "100%",
              border: "3px solid",
            }}
            onClick={handleSubmit(handleCreateComplaint)}
            disabled={loading}
            //loading={loading}
          >
            Submit Complaint
          </GlobalCustomButton>
        </Box>
      </Box>
    </Slide>
  );
};

export default PopUpComplaintFormComponent;
