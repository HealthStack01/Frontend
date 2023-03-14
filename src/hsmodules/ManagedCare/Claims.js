/* eslint-disable */
<<<<<<< HEAD
import React, {useState, useContext, useEffect, useRef} from "react";
import {Box, Grid, Button as MuiButton} from "@mui/material";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import {UserContext, ObjectContext} from "../../context";
=======
import React, { useState, useContext, useEffect, useRef } from "react";
import { Box, Grid, Button as MuiButton } from "@mui/material";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import { UserContext, ObjectContext } from "../../context";
>>>>>>> 6629424bb56c5124204d6f95a047225340175196

import ClaimsListComponent from "./components/claims/ClaimsList";
import ClaimCreateComponent from "./components/claims/ClaimsCreate";
import ClaimDetailComponent from "./components/claims/ClaimsDetail";

// eslint-disable-next-line
const searchfacility = {};

<<<<<<< HEAD
export default function Claims({standAlone}) {
  const {state, setState} = useContext(ObjectContext);
=======
export default function Claims({ standAlone }) {
  const { state, setState } = useContext(ObjectContext);
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
  const [view, setView] = useState("list");

  const handleGoBack = () => {
    setView("list");
<<<<<<< HEAD
    setState(prev => ({
=======
    setState((prev) => ({
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
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
          />
        </Box>
      )}

      {view === "create" && (
        <Box>
          <ClaimCreateComponent
            handleGoBack={handleGoBack}
            showCreate={() => setView("create")}
            showDetail={() => setView("detail")}
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
