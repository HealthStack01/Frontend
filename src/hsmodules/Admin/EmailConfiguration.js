import {useContext, useState, useEffect} from "react";
import {Box, Grid, Typography} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import {useForm} from "react-hook-form";
//import {ErrorMessage} from "@hookform/error-message";

import GlobalCustomButton from "../../components/buttons/CustomButton";
import {FormsHeaderText} from "../../components/texts";
import Input from "../../components/inputs/basic/Input";
import Textarea from "../../components/inputs/basic/Textarea";
import PasswordInput from "../../components/inputs/basic/Password";
import CustomTable from "../../components/customtable";
import client from "../../feathers";
import {ObjectContext, UserContext} from "../../context";
import {toast} from "react-toastify";
import CustomSelect from "../../components/inputs/basic/Select";

const OrganizationEmailConfiguration = () => {
  const facilityConfigServer = client.service("facility-config");
  const {user} = useContext(UserContext);
  const {showActionLoader, hideActionLoader} = useContext(ObjectContext);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    register,
    reset,
    formState: {errors},
    handleSubmit,
    control,
  } = useForm();

  const handleRowClicked = item => {};

  const onSubmit = async data => {
    showActionLoader();

    // facility search search should be implemented,
    const document = {
      emailConfig: {
        ...data,
        security: data.security.toLowerCase() === "true",
      },
      organizationId: user.currentEmployee.facilityDetail._id,
      organizationName: user.currentEmployee.facilityDetail.facilityName,
    };

    //return console.log(document);

    await facilityConfigServer
      .create(document)
      .then(res => {
        Object.keys(data).forEach(key => {
          data[key] = "";
        });

        reset(data);
        hideActionLoader();
        toast.success(`You've successfully add an Email Configuration`);
      })
      .catch(err => {
        hideActionLoader();
        console.log(err);
        toast.error(
          `Sorry, You weren't able to create an Email Configuration. ${err}`
        );
      });
    //setLoading(false);
  };

  const getFacilities = async () => {
    setLoading(true);
    if (user.currentEmployee) {
      const findConfig = await facilityConfigServer.find({
        query: {
          organizationId: user.currentEmployee.facilityDetail._id,
          $limit: 200,
          $sort: {
            createdAt: -1,
          },
        },
      });

      await setFacilities(findConfig.data);
      setLoading(false);
    } else {
      if (user.stacker) {
        const findConfig = await facilityConfigServer.find({
          query: {
            $limit: 100,
            $sort: {
              facility: -1,
            },
          },
        });

        await setFacilities(findConfig.data);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (user) {
      getFacilities();
    } else {
      return;
    }
    facilityConfigServer.on("created", obj => getFacilities());
    facilityConfigServer.on("updated", obj => getFacilities());
    facilityConfigServer.on("patched", obj => {
      getFacilities();
    });
    facilityConfigServer.on("removed", obj => getFacilities());
    return () => {};
  }, []);

  const columns = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row, i) => i + 1,
      sortable: true,
      inputType: "HIDDEN",
      width: "60px",
    },
    {
      name: "Username",
      key: "sn",
      description: "Enter name of Company",
      selector: row => (
        <Typography
          sx={{fontSize: "0.8rem", whiteSpace: "normal"}}
          data-tag="allowRowEvents"
        >
          {row?.emailConfig?.username}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      style: {
        color: "#1976d2",
        //textTransform: "capitalize",
      },
    },
    {
      name: "Server",
      key: "emailConfig",
      description: "SN",
      selector: (row, i) => row.emailConfig.server,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "SMTP",
      key: "emailConfig",
      description: "SN",
      selector: (row, i) => row.emailConfig.smtp,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Security",
      key: "emailConfig",
      description: "SN",
      selector: (row, i) =>
        row.emailConfig.security ? "Has Security" : "No Security",
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Description/Note",
      key: "emailConfig",
      description: "SN",
      selector: (row, i) => row.emailConfig.note,
      sortable: true,
      inputType: "HIDDEN",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
      p={2}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          mb={2}
        >
          <FormsHeaderText text="Configure New Email" />

          <GlobalCustomButton onClick={handleSubmit(onSubmit)}>
            <EmailIcon fontSize="small" sx={{marginRight: "5px"}} /> Configure
            Email
          </GlobalCustomButton>
        </Box>

        <form>
          <Grid spacing={2} container mb={2}>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Input
                label="Username"
                important
                type="email"
                register={register("username", {
                  required: "Username is Required",
                })}
                errorText={errors?.username?.message}
              />
            </Grid>

            <Grid item lg={6} md={6} sm={6} xs={12}>
              <PasswordInput
                label="Password"
                important
                type="email"
                autoComplete="new-password"
                register={register("password", {
                  required: "Please enter a password",
                })}
                errors={errors?.password?.message}
              />
            </Grid>

            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Input
                label="Server"
                important
                type="text"
                register={register("server", {required: "Field is required"})}
                errorText={errors?.server?.message}
              />
            </Grid>

            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Input
                label="SMTP"
                important
                type="text"
                register={register("smtp", {required: "Please enter a SMPT"})}
                errorText={errors?.smpt?.message}
              />
            </Grid>

            <Grid item lg={4} md={4} sm={6} xs={12}>
              <CustomSelect
                label="Include Security"
                important
                type="text"
                options={["True", "False"]}
                control={control}
                required={"Please Select True/False for Security"}
                name="security"
                // register={register("security", {
                //   required: "Please Select True/False for Security",
                // })}
                errorText={errors?.security?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Textarea
                label="Description"
                important
                register={register("note", {
                  required: "Please include a description",
                })}
                errorText={errors?.note?.message}
              />
            </Grid>
          </Grid>
        </form>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <FormsHeaderText text="List of Configured Emails" />

        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <CustomTable
            title={""}
            columns={columns}
            data={facilities}
            pointerOnHover
            highlightOnHover
            striped
            onRowClicked={handleRowClicked}
            progressPending={loading}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default OrganizationEmailConfiguration;
