import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import Button from "../../components/buttons/Button";
import Input from "../../components/inputs/basic/Input";
import TextArea from "../../components/inputs/basic/Textarea";
import CustomSelect from "../../components/inputs/basic/Select";
import BasicDatePicker from "../../components/inputs/Date";
import { UserContext } from "../../context";
import { yupResolver } from "@hookform/resolvers/yup";
import { bandTypeOptions } from "../../dummy-data";
import client from "../../feathers";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import CreateIcon from '@mui/icons-material/Create';
import {
  BottomWrapper,
  DetailsWrapper,
  GridBox
} from "../app/styles";
// import { createBandSchema } from './schema';
import { createBandSchema } from "./ui-components/schema";
import ModalBox from "../../components/modal";

export const BandForm = ({ open, setOpen }) => {
  const BandServ = client.service("bands");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFullRegistration, setFullRegistration] = useState(false);
  const data = localStorage.getItem("band");
  const user = JSON.parse(data);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, errors },
  } = useForm({
    resolver: yupResolver(createBandSchema),

    defaultValues: {
      name: "",
      bandType: "",
      description: "",
    },
  });
  const submit = async (data, e) => {
    setLoading(true);
    e.preventDefault();
    setSuccess(false);

    await BandServ.create(data)
      .then((res) => {
        toast.success(`Band successfully created`);
        setOpen(false);
        reset();
      })
      .catch((err) => {
        toast.error(`Sorry, You weren't able to create a band. ${err}`);
      });
    setLoading(false);
  };
  return (
    <ModalBox open={open} onClose={setOpen} width={"50vw"} header={"Create Band"}>
      <form onSubmit={handleSubmit(submit)}>
        <ToastContainer theme="colored" />
{/* 
        <DetailsWrapper title="Create Band" defaultExpanded={true} 
        > */}
        <GridBox>
          <Input
           label="Name of Band"
            register={register("name")}
            errorText={errors?.name?.message}
            sx={{marginBottom:"2rem"}}
            placeholder="Name of Band"
          />
          <CustomSelect
            label="Choose Band Type"
            name="bandType"
            options={bandTypeOptions}
            register={register("bandType", { required: true })}
          />
          </GridBox>
          <Input
          label="Description"
            {...register("description", { required: true })}
            name="description"
            type="text"
            placeholder="Description of Band"
          />
          <BottomWrapper>
            <GlobalCustomButton
              onClick={handleSubmit}
              style={{marginTop:"1rem" }}
            >
               <CreateIcon fontSize="small" sx={{marginRight: "5px"}}/> 
               Create Band
               </GlobalCustomButton>   
          </BottomWrapper>
        {/* </DetailsWrapper> */}
      </form>
    </ModalBox>
  );
};
