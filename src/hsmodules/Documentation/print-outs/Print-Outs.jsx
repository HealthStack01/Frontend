import {
  forwardRef,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Avatar, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { formatDistanceToNowStrict, format } from "date-fns";
import client from "../../../feathers";

import CustomTable from "../../../components/customtable";
import { ObjectContext } from "../../../context";
import dayjs from "dayjs";
import { StyledWatermark } from "./Watermark";

const customStyles = {
  rows: {
    style: {
      minHeight: "30px", // override the row height
      "&:not(:last-of-type)": {
        borderBottomWidth: "0px",
      },
      padding: "0.15rem",
      backgroundColor: "##F8F8F8",
    },
  },
  headRow: {
    style: {
      borderBottomWidth: "0px",
      padding: "0.15rem",
      backgroundColor: "#F8F8F8",
      fontSize: "0.67rem",
    },
  },
  headCells: {
    style: {
      padding: "0.15rem",
      paddingLeft: "0.25rem", // override the cell padding for head cells
      paddingRight: "0.25rem",
      paddingTop: "0.1rem",
      paddingBottom: "0.1rem",
      fontSize: "0.7rem",
      fontWeight: "bold",
      color: "#000000",
    },
  },
  cells: {
    style: {
      paddingLeft: "0.25rem", // override the cell padding for data cells
      paddingRight: "0.25rem",
      paddingTop: "0.1rem",
      paddingBottom: "0.1rem",
      fontSize: "0.69rem",
      color: "#000000",
      fontWeight: "400",
    },
  },
};

export const PrintOutFixedInformation = ({ Clinic }) => {
  const { state, setState } = useContext(ObjectContext);
  const [facility, setFacility] = useState({});

  const facilityServ = client.service("facility");

  const patient = state.ClientModule.selectedClient;

  const facilityId = Clinic.facility;

  const getFacilityDetail = useCallback(() => {
    facilityServ
      .get(facilityId)
      .then((data) => {
        setFacility(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [facilityId]);

  useEffect(() => {
    getFacilityDetail();
  }, [getFacilityDetail]);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box
        sx={{
          width: "100%",
          //marginLeft: "2.5%",

          height: "35px",
          backgroundColor: "#000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "7.5px",
        }}
      >
        <Typography
          sx={{
            color: "#ffffff",
            fontSize: "0.75rem",
            textTransform: "uppercase",
          }}
        >
          {Clinic?.documentname}
        </Typography>
      </Box>

      <Avatar sx={{ marginTop: "5px" }} src={facility?.facilitylogo} alt="" />

      <Box>
        <Typography sx={{ fontSize: "0.75rem", color: "#000000" }}>
          {facility?.facilityName},
        </Typography>

        <Typography sx={{ fontSize: "0.75rem", color: "#000000" }}>
          {facility?.facilityAddress},
        </Typography>
        <Typography sx={{ fontSize: "0.75rem", color: "#000000" }}>
          {facility?.facilityCity},
        </Typography>
        <Typography sx={{ fontSize: "0.75rem", color: "#000000" }}>
          {facility?.facilityEmail}, {facility?.facilityContactPhone}.
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          marginTop: "15px",
          height: "35px",
          backgroundColor: "#2b2d42",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "7.5px",
        }}
      >
        <Typography sx={{ color: "#ffffff", fontSize: "0.75rem" }}>
          PATIENT INFORMATION
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          marginTop: "15px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#03045e",
                  marginRight: "5px",
                }}
              >
                First Name:
              </Typography>

              <Typography sx={{ fontSize: "0.75rem", color: "#000000" }}>
                {patient?.firstname}
              </Typography>
            </Box>
          </Grid>

          {patient?.middlename && (
            <Grid item xs={4}>
              <Box sx={{ display: "flex" }}>
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    color: "#03045e",
                    marginRight: "5px",
                  }}
                >
                  Middle Name:
                </Typography>

                <Typography sx={{ fontSize: "0.75rem", color: "#000000" }}>
                  {patient.middlename}
                </Typography>
              </Box>
            </Grid>
          )}

          <Grid item xs={4}>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#03045e",
                  marginRight: "5px",
                }}
              >
                Last Name:
              </Typography>

              <Typography sx={{ fontSize: "0.75rem", color: "#000000" }}>
                {patient.lastname}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#03045e",
                  marginRight: "5px",
                }}
              >
                Sex:
              </Typography>

              <Typography sx={{ fontSize: "0.75rem", color: "#000000" }}>
                {patient?.sex ? patient.sex : "______________"}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#03045e",
                  marginRight: "5px",
                }}
              >
                ID Number:
              </Typography>

              <Typography sx={{ fontSize: "0.75rem", color: "#000000" }}>
                007
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#03045e",
                  marginRight: "5px",
                }}
              >
                Age:
              </Typography>

              <Typography sx={{ fontSize: "0.75rem", color: "#000000" }}>
                {patient?.dob
                  ? formatDistanceToNowStrict(new Date(patient.dob))
                  : "____________"}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#03045e",
                  marginRight: "5px",
                }}
              >
                Phone:
              </Typography>

              <Typography sx={{ fontSize: "0.75rem", color: "#000000" }}>
                {patient?.phone}
              </Typography>
            </Box>
          </Grid>

          {patient?.email && (
            <Grid item xs={4}>
              <Box sx={{ display: "flex" }}>
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    color: "#03045e",
                    marginRight: "5px",
                  }}
                >
                  Email:
                </Typography>

                <Typography sx={{ fontSize: "0.75rem", color: "#000000" }}>
                  {patient?.email}
                </Typography>
              </Box>
            </Grid>
          )}

          <Grid item xs={12}>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#03045e",
                  marginRight: "5px",
                }}
              >
                Address:
              </Typography>

              <Typography sx={{ fontSize: "0.75rem", color: "#000000" }}>
                {patient.address}
                {patient.address && ","} {patient.city}
                {patient.city && ","} {patient.state}
                {patient.state && ","} {patient.country}.
              </Typography>
            </Box>
          </Grid>

          {/* {patient.city && (
            <Grid item xs={4}>
              <Box sx={{display: "flex"}}>
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    color: "#03045e",
                    marginRight: "5px",
                  }}
                >
                  City:
                </Typography>

                <Typography sx={{fontSize: "0.75rem", color: "#000000"}}>
                  {patient.city}
                </Typography>
              </Box>
            </Grid>
          )} */}
          {/* 
          {patient.state && (
            <Grid item xs={4}>
              <Box sx={{display: "flex"}}>
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    color: "#03045e",
                    marginRight: "5px",
                  }}
                >
                  State:
                </Typography>

                <Typography sx={{fontSize: "0.75rem", color: "#000000"}}>
                  {patient.state}
                </Typography>
              </Box>
            </Grid>
          )} */}

          {/* {patient.country && (
            <Grid item xs={4}>
              <Box sx={{display: "flex"}}>
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    color: "#03045e",
                    marginRight: "5px",
                  }}
                >
                  Country:
                </Typography>

                <Typography sx={{fontSize: "0.75rem", color: "#000000"}}>
                  {patient.country}
                </Typography>
              </Box>
            </Grid>
          )} */}
        </Grid>
      </Box>

      <Box
        sx={{
          width: "100%",
          marginTop: "15px",
          height: "35px",
          backgroundColor: "#2b2d42",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "7.5px",
        }}
      >
        <Typography sx={{ color: "#ffffff", fontSize: "0.75rem" }}>
          DOCUMENT INFORMATION
        </Typography>
      </Box>

      <Box pt={1}>
        {/* <Typography
          sx={{color: "#000000", fontSize: "0.75rem", marginTop: "15px"}}
        >
          Billed Orders by test test at Cashier 1 Finance,Test Facility created
          at 11/11/2022 at 09:20pm - Completed
        </Typography> */}

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#03045e",
                  marginRight: "5px",
                }}
              >
                Created By:
              </Typography>

              <Typography sx={{ fontSize: "0.75rem", color: "#000000" }}>
                {Clinic?.createdByname}
              </Typography>
            </Box>
          </Grid>

          {Clinic?.createdAt && (
            <Grid item xs={6}>
              <Box sx={{ display: "flex" }}>
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    color: "#03045e",
                    marginRight: "5px",
                  }}
                >
                  Time Created:
                </Typography>

                <Typography sx={{ fontSize: "0.75rem", color: "#000000" }}>
                  {format(new Date(Clinic?.createdAt), "dd-MM-yy HH:mm:ss")}
                </Typography>
              </Box>
            </Grid>
          )}

          <Grid item xs={12}>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#03045e",
                  marginRight: "5px",
                }}
              >
                Created At:
              </Typography>

              <Typography sx={{ fontSize: "0.75rem", color: "#000000" }}>
                {Clinic?.location}, {Clinic?.facilityname}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export const BilledOrdersPrintOut = forwardRef(({ data, Clinic }, ref) => {
  const columns = [
    {
      name: "Category",
      key: "category",
      description: "Enter Category",
      selector: (row) => (
        <Typography
          sx={{ fontSize: "0.69rem", whiteSpace: "normal" }}
          data-tag="allowRowEvents"
        >
          {row.category}
        </Typography>
      ),

      sortable: true,
      required: true,
      inputType: "TEXT",
      center: true,
    },

    {
      name: "Name",
      key: "name",
      description: "Enter Name",
      selector: (row) => (
        <Typography
          sx={{ fontSize: "0.69rem", whiteSpace: "normal" }}
          data-tag="allowRowEvents"
        >
          {row.name}
        </Typography>
      ),
      style: { whiteSpace: "unset" },
      sortable: true,
      required: true,
      inputType: "DATE",
      center: true,
    },

    {
      name: "QTY",
      width: "50px",
      center: true,
      key: "quantity",
      width: "100px",
      center: "true",
      description: "Enter Quantity",
      selector: (row) => row.quantity,
      sortable: true,
      required: true,
      center: true,
      inputType: "DATE",
    },

    {
      name: "Unit",
      key: "unit",
      width: "60px",
      center: true,
      description: "Enter Category",
      selector: (row) => row.baseunit,
      sortable: true,
      required: true,
      center: true,
      inputType: "DATE",
    },
    {
      name: "Price",
      key: "sellingprice",
      description: "Enter Category",
      selector: (row) => row.sellingprice,
      sortable: true,
      required: true,
      inputType: "DATE",
      center: true,
      width: "80px",
      center: true,
    },
    {
      name: "Amount",
      key: "amount",
      description: "Enter Category",
      selector: (row) => row.amount,
      sortable: true,
      required: true,
      center: true,
      inputType: "DATE",
      width: "100px",
      cetner: true,
    },

    {
      name: "Mode",
      key: "billMode",
      description: "Enter Category",
      selector: (row) => row.billMode?.type,
      sortable: true,
      required: true,
      center: true,
      inputType: "DATE",
    },
  ];
  return (
    <Box sx={{ width: "100%", height: "100%", padding: "2.5%" }} ref={ref}>
      <PrintOutFixedInformation Clinic={Clinic} />
      <Box
        sx={{
          width: "100%",
          marginTop: "15px",
          height: "35px",
          backgroundColor: "#2b2d42",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "7.5px",
          marginBottom: "15px",
        }}
      >
        <Typography sx={{ color: "#ffffff", fontSize: "0.75rem" }}>
          REPORT DETAILS
        </Typography>
      </Box>

      <Box sx={{ height: "auto", width: "100%" }}>
        <CustomTable
          columns={columns}
          data={data}
          pointerOnHover
          highlightOnHover
          striped
          progressPending={false}
          preferredCustomStyles={customStyles}
        />
      </Box>

      {/* <Box>
        <Typography sx={{fontSize: "0.75rem"}}>
          Powered by Healthstack
        </Typography>
      </Box> */}
    </Box>
  );
});

export const DoctorsNotePrintOut = forwardRef(({ data, Clinic }, ref) => {
  const diagnosisTableColumns = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row, i) => i + 1,
      sortable: true,
      inputType: "HIDDEN",
      width: "50px",
    },
    {
      name: "Type",
      key: "sn",
      description: "SN",
      selector: (row, i) => row.type,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Diagnosis",
      key: "sn",
      description: "SN",
      selector: (row, i) => row.diagnosis,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "ICD 11 Code",
      key: "sn",
      description: "SN",
      selector: (row, i) => row.Code,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "ICD11 Diagnosis",
      key: "sn",
      description: "SN",
      selector: (row, i) => row.Title,
      sortable: true,
      inputType: "HIDDEN",
    },
  ];

  return (
    <Box sx={{ width: "100%", height: "100%", padding: "2.5%" }} ref={ref}>
      <PrintOutFixedInformation Clinic={Clinic} />
      <Box
        sx={{
          width: "100%",
          marginTop: "15px",
          height: "35px",
          backgroundColor: "#2b2d42",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "7.5px",
          marginBottom: "15px",
        }}
      >
        <Typography sx={{ color: "#ffffff", fontSize: "0.75rem" }}>
          REPORT DETAILS
        </Typography>
      </Box>

      {Array.isArray(data) ? (
        Object.entries(data).map(([keys, value], i) => (
          <>
            <Box sx={{ height: "auto", width: "100%" }} key={i}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      sx={{
                        fontSize: "0.75rem",
                        fontWeight: "600",
                        color: "#03045e",
                        marginRight: "5px",
                      }}
                    >
                      {keys}:
                    </Typography>

                    <Typography sx={{ fontSize: "0.75rem", color: "#000000" }}>
                      {/* {dayjs(value).isValid()
                        ? dayjs(value).format("DD/MM/YYYY")
                        : value} */}
                      {/* {value} */}

                      {keys === "diagnosis" && Array.isArray(value) ? (
                        // Render a table for "diagnosis" array
                        // <h1>test</h1>
                        <Box>
                          <CustomTable
                            title={""}
                            columns={diagnosisTableColumns}
                            data={value}
                            pointerOnHover
                            highlightOnHover
                            striped
                            //onRowClicked={handleRow}
                            //conditionalRowStyles={conditionalRowStyles}
                            progressPending={false}
                            CustomEmptyData={
                              <Typography sx={{ fontSize: "0.8rem" }}>
                                You've not added a Diagnosis yet...
                              </Typography>
                            }
                          />
                        </Box>
                      ) : // Render the regular value
                      value instanceof Object ? (
                        JSON.stringify(value)
                      ) : (
                        value
                      )}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </>
        ))
      ) : (
        <div className="field">
          {Object.entries(data).map(([keys, value], i) => (
            <Box sx={{ height: "auto", width: "100%" }} key={i}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      sx={{
                        fontSize: "0.75rem",
                        fontWeight: "600",
                        color: "#03045e",
                        marginRight: "5px",
                      }}
                    >
                      {keys}:
                    </Typography>

                    <Typography sx={{ fontSize: "0.75rem", color: "#000000" }}>
                      {/* {dayjs(value).isValid()
                        ? dayjs(value).format("DD/MM/YYYY")
                        : value} */}
                      {/* {value} */}
                      {keys === "diagnosis" && Array.isArray(value) ? (
                        // Render a table for "diagnosis" array
                        // <h1>test</h1>
                        <Box>
                          <CustomTable
                            title={""}
                            columns={diagnosisTableColumns}
                            data={value}
                            pointerOnHover
                            highlightOnHover
                            striped
                            //onRowClicked={handleRow}
                            //conditionalRowStyles={conditionalRowStyles}
                            progressPending={false}
                            CustomEmptyData={
                              <Typography sx={{ fontSize: "0.8rem" }}>
                                You've not added a Diagnosis yet...
                              </Typography>
                            }
                          />
                        </Box>
                      ) : // Render the regular value
                      value instanceof Object ? (
                        JSON.stringify(value)
                      ) : (
                        value
                      )}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ))}
        </div>
      )}
    </Box>
  );
});

export const AdmissionOrderPrintOut = forwardRef(({ data, Clinic }, ref) => {
  return (
    <Box sx={{ width: "100%", height: "100%", padding: "2.5%" }} ref={ref}>
      <PrintOutFixedInformation Clinic={Clinic} />

      <Box
        sx={{
          width: "100%",
          marginTop: "15px",
          height: "35px",
          backgroundColor: "#2b2d42",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "7.5px",
          marginBottom: "15px",
        }}
      >
        <Typography sx={{ color: "#ffffff", fontSize: "0.75rem" }}>
          REPORT DETAILS
        </Typography>
      </Box>

      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#03045e",
                  marginRight: "5px",
                }}
              >
                Admit To:
              </Typography>

              <Typography sx={{ fontSize: "0.75rem", color: "#000000" }}>
                {data.ward?.name || data.ward}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#03045e",
                  marginRight: "5px",
                }}
              >
                Instructions:
              </Typography>

              <Typography sx={{ fontSize: "0.75rem", color: "#000000" }}>
                {data.instruction}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
});

export const DischargeOrderPrintOut = forwardRef(({ data, Clinic }, ref) => {
  return (
    <Box sx={{ width: "100%", height: "100%", padding: "2.5%" }} ref={ref}>
      <PrintOutFixedInformation Clinic={Clinic} />

      <Box
        sx={{
          width: "100%",
          marginTop: "15px",
          height: "35px",
          backgroundColor: "#2b2d42",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "7.5px",
          marginBottom: "15px",
        }}
      >
        <Typography sx={{ color: "#ffffff", fontSize: "0.75rem" }}>
          REPORT DETAILS
        </Typography>
      </Box>

      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#03045e",
                  marginRight: "5px",
                }}
              >
                Discharge From:
              </Typography>

              <Typography sx={{ fontSize: "0.75rem", color: "#000000" }}>
                {data.ward?.name || data.ward}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#03045e",
                  marginRight: "5px",
                }}
              >
                Instructions:
              </Typography>

              <Typography sx={{ fontSize: "0.75rem", color: "#000000" }}>
                {data.instruction
                  ? data.instruction
                  : "________________________"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
});

export const MedicationListPrintOut = forwardRef(({ data, Clinic }, ref) => {
  const AllergiesColumns = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      width: "50px",
      center: true,
      selector: (row, i) => i + 1,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Allergine",
      key: "allergine",
      description: "Allergine",
      sortable: true,
      required: true,
      inputType: "TEXT",
      selector: (row) => (
        <Typography
          sx={{ fontSize: "0.69rem", whiteSpace: "normal" }}
          data-tag="allowRowEvents"
        >
          {row.allergine}
        </Typography>
      ),
    },

    {
      name: "Reaction",
      key: "reaction",
      description: "Midlle Name",
      selector: (row) => (
        <Typography
          sx={{ fontSize: "0.69rem", whiteSpace: "normal" }}
          data-tag="allowRowEvents"
        >
          {row.reaction}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  const MedicationColumns = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      width: "50px",
      center: true,
      selector: (row, i) => i + 1,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Drug Name",
      key: "drugname",
      description: "Allergine",
      selector: (row) => (
        <Typography
          sx={{ fontSize: "0.69rem", whiteSpace: "normal" }}
          data-tag="allowRowEvents"
        >
          {row.drugname}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Strength/Frequency",
      key: "strengthfreq",
      description: "Midlle Name",
      selector: (row) => (
        <Typography
          sx={{ fontSize: "0.69rem", whiteSpace: "normal" }}
          data-tag="allowRowEvents"
        >
          {row.strengthfreq}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Notes",
      key: "notes",
      description: "Midlle Name",
      selector: (row) => (
        <Typography
          sx={{ fontSize: "0.69rem", whiteSpace: "normal" }}
          data-tag="allowRowEvents"
        >
          {row.notes}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  return (
    <Box sx={{ width: "100%", height: "100%", padding: "2.5%" }} ref={ref}>
      <PrintOutFixedInformation Clinic={Clinic} />

      <Box
        sx={{
          width: "100%",
          marginTop: "15px",
          height: "35px",
          backgroundColor: "#2b2d42",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "7.5px",
          marginBottom: "15px",
        }}
      >
        <Typography sx={{ color: "#ffffff", fontSize: "0.75rem" }}>
          REPORT DETAILS
        </Typography>
      </Box>

      {Object.entries(data).map(
        ([keys, value], i) =>
          value?.length > 0 && (
            <Box key={i}>
              {keys !== "Allergies" && keys !== "Medications" && (
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box sx={{ display: "flex" }}>
                        <Typography
                          sx={{
                            fontSize: "0.75rem",
                            fontWeight: "600",
                            color: "#03045e",
                            marginRight: "5px",
                          }}
                        >
                          {keys}:
                        </Typography>

                        <Typography
                          sx={{ fontSize: "0.75rem", color: "#000000" }}
                        >
                          {/* {dayjs(value).isValid()
                            ? dayjs(value).format("DD/MM/YYYY")
                            : value} */}
                          {value}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {keys === "Allergies" && (
                <Box>
                  <Box>
                    <Typography
                      sx={{ color: "#000000", fontSize: "0.75rem" }}
                      mb={2}
                    >
                      Allergies :
                    </Typography>
                  </Box>

                  {data?.Allergies?.length > 0 && (
                    <Box sx={{ height: "auto", width: "100%" }}>
                      <CustomTable
                        title="Allergies"
                        columns={AllergiesColumns}
                        data={data?.Allergies}
                        pointerOnHover
                        highlightOnHover
                        striped
                        progressPending={false}
                        preferredCustomStyles={customStyles}
                      />
                    </Box>
                  )}
                </Box>
              )}

              {keys === "Medications" && (
                <Box>
                  <Box>
                    <Typography
                      sx={{ color: "#000000", fontSize: "0.75rem" }}
                      mb={2}
                    >
                      Medications :
                    </Typography>
                  </Box>

                  {data?.Allergies?.length > 0 && (
                    <Box sx={{ height: "auto", width: "100%" }}>
                      <CustomTable
                        title="Medications"
                        columns={MedicationColumns}
                        data={data.Medications}
                        pointerOnHover
                        highlightOnHover
                        striped
                        progressPending={false}
                        preferredCustomStyles={customStyles}
                      />
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          )
      )}
    </Box>
  );
});

export const RadiologyOrdersPrintOut = forwardRef(({ data, Clinic }, ref) => {
  const columns = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      width: "50px",
      center: true,
      selector: (row, i) => i + 1,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Test",
      key: "test",
      description: "Test",
      sortable: true,
      required: true,
      inputType: "TEXT",
      selector: (row) => (
        <Typography
          sx={{ fontSize: "0.69rem", whiteSpace: "normal" }}
          data-tag="allowRowEvents"
        >
          {row.test}
        </Typography>
      ),
    },

    {
      name: "Destination",
      key: "destination",
      description: "destination",
      selector: (row) => (
        <Typography
          sx={{ fontSize: "0.69rem", whiteSpace: "normal" }}
          data-tag="allowRowEvents"
        >
          {row?.destination}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  return (
    <Box sx={{ width: "100%", height: "100%", padding: "2.5%" }} ref={ref}>
      <PrintOutFixedInformation Clinic={Clinic} />

      <Box
        sx={{
          width: "100%",
          marginTop: "15px",
          height: "35px",
          backgroundColor: "#2b2d42",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "7.5px",
          marginBottom: "15px",
        }}
      >
        <Typography sx={{ color: "#ffffff", fontSize: "0.75rem" }}>
          REPORT DETAILS
        </Typography>
      </Box>

      <Box>
        <Typography sx={{ color: "#000000", fontSize: "0.75rem" }} mb={2}>
          Tests :
        </Typography>
      </Box>

      {data?.length > 0 && (
        <Box sx={{ height: "auto", width: "100%" }}>
          <CustomTable
            title="Tests"
            columns={columns}
            data={data}
            pointerOnHover
            highlightOnHover
            striped
            progressPending={false}
            preferredCustomStyles={customStyles}
          />
        </Box>
      )}
    </Box>
  );
});

export const LaboratoryOrdersPrintOut = forwardRef(({ data, Clinic }, ref) => {
  const columns = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      width: "50px",
      center: true,
      selector: (row, i) => i + 1,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Test",
      key: "test",
      description: "Test",
      selector: (row) => (
        <Typography
          sx={{ fontSize: "0.69rem", whiteSpace: "normal" }}
          data-tag="allowRowEvents"
        >
          {row.test}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Destination",
      key: "destination",
      description: "destination",
      selector: (row) => (
        <Typography
          sx={{ fontSize: "0.69rem", whiteSpace: "normal" }}
          data-tag="allowRowEvents"
        >
          {row.destination}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  return (
    <Box sx={{ width: "100%", height: "100%", padding: "2.5%" }} ref={ref}>
      <PrintOutFixedInformation Clinic={Clinic} />

      <Box
        sx={{
          width: "100%",
          marginTop: "15px",
          height: "35px",
          backgroundColor: "#2b2d42",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "7.5px",
          marginBottom: "15px",
        }}
      >
        <Typography sx={{ color: "#ffffff", fontSize: "0.75rem" }}>
          REPORT DETAILS
        </Typography>
      </Box>

      <Box>
        <Typography sx={{ color: "#000000", fontSize: "0.75rem" }} mb={2}>
          Tests :
        </Typography>
      </Box>

      {data?.length > 0 && (
        <Box sx={{ height: "auto", width: "100%" }}>
          <CustomTable
            title="Tests"
            columns={columns}
            data={data}
            pointerOnHover
            highlightOnHover
            striped
            progressPending={false}
            preferredCustomStyles={customStyles}
          />
        </Box>
      )}
    </Box>
  );
});

export const PrescriptionPrintOut = forwardRef(({ data, Clinic }, ref) => {
  const columns = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      width: "50px",
      center: true,
      selector: (row, i) => i + 1,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Medication",
      key: "medication",
      description: "Test",
      selector: (row) => (
        <Typography
          sx={{ fontSize: "0.69rem", whiteSpace: "normal" }}
          data-tag="allowRowEvents"
        >
          {row.medication}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Instruction",
      key: "instruction",
      description: "Test",
      selector: (row) => (
        <Typography
          sx={{ fontSize: "0.69rem", whiteSpace: "normal" }}
          data-tag="allowRowEvents"
        >
          {row.instruction ? row.instruction : "---------"}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
      center: true,
    },

    {
      name: "Destination",
      key: "destination",
      description: "destination",
      selector: (row) => (
        <Typography
          sx={{ fontSize: "0.69rem", whiteSpace: "normal" }}
          data-tag="allowRowEvents"
        >
          {row?.destination}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  return (
    <Box sx={{ width: "100%", height: "100%", padding: "2.5%" }} ref={ref}>
      <PrintOutFixedInformation Clinic={Clinic} />

      <Box
        sx={{
          width: "100%",
          marginTop: "15px",
          height: "35px",
          backgroundColor: "#2b2d42",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "7.5px",
          marginBottom: "15px",
        }}
      >
        <Typography sx={{ color: "#ffffff", fontSize: "0.75rem" }}>
          REPORT DETAILS
        </Typography>
      </Box>

      <Box>
        <Typography sx={{ color: "#000000", fontSize: "0.75rem" }} mb={2}>
          Medications :
        </Typography>
      </Box>

      {data.length > 0 && (
        <Box sx={{ height: "auto", width: "100%" }}>
          <CustomTable
            title="Tests"
            columns={columns}
            data={data}
            pointerOnHover
            highlightOnHover
            striped
            progressPending={false}
            preferredCustomStyles={customStyles}
          />
        </Box>
      )}
    </Box>
  );
});

export const AdultQuestionnairePrintOut = forwardRef(
  ({ data, Clinic }, ref) => {
    const columns = [
      {
        name: "S/N",
        key: "sn",
        description: "SN",
        width: "50px",
        center: true,
        selector: (row, i) => i + 1,
        sortable: true,
        inputType: "HIDDEN",
      },
      {
        name: "Allergine",
        key: "allergine",
        description: "Allergine",
        selector: (row) => (
          <Typography
            sx={{ fontSize: "0.69rem", whiteSpace: "normal" }}
            data-tag="allowRowEvents"
          >
            {row.allergine}
          </Typography>
        ),
        sortable: true,
        required: true,
        inputType: "TEXT",
      },

      {
        name: "Reaction",
        key: "reaction",
        description: "Reaction",
        selector: (row) => (
          <Typography
            sx={{ fontSize: "0.69rem", whiteSpace: "normal" }}
            data-tag="allowRowEvents"
          >
            {row.reaction}
          </Typography>
        ),
        sortable: true,
        required: true,
        inputType: "TEXT",
      },
    ];

    return (
      <Box sx={{ width: "100%", height: "100%", padding: "2.5%" }} ref={ref}>
        <PrintOutFixedInformation Clinic={Clinic} />
        <Box
          sx={{
            width: "100%",
            marginTop: "15px",
            height: "35px",
            backgroundColor: "#2b2d42",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "7.5px",
            marginBottom: "15px",
          }}
        >
          <Typography sx={{ color: "#ffffff", fontSize: "0.75rem" }}>
            REPORT DETAILS
          </Typography>
        </Box>

        {Object.entries(data).map(([keys, value], i) => (
          <Box key={i}>
            {value?.length > 0 &&
              (keys !== "Allergy_Skin_Test" ? (
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box sx={{ display: "flex" }}>
                        <Typography
                          sx={{
                            fontSize: "0.75rem",
                            fontWeight: "600",
                            color: "#03045e",
                            marginRight: "5px",
                          }}
                        >
                          {keys}:
                        </Typography>

                        <Typography
                          sx={{ fontSize: "0.75rem", color: "#000000" }}
                        >
                          {/* {dayjs(value).isValid()
                          ? dayjs(value).format("DD/MM/YYYY")
                          : value} */}
                          {value}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              ) : (
                <Box>
                  {data?.Allergy_Skin_Test?.length > 0 && (
                    <Box sx={{ height: "auto", width: "100%" }}>
                      <CustomTable
                        title="Tests"
                        columns={columns}
                        data={data.Allergy_Skin_Test}
                        pointerOnHover
                        highlightOnHover
                        striped
                        progressPending={false}
                        preferredCustomStyles={customStyles}
                      />
                    </Box>
                  )}
                </Box>
              ))}
          </Box>
        ))}
      </Box>
    );
  }
);

export const PediatricPulmonologyList = forwardRef(({ data, Clinic }, ref) => {
  const columnsOne = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      width: "50px",
      center: true,
      selector: (row, i) => i + 1,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Allergine",
      key: "allergine",
      description: "Allergine",
      selector: (row) => (
        <Typography
          sx={{ fontSize: "0.69rem", whiteSpace: "normal" }}
          data-tag="allowRowEvents"
        >
          {row.allergine}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Reaction",
      key: "reaction",
      description: "Reaction",
      selector: (row) => (
        <Typography
          sx={{ fontSize: "0.69rem", whiteSpace: "normal" }}
          data-tag="allowRowEvents"
        >
          {row.reaction}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  const columnsTwo = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      width: "50px",
      center: true,
      selector: (row, i) => i + 1,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Symptoms",
      key: "symptom",
      description: "Symptom",
      selector: (row) => (
        <Typography
          sx={{ fontSize: "0.69rem", whiteSpace: "normal" }}
          data-tag="allowRowEvents"
        >
          {row.symptom}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Duration",
      key: "duration",
      description: "Duration",
      selector: (row) => row.duration,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  return (
    <Box sx={{ width: "100%", height: "100%", padding: "2.5%" }} ref={ref}>
      <PrintOutFixedInformation Clinic={Clinic} />
      <Box
        sx={{
          width: "100%",
          marginTop: "15px",
          height: "35px",
          backgroundColor: "#2b2d42",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "7.5px",
          marginBottom: "15px",
        }}
      >
        <Typography sx={{ color: "#ffffff", fontSize: "0.75rem" }}>
          REPORT DETAILS
        </Typography>
      </Box>

      {Object.entries(data).map(([keys, value], i) => (
        <Box key={i}>
          {value?.length > 0 && (
            <>
              {keys !== "Allergy_Skin_Test" &&
                keys !== "Presenting_Complaints" && (
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Box sx={{ display: "flex" }}>
                          <Typography
                            sx={{
                              fontSize: "0.75rem",
                              fontWeight: "600",
                              color: "#03045e",
                              marginRight: "5px",
                            }}
                          >
                            {keys}:
                          </Typography>

                          <Typography
                            sx={{ fontSize: "0.75rem", color: "#000000" }}
                          >
                            {/* {dayjs(value).isValid()
                              ? dayjs(value).format("DD/MM/YYYY")
                              : value} */}
                            {value}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                )}

              {keys === "Allergy_Skin_Test" && (
                <Box>
                  <Box>
                    <Typography
                      sx={{ color: "#000000", fontSize: "0.75rem" }}
                      mb={2}
                    >
                      Allergy_Skin_Test :
                    </Typography>
                  </Box>

                  {data?.Allergy_Skin_Test?.length > 0 && (
                    <Box sx={{ height: "auto", width: "100%" }}>
                      <CustomTable
                        title="Tests"
                        columns={columnsOne}
                        data={data.Allergy_Skin_Test}
                        pointerOnHover
                        highlightOnHover
                        striped
                        progressPending={false}
                        preferredCustomStyles={customStyles}
                      />
                    </Box>
                  )}
                </Box>
              )}

              {keys === "Presenting_Complaints" && (
                <Box>
                  <Box>
                    <Typography
                      sx={{ color: "#000000", fontSize: "0.75rem" }}
                      mb={2}
                    >
                      Presenting_Complaints :
                    </Typography>
                  </Box>

                  {data?.Presenting_Complaints?.length > 0 && (
                    <Box sx={{ height: "auto", width: "100%" }}>
                      <CustomTable
                        title="Tests"
                        columns={columnsTwo}
                        data={data.Presenting_Complaints}
                        pointerOnHover
                        highlightOnHover
                        striped
                        progressPending={false}
                        preferredCustomStyles={customStyles}
                      />
                    </Box>
                  )}
                </Box>
              )}
            </>
          )}
        </Box>
      ))}
    </Box>
  );
});
