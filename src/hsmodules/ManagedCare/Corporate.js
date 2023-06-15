/* eslint-disable */
import React, { useState, useContext, useEffect, useCallback } from "react";
import client from "../../feathers";
import { DebounceInput } from "react-debounce-input";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from "../../context";
import { FacilitySearch } from "../helpers/FacilitySearch";
import { PageWrapper } from "../../ui/styled/styles";
import { TableMenu } from "../../ui/styled/global";
import Button from "../../components/buttons/Button";
import CustomTable from "../../components/customtable";
import FilterMenu from "../../components/utilities/FilterMenu";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Grid,
  Button as MuiButton,
  Badge,
  Drawer,
  Avatar,
  Typography,
} from "@mui/material";
import { formatDistanceToNowStrict } from "date-fns";
import ModalBox from "../../components/modal";
import { FaHospital, FaAddressCard, FaUserAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { BsFillTelephoneFill, BsHouseDoorFill } from "react-icons/bs";
import { MdEmail, MdLocalHospital } from "react-icons/md";
import ModalHeader from "../Appointment/ui-components/Heading/modalHeader";
import {
  BottomWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
} from "../app/styles";
import Input from "../../components/inputs/basic/Input";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import Policy from "./Policy";
import Beneficiary from "./Beneficiary";
import Claims from "./Claims";
import PremiumPayment from "./Premium";
import ChatInterface from "../../components/chat/ChatInterface";
import CRMTasks from "../CRM/Tasks";
import VideoConference from "../utils/VideoConference";
import { FormsHeaderText } from "../../components/texts";
import CustomSelect from "../../components/inputs/basic/Select";
import moment from "moment";
import MuiCustomDatePicker from "../../components/inputs/Date/MuiDatePicker";
import {
  EnrolleSchema,
  EnrolleSchema2,
  EnrolleSchema3,
  EnrolleSchema4,
  EnrolleSchema5,
  principalData,
} from "./schema";
import CorporateChat from "./components/Corporate/CorporateChat";
import CustomConfirmationDialog from "../../components/confirm-dialog/confirm-dialog";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AdditionalInformationCard, {
  CreateAdditionalInfo,
} from "../CRM/components/lead/AdditionalInfo";
import Textarea from "../../components/inputs/basic/Textarea";

export default function OrganizationClient() {
  const { state } = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedFacility, setSelectedFacility] = useState();
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(0);

  //const [showState,setShowState]=useState() //create|modify|detail

  //console.log("Organization parent", state)

  return (
    <section className="section remPadTop">
      {showModal === 0 && (
        <OrganizationList showModal={showModal} setShowModal={setShowModal} />
      )}

      {showModal === 1 && (
        <ModalBox
          open={state.facilityModule.show === "create"}
          onClose={() => setShowModal(0)}
        >
          <OrganizationCreate />
        </ModalBox>
      )}
      {showModal === 2 && (
        <OrganizationDetail showModal={showModal} setShowModal={setShowModal} />
      )}
      {showModal === 3 && (
        <ModalBox
          open={state.facilityModule.show === "modify"}
          onClose={() => setShowModal(0)}
        >
          <OrganizationModify
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </ModalBox>
      )}
      {/* {state.facilityModule.show === 'modify' && (
        <OrganizationModify facility={selectedFacility} />
      )} */}
    </section>
  );
}

export function OrganizationCreate() {
  const { register, handleSubmit } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const facilityServ = client.service("facility");
  const orgServ = client.service("organizationclient");
  const [chosen, setChosen] = useState("");
  const [band, setBand] = useState("");
  const BandsServ = client.service("bands");
  const [providerBand, setProviderBand] = useState([]);
  const [facilities, setFacilities] = useState([]);
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser

  const handleChangeMode = async (e) => {
    await setBand(e.target.value);
  };
  const getFacilities = () => {
    orgServ
      .find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          relationshiptype: "sponsor",
          $limit: 100,
          $sort: {
            createdAt: -1,
          },
        },
      })
      .then((res) => {
        console.log(res);
        setFacilities(res.data);
        setMessage(" Organization  fetched successfully");
        setSuccess(true);
      })
      .catch((err) => {
        setMessage("Error creating facility, probable network issues " + err);
        setError(true);
      });
  };
  const getProviderBand = async () => {
    if (user.currentEmployee) {
      const findServices = await BandsServ.find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          bandType: "Corporate Sponsor",
          $sort: {
            category: 1,
          },
        },
      });
      await setProviderBand(findServices.data);
    }
  };

  const handleClick = () => {
    //check band selected
    if (band === "") {
      toast.info("Band not selected, Please select band");
      return;
    }
    //if chosen._id if present in facilities, return
    let found = facilities.find(
      (item) => item?.organizationDetail?._id === chosen._id
    );
    if (found) {
      toast.info("Organization already Exists");
      return;
    }

    console.log(chosen);
    let stuff = {
      facility: user.currentEmployee.facilityDetail._id,
      organization: chosen._id,
      relationshiptype: "sponsor",
      band,
    };
    orgServ
      .create(stuff)
      .then((res) => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        setSuccess(true);
        toast.success("Organization added succesfully");
        setSuccess(false);
        setBand("");
      })
      .catch((err) => {
        toast.error("Error adding organization " + err);
      });
  };

  useEffect(() => {
    // console.log("starting...")
    getProviderBand();
    getFacilities();
    return () => {};
  }, []);
  const getSearchfacility = (obj) => {
    setChosen(obj);

    /*  setCategoryName(obj.categoryname)
        setChosen2(obj) */

    if (!obj) {
      //"clear stuff"
      /*  setCategoryName("")
             setChosen2() */
    }
  };
  console.log(chosen);
  return (
    <>
      <FormsHeaderText text={"Add Corporate"} />
      <FacilitySearch getSearchfacility={getSearchfacility} clear={success} />
      {/* <select
        name="bandType"
        value={band}
        onChange={(e) => handleChangeMode(e)}
        className="selectadd"
        style={{
          width: '100%',
          padding: '1rem',
          margin: '1rem 0',
          borderRadius: '4px',
          cursor: 'pointer',
          height: '3rem',
          border: '1px solid rgba(0, 0, 0, 0.6)',
        }}
      >
        <option value="">Choose Corporate Sponsorship Type</option>
        {providerBand.map((option, i) => (
          <option key={i} value={option.name}>
            {' '}
            {option.name}
          </option>
        ))}
      </select> */}
      <Box sx={{ margin: "1rem 0" }}>
        <CustomSelect
          name="bandType"
          onChange={(e) => handleChangeMode(e)}
          options={providerBand}
          label="Corporate Sponsorship Type"
        />
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={12}>
          <GlobalCustomButton
            text="Add"
            type="submit"
            onClick={handleClick}
            color="success"
          />
        </Grid>
      </Grid>
    </>
  );
}

export function OrganizationList({ showModal, setShowModal }) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const facilityServ = client.service("facility");
  const orgServ = client.service("organizationclient");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedFacility, setSelectedFacility] = useState(); //
  // eslint-disable-next-line
  const { state, setState } = useContext(ObjectContext);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const handleCreateNew = async () => {
    const newfacilityModule = {
      selectedFacility: {},
      show: "create",
    };
    await setState((prevstate) => ({
      ...prevstate,
      facilityModule: newfacilityModule,
    }));
    //console.log(state)
    setShowModal(1);
  };
  const handleRow = async (facility) => {
    //console.log("b4",state)

    //console.log("handlerow",facility)

    await setSelectedFacility(facility);

    const newfacilityModule = {
      selectedFacility: facility,
      show: "detail",
    };
    await setState((prevstate) => ({
      ...prevstate,
      facilityModule: newfacilityModule,
    }));
    //console.log(state)
    setShowModal(2);
  };

  const handleSearch = (val) => {
    const field = "facilityName";
    console.log(val);
    if (val.length > 0) {
      orgServ
        .find({
          query: {
             [field]: {
                    $regex:val,
                    $options:'i'
                   
                }, 
            facility: user.currentEmployee.facilityDetail._id,
            relationshiptype: "sponsor",
            $search: val,
            $limit: 10,
            $sort: {
              createdAt: -1,
            },
          },
        })
        .then((res) => {
          console.log(res);
          setFacilities(res.data);
          setMessage(" Organization  fetched successfully");
          setSuccess(true);
        })
        .catch((err) => {
          console.log(err);
          setMessage("Error creating facility, probable network issues " + err);
          setError(true);
        });
    } else {
      getFacilities();
    }
  };

  /*  if (val.length>2){
                console.log("in")
               
            }

        }
     */
  const getFacilities = () => {
    orgServ
      .find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          relationshiptype: "sponsor",
          // $limit: 100,
          $sort: {
            createdAt: -1,
          },
        },
      })
      .then((res) => {
        // console.log(res);
        setFacilities(res.data);
        setTotal(res.total);
        setMessage(" Organization  fetched successfully");
        setSuccess(true);
      })
      .catch((err) => {
        setMessage("Error creating facility, probable network issues " + err);
        setError(true);
      });
  };

  useEffect(() => {
    getFacilities();

    orgServ.on("created", (obj) => getFacilities());
    orgServ.on("updated", (obj) => getFacilities());
    orgServ.on("patched", (obj) => getFacilities());
    orgServ.on("removed", (obj) => getFacilities());
    return () => {};
  }, []);

  const OrganizationClientSchema = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row) => row.sn,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Organization",
      key: "facilityName",
      description: "Organization",
      selector: (row) => row?.organizationDetail?.facilityName,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Band",
      key: "band",
      description: "Band",
      selector: (row) => row.Band,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Address",
      key: "facilityAddress",
      description: "Address",
      selector: (row) => row?.organizationDetail?.facilityAddress,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "City",
      key: "facilityCity",
      description: "City",
      selector: (row) => row?.organizationDetail?.facilityCity,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Phone",
      key: "phone",
      description: "Phone",
      selector: (row) => row?.organizationDetail?.facilityContactPhone,
      sortable: true,
      required: true,
      inputType: "PHONE",
    },

    {
      name: "Email",
      key: "facilityEmail",
      description: "simpa@gmail.com",
      selector: (row) => row?.organizationDetail?.facilityEmail,
      sortable: true,
      required: true,
      inputType: "EMAIL",
    },

    {
      name: "Type",
      key: "facilityType",
      description: "Facility Type",
      selector: (row) => row?.organizationDetail?.facilityType,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Category",
      key: "facilityCategory",
      description: "Category",
      selector: (row) => row?.organizationDetail?.facilityCategory,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  return (
    <>
      {" "}
      {/* <OrganizationCreate /> */}
      <div className="level" style={{ padding: "1rem" }}>
        <PageWrapper
          style={{ flexDirection: "column", padding: "0.6rem,1rem" }}
        >
          <TableMenu>
            <div style={{ display: "flex", alignItems: "center" }}>
              {handleSearch && (
                <div className="inner-table">
                  <FilterMenu onSearch={handleSearch} />
                </div>
              )}
              <h2 style={{ marginLeft: "10px", fontSize: "0.95rem" }}>
                List of Corporates ({total})
              </h2>
            </div>
            {handleCreateNew && (
              <GlobalCustomButton onClick={handleCreateNew} text="Add New" />
            )}
          </TableMenu>
          <div
            style={{
              width: "100%",
              height: "calc(100vh - 170px)",
              overflow: "auto",
            }}
          >
            <CustomTable
              title={""}
              columns={OrganizationClientSchema}
              data={facilities}
              pointerOnHover
              highlightOnHover
              striped
              onRowClicked={handleRow}
              progressPending={loading}
            />
          </div>
        </PageWrapper>
      </div>
    </>
  );
}

export function OrganizationDetail({ showModal, setShowModal }) {
  //const { register, handleSubmit, watch, setValue } = useForm(); //errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false); //,
  //const [success, setSuccess] =useState(false)
  // eslint-disable-next-line
  const [message, setMessage] = useState(""); //,
  //const facilityServ=client.service('/facility')
  //const navigate=useNavigate()
  const orgServ = client.service("organizationclient");
  const { user, setUser } = useContext(UserContext);
  const { state, setState, hideActionLoader, showActionLoader } =
    useContext(ObjectContext);
  const [editCorporate, setEditCorporate] = useState(false);
  const { register, handleSubmit, setValue, reset } = useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [activateCall, setActivateCall] = useState(false);
  const [unreadMsgs, setUnreadMsgs] = useState([]);

  const [createModal, setCreateModal] = useState(false);
  const [informations, setInformations] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    action: null,
    message: "",
    type: "",
  });

  const facility = state.facilityModule.selectedFacility?.organizationDetail;
  const facilityForAdditionalInfo = state.facilityModule.selectedFacility;

  const handleEdit = async () => {
    const newfacilityModule = {
      selectedFacility: facility,
      show: "modify",
    };
    await setState((prevstate) => ({
      ...prevstate,
      facilityModule: newfacilityModule,
    }));
    //console.log(state)
    setShowModal(3);
  };

  const closeForm = async () => {
    const newfacilityModule = {
      selectedFacility: facility,
      show: "create",
    };
    await setState((prevstate) => ({
      ...prevstate,
      facilityModule: newfacilityModule,
    }));
    console.log("close form");
  };

  const handleCancel = async () => {
    const newfacilityModule = {
      selectedFacility: facility,
      show: "detail",
    };
    await setState((prevstate) => ({
      ...prevstate,
      facilityModule: newfacilityModule,
    }));
    setEditCorporate(false);
  };

  const handleDelete = async () => {
    let conf = window.confirm("Are you sure you want to delete this data?");
    const dleteId = facility._id;
    if (conf) {
      orgServ
        .remove(dleteId)
        .then((res) => {
          reset();
          toast({
            message: "Corporate deleted successfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          changeState();
        })
        .catch((err) => {
          toast({
            message: "Error deleting Corporate,probably network issue or" + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
  };

  const deleteAdditionalInfo = async (info) => {
    showActionLoader();
    const oldDealInfo = facilityForAdditionalInfo?.info || [];

    const updatedDealInfo = oldDealInfo.filter((item) => item._id !== info._id);

    const documentId = facilityForAdditionalInfo?._id;

    await orgServ
      .patch(documentId, { info: updatedDealInfo })
      .then((res) => {
        hideActionLoader();
        setState((prev) => ({
          ...prev,
          facilityModule: { ...prev.facilityModule, selectedFacility: res },
        }));
        cancelConfirm();
        toast.success(`You have successfully Deleted Addtional Information!`);
      })
      .catch((err) => {
        hideActionLoader();
        toast.error(
          `Sorry, You weren't able to Delete the Addtional Information!. ${err}`
        );
      });
  };

  const confirmDelete = (info) => {
    setConfirmDialog({
      open: true,
      message:
        "You're about to delete an additional information for this deal?",
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

  useEffect(() => {
    const infos = facilityForAdditionalInfo?.info || [];

    setInformations(infos);
  }, [state.facilityModule.selectedFacility]);

  // console.log("===>>>> facilit under corporate", {
  //   facility: facility,
  //   facilityForAdditionalInfo,
  // });

  useEffect(() => {
    setValue("facilityName", facility?.facilityName, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue("facilityAddress", facility?.facilityAddress, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue("facilityCity", facility?.facilityCity, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("facilityContactPhone", facility?.facilityContactPhone, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue("facilityEmail", facility?.facilityEmail, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue("facilityOwner", facility?.facilityOwner, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue("facilityType", facility?.facilityType, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue("facilityCategory", facility?.facilityCategory, {
      shouldValidate: true,
      shouldDirty: true,
    });
  });

  const onSubmit = (data, e) => {
    e.preventDefault();

    console.log(data);

    setSuccess(false);

    orgServ
      .patch(facility._id, data)

      .then((res) => {
        toast("Hia updated succesfully");
        changeState();
        closeDetailModal();
      })
      .catch((err) => {
        toast(`Error updating Client, probable network issues or ${err}`);
      });
  };

  const getUnreadMessagesCount = useCallback(async () => {
    setUnreadMsgs([]);
    const id = state.facilityModule.selectedFacility._id;
    const userId = user.currentEmployee.userId;
    // console.log(userId);
    await orgServ
      .find({
        query: {
          _id: id,
          $select: ["chat"],
        },
      })
      .then((resp) => {
        const data = resp.data[0];
        const msgs = data.chat;
        //console.log(msgs);
        msgs.map((msg) => {
          if (
            msg.senderId === userId ||
            msg.seen.includes(userId) ||
            unreadMsgs.includes(msg._id)
          ) {
            return;
          } else {
            return setUnreadMsgs((prev) => [msg._id, ...prev]);
          }
        });
      })
      .catch((err) => {
        // toast.error("There was an error getting messages for this chat");
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getUnreadMessagesCount();
  }, []);

  useEffect(() => {
    orgServ.on("created", (obj) => getUnreadMessagesCount());
    orgServ.on("updated", (obj) => getUnreadMessagesCount());
    orgServ.on("patched", (obj) => getUnreadMessagesCount());
    orgServ.on("removed", (obj) => getUnreadMessagesCount());
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "98%",
          maxHeight: "80vh",
          margin: "0 1rem",
        }}
      >
        <CustomConfirmationDialog
          open={confirmDialog.open}
          type={confirmDialog.type}
          message={confirmDialog.message}
          cancelAction={cancelConfirm}
          confirmationAction={confirmDialog.action}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <Box>
            <h2>Corporate Detail</h2>
            <span>Corporate Detail of {facility?.facilityName}</span>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <GlobalCustomButton
              color="warning"
              onClick={() => setShowModal(0)}
              text="Back"
              customStyles={{ marginRight: ".8rem" }}
            />
            {!editCorporate && (
              <GlobalCustomButton
                variant="contained"
                onClick={() => setEditCorporate(true)}
                text="Edit Corporate"
                customStyles={{ marginRight: ".8rem" }}
              />
            )}
            {editCorporate && (
              <GlobalCustomButton
                color="success"
                onClick={handleSubmit(onSubmit)}
                text="Update Corporate"
                customStyles={{ marginRight: ".8rem" }}
              />
            )}
            {editCorporate && (
              <GlobalCustomButton
                color="primary"
                onClick={() => setEditCorporate(false)}
                text=" Details"
                customStyles={{ marginRight: ".8rem" }}
              />
            )}
            {editCorporate && (
              <GlobalCustomButton
                color="error"
                onClick={handleDelete}
                text="Deactivate Corporate"
                customStyles={{ marginRight: ".8rem" }}
              />
            )}
            {editCorporate && (
              <GlobalCustomButton
                color="warning"
                onClick={handleCancel}
                text=" Cancel"
                customStyles={{ marginRight: ".8rem" }}
              />
            )}
            {!editCorporate && (
              <>
                {activateCall && (
                  <GlobalCustomButton
                    onClick={() => setActivateCall(false)}
                    color="error"
                    customStyles={{ marginRight: ".8rem" }}
                  >
                    End Call
                  </GlobalCustomButton>
                )}
                <VideoConference
                  activateCall={activateCall}
                  setActivateCall={setActivateCall}
                  label="Video Conference"
                />
                <GlobalCustomButton
                  color="secondary"
                  variant={currentPage === 2 ? "outlined" : "contained"}
                  onClick={() => setCurrentPage(2)}
                  text="Policy"
                  customStyles={{ margin: "0 .8rem" }}
                />
                <GlobalCustomButton
                  color="success"
                  variant={currentPage === 3 ? "outlined" : "contained"}
                  onClick={() => setCurrentPage(3)}
                  text="Beneficiary"
                  customStyles={{ marginRight: ".8rem" }}
                />
                <GlobalCustomButton
                  color="warning"
                  variant={currentPage === 4 ? "outlined" : "contained"}
                  onClick={() => setCurrentPage(4)}
                  text="Claims"
                  customStyles={{ marginRight: ".8rem" }}
                />
                <GlobalCustomButton
                  color="secondary"
                  variant={currentPage === 6 ? "outlined" : "contained"}
                  onClick={() => setCurrentPage(6)}
                  text="Task"
                  customStyles={{ marginRight: ".8rem" }}
                />
                <GlobalCustomButton
                  color="primary"
                  variant={currentPage === 5 ? "outlined" : "contained"}
                  onClick={() => setCurrentPage(5)}
                  text="Premium"
                  customStyles={{ marginRight: ".8rem" }}
                />
                <Badge
                  badgeContent={unreadMsgs.length}
                  color="success"
                  sx={{ marginRight: "10px", marginTop: "0" }}
                >
                  <GlobalCustomButton
                    onClick={() => setOpenDrawer(true)}
                    text="Chat"
                    color="primary"
                  />
                </Badge>
              </>
            )}
          </Box>
        </Box>
        {currentPage === 1 && (
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                {" "}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={2}>
                    {(facility?.facilityName || editCorporate) && (
                      <Grid item xs={12}>
                        <Input
                          register={register("facilityName")}
                          label="Name"
                          disabled={!editCorporate}
                        />
                      </Grid>
                    )}
                    {(facility?.facilityAddress || editCorporate) && (
                      <Grid item xs={12}>
                        <Input
                          register={register("facilityAddress")}
                          label="Address"
                          disabled={!editCorporate}
                        />
                      </Grid>
                    )}

                    {(facility?.facilityCity || editCorporate) && (
                      <Grid item xs={12}>
                        <Input
                          register={register("facilityCity")}
                          label="City"
                          disabled={!editCorporate}
                        />
                      </Grid>
                    )}
                    {(facility?.facilityContactPhone || editCorporate) && (
                      <Grid item xs={12}>
                        <Input
                          register={register("facilityContactPhone")}
                          label="Phone"
                          disabled={!editCorporate}
                        />
                      </Grid>
                    )}

                    {(facility?.facilityEmail || editCorporate) && (
                      <Grid item xs={12}>
                        <Input
                          register={register("facilityEmail")}
                          label="Email"
                          disabled={!editCorporate}
                        />
                      </Grid>
                    )}

                    {(facility?.facilityOwner || editCorporate) && (
                      <Grid item xs={12}>
                        <Input
                          register={register("facilityOwner")}
                          label="CEO"
                          disabled={!editCorporate}
                        />
                      </Grid>
                    )}

                    {(facility?.facilityType || editCorporate) && (
                      <Grid item xs={12}>
                        <Input
                          register={register("facilityType")}
                          label="Type"
                          disabled={!editCorporate}
                        />
                      </Grid>
                    )}

                    {(facility?.facilityCategory || editCorporate) && (
                      <Grid item xs={12}>
                        <Input
                          register={register("facilityCategory")}
                          label="Category"
                          disabled={!editCorporate}
                        />
                      </Grid>
                    )}
                  </Grid>
                </form>
              </Grid>
              <Grid item xs={6}>
                {" "}
                <Box
                  sx={{
                    display: "flex",
                    alignItem: "center",
                    justifyContent: "space-between",
                  }}
                  mb={2}
                >
                  <FormsHeaderText text="Additional Information" />

                  <GlobalCustomButton onClick={() => setCreateModal(true)}>
                    <AddCircleOutlineOutlinedIcon
                      sx={{ mr: "5px" }}
                      fontSize="small"
                    />{" "}
                    Add Information
                  </GlobalCustomButton>
                </Box>
                <Box>
                  {informations.length > 0 ? (
                    informations.map((info, index) => (
                      <Box sx={{ mb: 2 }}>
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
                      <Typography
                        sx={{ fontSize: "0.75rem", color: "#000000" }}
                      >
                        You've not added any information
                      </Typography>
                    </Box>
                  )}
                </Box>
                <ModalBox
                  open={createModal}
                  onClose={() => setCreateModal(false)}
                  header="Add New Information"
                >
                  <CreateAddInfo closeModal={() => setCreateModal(false)} />
                </ModalBox>
              </Grid>
            </Grid>
          </Box>
        )}
        {currentPage === 2 && (
          <PolicyList
            standAlone={facility?._id}
            showDetail={() => setCurrentPage(7)}
          />
        )}
        {currentPage === 3 && <BeneList standAlone={facility} />}
        {currentPage === 4 && <Claims standAlone />}
        {currentPage === 5 && <PremiumPayment />}
        {currentPage === 6 && <CRMTasks />}
        {currentPage === 7 && <PolicyDetail />}
      </Box>
      <Drawer
        open={openDrawer}
        sx={{
          width: "fit-content",
          height: "fit-content",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "fit-content",
            height: "fit-content",
          },
        }}
        variant="persistent"
        anchor="right"
      >
        <Box
          sx={{
            width: "25vw",
            height: "100vh",
            overflowY: "hidden",
          }}
        >
          <CorporateChat closeChat={() => setOpenDrawer(false)} />
        </Box>
      </Drawer>
    </>
  );
}

export function OrganizationModify() {
  const { register, handleSubmit, setValue, reset } = useForm(); //watch, errors,
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const facilityServ = client.service("/facility");
  //const navigate=useNavigate()
  // eslint-disable-next-line
  const { user } = useContext(UserContext);
  const { state, setState } = useContext(ObjectContext);

  const facility = state.facilityModule.selectedFacility;

  useEffect(() => {
    setValue("facilityName", facility.facilityName, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("facilityAddress", facility.facilityAddress, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("facilityCity", facility.facilityCity, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("facilityContactPhone", facility.facilityContactPhone, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("facilityEmail", facility.facilityEmail, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("facilityOwner", facility.facilityOwner, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("facilityType", facility.facilityType, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("facilityCategory", facility.facilityCategory, {
      shouldValidate: true,
      shouldDirty: true,
    });

    return () => {};
  });

  const handleCancel = async () => {
    const newfacilityModule = {
      selectedFacility: {},
      show: "create",
    };
    await setState((prevstate) => ({
      ...prevstate,
      facilityModule: newfacilityModule,
    }));
    //console.log(state)
  };

  const changeState = () => {
    const newfacilityModule = {
      selectedFacility: {},
      show: "create",
    };
    setState((prevstate) => ({
      ...prevstate,
      facilityModule: newfacilityModule,
    }));
  };
  const handleDelete = async () => {
    let conf = window.confirm("Are you sure you want to delete this data?");

    const dleteId = facility._id;
    if (conf) {
      facilityServ
        .remove(dleteId)
        .then((res) => {
          //console.log(JSON.stringify(res))
          reset();
          setMessage("Deleted Organization successfully");
          setSuccess(true);
          changeState();
          setTimeout(() => {
            setSuccess(false);
          }, 200);
          changeState();
        })
        .catch((err) => {
          setMessage("Error deleting facility, probable network issues " + err);
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 200);
        });
    }
  };

  /* ()=> setValue("firstName", "Bill", , {
            shouldValidate: true,
            shouldDirty: true
          })) */
  const onSubmit = (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    console.log(data);
    //data.createdby=user._id
    //console.log(data);

    facilityServ
      .update(facility._id, data)
      .then((res) => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        setMessage("updated Organization successfully");
        toast.success("updated Organization successfully");
        setSuccess(true);
        changeState();
      })
      .catch((err) => {
        toast.error("Error updating facility, probable network issues " + err);
        setMessage("Error creating facility, probable network issues " + err);
        setError(true);
      });
  };

  return (
    <>
      <ModalHeader text={"Modify Corporate"} />
      {success && <div className="message"> {message}</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6}>
            <Input
              name="facilityName"
              label="Name"
              register={register("facilityName")}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Input
              name="facilityAddress"
              label="Address"
              register={register("facilityAddress")}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Input
              name="facilityCity"
              label="City"
              register={register("facilityCity")}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Input
              name="facilityContactPhone"
              label="Phone"
              register={register("facilityContactPhone")}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Input
              name="facilityEmail"
              label="Email"
              register={register("facilityEmail")}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Input
              name="facilityOwner"
              label="CEO"
              register={register("facilityOwner")}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Input
              name="facilityType"
              label="Type"
              register={register("facilityType")}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Input
              name="facilityCategory"
              label="Category"
              register={register("facilityCategory")}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} style={{ display: "flex" }}>
            <Button type="submit" label="Save" />
            <Button type="button" label="Cancel" onClick={handleCancel} />
            <Button type="button" label="Delete" onClick={handleDelete} />
          </Grid>
        </Grid>
        {error && <div className="message"> {message}</div>}
      </form>
    </>
  );
}
export function PolicyList({ showModal, showDetail, standAlone }) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const ClientServ = client.service("policy");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState(); //
  // eslint-disable-next-line
  const { state, setState } = useContext(ObjectContext);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(50);
  const [total, setTotal] = useState(0);
  const [display, setDisplay] = useState("approve");
  const [view, setView] = useState("lists");

  const handleCreateNew = async () => {
    const newClientModule = {
      selectedClient: {},
      show: "create",
    };
    await setState((prevstate) => ({
      ...prevstate,
      ManagedCareModule: newClientModule,
    }));
    //console.log(state)
    setShowModal(1);
    console.log("test");
  };

  const handleRow = async (Client) => {
    await setSelectedClient(Client);
    const newClientModule = {
      selectedClient: Client,
      show: "detail",
    };
    await setState((prevstate) => ({
      ...prevstate,
      ManagedCareModule: newClientModule,
    }));
    //showDetail();
    setView("details");
  };

  const handleSearch = (val) => {
    // eslint-disable-next-line
    const field = "firstname";
    console.log(val);
    ClientServ.find({
      query: {
        $or: [
          {
            firstname: {
              $regex: val,
              $options: "i",
            },
          },
          {
            lastname: {
              $regex: val,
              $options: "i",
            },
          },
          {
            middlename: {
              $regex: val,
              $options: "i",
            },
          },
          {
            phone: {
              $regex: val,
              $options: "i",
            },
          },
          {
            clientTags: {
              $regex: val,
              $options: "i",
            },
          },
          {
            mrn: {
              $regex: val,
              $options: "i",
            },
          },
          {
            email: {
              $regex: val,
              $options: "i",
            },
          },
          {
            specificDetails: {
              $regex: val,
              $options: "i",
            },
          },
          { gender: val },
        ],

        organizationId: user.currentEmployee.facilityDetail._id, // || "",
        $limit: limit,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then((res) => {
        console.log(res);
        setFacilities(res.data);
        setMessage(" Client  fetched successfully");
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setMessage("Error fetching Client, probable network issues " + err);
        setError(true);
      });
  };

  const getFacilities = async () => {
    setLoading(true);
    if (user.currentEmployee) {
      // const findClient= await ClientServ.find()
      const findClient = await ClientServ.find({
        query: {
          organizationId: user.currentEmployee.facilityDetail._id,
          $sort: {
            createdAt: -1,
          },
        },
      });
      /*  if (page===0){ */
      await setFacilities(findClient.data);
      // console.log(findClient.data);
      setLoading(false);
      /* }else{
             await setFacilities(prevstate=>prevstate.concat(findClient.data))
         } */

      await setTotal(findClient.total);
      //console.log(user.currentEmployee.facilityDetail._id, state)
      //console.log(facilities)
      setPage((page) => page + 1);
    } else {
      if (user.stacker) {
        const findClient = await ClientServ.find({
          query: {
            $limit: 20,
            $sort: {
              createdAt: -1,
            },
          },
        });

        await setFacilities(findClient.data);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (user) {
      //getFacilities()
      rest();
    } else {
      /* const localUser= localStorage.getItem("user")
                     const user1=JSON.parse(localUser)
                     console.log(localUser)
                     console.log(user1)
                     fetchUser(user1)
                     console.log(user)
                     getFacilities(user) */
    }
    ClientServ.on("created", (obj) => rest());
    ClientServ.on("updated", (obj) => rest());
    ClientServ.on("patched", (obj) => rest());
    ClientServ.on("removed", (obj) => rest());
    return () => {};
    // eslint-disable-next-line
  }, []);
  const rest = async () => {
    // console.log("starting rest")
    // await setRestful(true)
    await setPage(0);
    //await  setLimit(2)
    await setTotal(0);
    await setFacilities([]);
    await getFacilities();
    //await  setPage(0)
    //  await setRestful(false)
  };

  useEffect(() => {
    //console.log(facilities)
    return () => {};
  }, [facilities]);
  //todo: pagination and vertical scroll bar
  const PolicySchema = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row, i) => i + 1,
      sortable: true,
      inputType: "HIDDEN",
      width: "80px",
    },
    {
      name: "Date Created",
      key: "createdAt",
      description: "Date Created",
      selector: (row) => moment(row.createdAt).format("YYYY-MM-DD"),
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Sponsorship Type",
      key: "sponsorshipType",
      description: "Sponsorship Type",
      selector: (row) => row.sponsorshipType,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Plan",
      key: "plan",
      description: "Plan",
      selector: (row) => row.plan.name,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Premium",
      key: "premium",
      description: "Premium",
      selector: (row) => row.premium,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Paid",
      key: "isPaid",
      description: "Paid",
      selector: (row) => (row.isPaid ? "Yes" : "No"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Active",
      key: "active",
      description: "Active",
      selector: (row) => (row.active ? "Yes" : "No"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Pricipal Last Name",
      key: "principal",
      description: "Principal Last Name",
      selector: (row) => row.principal.lastname,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "First Name",
      key: "firstname",
      description: "First Name",
      selector: (row) => row.principal.firstname,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Middle Name",
      key: "middlename",
      description: "Middle Name",
      selector: (row) => row.principal.middlename,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Phone",
      key: "phone",
      description: "Phone Number",
      selector: (row) => row.principal.phone,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },

    {
      name: "Email",
      key: "email",
      description: "simpa@email.com",
      selector: (row) => row.principal.email,
      sortable: true,
      required: true,
      inputType: "EMAIL",
    },

    {
      name: "Tags",
      key: "tags",
      description: "Tags",
      selector: (row) => row.principal.clientTags,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  // const approvedFacilities = facilities.filter(
  //   (facility) => facility.approved === true
  // );
  // const pendingFacilities = facilities.filter(
  //   (facility) => facility.approved === false
  // );

  const Selectedpol = facilities.filter(
    (facility) =>
      facility?.sponsor?.organization === standAlone ||
      facility?.providers?.some((item) => item.organization === standAlone)
  );
  // const pendingSelectedpol = pendingFacilities.filter(
  //   (item) =>
  //     item?.principal._id === standAlone ||
  //     (item?.dependantBeneficiaries.length > 0 &&
  //       item?.dependantBeneficiaries?.map((item) => item._id === standAlone))
  // );
  //console.log(Selectedpol, standAlone);

  if (view === "details")
    return (
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            //justifyContent: "space-between",
            borderBottom: "1px solid #f8f8f8",
            backgroundColor: "#f8f8f8",
            position: "sticky",
            zIndex: 99,
            top: 0,
            left: 0,
          }}
          gap={1}
          p={2}
          mt={-1.5}
        >
          <GlobalCustomButton onClick={() => setView("lists")}>
            <ArrowBackIcon />
            Go Back
          </GlobalCustomButton>

          <Typography
            sx={{
              fontSize: "0.95rem",
              fontWeight: "600",
            }}
          >
            Policy Detail
          </Typography>
        </Box>

        <Box>
          <PolicyDetail />
        </Box>
      </Box>
    );
  return (
    <>
      <div className="level">
        <PageWrapper
          style={{ flexDirection: "column", padding: "0.6rem 1rem" }}
        >
          <TableMenu>
            <div style={{ display: "flex", alignItems: "center" }}>
              {handleSearch && (
                <div className="inner-table">
                  <FilterMenu onSearch={handleSearch} />
                </div>
              )}
              <h2 style={{ marginLeft: "10px", fontSize: "0.95rem" }}>
                List of {display === "approve" ? "Approved" : "Pending"}{" "}
                Policies
              </h2>
            </div>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              {/* <GlobalCustomButton
								text={
									display === 'approve'
										? 'Pending Policies'
										: 'Approved Policies'
								}
								onClick={() =>
									setDisplay(display === 'approve' ? 'pending' : 'approve')
								}
								customStyles={{
									marginRight: '10px',
								}}
								color={display === 'approve' ? 'warning' : 'success'}
							/> */}

              {!standAlone && (
                <Button
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                  color="primary"
                  variant="contained"
                  size="small"
                  sx={{ textTransform: "capitalize" }}
                  onClick={handleCreateNew}
                  showicon={true}
                >
                  {" "}
                  Add New
                </Button>
              )}
            </Box>
          </TableMenu>
          <div
            className="level"
            style={{
              height: "80vh",
              overflowY: "scroll",
            }}
          >
            <CustomTable
              title={""}
              columns={PolicySchema}
              data={Selectedpol}
              pointerOnHover
              highlightOnHover
              onRowClicked={handleRow}
              striped
              progressPending={loading}
              CustomEmptyData={"No Policy found"}
            />
          </div>
        </PageWrapper>
      </div>
    </>
  );
}

export function PolicyDetail({ showModal, setShowModal }) {
  const { register, reset, control, handleSubmit } = useForm();
  const policyServ = client.service("policy");
  const [error, setError] = useState(false); //,
  const [finacialInfoModal, setFinacialInfoModal] = useState(false);
  const [billingModal, setBillingModal] = useState(false);
  const [billModal, setBillModal] = useState(false);
  const [appointmentModal, setAppointmentModal] = useState(false);
  const [message, setMessage] = useState(""); //,
  const { user, setUser } = useContext(UserContext);
  const { state, setState } = useContext(ObjectContext);
  const [display, setDisplay] = useState(1);
  const [editPolicy, setEditPolicy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editCustomer, setEditCustomer] = useState(false);
  const [facility, setFacility] = useState([]);

  useEffect(() => {
    let Client = state.ManagedCareModule.selectedClient;
    setFacility(Client);

    const initFormValue = {
      policyNo: Client.policyNo,
      phone: Client.principal?.phone,
      start_date: Client.validitystarts,
      end_date: Client.validityEnds,
      status: Client?.approved ? "Approved" : "Pending",
      sponsorship_type: Client.sponsorshipType,
      plan_type: Client.plan.name,
      policy_tag: Client.principal.clientTags,
      premium: Client.premium,
      sponsor_name: Client.sponsor?.organizationDetail?.facilityName,
      sponsor_phone: Client.sponsor?.organizationDetail?.facilityContactPhone,
      sponsor_email: Client.sponsor?.organizationDetail?.facilityEmail,
      sponsor_address: Client.sponsor?.organizationDetail?.facilityAddress,
    };
    reset(initFormValue);
  }, [state.ManagedCareModule.selectedClient]);

  const handleFinancialInfo = () => {
    setFinacialInfoModal(true);
  };
  const handlecloseModal = () => {
    setFinacialInfoModal(false);
  };

  const handlecloseModal1 = () => {
    setBillingModal(false);
  };

  const handlecloseModal2 = () => {
    setAppointmentModal(false);
  };

  const showBilling = () => {
    setBillingModal(true);
    //history.push('/app/finance/billservice')
  };

  const handleSchedule = () => {
    setAppointmentModal(true);
  };
  const handleBill = () => {
    setBillModal(true);
  };
  const handlecloseModal3 = () => {
    setBillModal(false);
  };
  const updateDetail = async (data) => {
    const docId = state.ManagedCareModule.selectedClient._id;
    console.log(data, docId);
    const policyDetails = {
      policyNo: data.policyNo,
      phone: data.phone,
      validitystarts: data.start_date,
      validityEnds: data.end_date,
      status: data.active,
      sponsorship_type: data.sponsorshipType,
      plan_type: data.plan_type,
      policy_tag: data.policy_tag,
      premium: data.premium,
      sponsor_name: data.sponsor_name,
      sponsor_phone: data.sponsor_phone,
      sponsor_email: data.sponsor_email,
      sponsor_address: data.sponsor_address,
    };
    await policyServ
      .patch(docId, policyDetails)
      .then((res) => {
        setState((prev) => ({
          ...prev,
          ManagedCareModule: { ...prev.ManagedCareModule, selectedClient: res },
        }));
        toast.success("Policy Detail Updated");
        setEditPolicy(false);
      })
      .catch((err) => {
        toast.error("Error Updating Policy Detail");
        setEditPolicy(false);
      });
  };

  const approvePolicy = async () => {
    const docId = state.ManagedCareModule.selectedClient._id;
    const policyDetails = {
      approved: true,
      approvalDate: new Date(),
      approvedby: {
        employeename: user.currentEmployee.facilityDetail.facilityName,
        employeeId: user.currentEmployee.facilityDetail._id,
      },
    };
    console.log(policyDetails);
    await policyServ
      .patch(docId, policyDetails)
      .then((res) => {
        setState((prev) => ({
          ...prev,
          ManagedCareModule: { ...prev.ManagedCareModule, selectedClient: res },
        }));
        toast.success("Policy Approved");
        setEditPolicy(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error Approving Policy" + err);
        setEditPolicy(false);
      });
  };

  console.log(facility);
  return (
    <>
      <div
        className="card "
        style={{
          height: "auto",
          overflowY: "scroll",
          margin: "0 1rem",
          width: "98%",
        }}
      >
        <Box>
          {display === 1 && (
            <Box
              sx={{
                height: "80vh",
                overflowY: "scroll",
              }}
            >
              <Grid container spacing={1} mt={1}>
                <Grid item md={3}>
                  <Input
                    register={register("policyNo", { required: true })}
                    label="Policy No."
                    disabled
                  />
                </Grid>

                <Grid item md={3}>
                  <Input
                    register={register("phone", { required: true })}
                    label="Phone"
                    disabled
                  />
                </Grid>
                <Grid item md={3}>
                  <Input
                    register={register("sponsorship_type", { required: true })}
                    label="Sponsorship Type"
                    disabled
                    //placeholder="Enter customer number"
                  />
                </Grid>
                <Grid item md={3}>
                  <Input
                    register={register("plan_type", { required: true })}
                    label="Plan Type"
                    disabled
                    //placeholder="Enter customer number"
                  />
                </Grid>
                <Grid item md={3}>
                  <Input
                    register={register("status", { required: true })}
                    label="Status"
                    disabled
                    important
                    //placeholder="Enter customer name"
                  />
                </Grid>

                <Grid item md={3}>
                  <Input
                    register={register("policy_tag")}
                    label="Policy Tag"
                    disabled
                    // placeholder="Enter customer name"
                  />
                </Grid>

                <Grid item md={3}>
                  <Input
                    register={register("premium", { required: true })}
                    label="Premium"
                    disabled
                    //placeholder="Enter customer number"
                  />
                </Grid>
                <Grid item md={3}>
                  <MuiCustomDatePicker
                    label="Start Date"
                    name="start_date"
                    control={control}
                    disabled={!editPolicy}
                  />
                </Grid>
                <Grid item md={3}>
                  <MuiCustomDatePicker
                    label="End Date"
                    name="end_date"
                    control={control}
                    disabled={!editPolicy}
                  />
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  alignItem: "center",
                  justifyContent: "space-between",
                }}
                mb={1}
              ></Box>
              {facility.sponsorshipType === "Company" && (
                <>
                  <FormsHeaderText text="Sponsor Details" />
                  <Grid container spacing={1}>
                    <Grid item lg={6} md={6} sm={6}>
                      <Input
                        register={register("sponsor_name")}
                        label="Sponsor Name"
                        disabled

                        //placeholder="Enter customer number"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6}>
                      <Input
                        register={register("sponsor_phone")}
                        label="Sponsor Phone"
                        disabled

                        //placeholder="Enter customer number"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6}>
                      <Input
                        register={register("sponsor_email")}
                        label="Sponsor Email"
                        disabled

                        //placeholder="Enter customer numbe"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6}>
                      <Input
                        register={register("sponsor_address")}
                        label="Sponsor Address"
                        disabled

                        //placeholder="Enter customer number"
                      />
                    </Grid>
                  </Grid>
                </>
              )}
              <Grid item md={12}>
                <FormsHeaderText text="Principal Details" />
                <CustomTable
                  title={""}
                  columns={EnrolleSchema3}
                  data={[facility?.principal]}
                  pointerOnHover
                  highlightOnHover
                  striped
                  onRowClicked={() => {}}
                  progressPending={loading}
                  CustomEmptyData="You have no Principal yet."
                />
                <FormsHeaderText text="Dependant Details" />
                <CustomTable
                  title={""}
                  columns={EnrolleSchema3}
                  data={facility?.dependantBeneficiaries}
                  pointerOnHover
                  highlightOnHover
                  striped
                  onRowClicked={() => {}}
                  progressPending={loading}
                  CustomEmptyData="You have no Dependant yet"
                />
                <FormsHeaderText text="HMO" />
                <CustomTable
                  title={""}
                  columns={EnrolleSchema5}
                  data={[facility?.organization]}
                  pointerOnHover
                  highlightOnHover
                  striped
                  onRowClicked={() => {}}
                  progressPending={loading}
                  CustomEmptyData="You have no HMO yet."
                />
                <FormsHeaderText text="Provider List" />
                <CustomTable
                  title={""}
                  columns={EnrolleSchema4}
                  data={facility?.providers}
                  pointerOnHover
                  highlightOnHover
                  striped
                  onRowClicked={() => {}}
                  progressPending={loading}
                  CustomEmptyData="You have no Provider yet."
                />
              </Grid>
            </Box>
          )}

          {display === 5 && <Claims standAlone />}
          {display === 6 && <PremiumPayment />}
        </Box>
      </div>
    </>
  );
}
export function BeneList({ showModal, setShowModal, standAlone }) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const ClientServ = client.service("policy");
  // const history = useHistory();
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState(); //
  // eslint-disable-next-line
  const { state, setState } = useContext(ObjectContext);
  // eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(50);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleCreateNew = async () => {
    const newClientModule = {
      selectedClient: {},
      show: "create",
    };
    await setState((prevstate) => ({
      ...prevstate,
      ClientModule: newClientModule,
    }));
    //console.log(state)
    setShowModal(2);
  };

  const handleRow = async (Client) => {
    await setSelectedClient(Client);
    const newClientModule = {
      selectedClient: Client,
      show: "detail",
    };
    await setState((prevstate) => ({
      ...prevstate,
      ClientModule: newClientModule,
    }));
    setShowModal(1);
  };

  const handleSearch = (val) => {
    // eslint-disable-next-line
    const field = "firstname";
    console.log(val);
    ClientServ.find({
      query: {
        $or: [
          {
            firstname: {
              $regex: val,
              $options: "i",
            },
          },
          {
            lastname: {
              $regex: val,
              $options: "i",
            },
          },
          {
            middlename: {
              $regex: val,
              $options: "i",
            },
          },
          {
            phone: {
              $regex: val,
              $options: "i",
            },
          },
          {
            clientTags: {
              $regex: val,
              $options: "i",
            },
          },
          {
            mrn: {
              $regex: val,
              $options: "i",
            },
          },
          {
            email: {
              $regex: val,
              $options: "i",
            },
          },
          {
            specificDetails: {
              $regex: val,
              $options: "i",
            },
          },
          { gender: val },
        ],

        "relatedfacilities.facility": user.currentEmployee.facilityDetail._id, // || "",
        $limit: limit,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then((res) => {
        console.log(res);
        setFacilities(res.data);
        setMessage(" Client  fetched successfully");
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setMessage("Error fetching Client, probable network issues " + err);
        setError(true);
      });
  };

  const getFacilities = async () => {
    if (user.currentEmployee) {
      // const findClient= await ClientServ.find()
      const findClient = await ClientServ.find({
        query: {
          organizationId: user.currentEmployee.facilityDetail._id,
          $or:[
            {'sponsor.facilityName':standAlone.facilityName,},
            {'sponsor._id':standAlone._id,}

          ],
          $sort: {
            createdAt: -1,
          },
        },
      });

      let data = findClient.data;
      console.log("policies",data)

      let list = [];
      data.map((item) => {
        item.principal.principal = item.principal;
        item.principal.organizationName = item.organizationName;
        // item.principal.dependantBeneficiaries = item.dependantBeneficiaries;
        item.principal.plan = item.plan;
        item.principal.detail = {
          policyNo: item?.policyNo,
          sponsor: item?.sponsor,
          plan: item?.plan,
          clientType: "Principal",
          sponsortype: item?.sponsorshipType,
          approved: item?.approved,
        };

        item.principal.organization = {
          ...item?.sponsor?.facilityDetail,
        };

        list.push(item.principal);

        item.dependantBeneficiaries.map((benf) => {
          benf.detail = {
            policyNo: item.policyNo,
            sponsor: item.sponsor,
            plan: item.plan,
            clientType: "Dependent",
            sponsortype: item?.sponsorshipType,
            approved: item?.approved,
          };
          benf.organizationName = item.organizationName;

          benf.plan = item.plan;
          benf.facilityDetail = {
            ...item?.sponsor?.facilityDetail,
          };
          benf.principal = benf;
          list.push(benf);
        });
      });

      setFacilities(list);

     setTotal(findClient.total);
      setPage((page) => page + 1);
    } else {
      if (user.stacker) {
        const findClient = await ClientServ.find({
          query: {
            $limit: 20,
            $sort: {
              createdAt: -1,
            },
          },
        });

        await setFacilities(findClient.data);
      }
    }
  };

  useEffect(() => {
    if (user) {
      //getFacilities()
      rest();
    } else {
      /* const localUser= localStorage.getItem("user")
                    const user1=JSON.parse(localUser)
                    console.log(localUser)
                    console.log(user1)
                    fetchUser(user1)
                    console.log(user)
                    getFacilities(user) */
    }
    ClientServ.on("created", (obj) => rest());
    ClientServ.on("updated", (obj) => rest());
    ClientServ.on("patched", (obj) => rest());
    ClientServ.on("removed", (obj) => rest());
    return () => {};
    // eslint-disable-next-line
  }, []);
  const rest = async () => {
    // console.log("starting rest")
    // await setRestful(true)
    await setPage(0);
    //await  setLimit(2)
    await setTotal(0);
    await setFacilities([]);
    await getFacilities();
    //await  setPage(0)
    //  await setRestful(false)
  };

  useEffect(() => {
    //console.log(facilities)
    return () => {};
  }, [facilities, standAlone]);
  //todo: pagination and vertical scroll bar
/* 
  const BeneficiarySchema = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row) => row.sn,
      sortable: true,
      inputType: "HIDDEN",
      width: "50px",
    },
    {
      name: "Image",
      key: "sn",
      description: "Enter name of employee",
      selector: (row) => <Avatar src={row?.imageurl} />,
      sortable: true,
      inputType: "HIDDEN",
      width: "80px",
    },
    {
      name: "First Name",
      key: "firstname",
      description: "First Name",
      selector: (row) => row.firstname,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Last Name",
      key: "lastname",
      description: "Last Name",
      selector: (row) => row.lastname,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Midlle Name",
      key: "middlename",
      description: "Midlle Name",
      selector: (row) => row.middlename,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Age",
      key: "dob",
      description: "Age",
      selector: (row) =>
        row.dob ? formatDistanceToNowStrict(new Date(row?.dob)) : "",
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Gender",
      key: "gender",
      description: "Male",
      selector: (row) => row.gender,
      sortable: true,
      required: true,
      inputType: "SELECT_LIST",
      options: ["Male", "Female"],
    },

    {
      name: "Email",
      key: "email",
      description: "johndoe@mail.com",
      selector: (row) => row.email,
      sortable: true,
      required: true,
      inputType: "EMAIL",
    },

    {
      name: "Tags",
      key: "clientTags",
      description: "Tags",
      selector: (row) => row.clientTags,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ]; */
  const BeneficiarySchema = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row) => row.sn,
      sortable: true,
      inputType: "HIDDEN",
      width: "50px",
    },
    {
      name: "Image",
      key: "sn",
      description: "Enter name of employee",
      selector: (row) => <Avatar src={row?.imageurl} />,
      sortable: true,
      inputType: "HIDDEN",
      width: "80px",
    },
    {
      name: "First Name",
      key: "firstname",
      description: "First Name",
      selector: (row) => row.firstname,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Last Name",
      key: "lastname",
      description: "Last Name",
      selector: (row) => row.lastname,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    // {
    // 	name: 'Midlle Name',
    // 	key: 'middlename',
    // 	description: 'Midlle Name',
    // 	selector: (row) => row.middlename,
    // 	sortable: true,
    // 	required: true,
    // 	inputType: 'TEXT',
    // },
    {
      name: "Age",
      key: "dob",
      description: "Age",
      selector: (row) =>
        row.dob ? formatDistanceToNowStrict(new Date(row?.dob)) : "",
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Gender",
      key: "gender",
      description: "Male",
      selector: (row) => row.gender,
      sortable: true,
      required: true,
      inputType: "SELECT_LIST",
      options: ["Male", "Female"],
    },

    {
      name: "Email",
      key: "email",
      description: "johndoe@mail.com",
      selector: (row) => row.email,
      sortable: true,
      required: true,
      inputType: "EMAIL",
    },
    {
      name: "Policy No",
      key: "policyNo",
      description: "Policy No",
      selector: (row) => row.detail?.policyNo,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Client Type",
      key: "clientType",
      description: "Client Type",
      selector: (row) => row.detail?.clientType,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Sponsor Type",
      key: "sponsorType",
      description: "Sponsor Type",
      selector: (row) => row.detail?.sponsortype,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Policy Status",
      key: "policyStatus",
      description: "Policy Status",
      selector: (row) => (row.detail?.approved ? "Approved" : "Pending"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];
  // const filteredFacilities = facilities.filter((facility) => {
  return (
    <>
      <div
        className="level"
        style={{
          width: "98%",
          margin: "0 1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* {handleSearch && (
						<div className='inner-table'>
							<FilterMenu onSearch={handleSearch} />
						</div>
					)} */}
          <h2 style={{ marginLeft: "10px", fontSize: "0.95rem" }}>
            List of Beneficiary
          </h2>
        </div>
        <div
          className="level"
          style={{
            height: "80vh",
            overflowY: "scroll",
          }}
        >
          <CustomTable
            title={""}
            columns={BeneficiarySchema}
            data={facilities}
            pointerOnHover
            highlightOnHover
            striped
            onRowClicked={handleRow}
            progressPending={loading}
          />
        </div>
      </div>
    </>
  );
}

export const CreateAddInfo = ({ addInfo, closeModal }) => {
  const dealServer = client.service("organizationclient");
  const { state, setState, hideActionLoader, showActionLoader } =
    useContext(ObjectContext);
  const { user } = useContext(UserContext);
  const { register, handleSubmit, control, reset } = useForm();
  const facility = state.facilityModule.selectedFacility;

  // console.log("===>>>> facilit underprovider", {
  //   facility: facility,
  // });

  const updateAdditionalInfo = async (data) => {
    if (data.info === "") return toast.error("Please provide your information");
    showActionLoader();

    const employee = user.currentEmployee;

    const newInfo = {
      _id: `${Math.random()}`,
      info: data.info,
      date: new Date(),
      employeename: `${employee.firstname} ${employee.lastname}`,
    };

    const oldDealInfo = facility?.info || [];

    const updatedDealInfo = [newInfo, ...oldDealInfo];

    const documentId = facility?._id;

    await dealServer
      .patch(documentId, { info: updatedDealInfo })
      .then((res) => {
        hideActionLoader();
        console.log("===>>>> facilit underprovider", {
          facility: facility,
          state: state,
          selectedFacility: res,
        });
        setState((prev) => ({
          ...prev,
          facilityModule: { ...prev.facilityModule, selectedFacility: res },
        }));

        reset({
          info: "",
        });
        toast.success(
          `You have successfully added a new Addtional Information!`
        );
      })
      .catch((err) => {
        hideActionLoader();
        toast.error(
          `Sorry, You weren't able to add a new Addtional Information!. ${err}`
        );
      });
  };

  return (
    <Box
      sx={{
        width: "400px",
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

      <Box sx={{ display: "flex" }}>
        <GlobalCustomButton
          onClick={handleSubmit(updateAdditionalInfo)}
          sx={{ marginRight: "10px" }}
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
