import {useState, useContext, useCallback, useEffect} from "react";
import {Box, Button, Grid, Typography} from "@mui/material";
import client from "../../feathers";
import {UserContext, ObjectContext} from "../../context";
import CustomTable from "../customtable";

const SelectDefaultConfigEmail = () => {
  const facilityConfigServer = client.service("facility-config");
  const {user} = useContext(UserContext);
  const {state, setState} = useContext(ObjectContext);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFacilities = async () => {
    setLoading(true);
    if (user.currentEmployee) {
      const findConfig = await facilityConfigServer.find({
        query: {
          organizationId: user.currentEmployee.facilityDetail._id,
          $limit: 200,
          $sort: {
            createdAt: -1,
          },
        },
      });

      await setFacilities(findConfig.data);
      setLoading(false);
    } else {
      if (user.stacker) {
        const findConfig = await facilityConfigServer.find({
          query: {
            $limit: 100,
            $sort: {
              facility: -1,
            },
          },
        });

        await setFacilities(findConfig.data);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (user) {
      getFacilities();
    } else {
      return;
    }
    facilityConfigServer.on("created", obj => getFacilities());
    facilityConfigServer.on("updated", obj => getFacilities());
    facilityConfigServer.on("patched", obj => {
      getFacilities();
    });
    facilityConfigServer.on("removed", obj => getFacilities());
    return () => {};
  }, []);

  const handleRow = data => {
    setState(prev => ({
      ...prev,
      CommunicationModule: {
        ...prev.CommunicationModule,
        defaultEmail: data,
        configEmailModal: false,
      },
    }));
    //selectEmail(data.emailConfig.username);
  };

  const columns = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row, i) => i + 1,
      sortable: true,
      inputType: "HIDDEN",
      width: "60px",
    },
    {
      name: "Username",
      key: "sn",
      description: "Enter name of Company",
      selector: row => (
        <Typography
          sx={{fontSize: "0.8rem", whiteSpace: "normal"}}
          data-tag="allowRowEvents"
        >
          {row?.emailConfig?.username}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      style: {
        color: "#1976d2",
        textTransform: "capitalize",
      },
    },
    {
      name: "Server",
      key: "emailConfig",
      description: "SN",
      selector: (row, i) => row.emailConfig.server,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "SMTP",
      key: "emailConfig",
      description: "SN",
      selector: (row, i) => row.emailConfig.smtp,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Security",
      key: "emailConfig",
      description: "SN",
      selector: (row, i) =>
        row.emailConfig.security ? "Has Security" : "No Security",
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Description/Note",
      key: "emailConfig",
      description: "SN",
      selector: (row, i) => row.emailConfig.note,
      sortable: true,
      inputType: "HIDDEN",
    },
  ];

  return (
    <Box sx={{width: "85vw"}}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <CustomTable
          title={""}
          columns={columns}
          data={facilities}
          pointerOnHover
          highlightOnHover
          striped
          onRowClicked={handleRow}
          progressPending={loading}
        />
      </Box>
    </Box>
  );
};

export default SelectDefaultConfigEmail;
