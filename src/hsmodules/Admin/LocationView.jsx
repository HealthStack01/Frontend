import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import Input from "../../components/inputs/basic/Input";
import ViewText from "../../components/viewtext";
import { UserContext } from "../../context";
import client from "../../feathers";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  BottomWrapper,
  DetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from "../app/styles";
import dayjs, { Dayjs } from "dayjs";
import { createLocationSchema } from "./ui-components/schema";
import CustomSelect from "../../components/inputs/basic/Select";
import { bandTypeOptions } from "../../dummy-data";
import GlobalCustomButton from "../../components/buttons/CustomButton";


// import { createClientSchema } from "./schema";

const LocationView = ({ open, setOpen, location }) => {
  const LocationServ = client.service("location");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const result = localStorage.getItem("user");
  const { state, setState } = useContext(UserContext);
  const data = JSON.parse(result);
  // const Location = state.LocationModule.selectedLocation;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(createLocationSchema),

    defaultValues: {
      name: location.name,
      locationType: location.locationType,
      facility: data.currentEmployee.facility,
    },
  });

  useEffect(() => {
    reset({
      name: location.name,
      bandType: location.locationType,

      facility: data.currentEmployee.facility,
    });
  }, []);
  const submit = async (data, e) => {
    setLoading(true);
    e.preventDefault();
    setSuccess(false);

    await LocationServ.patch(location._id, data)
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

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Location Detail</h2>
            <span>Location detail of {Location.name}</span>
          </div>
          <BottomWrapper>
            <GlobalCustomButton
              text="Delete Location"
              color="secondary"
              onClick={() => handleDelete()}
            />
            <GlobalCustomButton
              text={`${!editing ? "Edit Location" : "Cancel Editing"}`}
              disabled={editing}
              color="warning"
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
              <ViewText label=" Name" text={Location.name} />
            ) : (
              <Input
                label="Name"
                register={register("name")}
                errorText={errors?.name?.message}
              />
            )}
            {!editing ? (
              <ViewText label="Location Type" text={Location.locationType} />
            ) : (
              <Input
                label="Band Type"
                register={register("bandType")}
                options={Location.sublocations}
                errorText={errors?.LocationType?.message}
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

export default LocationView;
