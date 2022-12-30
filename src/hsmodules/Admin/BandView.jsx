import React, {useContext, useState, useEffect, useCallback} from "react";
import {useForm} from "react-hook-form";
import {toast, ToastContainer} from "react-toastify";
import {Box} from "@mui/system";
import TextArea from "../../components/inputs/basic/Textarea";
// import Button from "../../components/buttons/Button";
import Input from "../../components/inputs/basic/Input";
import ViewText from "../../components/viewtext";
import {UserContext} from "../../context";
import client from "../../feathers";
import {yupResolver} from "@hookform/resolvers/yup";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import {MdOutlineUpdate} from "react-icons/md";

import {
  BottomWrapper,
  DetailsWrapper,
  Gray,
  GridBox,
  HeadWrapper,
  PageWrapper,
} from "../app/styles";
import dayjs, {Dayjs} from "dayjs";
import {createBandSchema} from "./ui-components/schema";
import CustomSelect from "../../components/inputs/basic/Select";
import {bandTypeOptions} from "../../dummy-data";
import CloseIcon from "@mui/icons-material/Close";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalBox from "../../components/modal";
import CustomConfirmationDialog from "../../components/confirm-dialog/confirm-dialog";

// import { createClientSchema } from "./schema";

const BandView = ({open, setOpen, band}) => {
  const BandServ = client.service("bands");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const result = localStorage.getItem("user");
  const data = JSON.parse(result);
  // const {user} = useContext(UserContext)

  const {
    register,
    handleSubmit,
    formState: {errors},
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

  const submit = useCallback(
    async (data, e) => {
      setLoading(true);
      e.preventDefault();
      setSuccess(false);
      await BandServ.patch(band._id, data)
        .then(res => {
          toast.success(`Band successfully updated`);
          setLoading(false);
          setOpen(false);
        })
        .catch(err => {
          toast.error(`Sorry, You weren't able to updated an band. ${err}`);
          setLoading(false);
        });

      setLoading(false);
    },
    [data]
  );

  const handleDelete = async () => {
    //let conf = window.confirm("Are you sure you want to delete this data?");
    const dleteId = band._id;
    // if (conf) {
    BandServ.remove(dleteId)
      .then(res => {
        toast.success(`Band successfully deleted!`);
        setOpen(false);
      })
      .catch(err => {
        toast.error(`Sorry, Unable to delete band. ${err}`);
      });
    //}
  };

  return (
    <ModalBox
      open={open}
      onClose={setOpen}
      width={"30vw"}
      header={"Band Detail"}
    >
      <CustomConfirmationDialog
        open={confirmDialog}
        cancelAction={() => setConfirmDialog(false)}
        confirmationAction={handleDelete}
        type="danger"
        message="Are you sure you want to delete this data?"
      />

      <ToastContainer theme="colored" />
      <Box
        display="flex"
        gap="2rem"
        justifyContent="flex-end"
        alignItems="center"
        mb="2rem"
      >
        <GlobalCustomButton
          onClick={() => setConfirmDialog(true)}
          color="error"
        >
          <DeleteIcon fontSize="small" sx={{marginRight: "5px"}} />
          Delete Band
        </GlobalCustomButton>

        {!editing ? (
          <GlobalCustomButton
            onClick={() => {
              setEditing(!editing);
            }}
          >
            <CreateIcon fontSize="small" sx={{marginRight: "5px"}} />
            Edit Band
          </GlobalCustomButton>
        ) : (
          <GlobalCustomButton
            onClick={handleSubmit(submit)}
            color="success"
            type="submit"
            loading={loading}
          >
            <MdOutlineUpdate sx={{marginRight: "5px"}} fontSize="bold" />
            Update
          </GlobalCustomButton>
        )}
      </Box>
      <form>
        <ToastContainer theme="colored" />

        <Box>
          {!editing ? (
            <Box mb="1rem">
              <Input
                label="Name"
                register={register("name")}
                defaultValue={band?.name}
                disabled={!editing}
              />
            </Box>
          ) : (
            <Box mb="1rem">
              <Input
                label="Name"
                register={register("name")}
                errorText={errors?.name?.message}
              />
            </Box>
          )}
          {!editing ? (
            <Box>
              <Input
                label="Band Type"
                register={register("bandType")}
                defaultValue={band?.bandType}
                disabled={!editing}
              />
            </Box>
          ) : (
            <Box>
              <CustomSelect
                sx={{width: "50wv"}}
                label="Band Type"
                register={register("bandType")}
                options={bandTypeOptions}
                errorText={errors?.bandtType?.message}
              />
            </Box>
          )}
        </Box>

        {!editing ? (
          <Box>
            <TextArea
              label="Description"
              register={register("description")}
              defaultValue={band?.description}
              disabled={!editing}
            />
          </Box>
        ) : (
          <Box>
            <TextArea
              label="Description"
              register={register("description")}
              name="description"
              type="text"
            />
          </Box>
        )}

        {/* {editing && (
            <BottomWrapper>
              <GlobalCustomButton  text="Save Form" type="submit" loading={loading} />
            </BottomWrapper>
          )} */}
      </form>
    </ModalBox>
  );
};

export default BandView;
