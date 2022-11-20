/* eslint-disable */
import React, { useState, useContext, useEffect } from "react";
import client from "../../feathers";
import { DebounceInput } from "react-debounce-input";
import { useForm } from "react-hook-form";
import { toast } from "bulma-toast";
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from "../../context";
import { FacilitySearch } from "../helpers/FacilitySearch";
import { PageWrapper } from "../../ui/styled/styles";
import { TableMenu } from "../../ui/styled/global";
import CustomTable from "../../components/customtable";
import FilterMenu from "../../components/utilities/FilterMenu";
import Button from "../../components/buttons/Button";
import ModalBox from "../../components/modal";
import HiaCreate from "./components/HIAcreate";
import ViewText from "../../components/viewtext";
import { Box, Grid, Button as MuiButton } from "@mui/material";
import Input from "../../components/inputs/basic/Input";
import {
  BottomWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
} from "../app/styles";

export default function HiaOrganizationClient() {
  const { state } = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedFacility, setSelectedFacility] = useState();
  const [success, setSuccess] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [modifyModal, setModifyModal] = useState(false);

  //const [showState,setShowState]=useState() //create|modify|detail

  //console.log("Organization parent", state)

  return (
    <section className="section remPadTop">
      {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">Organization  Module</span></div>
            </div> */}
      <div className="columns ">
        <div className="column is-8 ">
          <OrganizationList
            openCreateModal={() => setCreateModal(true)}
            openDetailModal={() => setDetailModal(true)}
          />

          <ModalBox
            open={createModal}
            onClose={() => setCreateModal(false)}
            header="HIA Emplanelment"
          >
            <HiaCreate closeModal={() => setCreateModal(false)} />
          </ModalBox>

          <ModalBox open={detailModal} onClose={() => setDetailModal(false)}>
            <OrganizationDetail
              closeModal={() => setDetailModal(false)}
              closeDetailModal={() => setDetailModal(false)}
              openModifyModal={() => setModifyModal(true)}
            />
          </ModalBox>

          <ModalBox open={modifyModal} onClose={() => setModifyModal(false)}>
            <OrganizationModify />
          </ModalBox>
        </div>
        <div className="column is-4 ">
          {/* {(state.facilityModule.show ==='create')&&<OrganizationCreate />} */}
          {/* {state.facilityModule.show === "detail" && <OrganizationDetail />} */}
          {/* {state.facilityModule.show === "modify" && (
            <OrganizationModify facility={selectedFacility} />
          )} */}
        </div>
      </div>
    </section>
  );
}

export function OrganizationCreate({ showModal, setShowModal }) {
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
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser

  const handleChangeMode = async (e) => {
    await setBand(e.target.value);
  };
  /* const onSubmit = (data,e) =>{
        e.preventDefault();
        setMessage("")
        setError(false)
        setSuccess(false)
          data.createdby=user._id
          //console.log(data);
          
        facilityServ.create(data)
        .then((res)=>{
                //console.log(JSON.stringify(res))
                e.target.reset();
                setMessage("Created Organization successfully")
                setSuccess(true)
            })
            .catch((err)=>{
                setMessage("Error creating facility, probable network issues "+ err )
                setError(true)
            })

      }  */
  const getProviderBand = async () => {
    if (user.currentEmployee) {
      const findServices = await BandsServ.find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          bandType:
            user.currentEmployee.facilityDetail.facilityType === "HMO"
              ? "Provider"
              : "Company",

          // storeId:state.StoreModule.selectedStore._id,
          // $limit:20,
          //   paginate:false,
          $sort: {
            category: 1,
          },
        },
      });
      // console.log(findServices)
      await setProviderBand(findServices.data);
      // console.log(findServices)
    }
  };

  const handleClick = () => {
    //check band selected
    if (band === "") {
      toast({
        message: "Band not selected, Please select band",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }

    console.log(chosen);
    let stuff = {
      facility: user.currentEmployee.facilityDetail._id,
      organization: chosen._id,
      relationshiptype: "managedcare",
      band,
    };
    orgServ
      .create(stuff)
      .then((res) => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        setSuccess(true);
        toast({
          message: "Organization added succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });
        setSuccess(false);
        setBand("");
      })
      .catch((err) => {
        toast({
          message: "Error adding organization " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  useEffect(() => {
    // console.log("starting...")
    getProviderBand();
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

  return (
    <>
      <div className="field is-horizontal">
        <div className="field-body">
          <div
            className="field is-expanded" /* style={ !user.stacker?{display:"none"}:{}} */
          >
            <FacilitySearch
              getSearchfacility={getSearchfacility}
              clear={success}
            />
            <p className="control has-icons-left " style={{ display: "none" }}>
              <input
                className="input is-small" /* ref={register ({ required: true }) }  */ /* add array no */ /* value={facilityId} name="facilityId" type="text" onChange={e=>setFacilityId(e.target.value)} placeholder="Product Id" */
              />
              <span className="icon is-small is-left">
                <i className="fas  fa-map-marker-alt"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <div className="control">
              <div className="select is-small ">
                <select
                  name="bandType"
                  value={band}
                  onChange={(e) => handleChangeMode(e)}
                  className="selectadd"
                >
                  <option value="">
                    {user.currentEmployee.facilityDetail.facilityType === "HMO"
                      ? "Choose Provider Band"
                      : "Choose Company Band"}{" "}
                  </option>
                  {providerBand.map((option, i) => (
                    <option key={i} value={option.name}>
                      {" "}
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <p className="control">
              <button className="button is-success is-small selectadd">
                <span className="is-small" onClick={handleClick}>
                  Add
                </span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export function OrganizationList({ openCreateModal, openDetailModal }) {
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
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [selectedFacility, setSelectedFacility] = useState(); //
  // eslint-disable-next-line
  const { state, setState } = useContext(ObjectContext);
  const { user } = useContext(UserContext);

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
  };
  const handleRow = async (facility) => {
    //console.log("b4",state)

    //console.log("handlerow",facility)

    await setSelectedFacility(facility.organizationDetail);

    const newfacilityModule = {
      selectedFacility: facility,
      show: "detail",
    };
    await setState((prevstate) => ({
      ...prevstate,
      facilityModule: newfacilityModule,
    }));
    //console.log(state)
    openDetailModal();
  };

  const handleSearch = (val) => {
    const field = "facilityName";
    console.log(val);
    if (val.length > 0) {
      orgServ
        .find({
          query: {
            /* [field]: {
                    $regex:val,
                    $options:'i'
                   
                }, */
            facility: user.currentEmployee.facilityDetail._id,
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

  useEffect(() => {
    getFacilities();

    orgServ.on("created", (obj) => getFacilities());
    orgServ.on("updated", (obj) => getFacilities());
    orgServ.on("patched", (obj) => getFacilities());
    orgServ.on("removed", (obj) => getFacilities());
    return () => {};
  }, []);

  //todo: pagination and vertical scroll bar
  console.log(facilities);

  const HIASchema = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row) => row.sn,
      sortable: true,
      inputType: "HIDDEN",
    },

    {
      name: "Organization Name",
      key: "facilityName",
      description: "Organization Name",
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
      key: "address",
      description: "Address",
      selector: (row) => row?.organizationDetail?.facilityAddress,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "City",
      key: "city",
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
      key: "email",
      description: "Email",
      selector: (row) => row?.organizationDetail?.facilityEmail,
      sortable: true,
      required: true,
      inputType: "EMAIL",
    },

    {
      name: "Type",
      key: "type",
      description: "johndoe@mail.com",
      selector: (row) => row?.organizationDetail?.facilityType,
      sortable: true,
      required: true,
      inputType: "EMAIL",
    },

    {
      name: "Category",
      key: "category",
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
      <ModalBox>
        <OrganizationCreate />
      </ModalBox>
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
                List of HIA
              </h2>
            </div>
            {handleCreateNew && (
              <Button
                style={{ fontSize: "14px", fontWeight: "600px" }}
                label="Add New"
                onClick={openCreateModal}
              />
            )}
          </TableMenu>

          <div
            style={{
              width: "100%",
              height: "calc(100vh-90px)",
              overflow: "auto",
            }}
          >
            <CustomTable
              title={""}
              columns={HIASchema}
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
      {/* {!!facilities[1] && */} {/*  }  */}
    </>
  );
}

export function OrganizationDetail({ openModifyModal }) {
  //const { register, handleSubmit, watch, setValue } = useForm(); //errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false); //,
  //const [success, setSuccess] =useState(false)
  // eslint-disable-next-line
  const [message, setMessage] = useState(""); //,
  //const facilityServ=client.service('/facility')
  //const navigate=useNavigate()
  const { user, setUser } = useContext(UserContext);
  const { state, setState } = useContext(ObjectContext);
  const [editHia, setEditHia] = useState(false);
  const { register, handleSubmit, setValue, reset } = useForm();

  const facility = state.facilityModule.selectedFacility;

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
    openModifyModal();
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

    // console.log("close form");
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
    setEditHia(false);
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
            message: "Hia deleted successfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          changeState();
        })
        .catch((err) => {
          toast({
            message: "Error deleting Hia,probably network issue or" + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
  };
  useEffect(() => {
    setValue("facilityName", facility.organizationDetail.facilityName, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue("facilityAddress", facility.organizationDetail.facilityAddress, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue("facilityCity", facility.organizationDetail.facilityCity, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue(
      "facilityContactPhone",
      facility.organizationDetail.facilityContactPhone,
      {
        shouldValidate: true,
        shouldDirty: true,
      }
    );

    setValue("facilityEmail", facility.organizationDetail.facilityEmail, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue("facilityOwner", facility.organizationDetail.facilityOwner, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue("facilityType", facility.organizationDetail.facilityType, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue("facilityCategory", facility.organizationDetail.facilityCategory, {
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

  return (
    <>
      <Box
        sx={{
          width: "800px",
          maxHeight: "80vh",
        }}
      >
        <HeadWrapper>
          <Box>
            <h2>Hia Detail</h2>
            <span>
              Hia Detail of {facility.organizationDetail.facilityName}
            </span>
          </Box>
          <BottomWrapper>
            <MuiButton
              variant="contained"
              size="small"
              sx={{
                textTransform: "capitalize",
                marginLeft: "10px",
              }}
              onClick={() => setEditHia(true)}
            >
              Edit Hia
            </MuiButton>
          </BottomWrapper>
        </HeadWrapper>
      </Box>

      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            {(facility.organizationDetail.facilityName || editHia) && (
              <Grid item xs={4}>
                <Input
                  register={register("facilityName")}
                  label="Name"
                  disabled={!editHia}
                />
              </Grid>
            )}
            {(facility.organizationDetail.facilityAddress || editHia) && (
              <Grid item xs={4}>
                <Input
                  register={register("facilityAddress")}
                  label="Address"
                  disabled={!editHia}
                />
              </Grid>
            )}

            {(facility.organizationDetail.facilityCity || editHia) && (
              <Grid item xs={4}>
                <Input
                  register={register("facilityCity")}
                  label="City"
                  disabled={!editHia}
                />
              </Grid>
            )}
            {(facility.organizationDetail.facilityContactPhone || editHia) && (
              <Grid item xs={4}>
                <Input
                  register={register("facilityContactPhone")}
                  label="Phone"
                  disabled={!editHia}
                />
              </Grid>
            )}

            {(facility.organizationDetail.facilityEmail || editHia) && (
              <Grid item xs={4}>
                <Input
                  register={register("facilityEmail")}
                  label="Email"
                  disabled={!editHia}
                />
              </Grid>
            )}

            {(facility.organizationDetail.facilityOwner || editHia) && (
              <Grid item xs={4}>
                <Input
                  register={register("facilityOwner")}
                  label="CEO"
                  disabled={!editHia}
                />
              </Grid>
            )}

            {(facility.organizationDetail.facilityType || editHia) && (
              <Grid item xs={4}>
                <Input
                  register={register("facilityType")}
                  label="Type"
                  disabled={!editHia}
                />
              </Grid>
            )}

            {(facility.organizationDetail.facilityCategory || editHia) && (
              <Grid item xs={4}>
                <Input
                  register={register("facilityCategory")}
                  label="Category"
                  disabled={!editHia}
                />
              </Grid>
            )}
          </Grid>
        </form>
      </Box>
      {editHia && (
        <Box
          sx={{ width: "100%", display: "flex", alignItems: "center" }}
          mt={2}
        >
          <MuiButton
            variant="contained"
            color="success"
            sx={{ textTransform: "capitalize", marginRight: "10px" }}
            onClick={handleSubmit(onSubmit)}
          >
            Update Hia
          </MuiButton>

          <MuiButton
            variant="contained"
            color="error"
            sx={{ textTransform: "capitalize", marginRight: "10px" }}
            onClick={handleDelete}
          >
            Delete Hia
          </MuiButton>

          <MuiButton
            variant="contained"
            color="warning"
            sx={{ textTransform: "capitalize", marginRight: "10px" }}
            onClick={handleCancel}
          >
            Cancel Update
          </MuiButton>
        </Box>
      )}
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
        setSuccess(true);
        changeState();
      })
      .catch((err) => {
        setMessage("Error creating facility, probable network issues " + err);
        setError(true);
      });
  };

  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Organization Details</p>
        </div>
        <div className="card-content vscrollable">
          {success && <div className="message"> {message}</div>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label className="label is-small">
                Name
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input  is-small"
                    {...register("x", { required: true })}
                    name="facilityName"
                    type="text"
                    placeholder="Name of Facility"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-hospital"></i>
                  </span>
                </p>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                Address
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input is-small"
                    {...register("x", { required: true })}
                    name="facilityAddress"
                    type="text"
                    placeholder="Address of Facility"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-map-signs"></i>
                  </span>
                </p>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                City
                <p className="control has-icons-left">
                  <input
                    className="input is-small"
                    {...register("x", { required: true })}
                    name="facilityCity"
                    type="text"
                    placeholder="City/Town"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-map-marker-alt"></i>
                  </span>
                </p>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                Phone
                <p className="control has-icons-left">
                  <input
                    className="input is-small"
                    {...register("x", { required: true })}
                    name="facilityContactPhone"
                    type="text"
                    placeholder="Contact Phone No"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-phone-alt"></i>
                  </span>
                </p>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                Email
                <p className="control has-icons-left">
                  <input
                    className="input is-small"
                    {...register("x", { required: true })}
                    name="facilityEmail"
                    type="email"
                    placeholder="Organization Email"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </p>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                CEO
                <p className="control has-icons-left">
                  <input
                    className="input is-small"
                    {...register("x", { required: true })}
                    name="facilityOwner"
                    type="text"
                    placeholder="Organization Owner"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user-md"></i>
                  </span>
                </p>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                Type
                <p className="control has-icons-left">
                  <input
                    className="input is-small"
                    {...register("x", { required: true })}
                    name="facilityType"
                    type="text"
                    placeholder="Organization Type"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-hospital-symbol"></i>
                  </span>
                </p>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                Category
                <p className="control has-icons-left">
                  <input
                    className="input is-small"
                    {...register("x", { required: true })}
                    name="facilityCategory"
                    type="text"
                    placeholder="Organization Category"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-clinic-medical"></i>
                  </span>
                </p>
              </label>
            </div>
            <div className="field  is-grouped">
              <p className="control">
                <button className="button is-success is-small">Save</button>
              </p>
              <p className="control">
                <button
                  className="button is-warning is-small"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </p>
              <p className="control">
                <button
                  className="button is-danger is-small"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </p>
            </div>
            {error && <div className="message"> {message}</div>}
          </form>
        </div>
      </div>
    </>
  );
}
