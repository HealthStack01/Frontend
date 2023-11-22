import {useState, useCallback, useContext, useEffect} from "react";
import {Avatar, Box, Button, Grid, Typography, capitalize} from "@mui/material";
import {useForm} from "react-hook-form";
import Drawer from "@mui/material/Drawer";
import PendingIcon from "@mui/icons-material/Pending";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import {FormsHeaderText} from "../../components/texts";
import Input from "../../components/inputs/basic/Input";
import CustomSelect from "../../components/inputs/basic/Select";
import Textarea from "../../components/inputs/basic/Textarea";
import {FacilitySearch} from "../helpers/FacilitySearch";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import ComplaintConversation from "./ComplaintConversation";
import {ObjectContext, UserContext} from "../../context";
import client from "../../feathers";
import dayjs from "dayjs";
import {toast} from "react-toastify";
import ReactCustomSearchSelectComponent from "../../components/react-custom-select/ReactSearchSelect";
import ReactCustomSelectComponent from "../../components/react-custom-select";
import {TableMenu} from "../dashBoardUiComponent/core-ui/styles";
import FilterMenu from "../../components/utilities/FilterMenu";

const CustomLoader = () => (
  <div
    style={{
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <img
      src="/loading.gif"
      style={{width: "200px", height: "auto", display: "block"}}
    />
    <Typography sx={{marginTop: "-2rem", fontSize: "0.85rem"}}>
      Hold on, whilst we fetch your data...
    </Typography>
  </div>
);

const NewComplaints = () => {
  const complaintServer = client.service("complaints");
  const {user} = useContext(UserContext);
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const {control, watch} = useForm({
    defaultValues: {
      complaint_type: {label: "All", value: "all"},
      category: {
        label: "All Categories",
        value: "All Cetegories",
      },
    },
  });

  const complaint_type = watch("complaint_type");
  const category = watch("category");

  const showComplaintConversation = complaint => {
    setShowDrawer(true);
    setState(prev => ({
      ...prev,
      ComplaintModule: {...prev.ComplaintModule, selectedComplaint: complaint},
    }));
  };

  const getComplaints = useCallback(async () => {
    const facId = user.currentEmployee.facilityDetail._id;
    setLoading(true);
    let query = {
      $or: [
        {
          "from.entity.entityId": facId,
        },
        {
          "to.entity.entityId": facId,
        },
        {
          "copied.entity.entityId": facId,
        },
      ],
      $sort: {
        submissiondate: -1,
      },
      // facilityId: facId,
    };

    if (complaint_type && complaint_type.value !== "all") {
      query = {
        resolution: complaint_type.value === "resolved" ? true : false,
        $or: [
          {
            "from.entity.entityId": facId,
          },
          {
            "to.entity.entityId": facId,
          },
          {
            "copied.entity.entityId": facId,
          },
        ],
        $sort: {
          submissiondate: -1,
        },
      };
    }

    if (category && category.value !== "All Cetegories") {
      query.category = category.value;
    }
    complaintServer
      .find({
        query: query,
      })
      .then(res => {
        setComplaints(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        toast.error(`somehting went wrong ${err}`);
      });
  }, [complaint_type, category]);

  const updateComplaints = useCallback(async () => {
    const facId = user.currentEmployee.facilityDetail._id;
    //showActionLoader();
    const res = await complaintServer.find({
      query: {
        $sort: {
          submissiondate: -1,
        },
        // facilityId: facId,
      },
    });

    setComplaints(res.data);
    hideActionLoader();
  }, []);

  useEffect(() => {
    complaintServer.on("created", obj => setComplaints(prev => [obj, ...prev]));
    complaintServer.on("updated", obj => updateComplaints());
    complaintServer.on("patched", obj => {
      setComplaints(prev =>
        prev.map(item => {
          if (item._id === obj._id) {
            return obj;
          } else {
            return item;
          }
        })
      );
    });
    complaintServer.on("removed", obj => updateComplaints());
  }, []);

  useEffect(() => {
    getComplaints();
  }, [getComplaints]);

  const handleSearch = val => {
    const facId = user.currentEmployee.facilityDetail._id;
    if (val.length < 3 || val.trim() === "") return;
    complaintServer
      .find({
        query: {
          $or: [
            {
              "from.entity.entityId": facId,
            },
            {
              "to.entity.entityId": facId,
            },
            {
              "copied.entity.entityId": facId,
            },
            {
              complaint: {
                $regex: val,
                $options: "i",
              },
            },
            {
              "from.entity.name": {
                $regex: val,
                $options: "i",
              },
            },
            {
              "to.entity.name": {
                $regex: val,
                $options: "i",
              },
            },
            {
              "copied.entity.name": {
                $regex: val,
                $options: "i",
              },
            },
          ],

          $sort: {
            createdAt: -1,
          },
        },
      })
      .then(res => {
        setComplaints(res.data);
      })
      .catch(err => {
        console.log(err);
        toast.error("Something went wrong!");
      });
  };

  return (
    <Box p={2}>
      <Drawer
        anchor="right"
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        onOpen={() => setShowDrawer(true)}
      >
        <Box
          sx={{
            width: "500px",
            height: "100vh",
            overflowY: "hidden",
          }}
        >
          <ComplaintConversation closeConvo={() => setShowDrawer(false)} />
        </Box>
      </Drawer>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {loading ? (
          <Box
            sx={{
              width: "calc(100% - 31rem)",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CustomLoader />
          </Box>
        ) : (
          <Box
            sx={{
              width: "calc(100% - 31rem)",
              backgroundColor: "#f8f8f8",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              //padding: "15px 0",
              height: "calc(100vh - 100px)",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px",
              }}
            >
              <div style={{display: "flex", alignItems: "center"}}>
                {handleSearch && (
                  <div className="inner-table">
                    <FilterMenu onSearch={handleSearch} />
                  </div>
                )}

                <h2 style={{margin: "0 10px", fontSize: "0.95rem"}}>
                  Complaints
                </h2>
              </div>

              <Box
                sx={{
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Box
                  sx={{
                    width: "180px",
                  }}
                >
                  <ReactCustomSelectComponent
                    control={control}
                    name="category"
                    placeholder="Select Category"
                    options={[
                      {
                        label: "All Categories",
                        value: "All Cetegories",
                      },
                      {
                        label: "Basic Complaint",
                        value: "Basic Complaint",
                      },
                      {
                        label: "Subordinate",
                        value: "Subordinate Complaint",
                      },
                      {
                        label: "Superordinate",
                        value: "Superordinate Complaint",
                      },
                    ]}
                  />
                </Box>

                <Box
                  sx={{
                    width: "150px",
                  }}
                >
                  <ReactCustomSelectComponent
                    control={control}
                    //defaultValue="all"
                    name="complaint_type"
                    placeholder="Complaint Type"
                    options={[
                      {
                        label: "All",
                        value: "all",
                      },
                      {
                        label: "Resolved",
                        value: "resolved",
                      },
                      {
                        label: "Unresolved",
                        value: "unresolved",
                      },
                    ]}
                  />
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "calc(100% - 4rem)",
              }}
            >
              {complaints.length > 0 ? (
                <Box
                  sx={{
                    width: "100%",
                    backgroundColor: "#f8f8f8",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    padding: "15px 0",
                    height: "100%",
                    overflowY: "auto",
                  }}
                >
                  {complaints.map(complaint => {
                    return (
                      <Box
                        sx={{
                          width: "97%",
                        }}
                        key={complaint._id}
                      >
                        <EachComplaint
                          complaint={complaint}
                          showConversation={() =>
                            showComplaintConversation(complaint)
                          }
                        />
                      </Box>
                    );
                  })}
                </Box>
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    //justifyContent: "center",
                    backgroundColor: "#ffffff",
                  }}
                >
                  <img
                    src="https://cdn.dribbble.com/users/530580/screenshots/5922621/paper.gif"
                    alt=""
                    style={{
                      width: "400px",
                      height: "auto",
                      display: "block",
                      marginTop: "10vh",
                    }}
                  />
                  <Typography sx={{fontSize: "0.85rem"}}>
                    There are no complaints available yet...
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        )}

        <Box
          sx={{
            width: "30rem",
          }}
        >
          <CreateNewComplaint />
        </Box>
      </Box>
    </Box>
  );
};

export default NewComplaints;

const EachComplaint = ({complaint, showConversation}) => {
  const complaintServer = client.service("complaints");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const [user, setUser] = useState(null);

  const resolveComplaint = () => {
    showActionLoader();
    complaintServer
      .patch(complaint._id, {resolution: true})
      .then(res => {
        setState(prev => ({
          ...prev,
          ComplaintModule: {
            ...prev.ComplaintModule,
            selectedComplaint: res,
          },
        }));
        hideActionLoader();
        toast.success("Complaint Marked as Resolved");
      })
      .catch(err => {
        hideActionLoader();
        toast.error("Failed to mark Complaint as Resolved");
      });
  };

  const unResolveComplaint = () => {
    showActionLoader();
    complaintServer
      .patch(complaint._id, {resolution: false})
      .then(res => {
        hideActionLoader();
        setState(prev => ({
          ...prev,
          ComplaintModule: {
            ...prev.ComplaintModule,
            selectedComplaint: res,
          },
        }));
        toast.success("Complaint Marked as Unresolved");
      })
      .catch(err => {
        hideActionLoader();
        toast.error("Failed to mark Complaint as Unresolved");
      });
  };

  const getUser = useCallback(() => {
    //
  }, []);
  //console.log(complaint);
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        padding: "15px",
        width: "100%",
        cursor: "pointer",
        boxShadow: 3,
        borderRadius: "15px",
        // ":hover": {
        //   //backgroundColor: "#fbfefb",
        //   boxShadow: 3,
        // },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
        mb={0.8}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          gap={0.8}
        >
          <Avatar sx={{width: 48, height: 48}} />
          <Typography
            sx={{
              fontSize: "0.85rem",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            {`${complaint?.submissionby?.firstname} ${complaint?.submissionby?.lastname}`}
            <Typography
              sx={{
                color: "#1976d2",
                fontWeight: "600",
                fontSize: "0.85rem",
              }}
            >{`(${complaint.from.entity.name})`}</Typography>
          </Typography>
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: "0.75rem",
              color: "#ce4257",
            }}
          >
            {dayjs(complaint.submissiondate).format("DD/MM/YYYY")}
          </Typography>
          {complaint.resolution ? (
            <Typography
              sx={{
                fontSize: "0.85rem",
                color: "#57cc99",
                display: "flex",
                gap: "5px",
                alignItems: "center",
                fontWeight: "700",
              }}
            >
              Resolved
              <CheckCircleIcon color="#57cc99" />
            </Typography>
          ) : (
            <Typography
              sx={{
                fontSize: "0.85rem",
                color: "orange",
                display: "flex",
                gap: "5px",
                alignItems: "center",
                fontWeight: "700",
              }}
            >
              Unresolved
              <PendingIcon color="orange" />
            </Typography>
          )}
        </Box>
      </Box>

      <Box>
        <Typography
          sx={{
            color: "#1976d2",
            fontWeight: "600",
            fontSize: "0.85rem",
          }}
        >
          {complaint.subject} - {complaint.category}
        </Typography>
        <Typography
          sx={{
            fontSize: "0.8rem",
            color: "#000000",
          }}
        >
          {complaint.complaint}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          mt: 1,
        }}
      >
        <GlobalCustomButton onClick={showConversation}>
          Conversations
        </GlobalCustomButton>

        {complaint.resolution ? (
          <GlobalCustomButton color="warning" onClick={unResolveComplaint}>
            Reopen Complaint
          </GlobalCustomButton>
        ) : (
          <GlobalCustomButton color="success" onClick={resolveComplaint}>
            Resolve Complaint
          </GlobalCustomButton>
        )}
      </Box>
    </Box>
  );
};

const returnComplaintTo = (object, type) => {
  if (type === "organization") {
    return {
      type: "Organization",
      entity: {
        email: object.facilityEmail,
        name: capitalize(object.facilityName),
        entityId: object._id,
        phone: object.facilityContactPhone,
      },
    };
  } else {
    return {
      type: "Person",
      entity: {
        email: object.email,
        phone: object.phone,
        name: capitalize(`${object.firstname} ${object.lastname}`),
        entityId: object._id,
      },
    };
  }
};

const CreateNewComplaint = () => {
  const complaintServer = client.service("complaints");
  const facilityServer = client.service("facility");
  const clientServer = client.service("client");
  const {user} = useContext(UserContext);
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {register, handleSubmit, control, reset, watch} = useForm({
    defaultValues: {
      target_type: {value: "Organization", label: "Organization"},
      copied_clients: [],
      copied_organizations: [],
    },
  });
  const [selectedFac, setSelectedFac] = useState({});
  const [clear, setClear] = useState(false);
  const [clients, setClients] = useState([]);
  const [fetchingClients, setFetchingClients] = useState(false);
  const [facilities, setFacilities] = useState([]);
  const [fetchingFacilities, setFetchingFacilities] = useState(false);

  const type = watch("target_type");

  const createComplaint = async data => {
    const employee = user.currentEmployee;
    const facility = employee.facilityDetail;

    if (!data.target_type || (!data.target_organization && !data.target_client))
      return toast.warning("Please select target");

    showActionLoader();

    const target =
      data.target_type.value === "Organization"
        ? returnComplaintTo(data.target_organization, "organization")
        : returnComplaintTo(data.target_client, "person");

    const copiedOrgs = data.copied_organizations.map(item => {
      return returnComplaintTo(item, "organization");
    });

    const copiedClients = data.copied_clients.map(item => {
      return returnComplaintTo(item, "person");
    });

    const copied = [...copiedOrgs, ...copiedClients];

    const from = returnComplaintTo(facility, "organization");

    const document = {
      resolution: false,
      from: from,
      to: target,
      copied: copied,
      submissionby: employee,
      submissiondate: dayjs(),
      createdBy: employee._id,
      subject: data.subject,
      category: data.category.value,
      complaint: data.complaint,
    };

    // showActionLoader();

    // return console.log(document);

    await complaintServer
      .create(document)
      .then(res => {
        Object.keys(data).forEach(key => {
          data[key] = null;
        });
        const defaultData = {
          ...data,
          target_type: {value: "Organization", label: "Organization"},
          copied_clients: [],
          copied_organizations: [],
        };
        reset(defaultData);
        setClear(true);
        hideActionLoader();
        toast.success("Your Complaint was submitted successfully");
      })
      .catch(err => {
        hideActionLoader();
        toast.error(`There was an error submitting your Complaint ${err}`);
        console.log(err);
      });
  };

  const handleClientSearch = val => {
    if (val.length <= 3 && val.trim() === "") return;
    setFetchingClients(true);

    clientServer
      .find({
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
            {gender: val},
          ],

          "relatedfacilities.facility": user.currentEmployee.facilityDetail._id, // || "",
          $limit: 100,
          $sort: {
            createdAt: -1,
          },
        },
      })
      .then(res => {
        setFetchingClients(false);
        setClients(res.data);
        //console.log("client", res.data[0]);
      })
      .catch(err => {
        setFetchingClients(false);
        toast.error("An error occured, check your network");
      });
  };

  const handleFacilitySearch = val => {
    if (val.length <= 3 && val.trim() === "") return;
    setFetchingFacilities(true);

    facilityServer
      .find({
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
        //console.log("facility", res.data[0]);
      })
      .catch(err => {
        console.log(err);
        setFetchingFacilities(false);
        toast.error("An error occured, check your network");
      });
  };

  return (
    <Box
      sx={{
        width: "100%",
        //border: "1px solid #2e2e2e",
        padding: "20px 10px",
        backgroundColor: "#f8f8f8",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
        mb={4}
      >
        <FormsHeaderText text="Add a New Complaint" />
      </Box>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={12}>
          <ReactCustomSelectComponent
            control={control}
            //defaultValue="Organization"
            name="target_type"
            placeholder="Complaint Type"
            options={[
              {
                label: "Organization",
                value: "Organization",
              },
              {
                label: "Person",
                value: "Person",
              },
            ]}
          />
        </Grid>

        {type.value === "Organization" && (
          <Grid item xs={12}>
            <ReactCustomSearchSelectComponent
              control={control}
              onInputChange={handleFacilitySearch}
              isLoading={fetchingFacilities}
              name="target_organization"
              placeholder="Target Organization"
              options={facilities.map(item => {
                return {
                  label: item.facilityName,
                  value: item._id,
                  ...item,
                };
              })}
            />
          </Grid>
        )}

        {type.value === "Person" && (
          <Grid item xs={12}>
            <ReactCustomSearchSelectComponent
              control={control}
              onInputChange={handleClientSearch}
              isLoading={fetchingClients}
              name="target_client"
              placeholder="Target Client"
              options={clients.map(item => {
                return {
                  label: `${item.firstname} ${item.lastname}`,
                  value: item._id,
                  ...item,
                };
              })}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <ReactCustomSearchSelectComponent
            control={control}
            multiple
            onInputChange={handleFacilitySearch}
            isLoading={fetchingFacilities}
            name="copied_organizations"
            placeholder="Copy Involved Organizations"
            options={facilities.map(item => {
              return {
                label: item.facilityName,
                value: item._id,
                ...item,
              };
            })}
          />
        </Grid>

        <Grid item xs={12}>
          <ReactCustomSearchSelectComponent
            control={control}
            onInputChange={handleClientSearch}
            isLoading={fetchingClients}
            name="copied_clients"
            multiple
            placeholder="Copy Involved Clients"
            options={clients.map(item => {
              return {
                label: `${item.firstname} ${item.lastname}`,
                value: item._id,
                ...item,
              };
            })}
          />
        </Grid>

        <Grid item xs={12}>
          <Input label="Subject" register={register("subject")} />
        </Grid>

        <Grid item xs={12}>
          <ReactCustomSelectComponent
            control={control}
            name="category"
            placeholder="Select Category"
            options={[
              {
                label: "Basic Complaint",
                value: "Basic Complaint",
              },
              {
                label: "Subordinate Complaint",
                value: "Subordinate Complaint",
              },
              {
                label: "Superordinate Complaint",
                value: "Superordinate Complaint",
              },
            ]}
          />
        </Grid>

        <Grid item xs={12}>
          <Textarea
            label="Complaint"
            placeholder="write here..."
            register={register("complaint", {
              required: "Please enter complaint",
            })}
          />
        </Grid>
      </Grid>

      <Box>
        <GlobalCustomButton
          sx={{
            width: "100%",
          }}
          onClick={handleSubmit(createComplaint)}
        >
          Submit Complaint
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};
