import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
// import Button from "../../components/buttons/Button";
import Input from "../../components/inputs/basic/Input";
import ViewText from "../../components/viewtext";
import { UserContext } from "../../context";
import client from "../../feathers";
import { yupResolver } from "@hookform/resolvers/yup";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import {
  BottomWrapper,
  DetailsWrapper,
  Gray,
  GridBox,
  HeadWrapper,
  PageWrapper,
} from "../app/styles";
import dayjs, { Dayjs } from "dayjs";
import { createBandSchema } from "./ui-components/schema";
import CustomSelect from "../../components/inputs/basic/Select";
import { bandTypeOptions } from "../../dummy-data";
import CloseIcon from '@mui/icons-material/Close';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalBox from "../../components/modal";

// import { createClientSchema } from "./schema";

const BandView = ({ open, setOpen, band }) => {
  const BandServ = client.service("bands");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const result = localStorage.getItem("user");
  const data = JSON.parse(result);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(createBandSchema),

    defaultValues: {
      name: band.name,
      bandType: band.bandType,
      facility: data.currentEmployee.facility,
    },
  });

  useEffect(() => {
    reset({
      name: band.name,
      bandType: band.bandType,
      facility: data.currentEmployee.facility,
    });
  }, []);
  const submit = async (data, e) => {
    setLoading(true);
    e.preventDefault();
    setSuccess(false);

    await BandServ.patch(band._id, data)
      .then((res) => {
        toast.success(`Band successfully updated`);
        setLoading(false);
        setOpen(false);
      })
      .catch((err) => {
        toast.error(`Sorry, You weren't able to updated an band. ${err}`);
        setLoading(false);
      });

    setLoading(false);
  };

  const handleDelete = async () => {
    let conf = window.confirm("Are you sure you want to delete this data?");
    const dleteId = band._id;
    if (conf) {
      BandServ.remove(dleteId)
        .then((res) => {
          toast.success(`Band successfully deleted!`);
          setOpen(false);
        })
        .catch((err) => {
          toast.error(`Sorry, Unable to delete band. ${err}`);
        });
    }
  };

  return (
   <ModalBox open={open} onClose={setOpen} width={"50vw"} header={"Band Detail"}>
        <HeadWrapper>
          {/* <div style={{width:"100%"}}>
            <h2>Band Detail</h2>
            <span>Band detail of {band.name}</span>
          </div> */}
          <BottomWrapper>
          <GlobalCustomButton
          
             onClick={() => handleDelete()}
            color="error"
          >
            <DeleteIcon fontSize="small" sx={{marginRight: "5px"}} />
            Delete Band
            </GlobalCustomButton>
           
            <GlobalCustomButton
          
           disabled={editing}
           onClick={() => {
             setEditing(!editing);
           }}
          >
             <CreateIcon fontSize="small" sx={{marginRight: "5px"}}/> 
             {`${!editing ? "Edit Band" : "Cancel Band"}`}
             
            </GlobalCustomButton>
          
          
          </BottomWrapper>
        </HeadWrapper>
        <form onSubmit={handleSubmit(submit)}>
          <ToastContainer theme="colored" />

          <GridBox>
            {!editing ? (

                <Input
                label="Name"
                register={register("name")}
                defaultValue={band?.name}
                sx={{width:"50wv"}}
              />
            ) : (
              <Input
          
                label="Name"
                register={register("name")}
                errorText={errors?.name?.message}
                sx={{width:"50wv"}}
              />
            )}
            {!editing ? (
                <Input
                sx={{width:"50wv"}}
                label="Band Type"
                register={register("bandType")}
                defaultValue={band?.bandType}
              />
            ) : (
              <CustomSelect
              sx={{width:"50wv"}}
                label="Band Type"
                register={register("bandType")}
                options={bandTypeOptions}
                errorText={errors?.bandtType?.message}
              />
            )}
          </GridBox>

          {editing && (
            <BottomWrapper>
              <GlobalCustomButton  text="Save Form" type="submit" loading={loading} />
            </BottomWrapper>
          )}
        </form>
        </ModalBox>
  );
};

export default BandView;
