import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import Input from "../../components/inputs/basic/Input";
import ViewText from "../../components/viewtext";
import { UserContext } from "../../context";
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

// import { createClientSchema } from "./schema";

const LocationView = ({ open, setOpen, location }) => {
  const LocationServ = client.service("location");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const result = localStorage.getItem("user");
  const [openLoc, setOpenLoc] = useState(false);
  const sublocationTypeOptions = ["Bed", "Unit"];
  const [typeLocation,setTypeLocation] = useState('')
  const [typeName, setTypeName] = useState('')
  const [sublocationData,setLocationData] = useState([])
  const { state, setState } = useContext(UserContext);
  const data = JSON.parse(result);
  // const Location = state.LocationModule.selectedLocation;

  const handleCloseModal = () => {
    setOpenLoc(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
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

  useEffect(() => {
    reset({
      name: location.name,
      bandType: location.locationType,

      facility: data.currentEmployee.facility,
    });
  }, []);

  const onSubmit = (e) => {
    // e.preventDefault();
    if (typeLocation === "" && typeName === "") {
      alert("Kindly enter missing data ");
    }
   
    if (!location.sublocations) {
      location.sublocations = [];
    }

    let data = {
      type: typeLocation,
      typeName : typeName
    }

    //  console.log(data);
  

    location.sublocations.push(data);
    reset();
    // setShowUpdate(true);
  };


  const submit = async (data, e) => {
    setLoading(true);
    e.preventDefault();
    setSuccess(false);
    console.log(data);
    await LocationServ.patch(location._id, location)
      .then((res) => {
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

  const handleDelete = async () => {
    let conf = window.confirm("Are you sure you want to delete this data?");

    const dleteId = location._id;
    if (conf) {
      LocationServ.remove(dleteId)
        .then((res) => {
          toast.success(`Location successfully deleted!`);
          setOpen(false);
        })
        .catch((err) => {
          toast.error(`Sorry, Unable to delete location. ${err}`);
        });
    }
  };

 

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

  return (
    <Box>
      <ModalBox
        open={openLoc}
        header="Add Sub Location"
        onClose={handleCloseModal}
        width="80%"
      >
        <Box display="flex" justifyContent="flex-end" py="1rem">
          <GlobalCustomButton onClick={() => (onSubmit())}>
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
             name='typeName'
              label="Name of sub location"
              onChange={(e) => setTypeName(e.target.value)}
              value={typeName}
              // register={register("typeName")}
            />
          </Grid>
        </Grid>
      </ModalBox>
      <Box display="flex" justifyContent="flex-end" gap="1rem" my="2rem">
        <GlobalCustomButton onClick={() => handleDelete()} color="error">
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
            <Input
              label="Location Type"
              register={register("locationType")}
              // options={Location.sublocations}
              // errorText={errors?.locationType?.message}
            />
          </Grid>
        )}
      </Grid>
      {!editing ? null : (
       
        <Box pt="1.4rem">
           {location?.locationType === 'Ward' &&
          <Box>
          <Box display="flex" justifyContent="flex-end" py="1rem">
            <GlobalCustomButton
              color="warning"
              onClick={() => setOpenLoc(true)}
            >
              Add Sub Location
            </GlobalCustomButton>
          </Box>
          <CustomTable
            title={""}
            columns={LocationDetailSchema}
            data={location.sublocations}
            pointerOnHover
            highlightOnHover
            striped
            progressPending={false}
          />
        </Box> 
}
        </Box>
      )}
    </Box>
  );
};

export default LocationView;
