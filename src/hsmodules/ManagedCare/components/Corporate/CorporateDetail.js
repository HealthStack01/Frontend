import {Avatar, Box, Button, Grid, Typography} from "@mui/material";
import {useCallback, useContext, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddBoxIcon from "@mui/icons-material/AddBox";

import {ObjectContext, UserContext} from "../../../../context";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import DefaultFacilityDetail from "../../../../components/facility-detail/Facility-Detail";
import {toast} from "react-toastify";
import client from "../../../../feathers";
import Textarea from "../../../../components/inputs/basic/Textarea";
import ModalBox from "../../../../components/modal";
import AdditionalInformationCard from "../../../CRM/components/lead/AdditionalInfo";
import {FormsHeaderText} from "../../../../components/texts";
import CustomConfirmationDialog from "../../../../components/confirm-dialog/confirm-dialog";
import NewPolicyModule from "../../NewPolicy";
import NewBeneficiaryModule from "../../New-Beneficiary";

const CorporateDetailsComponent = ({goBack, beneficiary}) => {
  const orgClientServer = client.service("organizationclient");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const [view, setView] = useState("details");
  const [edit, setEdit] = useState(false);
  const [corporate, setCorporate] = useState(null);
  const [infoModal, setInfoModal] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    action: null,
    message: "",
    type: "",
  });

  useEffect(() => {
    const selectedCorp = state.ManagedCareCorporate.selectedCorporate;
    console.log(selectedCorp);
    setCorporate(selectedCorp);
  }, [state.ManagedCareCorporate]);

  const deleteAdditionalInfo = async info => {
    showActionLoader();

    const oldCorporateInfo =
      state.ManagedCareCorporate.selectedCorporate.info || [];

    const updatedCorporateInfo = oldCorporateInfo.filter(
      item => item._id !== info._id
    );

    const documentId = corporate._id;

    await orgClientServer
      .patch(documentId, {info: updatedCorporateInfo})
      .then(res => {
        hideActionLoader();
        setState(prev => ({
          ...prev,
          ManagedCareCorporate: {...prev.DealModule, selectedCorporate: res},
        }));
        cancelConfirm();
        toast.success(`You have successfully Deleted Addtional Information!`);
      })
      .catch(err => {
        hideActionLoader();
        toast.error(
          `Sorry, You weren't able to Delete the Addtional Information!. ${err}`
        );
      });
  };

  const confirmDelete = info => {
    setConfirmDialog({
      open: true,
      message:
        "You're about to delete an additional information for this Corporate?",
      type: "danger",
      action: () => deleteAdditionalInfo(info),
    });
  };

  const cancelConfirm = () => {
    setConfirmDialog({
      open: false,
      action: null,
      type: "",
      message: "",
    });
  };

  return (
    <Box>
      <CustomConfirmationDialog
        open={confirmDialog.open}
        type={confirmDialog.type}
        message={confirmDialog.message}
        cancelAction={cancelConfirm}
        confirmationAction={confirmDialog.action}
      />

      <ModalBox
        open={infoModal}
        onClose={() => setInfoModal(false)}
        header="Add new Additional Information"
      >
        <CreateAdditionalInformation closeModal={() => setInfoModal(false)} />
      </ModalBox>
      <Box
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
              fontSize: "0.85rem",
              fontWeight: "600",
            }}
          >
            Corporate Details For -
          </Typography>
          <FormsHeaderText
            text={`${corporate?.organizationDetail?.facilityName}`}
          />
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
              Update Policy
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
            <GlobalCustomButton
              onClick={() => setView("details")}
              sx={
                view === "details"
                  ? {
                      backgroundColor: "#ffffff",
                      color: "#000000",
                      "&:hover": {
                        backgroundColor: "#ffffff",
                      },
                    }
                  : {}
              }
            >
              <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
              Details
            </GlobalCustomButton>

            <GlobalCustomButton
              onClick={() => setView("policies")}
              sx={
                view === "policies"
                  ? {
                      backgroundColor: "#ffffff",
                      color: "#000000",
                      "&:hover": {
                        backgroundColor: "#ffffff",
                      },
                    }
                  : {}
              }
            >
              <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
              Policies
            </GlobalCustomButton>

            <GlobalCustomButton
              onClick={() => setView("beneficiaries")}
              sx={
                view === "beneficiaries"
                  ? {
                      backgroundColor: "#ffffff",
                      color: "#000000",
                      "&:hover": {
                        backgroundColor: "#ffffff",
                      },
                    }
                  : {}
              }
            >
              <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
              Beneficiaries
            </GlobalCustomButton>

            {view === "details" && (
              <GlobalCustomButton>
                <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
                Edit Details
              </GlobalCustomButton>
            )}

            {/* {!corporate.approved ? (
              <GlobalCustomButton onClick={approvePolicy} color="success">
                <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
                Approve Policy
              </GlobalCustomButton>
            ) : (
              <GlobalCustomButton onClick={disapprovePolicy} color="warning">
                <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
                Disapprove Policy
              </GlobalCustomButton>
            )} */}
          </Box>
        )}
      </Box>

      <Box
        sx={{
          width: "100%",
          height: beneficiary ? "calc(100vh - 220px)" : "calc(100vh - 150px)",
          overflowY: "scroll",
        }}
      >
        {/* {view === "client" && (
          <DefaultClientDetail
            detail={clientDetail}
            updateClient={handleUpdateClient}
            goBack={() => setView("details")}
          />
        )} */}

        {view === "policies" && (
          <NewPolicyModule corporate={corporate?.organizationDetail} />
        )}

        {view === "beneficiaries" && (
          <NewBeneficiaryModule corporate={corporate?.organizationDetail} />
        )}

        {view === "details" && (
          <Box>
            <DefaultFacilityDetail
              detail={corporate && corporate.organizationDetail}
            />

            <Box p={2}>
              <Box
                sx={{
                  display: "flex",
                  alignItem: "center",
                  justifyContent: "space-between",
                }}
                mb={2}
              >
                <FormsHeaderText text="Additional Information" />

                <GlobalCustomButton onClick={() => setInfoModal(true)}>
                  <AddCircleOutlineOutlinedIcon
                    sx={{mr: "5px"}}
                    fontSize="small"
                  />
                  Add Information
                </GlobalCustomButton>
              </Box>
              <Box>
                {corporate?.info?.length > 0 ? (
                  corporate?.info.map((info, index) => (
                    <Box sx={{mb: 2}}>
                      <AdditionalInformationCard
                        data={info}
                        action={() => confirmDelete(info)}
                        key={index}
                      />
                    </Box>
                  ))
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography sx={{fontSize: "0.75rem", color: "#000000"}}>
                      You've not added any information
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CorporateDetailsComponent;

const CreateAdditionalInformation = ({closeModal}) => {
  const orgClientServer = client.service("organizationclient");
  const {state, setState, hideActionLoader, showActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const {register, handleSubmit, control, reset} = useForm();

  const corporate = state.ManagedCareCorporate.selectedCorporate;

  // console.log("===>>>> facilit underprovider", {
  //   facility: facility,
  // });

  const updateAdditionalInfo = async data => {
    if (data.info === "") return toast.error("Please provide your information");
    showActionLoader();

    const employee = user.currentEmployee;

    const newInfo = {
      _id: `${Math.random()}`,
      info: data.info,
      date: new Date(),
      employeename: `${employee.firstname} ${employee.lastname}`,
    };

    const oldDealInfo = corporate?.info || [];

    const updatedDealInfo = [newInfo, ...oldDealInfo];

    const documentId = corporate?._id;

    await orgClientServer
      .patch(documentId, {info: updatedDealInfo})
      .then(res => {
        hideActionLoader();
        setState(prev => ({
          ...prev,
          ManagedCareCorporate: {
            ...prev.ManagedCareCorporate,
            selectedCorporate: res,
          },
        }));
        closeModal();
        toast.success(
          `You have successfully added a new Addtional Information!`
        );
      })
      .catch(err => {
        hideActionLoader();
        toast.error(
          `Sorry, You weren't able to add a new Addtional Information!. ${err}`
        );
      });
  };

  return (
    <Box
      sx={{
        width: "500px",
      }}
    >
      <Box mb={2}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Textarea
              label="Additional Information"
              placeholder="Write here..."
              important
              register={register("info")}
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{display: "flex"}}>
        <GlobalCustomButton
          onClick={handleSubmit(updateAdditionalInfo)}
          sx={{marginRight: "10px"}}
        >
          Add Information
        </GlobalCustomButton>

        <GlobalCustomButton onClick={closeModal} color="error">
          Cancel
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};
