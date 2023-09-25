import {Box} from "@mui/material";
import {useState} from "react";

import ProvidersPaymentList from "./PaymentsList";
import ClaimDetailComponent from "../components/claims/ClaimsDetail";

const ManagedCareProviderPayment = () => {
  const [view, setView] = useState("lists");

  return (
    <Box p={2}>
      {view === "lists" && (
        <>
          <ProvidersPaymentList
            showClaimsDetail={() => setView("claims-details")}
          />
        </>
      )}

      {view === "claims-details" && (
        <>
          <ClaimDetailComponent handleGoBack={() => setView("lists")} />
        </>
      )}
    </Box>
  );
};

export default ManagedCareProviderPayment;
