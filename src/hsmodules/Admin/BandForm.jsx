import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import Button from "../../components/buttons/Button";
import Input from "../../components/inputs/basic/Input";
import CustomSelect from "../../components/inputs/basic/Select";
import BasicDatePicker from "../../components/inputs/Date";
import { UserContext } from "../../context";
import { yupResolver } from "@hookform/resolvers/yup";
import { bandTypeOptions } from "../../dummy-data";
import client from "../../feathers";
import {
  BottomWrapper,
  DetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
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

        setLoading(false);
      })
      .catch((err) => {
        toast.error(`Sorry, You weren't able to create a band. ${err}`);
        setLoading(false);
      });
    setOpen(false);
    setLoading(false);
  };
  return (
    <ModalBox open={open} onClose={setOpen}>
      <form onSubmit={handleSubmit(submit)}>
        <ToastContainer theme="colored" />

        <DetailsWrapper title="Create Band" defaultExpanded={true}>
          <Input
            label="Name of Band"
            register={register("name")}
            errorText={errors?.name?.message}
          />
          <CustomSelect
            label="Choose Band Type"
            name="bandType"
            options={bandTypeOptions}
            register={register("bandType", { required: true })}
          />
          <Input
            {...register("description", { required: true })}
            name="description"
            type="text"
            placeholder="Description of Band"
          />

          <BottomWrapper>
            <Button
              onClick={handleSubmit}
              label="Create Band"
              background="#FFE9E9"
              color="#ED0423"
            />
          </BottomWrapper>
        </DetailsWrapper>
      </form>
    </ModalBox>
  );
};
