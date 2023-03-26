/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import {Box, Grid, Button as MuiButton} from "@mui/material";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import {UserContext, ObjectContext} from "../../context";
import {useParams} from "react-router-dom";

import ClaimsListComponent from "./components/claims/ClaimsList";
import ClaimCreateComponent from "./components/claims/ClaimsCreate";
import ClaimDetailComponent from "./components/claims/ClaimsDetail";

// eslint-disable-next-line
const searchfacility = {};

export default function Claims({standAlone}) {
  const {state, setState} = useContext(ObjectContext);
  const [view, setView] = useState("list");

  const {client_id} = useParams();

  console.log(client_id);

  const handleGoBack = () => {
    setView("list");
    setState(prev => ({
      ...prev,
      ClientModule: {
        ...prev.ClientModule,
        selectedClient: {},
      },
    }));
  };

  return (
    <Box>
      {view === "list" && (
        <Box>
          <ClaimsListComponent
            showCreate={() => setView("create")}
            showDetail={() => setView("detail")}
            client_id={client_id}
          />
        </Box>
      )}

      {view === "create" && (
        <Box>
          <ClaimCreateComponent
            handleGoBack={handleGoBack}
            showCreate={() => setView("create")}
            showDetail={() => setView("detail")}
            client_id={client_id}
          />
        </Box>
      )}

      {view === "detail" && (
        <Box>
          <ClaimDetailComponent
            handleGoBack={handleGoBack}
            showCreate={() => setView("create")}
            showDetail={() => setView("detail")}
          />
        </Box>
      )}
    </Box>
  );
}
