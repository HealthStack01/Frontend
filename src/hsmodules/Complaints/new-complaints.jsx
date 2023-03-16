import {useState, useCallback, useContext, useEffect} from "react";
import {Avatar, Box, Button, Grid, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import Drawer from "@mui/material/Drawer";

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

const NewComplaints = () => {
  const complaintServer = client.service("complaints");
  const {user} = useContext(UserContext);
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  //const complaints = [1, 2, 3, 4, 5, 6];

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
    const res = await complaintServer.find({
      query: {
        $sort: {
          submissiondate: -1,
        },
        // facilityId: facId,
      },
    });
    console.log(res.data);
    await setComplaints(res.data);
    setLoading(false);
  }, []);

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

    await setComplaints(res.data);
    hideActionLoader();
  }, []);

  useEffect(() => {
    complaintServer.on("created", obj => updateComplaints());
    complaintServer.on("updated", obj => updateComplaints());
    complaintServer.on("patched", obj => updateComplaints());
    complaintServer.on("removed", obj => updateComplaints());
  }, []);

  useEffect(() => {
    getComplaints();
  }, [getComplaints]);

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
                      width: "90%",
                    }}
                    onClick={() => showComplaintConversation(complaint)}
                    key={complaint._id}
                  >
                    <EachComplaint complaint={complaint} />
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

const EachComplaint = ({complaint}) => {
  const [user, setUser] = useState(null);

  const getUser = useCallback(() => {
    //
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        padding: "15px",
        width: "100%",
        cursor: "pointer",
        ":hover": {
          //backgroundColor: "#fbfefb",
          boxShadow: 3,
        },
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
            }}
          >
            {complaint.submissionby}
          </Typography>
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: "0.75rem",
              color: "#ee6c4d",
            }}
          >
            {dayjs(complaint.submissiondate).format("DD/MM/YYYY")}
          </Typography>
          <Typography
            sx={{
              fontSize: "0.85rem",
            }}
          >
            Pending
          </Typography>
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
    </Box>
  );
};

const CreateNewComplaint = () => {
  const complaintServer = client.service("complaints");
  const {user} = useContext(UserContext);
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {register, handleSubmit, control, reset} = useForm();
  const [selectedFac, setSelectedFac] = useState({});
  const [clear, setClear] = useState(false);

  const getSearchedFacility = fac => {
    setSelectedFac(fac);
  };

  const createComplaint = async data => {
    //return console.log(data);
    showActionLoader();
    const employee = user.currentEmployee;

    const document = {
      ...data,
      submissiondate: dayjs(),
      //submissionby: employee._id,
      submissionby: `${employee.firstname} ${employee.lastname}`,
    };

    await complaintServer
      .create(document)
      .then(res => {
        Object.keys(data).forEach(key => {
          data[key] = null;
        });
        reset(data);
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
          <FacilitySearch
            getSearchfacility={getSearchedFacility}
            clear={clear}
          />
        </Grid>

        <Grid item xs={12}>
          <Input label="Subject" register={register("subject")} />
        </Grid>

        <Grid item xs={12}>
          <CustomSelect
            options={["Category 1", "Category 2", "Category 3"]}
            label="Category"
            name="category"
            required
            control={control}
          />
        </Grid>

        <Grid item xs={12}>
          <Textarea
            label="Complaint"
            placeholder="write here..."
            register={register("complaint")}
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
