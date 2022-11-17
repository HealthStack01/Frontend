import {Box, Typography} from "@mui/material";
import {forwardRef} from "react";

import CustomTable from "../../../components/customtable";
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

export const AdmissionOrderDocument = forwardRef(({Clinic}, ref) => {
  return (
    <div
      className={
        Clinic.show ? "card-content p-1" : "card-content p-1 is-hidden"
      }
    >
      <Box sx={{display: "none"}}>
        <AdmissionOrderPrintOut
          data={Clinic.documentdetail}
          Clinic={Clinic}
          ref={ref}
        />
      </Box>
      <div>
        <div className="ml-4">
          <p>
            Admit to{" "}
            {Clinic.documentdetail.ward?.name || Clinic.documentdetail.ward}
          </p>
          {Clinic.documentdetail.instruction && (
            <p>
              <label className="label is-size-7"> Instructions:</label>
              {Clinic.documentdetail.instruction}
            </p>
          )}
        </div>
      </div>
    </div>
  );
});

export const DischargeOrderComponent = forwardRef(({Clinic}, ref) => {
  return (
    <div
      className={
        Clinic.show ? "card-content p-1" : "card-content p-1 is-hidden"
      }
    >
      <Box sx={{display: "none"}}>
        <DischargeOrderPrintOut
          data={Clinic.documentdetail}
          ref={ref}
          Clinic={Clinic}
        />
      </Box>
      <div>
        <div className="ml-4">
          <p>
            Discharge From{" "}
            {Clinic.documentdetail.ward?.name || Clinic.documentdetail.ward}
          </p>
          {Clinic.documentdetail.instruction && (
            <p>
              <label className="label is-size-7"> Instructions:</label>
              {Clinic.documentdetail.instruction}
            </p>
          )}
        </div>
      </div>
    </div>
  );
});

export const MedicationListDocument = forwardRef(({Clinic}, ref) => {
  return (
    <div
      className={
        Clinic.show ? "card-content p-1" : "card-content p-1 is-hidden"
      }
    >
      <Box sx={{display: "none"}}>
        <MedicationListPrintOut
          ref={ref}
          data={Clinic.documentdetail}
          Clinic={Clinic}
        />
      </Box>
      {Object.entries(Clinic.documentdetail).map(([keys, value], i) => (
        <>
          {value.length > 0 && (
            <>
              {keys !== "Allergies" && keys !== "Medications" && (
                <div className="field is-horizontal">
                  <div className="field-label">
                    <label className="label is-size-7" key={i}>
                      {keys}:
                    </label>
                  </div>
                  <div className="field-body">
                    <div className="field">{value}</div>
                  </div>
                </div>
              )}
              {keys === "Allergies" && (
                <div id="skintest">
                  {Clinic.documentdetail.Allergies.length > 0 && (
                    <div>
                      <label className="label is-size-7">Allergies:</label>
                      <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-5 ml-5 ">
                        <thead>
                          <tr>
                            <th>
                              <abbr title="Serial No">S/No</abbr>
                            </th>

                            <th>
                              <abbr title="Type">Allergine</abbr>
                            </th>
                            <th>
                              <abbr title="Destination">Reaction</abbr>
                            </th>
                          </tr>
                        </thead>
                        <tfoot></tfoot>
                        <tbody>
                          {Clinic.documentdetail.Allergies.map(
                            (ProductEntry, i) => (
                              <tr key={i}>
                                <th>{i + 1}</th>
                                <td>{ProductEntry.allergine}</td>
                                <td>{ProductEntry.reaction}</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
              {keys === "Medications" && (
                <div id="Medications">
                  {Clinic.documentdetail.Medications.length > 0 && (
                    <div>
                      <label className="label is-size-7">Medications:</label>
                      <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-5 ml-5 ">
                        <thead>
                          <tr>
                            <th>
                              <abbr title="Serial No">S/No</abbr>
                            </th>

                            <th>
                              <abbr title="Drug Name">Drug Name</abbr>
                            </th>
                            <th>
                              <abbr title="Strength/Frequency">
                                Strength/Frequency
                              </abbr>
                            </th>
                            <th>
                              <abbr title="Notes">Notes</abbr>
                            </th>
                          </tr>
                        </thead>
                        <tfoot></tfoot>
                        <tbody>
                          {Clinic.documentdetail.Medications.map(
                            (ProductEntry, i) => (
                              <tr key={i}>
                                <th>{i + 1}</th>
                                <td>{ProductEntry.drugname}</td>
                                <td>{ProductEntry.strengthfreq}</td>
                                <td>{ProductEntry.notes}</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </>
      ))}
    </div>
  );
});

export const PediatricPulmonologyForm = forwardRef(({Clinic}, ref) => {
  return (
    <div
      className={
        Clinic.show ? "card-content p-1" : "card-content p-1 is-hidden"
      }
      ref={ref}
    >
      <Box sx={{display: "none"}}>
        <PediatricPulmonologyList
          ref={ref}
          Clinic={Clinic}
          data={Clinic.documentdetail}
        />
      </Box>

      {Object.entries(Clinic.documentdetail).map(([keys, value], i) => (
        <>
          {value.length > 0 && (
            <>
              {keys !== "Allergy_Skin_Test" &&
                keys !== "Presenting_Complaints" && (
                  <div className="field is-horizontal">
                    <div className="field-label">
                      <label className="label is-size-7" key={i}>
                        {keys}:
                      </label>
                    </div>
                    <div className="field-body">
                      <div className="field">{value}</div>
                    </div>
                  </div>
                )}
              {keys === "Allergy_Skin_Test" && (
                <div id="skintest">
                  {Clinic.documentdetail.Allergy_Skin_Test.length > 0 && (
                    <div>
                      <label className="label is-size-7">
                        Allergy_Skin_Test:
                      </label>
                      <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-5 ml-5 ">
                        <thead>
                          <tr>
                            <th>
                              <abbr title="Serial No">S/No</abbr>
                            </th>

                            <th>
                              <abbr title="Type">Allergine</abbr>
                            </th>
                            <th>
                              <abbr title="Destination">Reaction</abbr>
                            </th>
                          </tr>
                        </thead>
                        <tfoot></tfoot>
                        <tbody>
                          {Clinic.documentdetail.Allergy_Skin_Test.map(
                            (ProductEntry, i) => (
                              <tr key={i}>
                                <th>{i + 1}</th>
                                <td>{ProductEntry.allergine}</td>
                                <td>{ProductEntry.reaction}</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
              {keys === "Presenting_Complaints" && (
                <div id="Presenting_Complaints">
                  {Clinic.documentdetail.Presenting_Complaints.length > 0 && (
                    <div>
                      <label className="label is-size-7">
                        Presenting_Complaints:
                      </label>
                      <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-5 ml-5 ">
                        <thead>
                          <tr>
                            <th>
                              <abbr title="Serial No">S/No</abbr>
                            </th>

                            <th>
                              <abbr title="Type">Symptoms</abbr>
                            </th>
                            <th>
                              <abbr title="Destination">Duration</abbr>
                            </th>
                          </tr>
                        </thead>
                        <tfoot></tfoot>
                        <tbody>
                          {Clinic.documentdetail.Presenting_Complaints.map(
                            (ProductEntry, i) => (
                              <tr key={i}>
                                <th>{i + 1}</th>
                                <td>{ProductEntry.symptom}</td>
                                <td>{ProductEntry.duration}</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </>
      ))}
    </div>
  );
});

export const AdultAthsmaQuestionaire = forwardRef(({Clinic}, ref) => {
  return (
    <div
      className={
        Clinic.show ? "card-content p-1" : "card-content p-1 is-hidden"
      }
    >
      <Box sx={{display: "none"}}>
        <AdultQuestionnairePrintOut
          Clinic={Clinic}
          data={Clinic.documentdetail}
          ref={ref}
        />
      </Box>

      {Object.entries(Clinic.documentdetail).map(([keys, value], i) => (
        <>
          {value.length > 0 && (
            <>
              {keys !== "Allergy_Skin_Test" ? (
                <div className="field is-horizontal">
                  <div className="field-label">
                    <label className="label is-size-7" key={i}>
                      {keys}:
                    </label>
                  </div>
                  <div className="field-body">
                    <div className="field">{value}</div>
                  </div>
                </div>
              ) : (
                <div id="skintest">
                  {Clinic.documentdetail.Allergy_Skin_Test.length > 0 && (
                    <div>
                      <label className="label is-size-7">
                        Allergy_Skin_Test:
                      </label>
                      <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-5 ml-5 ">
                        <thead>
                          <tr>
                            <th>
                              <abbr title="Serial No">S/No</abbr>
                            </th>

                            <th>
                              <abbr title="Type">Allergine</abbr>
                            </th>
                            <th>
                              <abbr title="Destination">Reaction</abbr>
                            </th>
                          </tr>
                        </thead>
                        <tfoot></tfoot>
                        <tbody>
                          {Clinic.documentdetail.Allergy_Skin_Test.map(
                            (ProductEntry, i) => (
                              <tr key={i}>
                                <th>{i + 1}</th>
                                <td>{ProductEntry.allergine}</td>
                                <td>{ProductEntry.reaction}</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </>
      ))}
    </div>
  );
});

export const PrescriptionDocument = forwardRef(({Clinic}, ref) => {
  return (
    <div
      className={
        Clinic.show ? "card-content p-1" : "card-content p-1 is-hidden"
      }
    >
      <Box sx={{display: "none"}}>
        <PrescriptionPrintOut
          data={Clinic.documentdetail}
          ref={ref}
          Clinic={Clinic}
        />
      </Box>

      {Clinic.documentdetail.length > 0 && (
        <div>
          <label>Medications:</label>
          <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
            <thead>
              <tr>
                <th>
                  <abbr title="Serial No">S/No</abbr>
                </th>

                <th>
                  <abbr title="Type">Medication</abbr>
                </th>
                <th>
                  <abbr title="Destination">Destination</abbr>
                </th>
              </tr>
            </thead>
            <tfoot></tfoot>
            <tbody>
              {Clinic.documentdetail.map((ProductEntry, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  {/* <td>{ProductEntry.name}</td> */}
                  <td>
                    {ProductEntry.medication}
                    <br />
                    <span className="help is-size-7">
                      {ProductEntry.instruction}
                    </span>
                  </td>
                  <td>{ProductEntry.destination}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
});

export const RadiologyOrdersDocument = forwardRef(({Clinic}, ref) => {
  return (
    <div
      className={
        Clinic.show ? "card-content p-1" : "card-content p-1 is-hidden"
      }
    >
      <Box sx={{display: "none"}}>
        <RadiologyOrdersPrintOut
          data={Clinic.documentdetail}
          ref={ref}
          Clinic={Clinic}
        />
      </Box>

      {Clinic.documentdetail.length > 0 && (
        <div>
          <label>Tests:</label>
          <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
            <thead>
              <tr>
                <th>
                  <abbr title="Serial No">S/No</abbr>
                </th>

                <th>
                  <abbr title="Test">Test</abbr>
                </th>
                <th>
                  <abbr title="Destination">Destination</abbr>
                </th>
              </tr>
            </thead>
            <tfoot></tfoot>
            <tbody>
              {Clinic.documentdetail.map((ProductEntry, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  {/* <td>{ProductEntry.name}</td> */}
                  <td>
                    {ProductEntry.test}
                    <br />
                    {/* <span className="help is-size-7">{ProductEntry.instruction}</span> */}
                  </td>
                  <td>{ProductEntry.destination}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
});

export const LabOrdersDocument = forwardRef(({Clinic}, ref) => {
  return (
    <div
      className={
        Clinic.show ? "card-content p-1" : "card-content p-1 is-hidden"
      }
    >
      <Box sx={{display: "none"}}>
        <LaboratoryOrdersPrintOut
          data={Clinic.documentdetail}
          ref={ref}
          Clinic={Clinic}
        />
      </Box>
      {Clinic.documentdetail.length > 0 && (
        <div>
          <label>Tests:</label>
          <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
            <thead>
              <tr>
                <th>
                  <abbr title="Serial No">S/No</abbr>
                </th>

                <th>
                  <abbr title="Test">Test</abbr>
                </th>
                <th>
                  <abbr title="Destination">Destination</abbr>
                </th>
              </tr>
            </thead>
            <tfoot></tfoot>
            <tbody>
              {Clinic.documentdetail.map((ProductEntry, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  {/* <td>{ProductEntry.name}</td> */}
                  <td>
                    {ProductEntry.test}
                    <br />
                    {/* <span className="help is-size-7">{ProductEntry.instruction}</span> */}
                  </td>
                  <td>{ProductEntry.destination}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
});

export const BilledOrdersDocument = forwardRef(({Clinic}, ref) => {
  const columns = [
    {
      name: "S/NO",
      width: "70px",
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
      selector: row => row.category,
      sortable: true,
      required: true,
      inputType: "TEXT",
      center: true,
    },

    {
      name: "Name",
      key: "name",
      description: "Enter Name",
      selector: row => row.name,
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
      selector: row => row.quantity,
      sortable: true,
      required: true,
      center: true,
      inputType: "DATE",
    },

    {
      name: "Unit",
      key: "unit",
      description: "Enter Category",
      selector: row => row.baseunit,
      sortable: true,
      required: true,
      center: true,
      inputType: "DATE",
    },
    {
      name: "Selling Price",
      key: "sellingprice",
      description: "Enter Category",
      selector: row => row.sellingprice,
      sortable: true,
      required: true,
      inputType: "DATE",
      center: true,
    },
    {
      name: "Amount",
      key: "amount",
      description: "Enter Category",
      selector: row => row.amount,
      sortable: true,
      required: true,
      center: true,
      inputType: "DATE",
    },

    {
      name: "Mode",
      key: "billMode",
      description: "Enter Category",
      selector: row => row.billMode.type,
      sortable: true,
      required: true,
      center: true,
      inputType: "DATE",
    },
  ];
  return (
    <>
      <Box sx={{display: "none"}}>
        <BilledOrdersPrintOut
          data={Clinic.documentdetail}
          ref={ref}
          Clinic={Clinic}
        />
      </Box>
      <Box sx={{height: "auto"}}>
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
