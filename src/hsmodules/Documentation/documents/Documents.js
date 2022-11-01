export const AdmissionOrderDocument = ({Clinic, ref}) => {
  return (
    <div
      className={
        Clinic.show ? "card-content p-1" : "card-content p-1 is-hidden"
      }
      ref={ref}
    >
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
};

export const DischargeOrderComponent = ({Clinic, ref}) => {
  return (
    <div
      className={
        Clinic.show ? "card-content p-1" : "card-content p-1 is-hidden"
      }
      ref={ref}
    >
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
};

export const MedicationListDocument = ({Clinic, ref}) => {
  return (
    <div
      className={
        Clinic.show ? "card-content p-1" : "card-content p-1 is-hidden"
      }
      ref={ref}
    >
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
};

export const PediatricPulmonologyForm = ({Clinic, ref}) => {
  return (
    <div
      className={
        Clinic.show ? "card-content p-1" : "card-content p-1 is-hidden"
      }
      ref={ref}
    >
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
};

export const AdultAthsmaQuestionaire = ({Clinic, ref}) => {
  return (
    <div
      className={
        Clinic.show ? "card-content p-1" : "card-content p-1 is-hidden"
      }
      ref={ref}
    >
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
};

export const PrescriptionDocument = ({Clinic, ref}) => {
  return (
    <div
      className={
        Clinic.show ? "card-content p-1" : "card-content p-1 is-hidden"
      }
      ref={ref}
    >
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
};

export const RadiologyOrdersDocument = ({Clinic, ref}) => {
  return (
    <div
      className={
        Clinic.show ? "card-content p-1" : "card-content p-1 is-hidden"
      }
      ref={ref}
    >
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
};

export const LabOrdersDocument = ({Clinic, ref}) => {
  return (
    <div
      className={
        Clinic.show ? "card-content p-1" : "card-content p-1 is-hidden"
      }
      ref={ref}
    >
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
};

export const BilledOrdersDocument = ({Clinic, ref}) => {
  return (
    <div
      className={
        Clinic.show ? "card-content p-1" : "card-content p-1 is-hidden"
      }
      ref={ref}
    >
      {Clinic.documentdetail.length > 0 && (
        <div>
          <label>Billed Orders:</label>
          <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
            <thead>
              <tr>
                <th>
                  <abbr title="Serial No">S/No</abbr>
                </th>
                <th>
                  <abbr title="Category">Category</abbr>
                </th>
                <th>
                  <abbr title="Name">Name</abbr>
                </th>
                <th>
                  <abbr title="Quantity">Quanitity</abbr>
                </th>
                <th>
                  <abbr title="Unit">Unit</abbr>
                </th>
                <th>
                  <abbr title="Selling Price">Selling Price</abbr>
                </th>
                <th>
                  <abbr title="Amount">Amount</abbr>
                </th>
                <th>
                  <abbr title="Billing Mode">Mode</abbr>
                </th>
              </tr>
            </thead>
            <tfoot></tfoot>
            <tbody>
              {Clinic.documentdetail.map((ProductEntry, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{ProductEntry.category}</td>
                  <td>{ProductEntry.name}</td>
                  <th>{ProductEntry.quantity}</th>
                  <td>{ProductEntry.baseunit}</td>
                  <td>{ProductEntry.sellingprice}</td>
                  <td>{ProductEntry.amount}</td>
                  <td>{ProductEntry.billMode.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
