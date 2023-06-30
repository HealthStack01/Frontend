import {useState, useContext, useCallback, useEffect} from "react";
import {Box, Grid, capitalize} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";

import client from "../../../../../feathers";
import Input from "../../../../../components/inputs/basic/Input";
import CustomSelect from "../../../../../components/inputs/basic/Select";
import GlobalCustomButton from "../../../../../components/buttons/CustomButton";
import {ObjectContext, UserContext} from "../../../../../context";
import ReactCustomSelectComponent from "../../../../../components/react-custom-select";
import ReactCustomSearchSelectComponent from "../../../../../components/react-custom-select/ReactSearchSelect";

const CreateNewChannel = ({closeModal}) => {
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const EmployeeServ = client.service("employee");
  const locationServer = client.service("location");
  const facilityServ = client.service("facility");
  const ClientServ = client.service("client");
  const chatroomServer = client.service("chatroom");
  const ChatServer = client.service("chat");
  const {user} = useContext(UserContext);
  const [staffs, setStaffs] = useState([]);
  const [members, setMemebers] = useState([]);
  const [val, setVal] = useState("");
  const [facilities, setFacilities] = useState([]);
  const [fetchingFacilities, setFetchingFacilities] = useState(false);
  const [clients, setClients] = useState([]);
  const [fetchingClients, setFetchingClients] = useState(false);
  const {register, reset, control, handleSubmit, watch} = useForm();
  const [outerStaffs, setOuterStaffs] = useState([]);
  const [locations, setLocations] = useState([]);

  const selectedOrg = watch("organization");
  const channelType = watch("channel_type");
  const location = watch("location");

  const handleCreateChannel = async data => {
    const employee = user.currentEmployee;

    showActionLoader();

    //return console.log(data);

    const allStaffs =
      data.outer_staffs === undefined
        ? data.staffs
        : [...data.staffs, ...data.outer_staffs];

    const clients =
      data.clients === undefined
        ? []
        : data.clients.map(client => {
            return {
              name: `${capitalize(
                client.firstname.replace(/\s/g, "")
              )} ${capitalize(client.lastname.replace(/\s/g, ""))}`,
              phone: client.phone,
              email: client.email,
              imageurl: client.imageurl || "",
              profession: capitalize(client.profession),
              _id: client._id,
              type: "client",
              model: "client",
              organization: employee.facilityDetail,
            };
          });

    const staffs = allStaffs.map(staff => {
      return {
        name: `${capitalize(staff.firstname.replace(/\s/g, ""))} ${capitalize(
          staff.lastname.replace(/\s/g, "")
        )}`,
        phone: staff.phone,
        email: staff.email,
        imageurl: staff.imageurl || "",
        profession: capitalize(staff.profession),
        _id: staff._id,
        type: "staff",
        model: "employee",
        organization: staff.facilityDetail,
      };
    });

    const newChatRoom = {
      name: data.channel_name,
      description: data.channel_description,
      chatType: data.channel_type,
      members: [
        {
          name: `${capitalize(
            employee.firstname.replace(/\s/g, "")
          )} ${capitalize(employee.lastname.replace(/\s/g, ""))}`,
          phone: employee.phone,
          email: employee.email,
          imageurl: employee.imageurl || "",
          profession: capitalize(employee.profession),
          _id: employee._id,
          type: "staff",
          model: "employee",
          organization: employee.facilityDetail,
        },
        ...staffs,
        ...clients,
      ],
    };

    //return console.log(newChatRoom);

    return chatroomServer
      .create(newChatRoom)
      .then(res => {
        setState(prev => ({
          ...prev,
          ChatModule: {
            ...prev.ChatModule,
            chatRoom: res,
          },
        }));
        hideActionLoader();
        closeModal();
      })
      .catch(error => {
        hideActionLoader();
        toast.error(`Something went wrong ${error}`);
        return console.log(error);
      });
  };

  const handleGetStaffs = useCallback(async () => {
    let query = {
      facility: user.currentEmployee.facilityDetail._id,
      _id: {$ne: user.currentEmployee._id},
      $limit: 200,
      $sort: {
        createdAt: -1,
      },
    };
    if (location !== undefined && location !== "") {
      query["locations._id"] = location.value;
    }

    EmployeeServ.find({
      query: query,
    })
      .then(res => {
        setStaffs(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [location]);

  useEffect(() => {
    handleGetStaffs();
  }, [handleGetStaffs]);

  const handleClientSearch = val => {
    if (val.length <= 3 && val.trim() === "") return;
    setFetchingClients(true);

    ClientServ.find({
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
      })
      .catch(err => {
        setFetchingClients(false);
        toast.error("An error occured, check your network");
      });
  };

  const handleFacilitySearch = val => {
    if (val.length <= 3 && val.trim() === "") return;
    setFetchingFacilities(true);

    facilityServ
      .find({
        _id: {$ne: user.currentEmployee.facilityDetail._id},
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
        //console.log(res);
        setFacilities(res.data);
        setFetchingFacilities(false);
      })
      .catch(err => {
        console.log(err);
        setFetchingFacilities(false);
        toast.error("An error occured, check your network");
      });
  };

  const getOuterStaffs = useCallback(async () => {
    if (!selectedOrg) return;

    EmployeeServ.find({
      query: {
        facility: selectedOrg.value,
        _id: {$ne: user.currentEmployee._id},
        $limit: 200,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then(res => {
        setOuterStaffs(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [selectedOrg]);

  useEffect(() => {
    getOuterStaffs();
  }, [getOuterStaffs]);

  const getLocations = useCallback(async () => {
    if (channelType !== "Location") return;
    const resp = await locationServer.find({
      query: {
        facility: user.currentEmployee.facilityDetail._id,
        $limit: 200,
        $sort: {
          createdAt: -1,
        },
      },
    });
    //console.log(resp.data);
    setLocations(resp.data);
  }, [user.currentEmployee, channelType]);

  useEffect(() => {
    getLocations();
  }, [getLocations]);

  return (
    <Box
      sx={{
        width: "550px",
      }}
    >
      <Box>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12}>
            <CustomSelect
              label="Channel Type"
              name="channel_type"
              options={[
                "Unit",
                "Location",
                "Client",
                "Global",
                "Department",
                "Organization",
                //"Network",
              ]}
              required="Select Channel Type"
              control={control}
            />
          </Grid>

          <Grid item xs={12}>
            <Input
              label="Channel Name"
              register={register("channel_name", {
                required: "Provide Channel Name",
              })}
            />
          </Grid>

          <Grid item xs={12}>
            <Input
              label="Channel Description"
              register={register("channel_description", {
                required: "Provide Channel Description",
              })}
            />
          </Grid>

          {channelType === "Location" && (
            <Grid item xs={12}>
              <ReactCustomSelectComponent
                control={control}
                name="location"
                placeholder="Select Location"
                options={locations.map(item => {
                  return {
                    label: `${item.name} - ${item.locationType}`,
                    value: item._id,
                  };
                })}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <ReactCustomSelectComponent
              multiple
              control={control}
              disabled={channelType === "Location" && location === ""}
              name="staffs"
              placeholder="Select staffs"
              options={staffs.map(item => {
                return {
                  label: `${item.firstname} ${item.lastname}`,
                  value: item._id,
                  ...item,
                };
              })}
            />
          </Grid>

          {channelType === "Client" && (
            <Grid item xs={12}>
              <ReactCustomSearchSelectComponent
                control={control}
                onInputChange={handleClientSearch}
                isLoading={fetchingClients}
                name="clients"
                disabled={channelType !== "Client"}
                multiple
                placeholder="Select Client"
                options={clients.map(item => {
                  return {
                    label: `${item.firstname} ${item.lastname}`,
                    value: item._id,
                    ...item,
                  };
                })}
              />
            </Grid>
          )}

          {channelType === "Organization" && (
            <>
              <Grid item xs={12}>
                <ReactCustomSearchSelectComponent
                  disabled={channelType !== "Organization"}
                  control={control}
                  onInputChange={handleFacilitySearch}
                  isLoading={fetchingFacilities}
                  name="organization"
                  placeholder="Select organization"
                  options={facilities.map(item => {
                    return {
                      label: item.facilityName,
                      value: item._id,
                    };
                  })}
                />
              </Grid>

              <Grid item xs={12}>
                <ReactCustomSelectComponent
                  multiple
                  control={control}
                  disabled={!selectedOrg}
                  name="outer_staffs"
                  placeholder="Choose staffs from Organization"
                  options={outerStaffs.map(item => {
                    return {
                      label: `${item.firstname} ${item.lastname}`,
                      value: item._id,
                      ...item,
                    };
                  })}
                />
              </Grid>
            </>
          )}
        </Grid>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <GlobalCustomButton
            sx={{
              width: "90%",
            }}
            onClick={handleSubmit(handleCreateChannel)}
          >
            Create Channel
          </GlobalCustomButton>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateNewChannel;
