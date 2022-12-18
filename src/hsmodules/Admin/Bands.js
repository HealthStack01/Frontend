import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {PageWrapper} from "../../ui/styled/styles";
import {TableMenu} from "../../ui/styled/global";
import {toast} from "react-toastify";
import FilterMenu from "../../components/utilities/FilterMenu";
// import Button from "../../components/buttons/Button";
import CustomTable from "../../components/customtable";
import {fontSize} from "@mui/system";
import ModalBox from "../../components/modal";
import Input from "../../components/inputs/basic/Input";
import CustomSelect from "../../components/inputs/basic/Select";
import {Grid} from "@mui/material";
import {width} from "@mui/system";
import BadgeIcon from "@mui/icons-material/Badge";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import {fontWeight} from "@mui/system";
import {Portal} from "@mui/material";
import {BottomWrapper, GridWrapper, HeadWrapper} from "../app/styles";
import {GrayWrapper} from "../app/styles";
import ViewText from "../../components/viewtext";
import BandView from "../Admin/BandView";
import {BandForm} from "./BandForm";
import {BandSchema} from "./ui-components/schema";
import CloseIcon from "@mui/icons-material/Close";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import CustomConfirmationDialog from "../../components/confirm-dialog/confirm-dialog";

// eslint-disable-next-line
const searchfacility = {};

export default function Bands() {
  // console.log("bands bands bands");
  const {state} = useContext(ObjectContext); //,setState
  const [createModal, setCreateModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [modifyModal, setModifyModal] = useState(false);
  // eslint-disable-next-line
  const [selectedBand, setSelectedBand] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail

  const handleCreateModal = () => {
    setCreateModal(true);
  };

  const handleHideCreateModal = () => {
    setCreateModal(false);
  };

  return (
    <section className="section remPadTop">
      {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">Band  Module</span></div>
            </div> */}
      <div className="column is-6">
        <BandList showCreateModal={handleCreateModal} />
        <div className="column is-6">
          {state.BandModule.show === "detail" && <BandDetail />}
          {state.BandModule.show === "modify" && (
            <BandModify Band={selectedBand} />
          )}

          <BandCreate open={createModal} setOpen={handleHideCreateModal} />
        </div>
      </div>
    </section>
  );
}

export function BandCreate({open, setOpen}) {
  const [showRegisteredModal, setShowRegisteredModal] = useState(false);
  const {register, handleSubmit, setValue} = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const BandServ = client.service("bands");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const bandTypeOptions = [
    "Provider",
    "Company",
    "Patient",
    "Plan",
    "Corporate Sponsor",
  ];

  //corporate sponsors pay premium and not claims
  //company pays claims and not premium

  const getSearchfacility = obj => {
    setValue("facility", obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeBand.FacilityId)//
    if (!user.stacker) {
      console.log(currentUser);
      setValue("facility", user.currentEmployee.facilityDetail._id, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, []);

  const onSubmit = (data, e) => {
    e.preventDefault();
    if (data.bandType === "") {
      alert("Kindly choose band type");
      return;
    }
    setMessage("");
    setError(false);
    setSuccess(false);
    // data.createdby=user._id
    console.log(data);
    if (user.currentEmployee) {
      data.facility = user.currentEmployee.facilityDetail._id; // or from facility dropdown
    }
    BandServ.create(data)
      .then(res => {
        //console.log(JSON.stringify(res))
        e.target.reset();
        /*  setMessage("Created Band successfully") */
        setSuccess(true);
        toast({
          message: "Band created succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });
        setSuccess(false);
      })
      .catch(err => {
        toast({
          message: "Error creating Band " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  return (
    <>
      <div className="card ">
        <div className="card-header"></div>
        <div className="card-content vscrollable">
          <BandForm open={open} setOpen={setOpen} />
        </div>
      </div>
    </>
  );
}

export function BandList({showCreateModal}) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const BandServ = client.service("bands");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);

  const [loading, setLoading] = useState([]);
  // eslint-disable-next-line
  const [selectedBand, setSelectedBand] = useState(); //
  // eslint-disable-next-line
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(50);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const handleCreateNew = async () => {
    const newBandModule = {
      selectedBand: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      BandModule: newBandModule,
    }));
    //console.log(state)
  };

  const handleRowClicked = row => {
    setSelectedBand(row);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleRow = async Band => {
    await setSelectedBand(Band);
    const newBandModule = {
      selectedBand: Band,
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      BandModule: newBandModule,
    }));
    //console.log(state)
  };

  const handleSearch = val => {
    const field = "name";
    BandServ.find({
      query: {
        [field]: {
          $regex: val,
          $options: "i",
        },
        facility: user.currentEmployee.facilityDetail._id || "",
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then(res => {
        console.log(res);
        setFacilities(res.data);
        setMessage(" Band  fetched successfully");
        setSuccess(true);
      })
      .catch(err => {
        console.log(err);
        setMessage("Error fetching Band, probable network issues " + err);
        setError(true);
      });
  };

  const getFacilities = async () => {
    console.log(user);
    setLoading(true);
    if (user.currentEmployee) {
      console.log(user);

      const findBand = await BandServ.find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          $limit: 200,
          $sort: {
            createdAt: -1,
          },
        },
      });

      await setFacilities(findBand.data);
      setLoading(false);
    } else {
      if (user.stacker) {
        const findBand = await BandServ.find({
          query: {
            $limit: 200,
            $sort: {
              facility: -1,
            },
          },
        });

        await setFacilities(findBand.data);
      }
    }
  };

  useEffect(() => {
    if (user) {
      getFacilities();
    } else {
    }
    BandServ.on("created", obj => getFacilities());
    BandServ.on("updated", obj => getFacilities());
    BandServ.on("patched", obj => getFacilities());
    BandServ.on("removed", obj => getFacilities());
    return () => {};
  }, []);

  //todo: pagination and vertical scroll bar

  return (
    <>
      {facilities ? (
        <>
          <ModalBox open={open} onClose={handleCloseModal}>
            <BandView
              band={selectedBand}
              open={open}
              setOpen={handleCloseModal}
            />
          </ModalBox>
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
                  List of Bands
                </h2>
              </div>

              {handleCreateNew && (
                <GlobalCustomButton onClick={showCreateModal}>
                  <ControlPointIcon
                    fontSize="small"
                    sx={{marginRight: "5px"}}
                  />
                  Add New
                </GlobalCustomButton>
              )}
            </TableMenu>

            <div
              style={{
                width: "100%",
                justifyContent: "space-between",
                display: "flex",
              }}
            >
              <div></div>
              <CustomTable
                title={""}
                columns={BandSchema}
                data={facilities}
                pointerOnHover
                highlightOnHover
                striped
                onRowClicked={handleRowClicked}
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

export function BandDetail({showModifyModal}) {
  //const { register, handleSubmit, watch, setValue } = useForm(); //errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false); //,
  //const [success, setSuccess] =useState(false)
  // eslint-disable-next-line
  const [message, setMessage] = useState(""); //,
  //const BandServ=client.service('/Band')
  //const navigate=useNavigate()
  //const {user,setUser} = useContext(UserContext)
  const {state, setState} = useContext(ObjectContext);

  const Band = state.BandModule.selectedBand;

  const handleEdit = async () => {
    const newBandModule = {
      selectedBand: Band,
      show: "modify",
    };
    await setState(prevstate => ({
      ...prevstate,
      BandModule: newBandModule,
    }));
    //console.log(state)
    showModifyModal();
  };

  return (
    <GrayWrapper>
      <HeadWrapper>
        <div>
          <h2>Band Detail</h2>
          <span>Band detail of {Band.name}</span>
        </div>
        <BottomWrapper>
          <GlobalCustomButton
            text="Delete Band"
            background="#FFE9E9"
            color="#ED0423"
          />

          <GlobalCustomButton
            text={`Edit Client`}
            showicon
            icon="bi bi-pen-fill"
            onClick={handleEdit}
          />
        </BottomWrapper>
      </HeadWrapper>

      <GridWrapper className="two-columns">
        <ViewText label="Name" text={Band.name} />
        <ViewText label="Band Type" text={Band.bandType} />
      </GridWrapper>

      {error && <div className="message"> {message}</div>}
    </GrayWrapper>
  );
}

export function BandModify() {
  const {register, handleSubmit, setValue, reset, errors} = useForm(); //watch, errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const BandServ = client.service("bands");
  //const navigate=useNavigate()
  // eslint-disable-next-line
  const {user} = useContext(UserContext);
  const {state, setState} = useContext(ObjectContext);
  const [confirmDialog, setConfirmDialog] = useState(false);

  const Band = state.BandModule.selectedBand;

  useEffect(() => {
    setValue("name", Band.name, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("bandType", Band.bandType, {
      shouldValidate: true,
      shouldDirty: true,
    });
    /*  setValue("profession", Band.profession,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("phone", Band.phone,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("email", Band.email,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("department", Band.department,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("deptunit", Band.deptunit,  {
                shouldValidate: true,
                shouldDirty: true
            }) */
    /*   setValue("BandCategory", Band.BandCategory,  {
                shouldValidate: true,
                shouldDirty: true
            }) */

    return () => {};
  }, []);

  const handleCancel = async () => {
    const newBandModule = {
      selectedBand: {},
      show: "list",
    };
    await setState(prevstate => ({
      ...prevstate,
      BandModule: newBandModule,
    }));
    //console.log(state)
  };

  const changeState = () => {
    const newBandModule = {
      selectedBand: {},
      show: "create",
    };
    setState(prevstate => ({...prevstate, BandModule: newBandModule}));
  };
  const handleDelete = async () => {
    //let conf = window.confirm("Are you sure you want to delete this data?");

    const dleteId = Band._id;
    //if (conf) {
    BandServ.remove(dleteId)
      .then(res => {
        //console.log(JSON.stringify(res))
        reset();
        /*  setMessage("Deleted Band successfully")
                setSuccess(true)
                changeState()
               setTimeout(() => {
                setSuccess(false)
                }, 200); */
        toast.success("Band deleted succesfully");
        changeState();
      })
      .catch(err => {
        // setMessage("Error deleting Band, probable network issues "+ err )
        // setError(true)
        toast.error("Error deleting Band, probable network issues or " + err);
      });
    //}
  };

  /* ()=> setValue("firstName", "Bill", , {
            shouldValidate: true,
            shouldDirty: true
          })) */
  const onSubmit = (data, e) => {
    e.preventDefault();

    setSuccess(false);
    console.log(data);
    data.facility = Band.facility;
    //console.log(data);

    BandServ.patch(Band._id, data)
      .then(res => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        // setMessage("updated Band successfully")
        toast.success("Band updated succesfully");

        changeState();
      })
      .catch(err => {
        //setMessage("Error creating Band, probable network issues "+ err )
        // setError(true)
        toast("Error updating Band, probable network issues or " + err);
      });
  };

  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Band Details-Modify</p>
        </div>
        <div className="card-content vscrollable">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("name", {required: true})}
              name="name"
              type="text"
              placeholder="Name"
            />
            <Input
              {...register("bandtype", {required: true})}
              name="bandtype"
              type="text"
              placeholder="Band Type"
            />
            <div style={{display: "flex"}}>
              <GlobalCustomButton
                type="submit"
                onClick={handleSubmit(onSubmit)}
                style={{
                  position: "relative",
                  cursor: "pointer",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Save
              </GlobalCustomButton>

              <GlobalCustomButton
                type="submit"
                onClick={handleCancel}
                style={{
                  backgroundColor: "#ffdd57",
                  width: "100px",
                  position: "relative",
                  cursor: "pointer",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Cancel
              </GlobalCustomButton>

              <GlobalCustomButton
                type="submit"
                onClick={() => setConfirmDialog(true)}
                style={{
                  position: "relative",
                  cursor: "pointer",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Delete
              </GlobalCustomButton>
            </div>
          </form>

          <CustomConfirmationDialog
            open={confirmDialog}
            cancelAction={() => setConfirmDialog(false)}
            confirmationAction={handleDelete}
            type="danger"
            message="Are you sure you want to delete this data?"
          />
        </div>
      </div>
    </>
  );
}

export function InputSearch({getSearchfacility, clear}) {
  const facilityServ = client.service("facility");
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [searchError, setSearchError] = useState(false);
  // eslint-disable-next-line
  const [showPanel, setShowPanel] = useState(false);
  // eslint-disable-next-line
  const [searchMessage, setSearchMessage] = useState("");
  // eslint-disable-next-line
  const [simpa, setSimpa] = useState("");
  // eslint-disable-next-line
  const [chosen, setChosen] = useState(false);
  // eslint-disable-next-line
  const [count, setCount] = useState(0);
  const inputEl = useRef(null);

  const handleRow = async obj => {
    await setChosen(true);
    //alert("something is chaning")
    getSearchfacility(obj);

    await setSimpa(obj.facilityName);

    // setSelectedFacility(obj)
    setShowPanel(false);
    await setCount(2);
    /* const    newfacilityModule={
            selectedFacility:facility,
            show :'detail'
        }
   await setState((prevstate)=>({...prevstate, facilityModule:newfacilityModule})) */
    //console.log(state)
  };
  const handleBlur = async e => {
    if (count === 2) {
      console.log("stuff was chosen");
    }

    /*  console.log("blur")
         setShowPanel(false)
        console.log(JSON.stringify(simpa))
        if (simpa===""){
            console.log(facilities.length)
            setSimpa("abc")
            setSimpa("")
            setFacilities([])
            inputEl.current.setValue=""
        }
        console.log(facilities.length)
        console.log(inputEl.current) */
  };
  const handleSearch = async val => {
    const field = "facilityName"; //field variable

    if (val.length >= 3) {
      facilityServ
        .find({
          query: {
            //service
            [field]: {
              $regex: val,
              $options: "i",
            },
            $limit: 10,
            $sort: {
              createdAt: -1,
            },
          },
        })
        .then(res => {
          console.log("facility  fetched successfully");
          setFacilities(res.data);
          setSearchMessage(" facility  fetched successfully");
          setShowPanel(true);
        })
        .catch(err => {
          console.log(err);
          setSearchMessage(
            "Error searching facility, probable network issues " + err
          );
          setSearchError(true);
        });
    } else {
      console.log("less than 3 ");
      console.log(val);
      setShowPanel(false);
      await setFacilities([]);
      console.log(facilities);
    }
  };
  useEffect(() => {
    if (clear) {
      setSimpa("");
    }
    return () => {};
  }, [clear]);
  return (
    <div>
      <div className="field">
        <div className="control has-icons-left  ">
          <div className={`dropdown ${showPanel ? "is-active" : ""}`}>
            <div className="dropdown-trigger">
              <DebounceInput
                className="input is-small "
                type="text"
                placeholder="Search Facilities"
                value={simpa}
                minLength={1}
                debounceTimeout={400}
                onBlur={e => handleBlur(e)}
                onChange={e => handleSearch(e.target.value)}
                inputRef={inputEl}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-search"></i>
              </span>
            </div>
            {searchError && <div>{searchMessage}</div>}
            <div className="dropdown-menu">
              <div className="dropdown-content">
                {facilities.map((facility, i) => (
                  <div
                    className="dropdown-item"
                    key={facility._id}
                    onClick={() => handleRow(facility)}
                  >
                    <span>{facility.facilityName}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
