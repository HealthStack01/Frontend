import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import Input from "../../components/inputs/basic/Input";
import ViewText from "../../components/viewtext";
import { UserContext } from "../../context";
<<<<<<< HEAD
import {Box} from "@mui/system";
=======
import { Box, IconButton, Grid, Typography } from "@mui/material";
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
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
<<<<<<< HEAD

import GlobalCustomButton from "../../components/buttons/CustomButton";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';


=======
import CustomTable from "../../components/customtable";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalBox from "../../components/modal";
>>>>>>> 6629424bb56c5124204d6f95a047225340175196

// import { createClientSchema } from "./schema";

const LocationView = ({ open, setOpen, location }) => {
<<<<<<< HEAD
  // const { register, handleSubmit, setValue,reset, errors } = useForm();
=======
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
  const LocationServ = client.service("location");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const result = localStorage.getItem("user");
<<<<<<< HEAD
=======
  const [openLoc, setOpenLoc] = useState(false);
  const sublocationTypeOptions = ["Bed", "Unit"];
  const [typeLocation,setTypeLocation] = useState('')
  const [typeName, setTypeName] = useState('')
  const [sublocationData,setLocationData] = useState([])
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
  const { state, setState } = useContext(UserContext);
  const data = JSON.parse(result);
  // const Location = state.LocationModule.selectedLocation;

<<<<<<< HEAD
=======
  const handleCloseModal = () => {
    setOpenLoc(false);
  };

>>>>>>> 6629424bb56c5124204d6f95a047225340175196
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
<<<<<<< HEAD
=======
    control
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
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
<<<<<<< HEAD
  
  //   return () => {
                
=======

  //   return () => {

>>>>>>> 6629424bb56c5124204d6f95a047225340175196
  //   }
  // })

  useEffect(() => {
    reset({
      name: location.name,
      bandType: location.locationType,

      facility: data.currentEmployee.facility,
    });
  }, []);
<<<<<<< HEAD
=======

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


>>>>>>> 6629424bb56c5124204d6f95a047225340175196
  const submit = async (data, e) => {
    setLoading(true);
    e.preventDefault();
    setSuccess(false);
<<<<<<< HEAD
console.log(data)
    await LocationServ.patch(location._id, data)
=======
    console.log(data);
    await LocationServ.patch(location._id, location)
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
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

<<<<<<< HEAD
  return (
    <PageWrapper>
      <GrayWrapper >
     
        <HeadWrapper>
          <div style={{width:"100%"}}>
            <h2>Location Detail</h2>
            {/* <span>Location detail of {Location.name}</span> */}
          </div> 
         
          <BottomWrapper>
          <GlobalCustomButton
         
             onClick={() => handleDelete()}
            color="error"
          >
            <DeleteIcon fontSize="small" sx={{marginRight: "5px"}} />
            Delete Location
            </GlobalCustomButton>

      {!editing  ?  <GlobalCustomButton
       
           onClick={() => {
             setEditing(!editing);
           }}
          >
             <CreateIcon fontSize="small" sx={{marginRight: "5px"}}/> 
             Edit
        
            </GlobalCustomButton> :<GlobalCustomButton onClick={handleSubmit(submit)} color="success"  text="Update" type="submit" loading={loading} />}
          </BottomWrapper>
        </HeadWrapper>
        <form >
          <ToastContainer theme="colored" />

          <GridBox >
            {!editing ? (
              
                 <Input
               label="Name"
               register={register("name")}
               defaultValue={location?.name}
               disabled={!editing}
             />
             
            ) : (
           
               <Input
                label="Name"
                register={register("name")}
                // errorText={errors?.name?.message}
              />
            
            )}
            {!editing ? (
              <Input
=======
 

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
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
              label="Location Type"
              register={register("locationType")}
              defaultValue={location?.locationType}
              disabled={!editing}
            />
<<<<<<< HEAD

            ) : (
              <Input
                label="Location Type"
                register={register("locationType")}
                // options={Location.sublocations}
                // errorText={errors?.locationType?.message}
              />
            )}
          </GridBox>
        </form>
      </GrayWrapper>
    </PageWrapper>
=======
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
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
  );
};

export default LocationView;
