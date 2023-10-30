/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import {Box, Grid, Button as MuiButton} from "@mui/material";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import {useParams} from "react-router-dom";

import {UserContext, ObjectContext} from "../../context";

import PreAuthListComponent from "./components/preauth/PreAuthList";
import PreAuthCreateComponent from "./components/preauth/PreAuthCreate";
import PreAuthDetailComponent from "./components/preauth/PreAuthDetail";

export default function Preauthorization({standAlone}) {
  const {state, setState} = useContext(ObjectContext);
  const [view, setView] = useState("list");

  const {client_id} = useParams();

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
          <PreAuthListComponent
            showCreate={() => setView("create")}
            showDetail={() => setView("detail")}
            /* client_id={client_id} */
          />
        </Box>
      )}

      {view === "create" && (
        <Box>
          <PreAuthCreateComponent
            handleGoBack={handleGoBack}
            showCreate={() => setView("create")}
            showDetail={() => setView("detail")}
            client_id={client_id}
          />
        </Box>
      )}

      {view === "detail" && (
        <Box>
          <PreAuthDetailComponent
            handleGoBack={handleGoBack}
            showCreate={() => setView("create")}
            showDetail={() => setView("detail")}
            client_id={client_id}
          />
        </Box>
      )}
    </Box>
  );
}

export const PreAuthorizationList = () => {
  return (
    <Box>
      <h1>Hello World</h1>
    </Box>
  );
};
