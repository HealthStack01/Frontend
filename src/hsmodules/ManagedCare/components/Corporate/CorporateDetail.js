import {Avatar, Box, Button, Drawer, Grid, Typography} from "@mui/material";
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
import ClaimsModule from "../../Claims";
import Invoice from "../../Invoice"
import PremiumModule from "../../Premium";
import CorporateChatComponent from "./CorporateChat";
import ReactCustomSearchSelectComponent from "../../../../components/react-custom-select/ReactSearchSelect";
import ReactCustomSelectComponent from "../../../../components/react-custom-select";
import VideoConference from "../../../utils/VideoConference";

const CorporateDetailsComponent = ({goBack, beneficiary}) => {
  const orgClientServer = client.service("organizationclient");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const [view, setView] = useState("details");
  const [edit, setEdit] = useState(false);
  const [corporate, setCorporate] = useState(null);
  const [infoModal, setInfoModal] = useState(false);
  const [chat, setChat] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [activateCall, setActivateCall] = useState(false);
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
      <Drawer
        anchor="right"
        open={chat}
        onClose={() => setChat(false)}
        onOpen={() => setChat(true)}
      >
        <Box
          sx={{
            width: "500px",
            height: "100vh",
            overflowY: "hidden",
          }}
        >
          {chat && <CorporateChatComponent closeChat={() => setChat(false)} />}
        </Box>
      </Drawer>

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

      <ModalBox
        open={updateModal}
        onClose={() => setUpdateModal(false)}
        header="Update Corporate Organization"
      >
        <ChangeCorporateOrganization closeModal={() => setUpdateModal(false)} />
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
            Details For -
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
              Details
            </GlobalCustomButton>

            <GlobalCustomButton onClick={() => setUpdateModal(true)}>
              Update
            </GlobalCustomButton>

            <Box>
              <VideoConference
                activateCall={activateCall}
                setActivateCall={setActivateCall}
                label="Video conference"
              />
            </Box>

            {activateCall && (
              <GlobalCustomButton
                onClick={() => setActivateCall(false)}
                color="error"
              >
                End conference
              </GlobalCustomButton>
            )}

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
              Policies
            </GlobalCustomButton>
            <GlobalCustomButton
              onClick={() => setView("invoices")}
              sx={
                view === "invoices"
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
              Invoices
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
              Beneficiaries
            </GlobalCustomButton>

            <GlobalCustomButton
              onClick={() => setView("claims")}
              sx={
                view === "claims"
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
              Claims
            </GlobalCustomButton>

            <GlobalCustomButton
              onClick={() => setView("premiums")}
              sx={
                view === "premiums"
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
              Premiums
            </GlobalCustomButton>

            <GlobalCustomButton onClick={() => setChat(true)}>
              Chat
            </GlobalCustomButton>

            {/* {view === "details" && (
              <GlobalCustomButton>
                <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
                Edit Details
              </GlobalCustomButton>
            )} */}

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
          <NewPolicyModule corporate={corporate?.organizationDetail} origin="corporate" />
        )}

        {view === "claims" && (
          <ClaimsModule corporate={corporate?.organizationDetail} />
        )}

        {view === "premiums" && <PremiumModule />}
        {view === "invoices" && <Invoice corporate={corporate?.organizationDetail} isTab={true}/>}

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

const ChangeCorporateOrganization = ({closeModal}) => {
  const facilityServ = client.service("facility");
  const orgClientServer = client.service("organizationclient");
  const bandsServer = client.service("bands");
  const [fetchingFacilities, setFetchingFacilities] = useState(false);
  const [facilities, setFacilities] = useState([]);
  const [organizationClients, setOrganizationClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bands, setBands] = useState([]);
  const [fetchingBands, setFetchingBands] = useState(false);
  const {user} = useContext(UserContext);
  const {showActionLoader, hideActionLoader, state, setState} =
    useContext(ObjectContext);
  const {control, handleSubmit} = useForm({
    defaultValues: {
      facility: {
        label:
          state.ManagedCareCorporate.selectedCorporate.organizationDetail
            .facilityName,
        value:
          state.ManagedCareCorporate.selectedCorporate.organizationDetail._id,
        ...state.ManagedCareCorporate.selectedCorporate.organizationDetail,
      },
    },
  });

  const getOrganizationClients = useCallback(() => {
    setLoading(true);
    orgClientServer
      .find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          relationshiptype: "sponsor",
          $sort: {
            createdAt: -1,
          },
        },
      })
      .then(res => {
        setOrganizationClients(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
        toast.error(`Something went wrong! ${err}`);
      });
  }, [user]);

  const getFacilityBands = useCallback(() => {
    setFetchingBands(true);
    bandsServer
      .find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          bandType: "Corporate Sponsor",
          $sort: {
            category: 1,
          },
        },
      })
      .then(res => {
        setFetchingBands(false);
        setBands(res.data);
        // console.log(res.data);
      })
      .catch(err => {
        setFetchingBands(false);
        toast.error(`Something went wrong! ${err}`);
      });
  }, [user]);

  useEffect(() => {
    getFacilityBands();
    getOrganizationClients();
  }, []);

  const handleFacilitySearch = val => {
    if (val.length <= 3 && val.trim() === "") return;
    setFetchingFacilities(true);

    facilityServ
      .find({
        _id: {$ne: user.currentEmployee.facilityDetail._id},
        query: {
          $or: [
            {
              facilityName: {
                $regex: val,
                $options: "i",
              },
            },
            {
              facilityOwner: {
                $regex: val,
                $options: "i",
              },
            },
            {
              facilityType: {
                $regex: val,
                $options: "i",
              },
            },
            {
              facilityCategory: {
                $regex: val,
                $options: "i",
              },
            },
            {
              facilityContactPhone: {
                $regex: val,
                $options: "i",
              },
            },
            {
              facilityEmail: {
                $regex: val,
                $options: "i",
              },
            },
          ],

          $limit: 100,
          $sort: {
            createdAt: -1,
          },
        },
      })
      .then(res => {
        //console.log(res);
        setFacilities(res.data);
        setFetchingFacilities(false);
      })
      .catch(err => {
        console.log(err);
        setFetchingFacilities(false);
        toast.error("An error occured, check your network");
      });
  };

  const handleUpdateCorporate = data => {
    const oldCorporate = state.ManagedCareCorporate.selectedCorporate;
    const {facility, band} = data;
    if (!facility || !band)
      return toast.error("Please complete all form fields");

    const isPresent = organizationClients.find(
      item =>
        item?.organizationDetail?.id !== oldCorporate.organizationDetail._id &&
        item?.organizationDetail?._id === facility._id
    );

    if (isPresent)
      return toast.warning("Facility Already a Corporate Organization");

    showActionLoader();

    const corporateData = {
      facility: user.currentEmployee.facilityDetail._id,
      organization: facility._id,
      relationshiptype: "sponsor",
      band: band.name,
    };

    orgClientServer
      .patch(oldCorporate._id, corporateData)
      .then(res => {
        hideActionLoader();
        closeModal();
        setState(prev => ({
          ...prev,
          ManagedCareCorporate: {...prev.DealModule, selectedCorporate: res},
        }));
        toast.success("Organization added succesfully");
      })
      .catch(err => {
        hideActionLoader();
        toast.error("Error adding organization " + err);
      });
  };

  return (
    <Box
      sx={{
        width: "500px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Box>
        <ReactCustomSearchSelectComponent
          label="Select Organization"
          control={control}
          onInputChange={handleFacilitySearch}
          isLoading={fetchingFacilities}
          name="facility"
          placeholder="Search here..."
          options={facilities.map(item => {
            return {
              label: item.facilityName,
              value: item._id,
              ...item,
            };
          })}
        />
      </Box>

      <Box>
        <ReactCustomSelectComponent
          label="Select Band"
          isLoading={fetchingBands}
          control={control}
          name="band"
          placeholder="Search here..."
          options={bands.map(item => {
            return {
              label: item.name,
              value: item.name,
              ...item,
            };
          })}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: "20px",
        }}
      >
        <GlobalCustomButton
          onClick={closeModal}
          sx={{
            width: "50%",
          }}
          color="warning"
        >
          Cancel
        </GlobalCustomButton>

        <GlobalCustomButton
          sx={{
            width: "50%",
          }}
          onClick={handleSubmit(handleUpdateCorporate)}
        >
          Update Corporate
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};
