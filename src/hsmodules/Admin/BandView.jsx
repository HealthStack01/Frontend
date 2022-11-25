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
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from "../app/styles";
import dayjs, { Dayjs } from "dayjs";
import { createBandSchema } from "./ui-components/schema";
import CustomSelect from "../../components/inputs/basic/Select";
import { bandTypeOptions } from "../../dummy-data";
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
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Band Detail</h2>
            <span>Band detail of {band.name}</span>
          </div>
          <BottomWrapper>
            <GlobalCustomButton
              text="Delete Band"
              color="secondary"
              onClick={() => handleDelete()}
            />

            <GlobalCustomButton
              text={`${!editing ? "Edit Client" : "Cancel Editing"}`}
              showicon
              icon="bi bi-pen-fill"
              disabled={editing}
              onClick={() => {
                setEditing(!editing);
              }}
            />
          </BottomWrapper>
        </HeadWrapper>
        <form onSubmit={handleSubmit(submit)}>
          <ToastContainer theme="colored" />

          <GridWrapper>
            {!editing ? (
              <ViewText label=" Name" text={band.name} />
            ) : (
              <Input
                label=" Name"
                register={register("name")}
                errorText={errors?.name?.message}
              />
            )}
            {!editing ? (
              <ViewText label="Band Type" text={band.bandType} />
            ) : (
              <CustomSelect
                label="Band Type"
                register={register("bandType")}
                options={bandTypeOptions}
                errorText={errors?.bandtType?.message}
              />
            )}
          </GridWrapper>

          {editing && (
            <BottomWrapper>
              <GlobalCustomButton text="Save Form" type="submit" loading={loading} />
            </BottomWrapper>
          )}
        </form>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default BandView;
