import {Box, Grid, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import Input from "../inputs/basic/Input";
import dayjs from "dayjs";

const malePlaceholder =
  "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg";

const placeholder =
  "https://media.istockphoto.com/id/1266829552/vector/institution-icon-court-building-symbol-bank-financial-institute-wall-street-symbol-federal.jpg?s=612x612&w=0&k=20&c=0tA516OTE8mMxicWdsHOVIVT07zX2WZtSz3pQZvRM2g=";

const DefaultFacilityDetail = ({detail, goBack, editable}) => {
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
  }, [detail]);

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
              width: "8rem",
              height: "calc(2.55rem * 3)",
              border: "1px solid #bbbbbb",
              p: 0.5,
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
            <Grid item lg={4} md={3} sm={6} xs={12}>
              <Input
                register={register("facilityName")}
                label="Facility Name"
                disabled={!editable}
              />
            </Grid>

            <Grid item lg={4} md={3} sm={6} xs={12}>
              <Input
                register={register("facilityOwner")}
                label="Facility Owner"
                disabled={!editable}
              />
            </Grid>

            <Grid item lg={4} md={3} sm={6} xs={12}>
              <Input
                register={register("facilityType")}
                label="Facility Type"
                disabled={!editable}
              />
            </Grid>

            <Grid item lg={4} md={3} sm={6} xs={12}>
              <Input
                register={register("facilityCategory")}
                label="Facility Category"
                disabled={!editable}
              />
            </Grid>

            <Grid item lg={4} md={3} sm={6} xs={12}>
              <Input
                register={register("facilityContactPhone")}
                label="Contact Phone"
                disabled={!editable}
              />
            </Grid>

            <Grid item lg={4} md={3} sm={6} xs={12}>
              <Input
                register={register("facilityEmail")}
                label="Contact Email"
                disabled={!editable}
              />
            </Grid>

            <Grid item lg={8}>
              <Input
                register={register("facilityAddress")}
                label="Facility Address"
                disabled={!editable}
              />
            </Grid>

            <Grid item lg={4} md={3} sm={6} xs={12}>
              <Input
                register={register("facilityLga")}
                label="Facility LGA"
                disabled={!editable}
              />
            </Grid>

            {/* <Grid item lg={4} md={3} sm={6} xs={12}>
              <Input
                register={register("facilityCountry")}
                label="Facility Country"
              />
            </Grid> */}
          </Grid>
        </Box>

        <Box>
          <Grid container spacing={1}>
            <Grid item lg={4} md={3} sm={6} xs={12}>
              <Input
                register={register("facilityCity")}
                label="Facility City"
                disabled={!editable}
              />
            </Grid>

            <Grid item lg={4} md={3} sm={6} xs={12}>
              <Input
                register={register("facilityState")}
                label="Facility State"
                disabled={!editable}
              />
            </Grid>

            <Grid item lg={4} md={3} sm={6} xs={12}>
              <Input
                register={register("facilityCountry")}
                label="Facility Country"
                disabled={!editable}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default DefaultFacilityDetail;
