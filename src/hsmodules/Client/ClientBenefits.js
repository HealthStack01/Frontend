import React, {useState, useContext, useEffect, useRef} from "react";
import "./styles/index.scss";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { Box, Grid, IconButton, Typography } from "@mui/material";
/* import { format } from "date-fns"; */

import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
/* import { toast } from "react-toastify";
import GlobalCustomButton from "../../components/buttons/CustomButton"; */
import CustomTable from "../../components/customtable";
/* import Input from "../../components/inputs/basic/Input";
import PlainInput from "../../components/inputs/basic/Input/plainInput";
import CustomSelect from "../../components/inputs/basic/Select";
import ModalBox from "../../components/modal"; */
import { FormsHeaderText } from "../../components/texts";
import FilterMenu from "../../components/utilities/FilterMenu";
import { ObjectContext, UserContext } from "../../context";
import client from "../../feathers";
/* import { TableMenu } from "../../ui/styled/global";
import { PageWrapper } from "../../ui/styled/styles";
import {
  SearchCategory,
  SearchCategory2,
  SelectBand,
} from "../helpers/FacilitySearch";

import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import SecurityUpdateIcon from "@mui/icons-material/SecurityUpdate";
import BadgeIcon from "@mui/icons-material/Badge";
import CustomConfirmationDialog from "../../components/confirm-dialog/confirm-dialog"; */

export default function ClientBenefits({closeModal}) {
    
   
   
  
    const { register, handleSubmit, setValue, reset, errors } = useForm(); //watch, errors,
    
    const EmployeeServ = client.service("employee");
    const HealthPlanServ = client.service("healthplan");
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [confirmDialogForPremium, setConfirmDialogForPremium] = useState(false);
    //const history = useHistory()
    // eslint-disable-next-line
    const { user } = useContext(UserContext);
    const { state, setState, showActionLoader, hideActionLoader } =
      useContext(ObjectContext);
   
    const [benefits, setBenefits] = useState();
    const [selectedPlan, setSelectedPlan] = useState();
   
 
    const plan=state.PolicyModule.selectedPolicy.plan

    const productItemSchema = [
        {
          name: "S/N",
          key: "sn",
          description: "S/N",
          selector: (row, i) => i + 1,
          sortable: true,
          required: true,
          inputType: "HIDDEN",
          width: "50px",
        },
        {
          name: "Category",
          key: "category",
          description: "Category",
          selector: (row) => (
            <Typography
              sx={{ fontSize: "0.75rem", whiteSpace: "normal" }}
              data-tag="allowRowEvents"
            >
              {row?.category}
            </Typography>
          ),
          sortable: true,
          required: true,
          inputType: "TEXT",
        },
        {
          name: "Description",
          key: "comment",
          description: "Description",
          selector: (row) => (
            <Typography
              sx={{ fontSize: "0.75rem", whiteSpace: "normal" }}
              data-tag="allowRowEvents"
            >
              {row?.comments}
            </Typography>
          ),
          sortable: true,
          required: true,
          inputType: "TEXT",
        },
        // {
        //   name: "Plan",
        //   key: "plan",
        //   description: "Plan",
        //   selector: (row) => (
        //     <Typography
        //       sx={{ fontSize: "0.8rem", whiteSpace: "normal" }}
        //       data-tag="allowRowEvents"
        //     >
        //       <b>Capitation?</b>: {row?.plans?.capitation === true ? "Yes" : "No"}
        //       <br />
        //       <b>Free for Service?</b>:
        //       {row?.plans?.feeforService === true ? "Yes" : "No"}
        //       <br />
        //       <b>PreAuth?</b>: {row?.plans?.reqAuthCode === true ? "Yes" : "No"}
        //       <br />
        //       <b>Co-Pay</b>:{" "}
        //       {row?.plans?.copay !== "" ? `₦${row?.plans?.copay}` : "N/A"}
        //     </Typography>
        //   ),
        //   sortable: true,
        //   required: true,
        //   inputType: "TEXT",
        // },
        // {
        //   name: "Band",
        //   key: "band",
        //   description: "Band",
        //   selector: (row) =>
        //     row?.band.map((band, i) => (
        //       <Typography
        //         key={i}
        //         sx={{ fontSize: "0.8rem", whiteSpace: "normal" }}
        //         data-tag="allowRowEvents"
        //       >
        //         {band}
        //       </Typography>
        //     )),
        //   sortable: true,
        //   required: true,
        //   inputType: "TEXT",
        // },
        {
          name: "Duration",
          key: "duration",
          description: "Duration",
          selector: (row) => (
            <Typography
              sx={{ fontSize: "0.75rem", whiteSpace: "normal" }}
              data-tag="allowRowEvents"
            >
              {`${row?.duration} ${row?.durationType}`}
            </Typography>
          ),
          sortable: true,
          required: true,
          inputType: "TEXT",
        },
        {
          name: "Frequency",
          key: "frequency",
          description: "Frequency",
          selector: (row) => (
            <Typography
              sx={{ fontSize: "0.75rem", whiteSpace: "normal" }}
              data-tag="allowRowEvents"
            >
              {row?.frequency}
            </Typography>
          ),
          sortable: true,
          required: true,
          inputType: "TEXT",
        },
        {
          name: "Limit",
          key: "limit",
          description: "Limit",
          selector: (row) => (
            <Typography
              sx={{ fontSize: "0.75rem", whiteSpace: "normal" }}
              data-tag="allowRowEvents"
            >
              ₦{row?.limit}
            </Typography>
          ),
          sortable: true,
          required: true,
          inputType: "TEXT",
        },
        {
          name: "Status",
          key: "status",
          description: "Status",
          selector: (row) => (
            <Typography
              sx={{ fontSize: "0.75rem", whiteSpace: "normal" }}
              data-tag="allowRowEvents"
            >
              {row?.status}
            </Typography>
          ),
          sortable: true,
          required: true,
          inputType: "TEXT",
        },
        //  {
        //    name: 'Amount',
        //    key: 'price',
        //    description: 'Amount',
        //    selector: (row) => row?.price,
        //    sortable: true,
        //    required: true,
        //    inputType: 'TEXT',
        //  },
        {
          name: "Billing type",
          key: "billingtype",
          description: "Billing type",
          selector: (row) => row?.billing_type,
          sortable: true,
          required: true,
          inputType: "TEXT",
        },
      /*   {
          name: "Action",
          key: "Action",
          description: "Action",
          selector: (row, i) => (
            <IconButton
              onClick={() => {
                setBenefitSN(i);
                // console.log("click", row);
                setConfirmDialog(true);
              }}
              color="error"
            >
              <DeleteOutline fontSize="small" />
            </IconButton>
          ),
          sortable: false,
          required: false,
          inputType: "TEXT",
        }, */
      ];


    const getFacilities = async () => {
        
          console.log(plan)
          console.log(state.PolicyModule.selectedPolicy)
    
          const findHealthPlan = await HealthPlanServ.get(plan._id);
    
          await console.log("HealthPlan", findHealthPlan);
   
          await setSelectedPlan(findHealthPlan)
          await setBenefits(findHealthPlan.benefits)  
      };

      useEffect(() => {
      
        getFacilities();
      
    
        return () => {};
      }, []);
    


    return (
     <>
      <div
        className="card"
        style={{
            height: "88vh",
            overflowY: "scroll",
            width: "98%",
            margin: "0 auto",
        }}
          >

        <div
          style={{
            width: "100%",
            height: "auto",
            overflow: "auto",
            marginTop: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <FormsHeaderText text={`${selectedPlan?.organizationName} ${selectedPlan?.planName} Plan Benefits List`} />
         <p>Family Limit:{selectedPlan?.familyLimit}</p>
         <p>Individual Limit:{selectedPlan?.individualLimit}</p>
          </Box>

          <Box
            sx={{
              width: "100%",
              height: "auto",
            }}
          >
            <CustomTable
              tableData={""}
              columns={productItemSchema}
              data={benefits}
              pointerOnHover
              highlightOnHover
              striped
            />
          </Box>
        </div>
      </div>
    </> 
  
     );
}
