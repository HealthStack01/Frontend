/* eslint-disable */
import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
import {UserContext, ObjectContext} from "../../context";
import {toast, ToastContainer} from "react-toastify";
import {TableMenu} from "../../ui/styled/global";
import FilterMenu from "../../components/utilities/FilterMenu";
import CustomTable from "../../components/customtable";
import CustomSelect from "../../components/inputs/basic/Select";
import Textarea from "../../components/inputs/basic/Textarea";
import CustomConfirmationDialog from "../../components/confirm-dialog/confirm-dialog";
import {Box} from "@mui/material";
import {PageWrapper} from "./styles";
import Input from "../../components/inputs/basic/Input";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import ModalBox from "../../components/modal";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import {MdOutlineUpdate, MdEdit} from "react-icons/md";
import CreateIcon from "@mui/icons-material/Create";

export default function CaseDefinition() {
  const [createModal, setCreateModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [modifyModal, setModifyModal] = useState(false);

  const handleShowDetailModal = () => {
    setDetailModal(true);
  };

  const handleHideDetailModal = () => {
    setDetailModal(false);
  };
  const handleCreateModal = () => {
    setCreateModal(true);
  };

  const handleHideCreateModal = () => {
    setCreateModal(false);
  };
  const handleModifyModal = () => {
    setModifyModal(true);
  };

  const handleHideModifyModal = () => {
    setModifyModal(false);
  };

  return (
    <Box>
      <CaseDefinitionList
        showCreateModal={handleCreateModal}
        showDetailModal={handleShowDetailModal}
      />
      <ModalBox
        width="70%"
        overflow="hidden"
        open={createModal}
        onClose={handleHideCreateModal}
        header="Create CaseDefinition"
      >
        <CaseDefinitionCreate />
      </ModalBox>

      <ModalBox
        width="75vw"
        open={detailModal}
        onClose={handleHideDetailModal}
        header="CaseDefinition Detail"
      >
        <CaseDefinitionDetail showModifyModal={handleModifyModal} />
      </ModalBox>
    </Box>
  );
}

export function CaseDefinitionCreate() {
  const {register, handleSubmit, control, reset} = useForm();
  const {user} = useContext(UserContext);

  const CaseDefinitionServ = client.service("casedefinition");
  const notificationTypeOptions = [
    "Immediate Notification",
    "Weekly",
    "Monthly",
  ];
  const notifierOptions = [
    "Facility Focal Person",
    "DSNO",
    "Asst DSNO",
    "State Epidemiologist",
  ];

  const onSubmit = useCallback(async (data, e) => {
    data.disease = {
      name: data.diseaseName,
      icdcode: "",
      icdver: "",
      snomed: "",
      snomedver: "",
    };
    (data.notificationtype = data.notificationType),
      (data.observations = []),
      (data.symptoms = data.symptoms),
      (data.signs = data.signs),
      (data.casedefinition = data.casedefinition),
      (data.facility = user.currentEmployee.facilityDetail._id),
      (data.labconfirmation = data.lab),
      (data.treatmentprotocol = data.management),
      (data.network = [{}]),
      (data.notification_destination = data.notify);

    e.preventDefault();
    await CaseDefinitionServ.create(data)
      .then(res => {
        toast.success(`Case Definition successfully created`);
        // console.log(res);
        reset();
      })
      .catch(err => {
        // console.log(err);
        toast.error(`Sorry, You weren't able to case definition. ${err}`);
      });
  }, []);

  return (
    <>
      <form>
        <ToastContainer theme="colored" />
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <GlobalCustomButton onClick={handleSubmit(onSubmit)}>
            <AddCircleOutline sx={{marginRight: "5px"}} fontSize="small" />
            Create
          </GlobalCustomButton>
        </Box>
        <Grid container>
          <Grid xs={5} mb={2}>
            <CustomSelect
              label="Choose Notification Type"
              name="notificationType"
              options={notificationTypeOptions}
              register={register("notificationType")}
              control={control}
            />
          </Grid>
        </Grid>
        <Grid container gap="1rem" alignItems="center">
          <Grid xs={5}>
            <Input
              register={register("diseaseName", {required: true})}
              name="diseaseName"
              type="text"
              label="Name of Disease"
            />
          </Grid>
          <Grid xs={5}>
            <CustomSelect
              label="Choose Person to Notify"
              name="notify"
              options={notifierOptions}
              register={register("notify")}
              control={control}
            />
          </Grid>
          <Grid xs={5}>
            <Textarea
              register={register("symptoms", {required: true})}
              name="symptoms"
              type="text"
              label="Symptoms"
            />
          </Grid>
          <Grid xs={5}>
            <Textarea
              register={register("casedefinition", {required: true})}
              name="casedefinition"
              type="text"
              label="Case definition"
            />
          </Grid>
          <Grid xs={5}>
            <Textarea
              register={register("signs", {required: true})}
              name="signs"
              type="text"
              label="Signs"
            />
          </Grid>
          <Grid xs={5}>
            <Textarea
              register={register("lab", {required: true})}
              name="lab"
              type="text"
              label="Laboratory Confirmation"
            />
          </Grid>
          <Grid xs={10}>
            <Textarea
              register={register("management", {required: true})}
              name="management"
              type="text"
              label="Management Protocol"
            />
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export function CaseDefinitionList({showCreateModal, showDetailModal}) {
  const CaseDefinitionServ = client.service("casedefinition");
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCaseDefinition, setSelectedCaseDefinition] = useState();
  const {state, setState} = useContext(ObjectContext);
  const {user, setUser} = useContext(UserContext);

  const handleCreateNew = async () => {
    const newBandModule = {
      selectedEpid: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      EpidemiologyModule: newBandModule,
    }));
    openCreateModal();
  };
  const handleRow = async CaseDefinition => {
    await setSelectedCaseDefinition(CaseDefinition);

    const newCaseDefinitionModule = {
      selectedEpid: CaseDefinition,
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      EpidemiologyModule: newCaseDefinitionModule,
    }));
    console.log(newCaseDefinitionModule);
    showDetailModal();
  };

  const handleSearch = val => {
    const field = "disease.name";
    console.log(val);
    CaseDefinitionServ.find({
      query: {
        [field]: {
          $regex: val,
          $options: "i",
        },
        facility: user.currentEmployee.facilityDetail._id || "",
        $limit: 50,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then(res => {
        // console.log(res);
        setFacilities(res.data);
        setMessage(" Case Definition  fetched successfully");
        setSuccess(true);
      })
      .catch(err => {
        // console.log(err);
        setMessage(
          "Error fetching Case Definition, probable network issues " + err
        );
        setError(true);
      });
  };

  const getFacilities = async () => {
    setLoading(true);
    if (user.currentEmployee) {
      const findCaseDefinition = await CaseDefinitionServ.find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          $limit: 50,
          $sort: {
            createdAt: -1,
          },
        },
      });

      await setFacilities(findCaseDefinition.data);
      setLoading(false);
    } else {
      if (user.stacker) {
        const findCaseDefinition = await CaseDefinitionServ.find({
          query: {
            $limit: 50,
            $sort: {
              facility: -1,
            },
          },
        });

        await setFacilities(findCaseDefinition.data);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    if (user) {
      getFacilities();
    } else {
    }
    CaseDefinitionServ.on("created", obj => getFacilities());
    CaseDefinitionServ.on("updated", obj => getFacilities());
    CaseDefinitionServ.on("patched", obj => getFacilities());
    CaseDefinitionServ.on("removed", obj => getFacilities());
    return () => {};
  }, []);

  //todo: pagination and vertical scroll bar
  const caseDefinitionSchema = [
    {
      name: "S/NO",
      key: "sn",
      description: "Enter name of Disease",
      selector: row => row.sn,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      width: "70px",
    },
    {
      name: "Name of Disease",
      key: "name",
      description: "Enter name of Disease",
      selector: row => row.disease.name,
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "150px",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Symptoms",
      key: "symptoms",
      description: "Enter Symptoms",
      selector: row => row.symptoms,
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "200px",
    },
    {
      name: "Case Definition",
      key: "casedefinition",
      description: "Enter Case Definition",
      selector: row => row.casedefinition,
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "200px",
    },
    {
      name: "Signs",
      key: "signs",
      description: "Enter Signs",
      selector: row => row.signs,
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "200px",
    },
    {
      name: "Laboratory Confirmation",
      key: "laboratory confirmation",
      description: "Enter Laboratory Confirmation",
      selector: row => row.labconfirmation,
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "200px",
    },
    {
      name: "Management Protocol",
      key: "management protocol",
      description: "Enter Management Protocol",
      selector: row => row.treatmentprotocol,
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "200px",
    },
    {
      name: "Person To Notify",
      key: "notify",
      description: "Enter Person To Notify",
      selector: row => row.notification_destination,
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "200px",
    },
    {
      name: "Notification Type",
      key: "notificationtype",
      description: "Enter Notification Type",
      selector: row => row.notificationtype,
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "150px",
    },
  ];

  console.log(facilities);
  return (
    <>
      {user ? (
        <>
          <PageWrapper
            style={{flexDirection: "column", padding: "0.6rem 1rem"}}
          >
            <TableMenu>
              <div style={{display: "flex", alignItems: "center"}}>
                {handleSearch && (
                  <div className="inner-table">
                    <FilterMenu onSearch={handleSearch} />
                  </div>
                )}
                <h2 style={{marginLeft: "10px", fontSize: "0.95rem"}}>
                  Case Definitions
                </h2>
              </div>

              {handleCreateNew && (
                <GlobalCustomButton onClick={showCreateModal}>
                  <AddCircleOutline
                    sx={{marginRight: "5px"}}
                    fontSize="small"
                  />
                  Add New
                </GlobalCustomButton>
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
                columns={caseDefinitionSchema}
                data={facilities}
                pointerOnHover
                highlightOnHover
                striped
                onRowClicked={handleRow}
                progressPending={loading}
              />
            </div>
          </PageWrapper>
        </>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}

export function CaseDefinitionDetail({showModifyModal}) {
  const {register, control, handleSubmit} = useForm(); //errors,
  const CaseDefinitionServ = client.service("casedefinition");
  const [editing, setEditing] = useState(false); //,
  const [confirmDialog, setConfirmDialog] = useState(false);
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);

  const notificationTypeOptions = [
    "Immediate Notification",
    "Weekly",
    "Monthly",
  ];
  const notifierOptions = [
    "Facility Focal Person",
    "DSNO",
    "Asst DSNO",
    "State Epidemiologist",
  ];

  const casedefinition = state.EpidemiologyModule.selectedEpid;

  const changeState = () => {
    const newEpidemiologyModule = {
      selectedEpid: {},
      show: "create",
    };
    setState(prevstate => ({
      ...prevstate,
      EpidemiologyModule: newEpidemiologyModule,
    }));
  };

  const onSubmit = async data => {
    data.disease = {
      name: casedefinition.disease.name,
      icdcode: "",
      icdver: "",
      snomed: "",
      snomedver: "",
    };

    data.facility = casedefinition.facility;
    data.notificationtype = data.notificationType;
    data.notification_destination = data.notify;
    await CaseDefinitionServ.patch(casedefinition._id, data)
      .then(res => {
        console.log(res);
        toast("CaseDefinition updated succesfully");
      })
      .catch(err => {
        console.log(err);
        toast(
          `Error updating CaseDefinition, probable network issues or ${err}`
        );
      });
    changeState();
  };

  const handleDelete = async () => {
    showActionLoader();
    await CaseDefinitionServ.remove(casedefinition._id)
      .then(res => {
        hideActionLoader();
        setConfirmDialog(false);
        toast.success("CaseDefinition deleted succesfully");
        changeState();
      })
      .catch(err => {
        hideActionLoader();
        setConfirmDialog(false);
        toast.error(
          "Error deleting CaseDefinition, probable network issues or " + err
        );
      });
    // }
  };

  return (
    <>
      <CustomConfirmationDialog
        open={confirmDialog}
        cancelAction={() => setConfirmDialog(false)}
        confirmationAction={handleDelete}
        type="danger"
        message={`Are you sure you want to delete this case definition`}
      />
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
          Delete
        </GlobalCustomButton>

        {!editing ? (
          <GlobalCustomButton
            onClick={() => {
              setEditing(!editing);
            }}
          >
            <CreateIcon fontSize="small" sx={{marginRight: "5px"}} />
            Edit
          </GlobalCustomButton>
        ) : (
          <GlobalCustomButton
            color="success"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            <MdOutlineUpdate sx={{marginRight: "5px"}} fontSize="bold" />
            Update
          </GlobalCustomButton>
        )}
      </Box>
      <form>
        <Grid container mb={2}>
          {!editing ? (
            <Grid xs={5}>
              <CustomSelect
                label="Choose Notification Type"
                name="notificationType"
                options={notificationTypeOptions}
                register={register("notificationType", {required: true})}
                defaultValue={casedefinition?.notificationtype}
              />
            </Grid>
          ) : (
            <Grid xs={5}>
              <CustomSelect
                label="Choose Notification Type"
                name="notificationType"
                options={notificationTypeOptions}
                register={register("notificationType", {required: true})}
                control={control}
              />
            </Grid>
          )}
        </Grid>
        <Grid container gap="1rem" alignItems="center">
          {!editing ? (
            <Grid xs={5}>
              <Input
                register={register("disease", {required: true})}
                name="disease"
                defaultValue={casedefinition?.disease?.name}
                label="Name of Disease"
              />
            </Grid>
          ) : (
            <Grid xs={5}>
              <Input
                register={register("disease", {required: true})}
                name="disease"
                type="text"
                label="Name of Disease"
              />
            </Grid>
          )}
          {!editing ? (
            <Grid xs={5}>
              <CustomSelect
                label="Choose Person to Notify"
                name="notify"
                options={notifierOptions}
                defaultValue={casedefinition?.notification_destination}
                register={register("notify", {required: true})}
              />
            </Grid>
          ) : (
            <Grid xs={5}>
              <CustomSelect
                label="Choose Person to Notify"
                name="notify"
                options={notifierOptions}
                register={register("notify", {required: true})}
                control={control}
              />
            </Grid>
          )}
          {!editing ? (
            <Grid xs={5}>
              <Textarea
                register={register("symptoms", {required: true})}
                name="symptoms"
                defaultValue={casedefinition?.symptoms}
                label="Symptoms"
              />
            </Grid>
          ) : (
            <Grid xs={5}>
              <Textarea
                register={register("symptoms", {required: true})}
                name="symptoms"
                type="text"
                label="Symptoms"
              />
            </Grid>
          )}

          {!editing ? (
            <Grid xs={5}>
              <Textarea
                register={register("casedefinition", {required: true})}
                name="casedefinition"
                defaultValue={casedefinition?.casedefinition}
                label="Case Definition"
              />
            </Grid>
          ) : (
            <Grid xs={5}>
              <Textarea
                register={register("casedefinition", {required: true})}
                name="casedefinition"
                type="text"
                label="Case Definition"
              />
            </Grid>
          )}
          {!editing ? (
            <Grid xs={5}>
              <Textarea
                register={register("signs", {required: true})}
                name="signs"
                defaultValue={casedefinition?.signs}
                label="Signs"
              />
            </Grid>
          ) : (
            <Grid xs={5}>
              <Textarea
                register={register("signs", {required: true})}
                name="signs"
                type="text"
                label="Signs"
              />
            </Grid>
          )}
          {!editing ? (
            <Grid xs={5}>
              <Textarea
                register={register("lab", {required: true})}
                name="lab"
                defaultValue={casedefinition?.labconfirmation}
                label="Laboratory Confirmation"
              />
            </Grid>
          ) : (
            <Grid xs={5}>
              <Textarea
                register={register("lab", {required: true})}
                name="lab"
                type="text"
                label="Laboratory Confirmation"
              />
            </Grid>
          )}

          {!editing ? (
            <Grid xs={10}>
              <Textarea
                register={register("management", {required: true})}
                name="management"
                defaultValue={casedefinition?.treatmentprotocol}
                label="Management Protocol"
              />
            </Grid>
          ) : (
            <Grid xs={10}>
              <Textarea
                register={register("management", {required: true})}
                name="management"
                type="text"
                label="Management Protocol"
              />
            </Grid>
          )}
        </Grid>
      </form>
    </>
  );
}
