import React, { useState, useContext, useEffect, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ModalBox from "../../../../components/modal";
import ModalHeader from "../../../Appointment/ui-components/Heading/modalHeader";
import { Grid, Box, Typography, Drawer } from "@mui/material";
import { McText } from "../../text";
import Textarea from "../../../../components/inputs/basic/Textarea";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import { FormsHeaderText } from "../../../../components/texts";
import ChatInterface from "../../../../components/chat/ChatInterface";
import CRMTasks from "../../../CRM/Tasks";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PatientProfile from "../../../Client/PatientProfile";
import ReferralTask from "../../Tasks";
import ReferralStatus from "./ReferralStatus";
import client from "../../../../feathers";
import { ObjectContext, UserContext } from "../../../../context";

export function ReferralDetails({ handleGoBack }) {
  const ReferralServer = client.service("preauth");
  const { state, setState, showActionLoader, hideActionLoader } =
    useContext(ObjectContext);
  const [chat, setChat] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [view, setView] = useState("detail");
  let taskState = [];

  return (
    <>
      <Box
        style={{
          margin: "0 auto",
          width: "98%",
          height: "calc(100vh - 90px)",
          overflow: "scroll",
        }}
      >
        <ModalBox
          open={statusModal}
          onClose={() => setStatusModal(false)}
          header="Update Preauthorization Status"
        >
          <ReferralStatus closeModal={() => setStatusModal(false)} />
        </ModalBox>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            borderBottom: "1px solid #f8f8f8",
            backgroundColor: "#f8f8f8",
            position: "sticky",
            zIndex: 99,
            top: 0,
            left: 0,
          }}
          mb={2}
          p={2}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
            gap={1}
          >
            <GlobalCustomButton onClick={handleGoBack}>
              <ArrowBackIcon sx={{ marginRight: "3px" }} fontSize="small" />
              Back
            </GlobalCustomButton>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  fontWeight: "600",
                }}
              >
                Referral Detail
              </Typography>
              <FormsHeaderText text={"- 13322BA"} />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
            gap={1}
          >
            <GlobalCustomButton color="info" onClick={() => setView("detail")}>
              <AddBoxIcon sx={{ marginRight: "3px" }} fontSize="small" />
              Details
            </GlobalCustomButton>

            <GlobalCustomButton
              color="warning"
              onClick={() => setView("tasks")}
            >
              <AddBoxIcon sx={{ marginRight: "3px" }} fontSize="small" />
              Tasks
            </GlobalCustomButton>

            <GlobalCustomButton
              onClick={() => setChat(true)}
              sx={{
                backgroundColor: "#606c38",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#606c38",
                },
              }}
            >
              <AddBoxIcon sx={{ marginRight: "3px" }} fontSize="small" />
              Chat
            </GlobalCustomButton>

            <GlobalCustomButton
              color="success"
              onClick={() => setStatusModal(true)}
            >
              <AddBoxIcon sx={{ marginRight: "3px" }} fontSize="small" />
              Change Status
            </GlobalCustomButton>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
          pr={2}
          pl={2}
        >
           <Box
              sx={{
                width: "25rem",
              }}
            >
              <PatientProfile />
            </Box>
          <Box
            sx={{
              width: "calc(70% - 26rem)",
            }}
          >
          
              {view === "tasks" && (
                <ReferralTask
                  taskServer={ReferralServer}
                  taskState={taskState}
                />
              )}
          </Box>

          {view === "detail" && (
            <div
              style={{
                marginTop: "10px",
                border: "1px solid #8F8F8F",
                padding: "1rem",
              }}
            >
              <p>Request Sent 08/05/2022 9:45pm</p>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <p>Beneficiary Name: John Doe </p>
                </Grid>
                <Grid item xs={6}>
                  <p>Referring Facility Facility: Ogun State Clinic </p>
                </Grid>
                <Grid item xs={6}>
                  <p>Destination Facility: Lagos State Clinic </p>
                </Grid>
                <Grid item xs={6}>
                  <p>Health Plan: Former sector plan</p>
                </Grid>
                <Grid item xs={6}>
                  <p>Date of Admission: 23/06/2022</p>
                </Grid>
                <Grid item xs={6}>
                  <p>Date of Discharge: 23/06/2022</p>
                </Grid>
                <Grid item xs={6}>
                  <p>Capitation: Filed</p>
                </Grid>
                <Grid item xs={6}>
                  <p>Fee for Service: Applicable</p>
                </Grid>
              </Grid>
              <FormsHeaderText text={"Referral Code - 13322BA"} />
              <McText txt={"Clinical Information"} />
              <Grid container spacing={2} mb={1}>
                <Grid item xs={12}>
                  <p style={{ fontWeight: "bold" }}>Presenting Complaints:</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt
                  </p>
                </Grid>
              </Grid>

              <FormsHeaderText text={"Clinical Findings"} />
              <Grid container spacing={2} mb={1}>
                <Grid item xs={12}>
                  <p style={{ fontWeight: "bold" }}>Provisional Diagonosis:</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt
                  </p>

                  <p style={{ fontWeight: "bold" }}>
                    Planned Procedures / Services Requiring Authorization:
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt
                  </p>
                  <p style={{ fontWeight: "bold" }}>
                    Planned Procedures / Services Requiring Authorization:
                  </p>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <p style={{ fontWeight: "bold" }}>Reason for Request:</p>
                  <span
                    style={{
                      fontWeight: "bold",
                      backgroundColor: "#ECF3FF",
                      color: "#0364FF",
                      padding: ".3rem",
                      marginRight: "1rem",
                    }}
                  >
                    Procedure
                  </span>
                  <span
                    style={{
                      fontWeight: "bold",
                      backgroundColor: "#ECF3FF",
                      color: "#0364FF",
                      padding: ".3rem",
                    }}
                  >
                    Services
                  </span>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <p style={{ fontWeight: "bold" }}>Physician Name:</p>
                  <p>Dr. John Doe</p>
                  <p>Lagos State Hospital</p>
                </Grid>
              </Grid>
            </div>
          )}
        </Box>
      </Box>
      <Drawer
        anchor="right"
        open={chat}
        onClose={() => setChat(false)}
        onOpen={() => setChat(true)}
      >
        <Box
          sx={{
            width: "500px",
            height: "100vh",
            overflowY: "hidden",
          }}
        >
          {chat && <ChatInterface closeChat={() => setChat(false)} />}
        </Box>
      </Drawer>
    </>
  );
}
