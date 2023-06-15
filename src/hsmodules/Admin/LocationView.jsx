import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import Input from "../../components/inputs/basic/Input";
import ViewText from "../../components/viewtext";
import { UserContext, ObjectContext } from "../../context";
import { Box, IconButton, Grid, Typography } from "@mui/material";
import client from "../../feathers";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  BottomWrapper,
  DetailsWrapper,
  GrayWrapper,
  GridBox,
  HeadWrapper,
  PageWrapper,
} from "../app/styles";
import dayjs, { Dayjs } from "dayjs";
import { createLocationSchema } from "./ui-components/schema";
import CustomSelect from "../../components/inputs/basic/Select";
import { bandTypeOptions } from "../../dummy-data";
// import ModalBox from "../../components/modal";
import CustomTable from "../../components/customtable";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalBox from "../../components/modal";
import CustomConfirmationDialog from "../../components/confirm-dialog/confirm-dialog";
import { sub } from "date-fns/esm/fp";

// import { createClientSchema } from "./schema";

const LocationView = ({ open, setOpen, location }) => {
  const LocationServ = client.service("location");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const result = localStorage.getItem("user");
  const [openLoc, setOpenLoc] = useState(false);
  const [openSubLoc, setOpenSubLoc] = useState(false);
  const sublocationTypeOptions = ["Bed", "Unit"];
  const [typeLocation, setTypeLocation] = useState("");
  const [typeName, setTypeName] = useState("");
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [confirmDialog2, setConfirmDialog2] = useState(false);
  const [sublocationData, setSubLocationData] = useState([]);
  const [defaultLocationType, setDefaultLocationType] = useState();
  const [isDefaultLocationType, setIsDefaultLocationType] = useState(true);

  // const { state, setState } = useContext(UserContext);
  const { state, setState } = useContext(ObjectContext);
  const data = JSON.parse(result);
  const locationDetails = state.LocationModule.selectedLocation;

  const locationTypeOptions = [
    "Front Desk",
    "Clinic",
    "Ward",
    "Store",
    "Laboratory",
    "Finance",
    "Theatre",
    "Pharmacy",
    "Radiology",
    "Managed Care",
  ];

  // console.log("locationDetails", locationDetails);
  const handleCloseModal = () => {
    setOpenLoc(false);
  };

  const handleClose = () => {
    setOpenSubLoc(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(createLocationSchema),

    defaultValues: {
      name: location.name,
      locationType: location.locationType,
      facility: data.currentEmployee.facility,
    },
  });
  // useEffect(() => {
  //   setValue("name", location.name,  {
  //       shouldValidate: true,
  //       shouldDirty: true
  //   })
  //   setValue("locationType", location.locationType,  {
  //       shouldValidate: true,
  //       shouldDirty: true
  //   })

  //   return () => {

  //   }
  // })

  const LocationDetailSchema = [
    {
      name: "S/N",
      key: "sn",
      description: "sn",
      sortable: true,
      selector: (row) => row.sn,
      inputType: "HIDDEN",
      width: "80px",
    },
    {
      name: "Type",
      key: "type Location",
      description: " Enter type Location",
      selector: (row) => row.type,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Name",
      key: "key",
      description: "Enter name ",
      selector: (row) => row.typeName,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  useEffect(() => {
    reset({
      name: location.name,
      bandType: location.locationType,
      facility: data.currentEmployee.facility,
    });
  }, []);

  const existingSublocation = location.sublocations.filter(
    (items) => items.typeName === typeName
  );

  const onSubmit = (e) => {
    // e.preventDefault();
    if (typeLocation === "" && typeName === "") {
      alert("Kindly enter missing data ");
    }

    if (!location.sublocations) {
      location.sublocations = [];
    }

    if (existingSublocation.length > 0) {
      toast.warning("Name already choosen");
      return;
    }

    let data = {
      type: typeLocation,
      typeName: typeName,
    };

    //  console.log(data);

    location.sublocations.push(data);
    reset();
  };

  const handleRowClick = (sublocation) => {
    setSubLocationData(sublocation);
    setOpenSubLoc(true);
  };

  const submit = async (data) => {
    setLoading(true);
    // e.preventDefault();
    data.name = data.name;
    data.locationType = data.locationType;
    data.sublocations = locationDetails.sublocations;
    setSuccess(false);
    console.log(data);
    await LocationServ.patch(locationDetails._id, data)
      .then((res) => {
        console.log(res);
        toast.success(`Location successfully updated`);
        setLoading(false);
        setOpen(false);
      })
      .catch((err) => {
        toast.error(`Sorry, You weren't able to update a location. ${err}`);
        setLoading(false);
      });

    setLoading(false);
  };

  const deleteLocation = async () => {
    const dleteId = locationDetails._id;
    LocationServ.remove(dleteId)
      .then((res) => {
        toast.success(`Location successfully deleted!`);
        setOpen(false);
        setConfirmDialog(false);
      })
      .catch((err) => {
        toast.error(`Sorry, Unable to delete location. ${err}`);
      });
  };

  const deleteSublocation = () => {
    setOpenSubLoc(true);
    const prevSublocation = locationDetails.sublocations || [];

    const newSublocation = prevSublocation.filter(
      (data) => data?._id !== sublocationData._id
    );

    const newLocation = {
      ...locationDetails,
      sublocations: newSublocation,
    };

    LocationServ.patch(locationDetails._id, newLocation)
      .then((res) => {
        setState((prev) => ({
          ...prev,
          LocationModule: { ...prev.ServicesModule, selectedLocation: res },
        }));
        toast.success(`Sublocation successfully deleted!`);
        setOpenSubLoc(false);
        setConfirmDialog2(false);
      })
      .catch((err) => {
        setOpenSubLoc(false);
        toast.error(`Sorry, Unable to delete sublocation. ${err}`);
      });
  };

  return (
    <Box>
      <CustomConfirmationDialog
        open={confirmDialog}
        cancelAction={() => setConfirmDialog(false)}
        confirmationAction={deleteLocation}
        type="danger"
        message="Are you sure you want to delete this data?"
      />
      <CustomConfirmationDialog
        open={confirmDialog2}
        cancelAction={() => setConfirmDialog2(false)}
        confirmationAction={deleteSublocation}
        type="danger"
        message="Are you sure you want to delete this data?"
      />
      <ModalBox
        open={openSubLoc}
        header="Sub Location Details"
        onClose={handleClose}
        width="60%"
      >
        <Box display="flex" justifyContent="flex-end" py="1rem">
          <GlobalCustomButton
            onClick={() => setConfirmDialog2(true)}
            color="error"
          >
            <DeleteIcon fontSize="small" />
            Delete
          </GlobalCustomButton>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomSelect
              label="Choose Sub-location Type"
              name="typeLocation"
              defaultValue={sublocationData?.type}
              options={sublocationTypeOptions}
              // onChange={(e) => setTypeLocation(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              name="typeName"
              label="Name of sub location"
              // onChange={(e) => setTypeName(e.target.value)}
              defaultValue={sublocationData?.typeName}
            />
          </Grid>
        </Grid>
      </ModalBox>
      <ModalBox
        open={openLoc}
        header="Add Sub Location"
        onClose={handleCloseModal}
        width="60%"
      >
        <Box display="flex" justifyContent="flex-end" py="1rem">
          <GlobalCustomButton onClick={() => onSubmit()}>
            Add
          </GlobalCustomButton>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomSelect
              label="Choose Sub-location Type"
              name="typeLocation"
              value={typeLocation}
              options={sublocationTypeOptions}
              onChange={(e) => setTypeLocation(e.target.value)}
              // control={control}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              name="typeName"
              label="Name of sub location"
              onChange={(e) => setTypeName(e.target.value)}
              value={typeName}
              // register={register("typeName")}
            />
          </Grid>
        </Grid>
      </ModalBox>
      <Box display="flex" justifyContent="flex-end" gap="1rem" my="2rem">
        <GlobalCustomButton
          onClick={() => setConfirmDialog(true)}
          color="error"
        >
          <DeleteIcon fontSize="small" sx={{ marginRight: "5px" }} />
          Delete
        </GlobalCustomButton>

        {!editing ? (
          <GlobalCustomButton
            onClick={() => {
              setEditing(!editing);
            }}
          >
            <CreateIcon fontSize="small" sx={{ marginRight: "5px" }} />
            Edit
          </GlobalCustomButton>
        ) : (
          <GlobalCustomButton
            onClick={handleSubmit(submit)}
            color="success"
            text="Update"
            type="submit"
            loading={loading}
          />
        )}
      </Box>
      <Grid container spacing={2}>
        <ToastContainer theme="colored" />

        {!editing ? (
          <Grid item xs={6}>
            <Input
              label="Name"
              register={register("name")}
              defaultValue={location?.name}
              disabled={!editing}
            />
          </Grid>
        ) : (
          <Grid item xs={6}>
            <Input
              label="Name"
              register={register("name")}
              // errorText={errors?.name?.message}
            />
          </Grid>
        )}
        {!editing ? (
          <Grid item xs={6}>
            <Input
              label="Location Type"
              register={register("locationType")}
              defaultValue={location?.locationType}
              disabled={!editing}
            />
          </Grid>
        ) : (
          <Grid item xs={6}>
            {/* <Input
              label="Location Type"
              register={register("locationType")}
              // options={Location.sublocations}
              // errorText={errors?.locationType?.message}
            /> */}
            <div className="field">
              <div className="control">
                {/* <div className="select"> */}
                <CustomSelect
                  label="Choose Location Type "
                  name="type"
                  options={locationTypeOptions}
                  register={register("locationType")}
                  // defaultValue={
                  //   isDefaultLocationType
                  //     ? location?.locationType
                  //     : defaultLocationType
                  // }
                  // onChange={(e) => {
                  //   setDefaultLocationType(e.target.value);
                  //   setIsDefaultLocationType(false);
                  // }}
                />
                {/* </div> */}
              </div>
            </div>
          </Grid>
        )}
      </Grid>
      {!editing ? null : (
        <Box pt="1.4rem">
          {location?.locationType === "Ward" && (
            <Box>
              <Box display="flex" justifyContent="flex-end" py="1rem">
                <GlobalCustomButton
                  color="warning"
                  onClick={() => setOpenLoc(true)}
                >
                  Add SubLocation
                </GlobalCustomButton>
              </Box>
              <CustomTable
                title={""}
                columns={LocationDetailSchema}
                data={location.sublocations}
                pointerOnHover
                highlightOnHover
                onRowClicked={(row) => handleRowClick(row)}
                striped
                progressPending={loading}
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default LocationView;
