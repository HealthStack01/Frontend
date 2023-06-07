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

const CreateNewChannel = () => {
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const EmployeeServ = client.service("employee");
  const chatroomServer = client.service("chatroom");
  const ChatServer = client.service("chat");
  const {user} = useContext(UserContext);
  const [staffs, setStaffs] = useState([]);
  const [members, setMemebers] = useState([]);
  const [val, setVal] = useState("");
  const {register, reset, control, handleSubmit} = useForm();

  const handleCreateChannel = async data => {
    const employee = user.currentEmployee;

    //showActionLoader();

    //return console.log(data);

    const staffs = data.staffs.map(staff => {
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
        organization: employee.facilityDetail,
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
      })
      .catch(error => {
        hideActionLoader();
        toast.error(`Something went wrong ${error}`);
        return console.log(error);
      });
  };

  const handleGetStaffs = useCallback(async () => {
    //setFetchingStaffs(true);
    if (user.currentEmployee) {
      const resp = await EmployeeServ.find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          $limit: 200,
          $sort: {
            createdAt: -1,
          },
        },
      });

      await setStaffs(resp.data);
      console.log(resp.data);
      //setFetchingStaffs(false);
    } else {
      if (user.stacker) {
        const resp = await EmployeeServ.find({
          query: {
            $limit: 100,
            $sort: {
              facility: -1,
            },
          },
        });

        await setStaffs(resp.data);
        //setFetchingStaffs(false);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      handleGetStaffs();
    } else {
      return;
    }
    EmployeeServ.on("created", obj => handleGetStaffs());
    EmployeeServ.on("updated", obj => handleGetStaffs());
    EmployeeServ.on("patched", obj => {
      handleGetStaffs();
    });
    EmployeeServ.on("removed", obj => handleGetStaffs());
    return () => {};
  }, []);

  // const handleCreateChannel = data => {
  //   if (members.length === 0)
  //     return toast.warning("Select at least one Channel member");
  //   const document = {
  //     ...data,
  //     members: members.map(item => item._id),
  //   };

  //   console.log(document);
  // };

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
                "Network",
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

          <Grid item xs={12}>
            <ReactCustomSelectComponent
              multiple
              control={control}
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
