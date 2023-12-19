import { Box, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import { forwardRef } from "react";

import CustomTable from "../../../components/customtable";
import { FormsHeaderText } from "../../../components/texts";
import {
  AdmissionOrderPrintOut,
  AdultQuestionnairePrintOut,
  BilledOrdersPrintOut,
  DischargeOrderPrintOut,
  LaboratoryOrdersPrintOut,
  MedicationListPrintOut,
  PediatricPulmonologyList,
  PrescriptionPrintOut,
  RadiologyOrdersPrintOut,
} from "../print-outs/Print-Outs";

export const AdmissionOrderDocument = forwardRef(({ Clinic }, ref) => {
  const data = Clinic?.documentdetail;
  return (
    <div
      className={
        Clinic.show ? "card-content p-1" : "card-content p-1 is-hidden"
      }
    >
      <Box sx={{ display: "none" }}>
        <AdmissionOrderPrintOut data={data} Clinic={Clinic} ref={ref} />
      </Box>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#023047",
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
                  color: "#023047",
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
    </div>
  );
});

export const DischargeOrderComponent = forwardRef(({ Clinic }, ref) => {
  const data = Clinic?.documentdetail;
  return (
    <div
      className={
        Clinic.show ? "card-content p-1" : "card-content p-1 is-hidden"
      }
    >
      <Box sx={{ display: "none" }}>
        <DischargeOrderPrintOut data={data} ref={ref} Clinic={Clinic} />
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
    </div>
  );
});

export const MedicationListDocument = forwardRef(({ Clinic }, ref) => {
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
      selector: (row) => row.allergine,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Reaction",
      key: "reaction",
      description: "Midlle Name",
      selector: (row) => row.reaction,
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
      selector: (row) => row.drugname,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Strength/Frequency",
      key: "strengthfreq",
      description: "Midlle Name",
      selector: (row) => row.strengthfreq,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Notes",
      key: "notes",
      description: "Midlle Name",
      selector: (row) => row.notes,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];
  const data = Clinic?.documentdetail;
  return (
    <div
      className={
        Clinic.show ? "card-content p-1" : "card-content p-1 is-hidden"
      }
    >
      <Box sx={{ display: "none" }}>
        <MedicationListPrintOut ref={ref} data={data} Clinic={Clinic} />
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
                    <FormsHeaderText text="Allergies" />
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
                      />
                    </Box>
                  )}
                </Box>
              )}

              {keys === "Medications" && (
                <Box>
                  <Box>
                    <FormsHeaderText text="Medications" />
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
                      />
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          )
      )}
    </div>
  );
});

export const PediatricPulmonologyForm = forwardRef(({ Clinic }, ref) => {
  const data = Clinic?.documentdetail;

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
      selector: (row) => row.allergine,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Reaction",
      key: "reaction",
      description: "Reaction",
      selector: (row) => row.reaction,
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
      selector: (row) => row.symptom,
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
    <div
      className={
        Clinic.show ? "card-content p-1" : "card-content p-1 is-hidden"
      }
      ref={ref}
    >
      <Box sx={{ display: "none" }}>
        <PediatricPulmonologyList
          ref={ref}
          Clinic={Clinic}
          data={Clinic.documentdetail}
        />
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
                    <FormsHeaderText text="Allergy Skin Test" />
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
                      />
                    </Box>
                  )}
                </Box>
              )}

              {keys === "Presenting_Complaints" && (
                <Box>
                  <Box>
                    <FormsHeaderText text="Presenting Complaints" />
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
                      />
                    </Box>
                  )}
                </Box>
              )}
            </>
          )}
        </Box>
      ))}
    </div>
  );
});

export const AdultAthsmaQuestionaire = forwardRef(({ Clinic }, ref) => {
  const data = Clinic?.documentdetail;

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
      selector: (row) => row.allergine,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Reaction",
      key: "reaction",
      description: "Reaction",
      selector: (row) => row.reaction,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  return (
    <div
      className={
        Clinic.show ? "card-content p-1" : "card-content p-1 is-hidden"
      }
    >
      <Box sx={{ display: "none" }}>
        <AdultQuestionnairePrintOut
          Clinic={Clinic}
          data={Clinic?.documentdetail}
          ref={ref}
        />
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
                <FormsHeaderText text="Tests" />
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
                    />
                  </Box>
                )}
              </Box>
            ))}
        </Box>
      ))}
    </div>
  );
});

export const PrescriptionDocument = forwardRef(({ Clinic }, ref) => {
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
      selector: (row) => row.medication,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Instruction",
      key: "instruction",
      description: "Test",
      selector: (row) => (row.instruction ? row.instruction : "------"),
      sortable: true,
      required: true,
      inputType: "TEXT",
      center: true,
    },

    {
      name: "Destination",
      key: "destination",
      description: "destination",
      selector: (row) => row.destination,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  return (
    <div
      className={
        Clinic.show ? "card-content p-1" : "card-content p-1 is-hidden"
      }
    >
      <Box sx={{ display: "none" }}>
        <PrescriptionPrintOut
          data={Clinic.documentdetail}
          ref={ref}
          Clinic={Clinic}
        />
      </Box>

      {Clinic.documentdetail.length > 0 && (
        <div>
          <FormsHeaderText text="Medications" />
          <Box sx={{ height: "auto" }}>
            <CustomTable
              columns={columns}
              data={Clinic.documentdetail}
              pointerOnHover
              highlightOnHover
              striped
              progressPending={false}
            />
          </Box>
        </div>
      )}
    </div>
  );
});

export const TheatreDocument = forwardRef(({ Clinic }, ref) => {
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
      name: "Theatre Service",
      key: "medication",
      description: "Test",
      selector: (row) => row.medication,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Procedure Instructions",
      key: "instruction",
      description: "Test",
      selector: (row) => (row.instruction ? row.instruction : "------"),
      sortable: true,
      required: true,
      inputType: "TEXT",
      center: true,
    },

    {
      name: "Destination",
      key: "destination",
      description: "destination",
      selector: (row) => row.destination,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  return (
    <div
      className={
        Clinic.show ? "card-content p-1" : "card-content p-1 is-hidden"
      }
    >
      <Box sx={{ display: "none" }}>
        <PrescriptionPrintOut
          data={Clinic.documentdetail}
          ref={ref}
          Clinic={Clinic}
        />
      </Box>

      {Clinic.documentdetail.length > 0 && (
        <div>
          <FormsHeaderText text="Theatre" />
          <Box sx={{ height: "auto" }}>
            <CustomTable
              columns={columns}
              data={Clinic.documentdetail}
              pointerOnHover
              highlightOnHover
              striped
              progressPending={false}
            />
          </Box>
        </div>
      )}
    </div>
  );
});

export const RadiologyOrdersDocument = forwardRef(({ Clinic }, ref) => {
  const data = Clinic?.documentdetail;

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
      selector: (row) => row.test,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Destination",
      key: "destination",
      description: "destination",
      selector: (row) => row.destination,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];
  return (
    <div
      className={
        Clinic.show ? "card-content p-1" : "card-content p-1 is-hidden"
      }
    >
      <Box sx={{ display: "none" }}>
        <RadiologyOrdersPrintOut data={data} ref={ref} Clinic={Clinic} />
      </Box>

      <Box>
        <FormsHeaderText text="Tests" />
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
          />
        </Box>
      )}
    </div>
  );
});

export const LabOrdersDocument = forwardRef(({ Clinic }, ref) => {
  const data = Clinic?.documentdetail;

 /*  const removeNullOrUndefinedEmpty=(obj) =>  {
    return Object.fromEntries(
      Object.entries(obj).filter(([key, value]) => {
        // Remove keys with null, undefined, or empty string values
        return value !== null && value !== undefined && value !== '';
      })
    );
  }
data = removeNullOrUndefinedEmpty(data) */

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
      selector: (row) => row.test,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Destination",
      key: "destination",
      description: "destination",
      selector: (row) => row.destination,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];
  return (
    <div
      className={
        Clinic.show ? "card-content p-1" : "card-content p-1 is-hidden"
      }
    >
      <Box sx={{ display: "none" }}>
        <LaboratoryOrdersPrintOut data={data} ref={ref} Clinic={Clinic} />
      </Box>
      <Box>
        <FormsHeaderText text="Tests" />
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
          />
        </Box>
      )}
    </div>
  );
});

export const BilledOrdersDocument = forwardRef(({ Clinic }, ref) => {
  const columns = [
    {
      name: "S/NO",
      width: "50px",
      key: "sn",
      center: true,
      selector: (row, i) => i + 1,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
    {
      name: "Category",
      key: "category",
      description: "Enter Category",
      selector: (row) => row.category,
      sortable: true,
      required: true,
      inputType: "TEXT",
      center: true,
    },

    {
      name: "Name",
      key: "name",
      description: "Enter Name",
      selector: (row) => row.name,
      sortable: true,
      required: true,
      inputType: "DATE",
      center: true,
    },

    {
      name: "Quantity",
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
      description: "Enter Category",
      selector: (row) => row.baseunit,
      sortable: true,
      required: true,
      center: true,
      inputType: "DATE",
    },
    {
      name: "Selling Price",
      key: "sellingprice",
      description: "Enter Category",
      selector: (row) => row.sellingprice,
      sortable: true,
      required: true,
      inputType: "DATE",
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
    <>
      <Box sx={{ display: "none" }}>
        <BilledOrdersPrintOut
          data={Clinic.documentdetail}
          ref={ref}
          Clinic={Clinic}
        />
      </Box>
      <Box sx={{ height: "auto" }}>
        <FormsHeaderText text="Bill Orders" />
        <CustomTable
          title={"Bill Orders:"}
          columns={columns}
          data={Clinic.documentdetail}
          pointerOnHover
          highlightOnHover
          striped
          progressPending={false}
        />
      </Box>
    </>
  );
});
