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

const NewComplaints = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const complaints = [1, 2, 3, 4, 5, 6];

  const showComplaintConversation = complaint => {
    setShowDrawer(true);
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
          <ComplaintConversation />
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
            padding: "15px 0",
            height: "calc(100vh - 100px)",
            overflowY: "auto",
          }}
        >
          {complaints.map(complaint => {
            return (
              <Box
                sx={{
                  width: "90%",
                }}
                onClick={showComplaintConversation}
                key={complaint}
              >
                <EachComplaint />
              </Box>
            );
          })}
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

const EachComplaint = () => {
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
            John Doe
          </Typography>
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: "0.75rem",
              color: "#ee6c4d",
            }}
          >
            11/12/2022
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
          Subject of the Complaint - Provider
        </Typography>
        <Typography
          sx={{
            fontSize: "0.8rem",
            color: "#000000",
          }}
        >
          Lorem ipsum dolor sit amet. Sed quos sint ut neque iure sit corrupti
          fuga est magnam quaerat id veritatis tempora? Cum dolor quaerat non
          deleniti voluptatem non dolores culpa. 33 sint eligendi sit dolorem
          obcaecati id quia illum non Quis sint?
        </Typography>
      </Box>
    </Box>
  );
};

const CreateNewComplaint = () => {
  const {register, handleSubmit, control} = useForm();

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
          <FacilitySearch />
        </Grid>

        <Grid item xs={12}>
          <Input label="Subject" register={register("subjext")} />
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
          <Textarea />
        </Grid>
      </Grid>

      <Box>
        <GlobalCustomButton
          sx={{
            width: "100%",
          }}
        >
          Submit Complaint
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};
