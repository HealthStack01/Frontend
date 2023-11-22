import {useState, useCallback, useContext, useEffect} from "react";
import ComplaintConversation from "../../hsmodules/Complaints/ComplaintConversation";
import client from "../../feathers";
import {ObjectContext} from "../../context";
import {toast} from "react-toastify";
import Slide from "@mui/material/Slide";
import {Typography} from "@mui/material";

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
      Fetching complaint's data
    </Typography>
  </div>
);

const GlobalComplaintResponse = () => {
  const complaintServer = client.service("complaints");
  const {state, setState} = useContext(ObjectContext);
  const [fetching, setFetching] = useState(false);

  const complaintId = state.ComplaintModule.complaintId;

  const updateComplaint = complaint => {
    setState(prev => ({
      ...prev,
      ComplaintModule: {
        ...prev.ComplaintModule,
        selectedComplaint: complaint,
      },
    }));
  };

  const closeResponse = () => {
    setState(prev => ({
      ...prev,
      ComplaintModule: {
        ...prev.ComplaintModule,
        response: false,
      },
    }));
  };

  const getComplaintById = useCallback(async () => {
    setFetching(true);
    await complaintServer
      .get(complaintId)
      .then(resp => {
        updateComplaint(resp);
        // console.log(resp);
        setFetching(false);
      })
      .catch(err => {
        setFetching(false);
        toast.error("Something went wrong!");
      });
  }, []);

  useEffect(() => {
    getComplaintById();
  }, [getComplaintById]);

  return (
    <Slide
      mountOnEnter
      unmountOnExit
      in={state.ComplaintModule.response}
      direction="left"
    >
      <div
        style={{
          width: "33rem",
          position: "fixed",
          right: 0,
          bottom: 0,
          background: "#fffff",
          zIndex: "999999",
        }}
      >
        {fetching ? (
          <div
            style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#ffffff",
            }}
          >
            <CustomLoader />
          </div>
        ) : (
          <ComplaintConversation closeConvo={closeResponse} />
        )}
      </div>
    </Slide>
  );
};

export default GlobalComplaintResponse;
