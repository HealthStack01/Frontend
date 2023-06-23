import {Box, Grid, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import Input from "../inputs/basic/Input";
import dayjs from "dayjs";

const malePlaceholder =
  "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg";

const placeholder =
  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png";

const DefaultClientDetail = ({detail, goBack}) => {
  const {register, reset} = useForm();
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    console.log(detail);
    const defaultValues = {
      ...detail,
      dob: dayjs(detail?.dob).format("MMM DD, YYYY"),
      createdAt: dayjs(detail?.createdAt).format("MMM DD, YYYY"),
    };

    reset(defaultValues);
  }, []);

  return (
    <Box p={2}>
      {/* <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          borderBottom: "1px solid #f8f8f8",
          backgroundColor: "#f8f8f8",
          position: "sticky",
          zIndex: 99,
          top: 0,
          left: 0,
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
          <GlobalCustomButton onClick={goBack}>
            <ArrowBackIcon sx={{marginRight: "3px"}} fontSize="small" />
            Back
          </GlobalCustomButton>

          <Typography
            sx={{
              fontSize: "0.95rem",
              fontWeight: "600",
            }}
          >
            Details for Client - {detail?.firstname} {detail?.lastname}'s
          </Typography>
        </Box>

        {edit && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
            gap={1}
          >
            <GlobalCustomButton
              onClick={handleSubmit(handleUpdatePolicyDetails)}
              color="success"
            >
              <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
              Update Client
            </GlobalCustomButton>

            <GlobalCustomButton onClick={cancelEditPolicy} color="warning">
              <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
              Cancel Update
            </GlobalCustomButton>
          </Box>
        )}

        {!edit && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
            gap={1}
          >
            <GlobalCustomButton onClick={handleEditPolicy}>
              <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
              Edit Client
            </GlobalCustomButton>
          </Box>
        )}
      </Box> */}

      <Box>
        <Box
          sx={{
            display: "flex",
          }}
          gap={1}
          mb={2}
        >
          <Box
            sx={{
              width: "150px",
              height: "calc(2.55rem * 3)",
            }}
          >
            <img
              src={placeholder}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                display: "block",
                objectFit: "cover",
              }}
            />
          </Box>

          <Grid container spacing={1}>
            <Grid item lg={4}>
              <Input register={register("firstname")} label="First Name" />
            </Grid>

            <Grid item lg={4}>
              <Input register={register("middlename")} label="Middle Name" />
            </Grid>

            <Grid item lg={4}>
              <Input register={register("lastname")} label="Last Name" />
            </Grid>

            <Grid item lg={4}>
              <Input register={register("dob")} label="Date of Birth" />
            </Grid>

            <Grid item lg={4}>
              <Input register={register("gender")} label="Gender" />
            </Grid>

            <Grid item lg={4}>
              <Input
                register={register("marital_status")}
                label="Marital Status"
              />
            </Grid>

            <Grid item lg={4}>
              <Input register={register("phone")} label="Phone Number" />
            </Grid>

            <Grid item lg={4}>
              <Input register={register("email")} label="Email Address" />
            </Grid>

            <Grid item lg={4}>
              <Input
                register={register("createdAt")}
                label="Registeration Date"
              />
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Grid container spacing={1}>
            <Grid item lg={3}>
              <Input register={register("profession")} label="Profession" />
            </Grid>

            <Grid item lg={3}>
              <Input register={register("religion")} label="Religion" />
            </Grid>

            <Grid item lg={3}>
              <Input register={register("policyNo")} label="Policy Number" />
            </Grid>

            <Grid item lg={3}>
              <Input register={register("phone")} label="Medical Rec. Number" />
            </Grid>

            <Grid item lg={3}>
              <Input register={register("address")} label="Address" />
            </Grid>

            <Grid item lg={3}>
              <Input register={register("town")} label="Town" />
            </Grid>

            <Grid item lg={3}>
              <Input register={register("lga")} label="LGA" />
            </Grid>

            <Grid item lg={3}>
              <Input register={register("city")} label="City" />
            </Grid>

            <Grid item lg={3}>
              <Input register={register("state")} label="State" />
            </Grid>

            <Grid item lg={3}>
              <Input register={register("country")} label="Country" />
            </Grid>

            <Grid item lg={3}>
              <Input register={register("bloodgroup")} label="Blood Group" />
            </Grid>

            <Grid item lg={3}>
              <Input register={register("genotype")} label="Genotype" />
            </Grid>

            <Grid item lg={3}>
              <Input register={register("disablilities")} label="Disabilies" />
            </Grid>

            <Grid item lg={3}>
              <Input register={register("allergies")} label="Allergies" />
            </Grid>

            <Grid item lg={3}>
              <Input register={register("tags")} label="Tags" />
            </Grid>

            <Grid item lg={3}>
              <Input
                register={register("specific_details")}
                label="Specific Details"
              />
            </Grid>

            <Grid item lg={3}>
              <Input
                register={register("nok_name")}
                label="Name of Next of Kin"
              />
            </Grid>

            <Grid item lg={3}>
              <Input
                register={register("nok_phone")}
                label="Phone of Next of Kin"
              />
            </Grid>

            <Grid item lg={3}>
              <Input
                register={register("nok_email")}
                label="Email of Next of Kin"
              />
            </Grid>

            <Grid item lg={3}>
              <Input
                register={register("nok_relationship")}
                label="Next of Kin Relationship"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default DefaultClientDetail;
